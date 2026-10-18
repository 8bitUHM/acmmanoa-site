import base64
import importlib.util
import json
import socket
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from io import StringIO
from zoneinfo import ZoneInfo
from pathlib import Path
from unittest import skipUnless
from unittest.mock import patch
from xml.etree import ElementTree
from urllib.parse import unquote, urlsplit

from django.contrib.auth.hashers import check_password, make_password
from django.test import Client, TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import CommandError
from django.db.models.deletion import ProtectedError
from django.urls import reverse
from icalendar import Calendar

from .caldav_accounts import CalDAVAccountForm
from .models import CalDAVAccount, CalendarImport, CalendarMove, Event, SIGS
from .caldav import CalendarUnavailable, calendar_resources, dav_request, ensure_calendar, service_password
from .calendar_hosts import get_calendar
from .calendar_moves import MoveConflict, move_resource, fingerprint


class CalDAVAccountsTest(TestCase):
    def setUp(self):
        self.account = CalDAVAccount.objects.create(
            username='member', password_hash=make_password('long-example-passphrase'),
        )
        self.auth = 'Basic ' + base64.b64encode(b'member:long-example-passphrase').decode()

    def test_form_hashes_password_and_preserves_it_on_edit(self):
        data = {'username': 'editor', 'password': 'long-new-passphrase', 'can_edit': True, 'is_active': True}
        form = CalDAVAccountForm(data)
        self.assertTrue(form.is_valid(), form.errors)
        account = form.save()
        self.assertTrue(check_password(data['password'], account.password_hash))
        original = account.password_hash
        form = CalDAVAccountForm({**data, 'password': ''}, instance=account)
        self.assertTrue(form.is_valid(), form.errors)
        self.assertEqual(form.save().password_hash, original)

    @patch('website.caldav_accounts.dav_request', return_value=(207, b'<xml/>', {'DAV': '1, 2, calendar-access'}))
    def test_basic_auth_discovery_and_no_session_bypass(self, dav):
        response = self.client.generic('PROPFIND', '/caldav/', HTTP_AUTHORIZATION=self.auth, HTTP_DEPTH='1')
        self.assertEqual(response.status_code, 207)
        self.assertEqual(dav.call_args.kwargs['script_name'], '/caldav')
        self.assertNotIn('Authorization', dav.call_args.args[3])
        self.assertEqual(self.client.get('/caldav/').status_code, 401)
        self.account.is_active = False
        self.account.save()
        self.assertEqual(self.client.get('/caldav/', HTTP_AUTHORIZATION=self.auth).status_code, 401)

    @patch('website.caldav_accounts.dav_request', return_value=(201, b'', {}))
    def test_only_editors_can_write_and_cannot_delete_collection(self, dav):
        path = '/caldav/calendar-admin/events/example.ics'
        self.assertEqual(self.client.put(path, HTTP_AUTHORIZATION=self.auth).status_code, 403)
        dav.assert_not_called()
        self.account.can_edit = True
        self.account.save()
        self.assertEqual(self.client.put(path, HTTP_AUTHORIZATION=self.auth).status_code, 201)
        self.assertEqual(self.client.delete('/caldav/calendar-admin/events/', HTTP_AUTHORIZATION=self.auth).status_code, 403)
        self.assertEqual(self.client.get('/caldav/other/', HTTP_AUTHORIZATION=self.auth).status_code, 404)


