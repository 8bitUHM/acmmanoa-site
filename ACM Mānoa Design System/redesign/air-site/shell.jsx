/* ACM Mānoa Air site — shell: icons, nav, footer, router helpers */
(function () {
  const ARR = 'M5 12h14M13 6l6 6-6 6';
  function Ic({ d, s = 24, w = 1.7 }) {
    return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
  }
  // brand/social glyphs (filled)
  const SOC = {
    discord: 'M16.9 1.6a16 16 0 0 0-4-1.3 11 11 0 0 0-.5 1.1 15 15 0 0 0-4.5 0A11 11 0 0 0 7.3.3a16 16 0 0 0-4.1 1.3A17 17 0 0 0 .2 13.2a16 16 0 0 0 5 2.5c.4-.5.7-1.1 1-1.7a10 10 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 10.1 0l.4.3c-.5.3-1 .6-1.7.8.3.6.7 1.2 1 1.7a16 16 0 0 0 5-2.5A17 17 0 0 0 16.9 1.6ZM6.7 10.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z',
    instagram: 'M12 2.2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6Zm0 10.5A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1Zm6.4-10.9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z',
    github: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z',
    linkedin: 'M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.05c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z',
  };
  function Soc({ type, s = 16 }) {
    return <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d={SOC[type]} /></svg>;
  }

  const LOGO = '../../assets/acm_logo.png';
  const go = (route) => { window.location.hash = route; };
  function nav(e, route) { e.preventDefault(); go(route); }

  function Nav({ route }) {
    const links = [
      { l: 'About', r: '#/about' },
      { l: 'Programs', r: '#/programs' },
      { l: 'Events', r: '#/events' },
      { l: 'Sponsors', r: '#/sponsors' },
    ];
    const base = route.split('/')[1] || '';
    return (
      <nav><div className="wrap-wide nav-in">
        <a className="brand" href="#/" onClick={(e) => nav(e, '#/')}><img src={LOGO} alt="" />ACM <span className="sep">· Mānoa</span></a>
        <div className="nav-links">
          {links.map((x) => (
            <a key={x.r} href={x.r} onClick={(e) => nav(e, x.r)} className={base && x.r.includes(base) ? 'active' : ''}>{x.l}</a>
          ))}
          <a className="btn btn-primary" href="#/" onClick={(e) => nav(e, '#/')} style={{ marginLeft: '8px' }}>Join us</a>
        </div>
      </div></nav>
    );
  }

  function Footer() {
    const col = (h, items) => (
      <div className="foot-col"><h5>{h}</h5>{items.map((it) => <a key={it[0]} href={it[1]} onClick={(e) => it[1].startsWith('#/') ? nav(e, it[1]) : null}>{it[0]}</a>)}</div>
    );
    return (
      <footer><div className="wrap-wide">
        <div className="foot-grid">
          <div className="foot-brand"><a className="brand" href="#/" onClick={(e) => nav(e, '#/')}><img src={LOGO} alt="" />ACM <span className="sep">· Mānoa</span></a>
            <p>Association for Computing Machinery at the University of Hawaiʻi at Mānoa. Built by students, for students.</p></div>
          {col('Explore', [['About', '#/about'], ['Programs', '#/programs'], ['Events', '#/events'], ['Sponsors', '#/sponsors']])}
          {col('Connect', [['Discord', '#'], ['Instagram', '#'], ['LinkedIn', '#'], ['Email', '#']])}
          {col('Resources', [['ICSpace', '#/icspace'], ['GitHub', '#'], ['ACM Intl.', '#']])}
        </div>
        <div className="foot-bottom"><span>© 2026 ACM at UH Mānoa</span><span>Made with aloha 🤙</span></div>
      </div></footer>
    );
  }

  window.AirShell = { Ic, Soc, Nav, Footer, ARR, LOGO, go, nav };
})();
