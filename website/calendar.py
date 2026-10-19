from datetime import timezone as datetime_timezone

from django.http import HttpResponse
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_safe
from icalendar import Calendar, Event as CalendarEvent

from .models import Event


@require_safe
@cache_control(public=True, max_age=300)
def events_calendar(request):
    """Publish the current event collection for calendar subscriptions."""
    calendar = Calendar()
    calendar.add('prodid', '-//ACM at UH Manoa//Events//EN')
    calendar.add('version', '2.0')
    calendar.add('calscale', 'GREGORIAN')
    calendar.add('method', 'PUBLISH')
    calendar.add('x-wr-calname', 'ACM at UH Mānoa Events')
    calendar.add('x-wr-timezone', 'Pacific/Honolulu')
    published_at = timezone.now()

    # Keep past events so a refresh doesn't remove them from subscribers' history.
    for event in Event.objects.order_by('event_date', 'pk'):
        entry = CalendarEvent()
        # Identity must survive changes to the title, slug, and scheduled time.
        entry.add('uid', f'acm-event-{event.pk}@acmmanoa.org')
        entry.add('dtstamp', published_at)
        entry.add('created', event.created_at)
        entry.add('dtstart', event.event_date.astimezone(datetime_timezone.utc))
        entry.add('summary', event.title)
        entry.add('description', event.description)
        if event.location:
            entry.add('location', event.location)
        entry.add('url', request.build_absolute_uri(
            reverse('event_detail', kwargs={'slug': event.slug})
        ))
        # There is no end time in the model; don't invent a duration.
        calendar.add_component(entry)

    response = HttpResponse(calendar.to_ical(), content_type='text/calendar; charset=utf-8')
    response['Content-Disposition'] = 'inline; filename="acmmanoa-events.ics"'
    return response
