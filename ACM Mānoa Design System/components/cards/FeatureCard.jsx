import React from 'react';

/**
 * Feature / SIG card — the program tiles on the home page.
 * Square logo on a soft tinted plate, title, blurb, and a full-width
 * gradient "Learn More" action. Lifts on hover.
 */
export function FeatureCard({
  logo,
  title,
  description,
  actionLabel = 'Learn More',
  href = '#',
  accentColor,
  style = {},
  ...rest
}) {
  const Arrow = (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '0.5rem' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
  return (
    <a
      href={href}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(var(--lift-lg))';
        e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        transition: `all var(--duration-slow) var(--ease-standard)`,
        ...style,
      }}
      {...rest}
    >
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '6rem', height: '6rem', margin: '0 auto 1.5rem' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(to bottom right, var(--blue-50), var(--indigo-50))',
              boxShadow: 'var(--shadow-lg)',
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 'var(--radius-lg)',
              border: `4px solid ${accentColor || 'var(--white)'}`,
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--white)',
            }}
          >
            {typeof logo === 'string'
              ? <img src={logo} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : logo}
          </div>
        </div>
        <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '1rem' }}>
          {title}
        </h3>
        {description && (
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
            {description}
          </p>
        )}
      </div>
      <div style={{ marginTop: 'auto', padding: '0 2rem 2rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0.75rem 1.5rem',
            background: 'var(--gradient-brand)',
            color: 'var(--text-on-brand)',
            fontWeight: 'var(--fw-semibold)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {actionLabel}{Arrow}
        </span>
      </div>
    </a>
  );
}
