import base64
from unittest.mock import patch

from django.contrib.auth.hashers import check_password, make_password
from django.test import TestCase

from .caldav_accounts import CalDAVAccountForm
from .models import CalDAVAccount


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
