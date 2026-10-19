import base64
import binascii
import re
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree

from django import forms
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .caldav import CalendarUnavailable, dav_request
from .models import CalDAVAccount
from .calendar_hosts import calendar_hosts
from .calendar_moves import MoveConflict, move_resource
from .calendar_permissions import account_editable_calendars


def scoped_privileges(body, hosts, editable):
    """Advertise the caller's rights, not the upstream service account's rights."""
    try:
        root = ElementTree.fromstring(body)
    except ElementTree.ParseError:
        return body
    changed = False
    for result in root.findall('{DAV:}response'):
        path = unquote(urlsplit(result.findtext('{DAV:}href', '')).path).removeprefix('/caldav')
        owner = next((host for host in hosts if path.startswith(host['path'])), None)
        for privileges in result.iter('{DAV:}current-user-privilege-set'):
            privileges.clear()
            names = ['read', 'read-current-user-privilege-set']
            if owner and owner['key'] in editable:
                names += ['write', 'write-content', 'write-properties', 'bind', 'unbind']
            for name in names:
                privilege = ElementTree.SubElement(privileges, '{DAV:}privilege')
                ElementTree.SubElement(privilege, '{DAV:}' + name)
            changed = True
    return ElementTree.tostring(root, encoding='utf-8', xml_declaration=True) if changed else body


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

    hosts = calendar_hosts()
    collections = {host['path'].lstrip('/'): host for host in hosts}
    collection = next((key for key in collections if path.startswith(key)), None)
    resource = path[len(collection):] if collection else ''
    principal = hosts[0]['path'].strip('/').rsplit('/', 1)[0] + '/'
    if path not in ('', principal) and (not collection or (resource and not re.fullmatch(r'[A-Za-z0-9_.@-]+\.ics', resource))):
        return HttpResponse(status=404)
    read_methods = {'OPTIONS', 'GET', 'HEAD', 'PROPFIND', 'REPORT'}
    editable = account_editable_calendars(account)
    if request.method not in read_methods:
        if not collection or collections[collection]['key'] not in editable:
            return HttpResponse(status=403)
        if request.method in {'PUT', 'DELETE', 'MOVE'}:
            if not collection or not resource:
                return HttpResponse('Only individual events may be changed.', status=403)
        elif request.method != 'PROPPATCH' or path not in collections:
            return HttpResponse(status=405)

    if request.method == 'MOVE':
        target = urlsplit(request.headers.get('Destination', ''))
        if target.netloc and target.netloc != request.get_host():
            return HttpResponse('Destination must be on this server.', status=403)
        target_path = unquote(target.path)
        destination = next((host for key, host in collections.items()
                            if target_path == '/caldav/' + key + resource), None)
        if not destination or destination['key'] == collections[collection]['key']:
            return HttpResponse('Choose another host calendar and preserve the resource name.', status=403)
        if destination['key'] not in editable:
            return HttpResponse('You cannot edit the destination calendar.', status=403)
        try:
            etag = move_resource(collections[collection], destination, resource, request.headers.get('If-Match'))
        except MoveConflict as error:
            return HttpResponse(str(error), status=412)
        except CalendarUnavailable as error:
            return HttpResponse(str(error), status=503)
        response = HttpResponse(status=201)
        response['Location'] = target_path
        response['ETag'] = etag
        response['Cache-Control'] = 'no-store'
        return response

    headers = {name: request.headers[name] for name in (
        'Content-Type', 'Depth', 'If-Match', 'If-None-Match', 'Prefer',
    ) if name in request.headers}
    try:
        status, body, upstream = dav_request(
            request.method, '/' + path, request.body or None, headers, script_name='/caldav',
        )
    except CalendarUnavailable as error:
        return HttpResponse(str(error), status=503)
    if status == 207 and request.method == 'PROPFIND':
        body = scoped_privileges(body, hosts, editable)
    response = HttpResponse(body, status=status)
    for name in ('Content-Type', 'ETag', 'DAV', 'Allow', 'Location', 'Last-Modified'):
        if name in upstream:
            response[name] = upstream[name]
    response['Cache-Control'] = 'no-store'
    return response
