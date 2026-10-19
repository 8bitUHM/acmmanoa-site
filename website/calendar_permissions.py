"""Calendar editing grants for separate Django and native CalDAV identities."""
from .calendar_hosts import calendar_hosts


def user_editable_calendars(user):
    if not user.is_authenticated or not user.is_active or not user.is_staff:
        return set()
    available = {host['key'] for host in calendar_hosts()}
    if user.is_superuser or user.has_perm('website.change_event'):
        return available
    return available.intersection(user.calendar_edit_grants.values_list('calendar', flat=True))


def account_editable_calendars(account):
    if not account.is_active:
        return set()
    available = {host['key'] for host in calendar_hosts()}
    if account.can_edit:
        return available
    return available.intersection(account.calendar_edit_grants.values_list('calendar', flat=True))
