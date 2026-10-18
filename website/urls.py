# example/urls.py
from django.urls import path
from website.views import *
from website.calendar import events_calendar

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('events/', events, name='events'),
    path('events/calendar.ics', events_calendar, name='events_calendar'),
    path('events/<slug:slug>/', event_detail, name='event_detail'),
    path('sponsors/', sponsors, name='sponsors'),
    path('icspace/', icspace, name='icspace'),
    path('sigs/', sigs_index, name='sigs_index'),
    path('sigs/<slug:slug>', sig_detail, name='sig_detail'),
    path('impact/', impact, name='impact'),
    path('cohorts', cohorts, name='cohorts'),
    path('impact/', impact, name='impact')
]
