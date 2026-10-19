# example/urls.py
from django.urls import path
from website.views import *
from website.calendar import calendar_embed, event_write, events_calendar, events_json

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('events/', events, name='events'),
    path('events/calendar.ics', events_calendar, name='events_calendar'),
    path('events/calendars/<slug:calendar_key>.ics', events_calendar, name='host_calendar'),
    path('calendar/embed/', calendar_embed, name='calendar_embed'),
    path('calendar/events/', events_json, name='calendar_events'),
    path('calendar/manage/', event_write, name='calendar_create'),
    path('calendar/manage/<str:resource>/', event_write, name='calendar_update'),
    path('calendar/manage/<slug:calendar_key>/<str:resource>/', event_write, name='host_calendar_update'),
    path('events/<slug:slug>/', event_detail, name='event_detail'),
    path('sponsors/', sponsors, name='sponsors'),
    path('icspace/', icspace, name='icspace'),
    path('sigs/', sigs_index, name='sigs_index'),
    path('sigs/<slug:slug>', sig_detail, name='sig_detail'),
    path('impact/', impact, name='impact'),
    path('cohorts', cohorts, name='cohorts'),
    path('impact/', impact, name='impact')
]
