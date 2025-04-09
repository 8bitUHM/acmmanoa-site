from django.shortcuts import render
from .models import Program
from .models import CarouselImage
def home(request):
    # programs = Program.objects.select_related('image').all()
    programs = Program.objects.all()
    carousel_images = CarouselImage.objects.all().order_by('-created_at')
    return render(request, 'pages/home.html', {"programs": programs, "carousel_images": carousel_images})

def about(request):
    return render(request, 'pages/about.html')

def events(request):
    return render(request, 'pages/events.html')

def sponsors(request):
    return render(request, 'pages/sponsors.html')

def icspace(request):
    return render(request, 'pages/icspace.html')

def sigs(request):
    return render(request, 'pages/sigs.html')

def impact(request):
    return render(request, 'pages/impact.html')
