import base64
import importlib.util
import json
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from unittest import skipUnless
from unittest.mock import patch

from django.contrib.auth.hashers import check_password, make_password
from django.test import Client, TestCase, override_settings
from django.contrib.auth import get_user_model
from django.urls import reverse
from icalendar import Calendar

from .caldav_accounts import CalDAVAccountForm
from .models import CalDAVAccount
from .caldav import dav_request, ensure_calendar, service_password


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
        users = Path(cls.temp.name) / 'users'
        users.write_text('calendar-admin:' + service_password() + '\n')
        cls.log = (Path(cls.temp.name) / 'radicale.log').open('w+')
        cls.server = subprocess.Popen([
            sys.executable, '-m', 'radicale', '--config', '',
            '--server-hosts', f'127.0.0.1:{port}', '--auth-type', 'htpasswd',
            '--auth-htpasswd-filename', str(users), '--auth-htpasswd-encryption', 'plain',
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
