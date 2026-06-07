/* ACM Mānoa website UI kit — Hero section */
(function () {
  const { useEffect, useRef } = React;

  function Blob({ color, style }) {
    return <div className="acm-blob" style={{ position: 'absolute', width: '20rem', height: '20rem', background: color, opacity: 0.4, ...style }} />;
  }

  function Hero() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    const Arrow = <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>;
    const Video = <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>;

    return (
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)', padding: '5rem 1.5rem 6rem' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Blob color="var(--blue-300)" style={{ top: '4rem', left: '3rem' }} />
          <Blob color="var(--purple-300)" style={{ top: '8rem', right: '3rem', animationDelay: '2s' }} />
          <Blob color="var(--pink-300)" style={{ bottom: '-2rem', left: '6rem', animationDelay: '4s' }} />
          <Blob color="var(--indigo-300)" style={{ top: '12rem', left: '50%', width: '18rem', height: '18rem', animationDelay: '1s' }} />
          <Blob color="var(--cyan-300)" style={{ bottom: '4rem', right: '20%', width: '16rem', height: '16rem', opacity: 0.35, animationDelay: '3s' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 'var(--container-max)', margin: '0 auto', textAlign: 'center' }}>
          <img src="../../assets/acm_logo.png" alt="ACM Logo" style={{ width: '11rem', height: '11rem', margin: '0 auto 1.5rem', filter: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.15))' }} />
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, var(--text-7xl))', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', marginBottom: '1.5rem' }}>
            Welcome to<br /><span className="acm-gradient-text">ACM at UH Mānoa</span>
          </h1>
          <p style={{ fontSize: 'var(--text-2xl)', color: 'var(--text-body)', maxWidth: '48rem', margin: '0 auto 2rem', lineHeight: 'var(--leading-relaxed)' }}>
            The Association for Computing Machinery at the University of Hawaiʻi at Mānoa
          </p>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            Empowering students through technology, innovation, and community. Join us in shaping the future of computing.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <DS.Button variant="gradient" size="lg" icon={Arrow} href="#programs">Explore Programs</DS.Button>
            <DS.Button variant="secondary" size="lg" icon={Video} href="#events">View Events</DS.Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '56rem', margin: '0 auto' }}>
            <DS.StatCard value="7+" label="Special Interest Groups" color="var(--blue-600)" />
            <DS.StatCard value="500+" label="Active Members" color="var(--purple-600)" />
            <DS.StatCard value="50+" label="Events Annually" color="var(--indigo-600)" />
          </div>
        </div>
      </section>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { Hero });
})();
