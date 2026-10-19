(function () {
  var dialog = document.getElementById('calendar-subscription');
  var button = document.getElementById('calendar-subscribe');
  var software = document.getElementById('calendar-software');
  var feed = document.getElementById('calendar-feed-url');
  var status = document.getElementById('calendar-copy-status');
  var all = document.getElementById('calendar-all-hosts');
  var choices = Array.from(dialog.querySelectorAll('input[name="subscription-calendar"]'));
  var copy = document.getElementById('calendar-copy-url');
  var selectionStatus = document.getElementById('calendar-selection-status');

  function updateFeed() {
    var selected = choices.filter(function (choice) { return choice.checked; });
    var url = new URL(feed.dataset.feedBase, window.location.origin);
    all.checked = selected.length === choices.length;
    all.indeterminate = selected.length > 0 && !all.checked;
    if (!all.checked && selected.length) {
      url.searchParams.set('calendars', selected.map(function (choice) { return choice.value; }).sort().join(','));
    }
    feed.value = selected.length ? url.href : '';
    feed.disabled = copy.disabled = !selected.length;
    selectionStatus.textContent = !selected.length ? 'Choose at least one calendar to subscribe.' : all.checked ?
      'All calendars, including future calendars, will appear together as one calendar in your app.' :
      selected.length + ' selected calendar' + (selected.length === 1 ? '' : 's') + ' will appear as one calendar in your app.';
    dialog.querySelectorAll('[data-calendar-open]').forEach(function (link) {
      link.hidden = !selected.length;
      if (selected.length) link.href = 'webcal://' + url.host + url.pathname + url.search;
      else link.removeAttribute('href');
    });
    status.textContent = '';
  }

  all.addEventListener('change', function () {
    choices.forEach(function (choice) { choice.checked = all.checked; });
    updateFeed();
  });
  choices.forEach(function (choice) { choice.addEventListener('change', updateFeed); });
  updateFeed();

  button.addEventListener('click', function () {
    dialog.showModal();
  });

  software.addEventListener('change', function () {
    dialog.querySelectorAll('[data-calendar-software]').forEach(function (guide) {
      guide.hidden = guide.dataset.calendarSoftware !== software.value;
    });
    status.textContent = '';
  });

  copy.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(feed.value);
      status.textContent = 'Feed URL copied. Paste it into your calendar app.';
    } catch (error) {
      feed.focus();
      feed.select();
      feed.setSelectionRange(0, feed.value.length);
      status.textContent = 'Copy is unavailable. The URL is selected so you can copy it manually.';
    }
  });
})();
