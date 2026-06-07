/* ACM Mānoa redesign — Direction C: "Terminal"
   Playful + techy. A developer console: monospace everything, near-black
   canvas, phosphor-lime accent + cyan, window chrome, a command-line hero,
   SIGs as installable packages, events as a log. Reinvented from scratch. */
(function () {
  const CSS = `
  .term{ --bg:#0A0D0A; --panel:#0F140F; --panel2:#131A13; --line:#23301F;
    --lime:#B6FF3D; --cyan:#5BE9FF; --amber:#FFB13D; --txt:#CBD6C4; --bright:#EAF4E4; --dim:#74866D;
    font-family:'JetBrains Mono',ui-monospace,monospace; color:var(--txt); background:var(--bg);
    -webkit-font-smoothing:antialiased; line-height:1.6; font-size:14px;}
  .term *{box-sizing:border-box;margin:0;padding:0;}
  .term img{display:block;max-width:100%;}
  .term .wrap{max-width:1100px;margin:0 auto;padding:0 36px;}
  .term a{color:inherit;text-decoration:none;}
  .term .lime{color:var(--lime);} .term .cyan{color:var(--cyan);} .term .dim{color:var(--dim);} .term .amber{color:var(--amber);}

  /* top window bar */
  .term .topbar{position:sticky;top:0;z-index:20;background:var(--panel);border-bottom:1px solid var(--line);}
  .term .tb-in{display:flex;align-items:center;gap:16px;height:46px;}
  .term .lights{display:flex;gap:7px;}
  .term .lights i{width:11px;height:11px;border-radius:50%;display:block;}
  .term .lights .r{background:#FF5F57;} .term .lights .y{background:#FEBC2E;} .term .lights .g{background:#28C840;}
  .term .tb-path{font-size:13px;color:var(--dim);}
  .term .tb-path b{color:var(--bright);font-weight:400;}
  .term .tb-nav{margin-left:auto;display:flex;gap:22px;font-size:13px;}
  .term .tb-nav a{color:var(--dim);transition:color .15s;}
  .term .tb-nav a:hover{color:var(--lime);}
  .term .tb-nav a::before{content:'#';color:var(--line);margin-right:1px;}
  .term .tb-nav a:hover::before{color:var(--lime);}

  /* hero */
  .term .hero{padding:72px 0 60px;}
  .term .prompt{font-size:14px;margin-bottom:8px;}
  .term .prompt .usr{color:var(--lime);} .term .prompt .pth{color:var(--cyan);}
  .term .cmd{color:var(--bright);}
  .term .cursor{display:inline-block;width:9px;height:18px;background:var(--lime);vertical-align:-3px;margin-left:3px;animation:blink 1.05s steps(1) infinite;}
  @keyframes blink{50%{opacity:0;}}
  .term h1{font-size:clamp(38px,6.5vw,76px);line-height:1.02;letter-spacing:-.02em;color:var(--bright);font-weight:800;margin:30px 0 22px;}
  .term h1 .hl{color:var(--lime);}
  .term .hero p{font-size:16px;max-width:60ch;color:var(--txt);margin-bottom:30px;}
  .term .hero p .tok{color:var(--cyan);}
  .term .hero-cta{display:flex;gap:12px;flex-wrap:wrap;}
  .term .btn{display:inline-flex;align-items:center;gap:9px;font-family:inherit;font-size:14px;font-weight:700;
    padding:12px 20px;border-radius:8px;border:1px solid var(--line);cursor:pointer;transition:all .16s;}
  .term .btn-lime{background:var(--lime);color:#0A0D0A;border-color:var(--lime);}
  .term .btn-lime:hover{box-shadow:0 0 0 3px rgba(182,255,61,.22);transform:translateY(-1px);}
  .term .btn-line{background:transparent;color:var(--bright);}
  .term .btn-line:hover{border-color:var(--lime);color:var(--lime);}

  /* output panel */
  .term .panel{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden;}
  .term .panel-bar{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--line);background:var(--panel2);font-size:12px;color:var(--dim);}
  .term .panel-bar .dotrow{display:flex;gap:6px;}
  .term .panel-bar .dotrow i{width:9px;height:9px;border-radius:50%;background:var(--line);display:block;}
  .term .panel-body{padding:20px 22px;}

  .term .hero-grid{display:grid;grid-template-columns:1.2fr .9fr;gap:40px;align-items:center;}
  .term .statline{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed var(--line);font-size:13px;}
  .term .statline:last-child{border-bottom:0;}
  .term .statline .v{color:var(--lime);font-weight:700;}
  .term .mark{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .term .mark img{width:40px;height:40px;}
  .term .mark span{color:var(--bright);font-weight:700;}

  /* section */
  .term .sec{padding:66px 0;border-top:1px solid var(--line);}
  .term .sec-head{margin-bottom:30px;}
  .term .sec-head .run{font-size:13px;color:var(--dim);margin-bottom:10px;}
  .term .sec-head .run .lime{color:var(--lime);}
  .term .sec-head h2{font-size:clamp(26px,3.6vw,40px);color:var(--bright);letter-spacing:-.01em;font-weight:800;}

  /* packages (SIGs) */
  .term .pkgs{display:flex;flex-direction:column;}
  .term .pkg{display:grid;grid-template-columns:26px 200px 70px 1fr 110px;gap:16px;align-items:center;
    padding:16px 14px;border:1px solid transparent;border-radius:9px;transition:all .16s;cursor:pointer;font-size:13.5px;}
  .term .pkg:hover{background:var(--panel);border-color:var(--line);}
  .term .pkg .ok{color:var(--lime);}
  .term .pkg .nm{color:var(--bright);font-weight:700;}
  .term .pkg .ver{color:var(--dim);}
  .term .pkg .ds{color:var(--txt);}
  .term .pkg .inst{text-align:right;color:var(--dim);}
  .term .pkg:hover .inst{color:var(--cyan);}

  /* join code block */
  .term .code .panel-body{font-size:13.5px;line-height:1.9;}
  .term .code .ln{white-space:pre-wrap;}
  .term .code .c{color:var(--dim);} .term .code .k{color:var(--cyan);} .term .code .s{color:var(--amber);} .term .code .f{color:var(--lime);}

  /* events log */
  .term .log .row{display:grid;grid-template-columns:128px 92px 1fr auto;gap:16px;padding:13px 0;border-bottom:1px solid var(--line);font-size:13.5px;align-items:center;}
  .term .log .row:last-child{border-bottom:0;}
  .term .log .ts{color:var(--dim);}
  .term .log .lvl{font-weight:700;}
  .term .log .lvl.ok{color:var(--lime);} .term .log .lvl.info{color:var(--cyan);} .term .log .lvl.warn{color:var(--amber);}
  .term .log .msg{color:var(--bright);}
  .term .log .loc{color:var(--dim);}

  /* closer */
  .term .closer{text-align:center;}
  .term .closer h2{font-size:clamp(28px,4vw,46px);color:var(--bright);font-weight:800;margin-bottom:14px;letter-spacing:-.01em;}
  .term .closer h2 .hl{color:var(--lime);}
  .term .closer p{color:var(--txt);max-width:54ch;margin:0 auto 26px;}
  .term .closer .hero-cta{justify-content:center;}

  /* footer status bar */
  .term footer{border-top:1px solid var(--line);}
  .term .foot-cols{display:flex;gap:60px;flex-wrap:wrap;padding:48px 0 36px;}
  .term .foot-cols .mark{align-items:flex-start;}
  .term .foot-cols h5{color:var(--dim);font-size:12px;margin-bottom:12px;}
  .term .foot-cols a{display:block;color:var(--txt);margin-bottom:8px;font-size:13.5px;}
  .term .foot-cols a:hover{color:var(--lime);}
  .term .statusbar{background:var(--lime);color:#0A0D0A;font-size:12.5px;font-weight:700;padding:8px 0;}
  .term .statusbar .wrap{display:flex;justify-content:space-between;}

  @media(max-width:760px){
    .term .tb-nav{display:none;}
    .term .hero-grid{grid-template-columns:1fr;}
    .term .pkg{grid-template-columns:20px 1fr auto;}
    .term .pkg .ver,.term .pkg .ds{display:none;}
    .term .log .row{grid-template-columns:1fr;gap:2px;}
    .term .wrap{padding:0 20px;}
  }`;

  function Term() {
    const pkgs=[
      {nm:"sig-ai",ver:"v2.4",ds:"machine learning · research · demos",inst:"500★"},
      {nm:"sig-web",ver:"v3.1",ds:"full-stack · frameworks · ship it",inst:"480★"},
      {nm:"sig-security",ver:"v1.8",ds:"ctf · ethical hacking · blue team",inst:"310★"},
      {nm:"sig-gamedev",ver:"v1.2",ds:"engines · pixel art · game jams",inst:"260★"},
      {nm:"sig-robotics",ver:"v0.9",ds:"embedded · sensors · autonomy",inst:"190★"},
      {nm:"sig-data",ver:"v2.0",ds:"analytics · viz · local datasets",inst:"240★"},
    ];
    const log=[
      {ts:"Feb 14 17:00",lvl:"ok",cls:"ok",msg:"Intro to Git & GitHub",loc:"POST 318B"},
      {ts:"Feb 28 18:00",lvl:"info",cls:"info",msg:"Resume & LinkedIn Night",loc:"iLab"},
      {ts:"Mar 08 09:00",lvl:"warn",cls:"warn",msg:"Spring Hackathon [48h]",loc:"Campus Center"},
    ];
    return (
      <div className="term">
        <style dangerouslySetInnerHTML={{__html:CSS}}/>
        <div className="topbar"><div className="wrap tb-in">
          <div className="lights"><i className="r"></i><i className="y"></i><i className="g"></i></div>
          <div className="tb-path">acm@manoa: <b>~/welcome</b></div>
          <div className="tb-nav"><a href="#">about</a><a href="#">programs</a><a href="#">events</a><a href="#">sponsors</a><a href="#">join</a></div>
        </div></div>

        <header className="hero"><div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="prompt"><span className="usr">acm@manoa</span><span className="dim">:</span><span className="pth">~</span><span className="dim">$ </span><span className="cmd">./welcome --new-student</span></div>
              <h1>Compile your<br/><span className="hl">people</span> here.</h1>
              <p>The Association for Computing Machinery at UH Mānoa is the island's largest computing community. <span className="tok">$ no_experience</span> required — clone a group, push your first project, merge with people who'll catch your bugs.</p>
              <div className="hero-cta">
                <a className="btn btn-lime" href="#">▶ run join.sh</a>
                <a className="btn btn-line" href="#">cat programs/</a>
              </div>
              <div className="prompt" style={{marginTop:'22px'}}><span className="dim">$ </span><span className="cursor"></span></div>
            </div>
            <div className="panel">
              <div className="panel-bar"><div className="dotrow"><i></i><i></i><i></i></div> stats.json</div>
              <div className="panel-body">
                <div className="mark"><img src="../assets/acm_logo.png" alt=""/><span>acm-manoa</span></div>
                <div className="statline"><span className="dim">special_interest_groups</span><span className="v">7</span></div>
                <div className="statline"><span className="dim">active_members</span><span className="v">500+</span></div>
                <div className="statline"><span className="dim">events_per_year</span><span className="v">50+</span></div>
                <div className="statline"><span className="dim">majors_welcome</span><span className="v">all</span></div>
                <div className="statline"><span className="dim">status</span><span className="cyan">● open · accepting</span></div>
              </div>
            </div>
          </div>
        </div></header>

        <section className="sec"><div className="wrap">
          <div className="sec-head">
            <div className="run"><span className="lime">$</span> acm sigs --list <span className="dim">// 7 packages available</span></div>
            <h2>Install a Special Interest Group</h2>
          </div>
          <div className="panel"><div className="panel-bar"><div className="dotrow"><i></i><i></i><i></i></div> registry — student-led, beginner-safe</div>
            <div className="panel-body pkgs">
              {pkgs.map((p,i)=>(
                <div className="pkg" key={i}>
                  <span className="ok">✓</span><span className="nm">{p.nm}</span><span className="ver">{p.ver}</span>
                  <span className="ds">{p.ds}</span><span className="inst">{p.inst} · install →</span>
                </div>
              ))}
            </div>
          </div>
        </div></section>

        <section className="sec"><div className="wrap">
          <div className="sec-head">
            <div className="run"><span className="lime">$</span> cat join.sh</div>
            <h2>Joining takes one command</h2>
          </div>
          <div className="panel code"><div className="panel-bar"><div className="dotrow"><i></i><i></i><i></i></div> join.sh</div>
            <div className="panel-body">
              <div className="ln"><span className="c"># no application, no fees, no gatekeeping</span></div>
              <div className="ln"><span className="k">join</span> <span className="s">"acm-manoa"</span> \</div>
              <div className="ln">{"  "}--discord <span className="f">connect</span> \</div>
              <div className="ln">{"  "}--event <span className="s">"any"</span> \</div>
              <div className="ln">{"  "}--major <span className="s">"*"</span></div>
              <div className="ln"><span className="c"># → welcome aboard. see you Friday.</span></div>
            </div>
          </div>
        </div></section>

        <section className="sec log"><div className="wrap">
          <div className="sec-head">
            <div className="run"><span className="lime">$</span> tail -f events.log</div>
            <h2>What's running next</h2>
          </div>
          {log.map((e,i)=>(
            <div className="row" key={i}>
              <span className="ts">{e.ts}</span><span className={"lvl "+e.cls}>[{e.lvl.toUpperCase()}]</span>
              <span className="msg">{e.msg}</span><span className="loc">@ {e.loc}</span>
            </div>
          ))}
        </div></section>

        <section className="sec"><div className="wrap closer">
          <h2>$ <span className="hl">whoami</span> → future you</h2>
          <p>Curiosity is the only prerequisite. Drop into the Discord, show up to one event, and start building.</p>
          <div className="hero-cta"><a className="btn btn-lime" href="#">▶ run join.sh</a><a className="btn btn-line" href="#">./discord</a></div>
        </div></section>

        <footer>
          <div className="wrap foot-cols">
            <div style={{minWidth:'200px'}}>
              <div className="mark"><img src="../assets/acm_logo.png" alt=""/><span>acm-manoa</span></div>
              <p className="dim" style={{fontSize:'13px'}}>// built by students at the<br/>University of Hawaiʻi at Mānoa</p>
            </div>
            <div><h5>// explore</h5><a href="#">about</a><a href="#">programs</a><a href="#">events</a><a href="#">sponsors</a></div>
            <div><h5>// connect</h5><a href="#">discord</a><a href="#">instagram</a><a href="#">linkedin</a><a href="#">email</a></div>
            <div><h5>// resources</h5><a href="#">icspace</a><a href="#">github</a><a href="#">acm.org</a></div>
          </div>
          <div className="statusbar"><div className="wrap"><span>● acm@manoa — connected</span><span>© 2025 · made with aloha</span></div></div>
        </footer>
      </div>
    );
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign||{}, { Term });
})();
