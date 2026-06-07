import React from 'react';

/**
 * Stat card — the translucent metric tiles on the hero ("7+ Special
 * Interest Groups"). Big colored number over a soft white/blur surface.
 */
export function StatCard({ value, label, color = 'var(--blue-600)', glass = true, style = {}, ...rest }) {
  return (
    <div
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      style={{
        background: glass ? 'rgba(255,255,255,0.6)' : 'var(--surface-card)',
        backdropFilter: glass ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: glass ? 'blur(8px)' : 'none',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        transition: `box-shadow var(--duration-base) var(--ease-standard)`,
        ...style,
      }}
      {...rest}
    >
      <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', color, marginBottom: '0.5rem' }}>{value}</div>
      <div style={{ color: 'var(--text-body)', fontWeight: 'var(--fw-medium)' }}>{label}</div>
    </div>
  );
}
