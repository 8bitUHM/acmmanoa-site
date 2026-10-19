"""Verified, resumable cross-collection moves, including whole recurring series."""
import hashlib

from .caldav import CalendarUnavailable, dav_request
from .models import CalendarImport, CalendarMove
from icalendar import Calendar
from django.db import transaction


class MoveConflict(Exception):
    pass


def fingerprint(content):
    # Radicale may rewrite VCALENDAR wrapper properties; event and timezone
    # components must survive byte-for-byte after iCalendar normalization.
    parts = sorted(component.to_ical() for component in Calendar.from_ical(content).subcomponents)
    return hashlib.sha256(b'\0'.join(parts)).hexdigest()


def move_resource(source, destination, resource, etag=None):
    source_path, destination_path = source['path'] + resource, destination['path'] + resource
    status, content, headers = dav_request('GET', source_path)
    record = CalendarMove.objects.filter(source_path=source_path).first()
    if status == 404 and record and not record.completed:
        if record.destination_path != destination_path:
            raise MoveConflict('A move to a different host is already pending.')
    elif status != 200:
        raise MoveConflict(f'Source is unavailable (HTTP {status}).')
    else:
        current_etag = headers.get('ETag')
        if not current_etag or (etag and current_etag != etag):
            raise MoveConflict('Source changed; reload before moving it.')
        digest = fingerprint(content)
        if not record or record.completed:
            target_status, _, _ = dav_request('GET', destination_path)
            if target_status != 404:
                raise MoveConflict(f'Destination already exists or is unavailable (HTTP {target_status}).')
            defaults = {
                'destination_path': destination_path, 'source_etag': current_etag,
                'fingerprint': digest, 'destination_etag': '', 'completed': False,
            }
            # A concurrent move must not replace another pending destination.
            # Commit the intent before network writes so a crash is recoverable.
            with transaction.atomic():
                record, _ = CalendarMove.objects.get_or_create(source_path=source_path, defaults=defaults)
                record = CalendarMove.objects.select_for_update().get(pk=record.pk)
                if record.completed:
                    for field, value in defaults.items():
                        setattr(record, field, value)
                    record.save()
        if record.destination_path != destination_path or record.source_etag != current_etag or record.fingerprint != digest:
            raise MoveConflict('A pending move conflicts with the current source or requested host.')
        target_status, _, _ = dav_request('PUT', destination_path, content, {
            'Content-Type': 'text/calendar; charset=utf-8', 'If-None-Match': '*',
        })
        if target_status not in (200, 201, 204, 412):
            raise CalendarUnavailable(f'Cannot copy event (HTTP {target_status}); rerun to resume.')
    target_status, uploaded, target_headers = dav_request('GET', destination_path)
    if target_status != 200 or fingerprint(uploaded) != record.fingerprint:
        raise MoveConflict('Destination differs from the source; neither copy was deleted.')
    target_etag = target_headers.get('ETag', '')
    if not target_etag or (record.destination_etag and record.destination_etag != target_etag):
        raise MoveConflict('Destination changed during the move; neither copy was deleted.')
    record.destination_etag = target_etag
    record.save(update_fields=['destination_etag'])
    if status == 200:
        deleted, _, _ = dav_request('DELETE', source_path, headers={'If-Match': record.source_etag})
        if deleted not in (200, 204, 404):
            raise MoveConflict(f'Source could not be removed (HTTP {deleted}); rerun to resume.')
    # Keep the original ETag if the event was natively edited after its import.
    checkpoints = CalendarImport.objects.filter(resource=resource, calendar=source['key'])
    checkpoints.filter(etag=record.source_etag).update(etag=target_etag)
    checkpoints.update(calendar=destination['key'])
    record.completed = True
    record.save(update_fields=['completed'])
    return target_etag
