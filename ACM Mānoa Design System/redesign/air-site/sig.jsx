/* ACM Mānoa Air site — SIG detail (themed by the SIG's primary_color) */
(function () {
  function SigDetail({ slug }) {
    const { Ic, Soc, Nav, Footer, ARR, nav } = window.AirShell;
    const { sigs, themeVars } = window.ACMData;
    const s = sigs.find((x) => x.slug === slug);
    if (!s) {
      return (
        <div className="air"><Nav route="#/programs" />
          <section style={{ textAlign: 'center', minHeight: '50vh' }}><div className="wrap">
            <h2>SIG not found.</h2>
            <p className="sec-sub" style={{ marginBottom: '24px' }}>That group doesn't exist (yet).</p>
            <a className="btn btn-primary" href="#/programs" onClick={(e) => nav(e, '#/programs')}>Back to programs</a>
          </div></section><Footer />
        </div>
      );
    }
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const links = s.links || {};
    const socList = [
      links.discord && ['discord', 'Discord', links.discord],
      links.instagram && ['instagram', 'Instagram', links.instagram],
      links.github && ['github', 'GitHub', links.github],
      links.linkedin && ['linkedin', 'LinkedIn', links.linkedin],
    ].filter(Boolean);

    return (
      <div className="air" style={themeVars(s.color)}>
        <Nav route="#/programs" />

        <header className="sig-hero"><div className="wrap-wide">
          <a className="back" href="#/programs" onClick={(e) => nav(e, '#/programs')}><Ic d="M19 12H5M11 18l-6-6 6-6" s={18} /> All programs</a>
          <div className="head">
            <div className="logo"><Ic d={s.icon} s={56} w={1.6} /></div>
            <div>
              <div className="eyebrow">Special Interest Group</div>
              <h1>{s.full}</h1>
              <div className="tag">{s.tagline}</div>
              <div className="cta">
                {links.discord && <a className="btn btn-sig" href={links.discord}>Join the Discord <Ic d={ARR} /></a>}
                {links.website && links.link_name && <a className="btn btn-ghost" href={links.website}>{links.link_name} <Ic d={ARR} /></a>}
              </div>
            </div>
          </div>
        </div></header>

        <section style={{ paddingTop: '52px' }}><div className="wrap-wide">
          <div className="sig-grid">
            <div>
              <div className="sec-head left" style={{ margin: '0 0 22px' }}><h2 style={{ fontSize: '32px' }}>About {s.name}</h2></div>
              <div className="prose" style={{ margin: 0 }}>
                {s.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '46px 0 22px' }}>Leadership</h3>
              <div className="people" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                {s.leadership.map((p, i) => (
                  <div className="person" key={i}>
                    <img className="av" src="../../assets/default_user.svg" alt={p.name} />
                    <h4>{p.name}</h4><span className="role">{p.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="info-card">
                <h3>Meets</h3>
                <div className="info-row"><span className="ico"><Ic d={CAL} s={18} /></span><div><div className="k">Day</div><div className="v">{s.meeting.days}</div></div></div>
                <div className="info-row"><span className="ico"><Ic d={CLOCK} s={18} /></span><div><div className="k">Time</div><div className="v">{s.meeting.time}</div></div></div>
                <div className="info-row"><span className="ico"><Ic d={PIN} s={18} /></span><div><div className="k">Where</div><div className="v">{s.meeting.location}</div></div></div>
              </div>
              {socList.length > 0 && (
                <div className="info-card">
                  <h3>Connect</h3>
                  <div className="links-row">
                    {socList.map((x) => <a className="soc" key={x[0]} href={x[2]}><Soc type={x[0]} /> {x[1]}</a>)}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap closer sig-closer">
          <div className="box">
            <h2>Curious? Come to a meeting.</h2>
            <p>{s.meeting.days} at {s.meeting.location}. No experience required — bring a laptop and a question.</p>
            <a className="btn btn-white btn-lg" href={links.discord || '#'}>Join the Discord <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { SigDetail });
})();
