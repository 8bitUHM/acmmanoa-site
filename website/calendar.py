"""Public calendar reads and session-authenticated FullCalendar editing."""
import json
import re
import uuid
from datetime import datetime, timedelta

import recurring_ical_events
from icalendar import Calendar, Event as CalendarEvent

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

from .caldav import CalendarUnavailable, dav_request, ensure_calendar, host_resources, read_calendar
from .calendar_hosts import calendar_hosts, get_calendar
from .calendar_moves import MoveConflict, fingerprint, move_resource
from .models import CalendarMove


def can_edit(request):
    return request.user.is_active and request.user.is_staff and request.user.has_perm('website.change_event')


def resource_path(resource, host):
    if not re.fullmatch(r'[A-Za-z0-9_.@-]+\.ics', resource):
        raise Http404
    return host['path'] + resource


def calendar_events(start, end):
    result = []
    for host, resource, etag, content in host_resources():
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
            result.append({
                'id': host['key'] + '/' + resource + ('#' + begins.isoformat() if recurring else ''),
                'title': str(event.get('SUMMARY', '(Untitled event)')),
                'start': begins.isoformat(),
                'end': finishes.isoformat() if finishes else None,
                'allDay': all_day,
                'color': host['color'],
                'extendedProps': {
                    'resource': resource, 'etag': etag, 'recurring': recurring,
                    'description': str(event.get('DESCRIPTION', '')),
                    'location': str(event.get('LOCATION', '')),
                    'calendar': host['key'], 'host': host['name'], 'sig': host['slug'],
                },
            })
    def start_timestamp(event):
        start = datetime.fromisoformat(event['start'])
        if timezone.is_naive(start):
            start = timezone.make_aware(start)
        return start.timestamp()
    return sorted(result, key=start_timestamp)


@require_safe
@cache_control(public=True, max_age=300)
def events_calendar(request, calendar_key=None):
    try:
        host = get_calendar(calendar_key) if calendar_key else None
        body, headers = read_calendar(host)
    except ValueError:
        raise Http404('Calendar not found')
    except CalendarUnavailable as error:
        response = HttpResponse(str(error), status=503)
        response['Cache-Control'] = 'no-store'
        return response
    response = HttpResponse(body, content_type='text/calendar; charset=utf-8')
    response['Content-Disposition'] = 'inline; filename="acmmanoa-events.ics"'
    if 'ETag' in headers:
        response['ETag'] = headers['ETag']
        if request.headers.get('If-None-Match') == headers['ETag']:
            response.status_code = 304
            response.content = b''
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
        'editor': editor, 'hosts': calendar_hosts(),
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
def event_write(request, resource=None, calendar_key='acm'):
    if not can_edit(request):
        raise PermissionDenied
    try:
        source = get_calendar(calendar_key)
        if request.method == 'POST' and resource or request.method != 'POST' and not resource:
            return JsonResponse({'error': 'Unsupported operation.'}, status=405)
        if resource:
            path = resource_path(resource, source)
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
            recurring = len(components) != 1 or any(key in components[0] for key in ('RRULE', 'RDATE', 'RECURRENCE-ID'))
            if request.method == 'PUT':
                data = json.loads(request.body)
                if isinstance(data, dict) and set(data) == {'calendar'}:
                    destination = get_calendar(data['calendar'])
                    if destination['key'] != source['key']:
                        ensure_calendar(destination)
                        move_resource(source, destination, resource, etag)
                    return JsonResponse({'resource': resource, 'calendar': destination['key']})
                if CalendarMove.objects.filter(source_path=path, completed=False).exists():
                    return JsonResponse({'error': 'This event has an unfinished host move. Resume it with migrate_calendar_hosts before editing its details.'}, status=409)
            if recurring:
                return JsonResponse({'error': 'Edit recurring events in a native CalDAV client.'}, status=409)
            event = components[0]
            conditions = {'If-Match': etag}
        else:
            resource = f'{uuid.uuid4()}.ics'
            path = resource_path(resource, source)
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
            destination = get_calendar(data.get('calendar', source['key']))
            for field in ('description', 'location'):
                if not isinstance(data.get(field, ''), str):
                    raise ValueError(f'{field} must be text.')
            if resource and request.method == 'PUT' and destination['key'] != source['key']:
                # Save edits with the original ETag, then move exactly the saved resource.
                ensure_calendar(destination)
            elif request.method == 'POST':
                ensure_calendar(destination)
                path = resource_path(resource, destination)
            for key, value in {
                'SUMMARY': title.strip(), 'DESCRIPTION': data.get('description', ''),
                'LOCATION': data.get('location', ''), 'DTSTART': start, 'DTEND': end,
                'DURATION': None,
                'DTSTAMP': timezone.now(), 'LAST-MODIFIED': timezone.now(),
                'SEQUENCE': int(event.get('SEQUENCE', 0)) + 1,
            }.items():
                event.pop(key, None)
                if value is not None:
                    event.add(key, value)
            saved_content = calendar.to_ical()
            status, _, saved_headers = dav_request('PUT', path, saved_content, {
                **conditions, 'Content-Type': 'text/calendar; charset=utf-8',
            })
            if status in (200, 201, 204) and request.method == 'PUT' and destination['key'] != source['key']:
                current_status, current_content, current_headers = dav_request('GET', path)
                if current_status != 200:
                    raise CalendarUnavailable('Saved event could not be read; reload before retrying its move.')
                if fingerprint(current_content) != fingerprint(saved_content):
                    raise MoveConflict('Event changed after saving; its host was not changed.')
                move_resource(source, destination, resource, saved_headers.get('ETag', current_headers['ETag']))
        if status not in (200, 201, 204):
            return JsonResponse({'error': 'Event changed; reload and try again.'}, status=412 if status == 412 else 502)
        return JsonResponse({'resource': resource, 'calendar': source['key'] if request.method == 'DELETE' else destination['key']}, status=201 if request.method == 'POST' else 200)
    except MoveConflict as error:
        return JsonResponse({'error': str(error) + ' Reload the calendar before retrying.'}, status=409)
    except (ValueError, TypeError, OverflowError) as error:
        return JsonResponse({'error': str(error)}, status=400)
    except CalendarUnavailable as error:
        return JsonResponse({'error': str(error)}, status=503)
