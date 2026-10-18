"""Public calendar reads and session-authenticated FullCalendar editing."""
import json
import re
import uuid
from datetime import datetime, timedelta

import recurring_ical_events
from icalendar import Calendar, Event as CalendarEvent

from django.conf import settings
from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.core.exceptions import PermissionDenied
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.utils.dateparse import parse_date, parse_datetime
from django.views.decorators.cache import cache_control, never_cache
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods, require_safe

from .caldav import CalendarUnavailable, calendar_resources, dav_request, read_calendar
from .models import Event, SIGS


def can_edit(request):
    return request.user.is_active and request.user.is_staff and request.user.has_perm('website.change_event')


def resource_path(resource):
    if not re.fullmatch(r'[A-Za-z0-9_.@-]+\.ics', resource):
        raise Http404
    return settings.CALDAV_COLLECTION + resource


def calendar_events(start, end):
    sigs = {sig.slug: sig for sig in SIGS.objects.all()}
    result = []
    for resource, etag, content in calendar_resources():
        calendar = Calendar.from_ical(content)
        original = calendar.walk('VEVENT')
        recurring = len(original) != 1 or any(
            key in event for event in original for key in ('RRULE', 'RDATE', 'RECURRENCE-ID')
        )
        for event in recurring_ical_events.of(calendar).between(start, end):
            begins = event.decoded('DTSTART')
            finishes = event.decoded('DTEND', None)
            all_day = not isinstance(begins, datetime)
            if not all_day and timezone.is_naive(begins):
                begins = timezone.make_aware(begins)
            if isinstance(finishes, datetime) and timezone.is_naive(finishes):
                finishes = timezone.make_aware(finishes)
            sig_slug = str(event.get('X-ACM-SIG', ''))
            sig = sigs.get(sig_slug)
            result.append({
                'id': resource + ('#' + begins.isoformat() if recurring else ''),
                'title': str(event.get('SUMMARY', '(Untitled event)')),
                'start': begins.isoformat(),
                'end': finishes.isoformat() if finishes else None,
                'allDay': all_day,
                'color': sig.primary_color if sig else '#3F6FE6',
                'extendedProps': {
                    'resource': resource, 'etag': etag, 'recurring': recurring,
                    'description': str(event.get('DESCRIPTION', '')),
                    'location': str(event.get('LOCATION', '')),
                    'sig': sig_slug, 'kind': str(event.get('X-ACM-KIND', 'other')),
                },
            })
    return sorted(result, key=lambda event: event['start'])


@require_safe
@cache_control(public=True, max_age=300)
def events_calendar(request):
    try:
        body, headers = read_calendar()
    except CalendarUnavailable as error:
        response = HttpResponse(str(error), status=503)
        response['Cache-Control'] = 'no-store'
        return response
    response = HttpResponse(body, content_type='text/calendar; charset=utf-8')
    response['Content-Disposition'] = 'inline; filename="acmmanoa-events.ics"'
    if 'ETag' in headers:
        response['ETag'] = headers['ETag']
    return response


@require_safe
@never_cache
def events_json(request):
    try:
        start = parse_datetime(request.GET.get('start', ''))
        end = parse_datetime(request.GET.get('end', ''))
        if not start or not end or timezone.is_naive(start) or timezone.is_naive(end):
            raise ValueError('Supply start and end with time zone offsets.')
        if not timedelta(0) < end - start <= timedelta(days=370):
            raise ValueError('Calendar ranges must be between 1 and 370 days.')
        return JsonResponse(calendar_events(start, end), safe=False)
    except (ValueError, TypeError) as error:
        return JsonResponse({'error': str(error)}, status=400)
    except CalendarUnavailable as error:
        return JsonResponse({'error': str(error)}, status=503)


@require_safe
@never_cache
@ensure_csrf_cookie
@xframe_options_sameorigin
def calendar_embed(request):
    editor = request.GET.get('edit') == '1'
    if editor and not can_edit(request):
        raise PermissionDenied
    return render(request, 'calendar/embed.html', {
        'editor': editor, 'sigs': SIGS.objects.all(), 'kinds': Event.KIND_CHOICES,
    })


@staff_member_required
@never_cache
def calendar_admin(request):
    if not can_edit(request):
        raise PermissionDenied
    return render(request, 'admin/calendar.html', {
        **admin.site.each_context(request), 'title': 'Calendar',
    })


