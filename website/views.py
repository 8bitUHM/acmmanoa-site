from django.shortcuts import render
from .models import *

def home(request):
    # programs = Program.objects.select_related('image').all()
    programs = Program.objects.all()
    carousel_images = CarouselImage.objects.all().order_by('-created_at')
    questions = FAQ.objects.all().order_by('created_at')
    return render(request, 'pages/home.html', {"programs": programs, "carousel_images": carousel_images, "questions": questions})

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

def sigs(request):
    return render(request, 'pages/sigs.html')

def impact(request):
    return render(request, 'pages/impact.html')

def cohorts(request):
    cohorts = ACMKekuhaupioCohort.objects.defer('created_at').all().order_by('-image', '-comments')
    semesters = ACMKekuhaupioCohort.objects.all().values_list('semester', flat=True).distinct()
    return render(request, 'pages/cohorts.html', {"cohorts": cohorts, "semesters": semesters})
