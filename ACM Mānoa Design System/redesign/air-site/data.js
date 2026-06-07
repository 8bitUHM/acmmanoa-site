/* ACM Mānoa — site data (mirrors the Django models: SIGS, SIGSLeadership,
   Event, Leadership, FAQ, Sponsor). Representative content for the prototype;
   swap in the real DB values freely. */
(function () {
  // --- color helpers, matching SIGS.get_secondary_color / get_light_color ---
  const hx = (h) => h.replace('#', '');
  const rgb = (h) => [0, 2, 4].map((i) => parseInt(hx(h).slice(i, i + 2), 16));
  const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const secondary = (h) => { const [r, g, b] = rgb(h); return toHex(r * 0.8, g * 0.8, b * 0.8); };
  const light = (h) => { const [r, g, b] = rgb(h); return toHex(255 * 0.9 + r * 0.1, 255 * 0.9 + g * 0.1, 255 * 0.9 + b * 0.1); };
  // CSS-variable bundle to theme any subtree by a SIG's brand color
  const themeVars = (h) => ({ '--sig': h, '--sig-d': secondary(h), '--sig-light': light(h) });

  // icon paths (stroke, 24x24)
  const I = {
    ai: 'M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z',
    web: 'M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z',
    security: 'M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z',
    gamedev: 'M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z',
    robotics: 'M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01',
    data: 'M3 3v18h18M8 16V9M13 16V5M18 16v-4',
    cp: 'M8 6l-6 6 6 6M16 6l6 6-6 6',
  };

  const sigs = [
    {
      slug: 'ai', name: 'SIG-AI', full: 'Artificial Intelligence', color: '#7C3AED', icon: I.ai,
      tagline: 'Build models, read papers, and ship intelligent projects together.',
      about: [
        'SIG-AI is where curious students dive into machine learning — from your first linear regression to fine-tuning transformers. We balance hands-on projects with friendly paper-reading sessions so theory and practice grow together.',
        'No prior ML experience needed. Bring a laptop and a question, and we will point you at a project, a teammate, and a mentor who has been exactly where you are.',
      ],
      meeting: { days: 'Wednesdays', time: '5:00 – 6:30 PM', location: 'POST 318B' },
      links: { discord: '#', instagram: '#', github: '#', website: '#', link_name: 'Project gallery' },
      leadership: [
        { name: 'Kai Nakamura', role: 'SIG Lead' },
        { name: 'Mei Tanaka', role: 'Projects' },
        { name: 'Dev Patel', role: 'Workshops' },
      ],
    },
    {
      slug: 'web', name: 'SIG-Web', full: 'Web Development', color: '#2563EB', icon: I.web,
      tagline: 'Design and launch real web apps with modern frameworks.',
      about: [
        'SIG-Web ships things. We build and deploy real applications — portfolios, club tools, hackathon projects — using the same modern stacks teams use in industry.',
        'Whether you are writing your first HTML tag or architecting a full-stack app, you will find a project to contribute to and people happy to pair with you.',
      ],
      meeting: { days: 'Mondays', time: '6:00 – 7:30 PM', location: 'POST 319' },
      links: { discord: '#', instagram: '#', github: '#', website: '#', link_name: 'Visit site' },
      leadership: [
        { name: 'Leilani Cruz', role: 'SIG Lead' },
        { name: 'Marcus Lee', role: 'Frontend' },
      ],
    },
    {
      slug: 'security', name: 'SIG-Security', full: 'Cybersecurity', color: '#E11D48', icon: I.security,
      tagline: 'Capture-the-flag practice and ethical hacking, beginner to bounty.',
      about: [
        'SIG-Security runs weekly capture-the-flag practice and hands-on workshops in web exploitation, reverse engineering, cryptography, and defense. We compete as a team in national CTFs each semester.',
        'Total beginners welcome — we keep a beginner track running alongside the advanced challenges so everyone has something to chew on.',
      ],
      meeting: { days: 'Thursdays', time: '5:30 – 7:00 PM', location: 'Keller 102' },
      links: { discord: '#', instagram: '#', github: '#', website: '', link_name: '' },
      leadership: [
        { name: 'Hana Watanabe', role: 'SIG Lead' },
        { name: 'Theo Garcia', role: 'CTF Captain' },
      ],
    },
    {
      slug: 'gamedev', name: 'SIG-GameDev', full: 'Game Development', color: '#DB2777', icon: I.gamedev,
      tagline: 'From pixel art to engines — prototype, jam, and play your own games.',
      about: [
        'SIG-GameDev brings together artists, designers, and programmers to make games. We host semester-long projects and weekend game jams, then show everything off at our end-of-term arcade night.',
        'Every discipline is welcome — if you want to draw, compose, write, or code, there is a seat at the table.',
      ],
      meeting: { days: 'Fridays', time: '4:00 – 6:00 PM', location: 'POST 318B' },
      links: { discord: '#', instagram: '#', github: '', website: '#', link_name: 'Itch.io page' },
      leadership: [
        { name: 'Sora Kim', role: 'SIG Lead' },
        { name: 'Bella Rivera', role: 'Art Director' },
      ],
    },
    {
      slug: 'robotics', name: 'SIG-Robotics', full: 'Robotics', color: '#EA580C', icon: I.robotics,
      tagline: 'Sensors, embedded systems, and autonomous builds for tinkerers.',
      about: [
        'SIG-Robotics is hands-on hardware. We build robots from the ground up — wiring sensors, flashing microcontrollers, and writing the control loops that make them move.',
        'We partner with campus labs and compete in regional challenges. Come solder something.',
      ],
      meeting: { days: 'Tuesdays', time: '5:00 – 7:00 PM', location: 'Holmes Hall 240' },
      links: { discord: '#', instagram: '', github: '#', website: '', link_name: '' },
      leadership: [
        { name: 'Noa Fischer', role: 'SIG Lead' },
        { name: 'Priya Anand', role: 'Hardware' },
      ],
    },
    {
      slug: 'data', name: 'SIG-Data', full: 'Data Science', color: '#0D9488', icon: I.data,
      tagline: 'Wrangle, visualize, and learn from real Hawaiʻi datasets.',
      about: [
        'SIG-Data turns messy, real-world data into honest stories. We work with local Hawaiʻi datasets — ocean, climate, transit, campus — to practice the full pipeline from cleaning to visualization.',
        'Bring your curiosity about a question that matters to the islands, and we will help you answer it with data.',
      ],
      meeting: { days: 'Wednesdays', time: '4:00 – 5:30 PM', location: 'Hamilton Library 305' },
      links: { discord: '#', instagram: '#', github: '#', website: '#', link_name: 'Notebooks' },
      leadership: [
        { name: 'Iris Wong', role: 'SIG Lead' },
        { name: 'Sam Okafor', role: 'Workshops' },
      ],
    },
    {
      slug: 'cp', name: 'SIG-CP', full: 'Competitive Programming', color: '#16A34A', icon: I.cp,
      tagline: 'Sharpen algorithms and compete in ICPC-style contests.',
      about: [
        'SIG-CP drills the algorithms and data structures that win contests — and ace interviews. We host weekly practice rounds and travel to ICPC regionals as a team.',
        'From your first "Hello, World" to your first AC on a hard problem, we level up together.',
      ],
      meeting: { days: 'Sundays', time: '2:00 – 4:00 PM', location: 'POST 319' },
      links: { discord: '#', instagram: '', github: '#', website: '', link_name: '' },
      leadership: [
        { name: 'Ravi Shah', role: 'SIG Lead' },
        { name: 'Yuki Mori', role: 'Contests' },
      ],
    },
  ];

  const events = [
    { slug: 'fall-welcome-mixer', title: 'Fall Welcome Mixer', date: '2026-09-03', time: '5:00 PM', kind: 'Social', location: 'Campus Center Courtyard', sig: null, desc: 'Kick off the semester with food, games, and every SIG in one place. Meet the board, find your group, and sign up for what excites you.' },
    { slug: 'intro-git-github', title: 'Intro to Git & GitHub', date: '2026-09-12', time: '2:00 PM', kind: 'Workshop', location: 'POST 318B', sig: 'web', desc: 'A hands-on, beginner-friendly walkthrough of version control and collaboration — fork, branch, commit, and open your first pull request.' },
    { slug: 'resume-linkedin-night', title: 'Resume & LinkedIn Night', date: '2026-09-18', time: '6:00 PM', kind: 'Career', location: 'iLab, POST', sig: null, desc: 'Get your resume reviewed by industry mentors and ACM alumni, and polish your LinkedIn ahead of internship season.' },
    { slug: 'ai-paper-reading-kickoff', title: 'SIG-AI Paper Reading Kickoff', date: '2026-09-25', time: '5:00 PM', kind: 'Workshop', location: 'POST 318B', sig: 'ai', desc: 'We pick this semester’s papers and walk through how to actually read one. No ML background needed — just curiosity.' },
    { slug: 'fall-hackathon', title: 'Fall Hackathon', date: '2026-10-03', time: '9:00 AM', kind: 'Flagship', location: 'Campus Center', sig: null, desc: 'Forty-eight hours of building, mentoring, food, and prizes. All majors welcome — come with an idea or find a team here.' },
    { slug: 'game-jam-weekend', title: 'Game Jam Weekend', date: '2026-10-10', time: '10:00 AM', kind: 'Jam', location: 'POST 318B', sig: 'gamedev', desc: 'One theme, one weekend, one playable game. Artists, designers, and programmers team up and ship something fun.' },
    { slug: 'tech-talk-islands', title: 'Tech Talk: Building for the Islands', date: '2026-10-16', time: '5:30 PM', kind: 'Talk', location: 'POST 127', sig: null, desc: 'A local engineer on shipping software that serves Hawaiʻi communities — and building a tech career without leaving the islands.' },
    { slug: 'data-viz-workshop', title: 'SIG-Data Visualization Workshop', date: '2026-10-24', time: '4:00 PM', kind: 'Workshop', location: 'Hamilton Library 305', sig: 'data', desc: 'Turn a messy local dataset into a clear, honest chart. Bring a laptop; we supply the data and the snacks.' },
    { slug: 'security-ctf-night', title: 'SIG-Security CTF Night', date: '2026-10-30', time: '5:30 PM', kind: 'Competition', location: 'Keller 102', sig: 'security', desc: 'A friendly capture-the-flag night with a beginner track running right alongside the harder challenges.' },
  ];

  const board = [
    { name: 'Kai Nakamura', role: 'President' },
    { name: 'Leilani Cruz', role: 'Vice President' },
    { name: 'Marcus Lee', role: 'Finance Director' },
    { name: 'Hana Watanabe', role: 'Operations Director' },
    { name: 'Sora Kim', role: 'Public Relations Director' },
    { name: 'Iris Wong', role: 'Webmaster' },
    { name: 'Noa Fischer', role: 'Director of Membership' },
    { name: 'Dr. A. Sato', role: 'Faculty Sponsor' },
  ];

  const faqs = [
    { q: 'How do I join ACM Mānoa?', a: 'Membership is free and open to all students. Hop into our Discord, follow us on Instagram, and come to any event — no application needed.' },
    { q: 'Do I need prior coding experience?', a: 'Not at all. Every SIG keeps a beginner track and welcomes complete newcomers alongside seasoned builders.' },
    { q: 'Do I have to be a CS major?', a: 'Nope! We welcome students from every major who share a passion for computing and technology.' },
    { q: 'Can I be in more than one SIG?', a: 'Absolutely — join as many as you have time for. Many members float between two or three.' },
  ];

  // --- date helpers for the events calendar ---
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONF = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DOWF = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const WD = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  // parse an event's 'YYYY-MM-DD' into display + index parts (local, no TZ drift)
  const edate = (iso) => {
    const [y, mo, da] = iso.split('-').map(Number);
    const dt = new Date(y, mo - 1, da);
    return { y, mo: mo - 1, da, wd: dt.getDay(), d: String(da).padStart(2, '0'), m: MON[mo - 1],
      day: DOWF[dt.getDay()], full: DOWF[dt.getDay()] + ', ' + MONF[mo - 1] + ' ' + da + ', ' + y };
  };
  // weekday index a SIG meets on, from meeting.days like 'Wednesdays'
  const meetWd = (s) => (s ? WD[s.replace(/s$/, '')] : null);

  window.ACMData = { sigs, events, board, faqs, secondary, light, themeVars, edate, meetWd, MON, MONF, DOWF };
})();
