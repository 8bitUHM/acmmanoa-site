import React from 'react';

/**
 * Event card. Two layouts:
 *  - "compact" (default): square gradient date badge + title + meta rows,
 *    as seen in the home "Upcoming Events" list.
 *  - "media": top image (or gradient placeholder) + body + "View Details" pill,
 *    as seen on the Events index grid.
 */
export function EventCard({
  title,
  description,
  date,        // { day, month } for compact, or a string for media
  dateLabel,   // full date string for meta row
  time,
  location,
  image,
  layout = 'compact',
  href = '#',
  style = {},
  ...rest
}) {
  const CalIcon = (
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem', color: 'var(--blue-500)', flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
  const PinIcon = (
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem', color: 'var(--blue-500)', flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const lift = (e, on) => {
    e.currentTarget.style.transform = on ? 'translateY(var(--lift-md))' : 'translateY(0)';
    e.currentTarget.style.boxShadow = on ? 'var(--shadow-2xl)' : 'var(--shadow-lg)';
  };

  const cardBase = {
    display: 'block',
    textDecoration: 'none',
    background: 'var(--surface-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-card)',
    boxShadow: 'var(--shadow-lg)',
    transition: `all var(--duration-base) var(--ease-standard)`,
    overflow: 'hidden',
    ...style,
  };

  if (layout === 'media') {
    return (
      <a href={href} onMouseEnter={(e) => lift(e, true)} onMouseLeave={(e) => lift(e, false)} style={{ ...cardBase, display: 'flex', flexDirection: 'column' }} {...rest}>
        {image
          ? <img src={image} alt={title} style={{ width: '100%', height: '16rem', objectFit: 'cover' }} />
          : <div style={{ height: '16rem', background: 'linear-gradient(to bottom right, var(--blue-100), var(--indigo-100, #e0e7ff))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="64" height="64" fill="none" stroke="var(--blue-400)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '1rem' }}>{title}</h3>
          {description && <p style={{ color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)', marginBottom: '1.5rem' }}>{description}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {dateLabel && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-700)', fontWeight: 'var(--fw-semibold)' }}>{CalIcon}{dateLabel}{time ? ` at ${time}` : ''}</div>}
            {location && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-700)', fontWeight: 'var(--fw-semibold)' }}>{PinIcon}{location}</div>}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-card)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', background: 'var(--surface-pill)', color: 'var(--surface-pill-text)', fontWeight: 'var(--fw-semibold)', borderRadius: 'var(--radius-full)' }}>View Details</span>
          </div>
        </div>
      </a>
    );
  }

  // compact
  return (
    <a href={href} onMouseEnter={(e) => lift(e, true)} onMouseLeave={(e) => lift(e, false)} style={{ ...cardBase, padding: '1.5rem' }} {...rest}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-lg)' }}>
            {date?.day}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--fw-medium)', marginTop: '0.25rem' }}>{date?.month}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', marginBottom: '0.5rem' }}>{title}</h4>
          {description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', marginBottom: '0.75rem' }}>{description}</p>}
          {(dateLabel || time) && <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: location ? '0.5rem' : '0.75rem' }}>{CalIcon}{dateLabel}{time ? ` at ${time}` : ''}</div>}
          {location && <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{PinIcon}{location}</div>}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-link)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--text-sm)' }}>
            Learn More
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </a>
  );
}
