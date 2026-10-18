from django.core.management.base import BaseCommand, CommandError

from website.caldav import CalendarUnavailable, ensure_calendar


class Command(BaseCommand):
    help = 'Create the shared Radicale calendar if it does not exist.'

    def handle(self, *args, **options):
        try:
            ensure_calendar()
        except CalendarUnavailable as error:
            raise CommandError(str(error)) from error
        self.stdout.write(self.style.SUCCESS('Shared CalDAV calendar is ready.'))
