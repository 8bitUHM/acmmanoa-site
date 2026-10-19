from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponse
from django.urls import reverse
from .models import *
from datetime import timedelta
from django.utils import timezone
from django.utils.dateparse import parse_date, parse_datetime
from .caldav import CalendarUnavailable, host_resources
from .calendar_hosts import calendar_hosts
from .calendar import calendar_events
from icalendar import Calendar

def health(request):
    return HttpResponse("healthy\n", content_type="text/plain")

def home(request):
    # sigs = SIGS.objects.select_related('image').all()
    sigs = SIGS.objects.all()
    carousel_images = CarouselImage.objects.all().order_by('-created_at')
    questions = FAQ.objects.all().order_by('created_at')
    calendar_error = False
    try:
        now = timezone.now()
        upcoming_events = calendar_events(now, now + timedelta(days=180))[:3]
        for event in upcoming_events:
            event['event_date'] = parse_datetime(event['start']) or parse_date(event['start'])
    except CalendarUnavailable:
        upcoming_events = []
        calendar_error = True
    return render(request, 'pages/home.html', {
        "programs": sigs, 
        "carousel_images": carousel_images, 
        "questions": questions,
        "upcoming_events": upcoming_events,
        "calendar_error": calendar_error,
    })

def about(request):
    leaders = Leadership.objects.all().order_by('title')
    try:
        president = Leadership.objects.get(title='1')  # '1' is President in TITLE_CHOICES
        president_name = president.name
    except Leadership.DoesNotExist:
        president_name = None
    return render(request, 'pages/about.html', {"leaders": leaders, "president_name": president_name})

def events(request):
    return render(request, 'pages/events.html', {
        'calendar_feed_url': request.build_absolute_uri(reverse('events_calendar')),
        'calendar_hosts': calendar_hosts(),
    })

def event_detail(request, slug):
    # Preserve legacy event URLs using metadata carried into Radicale.
    try:
        for _, _, _, content in host_resources():
            for entry in Calendar.from_ical(content).walk('VEVENT'):
                if str(entry.get('X-ACM-SLUG', '')) == slug:
                    event = {
                        'title': str(entry.get('SUMMARY', '')),
                        'description': str(entry.get('DESCRIPTION', '')),
                        'location': str(entry.get('LOCATION', '')),
                        'event_date': entry.decoded('DTSTART'),
                    }
                    image_url = str(entry.get('X-ACM-IMAGE', ''))
                    if image_url.startswith('/') and not image_url.startswith('//'):
                        event['image'] = {'url': image_url}
                    return render(request, 'pages/event_detail.html', {'event': event})
    except CalendarUnavailable as error:
        return HttpResponse(str(error), status=503)
    raise Http404('Event not found')

def sponsors(request):
    sponsors = Sponsor.objects.defer('created_at').all()
    return render(request, 'pages/sponsors.html', {"sponsors": sponsors})

def icspace(request):
    return render(request, 'pages/icspace.html')

def sigs_index(request):
    sigs = SIGS.objects.all()
    return render(request, 'pages/sigs.html', {"sigs": sigs})

def sig_detail(request, slug):
    sig = get_object_or_404(SIGS, slug=slug)
    leadership = SIGSLeadership.objects.filter(sigs=sig).order_by('id')
    sig_colors = {
        'primary': sig.primary_color,
        'secondary': sig.get_secondary_color(),
        'light': sig.get_light_color()
    }
    return render(request, 'pages/sigs.html', {
        "sig": sig, 
        "leadership": leadership,
        "sig_colors": sig_colors
    })

# def cohorts(request):
#     cohorts = ACMKekuhaupioCohort.objects.defer('created_at').all().order_by('-image', '-comments')
#     semesters = ACMKekuhaupioCohort.objects.all().values_list('semester', flat=True).distinct()
#     return render(request, 'pages/cohorts.html', {"cohorts": cohorts, "semesters": semesters})

def cohorts(request):
    raise Http404("Page not found")

# def impact(request):
#     return render(request, 'pages/impact.html')

def impact(request):
    raise Http404("Page not found")
