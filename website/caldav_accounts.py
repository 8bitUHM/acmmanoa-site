import base64
import binascii
import re

from django import forms
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .caldav import CalendarUnavailable, dav_request
from .models import CalDAVAccount


class CalDAVAccountForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(render_value=False), required=False,
        help_text='Required for new accounts. Leave blank to keep the existing password.',
    )

    class Meta:
        model = CalDAVAccount
        fields = ('username', 'password', 'is_active', 'can_edit')

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if not password and not self.instance.pk:
            raise forms.ValidationError('Enter a password for the new account.')
        if password:
            validate_password(password)
        return password

    def save(self, commit=True):
        account = super().save(commit=False)
        if self.cleaned_data['password']:
            account.password_hash = make_password(self.cleaned_data['password'])
        if commit:
            account.save()
        return account


# Native CalDAV clients use HTTP Basic exclusively, never ambient session cookies.
@csrf_exempt
def caldav_gateway(request, path=''):
    try:
        scheme, token = request.headers.get('Authorization', '').split(' ', 1)
        if scheme.lower() != 'basic':
            raise ValueError
        username, password = base64.b64decode(token, validate=True).decode().split(':', 1)
        account = CalDAVAccount.objects.filter(username=username, is_active=True).first()
        valid = check_password(password, account.password_hash if account else make_password(None))
    except (ValueError, UnicodeError, binascii.Error):
        account, valid = None, False
    if not account or not valid:
        response = HttpResponse('CalDAV account credentials required.', status=401)
        response['WWW-Authenticate'] = 'Basic realm="ACM calendar", charset="UTF-8"'
        response['Cache-Control'] = 'no-store'
        return response

    # All provisioned accounts share this one public calendar. No arbitrary DAV proxying.
    if not re.fullmatch(r'(calendar-admin/(events/([A-Za-z0-9_.@-]+\.ics)?)?)?', path):
        return HttpResponse(status=404)
    read_methods = {'OPTIONS', 'GET', 'HEAD', 'PROPFIND', 'REPORT'}
    if request.method not in read_methods:
        if not account.can_edit:
            return HttpResponse(status=403)
        if request.method in {'PUT', 'DELETE'}:
            if not path.startswith('calendar-admin/events/') or not path.endswith('.ics'):
                return HttpResponse('Only individual events may be changed.', status=403)
        elif request.method != 'PROPPATCH' or path != 'calendar-admin/events/':
            return HttpResponse(status=405)

    headers = {name: request.headers[name] for name in (
        'Content-Type', 'Depth', 'If-Match', 'If-None-Match', 'Prefer',
    ) if name in request.headers}
    try:
        status, body, upstream = dav_request(
            request.method, '/' + path, request.body or None, headers, script_name='/caldav',
        )
    except CalendarUnavailable as error:
        return HttpResponse(str(error), status=503)
    response = HttpResponse(body, status=status)
    for name in ('Content-Type', 'ETag', 'DAV', 'Allow', 'Location', 'Last-Modified'):
        if name in upstream:
            response[name] = upstream[name]
    response['Cache-Control'] = 'no-store'
    return response
