/* ACM Mānoa redesign — Direction A3: "Air"  (a clean/minimal sibling of Cumulus)
   Soft & airy. Cool near-white, soft ink, a gentle periwinkle accent. Big
   whitespace, generous rounding, lighter type weights, pastel tints. Calm
   and friendly — minimal but warm. Figtree. */
(function () {
  const CSS = `
  .air{ --bg:#FBFBFE; --ink:#1B1D29; --soft:#494C61; --muted:#7C7F95; --line:#ECECF4; --card:#FFFFFF;
    --peri:#6E6BF2; --peri-d:#5754D6; --wash:#EFEFFE; --wash2:#F4F2FF;
    font-family:'Figtree',sans-serif; color:var(--ink); background:var(--bg); -webkit-font-smoothing:antialiased; line-height:1.6;}
  .air *{box-sizing:border-box;margin:0;padding:0;}
  .air img{display:block;max-width:100%;}
  .air .wrap{max-width:1080px;margin:0 auto;padding:0 40px;}

  /* nav */
  .air nav{position:sticky;top:0;z-index:20;background:rgba(251,251,254,.82);backdrop-filter:blur(16px);}
  .air .nav-in{display:flex;align-items:center;justify-content:space-between;height:80px;}
  .air .brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:18px;letter-spacing:-.01em;white-space:nowrap;}
  .air .brand img{width:30px;height:30px;}
  .air .brand .sep{color:var(--muted);font-weight:500;}
  .air .nav-links{display:flex;gap:8px;align-items:center;}
  .air .nav-links a{color:var(--soft);text-decoration:none;font-size:15px;font-weight:500;padding:9px 15px;border-radius:999px;transition:all .2s;}
  .air .nav-links a:hover{color:var(--ink);background:var(--wash);}
  .air .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:15px;border-radius:999px;padding:12px 24px;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:all .2s;white-space:nowrap;}
  .air .btn-primary{background:var(--peri);color:#fff;box-shadow:0 10px 24px -12px rgba(110,107,242,.8);}
  .air .btn-primary:hover{background:var(--peri-d);transform:translateY(-2px);}
  .air .btn-soft{background:var(--wash);color:var(--peri-d);}
  .air .btn-soft:hover{background:var(--wash2);}
  .air .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
  .air .btn-ghost:hover{border-color:var(--muted);}

  /* hero */
  .air .hero{text-align:center;padding:84px 0 92px;position:relative;overflow:hidden;}
  .air .hero::before{content:'';position:absolute;top:-160px;left:50%;transform:translateX(-50%);width:760px;height:480px;
    background:radial-gradient(ellipse at center, var(--wash) 0%, rgba(239,239,254,0) 68%);z-index:0;}
  .air .hero .wrap{position:relative;z-index:1;}
  .air .chip{display:inline-flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--line);box-shadow:0 8px 20px -14px rgba(27,29,41,.4);
    border-radius:999px;padding:7px 9px 7px 15px;font-size:13.5px;font-weight:600;color:var(--soft);margin-bottom:32px;}
  .air .chip b{color:var(--peri-d);}
  .air .chip .pin{background:var(--peri);color:#fff;border-radius:999px;font-size:11px;font-weight:700;padding:4px 10px;}
  .air h1{font-size:clamp(44px,6vw,80px);line-height:1.04;letter-spacing:-.03em;font-weight:700;max-width:17ch;margin:0 auto 24px;}
  .air h1 .grad{color:var(--peri);}
  .air .lede{font-size:clamp(18px,2vw,21px);color:var(--soft);max-width:50ch;margin:0 auto 36px;}
  .air .hero-cta{display:flex;gap:12px;justify-content:center;}
  .air .hero-panel{margin-top:70px;background:linear-gradient(180deg,var(--wash2),var(--card));border:1px solid var(--line);
    border-radius:32px;padding:18px;box-shadow:0 50px 90px -50px rgba(110,107,242,.5);}
  .air .hero-panel .inner{background:var(--card);border-radius:22px;padding:44px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .air .pcard{background:var(--bg);border-radius:18px;padding:26px;text-align:left;}
  .air .pcard .n{font-size:44px;font-weight:700;letter-spacing:-.03em;line-height:1;color:var(--peri-d);}
  .air .pcard .l{font-size:14px;color:var(--muted);margin-top:8px;font-weight:500;}

  /* sections */
  .air section{padding:90px 0;}
  .air .sec-head{text-align:center;max-width:600px;margin:0 auto 52px;}
  .air .sec-tag{display:inline-block;font-size:13px;font-weight:700;color:var(--peri-d);background:var(--wash);border-radius:999px;padding:6px 14px;margin-bottom:18px;white-space:nowrap;}
  .air h2{font-size:clamp(30px,4vw,48px);letter-spacing:-.03em;line-height:1.08;font-weight:700;margin-bottom:14px;}
  .air .sec-sub{font-size:18px;color:var(--soft);}

  /* SIG cards — soft pastel */
  .air .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .air .sig{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:30px;transition:all .3s;cursor:pointer;}
  .air .sig:hover{transform:translateY(-6px);box-shadow:0 28px 50px -34px rgba(110,107,242,.6);border-color:var(--wash);}
  .air .sig .ic{width:52px;height:52px;border-radius:16px;background:var(--wash);color:var(--peri-d);display:flex;align-items:center;justify-content:center;margin-bottom:22px;}
  .air .sig h3{font-size:21px;font-weight:700;letter-spacing:-.01em;margin-bottom:9px;}
  .air .sig p{font-size:15px;color:var(--soft);}
  .air .sig .more{margin-top:18px;font-size:14px;font-weight:600;color:var(--peri-d);display:inline-flex;gap:6px;align-items:center;}

  /* events as soft pills */
  .air .events{display:flex;flex-direction:column;gap:14px;max-width:760px;margin:0 auto;}
  .air .ev{display:flex;gap:20px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:18px 22px;transition:all .25s;cursor:pointer;}
  .air .ev:hover{box-shadow:0 22px 40px -32px rgba(27,29,41,.5);transform:translateY(-3px);}
  .air .ev .date{flex-shrink:0;text-align:center;background:var(--wash);border-radius:14px;width:64px;padding:10px 0;}
  .air .ev .date .d{font-size:24px;font-weight:700;line-height:1;color:var(--peri-d);}
  .air .ev .date .m{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-top:3px;}
  .air .ev .body{flex:1;}
  .air .ev .body h4{font-size:18px;font-weight:700;}
  .air .ev .body p{font-size:14px;color:var(--muted);}
  .air .ev .arrow{color:var(--muted);}

  /* closer */
  .air .closer .box{background:linear-gradient(140deg,var(--peri),#8E7BF6);border-radius:32px;padding:76px 40px;text-align:center;color:#fff;
    box-shadow:0 50px 90px -50px rgba(110,107,242,.8);}
  .air .closer h2{color:#fff;margin-bottom:14px;}
  .air .closer p{color:rgba(255,255,255,.9);font-size:19px;max-width:48ch;margin:0 auto 30px;}
  .air .closer .btn-white{background:#fff;color:var(--peri-d);}
  .air .closer .btn-white:hover{transform:translateY(-2px);}

  /* footer */
  .air footer{padding:56px 0 40px;}
  .air .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .air .foot-brand{max-width:300px;}
  .air .foot-brand p{font-size:14px;color:var(--muted);margin-top:14px;}
  .air .foot-col h5{font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .air .foot-col a{display:block;font-size:15px;color:var(--soft);text-decoration:none;margin-bottom:11px;font-weight:500;}
  .air .foot-col a:hover{color:var(--peri-d);}
  .air .foot-bottom{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);padding-top:24px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .air .nav-links{display:none;}
    .air .grid,.air .hero-panel .inner{grid-template-columns:1fr;}
    .air .wrap{padding:0 22px;}
    .air .hero-panel .inner{padding:24px;}
  }`;

  function Ic({d}){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;}
  const ARR="M5 12h14M13 6l6 6-6 6";

  function Air(){
    const sigs=[
      {t:"AI & Machine Learning",d:"Build models, read papers, and ship projects together.",p:"M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"},
      {t:"Web & Product",d:"Design and launch real apps with modern frameworks.",p:"M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"},
      {t:"Cybersecurity",d:"CTF practice and ethical hacking, beginner to bounty.",p:"M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"},
      {t:"Game Dev",d:"Pixels to engines — make the game you want to play.",p:"M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"},
      {t:"Robotics",d:"Sensors, embedded systems, machines that move.",p:"M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"},
      {t:"Data Science",d:"Real Hawaiʻi datasets, honest visualizations.",p:"M3 3v18h18M8 16V9M13 16V5M18 16v-4"},
    ];
    const events=[
      {d:"14",m:"Feb",t:"Intro to Git & GitHub",s:"Workshop · POST 318B · 5:00 PM"},
      {d:"28",m:"Feb",t:"Resume & LinkedIn Night",s:"Career · iLab · 6:00 PM"},
      {d:"08",m:"Mar",t:"Spring Hackathon Kickoff",s:"48 hours · Campus Center · 9:00 AM"},
    ];
    return (
      <div className="air">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <nav><div className="wrap nav-in">
          <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM <span className="sep">· Mānoa</span></div>
          <div className="nav-links"><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a><a className="btn btn-primary" href="#" style={{marginLeft:'8px'}}>Join us</a></div>
        </div></nav>

        <header className="hero"><div className="wrap">
          <div className="chip"><span className="pin">New</span>The largest CS community at UH Mānoa</div>
          <h1>A friendly home for <span className="grad">curious builders.</span></h1>
          <p className="lede">ACM at the University of Hawaiʻi at Mānoa is where beginners and tinkerers find their group, ship their first project, and meet their future team.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#">Become a member <Ic d={ARR}/></a>
            <a className="btn btn-ghost" href="#">Explore programs</a>
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
            <p className="sec-sub">Every SIG is student-led and beginner-friendly. Show up, build something, grow alongside others figuring it out too.</p>
          </div>
          <div className="grid">
            {sigs.map((s,i)=>(
              <div className="sig" key={i}>
                <div className="ic"><Ic d={s.p}/></div>
                <h3>{s.t}</h3><p>{s.d}</p>
                <span className="more">Learn more <Ic d={ARR}/></span>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{paddingTop:0}}><div className="wrap">
          <div className="sec-head"><div className="sec-tag">What's on</div><h2>Coming up next.</h2></div>
          <div className="events">
            {events.map((e,i)=>(
              <div className="ev" key={i}>
                <div className="date"><div className="d">{e.d}</div><div className="m">{e.m}</div></div>
                <div className="body"><h4>{e.t}</h4><p>{e.s}</p></div>
                <div className="arrow"><Ic d={ARR}/></div>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{paddingTop:0}}><div className="wrap closer">
          <div className="box">
            <h2>New here? Perfect.</h2>
            <p>No experience required — just curiosity. Join the Discord, come to one event, and see what sticks.</p>
            <a className="btn btn-white" href="#">Join the Discord <Ic d={ARR}/></a>
          </div>
        </div></section>

        <footer><div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand"><div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM <span className="sep">· Mānoa</span></div>
              <p>Association for Computing Machinery at the University of Hawaiʻi at Mānoa. Built by students, for students.</p></div>
            <div className="foot-col"><h5>Explore</h5><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a></div>
            <div className="foot-col"><h5>Connect</h5><a href="#">Discord</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Email</a></div>
            <div className="foot-col"><h5>Resources</h5><a href="#">ICSpace</a><a href="#">GitHub</a><a href="#">ACM Intl.</a></div>
          </div>
          <div className="foot-bottom"><span>© 2025 ACM at UH Mānoa</span><span>Made with aloha 🤙</span></div>
        </div></footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Air });
})();
