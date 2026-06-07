import React from 'react';

/**
 * Tinted pill / badge. The site uses these for role labels
 * (blue-50 background, blue-600 text) and status chips.
 */
export function Badge({ children, variant = 'brand', style = {}, ...rest }) {
  const variants = {
    brand:   { background: 'var(--surface-pill)', color: 'var(--surface-pill-text)' },
    neutral: { background: 'var(--gray-100)', color: 'var(--gray-700)' },
    solid:   { background: 'var(--brand-primary)', color: 'var(--text-on-brand)' },
    outline: { background: 'transparent', color: 'var(--text-link)', boxShadow: 'inset 0 0 0 1.5px var(--blue-300)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1,
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
