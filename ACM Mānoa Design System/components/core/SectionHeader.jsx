import React from 'react';

/**
 * Centered section header: title with an optional gradient accent word,
 * the signature gradient divider, and an optional subtitle.
 * Pass the accent word via `accent` — it renders in the brand gradient.
 */
export function SectionHeader({ title, accent, subtitle, align = 'center', style = {}, ...rest }) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? 'var(--container-prose)' : 'none',
        margin: align === 'center' ? '0 auto' : 0,
        ...style,
      }}
      {...rest}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--fw-bold)',
          fontSize: 'var(--text-5xl)',
          color: 'var(--text-strong)',
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: '1rem',
        }}
      >
        {title}{' '}
        {accent && <span className="acm-gradient-text">{accent}</span>}
      </h2>
      <div
        className="acm-divider"
        style={{ margin: align === 'center' ? '0 auto' : 0 }}
      />
      {subtitle && (
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-body)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
