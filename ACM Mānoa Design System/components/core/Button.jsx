import React from 'react';

/**
 * ACM Mānoa Button.
 * Variants: primary (solid blue), gradient (blue→purple signature),
 * secondary (outline), ghost (text). Sizes: sm, md, lg.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'right',
  disabled = false,
  as = 'button',
  href,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' },
    md: { padding: '0.75rem 1.5rem', fontSize: 'var(--text-base)' },
    lg: { padding: '1rem 2rem', fontSize: 'var(--text-lg)' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-semibold)',
    borderRadius: 'var(--radius-md)',
    border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all var(--duration-base) var(--ease-standard)`,
    textDecoration: 'none',
    lineHeight: 1.2,
    ...sizes[size],
  };

  const variants = {
    primary: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-lg)',
    },
    gradient: {
      background: 'var(--gradient-brand)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-lg)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-body)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-link)',
      boxShadow: 'none',
    },
  };

  const hoverIn = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.transform = 'translateY(-1px)';
    if (variant === 'primary') el.style.background = 'var(--brand-primary-hover)';
    if (variant === 'gradient') el.style.background = 'var(--gradient-brand-hover)';
    if (variant === 'primary' || variant === 'gradient') el.style.boxShadow = 'var(--shadow-xl)';
    if (variant === 'secondary') { el.style.borderColor = 'var(--brand-primary)'; el.style.color = 'var(--brand-primary)'; }
    if (variant === 'ghost') el.style.color = 'var(--brand-primary-hover)';
  };
  const hoverOut = (e) => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0)';
    Object.assign(el.style, {
      background: variants[variant].background,
      color: variants[variant].color,
      borderColor: variants[variant].borderColor || 'transparent',
      boxShadow: variants[variant].boxShadow || 'none',
    });
  };

  const Tag = href ? 'a' : as;
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </Tag>
  );
}
