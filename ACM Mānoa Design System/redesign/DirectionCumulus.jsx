/* ACM Mānoa redesign — Direction A: "Cumulus"
   Clean, modern, Apple-minimal. Warm paper, graphite ink, a single jade
   accent (the green of Mānoa valley). Generous whitespace, big calm type,
   soft product-style cards. Reinvented from scratch — no legacy blue. */
(function () {
  const CSS = `
  .cumulus { --paper:#FAFAF7; --ink:#0E0F0D; --muted:#5C605A; --line:#E7E6DF;
    --jade:#0F9D6F; --jade-deep:#0A7A56; --mist:#EEF3EF; --card:#FFFFFF;
    font-family:'Hanken Grotesk',sans-serif; color:var(--ink); background:var(--paper);
    -webkit-font-smoothing:antialiased; line-height:1.5; }
  .cumulus *{box-sizing:border-box;margin:0;padding:0;}
  .cumulus img{display:block;max-width:100%;}
  .cumulus .wrap{max-width:1120px;margin:0 auto;padding:0 40px;}

  /* nav */
  .cumulus nav{position:sticky;top:0;z-index:20;background:rgba(250,250,247,.8);
    backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
  .cumulus .nav-in{display:flex;align-items:center;justify-content:space-between;height:72px;}
  .cumulus .brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:18px;letter-spacing:-.02em;white-space:nowrap;}
  .cumulus .brand img{width:30px;height:30px;}
  .cumulus .nav-links{display:flex;gap:34px;align-items:center;}
  .cumulus .nav-links a{color:var(--muted);text-decoration:none;font-size:15px;font-weight:500;transition:color .2s;}
  .cumulus .nav-links a:hover{color:var(--ink);}
  .cumulus .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:15px;
    border-radius:100px;padding:11px 22px;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:all .2s;}
  .cumulus .btn-primary{background:var(--ink);color:var(--paper);}
  .cumulus .btn-primary:hover{background:var(--jade-deep);}
  .cumulus .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
  .cumulus .btn-ghost:hover{border-color:var(--ink);}

  /* hero */
  .cumulus .hero{padding:104px 0 80px;text-align:center;}
  .cumulus .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;
    color:var(--jade-deep);background:var(--mist);border-radius:100px;padding:7px 15px;margin-bottom:30px;letter-spacing:.01em;}
  .cumulus .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--jade);}
  .cumulus h1{font-size:clamp(42px,5.6vw,76px);line-height:1.07;letter-spacing:-.035em;font-weight:800;max-width:18ch;margin:0 auto 28px;}
  .cumulus h1 .soft{color:var(--muted);}
  .cumulus .lede{font-size:clamp(18px,2vw,21px);color:var(--muted);max-width:54ch;margin:0 auto 38px;line-height:1.55;}
  .cumulus .hero-cta{display:flex;gap:13px;justify-content:center;}
  .cumulus .hero-vis{margin-top:72px;border-radius:28px;overflow:hidden;border:1px solid var(--line);
    background:linear-gradient(160deg,#F2F6F2,#E6EFE9 60%,#DDE9E1);height:420px;position:relative;box-shadow:0 40px 80px -40px rgba(15,157,111,.28);}
  .cumulus .hero-vis .badge{position:absolute;background:var(--card);border:1px solid var(--line);border-radius:18px;
    padding:16px 18px;box-shadow:0 20px 40px -24px rgba(0,0,0,.25);}
  .cumulus .hero-vis .b-num{font-size:30px;font-weight:800;letter-spacing:-.03em;}
  .cumulus .hero-vis .b-lbl{font-size:13px;color:var(--muted);font-weight:500;margin-top:2px;}
  .cumulus .hero-vis .b1{top:46px;left:48px;}
  .cumulus .hero-vis .b2{bottom:60px;right:56px;}
  .cumulus .hero-vis .b3{top:140px;right:120px;}
  .cumulus .hero-vis .center-mark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;}
  .cumulus .hero-vis .center-mark img{width:96px;height:96px;filter:drop-shadow(0 12px 24px rgba(0,0,0,.12));}
  .cumulus .hero-vis .center-mark span{font-weight:600;color:var(--jade-deep);font-size:14px;letter-spacing:.02em;}

  /* section heading */
  .cumulus section{padding:96px 0;}
  .cumulus .sec-head{max-width:680px;margin-bottom:54px;}
  .cumulus .sec-tag{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--jade-deep);margin-bottom:16px;}
  .cumulus h2{font-size:clamp(32px,4vw,52px);letter-spacing:-.03em;line-height:1.06;font-weight:800;margin-bottom:18px;}
  .cumulus .sec-sub{font-size:19px;color:var(--muted);line-height:1.55;}

  /* programs grid */
  .cumulus .prog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .cumulus .prog{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px;transition:all .3s;cursor:pointer;}
  .cumulus .prog:hover{transform:translateY(-5px);box-shadow:0 30px 50px -30px rgba(0,0,0,.22);border-color:#D4D8D0;}
  .cumulus .prog .ic{width:46px;height:46px;border-radius:13px;background:var(--mist);display:flex;align-items:center;justify-content:center;margin-bottom:22px;color:var(--jade-deep);}
  .cumulus .prog h3{font-size:21px;letter-spacing:-.02em;font-weight:700;margin-bottom:9px;}
  .cumulus .prog p{font-size:15px;color:var(--muted);line-height:1.55;}
  .cumulus .prog .more{margin-top:18px;font-size:14px;font-weight:600;color:var(--jade-deep);display:inline-flex;align-items:center;gap:6px;}

  /* stats band */
  .cumulus .band{background:var(--ink);color:var(--paper);border-radius:32px;padding:64px 56px;}
  .cumulus .band-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;}
  .cumulus .stat .n{font-size:64px;font-weight:800;letter-spacing:-.04em;line-height:1;}
  .cumulus .stat .n em{color:var(--jade);font-style:normal;}
  .cumulus .stat .l{font-size:16px;color:#A9ADA6;margin-top:10px;}

  /* events */
  .cumulus .ev{display:flex;gap:22px;align-items:center;padding:24px 0;border-top:1px solid var(--line);transition:padding-left .25s;cursor:pointer;}
  .cumulus .ev:hover{padding-left:10px;}
  .cumulus .ev:last-child{border-bottom:1px solid var(--line);}
  .cumulus .ev .date{flex-shrink:0;width:84px;text-align:center;}
  .cumulus .ev .date .d{font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1;}
  .cumulus .ev .date .m{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--jade-deep);margin-top:4px;}
  .cumulus .ev .body{flex:1;}
  .cumulus .ev .body h4{font-size:20px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px;}
  .cumulus .ev .body p{font-size:14px;color:var(--muted);}
  .cumulus .ev .arrow{color:var(--muted);}

  /* CTA */
  .cumulus .closer{text-align:center;background:var(--mist);border-radius:32px;padding:80px 40px;}
  .cumulus .closer h2{margin-bottom:20px;}
  .cumulus .closer .lede{margin:0 auto 34px;}

  /* footer */
  .cumulus footer{border-top:1px solid var(--line);padding:56px 0 40px;}
  .cumulus .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:44px;}
  .cumulus .foot-brand{max-width:300px;}
  .cumulus .foot-brand p{font-size:14px;color:var(--muted);margin-top:14px;line-height:1.6;}
  .cumulus .foot-col h5{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;}
  .cumulus .foot-col a{display:block;font-size:15px;color:var(--ink);text-decoration:none;margin-bottom:11px;font-weight:500;}
  .cumulus .foot-col a:hover{color:var(--jade-deep);}
  .cumulus .foot-bottom{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted);padding-top:26px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .cumulus .nav-links{display:none;}
    .cumulus .prog-grid,.cumulus .band-grid{grid-template-columns:1fr;}
    .cumulus .wrap{padding:0 22px;}
    .cumulus .band{padding:44px 28px;}
  }`;

  function Ic({d}){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;}
  const ARR = "M5 12h14M13 6l6 6-6 6";

  function Cumulus() {
    const sigs = [
      {t:"AI & Machine Learning", d:"Build models, read papers, and ship projects with a crew that learns together.", p:"M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"},
      {t:"Web & Product", d:"Design and launch real web apps with modern frameworks and friendly mentors.", p:"M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"},
      {t:"Cybersecurity", d:"Capture-the-flag practice and ethical hacking, from first exploit to first internship.", p:"M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"},
      {t:"Game Dev", d:"From pixel art to engines — prototype, jam, and play your own games.", p:"M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"},
      {t:"Robotics", d:"Sensors, embedded systems, and autonomous builds for the curious tinkerer.", p:"M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"},
      {t:"Data Science", d:"Wrangle, visualize, and learn from real Hawaiʻi datasets that matter locally.", p:"M3 3v18h18M8 16V9M13 16V5M18 16v-4"},
    ];
    const events = [
      {d:"14",m:"Feb",t:"Intro to Git & GitHub",s:"Workshop · POST 318B · 5:00 PM"},
      {d:"28",m:"Feb",t:"Resume & LinkedIn Night",s:"Career · iLab · 6:00 PM"},
      {d:"08",m:"Mar",t:"Spring Hackathon Kickoff",s:"48 hours · Campus Center · 9:00 AM"},
    ];
    return (
      <div className="cumulus">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <nav><div className="wrap nav-in">
          <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM <span style={{color:'var(--muted)',fontWeight:500}}>· Mānoa</span></div>
          <div className="nav-links">
            <a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a><a href="#">ICSpace</a>
            <a className="btn btn-primary" href="#">Join us</a>
          </div>
        </div></nav>

        <header className="hero"><div className="wrap">
          <div className="eyebrow"><span className="dot"></span>The largest CS community at UH Mānoa</div>
          <h1>Where computing<br/><span className="soft">finds its</span> people.</h1>
          <p className="lede">ACM at the University of Hawaiʻi at Mānoa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your future team.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#">Become a member <Ic d={ARR}/></a>
            <a className="btn btn-ghost" href="#">Explore programs</a>
          </div>
          <div className="hero-vis">
            <div className="center-mark"><img src="../assets/acm_logo.png" alt=""/><span>est. at UH Mānoa</span></div>
            <div className="badge b1"><div className="b-num">7</div><div className="b-lbl">Special Interest Groups</div></div>
            <div className="badge b2"><div className="b-num">500+</div><div className="b-lbl">Active members</div></div>
            <div className="badge b3"><div className="b-num">50+</div><div className="b-lbl">Events / year</div></div>
          </div>
        </div></header>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="sec-tag">Special Interest Groups</div>
            <h2>Pick a lane. Or three.</h2>
            <p className="sec-sub">Every SIG is student-led and beginner-friendly. Show up, build something, and grow with people who are figuring it out alongside you.</p>
          </div>
          <div className="prog-grid">
            {sigs.map((s,i)=>(
              <div className="prog" key={i}>
                <div className="ic"><Ic d={s.p}/></div>
                <h3>{s.t}</h3><p>{s.d}</p>
                <span className="more">Learn more <Ic d={ARR}/></span>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{paddingTop:0}}><div className="wrap">
          <div className="band"><div className="band-grid">
            <div className="stat"><div className="n">7<em>+</em></div><div className="l">Special Interest Groups, each member-run</div></div>
            <div className="stat"><div className="n">500<em>+</em></div><div className="l">Students across every major on campus</div></div>
            <div className="stat"><div className="n">50<em>+</em></div><div className="l">Workshops, socials & talks each year</div></div>
          </div></div>
        </div></section>

        <section style={{paddingTop:0}}><div className="wrap">
          <div className="sec-head">
            <div className="sec-tag">What's on</div>
            <h2>Coming up next.</h2>
          </div>
          <div>
            {events.map((e,i)=>(
              <div className="ev" key={i}>
                <div className="date"><div className="d">{e.d}</div><div className="m">{e.m}</div></div>
                <div className="body"><h4>{e.t}</h4><p>{e.s}</p></div>
                <div className="arrow"><Ic d={ARR}/></div>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{paddingTop:0}}><div className="wrap">
          <div className="closer">
            <h2>New here? Perfect.</h2>
            <p className="lede">No experience required — just curiosity. Join the Discord, come to one event, and see what sticks.</p>
            <div className="hero-cta"><a className="btn btn-primary" href="#">Join the Discord <Ic d={ARR}/></a></div>
          </div>
        </div></section>

        <footer><div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM · Mānoa</div>
              <p>Association for Computing Machinery at the University of Hawaiʻi at Mānoa. Built by students, for students.</p>
            </div>
            <div className="foot-col"><h5>Explore</h5><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a></div>
            <div className="foot-col"><h5>Connect</h5><a href="#">Discord</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Email</a></div>
            <div className="foot-col"><h5>Resources</h5><a href="#">ICSpace</a><a href="#">GitHub</a><a href="#">ACM Intl.</a><a href="#">ICS Dept.</a></div>
          </div>
          <div className="foot-bottom"><span>© 2025 ACM at UH Mānoa</span><span>Made with aloha 🤙</span></div>
        </div></footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Cumulus });
})();