def parse_event_time(value, all_day):
    if not isinstance(value, str):
        raise ValueError('Enter a start time.')
    parsed = parse_date(value) if all_day else parse_datetime(value)
    if parsed is None or (isinstance(parsed, datetime) and timezone.is_naive(parsed)):
        raise ValueError('Use a date or an ISO timestamp with a time zone offset.')
    return parsed


@require_http_methods(['POST', 'PUT', 'DELETE'])
@never_cache
def event_write(request, resource=None):
    if not can_edit(request):
        raise PermissionDenied
    try:
        if request.method == 'POST' and resource or request.method != 'POST' and not resource:
            return JsonResponse({'error': 'Unsupported operation.'}, status=405)
        if resource:
            path = resource_path(resource)
            etag = request.headers.get('If-Match')
            if not etag or etag == '*':
                return JsonResponse({'error': 'Reload the event before saving.'}, status=428)
            status, body, headers = dav_request('GET', path)
            if status != 200:
                return JsonResponse({'error': 'Event no longer exists.'}, status=404)
            if headers.get('ETag') != etag:
                return JsonResponse({'error': 'Event changed. Reload before editing.'}, status=412)
            calendar = Calendar.from_ical(body)
            components = calendar.walk('VEVENT')
            if len(components) != 1 or any(key in components[0] for key in ('RRULE', 'RDATE', 'RECURRENCE-ID')):
                return JsonResponse({'error': 'Edit recurring events in a native CalDAV client.'}, status=409)
            event = components[0]
            conditions = {'If-Match': etag}
        else:
            resource = f'{uuid.uuid4()}.ics'
            path = resource_path(resource)
            calendar = Calendar()
            calendar.add('prodid', '-//ACM at UH Manoa//CalDAV//EN')
            calendar.add('version', '2.0')
            event = CalendarEvent()
            event.add('uid', str(uuid.uuid4()) + '@acmmanoa.org')
            event.add('created', timezone.now())
            calendar.add_component(event)
            conditions = {'If-None-Match': '*'}
        if request.method == 'DELETE':
            status, _, _ = dav_request('DELETE', path, headers=conditions)
        else:
            data = json.loads(request.body)
            if not isinstance(data, dict):
                raise ValueError('Expected an event object.')
            title = data.get('title', '')
            if not isinstance(title, str) or not title.strip() or len(title) > 255:
                raise ValueError('Enter a title of at most 255 characters.')
            all_day = data.get('allDay', False)
            if not isinstance(all_day, bool):
                raise ValueError('allDay must be a boolean.')
            start = parse_event_time(data.get('start'), all_day)
            end = parse_event_time(data['end'], all_day) if data.get('end') else None
            if end and end <= start:
                raise ValueError('End must be after start (all-day end dates are exclusive).')
            sig = data.get('sig', '')
            kind = data.get('kind', 'other')
            for field in ('description', 'location', 'sig', 'kind'):
                if not isinstance(data.get(field, ''), str):
                    raise ValueError(f'{field} must be text.')
            if sig and not SIGS.objects.filter(slug=sig).exists():
                raise ValueError('Choose an existing SIG.')
            if kind not in dict(Event.KIND_CHOICES):
                raise ValueError('Choose a valid event kind.')
            for key, value in {
                'SUMMARY': title.strip(), 'DESCRIPTION': data.get('description', ''),
                'LOCATION': data.get('location', ''), 'DTSTART': start, 'DTEND': end,
                'DURATION': None, 'X-ACM-SIG': sig, 'X-ACM-KIND': kind,
                'DTSTAMP': timezone.now(), 'LAST-MODIFIED': timezone.now(),
                'SEQUENCE': int(event.get('SEQUENCE', 0)) + 1,
            }.items():
                event.pop(key, None)
                if value is not None:
                    event.add(key, value)
            status, _, _ = dav_request('PUT', path, calendar.to_ical(), {
                **conditions, 'Content-Type': 'text/calendar; charset=utf-8',
            })
        if status not in (200, 201, 204):
            return JsonResponse({'error': 'Event changed; reload and try again.'}, status=412 if status == 412 else 502)
        return JsonResponse({'resource': resource}, status=201 if request.method == 'POST' else 200)
    except (ValueError, TypeError, OverflowError) as error:
        return JsonResponse({'error': str(error)}, status=400)
    except CalendarUnavailable as error:
        return JsonResponse({'error': str(error)}, status=503)
