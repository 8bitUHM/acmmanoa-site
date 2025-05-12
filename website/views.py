from django.shortcuts import render
from .models import Program, CarouselImage, Event

def home(request):
    # programs = Program.objects.select_related('image').all()
    programs = Program.objects.all()
    carousel_images = CarouselImage.objects.all().order_by('-created_at')
    return render(request, 'pages/home.html', {"programs": programs, "carousel_images": carousel_images})

def about(request):
    return render(request, 'pages/about.html')

def events(request):
    events = Event.objects.all().order_by('-event_date')
    return render(request, 'pages/events.html', {"events": events})

def sponsors(request):
    return render(request, 'pages/sponsors.html')

def icspace(request):
    return render(request, 'pages/icspace.html')

def sigs(request):
    return render(request, 'pages/sigs.html')

def impact(request):
    return render(request, 'pages/impact.html')

def cohorts(request):
    return render(request, 'pages/cohorts.html')
