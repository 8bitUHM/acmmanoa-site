/* ACM Mānoa Air site — Programs (all SIGs) */
(function () {
  function Programs() {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const { sigs, themeVars } = window.ACMData;
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    return (
      <div className="air">
        <Nav route="#/programs" />
        <header className="subhero"><div className="wrap">
          <div className="eyebrow">Special Interest Groups</div>
          <h1>Seven groups. One ʻohana.</h1>
          <p>Every SIG is student-led and beginner-friendly, each with its own focus, rhythm, and brand. Pick one — or three — and start building.</p>
        </div></header>

        <section style={{ paddingTop: '20px' }}><div className="wrap-wide">
          <div className="grid">
            {sigs.map((s) => (
              <a className="sig logo-card" key={s.slug} style={themeVars(s.color)} href={'#/sig/' + s.slug} onClick={(e) => nav(e, '#/sig/' + s.slug)}>
                <div className="crest">
                  <div className="mark">
                    {s.logo ? <img src={s.logo} alt={s.name + ' logo'} /> : <Ic d={s.icon} s={34} w={1.7} />}
                  </div>
                </div>
                <h3>{s.full}</h3><p>{s.tagline}</p>
                <div className="meta">
                  <span className="meet"><Ic d={CAL} s={15} /> {s.meeting.days}</span>
                  <span className="meet"><Ic d={PIN} s={15} /> {s.meeting.location}</span>
                </div>
                <span className="more">View {s.name} <Ic d={ARR} s={18} /></span>
              </a>
            ))}
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap closer">
          <div className="box">
            <h2>Want to start a new SIG?</h2>
            <p>Got an idea for a group that doesn't exist yet — quantum, AR/VR, design? Pitch it. We help students launch new SIGs every year.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Pitch a SIG <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { Programs });
})();
