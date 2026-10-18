from datetime import datetime, time, timedelta, timezone as datetime_timezone
from zoneinfo import ZoneInfo

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from django.utils.dateparse import parse_date
from icalendar import Calendar, Event

from website.caldav import CalendarUnavailable, dav_request, ensure_calendar
from website.models import SIGS


class Command(BaseCommand):
    help = 'Add clearly labeled demo CalDAV events and SIGs without replacing existing data.'

    def add_arguments(self, parser):
        parser.add_argument('--start-date', help='Anchor demo dates to YYYY-MM-DD (default: today in Honolulu).')

    def handle(self, *args, **options):
        try:
            anchor = parse_date(options['start_date']) if options['start_date'] else timezone.localdate()
        except ValueError:
            anchor = None
        if anchor is None:
            raise CommandError('--start-date must be a valid YYYY-MM-DD date.')
        try:
            ensure_calendar()
            for slug, name, color in [
                ('demo-caldav-ai', '[DEMO] AI SIG', '#7C3AED'),
                ('demo-caldav-security', '[DEMO] Security SIG', '#059669'),
            ]:
                SIGS.objects.get_or_create(slug=slug, defaults={
                    'name': name, 'about': 'Sample group for the CalDAV preview.', 'primary_color': color,
                })
            specs = [
                ('orientation', 'Past orientation', -3, 17, 'meeting', '', 'POST 318B'),
                ('welcome', 'Welcome and pizza night', 1, 18, 'social', '', 'Campus Center'),
                ('python', 'Python workshop', 2, 17, 'workshop', 'demo-caldav-ai', 'POST 318B'),
                ('security', 'Capture the flag practice', 3, 18, 'competition', 'demo-caldav-security', 'ICS Lab'),
                ('study', 'Weekly AI study group', 4, 16, 'meeting', 'demo-caldav-ai', 'POST 302'),
                ('hackathon', 'Weekend hackathon', 6, None, 'hackathon', '', 'Innovation Center'),
                ('talk', 'Careers in software engineering', 8, 17, 'talk', '', 'Online'),
                ('showcase', 'Student project showcase', 15, 18, 'networking', '', 'Campus Center Ballroom'),
            ]
            created = skipped = 0
            for key, title, offset, hour, kind, sig, location in specs:
                day = anchor + timedelta(days=offset)
                entry = Event()
                entry.add('uid', f'demo-caldav-{key}@acmmanoa.org')
                entry.add('dtstamp', timezone.now())
                entry.add('summary', f'[DEMO] {title}')
                entry.add('description', 'Dummy event for exploring the CalDAV calendar. This is not a real ACM event.')
                entry.add('location', location)
                entry.add('x-acm-sig', sig)
                entry.add('x-acm-kind', kind)
                entry.add('x-acm-demo', 'true')
                if hour is None:
                    entry.add('dtstart', day)
                    entry.add('dtend', day + timedelta(days=2))
                else:
                    start = datetime.combine(day, time(hour), tzinfo=ZoneInfo('Pacific/Honolulu'))
                    entry.add('dtstart', start.astimezone(datetime_timezone.utc))
                    entry.add('dtend', (start + timedelta(hours=1, minutes=30)).astimezone(datetime_timezone.utc))
                if key == 'study':
                    entry.add('rrule', {'freq': 'weekly', 'count': 6})
                calendar = Calendar()
                calendar.add('prodid', '-//ACM at UH Manoa//CalDAV demo//EN')
                calendar.add('version', '2.0')
                calendar.add_component(entry)
                status, _, _ = dav_request('PUT', settings.CALDAV_COLLECTION + f'demo-caldav-{key}.ics', calendar.to_ical(), {
                    'Content-Type': 'text/calendar; charset=utf-8', 'If-None-Match': '*',
                })
                if status == 412:
                    skipped += 1
                elif status in (200, 201, 204):
                    created += 1
                else:
                    raise CalendarUnavailable(f'Demo event {key} could not be created (HTTP {status}).')
        except CalendarUnavailable as error:
            raise CommandError(str(error)) from error
        self.stdout.write(self.style.SUCCESS(f'{created} demo events created; {skipped} already present.'))
