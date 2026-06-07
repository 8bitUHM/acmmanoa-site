/* ACM Mānoa website UI kit — Events section (upcoming list + featured gallery) */
(function () {
  const UPCOMING = [
    { day: '14', month: 'FEB', title: 'Intro to Git & GitHub Workshop', description: 'A beginner-friendly walkthrough of version control and collaboration.', dateLabel: 'February 14, 2025', time: '5:00 PM', location: 'POST 318B' },
    { day: '28', month: 'FEB', title: 'Resume & LinkedIn Night', description: 'Get your resume reviewed by industry mentors and ACM alumni.', dateLabel: 'February 28, 2025', time: '6:00 PM', location: 'iLab, POST' },
    { day: '08', month: 'MAR', title: 'Spring Hackathon Kickoff', description: '24 hours of building, mentoring, food, and prizes. All majors welcome.', dateLabel: 'March 8, 2025', time: '9:00 AM', location: 'Campus Center' },
  ];

  function Events() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return (
      <section id="events" style={{ padding: '5rem 1.5rem', background: 'linear-gradient(to bottom right, var(--gray-50), var(--blue-50))' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <DS.SectionHeader title="Events &" accent="Gallery" subtitle="Discover our upcoming events and recent community activities that make our organization vibrant." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '1rem' }}>Upcoming Events</h3>
              <div className="acm-divider" style={{ marginBottom: '2rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {UPCOMING.map((e) => <DS.EventCard key={e.title} layout="compact" date={{ day: e.day, month: e.month }} {...e} />)}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '1rem' }}>Featured</h3>
              <div className="acm-divider" style={{ marginBottom: '2rem' }} />
              <DS.EventCard layout="media" title="2024 Fall Showcase" description="SIGs demo their semester projects to peers, faculty, and local tech companies." dateLabel="December 6, 2024" location="Campus Center Ballroom" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { Events });
})();