@skipUnless(importlib.util.find_spec('radicale'), 'Install Radicale[bcrypt]==3.5.10 for live CalDAV tests.')
class RadicaleIntegrationTest(TestCase):
    """Exercise actual DAV behavior, not a mock of our own implementation."""
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.temp = tempfile.TemporaryDirectory()
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            port = listener.getsockname()[1]
        cls.config = override_settings(SECRET_KEY='integration-only', CALDAV_URL=f'http://127.0.0.1:{port}')
        cls.config.enable()
        import bcrypt
        users = Path(cls.temp.name) / 'users'
        users.write_text('calendar-admin:' + bcrypt.hashpw(service_password().encode(), bcrypt.gensalt()).decode() + '\n')
        cls.log = (Path(cls.temp.name) / 'radicale.log').open('w+')
        cls.server = subprocess.Popen([
            sys.executable, '-m', 'radicale', '--config', str(Path(__file__).resolve().parents[1] / 'deploy/radicale/config'),
            '--server-hosts', f'127.0.0.1:{port}', '--auth-type', 'htpasswd',
            '--auth-htpasswd-filename', str(users), '--auth-htpasswd-encryption', 'bcrypt',
            '--storage-filesystem-folder', cls.temp.name + '/collections',
        ], stdout=cls.log, stderr=cls.log)
        for _ in range(100):
            try:
                with socket.create_connection(('127.0.0.1', port), timeout=0.1):
                    break
            except OSError:
                time.sleep(0.05)
        else:
            cls.server.terminate()
            cls.log.seek(0)
            raise RuntimeError(cls.log.read())
        ensure_calendar()

    @classmethod
    def tearDownClass(cls):
        cls.server.terminate()
        cls.server.wait(timeout=10)
        cls.log.close()
        cls.config.disable()
        cls.temp.cleanup()
        super().tearDownClass()

    def setUp(self):
        # SQL rolls back between tests; Radicale's filesystem does not.
        status, body, _ = dav_request('PROPFIND', '/calendar-admin/', headers={'Depth': '1'})
        self.assertEqual(status, 207)
        for href in ElementTree.fromstring(body).iter('{DAV:}href'):
            path = unquote(urlsplit(href.text).path)
            if path != '/calendar-admin/' and path.endswith('/'):
                for resource, _, _ in calendar_resources({'path': path}):
                    self.assertIn(dav_request('DELETE', path + resource)[0], (200, 204))
        ensure_calendar()
        self.user = get_user_model().objects.create_superuser('calendar-editor', password='long-passphrase')
        self.client.force_login(self.user)

    def event_data(self):
        return {'title': 'Mānoa workshop', 'description': 'Line one\nLine two 🌺',
                'location': 'POST 318B', 'start': '2026-10-20T18:00:00-10:00',
                'end': '2026-10-20T19:00:00-10:00', 'allDay': False, 'sig': '', 'kind': 'workshop'}

    def query_events(self):
        response = self.client.get(reverse('calendar_events'), {
            'start': '2026-10-01T00:00:00-10:00', 'end': '2026-11-01T00:00:00-10:00',
        })
        self.assertEqual(response.status_code, 200, response.content)
        return response.json()

    def test_create_read_edit_stale_delete_and_public_subscription(self):
        data = self.event_data()
        response = self.client.post(reverse('calendar_create'), data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201, response.content)
        resource = response.json()['resource']
        url = reverse('calendar_update', args=[resource])
        event = next(event for event in self.query_events() if event['extendedProps']['resource'] == resource)
        self.assertEqual(event['title'], data['title'])
        etag = event['extendedProps']['etag']
        response = self.client.put(url, json.dumps({**data, 'title': 'Updated'}), content_type='application/json', HTTP_IF_MATCH=etag)
        self.assertEqual(response.status_code, 200, response.content)
        response = self.client.put(url, json.dumps(data), content_type='application/json', HTTP_IF_MATCH=etag)
        self.assertEqual(response.status_code, 412)
        feed = Client().get(reverse('events_calendar'))
        self.assertEqual(feed.status_code, 200)
        self.assertIn('Updated', [str(event['SUMMARY']) for event in Calendar.from_ical(feed.content).walk('VEVENT')])
        etag = next(event['extendedProps']['etag'] for event in self.query_events() if event['extendedProps']['resource'] == resource)
        self.assertEqual(self.client.delete(url, HTTP_IF_MATCH=etag).status_code, 200)
        self.assertFalse(any(event['extendedProps']['resource'] == resource for event in self.query_events()))

    def test_session_permissions_csrf_and_same_origin_frames(self):
        public = Client(enforce_csrf_checks=True)
        self.assertEqual(public.post(reverse('calendar_create'), '{}', content_type='application/json').status_code, 403)
        self.assertEqual(public.get(reverse('calendar_embed') + '?edit=1').status_code, 403)
        embed = self.client.get(reverse('calendar_embed') + '?edit=1')
        self.assertEqual(embed.status_code, 200)
        self.assertEqual(embed['X-Frame-Options'], 'SAMEORIGIN')
        self.assertNotIn(service_password().encode(), embed.content)
        self.assertContains(self.client.get(reverse('calendar_admin')), '<iframe')
        self.assertEqual(public.get(reverse('calendar_embed'))['X-Frame-Options'], 'SAMEORIGIN')
        csrf_client = Client(enforce_csrf_checks=True)
        csrf_client.force_login(self.user)
        self.assertEqual(csrf_client.post(reverse('calendar_create'), '{}', content_type='application/json').status_code, 403)

    def test_recurring_native_events_expand_and_cannot_be_flattened_by_editor(self):
        resource = 'native-recurring.ics'
        content = b'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Test//EN\r\nBEGIN:VEVENT\r\nUID:recurring-test\r\nDTSTAMP:20261001T000000Z\r\nDTSTART:20261020T040000Z\r\nDTEND:20261020T050000Z\r\nRRULE:FREQ=DAILY;COUNT=3\r\nSUMMARY:Daily meeting\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n'
        status, _, _ = dav_request('PUT', '/calendar-admin/events/' + resource, content, {'Content-Type': 'text/calendar'})
        self.assertEqual(status, 201)
        events = [event for event in self.query_events() if event['extendedProps']['resource'] == resource]
        self.assertEqual(len(events), 3)
        self.assertTrue(all(event['extendedProps']['recurring'] for event in events))
        response = self.client.put(reverse('calendar_update', args=[resource]), json.dumps(self.event_data()), content_type='application/json', HTTP_IF_MATCH=events[0]['extendedProps']['etag'])
        self.assertEqual(response.status_code, 409)

    def test_native_client_can_discover_shared_calendar_through_gateway(self):
        CalDAVAccount.objects.create(username='native', password_hash=make_password('native-passphrase'), can_edit=True)
        auth = 'Basic ' + base64.b64encode(b'native:native-passphrase').decode()
        body = b'<D:propfind xmlns:D="DAV:"><D:prop><D:current-user-principal/></D:prop></D:propfind>'
        response = Client().generic('PROPFIND', '/caldav/', body, content_type='application/xml', HTTP_AUTHORIZATION=auth, HTTP_DEPTH='0')
        self.assertEqual(response.status_code, 207, response.content)
        self.assertIn(b'/caldav/calendar-admin/', response.content)

    def test_public_website_embeds_read_only_calendar(self):
        public = Client()
        response = public.get(reverse('events'), HTTP_HOST='acmmanoa.org', secure=True)
        self.assertContains(response, 'src="/calendar/embed/"')
        self.assertContains(response, 'https://acmmanoa.org/events/calendar.ics')
        self.assertContains(response, 'href="webcal://acmmanoa.org/events/calendar.ics"')
        for software in ['Google Calendar', 'Apple Calendar on Mac',
                         'Apple Calendar on iPhone or iPad', 'Microsoft Outlook (Windows)']:
            self.assertContains(response, software)
        self.assertNotContains(response, 'cal-body')
        self.assertEqual(public.get(reverse('home')).status_code, 200)

    def test_legacy_import_is_resumable_preserves_metadata_and_protects_native_edits(self):
        sig = SIGS.objects.create(name='Import SIG', slug='import-sig')
        source = Event.objects.create(
            title='Legacy event', slug='legacy-event', description='Legacy details 🌺',
            event_date=datetime(2026, 10, 23, 18, tzinfo=ZoneInfo('Pacific/Honolulu')),
            sig=sig, kind='talk', location='POST 318B',
        )
        output = StringIO()
        call_command('migrate_calendars', dry_run=True, stdout=output)
        self.assertIn('1 planned', output.getvalue())
        self.assertFalse(CalendarImport.objects.exists())
        call_command('migrate_calendars', stdout=StringIO())
        checkpoint = CalendarImport.objects.get(source_key=f'event:{source.pk}')
        status, content, _ = dav_request('GET', get_calendar(checkpoint.calendar)['path'] + checkpoint.resource)
        self.assertEqual(status, 200)
        entry = Calendar.from_ical(content).walk('VEVENT')[0]
        self.assertEqual(str(entry['UID']), f'acm-event-{source.pk}@acmmanoa.org')
        self.assertEqual(entry.decoded('DTSTART'), source.event_date)
        self.assertEqual(str(entry['X-ACM-SIG']), sig.slug)
        self.assertNotIn('DTEND', entry)
        self.assertContains(self.client.get(reverse('event_detail', args=[source.slug])), source.description)
        call_command('migrate_calendars', stdout=StringIO())
        self.assertEqual(CalendarImport.objects.count(), 1)
        # Simulate a crash after DAV upload but before recording the SQL checkpoint.
        CalendarImport.objects.all().delete()
        call_command('migrate_calendars', stdout=StringIO())
        self.assertEqual(CalendarImport.objects.count(), 1)
        source.title = 'SQL correction'
        source.save()
        with self.assertRaises(CommandError):
            call_command('migrate_calendars', stdout=StringIO(), stderr=StringIO())
        call_command('migrate_calendars', update_existing=True, stdout=StringIO())
        checkpoint = CalendarImport.objects.get(source_key=f'event:{source.pk}')
        # A native edit after import must prevent any later SQL overwrite.
        calendar = Calendar.from_ical(content)
        calendar.walk('VEVENT')[0]['SUMMARY'] = 'Native correction'
        dav_request('PUT', get_calendar(checkpoint.calendar)['path'] + checkpoint.resource, calendar.to_ical(), {'Content-Type': 'text/calendar'})
        source.title = 'Another SQL correction'
        source.save()
        with self.assertRaises(CommandError):
            call_command('migrate_calendars', update_existing=True, stdout=StringIO(), stderr=StringIO())
        self.assertTrue(Event.objects.filter(pk=source.pk).exists())

    def test_import_weekly_sig_schedules_with_explicit_start(self):
        sig = SIGS.objects.create(name='Weekly SIG', slug='weekly-sig', meeting_days='Monday',
                                  meeting_start_time='18:00', meeting_end_time='19:00', meeting_location='POST')
        call_command('migrate_calendars', meeting_start='2026-10-01', stdout=StringIO())
        checkpoint = CalendarImport.objects.get(source_key=f'sig:{sig.pk}')
        events = [event for event in self.query_events() if event['extendedProps']['resource'] == checkpoint.resource]
        self.assertEqual(len(events), 4)
        self.assertTrue(all(event['extendedProps']['recurring'] for event in events))
        self.assertEqual(events[0]['start'], '2026-10-06T04:00:00+00:00')

    def test_all_day_dates_and_mixed_timezone_sorting(self):
        records = [
            {**self.event_data(), 'title': 'Later Honolulu', 'start': '2026-10-24T18:00:00-10:00', 'end': None},
            {**self.event_data(), 'title': 'Earlier UTC', 'start': '2026-10-25T01:00:00+00:00', 'end': None},
            {**self.event_data(), 'title': 'All-day date', 'start': '2026-10-26', 'end': '2026-10-27', 'allDay': True},
        ]
        resources = []
        for data in records:
            response = self.client.post(reverse('calendar_create'), json.dumps(data), content_type='application/json')
            self.assertEqual(response.status_code, 201, response.content)
            resources.append(response.json()['resource'])
        events = [event for event in self.query_events() if event['extendedProps']['resource'] in resources]
        self.assertEqual([event['title'] for event in events], ['Earlier UTC', 'Later Honolulu', 'All-day date'])
        self.assertTrue(events[-1]['allDay'])
        self.assertEqual(events[-1]['start'], '2026-10-26')
        self.assertEqual(events[-1]['end'], '2026-10-27')

    def test_demo_data_is_repeatable_and_includes_all_day_and_recurring_events(self):
        output = StringIO()
        call_command('seed_calendar_demo', start_date='2026-10-01', stdout=output)
        self.assertIn('8 demo events created', output.getvalue())
        output = StringIO()
        call_command('seed_calendar_demo', start_date='2026-10-01', stdout=output)
        self.assertIn('0 demo events created; 8 already present', output.getvalue())
        self.assertEqual(SIGS.objects.filter(slug__startswith='demo-caldav-').count(), 2)
        events = [event for event in self.query_events() if event['extendedProps']['resource'].startswith('demo-caldav-')]
        self.assertTrue(any(event['allDay'] for event in events))
        self.assertTrue(any(event['extendedProps']['recurring'] for event in events))
        self.assertTrue(all(event['title'].startswith('[DEMO]') for event in events))

    def put_native(self, host, resource, sig='', recurring=False):
        recurrence = 'RRULE:FREQ=DAILY;COUNT=3\r\n' if recurring else ''
        exception = (f'BEGIN:VEVENT\r\nUID:{resource}\r\nDTSTAMP:20261001T000000Z\r\n'
                     'RECURRENCE-ID:20261021T040000Z\r\nDTSTART:20261021T060000Z\r\n'
                     'SUMMARY:Rescheduled occurrence\r\nEND:VEVENT\r\n') if recurring else ''
        content = (f'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Native//EN\r\nBEGIN:VEVENT\r\n'
                   f'UID:{resource}\r\nDTSTAMP:20261001T000000Z\r\nDTSTART:20261020T040000Z\r\n'
                   f'SUMMARY:Native event\r\nX-ACM-SIG:{sig}\r\nX-ACM-KIND:talk\r\n'
                   f'X-NATIVE-DETAIL:keep-me\r\n{recurrence}END:VEVENT\r\n{exception}END:VCALENDAR\r\n').encode()
        if recurring:
            zone = (b'BEGIN:VTIMEZONE\r\nTZID:Pacific/Honolulu\r\nBEGIN:STANDARD\r\n'
                    b'DTSTART:19700101T000000\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\n'
                    b'TZNAME:HST\r\nEND:STANDARD\r\nEND:VTIMEZONE\r\n')
            content = content.replace(b'BEGIN:VEVENT', zone + b'BEGIN:VEVENT', 1)
            content = content.replace(b'DTSTART:20261020T040000Z', b'DTSTART;TZID=Pacific/Honolulu:20261019T180000')
            content = content.replace(b'RECURRENCE-ID:20261021T040000Z', b'RECURRENCE-ID;TZID=Pacific/Honolulu:20261020T180000')
            content = content.replace(b'DTSTART:20261021T060000Z', b'DTSTART;TZID=Pacific/Honolulu:20261020T200000')
        status, _, _ = dav_request('PUT', host['path'] + resource, content, {'Content-Type': 'text/calendar'})
        self.assertEqual(status, 201)
        return dav_request('GET', host['path'] + resource)

    def make_host(self, name='AI & Robotics', slug='ai'):
        sig = SIGS.objects.create(name=name, slug=slug, primary_color='#123456')
        host = get_calendar(f'sig-{sig.pk}')
        ensure_calendar(host)
        return sig, host

    def test_named_calendars_are_discovered_and_renames_preserve_identity(self):
        sig, host = self.make_host()
        CalDAVAccount.objects.create(username='reader', password_hash=make_password('reader-passphrase'))
        auth = 'Basic ' + base64.b64encode(b'reader:reader-passphrase').decode()
        response = Client().generic('PROPFIND', '/caldav/calendar-admin/',
                                    b'<D:propfind xmlns:D="DAV:"><D:allprop/></D:propfind>',
                                    content_type='application/xml', HTTP_AUTHORIZATION=auth, HTTP_DEPTH='1')
        self.assertEqual(response.status_code, 207, response.content)
        self.assertIn(('/caldav' + host['path']).encode(), response.content)
        self.assertIn(b'AI &amp; Robotics', response.content)
        self.assertIn(b'#123456FF', response.content)
        sig.name, sig.slug = 'Renamed SIG', 'renamed'
        sig.save()
        renamed = get_calendar(host['key'])
        self.assertEqual(renamed['path'], host['path'])
        ensure_calendar(renamed)
        status, body, _ = dav_request('PROPFIND', host['path'], headers={'Depth': '0'})
        self.assertEqual(status, 207)
        self.assertIn(b'Renamed SIG', body)
        with self.assertRaises(ProtectedError):
            sig.delete()

    def test_editor_creates_in_host_calendar_and_feeds_are_separate(self):
        _, host = self.make_host()
        data = {**self.event_data(), 'calendar': host['key']}
        response = self.client.post(reverse('calendar_create'), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201, response.content)
        resource = response.json()['resource']
        event = next(event for event in self.query_events() if event['extendedProps']['resource'] == resource)
        self.assertEqual(event['extendedProps']['calendar'], host['key'])
        self.assertEqual(event['color'], host['color'])
        self.assertEqual(dav_request('GET', get_calendar()['path'] + resource)[0], 404)
        for key, count in [('acm', 0), (host['key'], 1)]:
            feed = self.client.get(reverse('host_calendar', args=[key]))
            self.assertEqual(feed.status_code, 200)
            self.assertEqual(len(Calendar.from_ical(feed.content).walk('VEVENT')), count)
        combined = self.client.get(reverse('events_calendar'))
        self.assertEqual(len(Calendar.from_ical(combined.content).walk('VEVENT')), 1)
        self.assertEqual(self.client.get(reverse('events_calendar'), HTTP_IF_NONE_MATCH=combined['ETag']).status_code, 304)
        self.assertEqual(self.client.get(reverse('host_calendar', args=['sig-99999'])).status_code, 404)
        url = reverse('host_calendar_update', args=[host['key'], resource])
        edited = self.client.put(url, json.dumps({**data, 'calendar': 'acm', 'title': 'Moved event'}),
                                 content_type='application/json', HTTP_IF_MATCH=event['extendedProps']['etag'])
        self.assertEqual(edited.status_code, 200, edited.content)
        self.assertEqual(dav_request('GET', host['path'] + resource)[0], 404)
        self.assertNotEqual(self.client.get(reverse('events_calendar'))['ETag'], combined['ETag'])

    def test_collection_controls_host_even_with_stale_metadata_and_same_filenames(self):
        _, first = self.make_host()
        _, second = self.make_host('Security', 'security')
        self.put_native(first, 'same.ics', sig='security')
        self.put_native(second, 'same.ics', sig='ai')
        events = self.query_events()
        self.assertEqual(len(events), 2)
        self.assertEqual(len({event['id'] for event in events}), 2)
        self.assertEqual({event['extendedProps']['calendar'] for event in events}, {first['key'], second['key']})

    def test_recurring_series_can_move_without_losing_exceptions_or_native_metadata(self):
        sig, host = self.make_host()
        _, original, headers = self.put_native(host, 'series.ics', sig=sig.slug, recurring=True)
        url = reverse('host_calendar_update', args=[host['key'], 'series.ics'])
        response = self.client.put(url, json.dumps({'calendar': 'acm'}), content_type='application/json', HTTP_IF_MATCH=headers['ETag'])
        self.assertEqual(response.status_code, 200, response.content)
        status, moved, _ = dav_request('GET', get_calendar()['path'] + 'series.ics')
        self.assertEqual(status, 200)
        self.assertEqual(fingerprint(original), fingerprint(moved))
        self.assertEqual(len(Calendar.from_ical(moved).walk('VTIMEZONE')), 1)
        self.assertEqual(len(self.query_events()), 3)
        self.assertTrue(all(event['extendedProps']['calendar'] == 'acm' for event in self.query_events()))
        call_command('migrate_calendar_hosts', stdout=StringIO())
        self.assertEqual(dav_request('GET', get_calendar()['path'] + 'series.ics')[0], 200)

    def test_shared_host_migration_is_dry_run_repeatable_and_updates_import_checkpoint(self):
        sig, host = self.make_host()
        source = get_calendar()
        _, original, headers = self.put_native(source, 'legacy-series.ics', sig=sig.slug, recurring=True)
        CalendarImport.objects.create(source_key='test:series', fingerprint='original', resource='legacy-series.ics', etag=headers['ETag'])
        output = StringIO()
        call_command('migrate_calendar_hosts', dry_run=True, stdout=output)
        self.assertIn('1 planned', output.getvalue())
        self.assertFalse(CalendarMove.objects.exists())
        self.assertEqual(dav_request('GET', source['path'] + 'legacy-series.ics')[0], 200)
        call_command('migrate_calendar_hosts', stdout=StringIO())
        self.assertEqual(dav_request('GET', source['path'] + 'legacy-series.ics')[0], 404)
        status, moved, headers = dav_request('GET', host['path'] + 'legacy-series.ics')
        self.assertEqual(status, 200)
        self.assertEqual(fingerprint(original), fingerprint(moved))
        checkpoint = CalendarImport.objects.get(source_key='test:series')
        self.assertEqual(checkpoint.calendar, host['key'])
        self.assertEqual(checkpoint.etag, headers['ETag'])
        output = StringIO()
        call_command('migrate_calendar_hosts', stdout=output)
        self.assertIn('0 moved; 0 conflicts', output.getvalue())

    def test_moves_resume_after_copy_or_source_deletion_and_never_overwrite_conflicts(self):
        _, host = self.make_host()
        source = get_calendar()
        for failure in ('copy', 'delete'):
            resource = failure + '.ics'
            _, original, headers = self.put_native(source, resource)
            def interrupted(method, path, *args, **kwargs):
                if method == 'DELETE':
                    if failure == 'delete':
                        dav_request(method, path, *args, **kwargs)
                    raise CalendarUnavailable('Simulated interruption')
                return dav_request(method, path, *args, **kwargs)
            with patch('website.calendar_moves.dav_request', side_effect=interrupted):
                with self.assertRaises(CalendarUnavailable):
                    move_resource(source, host, resource, headers['ETag'])
            call_command('migrate_calendar_hosts', stdout=StringIO())
            self.assertTrue(CalendarMove.objects.get(source_path=source['path'] + resource).completed)
            self.assertEqual(dav_request('GET', source['path'] + resource)[0], 404)
            self.assertEqual(fingerprint(dav_request('GET', host['path'] + resource)[1]), fingerprint(original))
        self.put_native(source, 'conflict.ics')
        _, target, _ = self.put_native(host, 'conflict.ics', sig='different')
        with self.assertRaises(MoveConflict):
            move_resource(source, host, 'conflict.ics')
        self.assertEqual(dav_request('GET', source['path'] + 'conflict.ics')[0], 200)
        self.assertEqual(dav_request('GET', host['path'] + 'conflict.ics')[1], target)

    def test_migration_reports_unknown_hosts_and_native_edits_block_pending_move(self):
        _, host = self.make_host()
        source = get_calendar()
        self.put_native(source, 'unknown.ics', sig='missing-sig')
        with self.assertRaises(CommandError):
            call_command('migrate_calendar_hosts', stdout=StringIO(), stderr=StringIO())
        self.assertEqual(dav_request('GET', source['path'] + 'unknown.ics')[0], 200)
        _, original, headers = self.put_native(source, 'edited.ics')
        with self.assertRaises(MoveConflict):
            move_resource(source, host, 'edited.ics', '"stale"')
        def interrupted(method, path, *args, **kwargs):
            if method == 'DELETE':
                raise CalendarUnavailable('Simulated interruption')
            return dav_request(method, path, *args, **kwargs)
        with patch('website.calendar_moves.dav_request', side_effect=interrupted):
            with self.assertRaises(CalendarUnavailable):
                move_resource(source, host, 'edited.ics', headers['ETag'])
        edited = original.replace(b'SUMMARY:Native event', b'SUMMARY:Native correction')
        dav_request('PUT', source['path'] + 'edited.ics', edited, {'Content-Type': 'text/calendar'})
        with self.assertRaises(MoveConflict):
            move_resource(source, host, 'edited.ics')
        self.assertIn(b'Native correction', dav_request('GET', source['path'] + 'edited.ics')[1])

    def test_native_gateway_moves_between_host_calendars_and_enforces_permissions(self):
        _, host = self.make_host()
        source = get_calendar()
        _, original, headers = self.put_native(source, 'native-move.ics', recurring=True)
        account = CalDAVAccount.objects.create(username='native', password_hash=make_password('native-passphrase'))
        auth = 'Basic ' + base64.b64encode(b'native:native-passphrase').decode()
        path = '/caldav' + source['path'] + 'native-move.ics'
        destination = 'http://testserver/caldav' + host['path'] + 'native-move.ics'
        response = Client().generic('MOVE', path, HTTP_AUTHORIZATION=auth, HTTP_DESTINATION=destination, HTTP_IF_MATCH=headers['ETag'])
        self.assertEqual(response.status_code, 403)
        account.can_edit = True
        account.save()
        response = Client().generic('MOVE', path, HTTP_AUTHORIZATION=auth, HTTP_DESTINATION=destination, HTTP_IF_MATCH=headers['ETag'])
        self.assertEqual(response.status_code, 201, response.content)
        self.assertEqual(fingerprint(dav_request('GET', host['path'] + 'native-move.ics')[1]), fingerprint(original))
        self.assertEqual(Client().delete('/caldav' + host['path'], HTTP_AUTHORIZATION=auth).status_code, 403)
        self.assertEqual(Client().get('/caldav/calendar-admin/sig-99999/', HTTP_AUTHORIZATION=auth).status_code, 404)

    def test_moving_natively_edited_import_does_not_restore_sql_overwrite_permission(self):
        _, host = self.make_host()
        source = get_calendar()
        _, original, headers = self.put_native(source, 'edited-import.ics')
        checkpoint = CalendarImport.objects.create(source_key='event:99', fingerprint='old-source',
                                                   resource='edited-import.ics', etag=headers['ETag'])
        edited = original.replace(b'SUMMARY:Native event', b'SUMMARY:Native correction')
        dav_request('PUT', source['path'] + 'edited-import.ics', edited, {'Content-Type': 'text/calendar'})
        move_resource(source, host, 'edited-import.ics')
        checkpoint.refresh_from_db()
        self.assertEqual(checkpoint.calendar, host['key'])
        self.assertEqual(checkpoint.etag, headers['ETag'])
        self.assertNotEqual(checkpoint.etag, dav_request('GET', host['path'] + 'edited-import.ics')[2]['ETag'])
