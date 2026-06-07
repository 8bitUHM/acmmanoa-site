/* ACM Mānoa website UI kit — interactive app shell */
(function () {
  const { useState } = React;

  function App() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    const { Hero, Programs, Events, Faq, About } = window.ACMKit;
    const [page, setPage] = useState('home');

    const NAV_LINKS = [
      { label: 'About', href: 'about' },
      { label: 'Events', href: 'events' },
      { label: 'Sponsors', href: 'sponsors' },
      { label: 'ICSpace', href: 'icspace' },
      { label: 'SIGS', href: 'sigs' },
    ];

    // Intercept nav clicks for fake routing between Home and About.
    const onNav = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href === 'about') { e.preventDefault(); setPage('about'); window.scrollTo({ top: 0 }); }
      else if (href === 'sigs' || href === 'events') { /* let in-page anchors work on home */
        if (page !== 'home') { e.preventDefault(); setPage('home'); }
      }
    };

    const goHome = (e) => { e.preventDefault(); setPage('home'); window.scrollTo({ top: 0 }); };

    return (
      <div onClickCapture={onNav}>
        <div onClick={(e) => { if (e.target.closest('a')?.getAttribute('href') === '/') goHome(e); }}>
          <DS.NavBar
            logo="../../assets/acm_logo.png"
            links={NAV_LINKS}
            activeHref={page === 'about' ? 'about' : undefined}
          />
        </div>
        {page === 'home' ? (
          <>
            <Hero />
            <Programs />
            <Events />
            <Faq />
          </>
        ) : (
          <About />
        )}
        <DS.Footer
          logo="../../assets/acm_logo.png"
          socials={[
            { type: 'github', href: 'https://github.com/8bitUHM/acmmanoa-site' },
            { type: 'discord', href: '#' },
            { type: 'instagram', href: 'https://www.instagram.com/manoaacm/' },
            { type: 'linkedin', href: 'https://www.linkedin.com/company/acmanoa/' },
          ]}
        />
      </div>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { App });
})();
