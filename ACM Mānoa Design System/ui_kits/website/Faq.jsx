/* ACM Mānoa website UI kit — FAQ section */
(function () {
  const FAQ = [
    { question: 'How do I join ACM Mānoa?', answer: 'Membership is free and open to all students. Hop into our Discord, follow us on Instagram, and come to any event — no application needed.' },
    { question: 'Do I need prior coding experience?', answer: 'Not at all. Our Special Interest Groups welcome complete beginners alongside seasoned builders. You will find mentors and project partners at every level.' },
    { question: 'What are SIGs?', answer: 'Special Interest Groups are student-led communities focused on specific areas — AI, web, games, cybersecurity, robotics, and data. Each runs its own workshops and projects.' },
    { question: 'Do I have to be a CS major?', answer: 'Nope! We welcome students from every major who share a passion for computing and technology.' },
  ];

  function Faq() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return (
      <section id="faq" style={{ padding: '5rem 1.5rem', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-prose)', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <DS.SectionHeader title="Frequently Asked" accent="Questions" subtitle="Find answers to common questions about ACM and our activities." />
          </div>
          <DS.Accordion defaultOpen={0} items={FAQ} />
        </div>
      </section>
    );
  }

  window.ACMKit = Object.assign(window.ACMKit || {}, { Faq });
})();
