/* ACM Mānoa Air site — Sponsors (logo-forward) */
(function () {
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  function Sponsors() {
    const { Ic, Nav, Footer, ARR, nav } = window.AirShell;
    const sponsors = [
      { name: 'Hawaiian Telcom', website: '#' },
      { name: 'DevLeague', website: '#' },
      { name: 'Central Pacific Bank', website: '#' },
      { name: 'Hawaiʻi Technology', website: '#' },
      { name: 'Oceanit', website: '#' },
      { name: 'ICS Department', website: '#' },
      { name: 'Sudo Mekaki', website: '#' },
      { name: 'Local Kine Labs', website: '#' },
      { name: 'PACE', website: '#' },
    ];

    return (
      <div className="air">
        <Nav route="#/sponsors" />
        <header className="subhero"><div className="wrap">
          <div className="eyebrow">Sponsors</div>
          <h1>Powered by partners.</h1>
          <p>Mahalo nui loa to the companies and organizations that fund the workshops, hackathons, and pizza keeping ACM Mānoa running — and connect students to Hawaiʻi’s tech industry.</p>
        </div></header>

        <section style={{ paddingTop: '20px' }}><div className="wrap-wide">
          <div className="spon-head">
            <span className="tname">Our partners</span>
            <span className="pill">Mahalo to all of you</span>
            <span className="rule" />
          </div>
          <div className="spon-grid t-one">
            {sponsors.map((sp) => {
              const id = 'spon-' + slugify(sp.name);
              return (
                <a className="spon solo" key={id} href={sp.website} onClick={(e) => sp.website === '#' && e.preventDefault()}>
                  <div className="shot">
                    <image-slot id={id} shape="rect" fit="contain" placeholder={'Drop ' + sp.name + ' logo'}></image-slot>
                  </div>
                  <div className="info">
                    <h4>{sp.name}</h4>
                    <span className="visit">Visit website <Ic d={ARR} s={16} /></span>
                  </div>
                </a>
              );
            })}
          </div>
        </div></section>

        <section style={{ paddingTop: '64px' }}><div className="wrap closer">
          <div className="box">
            <h2>Become a sponsor.</h2>
            <p>Reach 500+ motivated computing students at UH Mānoa. We’ll tailor a partnership to your goals — recruiting, workshops, or hackathon prizes — and feature your logo right here.</p>
            <a className="btn btn-white btn-lg" href="#/" onClick={(e) => nav(e, '#/')}>Get in touch <Ic d={ARR} /></a>
          </div>
        </div></section>

        <Footer />
      </div>
    );
  }
  window.AirPages = Object.assign(window.AirPages || {}, { Sponsors });
})();
