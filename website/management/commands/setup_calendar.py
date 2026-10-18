from django.core.management.base import BaseCommand, CommandError

from website.caldav import CalendarUnavailable, ensure_calendars


class Command(BaseCommand):
    help = 'Provision ACM and SIG calendars and synchronize their names and colors.'

    def handle(self, *args, **options):
        try:
            ensure_calendars()
        except CalendarUnavailable as error:
            raise CommandError(str(error)) from error
        self.stdout.write(self.style.SUCCESS('ACM and SIG CalDAV calendars are ready.'))
