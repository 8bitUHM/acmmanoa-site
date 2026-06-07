import React from 'react';

/**
 * Sticky top navigation. White, translucent, blurred, with a thin
 * animated gradient accent bar along the bottom edge. Logo + "at UH Mānoa"
 * wordmark on the left, link list on the right with an animated underline.
 */
export function NavBar({
  logo = 'assets/acm_logo.png',
  brand = 'at UH Mānoa',
  links = [
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'ICSpace', href: '/icspace' },
    { label: 'SIGS', href: '/sigs' },
  ],
  activeHref,
  style = {},
  ...rest
}) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--nav-height)' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src={logo} alt="ACM Logo" style={{ height: '3rem', width: 'auto', filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))' }} />
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{brand}</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {links.map((l) => {
              const active = l.href === activeHref;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--brand-primary)'; e.currentTarget.querySelector('span').style.width = '100%'; }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = 'var(--gray-700)'; e.currentTarget.querySelector('span').style.width = '0'; } }}
                  style={{
                    position: 'relative',
                    color: active ? 'var(--brand-primary)' : 'var(--gray-700)',
                    fontWeight: 'var(--fw-medium)',
                    textDecoration: 'none',
                    transition: `color var(--duration-base) var(--ease-standard)`,
                    paddingBottom: '0.25rem',
                  }}
                >
                  {l.label}
                  <span style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: active ? '100%' : '0', background: 'var(--brand-primary)', transition: `width var(--duration-base) var(--ease-standard)` }} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {/* animated gradient accent bar */}
      <div style={{ height: '4px', background: 'var(--gradient-accent-bar)' }} />
    </nav>
  );
}
