/* ACM Mānoa website UI kit — About page content */
(function () {
  const LEADERS = [
    { name: 'Kai Nakamura', role: 'President' },
    { name: 'Leilani Cruz', role: 'Vice President' },
    { name: 'Marcus Lee', role: 'Treasurer' },
    { name: 'Hana Watanabe', role: 'Secretary' },
  ];

  function PageHero({ title, subtitle }) {
    return (
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)', padding: '5rem 1.5rem', borderBottom: '4px solid transparent', borderImage: 'var(--gradient-accent-bar) 1' }}>
        <div className="acm-blob" style={{ position: 'absolute', width: '20rem', height: '20rem', background: 'var(--blue-300)', opacity: 0.4, top: '3rem', left: '4rem' }} />
        <div className="acm-blob" style={{ position: 'absolute', width: '20rem', height: '20rem', background: 'var(--purple-300)', opacity: 0.4, top: '5rem', right: '4rem', animationDelay: '2s' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--container-max)', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, var(--text-7xl))', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-tight)', marginBottom: '1.5rem' }}>{title}</h1>
          <p style={{ fontSize: 'var(--text-2xl)', color: 'var(--text-body)', maxWidth: '52rem', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>{subtitle}</p>
        </div>
      </section>
    );
  }

  function ProsePanel({ children }) {
    return (
      <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-card)', padding: '3rem' }}>
        <div style={{ maxWidth: 'var(--container-prose)', margin: '0 auto', fontSize: 'var(--text-lg)', color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {children}
        </div>
      </div>
    );
  }

  function About() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return (
      <main>
        <PageHero title="About ACM Mānoa" subtitle="The largest computer science student organization at the University of Hawaiʻi at Mānoa" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          <section>
            <div style={{ marginBottom: '3rem' }}><DS.SectionHeader title="Overview" /></div>
            <ProsePanel>
              <p>The Association for Computing Machinery at UH Mānoa (ACM Mānoa) is the largest computer science student organization at the University of Hawaiʻi at Mānoa. As an official student chapter of the international ACM and a Registered Independent Organization, ACM Mānoa welcomes students of all backgrounds and experience levels who share a passion for computing.</p>
              <p>A core feature of ACM Mānoa's structure is its Special Interest Groups (SIGs), which empower members to lead initiatives based on their specific interests — enriching the overall experience and ensuring the organization grows alongside its members.</p>
            </ProsePanel>
          </section>

          <section>
            <div style={{ marginBottom: '3rem' }}><DS.SectionHeader title="Leadership Team" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
              {LEADERS.map((l) => <DS.ProfileCard key={l.name} name={l.name} role={l.role} avatar="../../assets/default_user.svg" />)}
            </div>
          </section>

          <section>
            <div style={{ marginBottom: '3rem' }}><DS.SectionHeader title="Mission" accent="Statement" /></div>
            <ProsePanel>
              <p>ACM Mānoa exists to bridge the gap between students and Hawaiʻi's growing IT industry by fostering a supportive and dynamic environment for aspiring computing professionals. Guided by its vision to empower every UH Mānoa Information &amp; Computer Science graduate to thrive locally, the organization is committed to three core goals: social, professional, and technical enrichment.</p>
            </ProsePanel>
          </section>
        </div>
      </main>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { About });
})();
