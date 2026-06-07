/* ACM Mānoa Air site — About */
(function () {
  const { useState } = React;

  function Faq({ items }) {
    const { Ic } = window.AirShell;
    const [open, setOpen] = useState(0);
    return (
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((it, i) => {
          const on = open === i;
          return (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '18px', overflow: 'hidden' }}>
              <button onClick={() => setOpen(on ? -1 : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '20px 24px', background: on ? 'var(--wash)' : 'transparent', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 700, color: 'var(--ink)', textAlign: 'left' }}>
                <span style={{ fontSize: '17px' }}>{it.q}</span>
                <span style={{ color: 'var(--peri-d)', transform: on ? 'rotate(45deg)' : 'none', transition: 'transform .2s', flexShrink: 0, marginLeft: '16px' }}><Ic d="M12 5v14M5 12h14" s={20} /></span>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows .25s ease' }}>
                <div style={{ overflow: 'hidden' }}><p style={{ padding: '16px 24px 22px', color: 'var(--soft)', fontSize: '15.5px', lineHeight: 1.65 }}>{it.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function About() {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const { board, faqs } = window.ACMData;
    return (
      <div className="air">
        <Nav route="#/about" />
        <header className="subhero"><div className="wrap">
          <div className="eyebrow">About us</div>
          <h1>Students, building together.</h1>
          <p>ACM Mānoa is the largest computer science student organization at the University of Hawaiʻi at Mānoa — an official ACM chapter and a home for everyone curious about computing.</p>
        </div></header>

        <section style={{ paddingTop: '20px' }}><div className="wrap">
          <div className="panel"><div className="prose">
            <p>The Association for Computing Machinery at UH Mānoa welcomes students of all backgrounds and experience levels. We exist to bridge the gap between students and Hawaiʻi's growing tech industry — through social, professional, and technical enrichment.</p>
            <p>Our Special Interest Groups put students in the driver's seat, leading the projects, workshops, and events that make the organization grow alongside its members' interests.</p>
          </div></div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap-wide">
          <div className="sec-head"><div className="sec-tag">Leadership</div><h2>Meet the board.</h2></div>
          <div className="people">
            {board.map((p, i) => (
              <div className="person" key={i}>
                <img className="av" src="../../assets/default_user.svg" alt={p.name} />
                <h4>{p.name}</h4><span className="role">{p.role}</span>
              </div>
            ))}
          </div>
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap">
          <div className="sec-head"><div className="sec-tag">Questions</div><h2>Frequently asked.</h2></div>
          <Faq items={faqs} />
        </div></section>

        <section style={{ paddingTop: 0 }}><div className="wrap closer">
          <div className="box">
            <h2>Come build with us.</h2>
            <p>Membership is free and open to every major. Join the Discord and introduce yourself — we're glad you're here.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Join the Discord <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { About });
})();
