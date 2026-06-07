/* ACM Mānoa redesign — Direction B: "Press"
   Bold editorial. A campus computing journal: oversized high-contrast serif
   display, grotesk UI, paper + ink + one electric coral. Hairline rules,
   numbered index, asymmetric magazine grid. Reinvented from scratch. */
(function () {
  const CSS = `
  .press{ --paper:#F6F4EE; --ink:#15120E; --coral:#FF3A17; --muted:#6B665C; --line:#1B1813;
    font-family:'Archivo',sans-serif; color:var(--ink); background:var(--paper);
    -webkit-font-smoothing:antialiased; line-height:1.5;}
  .press *{box-sizing:border-box;margin:0;padding:0;}
  .press img{display:block;max-width:100%;}
  .press .wrap{max-width:1180px;margin:0 auto;padding:0 44px;}
  .press .serif{font-family:'Instrument Serif',Georgia,serif;font-weight:400;}

  /* masthead */
  .press .masthead{border-bottom:2px solid var(--ink);}
  .press .mast-top{display:flex;justify-content:space-between;align-items:center;
    font-size:12px;letter-spacing:.14em;text-transform:uppercase;padding:11px 0;border-bottom:1px solid var(--ink);font-weight:600;}
  .press .mast-main{display:flex;justify-content:space-between;align-items:flex-end;padding:20px 0 22px;}
  .press .logo-wm{font-family:'Instrument Serif',serif;font-size:64px;line-height:.86;letter-spacing:-.01em;display:flex;align-items:center;gap:16px;}
  .press .logo-wm img{width:52px;height:52px;}
  .press .mast-nav{display:flex;gap:26px;align-items:center;padding-bottom:8px;}
  .press .mast-nav a{color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;letter-spacing:.02em;}
  .press .mast-nav a:hover{color:var(--coral);}

  /* hero */
  .press .hero{padding:64px 0 40px;border-bottom:1px solid var(--ink);}
  .press .kicker{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);margin-bottom:26px;}
  .press .hero h1{font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(56px,10vw,132px);
    line-height:.92;letter-spacing:-.015em;margin-bottom:34px;}
  .press .hero h1 em{font-style:italic;color:var(--coral);}
  .press .hero-cols{display:grid;grid-template-columns:1.4fr 1fr;gap:54px;align-items:start;padding-top:8px;}
  .press .hero-lede{font-size:21px;line-height:1.5;}
  .press .hero-lede .drop{font-family:'Instrument Serif',serif;float:left;font-size:74px;line-height:.7;padding:8px 12px 0 0;color:var(--coral);}
  .press .hero-meta{font-size:14px;line-height:1.7;border-left:2px solid var(--ink);padding-left:22px;}
  .press .hero-meta b{display:block;text-transform:uppercase;letter-spacing:.1em;font-size:12px;margin:0 0 4px;}
  .press .hero-meta .row{padding:11px 0;border-bottom:1px solid rgba(27,24,19,.18);}
  .press .hero-cta{margin-top:22px;display:flex;gap:12px;flex-wrap:wrap;}
  .press .btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:14px;letter-spacing:.02em;
    text-decoration:none;padding:13px 22px;border:2px solid var(--ink);cursor:pointer;transition:all .18s;text-transform:uppercase;}
  .press .btn-fill{background:var(--ink);color:var(--paper);}
  .press .btn-fill:hover{background:var(--coral);border-color:var(--coral);}
  .press .btn-line:hover{background:var(--ink);color:var(--paper);}

  /* cover strip */
  .press .cover{height:340px;margin:0;background:var(--ink);color:var(--paper);position:relative;overflow:hidden;
    display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--ink);}
  .press .cover .big{font-family:'Instrument Serif',serif;font-size:clamp(80px,18vw,240px);line-height:1;letter-spacing:-.02em;opacity:.96;}
  .press .cover .big em{font-style:italic;color:var(--coral);}
  .press .cover .tag{position:absolute;bottom:20px;left:44px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#B9B3A6;}
  .press .cover .tag2{position:absolute;top:20px;right:44px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#B9B3A6;}

  /* section header */
  .press .sec{padding:72px 0;border-bottom:1px solid var(--ink);}
  .press .sec-bar{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:42px;}
  .press .sec-bar h2{font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(34px,5vw,60px);letter-spacing:-.01em;line-height:1;}
  .press .sec-bar .no{font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted);}

  /* index list (SIGs) */
  .press .idx .item{display:grid;grid-template-columns:78px 1fr 1.3fr 40px;gap:24px;align-items:center;
    padding:26px 0;border-top:1px solid rgba(27,24,19,.2);cursor:pointer;transition:background .2s,padding .2s;}
  .press .idx .item:hover{background:var(--ink);color:var(--paper);padding-left:14px;padding-right:14px;}
  .press .idx .item:hover .ix,.press .idx .item:hover .desc{color:#C9C3B6;}
  .press .idx .item:hover .arr{color:var(--coral);}
  .press .idx .ix{font-family:'Instrument Serif',serif;font-size:40px;color:var(--coral);line-height:1;}
  .press .idx .nm{font-family:'Instrument Serif',serif;font-size:30px;line-height:1.04;letter-spacing:-.01em;}
  .press .idx .desc{font-size:15px;color:var(--muted);line-height:1.5;}
  .press .idx .arr{text-align:right;}

  /* manifesto */
  .press .manifesto{background:var(--coral);color:var(--paper);}
  .press .manifesto .wrap{padding:88px 44px;}
  .press .manifesto p{font-family:'Instrument Serif',serif;font-size:clamp(30px,4.4vw,58px);line-height:1.08;letter-spacing:-.01em;max-width:20ch;}
  .press .manifesto p em{font-style:italic;}
  .press .manifesto .by{margin-top:44px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;}

  /* agenda */
  .press .agenda .ev{display:grid;grid-template-columns:160px 1fr auto;gap:26px;align-items:center;
    padding:24px 0;border-top:1px solid rgba(27,24,19,.2);}
  .press .agenda .ev .dt{font-family:'Instrument Serif',serif;font-size:24px;}
  .press .agenda .ev .dt small{display:block;font-family:'Archivo';font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:3px;}
  .press .agenda .ev h4{font-size:21px;font-weight:700;letter-spacing:-.01em;}
  .press .agenda .ev p{font-size:14px;color:var(--muted);margin-top:3px;}
  .press .agenda .ev .pill{border:1.5px solid var(--ink);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;}

  /* footer */
  .press footer{padding:60px 0 40px;}
  .press .foot-top{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;align-items:flex-start;}
  .press .foot-wm{font-family:'Instrument Serif',serif;font-size:80px;line-height:.85;}
  .press .foot-cols{display:flex;gap:54px;flex-wrap:wrap;}
  .press .foot-cols h5{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:14px;}
  .press .foot-cols a{display:block;font-size:15px;color:var(--ink);text-decoration:none;margin-bottom:9px;font-weight:500;}
  .press .foot-cols a:hover{color:var(--coral);}
  .press .foot-rule{margin-top:46px;padding-top:20px;border-top:2px solid var(--ink);display:flex;justify-content:space-between;
    font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;}

  @media(max-width:760px){
    .press .mast-nav,.press .mast-top span:nth-child(2){display:none;}
    .press .hero-cols{grid-template-columns:1fr;gap:28px;}
    .press .idx .item{grid-template-columns:48px 1fr;}
    .press .idx .item .desc,.press .idx .item .arr{display:none;}
    .press .agenda .ev{grid-template-columns:1fr;gap:6px;}
    .press .wrap{padding:0 22px;}
  }`;

  function Press() {
    const sigs = [
      {nm:"Artificial Intelligence",d:"Models, papers, and projects. From first notebook to published demo."},
      {nm:"Web & Product",d:"Ship real apps with modern tooling and a room full of collaborators."},
      {nm:"Cybersecurity",d:"Capture-the-flag nights and ethical hacking, beginner to bounty."},
      {nm:"Game Development",d:"Pixels, engines, and game jams — make the thing you want to play."},
      {nm:"Robotics",d:"Sensors, embedded systems, and autonomous machines that move."},
      {nm:"Data Science",d:"Local Hawaiʻi datasets, real questions, honest visualizations."},
    ];
    const events=[
      {d:"Feb. 14",dy:"Friday",t:"Intro to Git & GitHub",s:"A hands-on first dive into version control.",k:"Workshop"},
      {d:"Feb. 28",dy:"Friday",t:"Resume & LinkedIn Night",s:"Portfolios reviewed by alumni and recruiters.",k:"Career"},
      {d:"Mar. 08",dy:"Saturday",t:"Spring Hackathon",s:"Forty-eight hours. One idea. Build it.",k:"Flagship"},
    ];
    return (
      <div className="press">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <div className="masthead"><div className="wrap">
          <div className="mast-top"><span>Honolulu, Hawaiʻi</span><span>The Computing Quarterly · UH Mānoa</span><span>Vol. XXV — 2025</span></div>
          <div className="mast-main">
            <div className="logo-wm"><img src="../assets/acm_logo.png" alt=""/>ACM Mānoa</div>
            <div className="mast-nav"><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a><a href="#">Join</a></div>
          </div>
        </div></div>

        <header className="hero"><div className="wrap">
          <div className="kicker">The Association for Computing Machinery</div>
          <h1>Code, community,<br/>and the <em>occasional</em><br/>all-nighter.</h1>
          <div className="hero-cols">
            <div className="hero-lede"><span className="drop">F</span>or every student at the University of Hawaiʻi at Mānoa who has ever wanted to build something — and didn't want to do it alone. We are the island's largest computing community, and the door is wide open.
              <div className="hero-cta"><a className="btn btn-fill" href="#">Become a member</a><a className="btn btn-line" href="#">Read the events</a></div>
            </div>
            <div className="hero-meta">
              <b>In this issue</b>
              <div className="row">Seven student-led Special Interest Groups</div>
              <div className="row">500+ members across every major</div>
              <div className="row">Fifty-plus events, talks & socials a year</div>
              <div className="row">No experience necessary — truly</div>
            </div>
          </div>
        </div></header>

        <div className="cover">
          <div className="big">acm<em>.</em></div>
          <span className="tag">A student computing collective</span>
          <span className="tag2">Est. at UH Mānoa</span>
        </div>

        <section className="sec"><div className="wrap">
          <div className="sec-bar"><h2>Special Interest Groups</h2><span className="no">Index — 01 / Seven chapters</span></div>
          <div className="idx">
            {sigs.map((s,i)=>(
              <div className="item" key={i}>
                <span className="ix">{String(i+1).padStart(2,'0')}</span>
                <span className="nm">{s.nm}</span>
                <span className="desc">{s.d}</span>
                <span className="arr">→</span>
              </div>
            ))}
          </div>
        </div></section>

        <section className="manifesto"><div className="wrap">
          <p>We believe the best way to learn to build is to <em>build, together,</em> in public.</p>
          <div className="by">— The ACM Mānoa charter</div>
        </div></section>

        <section className="sec agenda"><div className="wrap">
          <div className="sec-bar"><h2>The Agenda</h2><span className="no">Index — 02 / Upcoming</span></div>
          {events.map((e,i)=>(
            <div className="ev" key={i}>
              <div className="dt">{e.d}<small>{e.dy}</small></div>
              <div><h4>{e.t}</h4><p>{e.s}</p></div>
              <span className="pill">{e.k}</span>
            </div>
          ))}
        </div></section>

        <footer><div className="wrap">
          <div className="foot-top">
            <div className="foot-wm">ACM<br/>Mānoa</div>
            <div className="foot-cols">
              <div><h5>Explore</h5><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a></div>
              <div><h5>Connect</h5><a href="#">Discord</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Email</a></div>
              <div><h5>Resources</h5><a href="#">ICSpace</a><a href="#">GitHub</a><a href="#">ACM International</a></div>
            </div>
          </div>
          <div className="foot-rule"><span>© 2025 ACM at UH Mānoa</span><span>Printed with aloha</span></div>
        </div></footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Press });
})();
