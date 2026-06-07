/* ACM Mānoa Air site — Home */
(function () {
  function Home() {
    const { Ic, Nav, Footer, ARR, LOGO, nav } = window.AirShell;
    const { sigs, events, themeVars, edate } = window.ACMData;
    return (
      <div className="air">
        <Nav route="#/" />

        <header className="hero"><div className="wrap">
          <div className="chip"><span className="pin">New</span>The largest CS community at UH Mānoa</div>
          <h1>A friendly home for <span className="grad">curious builders.</span></h1>
          <p className="lede">ACM at the University of Hawaiʻi at Mānoa is where beginners and tinkerers find their group, ship their first project, and meet their future team.</p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Become a member <Ic d={ARR} /></a>
            <a className="btn btn-ghost btn-lg" href="#/programs" onClick={(e) => nav(e, '#/programs')}>Explore programs</a>
          </div>
          <div className="hero-panel"><div className="inner">
            <div className="pcard"><div className="n">7+</div><div className="l">Special Interest Groups</div></div>
            <div className="pcard"><div className="n">500+</div><div className="l">Active members</div></div>
            <div className="pcard"><div className="n">50+</div><div className="l">Events every year</div></div>
          </div></div>
        </div></header>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="sec-tag">Special Interest Groups</div>
            <h2>Find your people.</h2>
            <p className="sec-sub">Each SIG is student-led, beginner-friendly, and brings its own flavor — and its own colors.</p>
          </div>
          <div className="grid">
            {sigs.slice(0, 6).map((s) => (
              <a className="sig" key={s.slug} style={themeVars(s.color)} href={'#/sig/' + s.slug} onClick={(e) => nav(e, '#/sig/' + s.slug)}>
                <div className="ic"><Ic d={s.icon} /></div>
                <h3>{s.full}</h3><p>{s.tagline}</p>
                <div className="meta"><span className="meet"><Ic d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" s={15} /> {s.meeting.days}</span></div>
                <span className="more">Learn more <Ic d={ARR} s={18} /></span>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '38px' }}>
            <a className="btn btn-soft btn-lg" href="#/programs" onClick={(e) => nav(e, '#/programs')}>See all programs <Ic d={ARR} /></a>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap">
          <div className="sec-head"><div className="sec-tag">What's on</div><h2>Coming up next.</h2></div>
          <div className="events">
            {events.slice(0, 3).map((e, i) => {
              const ed = edate(e.date);
              return (
              <a className="ev" key={i} href={'#/event/' + e.slug} onClick={(ev) => nav(ev, '#/event/' + e.slug)}>
                <div className="date"><div className="d">{ed.d}</div><div className="m">{ed.m}</div></div>
                <div className="body"><h4>{e.title}</h4><p>{e.kind} · {e.location} · {e.time}</p></div>
                <div className="arrow"><Ic d={ARR} /></div>
              </a>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '34px' }}>
            <a className="btn btn-soft btn-lg" href="#/events" onClick={(e) => nav(e, '#/events')}>All events <Ic d={ARR} /></a>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap closer">
          <div className="box">
            <h2>New here? Perfect.</h2>
            <p>No experience required — just curiosity. Join the Discord, come to one event, and see what sticks.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Join the Discord <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { Home });
})();
