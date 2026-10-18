# Calendar accounts and subscriptions

This branch runs [Radicale 3](https://radicale.org/v3.html) as a private Compose
service and embeds FullCalendar in the public Events page and Django admin.
Radicale's persistent volume is the live event store. PostgreSQL stores the rest
of the website, calendar account password hashes, and the legacy event archive.

## Editing in the website

1. Start the stack with `docker compose up --build` (production uses
   `docker compose -f docker-compose.prod.yml up -d --build`). Startup provisions
   the shared calendar automatically.
2. Sign into Django admin and open **Website → Calendar** (`/admin/calendar/`).
   Staff need the **website | event | Can change event** permission; superusers
   already have it.
3. Select a date/time to create an event or select an event to edit/delete it.
   Times are in **Pacific/Honolulu**; all-day end dates are exclusive.
   Recurring series can be viewed here and edited with a native CalDAV client.

The iframe reuses the Django session. Django and Radicale independently derive
the private `calendar-admin` service password from `SECRET_KEY`; Radicale creates
its bcrypt password file at startup. No separate calendar login is needed and
the service password is never sent to browsers. Keep `SECRET_KEY` stable and
restart both services together if rotating it. Port 5232 is internal only.

## Create, reset, or revoke a calendar account

In Django admin, open **CalDAV accounts → Add**. Enter a username and password.
Enable **Can edit** only for people allowed to change the shared public calendar.
All accounts see the same ACM/SIG calendar; these are not private calendars.

Give the person their username, password, and the server URL:

```text
https://acmmanoa.org/caldav/
```

For clients requiring the collection URL instead of discovery, use:

```text
https://acmmanoa.org/caldav/calendar-admin/events/
```

Use your deployment's hostname for previews. Development URLs start with
`http://localhost:8000/`; use HTTPS for real devices. CalDAV accounts are separate
from Django logins and cannot sign into Django admin. Passwords are stored only
as Django hashes. To reset one, enter a new password on its admin form; leaving
the password blank preserves it. Disable **Is active** or delete the account to
revoke access immediately. Django administrators who manage these accounts need
the corresponding CalDAV account permissions.

## Google Calendar (subscription)

Google Calendar does not connect to arbitrary external CalDAV servers for editing.
On a computer, open Google Calendar, choose **Other calendars → + → From URL**,
and paste the public feed URL below. Click **Add calendar**. It will then be
available in the mobile app too. No CalDAV username/password is needed.

[Official Google instructions](https://support.google.com/calendar/answer/37100?hl=en)

## Microsoft Outlook (subscription)

- **New Outlook / Outlook on the web:** Calendar → **Add calendar → Subscribe from
  web**, paste the public feed URL, choose a name, then import/save.
- **Classic Outlook on Windows:** Calendar → **Open Calendar → From Internet**,
  paste the URL and confirm the subscription.

Use a subscription, not a one-time file import. Outlook does not offer native
arbitrary CalDAV account editing; edit through the Django panel or a supported
CalDAV client.

[Official Microsoft instructions/troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/outlook/calendaring/cannot-add-an-internet-calendar)

## iPhone / iPad Calendar

For **editable CalDAV access**, open **Settings → Apps → Calendar → Calendar
Accounts → Add Account → Other → Add CalDAV Account** (on older iOS versions:
**Settings → Calendar → Accounts**). Use the HTTPS CalDAV server URL above, the
issued username/password, and a description. Under advanced settings, SSL must
be enabled and the port must be **443**. If discovery fails, use the collection
URL above as the account URL. Enable Calendars and select the ACM calendar when
creating events. Read-only accounts cannot save changes.

For a **public subscription**, open Calendar → **Calendars → Add Calendar → Add
Subscription Calendar**, paste the feed URL, and confirm. The Events page's
**Open Apple Calendar** link can also launch the subscription prompt.

[Apple account setup](https://support.apple.com/guide/iphone/set-up-multiple-calendars-iph3d1110d4/ios)
· [Apple subscriptions](https://support.apple.com/102301)

## Mac Calendar

For **editable CalDAV access**, choose **Calendar → Add Account → Other CalDAV
Account**. Choose **Manual** and enter the issued credentials and the server
URL above. If necessary use **Advanced** with your domain, server path
`/caldav/`, port **443**, and SSL enabled. Select the ACM calendar when creating
events. For clients that do not discover it, use the explicit collection URL.

For a **public subscription**, choose **File → New Calendar Subscription**,
paste the feed URL and subscribe. Choose iCloud as the location to see it on
other Apple devices.

[Apple account setup](https://support.apple.com/guide/calendar/add-or-delete-calendar-accounts-icl4308d6701/mac)
· [Apple subscriptions](https://support.apple.com/102301)

## Public subscription URL

```text
https://acmmanoa.org/events/calendar.ics
```

This anonymous, read-only feed comes from Radicale and contains all ACM and SIG
events, including past events and recurring series, regardless of website filters.
Changes appear on the client's next refresh; the calendar app controls timing
and the feed may be cached for five minutes. Importing a downloaded file does
not subscribe to changes. Anyone can read these events; keep private material
out of this calendar.

The Events page reuses the software chooser, copyable URL, `webcal://` links,
and official setup instructions from `explore/subscribe-only`. This branch is
based directly on the pre-subscription mainline and does not depend on that
branch's commits or database-generated feed implementation.
