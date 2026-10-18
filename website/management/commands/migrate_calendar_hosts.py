from django.core.management.base import BaseCommand, CommandError
from icalendar import Calendar

from website.caldav import CalendarUnavailable, calendar_resources, ensure_calendars
from website.calendar_hosts import calendar_hosts, get_calendar
from website.calendar_moves import MoveConflict, move_resource
from website.models import CalendarMove


class Command(BaseCommand):
    help = 'Resumably move shared-calendar SIG events into their own host calendars.'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Read and report moves without writing to SQL or CalDAV.')

    def handle(self, *args, **options):
        moved = conflicts = 0
        hosts = calendar_hosts()
        by_slug = {host['slug']: host for host in hosts}
        by_path = {host['path']: host for host in hosts}
        source = get_calendar()
        try:
            if not options['dry_run']:
                ensure_calendars()
            # Finish interrupted operations first, including a crash after source deletion.
            pending = list(CalendarMove.objects.filter(completed=False))
            pending_paths = {record.source_path for record in pending}
            for record in pending:
                resource = record.source_path.rsplit('/', 1)[-1]
                owner = by_path.get(record.source_path.rsplit('/', 1)[0] + '/')
                destination = by_path.get(record.destination_path.rsplit('/', 1)[0] + '/')
                if not owner or not destination:
                    self.stderr.write(f'{record.source_path}: pending move has an unknown host.')
                    conflicts += 1
                    continue
                if options['dry_run']:
                    self.stdout.write(f'Resume {record.source_path} -> {record.destination_path}')
                    moved += 1
                    continue
                try:
                    move_resource(owner, destination, resource, record.source_etag)
                    moved += 1
                except MoveConflict as error:
                    self.stderr.write(f'{record.source_path}: {error}')
                    conflicts += 1
            for resource, etag, content in calendar_resources(source):
                if source['path'] + resource in pending_paths:
                    continue
                if CalendarMove.objects.filter(destination_path=source['path'] + resource, completed=True).exists():
                    # A completed move into ACM is an explicit host assignment;
                    # stale legacy metadata must never move it back to its old SIG.
                    continue
                entries = Calendar.from_ical(content).walk('VEVENT')
                slugs = {str(entry.get('X-ACM-SIG', '')) for entry in entries}
                # Exception components may omit legacy metadata; inherit the master's host.
                masters = [entry for entry in entries if 'RECURRENCE-ID' not in entry]
                slug = str(masters[0].get('X-ACM-SIG', '')) if len(masters) == 1 else ''
                if len(masters) != 1 or slugs - {'', slug} or slug not in by_slug:
                    self.stderr.write(f'{resource}: unknown or inconsistent SIG references {sorted(slugs)}; left in ACM.')
                    conflicts += 1
                    continue
                destination = by_slug[slug]
                if destination['key'] == 'acm':
                    continue
                self.stdout.write(f'Move {resource} -> {destination["name"]} ({destination["key"]})')
                if options['dry_run']:
                    moved += 1
                    continue
                try:
                    move_resource(source, destination, resource, etag)
                    moved += 1
                except MoveConflict as error:
                    self.stderr.write(f'{resource}: {error}')
                    conflicts += 1
        except CalendarUnavailable as error:
            raise CommandError(f'{error} Rerun this command to resume checkpointed moves.') from error
        self.stdout.write(f'{moved} {"planned" if options["dry_run"] else "moved"}; {conflicts} conflicts.')
        if conflicts:
            raise CommandError('Resolve the reported conflicts; completed moves are safe to rerun.')
