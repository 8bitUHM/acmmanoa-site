/* ACM Mānoa Air site — Events (month calendar + filters + upcoming list) */
(function () {
  const { useState } = React;

  function EventsCalendar() {
    const { Ic, nav } = window.AirShell;
    const { events, sigs, edate, meetWd, MONF, light, secondary } = window.ACMData;
    const BRAND = '#3F6FE6';

    // filter keys: 'acm' + every sig slug, all on by default
    const allKeys = ['acm', ...sigs.map((s) => s.slug)];
    const [filters, setFilters] = useState(() => Object.fromEntries(allKeys.map((k) => [k, true])));
    // calendar cursor — start on the month of the first upcoming event
    const start = edate(events[0].date);
    const [cur, setCur] = useState({ y: start.y, m: start.mo });

    const colorFor = (key) => (key === 'acm' ? BRAND : (sigs.find((s) => s.slug === key) || {}).color);
    const toggle = (k) => setFilters((f) => ({ ...f, [k]: !f[k] }));
    const allOn = allKeys.every((k) => filters[k]);
    const setAll = (v) => setFilters(Object.fromEntries(allKeys.map((k) => [k, v])));
    const step = (dir) => setCur((c) => {
      let m = c.m + dir, y = c.y;
      if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
      return { y, m };
    });

    const { y, m } = cur;
    const startWd = new Date(y, m, 1).getDay();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWd; i++) cells.push(null);
    for (let d = 1; d <= daysIn; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const today = new Date();
    const isToday = (d) => d && today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;

    const itemsFor = (d) => {
      const wd = new Date(y, m, d).getDay();
      const list = [];
      events.forEach((e) => {
        const ed = edate(e.date);
        const key = e.sig || 'acm';
        if (ed.y === y && ed.mo === m && ed.da === d && filters[key]) {
          list.push({ type: 'event', color: colorFor(key), label: e.title, route: '#/event/' + e.slug });
        }
      });
      sigs.forEach((s) => {
        if (filters[s.slug] && meetWd(s.meeting.days) === wd) {
          list.push({ type: 'meet', color: s.color, label: s.name + ' · meeting', route: '#/sig/' + s.slug });
        }
      });
      return list;
    };

    const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const PREV = 'M15 18l-6-6 6-6', NEXT = 'M9 6l6 6-6 6';

    const Chip = ({ k, label }) => {
      const c = colorFor(k);
      const on = filters[k];
      const st = on
        ? { background: light(c), color: secondary(c), borderColor: c }
        : { background: 'var(--card)', color: 'var(--muted)', borderColor: 'var(--line)' };
      return (
        <button className={'fchip' + (on ? ' on' : '')} style={st} onClick={() => toggle(k)}>
          <span className="dot" style={{ background: on ? c : 'var(--line)' }} />{label}
        </button>
      );
    };

    return (
      <div>
        <div className="filter-bar">
          <Chip k="acm" label="ACM events" />
          {sigs.map((s) => <Chip key={s.slug} k={s.slug} label={s.name} />)}
          <button className="fchip ghost" onClick={() => setAll(!allOn)}>{allOn ? 'Clear all' : 'Select all'}</button>
        </div>

        <div className="cal-wrap">
          <div className="cal-top">
            <h3>{MONF[m]} {y}</h3>
            <div className="cal-nav">
              <button onClick={() => step(-1)} aria-label="Previous month"><Ic d={PREV} s={20} /></button>
              <button className="today-btn" onClick={() => setCur({ y: start.y, m: start.mo })}>Today</button>
              <button onClick={() => step(1)} aria-label="Next month"><Ic d={NEXT} s={20} /></button>
            </div>
          </div>
          <div className="cal-grid cal-dows">
            {DOW.map((d) => <div className="cal-dow" key={d}>{d}</div>)}
          </div>
          <div className="cal-grid cal-body">
            {cells.map((d, i) => {
              if (!d) return <div className="cal-cell dim" key={i} />;
              const items = itemsFor(d);
              const shown = items.slice(0, 3);
              const extra = items.length - shown.length;
              return (
                <div className={'cal-cell' + (isToday(d) ? ' is-today' : '')} key={i}>
                  <span className="cal-daynum">{d}</span>
                  <div className="cal-evs">
                    {shown.map((it, j) => (
                      <a key={j} className={'cal-ev' + (it.type === 'meet' ? ' meet' : '')}
                        style={{ '--ec': it.color }} href={it.route} onClick={(e) => nav(e, it.route)} title={it.label}>
                        <span className="bar" /><span className="lbl">{it.label}</span>
                      </a>
                    ))}
                    {extra > 0 && <span className="cal-more">+{extra} more</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="cal-note">Weekly SIG meetings repeat across the month — toggle a program above to focus the calendar.</p>
      </div>
    );
  }

  function Events() {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const { events, sigs, edate } = window.ACMData;
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    return (
      <div className="air">
        <Nav route="#/events" />
        <header className="subhero"><div className="wrap">
          <div className="eyebrow">Events</div>
          <h1>Something’s always happening.</h1>
          <p>Workshops, socials, talks, hackathons — plus every SIG’s weekly meeting, all on one calendar. No experience required; just show up.</p>
        </div></header>

        <section style={{ paddingTop: '20px' }}><div className="wrap-wide">
          <EventsCalendar />
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap">
          <div className="sec-head left" style={{ margin: '0 0 30px' }}><div className="sec-tag">Upcoming</div><h2 style={{ fontSize: '34px' }}>Next on the calendar.</h2></div>
          <div className="events" style={{ maxWidth: '860px', margin: 0 }}>
            {events.map((e, i) => {
              const ed = edate(e.date);
              const sig = e.sig ? sigs.find((s) => s.slug === e.sig) : null;
              const accent = sig ? sig.color : 'var(--peri)';
              return (
              <a className="ev" key={i} href={'#/event/' + e.slug} onClick={(ev) => nav(ev, '#/event/' + e.slug)} style={{ padding: '22px 26px' }}>
                <div className="date" style={{ width: '72px', background: 'color-mix(in srgb, ' + (sig ? sig.color : '#3F6FE6') + ' 12%, #fff)' }}>
                  <div className="d" style={{ color: sig ? sig.color : 'var(--peri-d)' }}>{ed.d}</div><div className="m">{ed.m}</div>
                </div>
                <div className="body">
                  <div className="kind-tag" style={{ color: sig ? sig.color : 'var(--peri-d)', background: 'color-mix(in srgb, ' + (sig ? sig.color : '#3F6FE6') + ' 11%, #fff)' }}>{sig ? sig.name : 'ACM'} · {e.kind}</div>
                  <h4 style={{ fontSize: '20px' }}>{e.title}</h4>
                  <p style={{ fontSize: '15px', color: 'var(--soft)', marginTop: '4px' }}>{e.desc}</p>
                  <div style={{ display: 'flex', gap: '18px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <span className="ev-meta"><Ic d={CLOCK} s={15} /> {ed.day}, {ed.m} {ed.da} · {e.time}</span>
                    <span className="ev-meta"><Ic d={PIN} s={15} /> {e.location}</span>
                  </div>
                </div>
                <div className="arrow"><Ic d={ARR} /></div>
              </a>
              );
            })}
          </div>
        </div></section>

        <section style={{ paddingTop: '40px' }}><div className="wrap closer">
          <div className="box">
            <h2>Never miss an event.</h2>
            <p>Join our Discord and follow us on Instagram for the latest workshops, socials, and last-minute updates.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Join the Discord <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { Events });
})();
