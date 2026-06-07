/* ACM Mānoa redesign — Direction A2: "Ink"  (a clean/minimal sibling of Cumulus)
   Monochrome editorial-clean. White + near-black ink + warm gray, with ONE
   restrained clay accent used sparingly. Left-aligned asymmetric hero, crisp
   hairline rules, precise smaller radii. Schibsted Grotesk. */
(function () {
  const CSS = `
  .ink{ --paper:#FFFFFF; --ink:#111210; --soft:#3A3C38; --muted:#7A7C76; --line:#E6E5E0; --line2:#D8D7D1;
    --clay:#C04A2B; --wash:#F6F5F1;
    font-family:'Schibsted Grotesk',sans-serif; color:var(--ink); background:var(--paper); -webkit-font-smoothing:antialiased; line-height:1.55;}
  .ink *{box-sizing:border-box;margin:0;padding:0;}
  .ink img{display:block;max-width:100%;}
  .ink .wrap{max-width:1140px;margin:0 auto;padding:0 44px;}

  /* nav */
  .ink nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
  .ink .nav-in{display:flex;align-items:center;justify-content:space-between;height:70px;}
  .ink .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:17px;letter-spacing:-.02em;white-space:nowrap;}
  .ink .brand img{width:28px;height:28px;}
  .ink .brand .sep{color:var(--muted);font-weight:500;}
  .ink .nav-links{display:flex;gap:30px;align-items:center;}
  .ink .nav-links a{color:var(--soft);text-decoration:none;font-size:14.5px;font-weight:500;transition:color .2s;}
  .ink .nav-links a:hover{color:var(--ink);}
  .ink .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14.5px;border-radius:8px;padding:10px 18px;text-decoration:none;border:1px solid var(--ink);cursor:pointer;transition:all .18s;}
  .ink .btn-solid{background:var(--ink);color:#fff;}
  .ink .btn-solid:hover{background:var(--clay);border-color:var(--clay);}
  .ink .btn-line{background:transparent;color:var(--ink);}
  .ink .btn-line:hover{background:var(--ink);color:#fff;}

  /* hero — asymmetric left aligned */
  .ink .hero{padding:92px 0 72px;border-bottom:1px solid var(--line);}
  .ink .hero-grid{display:grid;grid-template-columns:1.35fr .8fr;gap:64px;align-items:end;}
  .ink .eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:30px;}
  .ink .eyebrow .dot{width:8px;height:8px;border-radius:50%;background:var(--clay);}
  .ink h1{font-size:clamp(46px,6.4vw,86px);line-height:1.0;letter-spacing:-.04em;font-weight:700;margin-bottom:0;}
  .ink h1 .soft{color:var(--muted);}
  .ink .hero-right{padding-bottom:8px;}
  .ink .hero-right .lede{font-size:18px;color:var(--soft);line-height:1.5;margin-bottom:26px;}
  .ink .hero-cta{display:flex;gap:11px;flex-wrap:wrap;}
  .ink .statstrip{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink);margin-top:64px;}
  .ink .statstrip .s{padding:26px 0 4px;border-right:1px solid var(--line);}
  .ink .statstrip .s:last-child{border-right:0;}
  .ink .statstrip .n{font-size:46px;font-weight:700;letter-spacing:-.04em;line-height:1;}
  .ink .statstrip .n em{color:var(--clay);font-style:normal;}
  .ink .statstrip .l{font-size:13.5px;color:var(--muted);margin-top:8px;}

  /* sections */
  .ink section{padding:88px 0;border-bottom:1px solid var(--line);}
  .ink .sec-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:46px;gap:30px;}
  .ink .sec-head .lhs{max-width:620px;}
  .ink .sec-tag{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .ink h2{font-size:clamp(30px,3.8vw,48px);letter-spacing:-.035em;line-height:1.04;font-weight:700;margin-bottom:14px;}
  .ink .sec-sub{font-size:17.5px;color:var(--soft);line-height:1.5;}
  .ink .sec-no{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap;}

  /* SIG list rows (editorial, not cards) */
  .ink .rows{border-top:1px solid var(--line2);}
  .ink .row{display:grid;grid-template-columns:40px 230px 1fr 28px;gap:26px;align-items:center;padding:24px 6px;border-bottom:1px solid var(--line);transition:background .18s,padding .18s;cursor:pointer;}
  .ink .row:hover{background:var(--wash);padding-left:16px;padding-right:16px;}
  .ink .row .no{font-size:14px;color:var(--clay);font-weight:700;}
  .ink .row .nm{font-size:22px;font-weight:700;letter-spacing:-.02em;}
  .ink .row .ds{font-size:15px;color:var(--muted);}
  .ink .row .ar{color:var(--muted);text-align:right;}
  .ink .row:hover .ar{color:var(--ink);}

  /* events */
  .ink .ev{display:grid;grid-template-columns:120px 1fr auto;gap:26px;align-items:center;padding:22px 6px;border-bottom:1px solid var(--line);}
  .ink .ev:first-child{border-top:1px solid var(--line2);}
  .ink .ev .dt{font-size:18px;font-weight:700;letter-spacing:-.01em;}
  .ink .ev .dt small{display:block;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:3px;}
  .ink .ev h4{font-size:19px;font-weight:700;letter-spacing:-.01em;}
  .ink .ev p{font-size:14px;color:var(--muted);margin-top:2px;}
  .ink .ev .tag{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line2);border-radius:6px;padding:6px 11px;}

  /* closer */
  .ink .closer{border-bottom:0;}
  .ink .closer .box{background:var(--ink);color:#fff;border-radius:18px;padding:72px 56px;display:flex;justify-content:space-between;align-items:center;gap:40px;flex-wrap:wrap;}
  .ink .closer h2{color:#fff;margin-bottom:8px;}
  .ink .closer p{color:rgba(255,255,255,.7);font-size:17px;max-width:42ch;}
  .ink .closer .btn-solid{background:#fff;color:var(--ink);border-color:#fff;}
  .ink .closer .btn-solid:hover{background:var(--clay);color:#fff;border-color:var(--clay);}

  /* footer */
  .ink footer{padding:54px 0 40px;}
  .ink .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .ink .foot-brand{max-width:300px;}
  .ink .foot-brand p{font-size:14px;color:var(--muted);margin-top:13px;line-height:1.6;}
  .ink .foot-col h5{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .ink .foot-col a{display:block;font-size:14.5px;color:var(--ink);text-decoration:none;margin-bottom:10px;font-weight:500;}
  .ink .foot-col a:hover{color:var(--clay);}
  .ink .foot-bottom{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);padding-top:24px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .ink .nav-links{display:none;}
    .ink .hero-grid{grid-template-columns:1fr;gap:32px;}
    .ink .statstrip{grid-template-columns:1fr;}
    .ink .statstrip .s{border-right:0;border-bottom:1px solid var(--line);}
    .ink .row{grid-template-columns:30px 1fr;}
    .ink .row .ds,.ink .row .ar{display:none;}
    .ink .ev{grid-template-columns:1fr;gap:6px;}
    .ink .wrap{padding:0 22px;}
  }`;

  function Ic({d}){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;}
  const ARR="M5 12h14M13 6l6 6-6 6";

  function Ink(){
    const sigs=[
      {nm:"AI & Machine Learning",d:"Build models, read papers, ship projects."},
      {nm:"Web & Product",d:"Design and launch real apps with modern tools."},
      {nm:"Cybersecurity",d:"CTF practice and ethical hacking, beginner to bounty."},
      {nm:"Game Development",d:"Pixels to engines — make the game you'd play."},
      {nm:"Robotics",d:"Sensors, embedded systems, machines that move."},
      {nm:"Data Science",d:"Real Hawaiʻi datasets, honest visualizations."},
    ];
    const events=[
      {d:"Feb 14",dy:"Fri",t:"Intro to Git & GitHub",s:"A hands-on first dive into version control.",k:"Workshop"},
      {d:"Feb 28",dy:"Fri",t:"Resume & LinkedIn Night",s:"Portfolios reviewed by alumni and recruiters.",k:"Career"},
      {d:"Mar 08",dy:"Sat",t:"Spring Hackathon",s:"Forty-eight hours. One idea. Build it.",k:"Flagship"},
    ];
    return (
      <div className="ink">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <nav><div className="wrap nav-in">
          <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM <span className="sep">/ Mānoa</span></div>
          <div className="nav-links"><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a><a href="#">ICSpace</a><a className="btn btn-solid" href="#">Join us</a></div>
        </div></nav>

        <header className="hero"><div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow"><span className="dot"></span>The largest CS community at UH Mānoa</div>
              <h1>Where<br/>computing<br/><span className="soft">finds its</span> people.</h1>
            </div>
            <div className="hero-right">
              <p className="lede">ACM at the University of Hawaiʻi at Mānoa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your future team.</p>
              <div className="hero-cta">
                <a className="btn btn-solid" href="#">Become a member <Ic d={ARR}/></a>
                <a className="btn btn-line" href="#">Programs</a>
              </div>
            </div>
          </div>
          <div className="statstrip">
            <div className="s"><div className="n">7<em>+</em></div><div className="l">Special Interest Groups, member-run</div></div>
            <div className="s"><div className="n">500<em>+</em></div><div className="l">Students across every major</div></div>
            <div className="s"><div className="n">50<em>+</em></div><div className="l">Workshops, socials & talks a year</div></div>
          </div>
        </div></header>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="lhs">
              <div className="sec-tag">Special Interest Groups</div>
              <h2>Pick a lane. Or three.</h2>
              <p className="sec-sub">Every SIG is student-led and beginner-friendly. Show up, build something, grow with people figuring it out alongside you.</p>
            </div>
            <div className="sec-no">Seven chapters</div>
          </div>
          <div className="rows">
            {sigs.map((s,i)=>(
              <div className="row" key={i}>
                <span className="no">{String(i+1).padStart(2,'0')}</span>
                <span className="nm">{s.nm}</span>
                <span className="ds">{s.d}</span>
                <span className="ar"><Ic d={ARR}/></span>
              </div>
            ))}
          </div>
        </div></section>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="lhs"><div className="sec-tag">What's on</div><h2>Coming up next.</h2></div>
            <div className="sec-no">Spring 2025</div>
          </div>
          <div>
            {events.map((e,i)=>(
              <div className="ev" key={i}>
                <div className="dt">{e.d}<small>{e.dy}</small></div>
                <div><h4>{e.t}</h4><p>{e.s}</p></div>
                <span className="tag">{e.k}</span>
              </div>
            ))}
          </div>
        </div></section>

        <section className="closer"><div className="wrap">
          <div className="box">
            <div><h2>New here? Perfect.</h2><p>No experience required — just curiosity. Join the Discord, come to one event, and see what sticks.</p></div>
            <a className="btn btn-solid" href="#">Join the Discord <Ic d={ARR}/></a>
          </div>
        </div></section>

        <footer><div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand"><div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM <span className="sep">/ Mānoa</span></div>
              <p>Association for Computing Machinery at the University of Hawaiʻi at Mānoa. Built by students, for students.</p></div>
            <div className="foot-col"><h5>Explore</h5><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a></div>
            <div className="foot-col"><h5>Connect</h5><a href="#">Discord</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Email</a></div>
            <div className="foot-col"><h5>Resources</h5><a href="#">ICSpace</a><a href="#">GitHub</a><a href="#">ACM Intl.</a></div>
          </div>
          <div className="foot-bottom"><span>© 2025 ACM at UH Mānoa</span><span>Made with aloha</span></div>
        </div></footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Ink });
})();
