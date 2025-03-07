# example/views.py
from django.shortcuts import render
from django.shortcuts import get_object_or_404

def index(request):
    return render(request, 'pages/home.html')

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