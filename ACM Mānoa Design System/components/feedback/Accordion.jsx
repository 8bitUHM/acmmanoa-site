import React from 'react';

/**
 * FAQ accordion — the home-page "Frequently Asked Questions" list.
 * Each item is a rounded bordered card with a blue help-circle icon,
 * question text, and a chevron that rotates as the answer expands.
 * Single-open behavior by default.
 */
export function Accordion({ items = [], defaultOpen = -1, allowMultiple = false, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(
    allowMultiple ? (defaultOpen >= 0 ? [defaultOpen] : []) : defaultOpen
  );

  const isOpen = (i) => (allowMultiple ? open.includes(i) : open === i);
  const toggle = (i) => {
    if (allowMultiple) {
      setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    } else {
      setOpen((prev) => (prev === i ? -1 : i));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', ...style }} {...rest}>
      {items.map((item, i) => {
        const expanded = isOpen(i);
        return (
          <div
            key={i}
            style={{
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
              border: `1px solid ${expanded ? 'var(--border-strong)' : 'var(--border-default)'}`,
              boxShadow: expanded ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              overflow: 'hidden',
              transition: `all var(--duration-base) var(--ease-standard)`,
            }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={expanded}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                font: 'inherit',
                fontWeight: 'var(--fw-medium)',
                color: 'var(--text-strong)',
                transition: `background var(--duration-fast) var(--ease-standard)`,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '2rem', height: '2rem', flexShrink: 0, borderRadius: 'var(--radius-full)', background: 'var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="var(--blue-600)" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </span>
                <span style={{ fontSize: 'var(--text-lg)' }}>{item.question}</span>
              </span>
              <svg width="20" height="20" fill="none" stroke="var(--gray-400)" viewBox="0 0 10 6" style={{ flexShrink: 0, transform: expanded ? 'rotate(0)' : 'rotate(180deg)', transition: `transform var(--duration-base) var(--ease-standard)` }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5 5 1 1 5" />
              </svg>
            </button>
            <div style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: `grid-template-rows var(--duration-base) var(--ease-standard)` }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-card)' }}>
                  <p style={{ paddingTop: '1rem', margin: 0, color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)' }}>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
