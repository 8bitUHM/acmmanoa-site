import React from 'react';

const SOCIAL_ICONS = {
  github: 'M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z',
  discord: 'M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

/**
 * Dark gradient site footer: brand blurb, four link columns, divider,
 * copyright line, and social icons. Mirrors the live ACM Mānoa footer.
 */
export function Footer({
  logo = 'assets/acm_logo.png',
  blurb = 'Empowering students through technology, innovation, and community. Join us in shaping the future of computing at the University of Hawaii at Mānoa.',
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  year = new Date().getFullYear(),
  style = {},
  ...rest
}) {
  const linkHover = (e, on) => { e.currentTarget.style.color = on ? 'var(--footer-link-hover)' : 'var(--footer-text)'; };
  return (
    <footer style={{ background: 'var(--gradient-footer)', ...style }} {...rest}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ maxWidth: '28rem' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <img src={logo} alt="ACM Logo" style={{ height: '2.5rem' }} />
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--white)' }}>ACM at UH Mānoa</span>
            </a>
            <p style={{ color: 'var(--footer-text)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>{blurb}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '2rem' }}>
            {columns.map((col) => (
              <div key={col.title}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--white)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>{col.title}</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} onMouseEnter={(e) => linkHover(e, true)} onMouseLeave={(e) => linkHover(e, false)} style={{ color: 'var(--footer-text)', fontWeight: 'var(--fw-medium)', textDecoration: 'none', transition: `color var(--duration-base) var(--ease-standard)` }}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr style={{ margin: '2rem 0', border: 0, borderTop: '1px solid var(--gray-700)' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--footer-text)' }}>
            © {year} <a href="/" style={{ color: 'var(--footer-text)' }}>ACM at UH Mānoa</a>
            <span style={{ color: 'var(--gray-400)', marginLeft: '0.5rem', paddingLeft: '0.5rem', borderLeft: '1px solid var(--gray-700)' }}>Built with ♥ by 8bitUHM</span>
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socials.map((s) => (
              <a key={s.type} href={s.href} target="_blank" rel="noreferrer"
                 onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--white)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gray-400)'; }}
                 style={{ color: 'var(--gray-400)', transition: `color var(--duration-base) var(--ease-standard)`, display: 'inline-flex' }}>
                <svg width="20" height="20" fill="currentColor" viewBox={s.type === 'discord' ? '0 0 21 16' : s.type === 'github' ? '0 0 20 20' : '0 0 24 24'}>
                  <path fillRule="evenodd" clipRule="evenodd" d={SOCIAL_ICONS[s.type]} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const DEFAULT_COLUMNS = [
  { title: 'Quick Links', links: [{ label: 'About', href: '/about' }, { label: 'Events', href: '/events' }, { label: 'SIGs', href: '/sigs' }, { label: 'Sponsors', href: '/sponsors' }] },
  { title: 'Connect', links: [{ label: 'Discord', href: '#' }, { label: 'Instagram', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Email Us', href: '#' }] },
  { title: 'Resources', links: [{ label: 'ICSpace', href: '/icspace' }, { label: 'GitHub', href: '#' }, { label: 'ACM International', href: '#' }, { label: 'ICS Department', href: '#' }] },
];

const DEFAULT_SOCIALS = [
  { type: 'github', href: '#' },
  { type: 'discord', href: '#' },
  { type: 'instagram', href: '#' },
  { type: 'linkedin', href: '#' },
];
