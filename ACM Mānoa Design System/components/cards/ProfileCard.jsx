import React from 'react';

/**
 * Profile card — leadership & faculty grid. Circular avatar with a white
 * ring, name, a brand role pill, and optional bio. Avatar scales on hover,
 * name shifts to brand blue.
 */
export function ProfileCard({
  name,
  role,
  bio,
  avatar = 'default_user.svg',
  style = {},
  ...rest
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(var(--lift-md))';
        e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
        const h = e.currentTarget.querySelector('h3');
        if (h) h.style.color = 'var(--brand-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
        const h = e.currentTarget.querySelector('h3');
        if (h) h.style.color = 'var(--text-strong)';
      }}
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2rem',
        textAlign: 'center',
        transition: `all var(--duration-base) var(--ease-standard)`,
        ...style,
      }}
      {...rest}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <img
          src={avatar}
          alt={name}
          style={{
            width: '8rem',
            height: '8rem',
            borderRadius: 'var(--radius-full)',
            objectFit: 'cover',
            margin: '0 auto',
            border: '4px solid var(--white)',
            boxShadow: 'var(--shadow-lg)',
            transition: `transform var(--duration-base) var(--ease-standard)`,
          }}
        />
      </div>
      <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '0.75rem', transition: `color var(--duration-base) var(--ease-standard)` }}>
        {name}
      </h3>
      {role && (
        <span style={{ display: 'inline-block', fontSize: 'var(--text-base)', color: 'var(--surface-pill-text)', fontWeight: 'var(--fw-semibold)', background: 'var(--surface-pill)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: bio ? '0.75rem' : 0 }}>
          {role}
        </span>
      )}
      {bio && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)', margin: '0.75rem 0 0' }}>{bio}</p>}
    </div>
  );
}
