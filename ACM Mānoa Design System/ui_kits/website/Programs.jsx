/* ACM Mānoa website UI kit — Programs (SIGs) section */
(function () {
  const SIGS = [
    { name: 'SIG-AI', color: '#9333ea', about: 'Hands-on machine learning projects, paper readings, and friendly Kaggle competitions for every skill level.' },
    { name: 'SIG-Web', color: '#2563eb', about: 'Build and ship real web apps with modern frameworks alongside a supportive crew of builders.' },
    { name: 'SIG-Game', color: '#db2777', about: 'Design and prototype games — from pixel art and sound to engines and game jams.' },
    { name: 'SIG-Security', color: '#4f46e5', about: 'Capture-the-flag practice, ethical hacking workshops, and a path into cybersecurity.' },
    { name: 'SIG-Robotics', color: '#0891b2', about: 'Embedded systems, sensors, and autonomous builds for the curious tinkerer.' },
    { name: 'SIG-Data', color: '#7e22ce', about: 'Data wrangling, visualization, and analytics projects with real Hawaiʻi datasets.' },
  ];

  function Programs() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return (
      <section id="programs" style={{ padding: '5rem 1.5rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <DS.SectionHeader title="Our" accent="Programs" subtitle="Discover our diverse range of Special Interest Groups, each focused on cutting-edge areas of computing and technology." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {SIGS.map((s) => (
              <DS.FeatureCard key={s.name} logo="../../assets/acm_logo.png" title={s.name} description={s.about} accentColor={s.color} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { Programs });
})();
