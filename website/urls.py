# example/urls.py
from django.urls import path

from website.views import index, about, events, icspace, impact, sigs, sponsors

urlpatterns = [
  path('', index, name='home'),
  path('about/', about, name='about'),
  path('events/', events, name='events'),
  path('sponsors/', sponsors, name='sponsors'),
  path('icspace/', icspace, name='icspace'),
  path('sigs/', sigs, name='sigs'),
  path('impact/', impact, name='impact'),
]