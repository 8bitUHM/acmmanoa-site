(function () {
  'use strict';
  const config = document.getElementById('calendar-config');
  const editor = config.dataset.editor === 'true';
  const status = document.getElementById('calendar-status');
  if (!window.FullCalendar || !window.luxon) {
    status.textContent = 'Calendar could not load. Refresh to try again or use the subscription link.';
    return;
  }
  const DateTime = luxon.DateTime;
  const zone = 'Pacific/Honolulu';
  const dialog = document.getElementById('event-dialog');
  const form = document.getElementById('event-form');
  const message = document.getElementById('event-status');
  const save = document.getElementById('event-save');
  const remove = document.getElementById('event-delete');
  let selected = null;
  let events = [];
  let busy = false;

  function field(name) { return form.elements.namedItem(name); }
  function filters() {
    const active = new Set(Array.from(document.querySelectorAll('.filters input:checked'), input => input.value));
    calendar.getEvents().forEach(event => event.setProp('display', active.has(event.extendedProps.calendar) ? 'auto' : 'none'));
  }
  function inputTime(value, allDay) {
    if (!value) return '';
    const time = DateTime.fromISO(value, { zone });
    return allDay ? time.toISODate() : time.toFormat("yyyy-MM-dd'T'HH:mm");
  }
  function changeType() {
    const allDay = field('allDay').checked;
    for (const name of ['start', 'end']) {
      const input = field(name);
      const value = input.value;
      input.type = allDay ? 'date' : 'datetime-local';
      input.value = value ? (allDay ? value.slice(0, 10) : value.slice(0, 10) + 'T09:00') : '';
    }
  }
  field('allDay').addEventListener('change', changeType);

  function openEvent(event, selection) {
    selected = event;
    form.reset();
    message.textContent = '';
    const props = event ? event.extendedProps : {};
    const readOnly = !editor || !!event && !props.canEdit;
    const allDay = event ? event.allDay : selection.allDay;
    field('allDay').checked = allDay;
    for (const name of ['start', 'end']) field(name).type = allDay ? 'date' : 'datetime-local';
    field('title').value = event ? event.title : '';
    field('description').value = props.description || '';
    field('location').value = props.location || '';
    field('calendar').value = props.calendar || config.dataset.defaultCalendar;
    field('calendar').disabled = readOnly;
    field('start').value = inputTime(event ? event.startStr : selection.startStr, allDay);
    field('end').value = inputTime(event ? event.endStr : selection.endStr, allDay);
    if (editor) {
      save.hidden = readOnly;
      remove.hidden = readOnly || !event || !!props.recurring;
      for (const name of ['title', 'description', 'location', 'start', 'end']) field(name).readOnly = readOnly || !!props.recurring;
      field('allDay').disabled = readOnly || !!props.recurring;
      if (readOnly) message.textContent = 'You have read-only access to this host calendar.';
      else if (props.recurring) message.textContent = 'Host changes move the entire recurring series. Edit other details in a native CalDAV client.';
    }
    dialog.showModal();
  }

  const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: window.innerWidth < 600 ? 'listMonth' : 'dayGridMonth',
    timeZone: zone,
    height: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listMonth' },
    selectable: editor,
    editable: false,
    dayMaxEvents: true,
    events: async function (range, success, failure) {
      try {
        const url = new URL(config.dataset.feed, window.location.origin);
        url.searchParams.set('start', range.startStr);
        url.searchParams.set('end', range.endStr);
        const response = await fetch(url, { credentials: 'same-origin' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load events.');
        events = data;
        status.textContent = '';
        success(events);
      } catch (error) {
        status.textContent = error.message;
        failure(error);
      }
    },
    eventsSet: function () {
      // Defer to avoid updating events inside FullCalendar's rendering lifecycle.
      window.requestAnimationFrame(function () {
        const active = new Set(Array.from(document.querySelectorAll('.filters input:checked'), input => input.value));
        calendar.getEvents().forEach(function (event) {
          const display = active.has(event.extendedProps.calendar) ? 'auto' : 'none';
          if (event.display !== display) event.setProp('display', display);
        });
      });
    },
    select: selection => openEvent(null, selection),
    eventClick: info => { info.jsEvent.preventDefault(); openEvent(info.event); },
  });
  calendar.render();
  document.querySelectorAll('.filters input').forEach(input => input.addEventListener('change', filters));
  document.getElementById('event-close').addEventListener('click', () => dialog.close());

  async function write(method) {
    if (busy || selected && !selected.extendedProps.canEdit) return;
    busy = true;
    save.disabled = true;
    remove.disabled = true;
    message.textContent = 'Saving…';
    try {
      const allDay = field('allDay').checked;
      const convert = value => !value ? null : allDay ? value : DateTime.fromISO(value, { zone }).toISO();
      const resource = selected ? selected.extendedProps.resource : null;
      const url = resource ? config.dataset.write + encodeURIComponent(selected.extendedProps.calendar) + '/' + encodeURIComponent(resource) + '/' : config.dataset.write;
      const headers = { 'Content-Type': 'application/json', 'X-CSRFToken': field('csrfmiddlewaretoken').value };
      if (selected) headers['If-Match'] = selected.extendedProps.etag;
      const response = await fetch(url, {
        method, headers, credentials: 'same-origin',
        body: method === 'DELETE' ? undefined : JSON.stringify(selected && selected.extendedProps.recurring ? {
          calendar: field('calendar').value,
        } : {
          title: field('title').value, description: field('description').value,
          location: field('location').value, start: convert(field('start').value),
          end: convert(field('end').value), allDay, calendar: field('calendar').value,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Save failed. Check your login and reload the calendar.');
      }
      dialog.close();
      calendar.refetchEvents();
    } catch (error) {
      message.textContent = error.message;
    } finally {
      busy = false;
      save.disabled = false;
      remove.disabled = false;
    }
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (editor) write(selected ? 'PUT' : 'POST');
  });
  if (remove) remove.addEventListener('click', function () {
    if (window.confirm('Delete this event from the public calendar and subscriptions?')) write('DELETE');
  });
})();
