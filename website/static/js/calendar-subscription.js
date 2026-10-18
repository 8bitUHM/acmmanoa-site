(function () {
  var dialog = document.getElementById('calendar-subscription');
  var button = document.getElementById('calendar-subscribe');
  var software = document.getElementById('calendar-software');
  var feed = document.getElementById('calendar-feed-url');
  var status = document.getElementById('calendar-copy-status');

  document.getElementById('calendar-host').addEventListener('change', function (event) {
    var url = new URL(event.target.value, window.location.origin);
    feed.value = url.href;
    dialog.querySelectorAll('a[href^="webcal:"]').forEach(function (link) {
      link.href = 'webcal://' + url.host + url.pathname;
    });
    status.textContent = '';
  });

  button.addEventListener('click', function () {
    dialog.showModal();
  });

  software.addEventListener('change', function () {
    dialog.querySelectorAll('[data-calendar-software]').forEach(function (guide) {
      guide.hidden = guide.dataset.calendarSoftware !== software.value;
    });
    status.textContent = '';
  });

  document.getElementById('calendar-copy-url').addEventListener('click', async function () {
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
