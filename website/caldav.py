"""Small, server-side DAV transport. Service credentials never reach the browser."""
import base64
import hashlib
import hmac
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree
from xml.sax.saxutils import escape

from icalendar import Calendar

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


def ensure_calendar(host=None):
    from .calendar_hosts import get_calendar
    from .models import ProvisionedCalendar
    host = host or get_calendar()
    status, _, _ = dav_request('PROPFIND', host['path'], headers={'Depth': '0'})
    if status not in (207, 404):
        raise CalendarUnavailable(f'Cannot inspect calendar (HTTP {status}).')
    properties = f'''<D:set><D:prop><D:displayname>{escape(host['name'])}</D:displayname>
    <A:calendar-color>{escape(host['color'])}FF</A:calendar-color>
    </D:prop></D:set>'''
    attributes = 'xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav" xmlns:A="http://apple.com/ns/ical/"'
    if status == 404:
        supported = '<C:supported-calendar-component-set><C:comp name="VEVENT"/></C:supported-calendar-component-set>'
        creation = properties.replace('</D:prop>', supported + '</D:prop>')
        body = f'<C:mkcalendar {attributes}>{creation}</C:mkcalendar>'.encode()
        status, _, _ = dav_request('MKCALENDAR', host['path'], body, {'Content-Type': 'application/xml'})
        if status not in (201, 405):
            raise CalendarUnavailable(f'Cannot create calendar (HTTP {status}).')
    body = f'<D:propertyupdate {attributes}>{properties}</D:propertyupdate>'.encode()
    status, response, _ = dav_request('PROPPATCH', host['path'], body, {'Content-Type': 'application/xml'})
    if status != 207 or any(' 200 ' not in (node.text or '') for node in ElementTree.fromstring(response).iter('{DAV:}status')):
        raise CalendarUnavailable(f'Cannot set calendar metadata (HTTP {status}).')
    if host['sig_id']:
        ProvisionedCalendar.objects.get_or_create(sig_id=host['sig_id'])


def ensure_calendars():
    from .calendar_hosts import calendar_hosts
    for host in calendar_hosts():
        ensure_calendar(host)


def read_calendar(host=None, *, hosts=None):
    from .calendar_hosts import calendar_hosts
    calendar = Calendar()
    calendar.add('prodid', '-//ACM at UH Manoa//CalDAV//EN')
    calendar.add('version', '2.0')
    name = host['name'] if host else 'ACM and SIG events'
    if hosts is not None:
        name = ' + '.join(owner['name'] for owner in hosts)
    calendar.add('x-wr-calname', name)
    components = set()
    owners = hosts if hosts is not None else [host] if host else calendar_hosts()
    for owner in owners:
        for _, _, content in calendar_resources(owner):
            for component in Calendar.from_ical(content).subcomponents:
                if component.name == 'VEVENT' and ('SUMMARY' in component or 'RECURRENCE-ID' not in component):
                    title = str(component.get('SUMMARY', '(Untitled event)'))
                    component['SUMMARY'] = f'[{owner["name"]}] {title}'
                # Keep recurrence exceptions and time zones, without duplicate zones.
                encoded = component.to_ical()
                if component.name != 'VTIMEZONE' or encoded not in components:
                    calendar.add_component(component)
                components.add(encoded)
    body = calendar.to_ical()
    return body, {'ETag': '"' + hashlib.sha256(body).hexdigest() + '"'}


def calendar_resources(host=None):
    """Fetch resource names and ETags together with their iCalendar content."""
    from .calendar_hosts import get_calendar
    host = host or get_calendar()
    body = b'''<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
<D:prop><D:getetag/><C:calendar-data/></D:prop>
<C:filter><C:comp-filter name="VCALENDAR"><C:comp-filter name="VEVENT"/></C:comp-filter></C:filter>
</C:calendar-query>'''
    status, data, _ = dav_request('REPORT', host['path'], body, {
        'Content-Type': 'application/xml', 'Depth': '1',
    })
    if status == 404:
        return []
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


def host_resources():
    from .calendar_hosts import calendar_hosts
    for host in calendar_hosts():
        for resource, etag, content in calendar_resources(host):
            yield host, resource, etag, content
