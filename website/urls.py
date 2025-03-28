# example/urls.py
from django.urls import path

from website.views import home, about, events, sponsors, icspace, sigs, impact

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('events/', events, name='events'),
    path('sponsors/', sponsors, name='sponsors'),
    path('icspace/', icspace, name='icspace'),
    path('sigs/', sigs, name='sigs'),
    path('impact/', impact, name='impact'),
]