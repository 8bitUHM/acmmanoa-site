/* ACM Mānoa redesign — Direction D: "Aloha"
   Tropical & place-rooted. Sunset coral → gold → ocean teal on warm cream,
   organic blob shapes, a rising-sun motif, soft rounded cards. Warm,
   vibrant, unmistakably Hawaiʻi — but still modern and techy. */
(function () {
  const CSS = `
  .aloha{ --cream:#FFF7EC; --ink:#14233A; --ocean:#0E8C86; --ocean-d:#0A6E68;
    --coral:#FF6A45; --gold:#FFB13C; --sky:#7CD9D2; --muted:#5E6B72; --line:#EFE2CE; --card:#FFFFFF;
    font-family:'DM Sans',sans-serif; color:var(--ink); background:var(--cream); -webkit-font-smoothing:antialiased; line-height:1.55;}
  .aloha *{box-sizing:border-box;margin:0;padding:0;}
  .aloha img{display:block;max-width:100%;}
  .aloha .disp{font-family:'Bricolage Grotesque',sans-serif;}
  .aloha .wrap{max-width:1140px;margin:0 auto;padding:0 40px;}

  /* nav */
  .aloha nav{position:sticky;top:0;z-index:30;background:rgba(255,247,236,.85);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
  .aloha .nav-in{display:flex;align-items:center;justify-content:space-between;height:74px;}
  .aloha .brand{display:flex;align-items:center;gap:11px;font-family:'Bricolage Grotesque';font-weight:700;font-size:20px;white-space:nowrap;}
  .aloha .brand img{width:32px;height:32px;}
  .aloha .nav-links{display:flex;gap:30px;align-items:center;}
  .aloha .nav-links a{color:var(--ink);text-decoration:none;font-size:15px;font-weight:600;transition:color .2s;}
  .aloha .nav-links a:hover{color:var(--coral);}
  .aloha .btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:15px;border-radius:999px;padding:12px 24px;text-decoration:none;cursor:pointer;border:2px solid transparent;transition:all .2s;white-space:nowrap;}
  .aloha .btn-coral{background:var(--coral);color:#fff;box-shadow:0 10px 24px -10px rgba(255,106,69,.7);}
  .aloha .btn-coral:hover{transform:translateY(-2px);box-shadow:0 16px 30px -12px rgba(255,106,69,.8);}
  .aloha .btn-ocean{background:var(--ink);color:#fff;}
  .aloha .btn-ocean:hover{background:var(--ocean-d);}
  .aloha .btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
  .aloha .btn-ghost:hover{background:var(--ink);color:#fff;}

  /* hero */
  .aloha .hero{position:relative;overflow:hidden;padding:90px 0 130px;
    background:radial-gradient(120% 120% at 78% -10%, var(--gold) 0%, var(--coral) 34%, #FF8A5C 50%, var(--cream) 72%);}
  .aloha .sun{position:absolute;top:-120px;right:-60px;width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle at 50% 50%, #FFE9B0, var(--gold) 60%, transparent 72%);opacity:.85;}
  .aloha .hero .wrap{position:relative;z-index:2;}
  .aloha .pill{display:inline-flex;align-items:center;gap:9px;background:rgba(20,35,58,.9);color:#fff;font-size:13px;font-weight:700;border-radius:999px;padding:8px 16px;margin-bottom:26px;}
  .aloha .pill .dot{width:8px;height:8px;border-radius:50%;background:var(--gold);}
  .aloha .hero h1{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(46px,7vw,84px);line-height:1.02;letter-spacing:-.03em;max-width:16ch;margin-bottom:24px;}
  .aloha .hero h1 .u{color:#fff;-webkit-text-stroke:0;}
  .aloha .hero .lede{font-size:clamp(17px,2vw,20px);max-width:46ch;color:var(--ink);margin-bottom:34px;font-weight:500;}
  .aloha .hero-cta{display:flex;gap:14px;flex-wrap:wrap;}
  .aloha .floatcards{display:flex;gap:16px;margin-top:64px;flex-wrap:wrap;}
  .aloha .fc{background:var(--card);border-radius:22px;padding:22px 26px;box-shadow:0 22px 44px -28px rgba(20,35,58,.4);flex:1;min-width:170px;}
  .aloha .fc .n{font-family:'Bricolage Grotesque';font-weight:800;font-size:42px;line-height:1;letter-spacing:-.03em;}
  .aloha .fc:nth-child(1) .n{color:var(--coral);} .aloha .fc:nth-child(2) .n{color:var(--ocean);} .aloha .fc:nth-child(3) .n{color:var(--gold);}
  .aloha .fc .l{font-size:14px;color:var(--muted);font-weight:600;margin-top:6px;}

  /* wave divider */
  .aloha .wave{display:block;width:100%;height:60px;margin-top:-60px;position:relative;z-index:2;}

  /* sections */
  .aloha section{padding:88px 0;}
  .aloha .sec-head{text-align:center;max-width:640px;margin:0 auto 52px;}
  .aloha .sec-tag{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--coral);margin-bottom:14px;}
  .aloha h2{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(32px,4.4vw,52px);letter-spacing:-.025em;line-height:1.05;margin-bottom:14px;}
  .aloha .sec-sub{font-size:18px;color:var(--muted);}

  /* SIG grid */
  .aloha .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .aloha .sig{position:relative;background:var(--card);border-radius:26px;padding:30px;overflow:hidden;border:1px solid var(--line);transition:all .3s;cursor:pointer;}
  .aloha .sig::before{content:'';position:absolute;top:-40px;right:-40px;width:120px;height:120px;border-radius:50%;opacity:.16;transition:transform .4s;}
  .aloha .sig:hover{transform:translateY(-6px);box-shadow:0 28px 50px -30px rgba(20,35,58,.45);}
  .aloha .sig:hover::before{transform:scale(1.5);}
  .aloha .sig:nth-child(3n+1)::before{background:var(--coral);} .aloha .sig:nth-child(3n+2)::before{background:var(--ocean);} .aloha .sig:nth-child(3n)::before{background:var(--gold);}
  .aloha .sig .ic{width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:20px;position:relative;z-index:2;}
  .aloha .sig:nth-child(3n+1) .ic{background:var(--coral);} .aloha .sig:nth-child(3n+2) .ic{background:var(--ocean);} .aloha .sig:nth-child(3n) .ic{background:var(--gold);}
  .aloha .sig h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:22px;margin-bottom:8px;position:relative;z-index:2;}
  .aloha .sig p{font-size:15px;color:var(--muted);position:relative;z-index:2;}
  .aloha .sig .more{margin-top:16px;font-weight:700;font-size:14px;color:var(--ink);display:inline-flex;gap:6px;align-items:center;position:relative;z-index:2;}

  /* ocean band */
  .aloha .band{background:linear-gradient(135deg,var(--ocean) 0%, var(--ocean-d) 60%, #084f4a 100%);color:#fff;}
  .aloha .band .wrap{padding:80px 40px;}
  .aloha .band .sec-head{margin-bottom:0;text-align:left;max-width:none;}
  .aloha .band-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:50px;align-items:center;}
  .aloha .band h2{color:#fff;}
  .aloha .band p{color:rgba(255,255,255,.86);font-size:18px;margin-bottom:26px;}
  .aloha .events{display:flex;flex-direction:column;gap:12px;}
  .aloha .ev{display:flex;gap:18px;align-items:center;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:18px;padding:16px 20px;transition:background .2s;cursor:pointer;}
  .aloha .ev:hover{background:rgba(255,255,255,.18);}
  .aloha .ev .date{flex-shrink:0;text-align:center;background:var(--gold);color:var(--ink);border-radius:13px;width:58px;padding:8px 0;}
  .aloha .ev .date .d{font-family:'Bricolage Grotesque';font-weight:800;font-size:22px;line-height:1;}
  .aloha .ev .date .m{font-size:11px;font-weight:700;text-transform:uppercase;}
  .aloha .ev h4{font-size:17px;font-weight:700;}
  .aloha .ev p{margin:0;font-size:13px;color:rgba(255,255,255,.72);}

  /* closer */
  .aloha .closer{text-align:center;}
  .aloha .closer .box{background:linear-gradient(135deg,var(--coral),var(--gold));border-radius:32px;padding:74px 40px;color:#fff;}
  .aloha .closer h2{color:#fff;margin-bottom:14px;}
  .aloha .closer p{color:rgba(255,255,255,.92);font-size:19px;max-width:50ch;margin:0 auto 30px;font-weight:500;}

  /* footer */
  .aloha footer{background:var(--ink);color:#fff;padding:60px 0 40px;}
  .aloha .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .aloha .foot-brand{max-width:300px;}
  .aloha .foot-brand .brand{color:#fff;}
  .aloha .foot-brand p{color:rgba(255,255,255,.66);font-size:14px;margin-top:14px;}
  .aloha .foot-col h5{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
  .aloha .foot-col a{display:block;color:rgba(255,255,255,.82);text-decoration:none;font-size:15px;margin-bottom:10px;}
  .aloha .foot-col a:hover{color:var(--coral);}
  .aloha .foot-bottom{border-top:1px solid rgba(255,255,255,.14);padding-top:24px;display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.6);}

  @media(max-width:760px){
    .aloha .nav-links{display:none;}
    .aloha .grid,.aloha .band-grid{grid-template-columns:1fr;}
    .aloha .wrap{padding:0 22px;}
    .aloha .band .wrap{padding:54px 24px;}
  }`;

  function Ic({d}){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;}
  const ARR="M5 12h14M13 6l6 6-6 6";

  function Aloha(){
    const sigs=[
      {t:"AI & Machine Learning",d:"Build models, read papers, ship projects — together.",p:"M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"},
      {t:"Web & Product",d:"Design and launch real apps with modern tools.",p:"M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"},
      {t:"Cybersecurity",d:"CTF practice and ethical hacking, beginner to bounty.",p:"M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"},
      {t:"Game Dev",d:"Pixels to engines — make the game you want to play.",p:"M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"},
      {t:"Robotics",d:"Sensors, embedded systems, machines that move.",p:"M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"},
      {t:"Data Science",d:"Real Hawaiʻi datasets, honest visualizations.",p:"M3 3v18h18M8 16V9M13 16V5M18 16v-4"},
    ];
    const events=[
      {d:"14",m:"Feb",t:"Intro to Git & GitHub",s:"Workshop · POST 318B · 5:00 PM"},
      {d:"28",m:"Feb",t:"Resume & LinkedIn Night",s:"Career · iLab · 6:00 PM"},
      {d:"08",m:"Mar",t:"Spring Hackathon",s:"48 hours · Campus Center"},
    ];
    return (
      <div className="aloha">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <nav><div className="wrap nav-in">
          <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM Mānoa</div>
          <div className="nav-links"><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a><a className="btn btn-coral" href="#">Join us</a></div>
        </div></nav>

        <header className="hero">
          <div className="sun"></div>
          <div className="wrap">
            <div className="pill"><span className="dot"></span>The largest CS ʻohana at UH Mānoa</div>
            <h1 className="disp">Aloha. Let's build <span className="u">something</span> together.</h1>
            <p className="lede">ACM at the University of Hawaiʻi at Mānoa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your people.</p>
            <div className="hero-cta">
              <a className="btn btn-ocean" href="#">Become a member <Ic d={ARR}/></a>
              <a className="btn btn-ghost" href="#">Explore programs</a>
            </div>
            <div className="floatcards">
              <div className="fc"><div className="n">7</div><div className="l">Special Interest Groups</div></div>
              <div className="fc"><div className="n">500+</div><div className="l">Active members</div></div>
              <div className="fc"><div className="n">50+</div><div className="l">Events every year</div></div>
            </div>
          </div>
        </header>
        <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,40 C240,8 480,8 720,32 C960,56 1200,56 1440,28 L1440,60 L0,60 Z" fill="#FFF7EC"/></svg>

        <section><div className="wrap">
          <div className="sec-head">
            <div className="sec-tag">Special Interest Groups</div>
            <h2 className="disp">Find your wave.</h2>
            <p className="sec-sub">Every SIG is student-led and beginner-friendly. Show up, build something, grow with people figuring it out alongside you.</p>
          </div>
          <div className="grid">
            {sigs.map((s,i)=>(
              <div className="sig" key={i}>
                <div className="ic"><Ic d={s.p}/></div>
                <h3 className="disp">{s.t}</h3><p>{s.d}</p>
                <span className="more">Learn more <Ic d={ARR}/></span>
              </div>
            ))}
          </div>
        </div></section>

        <section className="band" style={{padding:0}}><div className="wrap">
          <div className="band-grid">
            <div>
              <div className="sec-head">
                <div className="sec-tag" style={{color:'var(--gold)'}}>What's on</div>
                <h2 className="disp">Come hang out.</h2>
                <p>Workshops, socials, and talks all semester long. No experience required — just curiosity and good vibes.</p>
              </div>
              <a className="btn btn-coral" href="#">See all events <Ic d={ARR}/></a>
            </div>
            <div className="events">
              {events.map((e,i)=>(
                <div className="ev" key={i}>
                  <div className="date"><div className="d">{e.d}</div><div className="m">{e.m}</div></div>
                  <div><h4>{e.t}</h4><p>{e.s}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div></section>

        <section><div className="wrap closer">
          <div className="box">
            <h2 className="disp">New here? E komo mai.</h2>
            <p>That's "welcome." No experience needed — join the Discord, come to one event, and see what sticks.</p>
            <a className="btn" style={{background:'#fff',color:'var(--coral)'}} href="#">Join the Discord <Ic d={ARR}/></a>
          </div>
        </div></section>

        <footer><div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand"><img src="../assets/acm_logo.png" alt=""/>ACM Mānoa</div>
              <p>Association for Computing Machinery at the University of Hawaiʻi at Mānoa. Built by students, for students.</p>
            </div>
            <div className="foot-col"><h5>Explore</h5><a href="#">About</a><a href="#">Programs</a><a href="#">Events</a><a href="#">Sponsors</a></div>
            <div className="foot-col"><h5>Connect</h5><a href="#">Discord</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Email</a></div>
            <div className="foot-col"><h5>Resources</h5><a href="#">ICSpace</a><a href="#">GitHub</a><a href="#">ACM Intl.</a></div>
          </div>
          <div className="foot-bottom"><span>© 2025 ACM at UH Mānoa</span><span>Made with aloha 🤙</span></div>
        </div></footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Aloha });
})();
