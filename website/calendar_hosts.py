"""Stable host identities shared by the website, feeds and native DAV gateway."""
from django.conf import settings

from .models import SIGS


def calendar_hosts():
    root = settings.CALDAV_COLLECTION.rstrip('/').rsplit('/', 1)[0] + '/'
    return [dict(key='acm', name='ACM', color='#3F6FE6', slug='', sig_id=None,
                 path=settings.CALDAV_COLLECTION)] + [
        dict(key=f'sig-{sig.pk}', name=sig.name, color=sig.primary_color,
             slug=sig.slug, sig_id=sig.pk, path=f'{root}sig-{sig.pk}/')
        for sig in SIGS.objects.order_by('name', 'pk')
    ]


def get_calendar(key='acm'):
    for host in calendar_hosts():
        if host['key'] == key:
            return host
    raise ValueError('Choose an existing host calendar.')


def calendar_for_slug(slug):
    for host in calendar_hosts():
        if host['slug'] == slug:
            return host
    raise ValueError(f'Unknown legacy SIG: {slug}')
