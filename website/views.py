from django.shortcuts import render, get_object_or_404
from .models import *

def home(request):
    # sigs = SIGS.objects.select_related('image').all()
    sigs = SIGS.objects.all()
    carousel_images = CarouselImage.objects.all().order_by('-created_at')
    questions = FAQ.objects.all().order_by('created_at')
    return render(request, 'pages/home.html', {"programs": sigs, "carousel_images": carousel_images, "questions": questions})

def about(request):
    leaders = Leadership.objects.all().order_by('title')
    return render(request, 'pages/about.html', {"leaders": leaders})

def events(request):
    events = Event.objects.all().order_by('-event_date')
    return render(request, 'pages/events.html', {"events": events})

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
    leadership = SIGSLeadership.objects.filter(sigs=sig).order_by('name')
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

def impact(request):
    return render(request, 'pages/impact.html')

def cohorts(request):
    cohorts = ACMKekuhaupioCohort.objects.defer('created_at').all().order_by('-image', '-comments')
    semesters = ACMKekuhaupioCohort.objects.all().values_list('semester', flat=True).distinct()
    return render(request, 'pages/cohorts.html', {"cohorts": cohorts, "semesters": semesters})
