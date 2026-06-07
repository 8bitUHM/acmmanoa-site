/* ACM Mānoa Air site — Event detail (slug) page */
(function () {
  function EventDetail({ slug }) {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const { events, sigs, edate, themeVars } = window.ACMData;
    const e = events.find((x) => x.slug === slug);

    if (!e) {
      return (
        <div className="air"><Nav route="#/events" />
          <section style={{ textAlign: 'center', minHeight: '50vh' }}><div className="wrap">
            <h2>Event not found.</h2>
            <p className="sec-sub" style={{ marginBottom: '24px' }}>That event isn’t on the calendar.</p>
            <a className="btn btn-primary" href="#/events" onClick={(ev) => nav(ev, '#/events')}>Back to events</a>
          </div></section><Footer />
        </div>
      );
    }

    const sig = e.sig ? sigs.find((s) => s.slug === e.sig) : null;
    const ed = edate(e.date);
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const HOST = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75';

    return (
      <div className="air" style={sig ? themeVars(sig.color) : undefined}>
        <Nav route="#/events" />

        <header className="sig-hero"><div className="wrap-wide">
          <a className="back" href="#/events" onClick={(ev) => nav(ev, '#/events')}><Ic d="M19 12H5M11 18l-6-6 6-6" s={18} /> All events</a>
          <div className="ev-badge">{sig ? sig.name : 'ACM Mānoa'} · {e.kind}</div>
          <h1 style={{ maxWidth: '20ch' }}>{e.title}</h1>
          <div className="ev-chips">
            <span className="ev-chip"><Ic d={CAL} s={16} /> {ed.full}</span>
            <span className="ev-chip"><Ic d={CLOCK} s={16} /> {e.time}</span>
            <span className="ev-chip"><Ic d={PIN} s={16} /> {e.location}</span>
          </div>
          <div className="cta">
            <a className="btn btn-sig" href="#">Add to calendar <Ic d={ARR} /></a>
            {sig && <a className="btn btn-ghost" href={'#/sig/' + sig.slug} onClick={(ev) => nav(ev, '#/sig/' + sig.slug)}>About {sig.name} <Ic d={ARR} /></a>}
          </div>
        </div></header>

        <section style={{ paddingTop: '52px' }}><div className="wrap-wide">
          <div className="ev-detail-grid">
            <div className="ev-photo">
              <image-slot id={'event-' + e.slug} shape="rect" fit="cover" placeholder="Drop an event photo"></image-slot>
            </div>
            <div>
              <div className="sec-head left" style={{ margin: '0 0 18px' }}><h2 style={{ fontSize: '30px' }}>About this event</h2></div>
              <div className="prose" style={{ margin: 0 }}><p>{e.desc}</p></div>
              <div className="ev-info">
                <div className="ev-irow"><span className="ico"><Ic d={CAL} s={18} /></span><div><div className="k">When</div><div className="v">{ed.full}, {e.time}</div></div></div>
                <div className="ev-irow"><span className="ico"><Ic d={PIN} s={18} /></span><div><div className="k">Where</div><div className="v">{e.location}</div></div></div>
                <div className="ev-irow"><span className="ico"><Ic d={HOST} s={18} /></span><div><div className="k">Hosted by</div><div className="v">{sig ? sig.full + ' (' + sig.name + ')' : 'ACM at UH Mānoa'}</div></div></div>
              </div>
            </div>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap closer sig-closer">
          <div className="box">
            <h2>See you there?</h2>
            <p>Bring a friend — most events need nothing but curiosity. Join the Discord for reminders and last-minute room changes.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(ev) => nav(ev, '#/')}>Join the Discord <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { EventDetail });
})();
