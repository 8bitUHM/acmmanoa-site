import hashlib
from datetime import datetime, timedelta, timezone as datetime_timezone
from zoneinfo import ZoneInfo

from django.core.management.base import BaseCommand, CommandError
from django.utils.dateparse import parse_date
from icalendar import Calendar, Event as CalendarEvent

from website.caldav import CalendarUnavailable, dav_request, ensure_calendars
from website.calendar_hosts import calendar_for_slug, get_calendar
from website.models import CalendarImport, Event, SIGS


def calendar_for(entry):
    calendar = Calendar()
    calendar.add('prodid', '-//ACM at UH Manoa//CalDAV migration//EN')
    calendar.add('version', '2.0')
    calendar.add_component(entry)
    return calendar


def legacy_events():
    for event in Event.objects.select_related('sig').order_by('pk').iterator():
        entry = CalendarEvent()
        entry.add('uid', f'acm-event-{event.pk}@acmmanoa.org')
        entry.add('dtstamp', event.created_at)
        entry.add('created', event.created_at)
        entry.add('dtstart', event.event_date.astimezone(datetime_timezone.utc))
        entry.add('summary', event.title)
        entry.add('description', event.description)
        entry.add('location', event.location)
        entry.add('x-acm-slug', event.slug)
        entry.add('x-acm-sig', event.sig.slug if event.sig else '')
        entry.add('x-acm-kind', event.kind)
        if event.image:
            # Keep database-file-storage references; media stays in the SQL database.
            entry.add('x-acm-image', event.image.url)
            entry.add('x-acm-image-name', event.image.name)
        yield f'event:{event.pk}', f'acm-event-{event.pk}.ics', entry


def legacy_meetings(anchor):
    weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for sig in SIGS.objects.exclude(meeting_days='').order_by('pk').iterator():
        if sig.meeting_days not in weekdays or not sig.meeting_start_time:
            raise CommandError(f'{sig.name}: select a valid meeting day and start time before importing meetings.')
        day = anchor + timedelta(days=(weekdays.index(sig.meeting_days) - anchor.weekday()) % 7)
        start = datetime.combine(day, sig.meeting_start_time, tzinfo=ZoneInfo('Pacific/Honolulu'))
        entry = CalendarEvent()
        entry.add('uid', f'acm-sig-meeting-{sig.pk}@acmmanoa.org')
        entry.add('dtstamp', datetime(2000, 1, 1, tzinfo=datetime_timezone.utc))
        entry.add('dtstart', start.astimezone(datetime_timezone.utc))
        if sig.meeting_end_time:
            end = datetime.combine(day, sig.meeting_end_time, tzinfo=start.tzinfo)
            if end <= start:
                end += timedelta(days=1)
            entry.add('dtend', end.astimezone(datetime_timezone.utc))
        entry.add('rrule', {'freq': 'weekly'})
        entry.add('summary', f'{sig.name} Meeting')
        entry.add('location', sig.meeting_location)
        entry.add('x-acm-sig', sig.slug)
        entry.add('x-acm-kind', 'meeting')
        yield f'sig:{sig.pk}', f'acm-sig-meeting-{sig.pk}.ics', entry


class Command(BaseCommand):
    help = 'Resumably copy legacy Event rows and optional SIG meeting schedules into Radicale.'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='List planned actions without network or database writes.')
        parser.add_argument('--update-existing', action='store_true', help='Update changed legacy rows only if their imported CalDAV event is untouched.')
        parser.add_argument('--meeting-start', help='Also import weekly SIG meetings, beginning on/after this YYYY-MM-DD date.')

    def handle(self, *args, **options):
        anchor = None
        if options['meeting_start']:
            try:
                anchor = parse_date(options['meeting_start'])
            except ValueError:
                pass
            if not anchor:
                raise CommandError('--meeting-start must be a valid YYYY-MM-DD date.')
        sources = list(legacy_events())
        if anchor:
            sources.extend(legacy_meetings(anchor))
        elif SIGS.objects.exclude(meeting_days='').exists():
            self.stdout.write('SIG schedules require an explicit --meeting-start date; importing Event records only.')
        if not options['dry_run']:
            try:
                ensure_calendars()
            except CalendarUnavailable as error:
                raise CommandError(str(error)) from error
        imported = skipped = conflicts = 0
        for key, resource, entry in sources:
            fingerprint = hashlib.sha256(entry.to_ical()).hexdigest()
            checkpoint = CalendarImport.objects.filter(source_key=key).first()
            if checkpoint and checkpoint.fingerprint == fingerprint:
                skipped += 1
                continue
            if checkpoint and not options['update_existing']:
                self.stderr.write(f'{key}: source changed; review it and use --update-existing if appropriate.')
                conflicts += 1
                continue
            if options['dry_run']:
                self.stdout.write(f'{"Update" if checkpoint else "Import"} {key} -> {resource}')
                imported += 1
                continue
            host = get_calendar(checkpoint.calendar) if checkpoint else calendar_for_slug(str(entry.get('X-ACM-SIG', '')))
            path = host['path'] + resource
            conditions = {'If-Match': checkpoint.etag} if checkpoint else {'If-None-Match': '*'}
            entry.add('x-acm-legacy-hash', fingerprint)
            content = calendar_for(entry).to_ical()
            try:
                status, _, _ = dav_request('PUT', path, content, {
                    **conditions, 'Content-Type': 'text/calendar; charset=utf-8',
                })
                if status == 412 and not checkpoint:
                    # Recover a successful upload whose SQL checkpoint was interrupted.
                    status, existing, headers = dav_request('GET', path)
                    if status == 200 and self.same_event(existing, entry):
                        self.record(key, fingerprint, resource, headers['ETag'], host['key'])
                        imported += 1
                        continue
                    status = 412
                if status not in (200, 201, 204):
                    self.stderr.write(f'{key}: HTTP {status}; left source and destination unchanged.')
                    conflicts += 1
                    continue
                status, uploaded, headers = dav_request('GET', path)
                if status != 200 or not self.same_event(uploaded, entry):
                    raise CalendarUnavailable(f'{key}: upload verification failed; retry to recover the checkpoint.')
                self.record(key, fingerprint, resource, headers['ETag'], host['key'])
                imported += 1
            except CalendarUnavailable as error:
                raise CommandError(f'{error} Completed imports are checkpointed; rerun to resume.') from error
        self.stdout.write(f'{imported} {"planned" if options["dry_run"] else "imported"}, {skipped} already imported, {conflicts} conflicts.')
        if conflicts:
            raise CommandError('Resolve the reported conflicts before completing the migration.')

    @staticmethod
    def same_event(content, expected):
        entries = Calendar.from_ical(content).walk('VEVENT')
        return len(entries) == 1 and entries[0].to_ical() == expected.to_ical()

    @staticmethod
    def record(key, fingerprint, resource, etag, calendar='acm'):
        CalendarImport.objects.update_or_create(source_key=key, defaults={
            'fingerprint': fingerprint, 'resource': resource, 'etag': etag, 'calendar': calendar,
        })
