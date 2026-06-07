/* ACM Mānoa Air site — ICSpace (interactive classroom, POST 318B) */
(function () {
  function ICSpace() {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const TICK = 'M20 6 9 17l-5-5';
    const USERS = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75';
    const BULB = 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z';
    const BOLT = 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z';
    const CHIP = 'M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M5 5h14v14H5zM9 9h6v6H9z';
    const MAIL = 'M3 8l7.9 4.3a2 2 0 0 0 2.2 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z';

    const bullets = [
      'Students and faculty engage in innovative, hands-on projects',
      'Cutting-edge research gets conducted side by side',
      'Interactive learning sessions and workshops happen weekly',
    ];
    const invest = [
      { ic: USERS, h: 'Workforce Development', p: 'Helping grow a skilled, local computing workforce ready for industry.' },
      { ic: BULB, h: 'Future Challenges', p: 'Equipping students to tackle tomorrow’s technological problems.' },
      { ic: BOLT, h: 'Tech Advancement', p: 'Driving research and innovation that pushes the field forward.' },
    ];

    return (
      <div className="air">
        <Nav route="#/icspace" />

        <header className="subhero"><div className="wrap">
          <div className="eyebrow">The Space</div>
          <h1>ICSpace.</h1>
          <p>An interactive classroom dedicated to the Information &amp; Computer Sciences community at the University of Hawaiʻi at Mānoa — a home for learning, building, and collaboration.</p>
          <div className="ics-badge"><Ic d={PIN} s={17} /> Located in POST 318B</div>
        </div></header>

        <section style={{ paddingTop: '20px' }}><div className="wrap-wide">
          <div className="ics-photo">
            <image-slot id="ics-hero" shape="rect" fit="cover" placeholder="Drop a photo of ICSpace"></image-slot>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap">
          <div className="panel"><div className="prose">
            <p>Located in POST 318B, ICSpace is designed for ICS undergraduate majors, graduate students, faculty, and staff. It fosters an environment of learning and collaboration — a place to work on a project, study with classmates, or just find your people.</p>
            <p>Guests are warmly welcome too, as long as they’re accompanied by an ICS community member, keeping the room a lively exchange of ideas and knowledge.</p>
          </div></div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap-wide">
          <div className="sec-head"><div className="sec-tag">What it’s for</div><h2>A hub for innovation and learning.</h2></div>
          <div className="ics-two">
            <div className="ics-card">
              <h3>A hands-on home for ICS</h3>
              <p>ICSpace advances the educational and professional goals of the ICS community. It’s the central spot where:</p>
              <ul className="ics-list">
                {bullets.map((b, i) => (
                  <li key={i}><span className="tick"><Ic d={TICK} s={15} w={2.4} /></span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="ics-card">
              <h3>Built for real work</h3>
              <p>The space is equipped with advanced technology and resources that prepare students for the demands of the tech industry — enhancing hands-on learning and research, and bridging academic knowledge with real-world applications.</p>
              <div className="ics-badge" style={{ marginTop: '22px' }}><Ic d={CHIP} s={17} /> Modern workstations &amp; collaboration tools</div>
            </div>
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap-wide">
          <div className="sec-head"><div className="sec-tag">Why it matters</div><h2>Enhancing academic excellence.</h2><p className="sec-sub">By investing in ICSpace, sponsors help shape the next generation of tech leaders and innovators.</p></div>
          <div className="ics-invest">
            {invest.map((c, i) => (
              <div className="ics-inv" key={i}>
                <div className="orb"><Ic d={c.ic} s={26} /></div>
                <h4>{c.h}</h4><p>{c.p}</p>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{ paddingTop: '64px' }}><div className="wrap closer">
          <div className="box">
            <h2>Support ICSpace.</h2>
            <p>Your contribution helps maintain and grow the technology and resources that make ICSpace a hub for innovation. Investing here means supporting the next generation of tech leaders at UH Mānoa.</p>
            <a className="btn btn-white btn-lg" href="mailto:president@acmmanoa.org"><Ic d={MAIL} /> Contact us about giving</a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { ICSpace });
})();
