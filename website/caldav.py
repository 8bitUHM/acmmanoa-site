"""Small, server-side DAV transport. Service credentials never reach the browser."""
import base64
import hashlib
import hmac
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

from django.conf import settings


class CalendarUnavailable(Exception):
    pass


def service_password():
    return hmac.new(
        settings.SECRET_KEY.encode(), b'acmmanoa-caldav-service-v1', hashlib.sha256,
    ).hexdigest()


def dav_request(method, path, body=None, headers=None, *, script_name=''):
    auth = base64.b64encode(f'calendar-admin:{service_password()}'.encode()).decode()
    request_headers = {'Authorization': f'Basic {auth}', **(headers or {})}
    if script_name:
        request_headers['X-Script-Name'] = script_name
    request = Request(settings.CALDAV_URL + path, data=body, headers=request_headers, method=method)
    try:
        response = urlopen(request, timeout=15)
    except HTTPError as error:
        response = error
    except (URLError, TimeoutError, OSError) as error:
        raise CalendarUnavailable('Calendar service is unavailable. Please try again later.') from error
    with response:
        return response.status, response.read(), response.headers


def ensure_calendar():
    status, _, _ = dav_request('PROPFIND', settings.CALDAV_COLLECTION, headers={'Depth': '0'})
    if status == 207:
        return
    if status != 404:
        raise CalendarUnavailable(f'Cannot inspect calendar (HTTP {status}).')
    body = b'''<?xml version="1.0" encoding="utf-8"?>
<C:mkcalendar xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:set><D:prop><D:displayname>ACM at UH Manoa Events</D:displayname>
  <C:supported-calendar-component-set><C:comp name="VEVENT"/></C:supported-calendar-component-set>
  </D:prop></D:set>
</C:mkcalendar>'''
    status, _, _ = dav_request('MKCALENDAR', settings.CALDAV_COLLECTION, body, {'Content-Type': 'application/xml'})
    # Another worker may have created it concurrently.
    if status not in (201, 405):
        raise CalendarUnavailable(f'Cannot create calendar (HTTP {status}).')


def read_calendar():
    status, body, headers = dav_request('GET', settings.CALDAV_COLLECTION)
    if status != 200:
        raise CalendarUnavailable(f'Cannot read calendar (HTTP {status}).')
    return body, headers


def calendar_resources():
    """Fetch resource names and ETags together with their iCalendar content."""
    body = b'''<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
<D:prop><D:getetag/><C:calendar-data/></D:prop>
<C:filter><C:comp-filter name="VCALENDAR"><C:comp-filter name="VEVENT"/></C:comp-filter></C:filter>
</C:calendar-query>'''
    status, data, _ = dav_request('REPORT', settings.CALDAV_COLLECTION, body, {
        'Content-Type': 'application/xml', 'Depth': '1',
    })
    if status != 207:
        raise CalendarUnavailable(f'Cannot query events (HTTP {status}).')
    try:
        result = []
        for response in ElementTree.fromstring(data).findall('{DAV:}response'):
            href = response.findtext('{DAV:}href', '')
            for propstat in response.findall('{DAV:}propstat'):
                if ' 200 ' not in propstat.findtext('{DAV:}status', ''):
                    continue
                prop = propstat.find('{DAV:}prop')
                content = prop.findtext('{urn:ietf:params:xml:ns:caldav}calendar-data')
                if content:
                    result.append((unquote(urlsplit(href).path.rsplit('/', 1)[-1]),
                                   prop.findtext('{DAV:}getetag', ''), content))
        return result
    except ElementTree.ParseError as error:
        raise CalendarUnavailable('Calendar returned an invalid response.') from error
