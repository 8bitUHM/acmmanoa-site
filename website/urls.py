# example/urls.py
from django.urls import path
from website.views import *

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('events/', events, name='events'),
    path('sponsors/', sponsors, name='sponsors'),
    path('icspace/', icspace, name='icspace'),
    path('sigs/', sigs_index, name='sigs_index'),
    path('sigs/<slug:slug>', sig_detail, name='sig_detail'),
    path('impact/', impact, name='impact'),
    path('cohorts', cohorts, name='cohorts'),
    path('impact/', impact, name='impact')
]