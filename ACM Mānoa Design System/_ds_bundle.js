/* @ds-bundle: {"format":3,"namespace":"ACMMNoaDesignSystem_b1bbe6","components":[{"name":"EventCard","sourcePath":"components/cards/EventCard.jsx"},{"name":"FeatureCard","sourcePath":"components/cards/FeatureCard.jsx"},{"name":"ProfileCard","sourcePath":"components/cards/ProfileCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/cards/EventCard.jsx":"9b566e12bb0c","components/cards/FeatureCard.jsx":"4f434a60d02a","components/cards/ProfileCard.jsx":"4837da49923d","components/cards/StatCard.jsx":"131ab072e9d6","components/core/Badge.jsx":"373539b09be4","components/core/Button.jsx":"ee4dc89c9d61","components/core/SectionHeader.jsx":"04bcb3d6adc0","components/feedback/Accordion.jsx":"4fe65db452bb","components/navigation/Footer.jsx":"10e09a7ed8a6","components/navigation/NavBar.jsx":"5b06995b3a88","redesign/DirectionAir.jsx":"89b6e17af3d2","redesign/DirectionAloha.jsx":"8e1e7bb5dcdc","redesign/DirectionCumulus.jsx":"3fbc9ee3a48d","redesign/DirectionInk.jsx":"dfe162ea0166","redesign/DirectionPress.jsx":"19f4daf3db6c","redesign/DirectionTerminal.jsx":"ee529760a89b","redesign/air-site/about.jsx":"cb1595285da2","redesign/air-site/data.js":"66036397bb59","redesign/air-site/event.jsx":"18ada026aeb3","redesign/air-site/events.jsx":"bcb03c1f0140","redesign/air-site/home.jsx":"d98363f9d603","redesign/air-site/icspace.jsx":"1deef38a0693","redesign/air-site/image-slot.js":"9309434cb09c","redesign/air-site/programs.jsx":"d7b7f321d377","redesign/air-site/shell.jsx":"eb940c397a93","redesign/air-site/sig.jsx":"d465ebb9ca24","redesign/air-site/sponsors.jsx":"f614f862a434","redesign/design-canvas.jsx":"bd8746af6e58","ui_kits/website/About.jsx":"825310a8c3be","ui_kits/website/App.jsx":"78001f704771","ui_kits/website/Events.jsx":"264fdcf7ecc4","ui_kits/website/Faq.jsx":"a50a45b640e9","ui_kits/website/Hero.jsx":"29eb816841ca","ui_kits/website/Programs.jsx":"2e09e245386a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ACMMNoaDesignSystem_b1bbe6 = window.ACMMNoaDesignSystem_b1bbe6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/EventCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Event card. Two layouts:
 *  - "compact" (default): square gradient date badge + title + meta rows,
 *    as seen in the home "Upcoming Events" list.
 *  - "media": top image (or gradient placeholder) + body + "View Details" pill,
 *    as seen on the Events index grid.
 */
function EventCard({
  title,
  description,
  date,
  // { day, month } for compact, or a string for media
  dateLabel,
  // full date string for meta row
  time,
  location,
  image,
  layout = 'compact',
  href = '#',
  style = {},
  ...rest
}) {
  const CalIcon = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    style: {
      marginRight: '0.5rem',
      color: 'var(--blue-500)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  }));
  const PinIcon = /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    style: {
      marginRight: '0.5rem',
      color: 'var(--blue-500)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  }));
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
    ...style
  };
  if (layout === 'media') {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      onMouseEnter: e => lift(e, true),
      onMouseLeave: e => lift(e, false),
      style: {
        ...cardBase,
        display: 'flex',
        flexDirection: 'column'
      }
    }, rest), image ? /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: title,
      style: {
        width: '100%',
        height: '16rem',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        height: '16rem',
        background: 'linear-gradient(to bottom right, var(--blue-100), var(--indigo-100, #e0e7ff))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "64",
      height: "64",
      fill: "none",
      stroke: "var(--blue-400)",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        marginBottom: '1rem'
      }
    }, title), description && /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-body)',
        lineHeight: 'var(--leading-relaxed)',
        marginBottom: '1.5rem'
      }
    }, description), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }
    }, dateLabel && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--gray-700)',
        fontWeight: 'var(--fw-semibold)'
      }
    }, CalIcon, dateLabel, time ? ` at ${time}` : ''), location && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--gray-700)',
        fontWeight: 'var(--fw-semibold)'
      }
    }, PinIcon, location)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-card)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        background: 'var(--surface-pill)',
        color: 'var(--surface-pill-text)',
        fontWeight: 'var(--fw-semibold)',
        borderRadius: 'var(--radius-full)'
      }
    }, "View Details"))));
  }

  // compact
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: e => lift(e, true),
    onMouseLeave: e => lift(e, false),
    style: {
      ...cardBase,
      padding: '1.5rem'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '4rem',
      height: '4rem',
      borderRadius: 'var(--radius-md)',
      background: 'var(--gradient-brand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--white)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-lg)'
    }
  }, date?.day), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontWeight: 'var(--fw-medium)',
      marginTop: '0.25rem'
    }
  }, date?.month)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      marginBottom: '0.5rem'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      marginBottom: '0.75rem'
    }
  }, description), (dateLabel || time) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginBottom: location ? '0.5rem' : '0.75rem'
    }
  }, CalIcon, dateLabel, time ? ` at ${time}` : ''), location && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginBottom: '0.75rem'
    }
  }, PinIcon, location), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      color: 'var(--text-link)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)'
    }
  }, "Learn More", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M9 5l7 7-7 7"
  }))))));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Feature / SIG card — the program tiles on the home page.
 * Square logo on a soft tinted plate, title, blurb, and a full-width
 * gradient "Learn More" action. Lifts on hover.
 */
function FeatureCard({
  logo,
  title,
  description,
  actionLabel = 'Learn More',
  href = '#',
  accentColor,
  style = {},
  ...rest
}) {
  const Arrow = /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    style: {
      marginLeft: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M9 5l7 7-7 7"
  }));
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(var(--lift-lg))';
      e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-card)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      transition: `all var(--duration-slow) var(--ease-standard)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '6rem',
      height: '6rem',
      margin: '0 auto 1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(to bottom right, var(--blue-50), var(--indigo-50))',
      boxShadow: 'var(--shadow-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
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
      background: 'var(--white)'
    }
  }, typeof logo === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : logo)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      marginBottom: '1rem'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      margin: 0
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: '0 2rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0.75rem 1.5rem',
      background: 'var(--gradient-brand)',
      color: 'var(--text-on-brand)',
      fontWeight: 'var(--fw-semibold)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, actionLabel, Arrow)));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProfileCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Profile card — leadership & faculty grid. Circular avatar with a white
 * ring, name, a brand role pill, and optional bio. Avatar scales on hover,
 * name shifts to brand blue.
 */
function ProfileCard({
  name,
  role,
  bio,
  avatar = 'default_user.svg',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(var(--lift-md))';
      e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1.1)';
      const h = e.currentTarget.querySelector('h3');
      if (h) h.style.color = 'var(--brand-primary)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
      const h = e.currentTarget.querySelector('h3');
      if (h) h.style.color = 'var(--text-strong)';
    },
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-card)',
      boxShadow: 'var(--shadow-lg)',
      padding: '2rem',
      textAlign: 'center',
      transition: `all var(--duration-base) var(--ease-standard)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name,
    style: {
      width: '8rem',
      height: '8rem',
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
      margin: '0 auto',
      border: '4px solid var(--white)',
      boxShadow: 'var(--shadow-lg)',
      transition: `transform var(--duration-base) var(--ease-standard)`
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      marginBottom: '0.75rem',
      transition: `color var(--duration-base) var(--ease-standard)`
    }
  }, name), role && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 'var(--text-base)',
      color: 'var(--surface-pill-text)',
      fontWeight: 'var(--fw-semibold)',
      background: 'var(--surface-pill)',
      padding: '0.5rem 1rem',
      borderRadius: 'var(--radius-full)',
      marginBottom: bio ? '0.75rem' : 0
    }
  }, role), bio && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      margin: '0.75rem 0 0'
    }
  }, bio));
}
Object.assign(__ds_scope, { ProfileCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProfileCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat card — the translucent metric tiles on the hero ("7+ Special
 * Interest Groups"). Big colored number over a soft white/blur surface.
 */
function StatCard({
  value,
  label,
  color = 'var(--blue-600)',
  glass = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    style: {
      background: glass ? 'rgba(255,255,255,0.6)' : 'var(--surface-card)',
      backdropFilter: glass ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: glass ? 'blur(8px)' : 'none',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-lg)',
      textAlign: 'center',
      transition: `box-shadow var(--duration-base) var(--ease-standard)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-3xl)',
      fontWeight: 'var(--fw-bold)',
      color,
      marginBottom: '0.5rem'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-body)',
      fontWeight: 'var(--fw-medium)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tinted pill / badge. The site uses these for role labels
 * (blue-50 background, blue-600 text) and status chips.
 */
function Badge({
  children,
  variant = 'brand',
  style = {},
  ...rest
}) {
  const variants = {
    brand: {
      background: 'var(--surface-pill)',
      color: 'var(--surface-pill-text)'
    },
    neutral: {
      background: 'var(--gray-100)',
      color: 'var(--gray-700)'
    },
    solid: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-brand)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-link)',
      boxShadow: 'inset 0 0 0 1.5px var(--blue-300)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ACM Mānoa Button.
 * Variants: primary (solid blue), gradient (blue→purple signature),
 * secondary (outline), ghost (text). Sizes: sm, md, lg.
 */
function Button({
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
    sm: {
      padding: '0.5rem 1rem',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: 'var(--text-lg)'
    }
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
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-lg)'
    },
    gradient: {
      background: 'var(--gradient-brand)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-lg)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-body)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-link)',
      boxShadow: 'none'
    }
  };
  const hoverIn = e => {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.transform = 'translateY(-1px)';
    if (variant === 'primary') el.style.background = 'var(--brand-primary-hover)';
    if (variant === 'gradient') el.style.background = 'var(--gradient-brand-hover)';
    if (variant === 'primary' || variant === 'gradient') el.style.boxShadow = 'var(--shadow-xl)';
    if (variant === 'secondary') {
      el.style.borderColor = 'var(--brand-primary)';
      el.style.color = 'var(--brand-primary)';
    }
    if (variant === 'ghost') el.style.color = 'var(--brand-primary-hover)';
  };
  const hoverOut = e => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0)';
    Object.assign(el.style, {
      background: variants[variant].background,
      color: variants[variant].color,
      borderColor: variants[variant].borderColor || 'transparent',
      boxShadow: variants[variant].boxShadow || 'none'
    });
  };
  const Tag = href ? 'a' : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), icon && iconPosition === 'left' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon), children, icon && iconPosition === 'right' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Centered section header: title with an optional gradient accent word,
 * the signature gradient divider, and an optional subtitle.
 * Pass the accent word via `accent` — it renders in the brand gradient.
 */
function SectionHeader({
  title,
  accent,
  subtitle,
  align = 'center',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? 'var(--container-prose)' : 'none',
      margin: align === 'center' ? '0 auto' : 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-5xl)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: '1rem'
    }
  }, title, ' ', accent && /*#__PURE__*/React.createElement("span", {
    className: "acm-gradient-text"
  }, accent)), /*#__PURE__*/React.createElement("div", {
    className: "acm-divider",
    style: {
      margin: align === 'center' ? '0 auto' : 0
    }
  }), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '1.5rem',
      fontSize: 'var(--text-xl)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FAQ accordion — the home-page "Frequently Asked Questions" list.
 * Each item is a rounded bordered card with a blue help-circle icon,
 * question text, and a chevron that rotates as the answer expands.
 * Single-open behavior by default.
 */
function Accordion({
  items = [],
  defaultOpen = -1,
  allowMultiple = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(allowMultiple ? defaultOpen >= 0 ? [defaultOpen] : [] : defaultOpen);
  const isOpen = i => allowMultiple ? open.includes(i) : open === i;
  const toggle = i => {
    if (allowMultiple) {
      setOpen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    } else {
      setOpen(prev => prev === i ? -1 : i);
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      ...style
    }
  }, rest), items.map((item, i) => {
    const expanded = isOpen(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${expanded ? 'var(--border-strong)' : 'var(--border-default)'}`,
        boxShadow: expanded ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        overflow: 'hidden',
        transition: `all var(--duration-base) var(--ease-standard)`
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => toggle(i),
      "aria-expanded": expanded,
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--gray-50)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
      },
      style: {
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
        transition: `background var(--duration-fast) var(--ease-standard)`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '2rem',
        height: '2rem',
        flexShrink: 0,
        borderRadius: 'var(--radius-full)',
        background: 'var(--blue-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "var(--blue-600)",
      viewBox: "0 0 20 20"
    }, /*#__PURE__*/React.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-lg)'
      }
    }, item.question)), /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      fill: "none",
      stroke: "var(--gray-400)",
      viewBox: "0 0 10 6",
      style: {
        flexShrink: 0,
        transform: expanded ? 'rotate(0)' : 'rotate(180deg)',
        transition: `transform var(--duration-base) var(--ease-standard)`
      }
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1",
      d: "M9 5 5 1 1 5"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateRows: expanded ? '1fr' : '0fr',
        transition: `grid-template-rows var(--duration-base) var(--ease-standard)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 1.5rem 1.5rem',
        borderTop: '1px solid var(--border-card)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        paddingTop: '1rem',
        margin: 0,
        color: 'var(--text-body)',
        lineHeight: 'var(--leading-relaxed)'
      }
    }, item.answer)))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SOCIAL_ICONS = {
  github: 'M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z',
  discord: 'M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};

/**
 * Dark gradient site footer: brand blurb, four link columns, divider,
 * copyright line, and social icons. Mirrors the live ACM Mānoa footer.
 */
function Footer({
  logo = 'assets/acm_logo.png',
  blurb = 'Empowering students through technology, innovation, and community. Join us in shaping the future of computing at the University of Hawaii at Mānoa.',
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  year = new Date().getFullYear(),
  style = {},
  ...rest
}) {
  const linkHover = (e, on) => {
    e.currentTarget.style.color = on ? 'var(--footer-link-hover)' : 'var(--footer-text)';
  };
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: 'var(--gradient-footer)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '3rem 1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '28rem'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      textDecoration: 'none',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "ACM Logo",
    style: {
      height: '2.5rem'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--white)'
    }
  }, "ACM at UH M\u0101noa")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--footer-text)',
      lineHeight: 'var(--leading-relaxed)',
      margin: 0
    }
  }, blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
      gap: '2rem'
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      marginBottom: '1.5rem',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--white)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wider)'
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href,
    onMouseEnter: e => linkHover(e, true),
    onMouseLeave: e => linkHover(e, false),
    style: {
      color: 'var(--footer-text)',
      fontWeight: 'var(--fw-medium)',
      textDecoration: 'none',
      transition: `color var(--duration-base) var(--ease-standard)`
    }
  }, l.label)))))))), /*#__PURE__*/React.createElement("hr", {
    style: {
      margin: '2rem 0',
      border: 0,
      borderTop: '1px solid var(--gray-700)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--footer-text)'
    }
  }, "\xA9 ", year, " ", /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      color: 'var(--footer-text)'
    }
  }, "ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-400)',
      marginLeft: '0.5rem',
      paddingLeft: '0.5rem',
      borderLeft: '1px solid var(--gray-700)'
    }
  }, "Built with \u2665 by 8bitUHM")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem'
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.type,
    href: s.href,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--white)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--gray-400)';
    },
    style: {
      color: 'var(--gray-400)',
      transition: `color var(--duration-base) var(--ease-standard)`,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "currentColor",
    viewBox: s.type === 'discord' ? '0 0 21 16' : s.type === 'github' ? '0 0 20 20' : '0 0 24 24'
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: SOCIAL_ICONS[s.type]
  }))))))));
}
const DEFAULT_COLUMNS = [{
  title: 'Quick Links',
  links: [{
    label: 'About',
    href: '/about'
  }, {
    label: 'Events',
    href: '/events'
  }, {
    label: 'SIGs',
    href: '/sigs'
  }, {
    label: 'Sponsors',
    href: '/sponsors'
  }]
}, {
  title: 'Connect',
  links: [{
    label: 'Discord',
    href: '#'
  }, {
    label: 'Instagram',
    href: '#'
  }, {
    label: 'LinkedIn',
    href: '#'
  }, {
    label: 'Email Us',
    href: '#'
  }]
}, {
  title: 'Resources',
  links: [{
    label: 'ICSpace',
    href: '/icspace'
  }, {
    label: 'GitHub',
    href: '#'
  }, {
    label: 'ACM International',
    href: '#'
  }, {
    label: 'ICS Department',
    href: '#'
  }]
}];
const DEFAULT_SOCIALS = [{
  type: 'github',
  href: '#'
}, {
  type: 'discord',
  href: '#'
}, {
  type: 'instagram',
  href: '#'
}, {
  type: 'linkedin',
  href: '#'
}];
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sticky top navigation. White, translucent, blurred, with a thin
 * animated gradient accent bar along the bottom edge. Logo + "at UH Mānoa"
 * wordmark on the left, link list on the right with an animated underline.
 */
function NavBar({
  logo = 'assets/acm_logo.png',
  brand = 'at UH Mānoa',
  links = [{
    label: 'About',
    href: '/about'
  }, {
    label: 'Events',
    href: '/events'
  }, {
    label: 'Sponsors',
    href: '/sponsors'
  }, {
    label: 'ICSpace',
    href: '/icspace'
  }, {
    label: 'SIGS',
    href: '/sigs'
  }],
  activeHref,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'var(--nav-height)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "ACM Logo",
    style: {
      height: '3rem',
      width: 'auto',
      filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, brand)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    }
  }, links.map(l => {
    const active = l.href === activeHref;
    return /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      onMouseEnter: e => {
        e.currentTarget.style.color = 'var(--brand-primary)';
        e.currentTarget.querySelector('span').style.width = '100%';
      },
      onMouseLeave: e => {
        if (!active) {
          e.currentTarget.style.color = 'var(--gray-700)';
          e.currentTarget.querySelector('span').style.width = '0';
        }
      },
      style: {
        position: 'relative',
        color: active ? 'var(--brand-primary)' : 'var(--gray-700)',
        fontWeight: 'var(--fw-medium)',
        textDecoration: 'none',
        transition: `color var(--duration-base) var(--ease-standard)`,
        paddingBottom: '0.25rem'
      }
    }, l.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        width: active ? '100%' : '0',
        background: 'var(--brand-primary)',
        transition: `width var(--duration-base) var(--ease-standard)`
      }
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '4px',
      background: 'var(--gradient-accent-bar)'
    }
  }));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionAir.jsx
try { (() => {
/* ACM Mānoa redesign — Direction A3: "Air"  (a clean/minimal sibling of Cumulus)
   Soft & airy. Cool near-white, soft ink, a gentle periwinkle accent. Big
   whitespace, generous rounding, lighter type weights, pastel tints. Calm
   and friendly — minimal but warm. Figtree. */
(function () {
  const CSS = `
  .air{ --bg:#FBFBFE; --ink:#1B1D29; --soft:#494C61; --muted:#7C7F95; --line:#ECECF4; --card:#FFFFFF;
    --peri:#6E6BF2; --peri-d:#5754D6; --wash:#EFEFFE; --wash2:#F4F2FF;
    font-family:'Figtree',sans-serif; color:var(--ink); background:var(--bg); -webkit-font-smoothing:antialiased; line-height:1.6;}
  .air *{box-sizing:border-box;margin:0;padding:0;}
  .air img{display:block;max-width:100%;}
  .air .wrap{max-width:1080px;margin:0 auto;padding:0 40px;}

  /* nav */
  .air nav{position:sticky;top:0;z-index:20;background:rgba(251,251,254,.82);backdrop-filter:blur(16px);}
  .air .nav-in{display:flex;align-items:center;justify-content:space-between;height:80px;}
  .air .brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:18px;letter-spacing:-.01em;white-space:nowrap;}
  .air .brand img{width:30px;height:30px;}
  .air .brand .sep{color:var(--muted);font-weight:500;}
  .air .nav-links{display:flex;gap:8px;align-items:center;}
  .air .nav-links a{color:var(--soft);text-decoration:none;font-size:15px;font-weight:500;padding:9px 15px;border-radius:999px;transition:all .2s;}
  .air .nav-links a:hover{color:var(--ink);background:var(--wash);}
  .air .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:15px;border-radius:999px;padding:12px 24px;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:all .2s;white-space:nowrap;}
  .air .btn-primary{background:var(--peri);color:#fff;box-shadow:0 10px 24px -12px rgba(110,107,242,.8);}
  .air .btn-primary:hover{background:var(--peri-d);transform:translateY(-2px);}
  .air .btn-soft{background:var(--wash);color:var(--peri-d);}
  .air .btn-soft:hover{background:var(--wash2);}
  .air .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
  .air .btn-ghost:hover{border-color:var(--muted);}

  /* hero */
  .air .hero{text-align:center;padding:84px 0 92px;position:relative;overflow:hidden;}
  .air .hero::before{content:'';position:absolute;top:-160px;left:50%;transform:translateX(-50%);width:760px;height:480px;
    background:radial-gradient(ellipse at center, var(--wash) 0%, rgba(239,239,254,0) 68%);z-index:0;}
  .air .hero .wrap{position:relative;z-index:1;}
  .air .chip{display:inline-flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--line);box-shadow:0 8px 20px -14px rgba(27,29,41,.4);
    border-radius:999px;padding:7px 9px 7px 15px;font-size:13.5px;font-weight:600;color:var(--soft);margin-bottom:32px;}
  .air .chip b{color:var(--peri-d);}
  .air .chip .pin{background:var(--peri);color:#fff;border-radius:999px;font-size:11px;font-weight:700;padding:4px 10px;}
  .air h1{font-size:clamp(44px,6vw,80px);line-height:1.04;letter-spacing:-.03em;font-weight:700;max-width:17ch;margin:0 auto 24px;}
  .air h1 .grad{color:var(--peri);}
  .air .lede{font-size:clamp(18px,2vw,21px);color:var(--soft);max-width:50ch;margin:0 auto 36px;}
  .air .hero-cta{display:flex;gap:12px;justify-content:center;}
  .air .hero-panel{margin-top:70px;background:linear-gradient(180deg,var(--wash2),var(--card));border:1px solid var(--line);
    border-radius:32px;padding:18px;box-shadow:0 50px 90px -50px rgba(110,107,242,.5);}
  .air .hero-panel .inner{background:var(--card);border-radius:22px;padding:44px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .air .pcard{background:var(--bg);border-radius:18px;padding:26px;text-align:left;}
  .air .pcard .n{font-size:44px;font-weight:700;letter-spacing:-.03em;line-height:1;color:var(--peri-d);}
  .air .pcard .l{font-size:14px;color:var(--muted);margin-top:8px;font-weight:500;}

  /* sections */
  .air section{padding:90px 0;}
  .air .sec-head{text-align:center;max-width:600px;margin:0 auto 52px;}
  .air .sec-tag{display:inline-block;font-size:13px;font-weight:700;color:var(--peri-d);background:var(--wash);border-radius:999px;padding:6px 14px;margin-bottom:18px;white-space:nowrap;}
  .air h2{font-size:clamp(30px,4vw,48px);letter-spacing:-.03em;line-height:1.08;font-weight:700;margin-bottom:14px;}
  .air .sec-sub{font-size:18px;color:var(--soft);}

  /* SIG cards — soft pastel */
  .air .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .air .sig{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:30px;transition:all .3s;cursor:pointer;}
  .air .sig:hover{transform:translateY(-6px);box-shadow:0 28px 50px -34px rgba(110,107,242,.6);border-color:var(--wash);}
  .air .sig .ic{width:52px;height:52px;border-radius:16px;background:var(--wash);color:var(--peri-d);display:flex;align-items:center;justify-content:center;margin-bottom:22px;}
  .air .sig h3{font-size:21px;font-weight:700;letter-spacing:-.01em;margin-bottom:9px;}
  .air .sig p{font-size:15px;color:var(--soft);}
  .air .sig .more{margin-top:18px;font-size:14px;font-weight:600;color:var(--peri-d);display:inline-flex;gap:6px;align-items:center;}

  /* events as soft pills */
  .air .events{display:flex;flex-direction:column;gap:14px;max-width:760px;margin:0 auto;}
  .air .ev{display:flex;gap:20px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:18px 22px;transition:all .25s;cursor:pointer;}
  .air .ev:hover{box-shadow:0 22px 40px -32px rgba(27,29,41,.5);transform:translateY(-3px);}
  .air .ev .date{flex-shrink:0;text-align:center;background:var(--wash);border-radius:14px;width:64px;padding:10px 0;}
  .air .ev .date .d{font-size:24px;font-weight:700;line-height:1;color:var(--peri-d);}
  .air .ev .date .m{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-top:3px;}
  .air .ev .body{flex:1;}
  .air .ev .body h4{font-size:18px;font-weight:700;}
  .air .ev .body p{font-size:14px;color:var(--muted);}
  .air .ev .arrow{color:var(--muted);}

  /* closer */
  .air .closer .box{background:linear-gradient(140deg,var(--peri),#8E7BF6);border-radius:32px;padding:76px 40px;text-align:center;color:#fff;
    box-shadow:0 50px 90px -50px rgba(110,107,242,.8);}
  .air .closer h2{color:#fff;margin-bottom:14px;}
  .air .closer p{color:rgba(255,255,255,.9);font-size:19px;max-width:48ch;margin:0 auto 30px;}
  .air .closer .btn-white{background:#fff;color:var(--peri-d);}
  .air .closer .btn-white:hover{transform:translateY(-2px);}

  /* footer */
  .air footer{padding:56px 0 40px;}
  .air .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .air .foot-brand{max-width:300px;}
  .air .foot-brand p{font-size:14px;color:var(--muted);margin-top:14px;}
  .air .foot-col h5{font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .air .foot-col a{display:block;font-size:15px;color:var(--soft);text-decoration:none;margin-bottom:11px;font-weight:500;}
  .air .foot-col a:hover{color:var(--peri-d);}
  .air .foot-bottom{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);padding-top:24px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .air .nav-links{display:none;}
    .air .grid,.air .hero-panel .inner{grid-template-columns:1fr;}
    .air .wrap{padding:0 22px;}
    .air .hero-panel .inner{padding:24px;}
  }`;
  function Ic({
    d
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const ARR = "M5 12h14M13 6l6 6-6 6";
  function Air() {
    const sigs = [{
      t: "AI & Machine Learning",
      d: "Build models, read papers, and ship projects together.",
      p: "M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"
    }, {
      t: "Web & Product",
      d: "Design and launch real apps with modern frameworks.",
      p: "M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
    }, {
      t: "Cybersecurity",
      d: "CTF practice and ethical hacking, beginner to bounty.",
      p: "M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"
    }, {
      t: "Game Dev",
      d: "Pixels to engines — make the game you want to play.",
      p: "M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"
    }, {
      t: "Robotics",
      d: "Sensors, embedded systems, machines that move.",
      p: "M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"
    }, {
      t: "Data Science",
      d: "Real Hawaiʻi datasets, honest visualizations.",
      p: "M3 3v18h18M8 16V9M13 16V5M18 16v-4"
    }];
    const events = [{
      d: "14",
      m: "Feb",
      t: "Intro to Git & GitHub",
      s: "Workshop · POST 318B · 5:00 PM"
    }, {
      d: "28",
      m: "Feb",
      t: "Resume & LinkedIn Night",
      s: "Career · iLab · 6:00 PM"
    }, {
      d: "08",
      m: "Mar",
      t: "Spring Hackathon Kickoff",
      s: "48 hours · Campus Center · 9:00 AM"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap nav-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "\xB7 M\u0101noa")), /*#__PURE__*/React.createElement("div", {
      className: "nav-links"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#",
      style: {
        marginLeft: '8px'
      }
    }, "Join us")))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pin"
    }, "New"), "The largest CS community at UH M\u0101noa"), /*#__PURE__*/React.createElement("h1", null, "A friendly home for ", /*#__PURE__*/React.createElement("span", {
      className: "grad"
    }, "curious builders.")), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "ACM at the University of Hawai\u02BBi at M\u0101noa is where beginners and tinkerers find their group, ship their first project, and meet their future team."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#"
    }, "Become a member ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: "#"
    }, "Explore programs")), /*#__PURE__*/React.createElement("div", {
      className: "hero-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Special Interest Groups")), /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "500+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Active members")), /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "50+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Events every year")))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h2", null, "Find your people."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "Every SIG is student-led and beginner-friendly. Show up, build something, grow alongside others figuring it out too.")), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, sigs.map((s, i) => /*#__PURE__*/React.createElement("div", {
      className: "sig",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: s.p
    })), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d), /*#__PURE__*/React.createElement("span", {
      className: "more"
    }, "Learn more ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "What's on"), /*#__PURE__*/React.createElement("h2", null, "Coming up next.")), /*#__PURE__*/React.createElement("div", {
      className: "events"
    }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "ev",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "date"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d"
    }, e.d), /*#__PURE__*/React.createElement("div", {
      className: "m"
    }, e.m)), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, /*#__PURE__*/React.createElement("h4", null, e.t), /*#__PURE__*/React.createElement("p", null, e.s)), /*#__PURE__*/React.createElement("div", {
      className: "arrow"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "New here? Perfect."), /*#__PURE__*/React.createElement("p", null, "No experience required \u2014 just curiosity. Join the Discord, come to one event, and see what sticks."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white",
      href: "#"
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "\xB7 M\u0101noa")), /*#__PURE__*/React.createElement("p", null, "Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa. Built by students, for students.")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Email")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "GitHub"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ACM Intl."))), /*#__PURE__*/React.createElement("div", {
      className: "foot-bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Made with aloha \uD83E\uDD19")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Air
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionAir.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionAloha.jsx
try { (() => {
/* ACM Mānoa redesign — Direction D: "Aloha"
   Tropical & place-rooted. Sunset coral → gold → ocean teal on warm cream,
   organic blob shapes, a rising-sun motif, soft rounded cards. Warm,
   vibrant, unmistakably Hawaiʻi — but still modern and techy. */
(function () {
  const CSS = `
  .aloha{ --cream:#FFF7EC; --ink:#14233A; --ocean:#0E8C86; --ocean-d:#0A6E68;
    --coral:#FF6A45; --gold:#FFB13C; --sky:#7CD9D2; --muted:#5E6B72; --line:#EFE2CE; --card:#FFFFFF;
    font-family:'DM Sans',sans-serif; color:var(--ink); background:var(--cream); -webkit-font-smoothing:antialiased; line-height:1.55;}
  .aloha *{box-sizing:border-box;margin:0;padding:0;}
  .aloha img{display:block;max-width:100%;}
  .aloha .disp{font-family:'Bricolage Grotesque',sans-serif;}
  .aloha .wrap{max-width:1140px;margin:0 auto;padding:0 40px;}

  /* nav */
  .aloha nav{position:sticky;top:0;z-index:30;background:rgba(255,247,236,.85);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
  .aloha .nav-in{display:flex;align-items:center;justify-content:space-between;height:74px;}
  .aloha .brand{display:flex;align-items:center;gap:11px;font-family:'Bricolage Grotesque';font-weight:700;font-size:20px;white-space:nowrap;}
  .aloha .brand img{width:32px;height:32px;}
  .aloha .nav-links{display:flex;gap:30px;align-items:center;}
  .aloha .nav-links a{color:var(--ink);text-decoration:none;font-size:15px;font-weight:600;transition:color .2s;}
  .aloha .nav-links a:hover{color:var(--coral);}
  .aloha .btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:15px;border-radius:999px;padding:12px 24px;text-decoration:none;cursor:pointer;border:2px solid transparent;transition:all .2s;white-space:nowrap;}
  .aloha .btn-coral{background:var(--coral);color:#fff;box-shadow:0 10px 24px -10px rgba(255,106,69,.7);}
  .aloha .btn-coral:hover{transform:translateY(-2px);box-shadow:0 16px 30px -12px rgba(255,106,69,.8);}
  .aloha .btn-ocean{background:var(--ink);color:#fff;}
  .aloha .btn-ocean:hover{background:var(--ocean-d);}
  .aloha .btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
  .aloha .btn-ghost:hover{background:var(--ink);color:#fff;}

  /* hero */
  .aloha .hero{position:relative;overflow:hidden;padding:90px 0 130px;
    background:radial-gradient(120% 120% at 78% -10%, var(--gold) 0%, var(--coral) 34%, #FF8A5C 50%, var(--cream) 72%);}
  .aloha .sun{position:absolute;top:-120px;right:-60px;width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle at 50% 50%, #FFE9B0, var(--gold) 60%, transparent 72%);opacity:.85;}
  .aloha .hero .wrap{position:relative;z-index:2;}
  .aloha .pill{display:inline-flex;align-items:center;gap:9px;background:rgba(20,35,58,.9);color:#fff;font-size:13px;font-weight:700;border-radius:999px;padding:8px 16px;margin-bottom:26px;}
  .aloha .pill .dot{width:8px;height:8px;border-radius:50%;background:var(--gold);}
  .aloha .hero h1{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(46px,7vw,84px);line-height:1.02;letter-spacing:-.03em;max-width:16ch;margin-bottom:24px;}
  .aloha .hero h1 .u{color:#fff;-webkit-text-stroke:0;}
  .aloha .hero .lede{font-size:clamp(17px,2vw,20px);max-width:46ch;color:var(--ink);margin-bottom:34px;font-weight:500;}
  .aloha .hero-cta{display:flex;gap:14px;flex-wrap:wrap;}
  .aloha .floatcards{display:flex;gap:16px;margin-top:64px;flex-wrap:wrap;}
  .aloha .fc{background:var(--card);border-radius:22px;padding:22px 26px;box-shadow:0 22px 44px -28px rgba(20,35,58,.4);flex:1;min-width:170px;}
  .aloha .fc .n{font-family:'Bricolage Grotesque';font-weight:800;font-size:42px;line-height:1;letter-spacing:-.03em;}
  .aloha .fc:nth-child(1) .n{color:var(--coral);} .aloha .fc:nth-child(2) .n{color:var(--ocean);} .aloha .fc:nth-child(3) .n{color:var(--gold);}
  .aloha .fc .l{font-size:14px;color:var(--muted);font-weight:600;margin-top:6px;}

  /* wave divider */
  .aloha .wave{display:block;width:100%;height:60px;margin-top:-60px;position:relative;z-index:2;}

  /* sections */
  .aloha section{padding:88px 0;}
  .aloha .sec-head{text-align:center;max-width:640px;margin:0 auto 52px;}
  .aloha .sec-tag{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--coral);margin-bottom:14px;}
  .aloha h2{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(32px,4.4vw,52px);letter-spacing:-.025em;line-height:1.05;margin-bottom:14px;}
  .aloha .sec-sub{font-size:18px;color:var(--muted);}

  /* SIG grid */
  .aloha .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .aloha .sig{position:relative;background:var(--card);border-radius:26px;padding:30px;overflow:hidden;border:1px solid var(--line);transition:all .3s;cursor:pointer;}
  .aloha .sig::before{content:'';position:absolute;top:-40px;right:-40px;width:120px;height:120px;border-radius:50%;opacity:.16;transition:transform .4s;}
  .aloha .sig:hover{transform:translateY(-6px);box-shadow:0 28px 50px -30px rgba(20,35,58,.45);}
  .aloha .sig:hover::before{transform:scale(1.5);}
  .aloha .sig:nth-child(3n+1)::before{background:var(--coral);} .aloha .sig:nth-child(3n+2)::before{background:var(--ocean);} .aloha .sig:nth-child(3n)::before{background:var(--gold);}
  .aloha .sig .ic{width:50px;height:50px;border-radius:15px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:20px;position:relative;z-index:2;}
  .aloha .sig:nth-child(3n+1) .ic{background:var(--coral);} .aloha .sig:nth-child(3n+2) .ic{background:var(--ocean);} .aloha .sig:nth-child(3n) .ic{background:var(--gold);}
  .aloha .sig h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:22px;margin-bottom:8px;position:relative;z-index:2;}
  .aloha .sig p{font-size:15px;color:var(--muted);position:relative;z-index:2;}
  .aloha .sig .more{margin-top:16px;font-weight:700;font-size:14px;color:var(--ink);display:inline-flex;gap:6px;align-items:center;position:relative;z-index:2;}

  /* ocean band */
  .aloha .band{background:linear-gradient(135deg,var(--ocean) 0%, var(--ocean-d) 60%, #084f4a 100%);color:#fff;}
  .aloha .band .wrap{padding:80px 40px;}
  .aloha .band .sec-head{margin-bottom:0;text-align:left;max-width:none;}
  .aloha .band-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:50px;align-items:center;}
  .aloha .band h2{color:#fff;}
  .aloha .band p{color:rgba(255,255,255,.86);font-size:18px;margin-bottom:26px;}
  .aloha .events{display:flex;flex-direction:column;gap:12px;}
  .aloha .ev{display:flex;gap:18px;align-items:center;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:18px;padding:16px 20px;transition:background .2s;cursor:pointer;}
  .aloha .ev:hover{background:rgba(255,255,255,.18);}
  .aloha .ev .date{flex-shrink:0;text-align:center;background:var(--gold);color:var(--ink);border-radius:13px;width:58px;padding:8px 0;}
  .aloha .ev .date .d{font-family:'Bricolage Grotesque';font-weight:800;font-size:22px;line-height:1;}
  .aloha .ev .date .m{font-size:11px;font-weight:700;text-transform:uppercase;}
  .aloha .ev h4{font-size:17px;font-weight:700;}
  .aloha .ev p{margin:0;font-size:13px;color:rgba(255,255,255,.72);}

  /* closer */
  .aloha .closer{text-align:center;}
  .aloha .closer .box{background:linear-gradient(135deg,var(--coral),var(--gold));border-radius:32px;padding:74px 40px;color:#fff;}
  .aloha .closer h2{color:#fff;margin-bottom:14px;}
  .aloha .closer p{color:rgba(255,255,255,.92);font-size:19px;max-width:50ch;margin:0 auto 30px;font-weight:500;}

  /* footer */
  .aloha footer{background:var(--ink);color:#fff;padding:60px 0 40px;}
  .aloha .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .aloha .foot-brand{max-width:300px;}
  .aloha .foot-brand .brand{color:#fff;}
  .aloha .foot-brand p{color:rgba(255,255,255,.66);font-size:14px;margin-top:14px;}
  .aloha .foot-col h5{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
  .aloha .foot-col a{display:block;color:rgba(255,255,255,.82);text-decoration:none;font-size:15px;margin-bottom:10px;}
  .aloha .foot-col a:hover{color:var(--coral);}
  .aloha .foot-bottom{border-top:1px solid rgba(255,255,255,.14);padding-top:24px;display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.6);}

  @media(max-width:760px){
    .aloha .nav-links{display:none;}
    .aloha .grid,.aloha .band-grid{grid-template-columns:1fr;}
    .aloha .wrap{padding:0 22px;}
    .aloha .band .wrap{padding:54px 24px;}
  }`;
  function Ic({
    d
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const ARR = "M5 12h14M13 6l6 6-6 6";
  function Aloha() {
    const sigs = [{
      t: "AI & Machine Learning",
      d: "Build models, read papers, ship projects — together.",
      p: "M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"
    }, {
      t: "Web & Product",
      d: "Design and launch real apps with modern tools.",
      p: "M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
    }, {
      t: "Cybersecurity",
      d: "CTF practice and ethical hacking, beginner to bounty.",
      p: "M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"
    }, {
      t: "Game Dev",
      d: "Pixels to engines — make the game you want to play.",
      p: "M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"
    }, {
      t: "Robotics",
      d: "Sensors, embedded systems, machines that move.",
      p: "M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"
    }, {
      t: "Data Science",
      d: "Real Hawaiʻi datasets, honest visualizations.",
      p: "M3 3v18h18M8 16V9M13 16V5M18 16v-4"
    }];
    const events = [{
      d: "14",
      m: "Feb",
      t: "Intro to Git & GitHub",
      s: "Workshop · POST 318B · 5:00 PM"
    }, {
      d: "28",
      m: "Feb",
      t: "Resume & LinkedIn Night",
      s: "Career · iLab · 6:00 PM"
    }, {
      d: "08",
      m: "Mar",
      t: "Spring Hackathon",
      s: "48 hours · Campus Center"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "aloha"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap nav-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM M\u0101noa"), /*#__PURE__*/React.createElement("div", {
      className: "nav-links"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-coral",
      href: "#"
    }, "Join us")))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sun"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pill"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "The largest CS \u02BBohana at UH M\u0101noa"), /*#__PURE__*/React.createElement("h1", {
      className: "disp"
    }, "Aloha. Let's build ", /*#__PURE__*/React.createElement("span", {
      className: "u"
    }, "something"), " together."), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "ACM at the University of Hawai\u02BBi at M\u0101noa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your people."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ocean",
      href: "#"
    }, "Become a member ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: "#"
    }, "Explore programs")), /*#__PURE__*/React.createElement("div", {
      className: "floatcards"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Special Interest Groups")), /*#__PURE__*/React.createElement("div", {
      className: "fc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "500+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Active members")), /*#__PURE__*/React.createElement("div", {
      className: "fc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "50+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Events every year"))))), /*#__PURE__*/React.createElement("svg", {
      className: "wave",
      viewBox: "0 0 1440 60",
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,40 C240,8 480,8 720,32 C960,56 1200,56 1440,28 L1440,60 L0,60 Z",
      fill: "#FFF7EC"
    })), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h2", {
      className: "disp"
    }, "Find your wave."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "Every SIG is student-led and beginner-friendly. Show up, build something, grow with people figuring it out alongside you.")), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, sigs.map((s, i) => /*#__PURE__*/React.createElement("div", {
      className: "sig",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: s.p
    })), /*#__PURE__*/React.createElement("h3", {
      className: "disp"
    }, s.t), /*#__PURE__*/React.createElement("p", null, s.d), /*#__PURE__*/React.createElement("span", {
      className: "more"
    }, "Learn more ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      className: "band",
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "band-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag",
      style: {
        color: 'var(--gold)'
      }
    }, "What's on"), /*#__PURE__*/React.createElement("h2", {
      className: "disp"
    }, "Come hang out."), /*#__PURE__*/React.createElement("p", null, "Workshops, socials, and talks all semester long. No experience required \u2014 just curiosity and good vibes.")), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-coral",
      href: "#"
    }, "See all events ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))), /*#__PURE__*/React.createElement("div", {
      className: "events"
    }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "ev",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "date"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d"
    }, e.d), /*#__PURE__*/React.createElement("div", {
      className: "m"
    }, e.m)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, e.t), /*#__PURE__*/React.createElement("p", null, e.s)))))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "disp"
    }, "New here? E komo mai."), /*#__PURE__*/React.createElement("p", null, "That's \"welcome.\" No experience needed \u2014 join the Discord, come to one event, and see what sticks."), /*#__PURE__*/React.createElement("a", {
      className: "btn",
      style: {
        background: '#fff',
        color: 'var(--coral)'
      },
      href: "#"
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM M\u0101noa"), /*#__PURE__*/React.createElement("p", null, "Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa. Built by students, for students.")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Email")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "GitHub"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ACM Intl."))), /*#__PURE__*/React.createElement("div", {
      className: "foot-bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Made with aloha \uD83E\uDD19")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Aloha
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionAloha.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionCumulus.jsx
try { (() => {
/* ACM Mānoa redesign — Direction A: "Cumulus"
   Clean, modern, Apple-minimal. Warm paper, graphite ink, a single jade
   accent (the green of Mānoa valley). Generous whitespace, big calm type,
   soft product-style cards. Reinvented from scratch — no legacy blue. */
(function () {
  const CSS = `
  .cumulus { --paper:#FAFAF7; --ink:#0E0F0D; --muted:#5C605A; --line:#E7E6DF;
    --jade:#0F9D6F; --jade-deep:#0A7A56; --mist:#EEF3EF; --card:#FFFFFF;
    font-family:'Hanken Grotesk',sans-serif; color:var(--ink); background:var(--paper);
    -webkit-font-smoothing:antialiased; line-height:1.5; }
  .cumulus *{box-sizing:border-box;margin:0;padding:0;}
  .cumulus img{display:block;max-width:100%;}
  .cumulus .wrap{max-width:1120px;margin:0 auto;padding:0 40px;}

  /* nav */
  .cumulus nav{position:sticky;top:0;z-index:20;background:rgba(250,250,247,.8);
    backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
  .cumulus .nav-in{display:flex;align-items:center;justify-content:space-between;height:72px;}
  .cumulus .brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:18px;letter-spacing:-.02em;white-space:nowrap;}
  .cumulus .brand img{width:30px;height:30px;}
  .cumulus .nav-links{display:flex;gap:34px;align-items:center;}
  .cumulus .nav-links a{color:var(--muted);text-decoration:none;font-size:15px;font-weight:500;transition:color .2s;}
  .cumulus .nav-links a:hover{color:var(--ink);}
  .cumulus .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:15px;
    border-radius:100px;padding:11px 22px;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:all .2s;}
  .cumulus .btn-primary{background:var(--ink);color:var(--paper);}
  .cumulus .btn-primary:hover{background:var(--jade-deep);}
  .cumulus .btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
  .cumulus .btn-ghost:hover{border-color:var(--ink);}

  /* hero */
  .cumulus .hero{padding:104px 0 80px;text-align:center;}
  .cumulus .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;
    color:var(--jade-deep);background:var(--mist);border-radius:100px;padding:7px 15px;margin-bottom:30px;letter-spacing:.01em;}
  .cumulus .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--jade);}
  .cumulus h1{font-size:clamp(42px,5.6vw,76px);line-height:1.07;letter-spacing:-.035em;font-weight:800;max-width:18ch;margin:0 auto 28px;}
  .cumulus h1 .soft{color:var(--muted);}
  .cumulus .lede{font-size:clamp(18px,2vw,21px);color:var(--muted);max-width:54ch;margin:0 auto 38px;line-height:1.55;}
  .cumulus .hero-cta{display:flex;gap:13px;justify-content:center;}
  .cumulus .hero-vis{margin-top:72px;border-radius:28px;overflow:hidden;border:1px solid var(--line);
    background:linear-gradient(160deg,#F2F6F2,#E6EFE9 60%,#DDE9E1);height:420px;position:relative;box-shadow:0 40px 80px -40px rgba(15,157,111,.28);}
  .cumulus .hero-vis .badge{position:absolute;background:var(--card);border:1px solid var(--line);border-radius:18px;
    padding:16px 18px;box-shadow:0 20px 40px -24px rgba(0,0,0,.25);}
  .cumulus .hero-vis .b-num{font-size:30px;font-weight:800;letter-spacing:-.03em;}
  .cumulus .hero-vis .b-lbl{font-size:13px;color:var(--muted);font-weight:500;margin-top:2px;}
  .cumulus .hero-vis .b1{top:46px;left:48px;}
  .cumulus .hero-vis .b2{bottom:60px;right:56px;}
  .cumulus .hero-vis .b3{top:140px;right:120px;}
  .cumulus .hero-vis .center-mark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;}
  .cumulus .hero-vis .center-mark img{width:96px;height:96px;filter:drop-shadow(0 12px 24px rgba(0,0,0,.12));}
  .cumulus .hero-vis .center-mark span{font-weight:600;color:var(--jade-deep);font-size:14px;letter-spacing:.02em;}

  /* section heading */
  .cumulus section{padding:96px 0;}
  .cumulus .sec-head{max-width:680px;margin-bottom:54px;}
  .cumulus .sec-tag{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--jade-deep);margin-bottom:16px;}
  .cumulus h2{font-size:clamp(32px,4vw,52px);letter-spacing:-.03em;line-height:1.06;font-weight:800;margin-bottom:18px;}
  .cumulus .sec-sub{font-size:19px;color:var(--muted);line-height:1.55;}

  /* programs grid */
  .cumulus .prog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .cumulus .prog{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px;transition:all .3s;cursor:pointer;}
  .cumulus .prog:hover{transform:translateY(-5px);box-shadow:0 30px 50px -30px rgba(0,0,0,.22);border-color:#D4D8D0;}
  .cumulus .prog .ic{width:46px;height:46px;border-radius:13px;background:var(--mist);display:flex;align-items:center;justify-content:center;margin-bottom:22px;color:var(--jade-deep);}
  .cumulus .prog h3{font-size:21px;letter-spacing:-.02em;font-weight:700;margin-bottom:9px;}
  .cumulus .prog p{font-size:15px;color:var(--muted);line-height:1.55;}
  .cumulus .prog .more{margin-top:18px;font-size:14px;font-weight:600;color:var(--jade-deep);display:inline-flex;align-items:center;gap:6px;}

  /* stats band */
  .cumulus .band{background:var(--ink);color:var(--paper);border-radius:32px;padding:64px 56px;}
  .cumulus .band-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;}
  .cumulus .stat .n{font-size:64px;font-weight:800;letter-spacing:-.04em;line-height:1;}
  .cumulus .stat .n em{color:var(--jade);font-style:normal;}
  .cumulus .stat .l{font-size:16px;color:#A9ADA6;margin-top:10px;}

  /* events */
  .cumulus .ev{display:flex;gap:22px;align-items:center;padding:24px 0;border-top:1px solid var(--line);transition:padding-left .25s;cursor:pointer;}
  .cumulus .ev:hover{padding-left:10px;}
  .cumulus .ev:last-child{border-bottom:1px solid var(--line);}
  .cumulus .ev .date{flex-shrink:0;width:84px;text-align:center;}
  .cumulus .ev .date .d{font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1;}
  .cumulus .ev .date .m{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--jade-deep);margin-top:4px;}
  .cumulus .ev .body{flex:1;}
  .cumulus .ev .body h4{font-size:20px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px;}
  .cumulus .ev .body p{font-size:14px;color:var(--muted);}
  .cumulus .ev .arrow{color:var(--muted);}

  /* CTA */
  .cumulus .closer{text-align:center;background:var(--mist);border-radius:32px;padding:80px 40px;}
  .cumulus .closer h2{margin-bottom:20px;}
  .cumulus .closer .lede{margin:0 auto 34px;}

  /* footer */
  .cumulus footer{border-top:1px solid var(--line);padding:56px 0 40px;}
  .cumulus .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:44px;}
  .cumulus .foot-brand{max-width:300px;}
  .cumulus .foot-brand p{font-size:14px;color:var(--muted);margin-top:14px;line-height:1.6;}
  .cumulus .foot-col h5{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;}
  .cumulus .foot-col a{display:block;font-size:15px;color:var(--ink);text-decoration:none;margin-bottom:11px;font-weight:500;}
  .cumulus .foot-col a:hover{color:var(--jade-deep);}
  .cumulus .foot-bottom{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted);padding-top:26px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .cumulus .nav-links{display:none;}
    .cumulus .prog-grid,.cumulus .band-grid{grid-template-columns:1fr;}
    .cumulus .wrap{padding:0 22px;}
    .cumulus .band{padding:44px 28px;}
  }`;
  function Ic({
    d
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const ARR = "M5 12h14M13 6l6 6-6 6";
  function Cumulus() {
    const sigs = [{
      t: "AI & Machine Learning",
      d: "Build models, read papers, and ship projects with a crew that learns together.",
      p: "M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z"
    }, {
      t: "Web & Product",
      d: "Design and launch real web apps with modern frameworks and friendly mentors.",
      p: "M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
    }, {
      t: "Cybersecurity",
      d: "Capture-the-flag practice and ethical hacking, from first exploit to first internship.",
      p: "M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"
    }, {
      t: "Game Dev",
      d: "From pixel art to engines — prototype, jam, and play your own games.",
      p: "M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z"
    }, {
      t: "Robotics",
      d: "Sensors, embedded systems, and autonomous builds for the curious tinkerer.",
      p: "M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01"
    }, {
      t: "Data Science",
      d: "Wrangle, visualize, and learn from real Hawaiʻi datasets that matter locally.",
      p: "M3 3v18h18M8 16V9M13 16V5M18 16v-4"
    }];
    const events = [{
      d: "14",
      m: "Feb",
      t: "Intro to Git & GitHub",
      s: "Workshop · POST 318B · 5:00 PM"
    }, {
      d: "28",
      m: "Feb",
      t: "Resume & LinkedIn Night",
      s: "Career · iLab · 6:00 PM"
    }, {
      d: "08",
      m: "Mar",
      t: "Spring Hackathon Kickoff",
      s: "48 hours · Campus Center · 9:00 AM"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "cumulus"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap nav-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--muted)',
        fontWeight: 500
      }
    }, "\xB7 M\u0101noa")), /*#__PURE__*/React.createElement("div", {
      className: "nav-links"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#"
    }, "Join us")))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "The largest CS community at UH M\u0101noa"), /*#__PURE__*/React.createElement("h1", null, "Where computing", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "soft"
    }, "finds its"), " people."), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "ACM at the University of Hawai\u02BBi at M\u0101noa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your future team."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#"
    }, "Become a member ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: "#"
    }, "Explore programs")), /*#__PURE__*/React.createElement("div", {
      className: "hero-vis"
    }, /*#__PURE__*/React.createElement("div", {
      className: "center-mark"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", null, "est. at UH M\u0101noa")), /*#__PURE__*/React.createElement("div", {
      className: "badge b1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "b-num"
    }, "7"), /*#__PURE__*/React.createElement("div", {
      className: "b-lbl"
    }, "Special Interest Groups")), /*#__PURE__*/React.createElement("div", {
      className: "badge b2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "b-num"
    }, "500+"), /*#__PURE__*/React.createElement("div", {
      className: "b-lbl"
    }, "Active members")), /*#__PURE__*/React.createElement("div", {
      className: "badge b3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "b-num"
    }, "50+"), /*#__PURE__*/React.createElement("div", {
      className: "b-lbl"
    }, "Events / year"))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h2", null, "Pick a lane. Or three."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "Every SIG is student-led and beginner-friendly. Show up, build something, and grow with people who are figuring it out alongside you.")), /*#__PURE__*/React.createElement("div", {
      className: "prog-grid"
    }, sigs.map((s, i) => /*#__PURE__*/React.createElement("div", {
      className: "prog",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: s.p
    })), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d), /*#__PURE__*/React.createElement("span", {
      className: "more"
    }, "Learn more ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "band"
    }, /*#__PURE__*/React.createElement("div", {
      className: "band-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Special Interest Groups, each member-run")), /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "500", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Students across every major on campus")), /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "50", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Workshops, socials & talks each year")))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "What's on"), /*#__PURE__*/React.createElement("h2", null, "Coming up next.")), /*#__PURE__*/React.createElement("div", null, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "ev",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "date"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d"
    }, e.d), /*#__PURE__*/React.createElement("div", {
      className: "m"
    }, e.m)), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, /*#__PURE__*/React.createElement("h4", null, e.t), /*#__PURE__*/React.createElement("p", null, e.s)), /*#__PURE__*/React.createElement("div", {
      className: "arrow"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "closer"
    }, /*#__PURE__*/React.createElement("h2", null, "New here? Perfect."), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "No experience required \u2014 just curiosity. Join the Discord, come to one event, and see what sticks."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#"
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })))))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM \xB7 M\u0101noa"), /*#__PURE__*/React.createElement("p", null, "Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa. Built by students, for students.")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Email")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "GitHub"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ACM Intl."), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICS Dept."))), /*#__PURE__*/React.createElement("div", {
      className: "foot-bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Made with aloha \uD83E\uDD19")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Cumulus
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionCumulus.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionInk.jsx
try { (() => {
/* ACM Mānoa redesign — Direction A2: "Ink"  (a clean/minimal sibling of Cumulus)
   Monochrome editorial-clean. White + near-black ink + warm gray, with ONE
   restrained clay accent used sparingly. Left-aligned asymmetric hero, crisp
   hairline rules, precise smaller radii. Schibsted Grotesk. */
(function () {
  const CSS = `
  .ink{ --paper:#FFFFFF; --ink:#111210; --soft:#3A3C38; --muted:#7A7C76; --line:#E6E5E0; --line2:#D8D7D1;
    --clay:#C04A2B; --wash:#F6F5F1;
    font-family:'Schibsted Grotesk',sans-serif; color:var(--ink); background:var(--paper); -webkit-font-smoothing:antialiased; line-height:1.55;}
  .ink *{box-sizing:border-box;margin:0;padding:0;}
  .ink img{display:block;max-width:100%;}
  .ink .wrap{max-width:1140px;margin:0 auto;padding:0 44px;}

  /* nav */
  .ink nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
  .ink .nav-in{display:flex;align-items:center;justify-content:space-between;height:70px;}
  .ink .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:17px;letter-spacing:-.02em;white-space:nowrap;}
  .ink .brand img{width:28px;height:28px;}
  .ink .brand .sep{color:var(--muted);font-weight:500;}
  .ink .nav-links{display:flex;gap:30px;align-items:center;}
  .ink .nav-links a{color:var(--soft);text-decoration:none;font-size:14.5px;font-weight:500;transition:color .2s;}
  .ink .nav-links a:hover{color:var(--ink);}
  .ink .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14.5px;border-radius:8px;padding:10px 18px;text-decoration:none;border:1px solid var(--ink);cursor:pointer;transition:all .18s;}
  .ink .btn-solid{background:var(--ink);color:#fff;}
  .ink .btn-solid:hover{background:var(--clay);border-color:var(--clay);}
  .ink .btn-line{background:transparent;color:var(--ink);}
  .ink .btn-line:hover{background:var(--ink);color:#fff;}

  /* hero — asymmetric left aligned */
  .ink .hero{padding:92px 0 72px;border-bottom:1px solid var(--line);}
  .ink .hero-grid{display:grid;grid-template-columns:1.35fr .8fr;gap:64px;align-items:end;}
  .ink .eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:30px;}
  .ink .eyebrow .dot{width:8px;height:8px;border-radius:50%;background:var(--clay);}
  .ink h1{font-size:clamp(46px,6.4vw,86px);line-height:1.0;letter-spacing:-.04em;font-weight:700;margin-bottom:0;}
  .ink h1 .soft{color:var(--muted);}
  .ink .hero-right{padding-bottom:8px;}
  .ink .hero-right .lede{font-size:18px;color:var(--soft);line-height:1.5;margin-bottom:26px;}
  .ink .hero-cta{display:flex;gap:11px;flex-wrap:wrap;}
  .ink .statstrip{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink);margin-top:64px;}
  .ink .statstrip .s{padding:26px 0 4px;border-right:1px solid var(--line);}
  .ink .statstrip .s:last-child{border-right:0;}
  .ink .statstrip .n{font-size:46px;font-weight:700;letter-spacing:-.04em;line-height:1;}
  .ink .statstrip .n em{color:var(--clay);font-style:normal;}
  .ink .statstrip .l{font-size:13.5px;color:var(--muted);margin-top:8px;}

  /* sections */
  .ink section{padding:88px 0;border-bottom:1px solid var(--line);}
  .ink .sec-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:46px;gap:30px;}
  .ink .sec-head .lhs{max-width:620px;}
  .ink .sec-tag{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .ink h2{font-size:clamp(30px,3.8vw,48px);letter-spacing:-.035em;line-height:1.04;font-weight:700;margin-bottom:14px;}
  .ink .sec-sub{font-size:17.5px;color:var(--soft);line-height:1.5;}
  .ink .sec-no{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap;}

  /* SIG list rows (editorial, not cards) */
  .ink .rows{border-top:1px solid var(--line2);}
  .ink .row{display:grid;grid-template-columns:40px 230px 1fr 28px;gap:26px;align-items:center;padding:24px 6px;border-bottom:1px solid var(--line);transition:background .18s,padding .18s;cursor:pointer;}
  .ink .row:hover{background:var(--wash);padding-left:16px;padding-right:16px;}
  .ink .row .no{font-size:14px;color:var(--clay);font-weight:700;}
  .ink .row .nm{font-size:22px;font-weight:700;letter-spacing:-.02em;}
  .ink .row .ds{font-size:15px;color:var(--muted);}
  .ink .row .ar{color:var(--muted);text-align:right;}
  .ink .row:hover .ar{color:var(--ink);}

  /* events */
  .ink .ev{display:grid;grid-template-columns:120px 1fr auto;gap:26px;align-items:center;padding:22px 6px;border-bottom:1px solid var(--line);}
  .ink .ev:first-child{border-top:1px solid var(--line2);}
  .ink .ev .dt{font-size:18px;font-weight:700;letter-spacing:-.01em;}
  .ink .ev .dt small{display:block;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:3px;}
  .ink .ev h4{font-size:19px;font-weight:700;letter-spacing:-.01em;}
  .ink .ev p{font-size:14px;color:var(--muted);margin-top:2px;}
  .ink .ev .tag{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line2);border-radius:6px;padding:6px 11px;}

  /* closer */
  .ink .closer{border-bottom:0;}
  .ink .closer .box{background:var(--ink);color:#fff;border-radius:18px;padding:72px 56px;display:flex;justify-content:space-between;align-items:center;gap:40px;flex-wrap:wrap;}
  .ink .closer h2{color:#fff;margin-bottom:8px;}
  .ink .closer p{color:rgba(255,255,255,.7);font-size:17px;max-width:42ch;}
  .ink .closer .btn-solid{background:#fff;color:var(--ink);border-color:#fff;}
  .ink .closer .btn-solid:hover{background:var(--clay);color:#fff;border-color:var(--clay);}

  /* footer */
  .ink footer{padding:54px 0 40px;}
  .ink .foot-grid{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
  .ink .foot-brand{max-width:300px;}
  .ink .foot-brand p{font-size:14px;color:var(--muted);margin-top:13px;line-height:1.6;}
  .ink .foot-col h5{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
  .ink .foot-col a{display:block;font-size:14.5px;color:var(--ink);text-decoration:none;margin-bottom:10px;font-weight:500;}
  .ink .foot-col a:hover{color:var(--clay);}
  .ink .foot-bottom{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);padding-top:24px;border-top:1px solid var(--line);}

  @media(max-width:760px){
    .ink .nav-links{display:none;}
    .ink .hero-grid{grid-template-columns:1fr;gap:32px;}
    .ink .statstrip{grid-template-columns:1fr;}
    .ink .statstrip .s{border-right:0;border-bottom:1px solid var(--line);}
    .ink .row{grid-template-columns:30px 1fr;}
    .ink .row .ds,.ink .row .ar{display:none;}
    .ink .ev{grid-template-columns:1fr;gap:6px;}
    .ink .wrap{padding:0 22px;}
  }`;
  function Ic({
    d
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const ARR = "M5 12h14M13 6l6 6-6 6";
  function Ink() {
    const sigs = [{
      nm: "AI & Machine Learning",
      d: "Build models, read papers, ship projects."
    }, {
      nm: "Web & Product",
      d: "Design and launch real apps with modern tools."
    }, {
      nm: "Cybersecurity",
      d: "CTF practice and ethical hacking, beginner to bounty."
    }, {
      nm: "Game Development",
      d: "Pixels to engines — make the game you'd play."
    }, {
      nm: "Robotics",
      d: "Sensors, embedded systems, machines that move."
    }, {
      nm: "Data Science",
      d: "Real Hawaiʻi datasets, honest visualizations."
    }];
    const events = [{
      d: "Feb 14",
      dy: "Fri",
      t: "Intro to Git & GitHub",
      s: "A hands-on first dive into version control.",
      k: "Workshop"
    }, {
      d: "Feb 28",
      dy: "Fri",
      t: "Resume & LinkedIn Night",
      s: "Portfolios reviewed by alumni and recruiters.",
      k: "Career"
    }, {
      d: "Mar 08",
      dy: "Sat",
      t: "Spring Hackathon",
      s: "Forty-eight hours. One idea. Build it.",
      k: "Flagship"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "ink"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap nav-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "/ M\u0101noa")), /*#__PURE__*/React.createElement("div", {
      className: "nav-links"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-solid",
      href: "#"
    }, "Join us")))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "The largest CS community at UH M\u0101noa"), /*#__PURE__*/React.createElement("h1", null, "Where", /*#__PURE__*/React.createElement("br", null), "computing", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "soft"
    }, "finds its"), " people.")), /*#__PURE__*/React.createElement("div", {
      className: "hero-right"
    }, /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "ACM at the University of Hawai\u02BBi at M\u0101noa is a home for builders, beginners, and the deeply curious. Find your group, ship your first project, meet your future team."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-solid",
      href: "#"
    }, "Become a member ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-line",
      href: "#"
    }, "Programs")))), /*#__PURE__*/React.createElement("div", {
      className: "statstrip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Special Interest Groups, member-run")), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "500", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Students across every major")), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "50", /*#__PURE__*/React.createElement("em", null, "+")), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Workshops, socials & talks a year"))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lhs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h2", null, "Pick a lane. Or three."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "Every SIG is student-led and beginner-friendly. Show up, build something, grow with people figuring it out alongside you.")), /*#__PURE__*/React.createElement("div", {
      className: "sec-no"
    }, "Seven chapters")), /*#__PURE__*/React.createElement("div", {
      className: "rows"
    }, sigs.map((s, i) => /*#__PURE__*/React.createElement("div", {
      className: "row",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "no"
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      className: "nm"
    }, s.nm), /*#__PURE__*/React.createElement("span", {
      className: "ds"
    }, s.d), /*#__PURE__*/React.createElement("span", {
      className: "ar"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lhs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "What's on"), /*#__PURE__*/React.createElement("h2", null, "Coming up next.")), /*#__PURE__*/React.createElement("div", {
      className: "sec-no"
    }, "Spring 2025")), /*#__PURE__*/React.createElement("div", null, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "ev",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "dt"
    }, e.d, /*#__PURE__*/React.createElement("small", null, e.dy)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, e.t), /*#__PURE__*/React.createElement("p", null, e.s)), /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, e.k)))))), /*#__PURE__*/React.createElement("section", {
      className: "closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "New here? Perfect."), /*#__PURE__*/React.createElement("p", null, "No experience required \u2014 just curiosity. Join the Discord, come to one event, and see what sticks.")), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-solid",
      href: "#"
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "/ M\u0101noa")), /*#__PURE__*/React.createElement("p", null, "Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa. Built by students, for students.")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Email")), /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, "Resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "GitHub"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ACM Intl."))), /*#__PURE__*/React.createElement("div", {
      className: "foot-bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Made with aloha")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Ink
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionInk.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionPress.jsx
try { (() => {
/* ACM Mānoa redesign — Direction B: "Press"
   Bold editorial. A campus computing journal: oversized high-contrast serif
   display, grotesk UI, paper + ink + one electric coral. Hairline rules,
   numbered index, asymmetric magazine grid. Reinvented from scratch. */
(function () {
  const CSS = `
  .press{ --paper:#F6F4EE; --ink:#15120E; --coral:#FF3A17; --muted:#6B665C; --line:#1B1813;
    font-family:'Archivo',sans-serif; color:var(--ink); background:var(--paper);
    -webkit-font-smoothing:antialiased; line-height:1.5;}
  .press *{box-sizing:border-box;margin:0;padding:0;}
  .press img{display:block;max-width:100%;}
  .press .wrap{max-width:1180px;margin:0 auto;padding:0 44px;}
  .press .serif{font-family:'Instrument Serif',Georgia,serif;font-weight:400;}

  /* masthead */
  .press .masthead{border-bottom:2px solid var(--ink);}
  .press .mast-top{display:flex;justify-content:space-between;align-items:center;
    font-size:12px;letter-spacing:.14em;text-transform:uppercase;padding:11px 0;border-bottom:1px solid var(--ink);font-weight:600;}
  .press .mast-main{display:flex;justify-content:space-between;align-items:flex-end;padding:20px 0 22px;}
  .press .logo-wm{font-family:'Instrument Serif',serif;font-size:64px;line-height:.86;letter-spacing:-.01em;display:flex;align-items:center;gap:16px;}
  .press .logo-wm img{width:52px;height:52px;}
  .press .mast-nav{display:flex;gap:26px;align-items:center;padding-bottom:8px;}
  .press .mast-nav a{color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;letter-spacing:.02em;}
  .press .mast-nav a:hover{color:var(--coral);}

  /* hero */
  .press .hero{padding:64px 0 40px;border-bottom:1px solid var(--ink);}
  .press .kicker{font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);margin-bottom:26px;}
  .press .hero h1{font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(56px,10vw,132px);
    line-height:.92;letter-spacing:-.015em;margin-bottom:34px;}
  .press .hero h1 em{font-style:italic;color:var(--coral);}
  .press .hero-cols{display:grid;grid-template-columns:1.4fr 1fr;gap:54px;align-items:start;padding-top:8px;}
  .press .hero-lede{font-size:21px;line-height:1.5;}
  .press .hero-lede .drop{font-family:'Instrument Serif',serif;float:left;font-size:74px;line-height:.7;padding:8px 12px 0 0;color:var(--coral);}
  .press .hero-meta{font-size:14px;line-height:1.7;border-left:2px solid var(--ink);padding-left:22px;}
  .press .hero-meta b{display:block;text-transform:uppercase;letter-spacing:.1em;font-size:12px;margin:0 0 4px;}
  .press .hero-meta .row{padding:11px 0;border-bottom:1px solid rgba(27,24,19,.18);}
  .press .hero-cta{margin-top:22px;display:flex;gap:12px;flex-wrap:wrap;}
  .press .btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:14px;letter-spacing:.02em;
    text-decoration:none;padding:13px 22px;border:2px solid var(--ink);cursor:pointer;transition:all .18s;text-transform:uppercase;}
  .press .btn-fill{background:var(--ink);color:var(--paper);}
  .press .btn-fill:hover{background:var(--coral);border-color:var(--coral);}
  .press .btn-line:hover{background:var(--ink);color:var(--paper);}

  /* cover strip */
  .press .cover{height:340px;margin:0;background:var(--ink);color:var(--paper);position:relative;overflow:hidden;
    display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--ink);}
  .press .cover .big{font-family:'Instrument Serif',serif;font-size:clamp(80px,18vw,240px);line-height:1;letter-spacing:-.02em;opacity:.96;}
  .press .cover .big em{font-style:italic;color:var(--coral);}
  .press .cover .tag{position:absolute;bottom:20px;left:44px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#B9B3A6;}
  .press .cover .tag2{position:absolute;top:20px;right:44px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#B9B3A6;}

  /* section header */
  .press .sec{padding:72px 0;border-bottom:1px solid var(--ink);}
  .press .sec-bar{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:42px;}
  .press .sec-bar h2{font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(34px,5vw,60px);letter-spacing:-.01em;line-height:1;}
  .press .sec-bar .no{font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted);}

  /* index list (SIGs) */
  .press .idx .item{display:grid;grid-template-columns:78px 1fr 1.3fr 40px;gap:24px;align-items:center;
    padding:26px 0;border-top:1px solid rgba(27,24,19,.2);cursor:pointer;transition:background .2s,padding .2s;}
  .press .idx .item:hover{background:var(--ink);color:var(--paper);padding-left:14px;padding-right:14px;}
  .press .idx .item:hover .ix,.press .idx .item:hover .desc{color:#C9C3B6;}
  .press .idx .item:hover .arr{color:var(--coral);}
  .press .idx .ix{font-family:'Instrument Serif',serif;font-size:40px;color:var(--coral);line-height:1;}
  .press .idx .nm{font-family:'Instrument Serif',serif;font-size:30px;line-height:1.04;letter-spacing:-.01em;}
  .press .idx .desc{font-size:15px;color:var(--muted);line-height:1.5;}
  .press .idx .arr{text-align:right;}

  /* manifesto */
  .press .manifesto{background:var(--coral);color:var(--paper);}
  .press .manifesto .wrap{padding:88px 44px;}
  .press .manifesto p{font-family:'Instrument Serif',serif;font-size:clamp(30px,4.4vw,58px);line-height:1.08;letter-spacing:-.01em;max-width:20ch;}
  .press .manifesto p em{font-style:italic;}
  .press .manifesto .by{margin-top:44px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;}

  /* agenda */
  .press .agenda .ev{display:grid;grid-template-columns:160px 1fr auto;gap:26px;align-items:center;
    padding:24px 0;border-top:1px solid rgba(27,24,19,.2);}
  .press .agenda .ev .dt{font-family:'Instrument Serif',serif;font-size:24px;}
  .press .agenda .ev .dt small{display:block;font-family:'Archivo';font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:3px;}
  .press .agenda .ev h4{font-size:21px;font-weight:700;letter-spacing:-.01em;}
  .press .agenda .ev p{font-size:14px;color:var(--muted);margin-top:3px;}
  .press .agenda .ev .pill{border:1.5px solid var(--ink);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;}

  /* footer */
  .press footer{padding:60px 0 40px;}
  .press .foot-top{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;align-items:flex-start;}
  .press .foot-wm{font-family:'Instrument Serif',serif;font-size:80px;line-height:.85;}
  .press .foot-cols{display:flex;gap:54px;flex-wrap:wrap;}
  .press .foot-cols h5{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:14px;}
  .press .foot-cols a{display:block;font-size:15px;color:var(--ink);text-decoration:none;margin-bottom:9px;font-weight:500;}
  .press .foot-cols a:hover{color:var(--coral);}
  .press .foot-rule{margin-top:46px;padding-top:20px;border-top:2px solid var(--ink);display:flex;justify-content:space-between;
    font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;}

  @media(max-width:760px){
    .press .mast-nav,.press .mast-top span:nth-child(2){display:none;}
    .press .hero-cols{grid-template-columns:1fr;gap:28px;}
    .press .idx .item{grid-template-columns:48px 1fr;}
    .press .idx .item .desc,.press .idx .item .arr{display:none;}
    .press .agenda .ev{grid-template-columns:1fr;gap:6px;}
    .press .wrap{padding:0 22px;}
  }`;
  function Press() {
    const sigs = [{
      nm: "Artificial Intelligence",
      d: "Models, papers, and projects. From first notebook to published demo."
    }, {
      nm: "Web & Product",
      d: "Ship real apps with modern tooling and a room full of collaborators."
    }, {
      nm: "Cybersecurity",
      d: "Capture-the-flag nights and ethical hacking, beginner to bounty."
    }, {
      nm: "Game Development",
      d: "Pixels, engines, and game jams — make the thing you want to play."
    }, {
      nm: "Robotics",
      d: "Sensors, embedded systems, and autonomous machines that move."
    }, {
      nm: "Data Science",
      d: "Local Hawaiʻi datasets, real questions, honest visualizations."
    }];
    const events = [{
      d: "Feb. 14",
      dy: "Friday",
      t: "Intro to Git & GitHub",
      s: "A hands-on first dive into version control.",
      k: "Workshop"
    }, {
      d: "Feb. 28",
      dy: "Friday",
      t: "Resume & LinkedIn Night",
      s: "Portfolios reviewed by alumni and recruiters.",
      k: "Career"
    }, {
      d: "Mar. 08",
      dy: "Saturday",
      t: "Spring Hackathon",
      s: "Forty-eight hours. One idea. Build it.",
      k: "Flagship"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "press"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "masthead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mast-top"
    }, /*#__PURE__*/React.createElement("span", null, "Honolulu, Hawai\u02BBi"), /*#__PURE__*/React.createElement("span", null, "The Computing Quarterly \xB7 UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Vol. XXV \u2014 2025")), /*#__PURE__*/React.createElement("div", {
      className: "mast-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo-wm"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), "ACM M\u0101noa"), /*#__PURE__*/React.createElement("div", {
      className: "mast-nav"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Join"))))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "kicker"
    }, "The Association for Computing Machinery"), /*#__PURE__*/React.createElement("h1", null, "Code, community,", /*#__PURE__*/React.createElement("br", null), "and the ", /*#__PURE__*/React.createElement("em", null, "occasional"), /*#__PURE__*/React.createElement("br", null), "all-nighter."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-lede"
    }, /*#__PURE__*/React.createElement("span", {
      className: "drop"
    }, "F"), "or every student at the University of Hawai\u02BBi at M\u0101noa who has ever wanted to build something \u2014 and didn't want to do it alone. We are the island's largest computing community, and the door is wide open.", /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-fill",
      href: "#"
    }, "Become a member"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-line",
      href: "#"
    }, "Read the events"))), /*#__PURE__*/React.createElement("div", {
      className: "hero-meta"
    }, /*#__PURE__*/React.createElement("b", null, "In this issue"), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, "Seven student-led Special Interest Groups"), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, "500+ members across every major"), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, "Fifty-plus events, talks & socials a year"), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, "No experience necessary \u2014 truly"))))), /*#__PURE__*/React.createElement("div", {
      className: "cover"
    }, /*#__PURE__*/React.createElement("div", {
      className: "big"
    }, "acm", /*#__PURE__*/React.createElement("em", null, ".")), /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, "A student computing collective"), /*#__PURE__*/React.createElement("span", {
      className: "tag2"
    }, "Est. at UH M\u0101noa")), /*#__PURE__*/React.createElement("section", {
      className: "sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-bar"
    }, /*#__PURE__*/React.createElement("h2", null, "Special Interest Groups"), /*#__PURE__*/React.createElement("span", {
      className: "no"
    }, "Index \u2014 01 / Seven chapters")), /*#__PURE__*/React.createElement("div", {
      className: "idx"
    }, sigs.map((s, i) => /*#__PURE__*/React.createElement("div", {
      className: "item",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "ix"
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      className: "nm"
    }, s.nm), /*#__PURE__*/React.createElement("span", {
      className: "desc"
    }, s.d), /*#__PURE__*/React.createElement("span", {
      className: "arr"
    }, "\u2192")))))), /*#__PURE__*/React.createElement("section", {
      className: "manifesto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("p", null, "We believe the best way to learn to build is to ", /*#__PURE__*/React.createElement("em", null, "build, together,"), " in public."), /*#__PURE__*/React.createElement("div", {
      className: "by"
    }, "\u2014 The ACM M\u0101noa charter"))), /*#__PURE__*/React.createElement("section", {
      className: "sec agenda"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-bar"
    }, /*#__PURE__*/React.createElement("h2", null, "The Agenda"), /*#__PURE__*/React.createElement("span", {
      className: "no"
    }, "Index \u2014 02 / Upcoming")), events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "ev",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "dt"
    }, e.d, /*#__PURE__*/React.createElement("small", null, e.dy)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, e.t), /*#__PURE__*/React.createElement("p", null, e.s)), /*#__PURE__*/React.createElement("span", {
      className: "pill"
    }, e.k))))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-wm"
    }, "ACM", /*#__PURE__*/React.createElement("br", null), "M\u0101noa"), /*#__PURE__*/React.createElement("div", {
      className: "foot-cols"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "About"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Sponsors")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Email")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ICSpace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "GitHub"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "ACM International")))), /*#__PURE__*/React.createElement("div", {
      className: "foot-rule"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Printed with aloha")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Press
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionPress.jsx", error: String((e && e.message) || e) }); }

// redesign/DirectionTerminal.jsx
try { (() => {
/* ACM Mānoa redesign — Direction C: "Terminal"
   Playful + techy. A developer console: monospace everything, near-black
   canvas, phosphor-lime accent + cyan, window chrome, a command-line hero,
   SIGs as installable packages, events as a log. Reinvented from scratch. */
(function () {
  const CSS = `
  .term{ --bg:#0A0D0A; --panel:#0F140F; --panel2:#131A13; --line:#23301F;
    --lime:#B6FF3D; --cyan:#5BE9FF; --amber:#FFB13D; --txt:#CBD6C4; --bright:#EAF4E4; --dim:#74866D;
    font-family:'JetBrains Mono',ui-monospace,monospace; color:var(--txt); background:var(--bg);
    -webkit-font-smoothing:antialiased; line-height:1.6; font-size:14px;}
  .term *{box-sizing:border-box;margin:0;padding:0;}
  .term img{display:block;max-width:100%;}
  .term .wrap{max-width:1100px;margin:0 auto;padding:0 36px;}
  .term a{color:inherit;text-decoration:none;}
  .term .lime{color:var(--lime);} .term .cyan{color:var(--cyan);} .term .dim{color:var(--dim);} .term .amber{color:var(--amber);}

  /* top window bar */
  .term .topbar{position:sticky;top:0;z-index:20;background:var(--panel);border-bottom:1px solid var(--line);}
  .term .tb-in{display:flex;align-items:center;gap:16px;height:46px;}
  .term .lights{display:flex;gap:7px;}
  .term .lights i{width:11px;height:11px;border-radius:50%;display:block;}
  .term .lights .r{background:#FF5F57;} .term .lights .y{background:#FEBC2E;} .term .lights .g{background:#28C840;}
  .term .tb-path{font-size:13px;color:var(--dim);}
  .term .tb-path b{color:var(--bright);font-weight:400;}
  .term .tb-nav{margin-left:auto;display:flex;gap:22px;font-size:13px;}
  .term .tb-nav a{color:var(--dim);transition:color .15s;}
  .term .tb-nav a:hover{color:var(--lime);}
  .term .tb-nav a::before{content:'#';color:var(--line);margin-right:1px;}
  .term .tb-nav a:hover::before{color:var(--lime);}

  /* hero */
  .term .hero{padding:72px 0 60px;}
  .term .prompt{font-size:14px;margin-bottom:8px;}
  .term .prompt .usr{color:var(--lime);} .term .prompt .pth{color:var(--cyan);}
  .term .cmd{color:var(--bright);}
  .term .cursor{display:inline-block;width:9px;height:18px;background:var(--lime);vertical-align:-3px;margin-left:3px;animation:blink 1.05s steps(1) infinite;}
  @keyframes blink{50%{opacity:0;}}
  .term h1{font-size:clamp(38px,6.5vw,76px);line-height:1.02;letter-spacing:-.02em;color:var(--bright);font-weight:800;margin:30px 0 22px;}
  .term h1 .hl{color:var(--lime);}
  .term .hero p{font-size:16px;max-width:60ch;color:var(--txt);margin-bottom:30px;}
  .term .hero p .tok{color:var(--cyan);}
  .term .hero-cta{display:flex;gap:12px;flex-wrap:wrap;}
  .term .btn{display:inline-flex;align-items:center;gap:9px;font-family:inherit;font-size:14px;font-weight:700;
    padding:12px 20px;border-radius:8px;border:1px solid var(--line);cursor:pointer;transition:all .16s;}
  .term .btn-lime{background:var(--lime);color:#0A0D0A;border-color:var(--lime);}
  .term .btn-lime:hover{box-shadow:0 0 0 3px rgba(182,255,61,.22);transform:translateY(-1px);}
  .term .btn-line{background:transparent;color:var(--bright);}
  .term .btn-line:hover{border-color:var(--lime);color:var(--lime);}

  /* output panel */
  .term .panel{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden;}
  .term .panel-bar{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--line);background:var(--panel2);font-size:12px;color:var(--dim);}
  .term .panel-bar .dotrow{display:flex;gap:6px;}
  .term .panel-bar .dotrow i{width:9px;height:9px;border-radius:50%;background:var(--line);display:block;}
  .term .panel-body{padding:20px 22px;}

  .term .hero-grid{display:grid;grid-template-columns:1.2fr .9fr;gap:40px;align-items:center;}
  .term .statline{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed var(--line);font-size:13px;}
  .term .statline:last-child{border-bottom:0;}
  .term .statline .v{color:var(--lime);font-weight:700;}
  .term .mark{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .term .mark img{width:40px;height:40px;}
  .term .mark span{color:var(--bright);font-weight:700;}

  /* section */
  .term .sec{padding:66px 0;border-top:1px solid var(--line);}
  .term .sec-head{margin-bottom:30px;}
  .term .sec-head .run{font-size:13px;color:var(--dim);margin-bottom:10px;}
  .term .sec-head .run .lime{color:var(--lime);}
  .term .sec-head h2{font-size:clamp(26px,3.6vw,40px);color:var(--bright);letter-spacing:-.01em;font-weight:800;}

  /* packages (SIGs) */
  .term .pkgs{display:flex;flex-direction:column;}
  .term .pkg{display:grid;grid-template-columns:26px 200px 70px 1fr 110px;gap:16px;align-items:center;
    padding:16px 14px;border:1px solid transparent;border-radius:9px;transition:all .16s;cursor:pointer;font-size:13.5px;}
  .term .pkg:hover{background:var(--panel);border-color:var(--line);}
  .term .pkg .ok{color:var(--lime);}
  .term .pkg .nm{color:var(--bright);font-weight:700;}
  .term .pkg .ver{color:var(--dim);}
  .term .pkg .ds{color:var(--txt);}
  .term .pkg .inst{text-align:right;color:var(--dim);}
  .term .pkg:hover .inst{color:var(--cyan);}

  /* join code block */
  .term .code .panel-body{font-size:13.5px;line-height:1.9;}
  .term .code .ln{white-space:pre-wrap;}
  .term .code .c{color:var(--dim);} .term .code .k{color:var(--cyan);} .term .code .s{color:var(--amber);} .term .code .f{color:var(--lime);}

  /* events log */
  .term .log .row{display:grid;grid-template-columns:128px 92px 1fr auto;gap:16px;padding:13px 0;border-bottom:1px solid var(--line);font-size:13.5px;align-items:center;}
  .term .log .row:last-child{border-bottom:0;}
  .term .log .ts{color:var(--dim);}
  .term .log .lvl{font-weight:700;}
  .term .log .lvl.ok{color:var(--lime);} .term .log .lvl.info{color:var(--cyan);} .term .log .lvl.warn{color:var(--amber);}
  .term .log .msg{color:var(--bright);}
  .term .log .loc{color:var(--dim);}

  /* closer */
  .term .closer{text-align:center;}
  .term .closer h2{font-size:clamp(28px,4vw,46px);color:var(--bright);font-weight:800;margin-bottom:14px;letter-spacing:-.01em;}
  .term .closer h2 .hl{color:var(--lime);}
  .term .closer p{color:var(--txt);max-width:54ch;margin:0 auto 26px;}
  .term .closer .hero-cta{justify-content:center;}

  /* footer status bar */
  .term footer{border-top:1px solid var(--line);}
  .term .foot-cols{display:flex;gap:60px;flex-wrap:wrap;padding:48px 0 36px;}
  .term .foot-cols .mark{align-items:flex-start;}
  .term .foot-cols h5{color:var(--dim);font-size:12px;margin-bottom:12px;}
  .term .foot-cols a{display:block;color:var(--txt);margin-bottom:8px;font-size:13.5px;}
  .term .foot-cols a:hover{color:var(--lime);}
  .term .statusbar{background:var(--lime);color:#0A0D0A;font-size:12.5px;font-weight:700;padding:8px 0;}
  .term .statusbar .wrap{display:flex;justify-content:space-between;}

  @media(max-width:760px){
    .term .tb-nav{display:none;}
    .term .hero-grid{grid-template-columns:1fr;}
    .term .pkg{grid-template-columns:20px 1fr auto;}
    .term .pkg .ver,.term .pkg .ds{display:none;}
    .term .log .row{grid-template-columns:1fr;gap:2px;}
    .term .wrap{padding:0 20px;}
  }`;
  function Term() {
    const pkgs = [{
      nm: "sig-ai",
      ver: "v2.4",
      ds: "machine learning · research · demos",
      inst: "500★"
    }, {
      nm: "sig-web",
      ver: "v3.1",
      ds: "full-stack · frameworks · ship it",
      inst: "480★"
    }, {
      nm: "sig-security",
      ver: "v1.8",
      ds: "ctf · ethical hacking · blue team",
      inst: "310★"
    }, {
      nm: "sig-gamedev",
      ver: "v1.2",
      ds: "engines · pixel art · game jams",
      inst: "260★"
    }, {
      nm: "sig-robotics",
      ver: "v0.9",
      ds: "embedded · sensors · autonomy",
      inst: "190★"
    }, {
      nm: "sig-data",
      ver: "v2.0",
      ds: "analytics · viz · local datasets",
      inst: "240★"
    }];
    const log = [{
      ts: "Feb 14 17:00",
      lvl: "ok",
      cls: "ok",
      msg: "Intro to Git & GitHub",
      loc: "POST 318B"
    }, {
      ts: "Feb 28 18:00",
      lvl: "info",
      cls: "info",
      msg: "Resume & LinkedIn Night",
      loc: "iLab"
    }, {
      ts: "Mar 08 09:00",
      lvl: "warn",
      cls: "warn",
      msg: "Spring Hackathon [48h]",
      loc: "Campus Center"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "term"
    }, /*#__PURE__*/React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: CSS
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap tb-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lights"
    }, /*#__PURE__*/React.createElement("i", {
      className: "r"
    }), /*#__PURE__*/React.createElement("i", {
      className: "y"
    }), /*#__PURE__*/React.createElement("i", {
      className: "g"
    })), /*#__PURE__*/React.createElement("div", {
      className: "tb-path"
    }, "acm@manoa: ", /*#__PURE__*/React.createElement("b", null, "~/welcome")), /*#__PURE__*/React.createElement("div", {
      className: "tb-nav"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "about"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "sponsors"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "join")))), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "prompt"
    }, /*#__PURE__*/React.createElement("span", {
      className: "usr"
    }, "acm@manoa"), /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, ":"), /*#__PURE__*/React.createElement("span", {
      className: "pth"
    }, "~"), /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "$ "), /*#__PURE__*/React.createElement("span", {
      className: "cmd"
    }, "./welcome --new-student")), /*#__PURE__*/React.createElement("h1", null, "Compile your", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "hl"
    }, "people"), " here."), /*#__PURE__*/React.createElement("p", null, "The Association for Computing Machinery at UH M\u0101noa is the island's largest computing community. ", /*#__PURE__*/React.createElement("span", {
      className: "tok"
    }, "$ no_experience"), " required \u2014 clone a group, push your first project, merge with people who'll catch your bugs."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-lime",
      href: "#"
    }, "\u25B6 run join.sh"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-line",
      href: "#"
    }, "cat programs/")), /*#__PURE__*/React.createElement("div", {
      className: "prompt",
      style: {
        marginTop: '22px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "$ "), /*#__PURE__*/React.createElement("span", {
      className: "cursor"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dotrow"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), " stats.json"), /*#__PURE__*/React.createElement("div", {
      className: "panel-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mark"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", null, "acm-manoa")), /*#__PURE__*/React.createElement("div", {
      className: "statline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "special_interest_groups"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, "7")), /*#__PURE__*/React.createElement("div", {
      className: "statline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "active_members"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, "500+")), /*#__PURE__*/React.createElement("div", {
      className: "statline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "events_per_year"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, "50+")), /*#__PURE__*/React.createElement("div", {
      className: "statline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "majors_welcome"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, "all")), /*#__PURE__*/React.createElement("div", {
      className: "statline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "status"), /*#__PURE__*/React.createElement("span", {
      className: "cyan"
    }, "\u25CF open \xB7 accepting"))))))), /*#__PURE__*/React.createElement("section", {
      className: "sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "run"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lime"
    }, "$"), " acm sigs --list ", /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "// 7 packages available")), /*#__PURE__*/React.createElement("h2", null, "Install a Special Interest Group")), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dotrow"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), " registry \u2014 student-led, beginner-safe"), /*#__PURE__*/React.createElement("div", {
      className: "panel-body pkgs"
    }, pkgs.map((p, i) => /*#__PURE__*/React.createElement("div", {
      className: "pkg",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "ok"
    }, "\u2713"), /*#__PURE__*/React.createElement("span", {
      className: "nm"
    }, p.nm), /*#__PURE__*/React.createElement("span", {
      className: "ver"
    }, p.ver), /*#__PURE__*/React.createElement("span", {
      className: "ds"
    }, p.ds), /*#__PURE__*/React.createElement("span", {
      className: "inst"
    }, p.inst, " \xB7 install \u2192"))))))), /*#__PURE__*/React.createElement("section", {
      className: "sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "run"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lime"
    }, "$"), " cat join.sh"), /*#__PURE__*/React.createElement("h2", null, "Joining takes one command")), /*#__PURE__*/React.createElement("div", {
      className: "panel code"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dotrow"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), " join.sh"), /*#__PURE__*/React.createElement("div", {
      className: "panel-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, /*#__PURE__*/React.createElement("span", {
      className: "c"
    }, "# no application, no fees, no gatekeeping")), /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, /*#__PURE__*/React.createElement("span", {
      className: "k"
    }, "join"), " ", /*#__PURE__*/React.createElement("span", {
      className: "s"
    }, "\"acm-manoa\""), " \\"), /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, "  ", "--discord ", /*#__PURE__*/React.createElement("span", {
      className: "f"
    }, "connect"), " \\"), /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, "  ", "--event ", /*#__PURE__*/React.createElement("span", {
      className: "s"
    }, "\"any\""), " \\"), /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, "  ", "--major ", /*#__PURE__*/React.createElement("span", {
      className: "s"
    }, "\"*\"")), /*#__PURE__*/React.createElement("div", {
      className: "ln"
    }, /*#__PURE__*/React.createElement("span", {
      className: "c"
    }, "# \u2192 welcome aboard. see you Friday.")))))), /*#__PURE__*/React.createElement("section", {
      className: "sec log"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "run"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lime"
    }, "$"), " tail -f events.log"), /*#__PURE__*/React.createElement("h2", null, "What's running next")), log.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "row",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "ts"
    }, e.ts), /*#__PURE__*/React.createElement("span", {
      className: "lvl " + e.cls
    }, "[", e.lvl.toUpperCase(), "]"), /*#__PURE__*/React.createElement("span", {
      className: "msg"
    }, e.msg), /*#__PURE__*/React.createElement("span", {
      className: "loc"
    }, "@ ", e.loc))))), /*#__PURE__*/React.createElement("section", {
      className: "sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("h2", null, "$ ", /*#__PURE__*/React.createElement("span", {
      className: "hl"
    }, "whoami"), " \u2192 future you"), /*#__PURE__*/React.createElement("p", null, "Curiosity is the only prerequisite. Drop into the Discord, show up to one event, and start building."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-lime",
      href: "#"
    }, "\u25B6 run join.sh"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-line",
      href: "#"
    }, "./discord")))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap foot-cols"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: '200px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mark"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../assets/acm_logo.png",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", null, "acm-manoa")), /*#__PURE__*/React.createElement("p", {
      className: "dim",
      style: {
        fontSize: '13px'
      }
    }, "// built by students at the", /*#__PURE__*/React.createElement("br", null), "University of Hawai\u02BBi at M\u0101noa")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "// explore"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "about"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "programs"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "events"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "sponsors")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "// connect"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "discord"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "linkedin"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "email")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "// resources"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "icspace"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "github"), /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "acm.org"))), /*#__PURE__*/React.createElement("div", {
      className: "statusbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("span", null, "\u25CF acm@manoa \u2014 connected"), /*#__PURE__*/React.createElement("span", null, "\xA9 2025 \xB7 made with aloha")))));
  }
  window.ACMRedesign = Object.assign(window.ACMRedesign || {}, {
    Term
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/DirectionTerminal.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/about.jsx
try { (() => {
/* ACM Mānoa Air site — About */
(function () {
  const {
    useState
  } = React;
  function Faq({
    items
  }) {
    const {
      Ic
    } = window.AirShell;
    const [open, setOpen] = useState(0);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '760px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    }, items.map((it, i) => {
      const on = open === i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: 'var(--card)',
          border: '1px solid var(--line)',
          borderRadius: '18px',
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setOpen(on ? -1 : i),
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '20px 24px',
          background: on ? 'var(--wash)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          fontWeight: 700,
          color: 'var(--ink)',
          textAlign: 'left'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '17px'
        }
      }, it.q), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--peri-d)',
          transform: on ? 'rotate(45deg)' : 'none',
          transition: 'transform .2s',
          flexShrink: 0,
          marginLeft: '16px'
        }
      }, /*#__PURE__*/React.createElement(Ic, {
        d: "M12 5v14M5 12h14",
        s: 20
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateRows: on ? '1fr' : '0fr',
          transition: 'grid-template-rows .25s ease'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          padding: '16px 24px 22px',
          color: 'var(--soft)',
          fontSize: '15.5px',
          lineHeight: 1.65
        }
      }, it.a))));
    }));
  }
  function About() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const {
      board,
      faqs
    } = window.ACMData;
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/about"
    }), /*#__PURE__*/React.createElement("header", {
      className: "subhero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "About us"), /*#__PURE__*/React.createElement("h1", null, "Students, building together."), /*#__PURE__*/React.createElement("p", null, "ACM M\u0101noa is the largest computer science student organization at the University of Hawai\u02BBi at M\u0101noa \u2014 an official ACM chapter and a home for everyone curious about computing."))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "prose"
    }, /*#__PURE__*/React.createElement("p", null, "The Association for Computing Machinery at UH M\u0101noa welcomes students of all backgrounds and experience levels. We exist to bridge the gap between students and Hawai\u02BBi's growing tech industry \u2014 through social, professional, and technical enrichment."), /*#__PURE__*/React.createElement("p", null, "Our Special Interest Groups put students in the driver's seat, leading the projects, workshops, and events that make the organization grow alongside its members' interests."))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Leadership"), /*#__PURE__*/React.createElement("h2", null, "Meet the board.")), /*#__PURE__*/React.createElement("div", {
      className: "people"
    }, board.map((p, i) => /*#__PURE__*/React.createElement("div", {
      className: "person",
      key: i
    }, /*#__PURE__*/React.createElement("img", {
      className: "av",
      src: "../../assets/default_user.svg",
      alt: p.name
    }), /*#__PURE__*/React.createElement("h4", null, p.name), /*#__PURE__*/React.createElement("span", {
      className: "role"
    }, p.role)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Questions"), /*#__PURE__*/React.createElement("h2", null, "Frequently asked.")), /*#__PURE__*/React.createElement(Faq, {
      items: faqs
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Come build with us."), /*#__PURE__*/React.createElement("p", null, "Membership is free and open to every major. Join the Discord and introduce yourself \u2014 we're glad you're here."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    About
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/about.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/data.js
try { (() => {
/* ACM Mānoa — site data (mirrors the Django models: SIGS, SIGSLeadership,
   Event, Leadership, FAQ, Sponsor). Representative content for the prototype;
   swap in the real DB values freely. */
(function () {
  // --- color helpers, matching SIGS.get_secondary_color / get_light_color ---
  const hx = h => h.replace('#', '');
  const rgb = h => [0, 2, 4].map(i => parseInt(hx(h).slice(i, i + 2), 16));
  const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const secondary = h => {
    const [r, g, b] = rgb(h);
    return toHex(r * 0.8, g * 0.8, b * 0.8);
  };
  const light = h => {
    const [r, g, b] = rgb(h);
    return toHex(255 * 0.9 + r * 0.1, 255 * 0.9 + g * 0.1, 255 * 0.9 + b * 0.1);
  };
  // CSS-variable bundle to theme any subtree by a SIG's brand color
  const themeVars = h => ({
    '--sig': h,
    '--sig-d': secondary(h),
    '--sig-light': light(h)
  });

  // icon paths (stroke, 24x24)
  const I = {
    ai: 'M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 4 7 4 4 0 0 0 8 0 4 4 0 0 0 4-7 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z',
    web: 'M3 9h18M9 21V9M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z',
    security: 'M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z',
    gamedev: 'M6 12h4M8 10v4M15 11h.01M18 13h.01M7 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 3 3 0 0 1-2.2-1l-.8-.9H10l-.8.9A3 3 0 0 1 7 17a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z',
    robotics: 'M12 3v3M9 9h6a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a3 3 0 0 1 3-3ZM9 14h.01M15 14h.01',
    data: 'M3 3v18h18M8 16V9M13 16V5M18 16v-4',
    cp: 'M8 6l-6 6 6 6M16 6l6 6-6 6'
  };
  const sigs = [{
    slug: 'ai',
    name: 'SIG-AI',
    full: 'Artificial Intelligence',
    color: '#7C3AED',
    icon: I.ai,
    tagline: 'Build models, read papers, and ship intelligent projects together.',
    about: ['SIG-AI is where curious students dive into machine learning — from your first linear regression to fine-tuning transformers. We balance hands-on projects with friendly paper-reading sessions so theory and practice grow together.', 'No prior ML experience needed. Bring a laptop and a question, and we will point you at a project, a teammate, and a mentor who has been exactly where you are.'],
    meeting: {
      days: 'Wednesdays',
      time: '5:00 – 6:30 PM',
      location: 'POST 318B'
    },
    links: {
      discord: '#',
      instagram: '#',
      github: '#',
      website: '#',
      link_name: 'Project gallery'
    },
    leadership: [{
      name: 'Kai Nakamura',
      role: 'SIG Lead'
    }, {
      name: 'Mei Tanaka',
      role: 'Projects'
    }, {
      name: 'Dev Patel',
      role: 'Workshops'
    }]
  }, {
    slug: 'web',
    name: 'SIG-Web',
    full: 'Web Development',
    color: '#2563EB',
    icon: I.web,
    tagline: 'Design and launch real web apps with modern frameworks.',
    about: ['SIG-Web ships things. We build and deploy real applications — portfolios, club tools, hackathon projects — using the same modern stacks teams use in industry.', 'Whether you are writing your first HTML tag or architecting a full-stack app, you will find a project to contribute to and people happy to pair with you.'],
    meeting: {
      days: 'Mondays',
      time: '6:00 – 7:30 PM',
      location: 'POST 319'
    },
    links: {
      discord: '#',
      instagram: '#',
      github: '#',
      website: '#',
      link_name: 'Visit site'
    },
    leadership: [{
      name: 'Leilani Cruz',
      role: 'SIG Lead'
    }, {
      name: 'Marcus Lee',
      role: 'Frontend'
    }]
  }, {
    slug: 'security',
    name: 'SIG-Security',
    full: 'Cybersecurity',
    color: '#E11D48',
    icon: I.security,
    tagline: 'Capture-the-flag practice and ethical hacking, beginner to bounty.',
    about: ['SIG-Security runs weekly capture-the-flag practice and hands-on workshops in web exploitation, reverse engineering, cryptography, and defense. We compete as a team in national CTFs each semester.', 'Total beginners welcome — we keep a beginner track running alongside the advanced challenges so everyone has something to chew on.'],
    meeting: {
      days: 'Thursdays',
      time: '5:30 – 7:00 PM',
      location: 'Keller 102'
    },
    links: {
      discord: '#',
      instagram: '#',
      github: '#',
      website: '',
      link_name: ''
    },
    leadership: [{
      name: 'Hana Watanabe',
      role: 'SIG Lead'
    }, {
      name: 'Theo Garcia',
      role: 'CTF Captain'
    }]
  }, {
    slug: 'gamedev',
    name: 'SIG-GameDev',
    full: 'Game Development',
    color: '#DB2777',
    icon: I.gamedev,
    tagline: 'From pixel art to engines — prototype, jam, and play your own games.',
    about: ['SIG-GameDev brings together artists, designers, and programmers to make games. We host semester-long projects and weekend game jams, then show everything off at our end-of-term arcade night.', 'Every discipline is welcome — if you want to draw, compose, write, or code, there is a seat at the table.'],
    meeting: {
      days: 'Fridays',
      time: '4:00 – 6:00 PM',
      location: 'POST 318B'
    },
    links: {
      discord: '#',
      instagram: '#',
      github: '',
      website: '#',
      link_name: 'Itch.io page'
    },
    leadership: [{
      name: 'Sora Kim',
      role: 'SIG Lead'
    }, {
      name: 'Bella Rivera',
      role: 'Art Director'
    }]
  }, {
    slug: 'robotics',
    name: 'SIG-Robotics',
    full: 'Robotics',
    color: '#EA580C',
    icon: I.robotics,
    tagline: 'Sensors, embedded systems, and autonomous builds for tinkerers.',
    about: ['SIG-Robotics is hands-on hardware. We build robots from the ground up — wiring sensors, flashing microcontrollers, and writing the control loops that make them move.', 'We partner with campus labs and compete in regional challenges. Come solder something.'],
    meeting: {
      days: 'Tuesdays',
      time: '5:00 – 7:00 PM',
      location: 'Holmes Hall 240'
    },
    links: {
      discord: '#',
      instagram: '',
      github: '#',
      website: '',
      link_name: ''
    },
    leadership: [{
      name: 'Noa Fischer',
      role: 'SIG Lead'
    }, {
      name: 'Priya Anand',
      role: 'Hardware'
    }]
  }, {
    slug: 'data',
    name: 'SIG-Data',
    full: 'Data Science',
    color: '#0D9488',
    icon: I.data,
    tagline: 'Wrangle, visualize, and learn from real Hawaiʻi datasets.',
    about: ['SIG-Data turns messy, real-world data into honest stories. We work with local Hawaiʻi datasets — ocean, climate, transit, campus — to practice the full pipeline from cleaning to visualization.', 'Bring your curiosity about a question that matters to the islands, and we will help you answer it with data.'],
    meeting: {
      days: 'Wednesdays',
      time: '4:00 – 5:30 PM',
      location: 'Hamilton Library 305'
    },
    links: {
      discord: '#',
      instagram: '#',
      github: '#',
      website: '#',
      link_name: 'Notebooks'
    },
    leadership: [{
      name: 'Iris Wong',
      role: 'SIG Lead'
    }, {
      name: 'Sam Okafor',
      role: 'Workshops'
    }]
  }, {
    slug: 'cp',
    name: 'SIG-CP',
    full: 'Competitive Programming',
    color: '#16A34A',
    icon: I.cp,
    tagline: 'Sharpen algorithms and compete in ICPC-style contests.',
    about: ['SIG-CP drills the algorithms and data structures that win contests — and ace interviews. We host weekly practice rounds and travel to ICPC regionals as a team.', 'From your first "Hello, World" to your first AC on a hard problem, we level up together.'],
    meeting: {
      days: 'Sundays',
      time: '2:00 – 4:00 PM',
      location: 'POST 319'
    },
    links: {
      discord: '#',
      instagram: '',
      github: '#',
      website: '',
      link_name: ''
    },
    leadership: [{
      name: 'Ravi Shah',
      role: 'SIG Lead'
    }, {
      name: 'Yuki Mori',
      role: 'Contests'
    }]
  }];
  const events = [{
    slug: 'fall-welcome-mixer',
    title: 'Fall Welcome Mixer',
    date: '2026-09-03',
    time: '5:00 PM',
    kind: 'Social',
    location: 'Campus Center Courtyard',
    sig: null,
    desc: 'Kick off the semester with food, games, and every SIG in one place. Meet the board, find your group, and sign up for what excites you.'
  }, {
    slug: 'intro-git-github',
    title: 'Intro to Git & GitHub',
    date: '2026-09-12',
    time: '2:00 PM',
    kind: 'Workshop',
    location: 'POST 318B',
    sig: 'web',
    desc: 'A hands-on, beginner-friendly walkthrough of version control and collaboration — fork, branch, commit, and open your first pull request.'
  }, {
    slug: 'resume-linkedin-night',
    title: 'Resume & LinkedIn Night',
    date: '2026-09-18',
    time: '6:00 PM',
    kind: 'Career',
    location: 'iLab, POST',
    sig: null,
    desc: 'Get your resume reviewed by industry mentors and ACM alumni, and polish your LinkedIn ahead of internship season.'
  }, {
    slug: 'ai-paper-reading-kickoff',
    title: 'SIG-AI Paper Reading Kickoff',
    date: '2026-09-25',
    time: '5:00 PM',
    kind: 'Workshop',
    location: 'POST 318B',
    sig: 'ai',
    desc: 'We pick this semester’s papers and walk through how to actually read one. No ML background needed — just curiosity.'
  }, {
    slug: 'fall-hackathon',
    title: 'Fall Hackathon',
    date: '2026-10-03',
    time: '9:00 AM',
    kind: 'Flagship',
    location: 'Campus Center',
    sig: null,
    desc: 'Forty-eight hours of building, mentoring, food, and prizes. All majors welcome — come with an idea or find a team here.'
  }, {
    slug: 'game-jam-weekend',
    title: 'Game Jam Weekend',
    date: '2026-10-10',
    time: '10:00 AM',
    kind: 'Jam',
    location: 'POST 318B',
    sig: 'gamedev',
    desc: 'One theme, one weekend, one playable game. Artists, designers, and programmers team up and ship something fun.'
  }, {
    slug: 'tech-talk-islands',
    title: 'Tech Talk: Building for the Islands',
    date: '2026-10-16',
    time: '5:30 PM',
    kind: 'Talk',
    location: 'POST 127',
    sig: null,
    desc: 'A local engineer on shipping software that serves Hawaiʻi communities — and building a tech career without leaving the islands.'
  }, {
    slug: 'data-viz-workshop',
    title: 'SIG-Data Visualization Workshop',
    date: '2026-10-24',
    time: '4:00 PM',
    kind: 'Workshop',
    location: 'Hamilton Library 305',
    sig: 'data',
    desc: 'Turn a messy local dataset into a clear, honest chart. Bring a laptop; we supply the data and the snacks.'
  }, {
    slug: 'security-ctf-night',
    title: 'SIG-Security CTF Night',
    date: '2026-10-30',
    time: '5:30 PM',
    kind: 'Competition',
    location: 'Keller 102',
    sig: 'security',
    desc: 'A friendly capture-the-flag night with a beginner track running right alongside the harder challenges.'
  }];
  const board = [{
    name: 'Kai Nakamura',
    role: 'President'
  }, {
    name: 'Leilani Cruz',
    role: 'Vice President'
  }, {
    name: 'Marcus Lee',
    role: 'Finance Director'
  }, {
    name: 'Hana Watanabe',
    role: 'Operations Director'
  }, {
    name: 'Sora Kim',
    role: 'Public Relations Director'
  }, {
    name: 'Iris Wong',
    role: 'Webmaster'
  }, {
    name: 'Noa Fischer',
    role: 'Director of Membership'
  }, {
    name: 'Dr. A. Sato',
    role: 'Faculty Sponsor'
  }];
  const faqs = [{
    q: 'How do I join ACM Mānoa?',
    a: 'Membership is free and open to all students. Hop into our Discord, follow us on Instagram, and come to any event — no application needed.'
  }, {
    q: 'Do I need prior coding experience?',
    a: 'Not at all. Every SIG keeps a beginner track and welcomes complete newcomers alongside seasoned builders.'
  }, {
    q: 'Do I have to be a CS major?',
    a: 'Nope! We welcome students from every major who share a passion for computing and technology.'
  }, {
    q: 'Can I be in more than one SIG?',
    a: 'Absolutely — join as many as you have time for. Many members float between two or three.'
  }];

  // --- date helpers for the events calendar ---
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONF = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DOWF = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const WD = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };
  // parse an event's 'YYYY-MM-DD' into display + index parts (local, no TZ drift)
  const edate = iso => {
    const [y, mo, da] = iso.split('-').map(Number);
    const dt = new Date(y, mo - 1, da);
    return {
      y,
      mo: mo - 1,
      da,
      wd: dt.getDay(),
      d: String(da).padStart(2, '0'),
      m: MON[mo - 1],
      day: DOWF[dt.getDay()],
      full: DOWF[dt.getDay()] + ', ' + MONF[mo - 1] + ' ' + da + ', ' + y
    };
  };
  // weekday index a SIG meets on, from meeting.days like 'Wednesdays'
  const meetWd = s => s ? WD[s.replace(/s$/, '')] : null;
  window.ACMData = {
    sigs,
    events,
    board,
    faqs,
    secondary,
    light,
    themeVars,
    edate,
    meetWd,
    MON,
    MONF,
    DOWF
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/data.js", error: String((e && e.message) || e) }); }

// redesign/air-site/event.jsx
try { (() => {
/* ACM Mānoa Air site — Event detail (slug) page */
(function () {
  function EventDetail({
    slug
  }) {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const {
      events,
      sigs,
      edate,
      themeVars
    } = window.ACMData;
    const e = events.find(x => x.slug === slug);
    if (!e) {
      return /*#__PURE__*/React.createElement("div", {
        className: "air"
      }, /*#__PURE__*/React.createElement(Nav, {
        route: "#/events"
      }), /*#__PURE__*/React.createElement("section", {
        style: {
          textAlign: 'center',
          minHeight: '50vh'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrap"
      }, /*#__PURE__*/React.createElement("h2", null, "Event not found."), /*#__PURE__*/React.createElement("p", {
        className: "sec-sub",
        style: {
          marginBottom: '24px'
        }
      }, "That event isn\u2019t on the calendar."), /*#__PURE__*/React.createElement("a", {
        className: "btn btn-primary",
        href: "#/events",
        onClick: ev => nav(ev, '#/events')
      }, "Back to events"))), /*#__PURE__*/React.createElement(Footer, null));
    }
    const sig = e.sig ? sigs.find(s => s.slug === e.sig) : null;
    const ed = edate(e.date);
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const HOST = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75';
    return /*#__PURE__*/React.createElement("div", {
      className: "air",
      style: sig ? themeVars(sig.color) : undefined
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/events"
    }), /*#__PURE__*/React.createElement("header", {
      className: "sig-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("a", {
      className: "back",
      href: "#/events",
      onClick: ev => nav(ev, '#/events')
    }, /*#__PURE__*/React.createElement(Ic, {
      d: "M19 12H5M11 18l-6-6 6-6",
      s: 18
    }), " All events"), /*#__PURE__*/React.createElement("div", {
      className: "ev-badge"
    }, sig ? sig.name : 'ACM Mānoa', " \xB7 ", e.kind), /*#__PURE__*/React.createElement("h1", {
      style: {
        maxWidth: '20ch'
      }
    }, e.title), /*#__PURE__*/React.createElement("div", {
      className: "ev-chips"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ev-chip"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CAL,
      s: 16
    }), " ", ed.full), /*#__PURE__*/React.createElement("span", {
      className: "ev-chip"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CLOCK,
      s: 16
    }), " ", e.time), /*#__PURE__*/React.createElement("span", {
      className: "ev-chip"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PIN,
      s: 16
    }), " ", e.location)), /*#__PURE__*/React.createElement("div", {
      className: "cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-sig",
      href: "#"
    }, "Add to calendar ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), sig && /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: '#/sig/' + sig.slug,
      onClick: ev => nav(ev, '#/sig/' + sig.slug)
    }, "About ", sig.name, " ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '52px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ev-detail-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ev-photo"
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: 'event-' + e.slug,
      shape: "rect",
      fit: "cover",
      placeholder: "Drop an event photo"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "sec-head left",
      style: {
        margin: '0 0 18px'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: '30px'
      }
    }, "About this event")), /*#__PURE__*/React.createElement("div", {
      className: "prose",
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("p", null, e.desc)), /*#__PURE__*/React.createElement("div", {
      className: "ev-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ev-irow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CAL,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "When"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, ed.full, ", ", e.time))), /*#__PURE__*/React.createElement("div", {
      className: "ev-irow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PIN,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "Where"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, e.location))), /*#__PURE__*/React.createElement("div", {
      className: "ev-irow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: HOST,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "Hosted by"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, sig ? sig.full + ' (' + sig.name + ')' : 'ACM at UH Mānoa')))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer sig-closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "See you there?"), /*#__PURE__*/React.createElement("p", null, "Bring a friend \u2014 most events need nothing but curiosity. Join the Discord for reminders and last-minute room changes."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: ev => nav(ev, '#/')
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    EventDetail
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/event.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/events.jsx
try { (() => {
/* ACM Mānoa Air site — Events (month calendar + filters + upcoming list) */
(function () {
  const {
    useState
  } = React;
  function EventsCalendar() {
    const {
      Ic,
      nav
    } = window.AirShell;
    const {
      events,
      sigs,
      edate,
      meetWd,
      MONF,
      light,
      secondary
    } = window.ACMData;
    const BRAND = '#3F6FE6';

    // filter keys: 'acm' + every sig slug, all on by default
    const allKeys = ['acm', ...sigs.map(s => s.slug)];
    const [filters, setFilters] = useState(() => Object.fromEntries(allKeys.map(k => [k, true])));
    // calendar cursor — start on the month of the first upcoming event
    const start = edate(events[0].date);
    const [cur, setCur] = useState({
      y: start.y,
      m: start.mo
    });
    const colorFor = key => key === 'acm' ? BRAND : (sigs.find(s => s.slug === key) || {}).color;
    const toggle = k => setFilters(f => ({
      ...f,
      [k]: !f[k]
    }));
    const allOn = allKeys.every(k => filters[k]);
    const setAll = v => setFilters(Object.fromEntries(allKeys.map(k => [k, v])));
    const step = dir => setCur(c => {
      let m = c.m + dir,
        y = c.y;
      if (m < 0) {
        m = 11;
        y--;
      }
      if (m > 11) {
        m = 0;
        y++;
      }
      return {
        y,
        m
      };
    });
    const {
      y,
      m
    } = cur;
    const startWd = new Date(y, m, 1).getDay();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWd; i++) cells.push(null);
    for (let d = 1; d <= daysIn; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    const today = new Date();
    const isToday = d => d && today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
    const itemsFor = d => {
      const wd = new Date(y, m, d).getDay();
      const list = [];
      events.forEach(e => {
        const ed = edate(e.date);
        const key = e.sig || 'acm';
        if (ed.y === y && ed.mo === m && ed.da === d && filters[key]) {
          list.push({
            type: 'event',
            color: colorFor(key),
            label: e.title,
            route: '#/event/' + e.slug
          });
        }
      });
      sigs.forEach(s => {
        if (filters[s.slug] && meetWd(s.meeting.days) === wd) {
          list.push({
            type: 'meet',
            color: s.color,
            label: s.name + ' · meeting',
            route: '#/sig/' + s.slug
          });
        }
      });
      return list;
    };
    const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const PREV = 'M15 18l-6-6 6-6',
      NEXT = 'M9 6l6 6-6 6';
    const Chip = ({
      k,
      label
    }) => {
      const c = colorFor(k);
      const on = filters[k];
      const st = on ? {
        background: light(c),
        color: secondary(c),
        borderColor: c
      } : {
        background: 'var(--card)',
        color: 'var(--muted)',
        borderColor: 'var(--line)'
      };
      return /*#__PURE__*/React.createElement("button", {
        className: 'fchip' + (on ? ' on' : ''),
        style: st,
        onClick: () => toggle(k)
      }, /*#__PURE__*/React.createElement("span", {
        className: "dot",
        style: {
          background: on ? c : 'var(--line)'
        }
      }), label);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "filter-bar"
    }, /*#__PURE__*/React.createElement(Chip, {
      k: "acm",
      label: "ACM events"
    }), sigs.map(s => /*#__PURE__*/React.createElement(Chip, {
      key: s.slug,
      k: s.slug,
      label: s.name
    })), /*#__PURE__*/React.createElement("button", {
      className: "fchip ghost",
      onClick: () => setAll(!allOn)
    }, allOn ? 'Clear all' : 'Select all')), /*#__PURE__*/React.createElement("div", {
      className: "cal-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cal-top"
    }, /*#__PURE__*/React.createElement("h3", null, MONF[m], " ", y), /*#__PURE__*/React.createElement("div", {
      className: "cal-nav"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => step(-1),
      "aria-label": "Previous month"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PREV,
      s: 20
    })), /*#__PURE__*/React.createElement("button", {
      className: "today-btn",
      onClick: () => setCur({
        y: start.y,
        m: start.mo
      })
    }, "Today"), /*#__PURE__*/React.createElement("button", {
      onClick: () => step(1),
      "aria-label": "Next month"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: NEXT,
      s: 20
    })))), /*#__PURE__*/React.createElement("div", {
      className: "cal-grid cal-dows"
    }, DOW.map(d => /*#__PURE__*/React.createElement("div", {
      className: "cal-dow",
      key: d
    }, d))), /*#__PURE__*/React.createElement("div", {
      className: "cal-grid cal-body"
    }, cells.map((d, i) => {
      if (!d) return /*#__PURE__*/React.createElement("div", {
        className: "cal-cell dim",
        key: i
      });
      const items = itemsFor(d);
      const shown = items.slice(0, 3);
      const extra = items.length - shown.length;
      return /*#__PURE__*/React.createElement("div", {
        className: 'cal-cell' + (isToday(d) ? ' is-today' : ''),
        key: i
      }, /*#__PURE__*/React.createElement("span", {
        className: "cal-daynum"
      }, d), /*#__PURE__*/React.createElement("div", {
        className: "cal-evs"
      }, shown.map((it, j) => /*#__PURE__*/React.createElement("a", {
        key: j,
        className: 'cal-ev' + (it.type === 'meet' ? ' meet' : ''),
        style: {
          '--ec': it.color
        },
        href: it.route,
        onClick: e => nav(e, it.route),
        title: it.label
      }, /*#__PURE__*/React.createElement("span", {
        className: "bar"
      }), /*#__PURE__*/React.createElement("span", {
        className: "lbl"
      }, it.label))), extra > 0 && /*#__PURE__*/React.createElement("span", {
        className: "cal-more"
      }, "+", extra, " more")));
    }))), /*#__PURE__*/React.createElement("p", {
      className: "cal-note"
    }, "Weekly SIG meetings repeat across the month \u2014 toggle a program above to focus the calendar."));
  }
  function Events() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const {
      events,
      sigs,
      edate
    } = window.ACMData;
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/events"
    }), /*#__PURE__*/React.createElement("header", {
      className: "subhero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Events"), /*#__PURE__*/React.createElement("h1", null, "Something\u2019s always happening."), /*#__PURE__*/React.createElement("p", null, "Workshops, socials, talks, hackathons \u2014 plus every SIG\u2019s weekly meeting, all on one calendar. No experience required; just show up."))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement(EventsCalendar, null))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head left",
      style: {
        margin: '0 0 30px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Upcoming"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: '34px'
      }
    }, "Next on the calendar.")), /*#__PURE__*/React.createElement("div", {
      className: "events",
      style: {
        maxWidth: '860px',
        margin: 0
      }
    }, events.map((e, i) => {
      const ed = edate(e.date);
      const sig = e.sig ? sigs.find(s => s.slug === e.sig) : null;
      const accent = sig ? sig.color : 'var(--peri)';
      return /*#__PURE__*/React.createElement("a", {
        className: "ev",
        key: i,
        href: '#/event/' + e.slug,
        onClick: ev => nav(ev, '#/event/' + e.slug),
        style: {
          padding: '22px 26px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "date",
        style: {
          width: '72px',
          background: 'color-mix(in srgb, ' + (sig ? sig.color : '#3F6FE6') + ' 12%, #fff)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "d",
        style: {
          color: sig ? sig.color : 'var(--peri-d)'
        }
      }, ed.d), /*#__PURE__*/React.createElement("div", {
        className: "m"
      }, ed.m)), /*#__PURE__*/React.createElement("div", {
        className: "body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "kind-tag",
        style: {
          color: sig ? sig.color : 'var(--peri-d)',
          background: 'color-mix(in srgb, ' + (sig ? sig.color : '#3F6FE6') + ' 11%, #fff)'
        }
      }, sig ? sig.name : 'ACM', " \xB7 ", e.kind), /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '20px'
        }
      }, e.title), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: '15px',
          color: 'var(--soft)',
          marginTop: '4px'
        }
      }, e.desc), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: '18px',
          marginTop: '12px',
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ev-meta"
      }, /*#__PURE__*/React.createElement(Ic, {
        d: CLOCK,
        s: 15
      }), " ", ed.day, ", ", ed.m, " ", ed.da, " \xB7 ", e.time), /*#__PURE__*/React.createElement("span", {
        className: "ev-meta"
      }, /*#__PURE__*/React.createElement(Ic, {
        d: PIN,
        s: 15
      }), " ", e.location))), /*#__PURE__*/React.createElement("div", {
        className: "arrow"
      }, /*#__PURE__*/React.createElement(Ic, {
        d: ARR
      })));
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '40px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Never miss an event."), /*#__PURE__*/React.createElement("p", null, "Join our Discord and follow us on Instagram for the latest workshops, socials, and last-minute updates."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    Events
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/events.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/home.jsx
try { (() => {
/* ACM Mānoa Air site — Home */
(function () {
  function Home() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      LOGO,
      nav
    } = window.AirShell;
    const {
      sigs,
      events,
      themeVars,
      edate
    } = window.ACMData;
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/"
    }), /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pin"
    }, "New"), "The largest CS community at UH M\u0101noa"), /*#__PURE__*/React.createElement("h1", null, "A friendly home for ", /*#__PURE__*/React.createElement("span", {
      className: "grad"
    }, "curious builders.")), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, "ACM at the University of Hawai\u02BBi at M\u0101noa is where beginners and tinkerers find their group, ship their first project, and meet their future team."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Become a member ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost btn-lg",
      href: "#/programs",
      onClick: e => nav(e, '#/programs')
    }, "Explore programs")), /*#__PURE__*/React.createElement("div", {
      className: "hero-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Special Interest Groups")), /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "500+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Active members")), /*#__PURE__*/React.createElement("div", {
      className: "pcard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "50+"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "Events every year")))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h2", null, "Find your people."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "Each SIG is student-led, beginner-friendly, and brings its own flavor \u2014 and its own colors.")), /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, sigs.slice(0, 6).map(s => /*#__PURE__*/React.createElement("a", {
      className: "sig",
      key: s.slug,
      style: themeVars(s.color),
      href: '#/sig/' + s.slug,
      onClick: e => nav(e, '#/sig/' + s.slug)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: s.icon
    })), /*#__PURE__*/React.createElement("h3", null, s.full), /*#__PURE__*/React.createElement("p", null, s.tagline), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "meet"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: "M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
      s: 15
    }), " ", s.meeting.days)), /*#__PURE__*/React.createElement("span", {
      className: "more"
    }, "Learn more ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR,
      s: 18
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: '38px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-soft btn-lg",
      href: "#/programs",
      onClick: e => nav(e, '#/programs')
    }, "See all programs ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "What's on"), /*#__PURE__*/React.createElement("h2", null, "Coming up next.")), /*#__PURE__*/React.createElement("div", {
      className: "events"
    }, events.slice(0, 3).map((e, i) => {
      const ed = edate(e.date);
      return /*#__PURE__*/React.createElement("a", {
        className: "ev",
        key: i,
        href: '#/event/' + e.slug,
        onClick: ev => nav(ev, '#/event/' + e.slug)
      }, /*#__PURE__*/React.createElement("div", {
        className: "date"
      }, /*#__PURE__*/React.createElement("div", {
        className: "d"
      }, ed.d), /*#__PURE__*/React.createElement("div", {
        className: "m"
      }, ed.m)), /*#__PURE__*/React.createElement("div", {
        className: "body"
      }, /*#__PURE__*/React.createElement("h4", null, e.title), /*#__PURE__*/React.createElement("p", null, e.kind, " \xB7 ", e.location, " \xB7 ", e.time)), /*#__PURE__*/React.createElement("div", {
        className: "arrow"
      }, /*#__PURE__*/React.createElement(Ic, {
        d: ARR
      })));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: '34px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "btn btn-soft btn-lg",
      href: "#/events",
      onClick: e => nav(e, '#/events')
    }, "All events ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "New here? Perfect."), /*#__PURE__*/React.createElement("p", null, "No experience required \u2014 just curiosity. Join the Discord, come to one event, and see what sticks."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    Home
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/home.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/icspace.jsx
try { (() => {
/* ACM Mānoa Air site — ICSpace (interactive classroom, POST 318B) */
(function () {
  function ICSpace() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const TICK = 'M20 6 9 17l-5-5';
    const USERS = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75';
    const BULB = 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z';
    const BOLT = 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z';
    const CHIP = 'M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M5 5h14v14H5zM9 9h6v6H9z';
    const MAIL = 'M3 8l7.9 4.3a2 2 0 0 0 2.2 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z';
    const bullets = ['Students and faculty engage in innovative, hands-on projects', 'Cutting-edge research gets conducted side by side', 'Interactive learning sessions and workshops happen weekly'];
    const invest = [{
      ic: USERS,
      h: 'Workforce Development',
      p: 'Helping grow a skilled, local computing workforce ready for industry.'
    }, {
      ic: BULB,
      h: 'Future Challenges',
      p: 'Equipping students to tackle tomorrow’s technological problems.'
    }, {
      ic: BOLT,
      h: 'Tech Advancement',
      p: 'Driving research and innovation that pushes the field forward.'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/icspace"
    }), /*#__PURE__*/React.createElement("header", {
      className: "subhero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "The Space"), /*#__PURE__*/React.createElement("h1", null, "ICSpace."), /*#__PURE__*/React.createElement("p", null, "An interactive classroom dedicated to the Information & Computer Sciences community at the University of Hawai\u02BBi at M\u0101noa \u2014 a home for learning, building, and collaboration."), /*#__PURE__*/React.createElement("div", {
      className: "ics-badge"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PIN,
      s: 17
    }), " Located in POST 318B"))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ics-photo"
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: "ics-hero",
      shape: "rect",
      fit: "cover",
      placeholder: "Drop a photo of ICSpace"
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "prose"
    }, /*#__PURE__*/React.createElement("p", null, "Located in POST 318B, ICSpace is designed for ICS undergraduate majors, graduate students, faculty, and staff. It fosters an environment of learning and collaboration \u2014 a place to work on a project, study with classmates, or just find your people."), /*#__PURE__*/React.createElement("p", null, "Guests are warmly welcome too, as long as they\u2019re accompanied by an ICS community member, keeping the room a lively exchange of ideas and knowledge."))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "What it\u2019s for"), /*#__PURE__*/React.createElement("h2", null, "A hub for innovation and learning.")), /*#__PURE__*/React.createElement("div", {
      className: "ics-two"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ics-card"
    }, /*#__PURE__*/React.createElement("h3", null, "A hands-on home for ICS"), /*#__PURE__*/React.createElement("p", null, "ICSpace advances the educational and professional goals of the ICS community. It\u2019s the central spot where:"), /*#__PURE__*/React.createElement("ul", {
      className: "ics-list"
    }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: TICK,
      s: 15,
      w: 2.4
    })), b)))), /*#__PURE__*/React.createElement("div", {
      className: "ics-card"
    }, /*#__PURE__*/React.createElement("h3", null, "Built for real work"), /*#__PURE__*/React.createElement("p", null, "The space is equipped with advanced technology and resources that prepare students for the demands of the tech industry \u2014 enhancing hands-on learning and research, and bridging academic knowledge with real-world applications."), /*#__PURE__*/React.createElement("div", {
      className: "ics-badge",
      style: {
        marginTop: '22px'
      }
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CHIP,
      s: 17
    }), " Modern workstations & collaboration tools"))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sec-tag"
    }, "Why it matters"), /*#__PURE__*/React.createElement("h2", null, "Enhancing academic excellence."), /*#__PURE__*/React.createElement("p", {
      className: "sec-sub"
    }, "By investing in ICSpace, sponsors help shape the next generation of tech leaders and innovators.")), /*#__PURE__*/React.createElement("div", {
      className: "ics-invest"
    }, invest.map((c, i) => /*#__PURE__*/React.createElement("div", {
      className: "ics-inv",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "orb"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: c.ic,
      s: 26
    })), /*#__PURE__*/React.createElement("h4", null, c.h), /*#__PURE__*/React.createElement("p", null, c.p)))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '64px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Support ICSpace."), /*#__PURE__*/React.createElement("p", null, "Your contribution helps maintain and grow the technology and resources that make ICSpace a hub for innovation. Investing here means supporting the next generation of tech leaders at UH M\u0101noa."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "mailto:president@acmmanoa.org"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: MAIL
    }), " Contact us about giving")))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    ICSpace
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/icspace.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/image-slot.js", error: String((e && e.message) || e) }); }

// redesign/air-site/programs.jsx
try { (() => {
/* ACM Mānoa Air site — Programs (all SIGs) */
(function () {
  function Programs() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const {
      sigs,
      themeVars
    } = window.ACMData;
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/programs"
    }), /*#__PURE__*/React.createElement("header", {
      className: "subhero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Special Interest Groups"), /*#__PURE__*/React.createElement("h1", null, "Seven groups. One \u02BBohana."), /*#__PURE__*/React.createElement("p", null, "Every SIG is student-led and beginner-friendly, each with its own focus, rhythm, and brand. Pick one \u2014 or three \u2014 and start building."))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid"
    }, sigs.map(s => /*#__PURE__*/React.createElement("a", {
      className: "sig logo-card",
      key: s.slug,
      style: themeVars(s.color),
      href: '#/sig/' + s.slug,
      onClick: e => nav(e, '#/sig/' + s.slug)
    }, /*#__PURE__*/React.createElement("div", {
      className: "crest"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mark"
    }, s.logo ? /*#__PURE__*/React.createElement("img", {
      src: s.logo,
      alt: s.name + ' logo'
    }) : /*#__PURE__*/React.createElement(Ic, {
      d: s.icon,
      s: 34,
      w: 1.7
    }))), /*#__PURE__*/React.createElement("h3", null, s.full), /*#__PURE__*/React.createElement("p", null, s.tagline), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "meet"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CAL,
      s: 15
    }), " ", s.meeting.days), /*#__PURE__*/React.createElement("span", {
      className: "meet"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PIN,
      s: 15
    }), " ", s.meeting.location)), /*#__PURE__*/React.createElement("span", {
      className: "more"
    }, "View ", s.name, " ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR,
      s: 18
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Want to start a new SIG?"), /*#__PURE__*/React.createElement("p", null, "Got an idea for a group that doesn't exist yet \u2014 quantum, AR/VR, design? Pitch it. We help students launch new SIGs every year."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Pitch a SIG ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    Programs
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/programs.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/shell.jsx
try { (() => {
/* ACM Mānoa Air site — shell: icons, nav, footer, router helpers */
(function () {
  const ARR = 'M5 12h14M13 6l6 6-6 6';
  function Ic({
    d,
    s = 24,
    w = 1.7
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: w,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  // brand/social glyphs (filled)
  const SOC = {
    discord: 'M16.9 1.6a16 16 0 0 0-4-1.3 11 11 0 0 0-.5 1.1 15 15 0 0 0-4.5 0A11 11 0 0 0 7.3.3a16 16 0 0 0-4.1 1.3A17 17 0 0 0 .2 13.2a16 16 0 0 0 5 2.5c.4-.5.7-1.1 1-1.7a10 10 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 10.1 0l.4.3c-.5.3-1 .6-1.7.8.3.6.7 1.2 1 1.7a16 16 0 0 0 5-2.5A17 17 0 0 0 16.9 1.6ZM6.7 10.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z',
    instagram: 'M12 2.2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6Zm0 10.5A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1Zm6.4-10.9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z',
    github: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z',
    linkedin: 'M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.05c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z'
  };
  function Soc({
    type,
    s = 16
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: SOC[type]
    }));
  }
  const LOGO = '../../assets/acm_logo.png';
  const go = route => {
    window.location.hash = route;
  };
  function nav(e, route) {
    e.preventDefault();
    go(route);
  }
  function Nav({
    route
  }) {
    const links = [{
      l: 'About',
      r: '#/about'
    }, {
      l: 'Programs',
      r: '#/programs'
    }, {
      l: 'Events',
      r: '#/events'
    }, {
      l: 'Sponsors',
      r: '#/sponsors'
    }];
    const base = route.split('/')[1] || '';
    return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide nav-in"
    }, /*#__PURE__*/React.createElement("a", {
      className: "brand",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, /*#__PURE__*/React.createElement("img", {
      src: LOGO,
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "\xB7 M\u0101noa")), /*#__PURE__*/React.createElement("div", {
      className: "nav-links"
    }, links.map(x => /*#__PURE__*/React.createElement("a", {
      key: x.r,
      href: x.r,
      onClick: e => nav(e, x.r),
      className: base && x.r.includes(base) ? 'active' : ''
    }, x.l)), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#/",
      onClick: e => nav(e, '#/'),
      style: {
        marginLeft: '8px'
      }
    }, "Join us"))));
  }
  function Footer() {
    const col = (h, items) => /*#__PURE__*/React.createElement("div", {
      className: "foot-col"
    }, /*#__PURE__*/React.createElement("h5", null, h), items.map(it => /*#__PURE__*/React.createElement("a", {
      key: it[0],
      href: it[1],
      onClick: e => it[1].startsWith('#/') ? nav(e, it[1]) : null
    }, it[0])));
    return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot-brand"
    }, /*#__PURE__*/React.createElement("a", {
      className: "brand",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, /*#__PURE__*/React.createElement("img", {
      src: LOGO,
      alt: ""
    }), "ACM ", /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "\xB7 M\u0101noa")), /*#__PURE__*/React.createElement("p", null, "Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa. Built by students, for students.")), col('Explore', [['About', '#/about'], ['Programs', '#/programs'], ['Events', '#/events'], ['Sponsors', '#/sponsors']]), col('Connect', [['Discord', '#'], ['Instagram', '#'], ['LinkedIn', '#'], ['Email', '#']]), col('Resources', [['ICSpace', '#/icspace'], ['GitHub', '#'], ['ACM Intl.', '#']])), /*#__PURE__*/React.createElement("div", {
      className: "foot-bottom"
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 ACM at UH M\u0101noa"), /*#__PURE__*/React.createElement("span", null, "Made with aloha \uD83E\uDD19"))));
  }
  window.AirShell = {
    Ic,
    Soc,
    Nav,
    Footer,
    ARR,
    LOGO,
    go,
    nav
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/shell.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/sig.jsx
try { (() => {
/* ACM Mānoa Air site — SIG detail (themed by the SIG's primary_color) */
(function () {
  function SigDetail({
    slug
  }) {
    const {
      Ic,
      Soc,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const {
      sigs,
      themeVars
    } = window.ACMData;
    const s = sigs.find(x => x.slug === slug);
    if (!s) {
      return /*#__PURE__*/React.createElement("div", {
        className: "air"
      }, /*#__PURE__*/React.createElement(Nav, {
        route: "#/programs"
      }), /*#__PURE__*/React.createElement("section", {
        style: {
          textAlign: 'center',
          minHeight: '50vh'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrap"
      }, /*#__PURE__*/React.createElement("h2", null, "SIG not found."), /*#__PURE__*/React.createElement("p", {
        className: "sec-sub",
        style: {
          marginBottom: '24px'
        }
      }, "That group doesn't exist (yet)."), /*#__PURE__*/React.createElement("a", {
        className: "btn btn-primary",
        href: "#/programs",
        onClick: e => nav(e, '#/programs')
      }, "Back to programs"))), /*#__PURE__*/React.createElement(Footer, null));
    }
    const CAL = 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z';
    const CLOCK = 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
    const PIN = 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';
    const links = s.links || {};
    const socList = [links.discord && ['discord', 'Discord', links.discord], links.instagram && ['instagram', 'Instagram', links.instagram], links.github && ['github', 'GitHub', links.github], links.linkedin && ['linkedin', 'LinkedIn', links.linkedin]].filter(Boolean);
    return /*#__PURE__*/React.createElement("div", {
      className: "air",
      style: themeVars(s.color)
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/programs"
    }), /*#__PURE__*/React.createElement("header", {
      className: "sig-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("a", {
      className: "back",
      href: "#/programs",
      onClick: e => nav(e, '#/programs')
    }, /*#__PURE__*/React.createElement(Ic, {
      d: "M19 12H5M11 18l-6-6 6-6",
      s: 18
    }), " All programs"), /*#__PURE__*/React.createElement("div", {
      className: "head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: s.icon,
      s: 56,
      w: 1.6
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Special Interest Group"), /*#__PURE__*/React.createElement("h1", null, s.full), /*#__PURE__*/React.createElement("div", {
      className: "tag"
    }, s.tagline), /*#__PURE__*/React.createElement("div", {
      className: "cta"
    }, links.discord && /*#__PURE__*/React.createElement("a", {
      className: "btn btn-sig",
      href: links.discord
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    })), links.website && links.link_name && /*#__PURE__*/React.createElement("a", {
      className: "btn btn-ghost",
      href: links.website
    }, links.link_name, " ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '52px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sig-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "sec-head left",
      style: {
        margin: '0 0 22px'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: '32px'
      }
    }, "About ", s.name)), /*#__PURE__*/React.createElement("div", {
      className: "prose",
      style: {
        margin: 0
      }
    }, s.about.map((p, i) => /*#__PURE__*/React.createElement("p", {
      key: i
    }, p))), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '24px',
        fontWeight: 700,
        margin: '46px 0 22px'
      }
    }, "Leadership"), /*#__PURE__*/React.createElement("div", {
      className: "people",
      style: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'
      }
    }, s.leadership.map((p, i) => /*#__PURE__*/React.createElement("div", {
      className: "person",
      key: i
    }, /*#__PURE__*/React.createElement("img", {
      className: "av",
      src: "../../assets/default_user.svg",
      alt: p.name
    }), /*#__PURE__*/React.createElement("h4", null, p.name), /*#__PURE__*/React.createElement("span", {
      className: "role"
    }, p.role))))), /*#__PURE__*/React.createElement("aside", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "info-card"
    }, /*#__PURE__*/React.createElement("h3", null, "Meets"), /*#__PURE__*/React.createElement("div", {
      className: "info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CAL,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "Day"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, s.meeting.days))), /*#__PURE__*/React.createElement("div", {
      className: "info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: CLOCK,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "Time"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, s.meeting.time))), /*#__PURE__*/React.createElement("div", {
      className: "info-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Ic, {
      d: PIN,
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "k"
    }, "Where"), /*#__PURE__*/React.createElement("div", {
      className: "v"
    }, s.meeting.location)))), socList.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "info-card"
    }, /*#__PURE__*/React.createElement("h3", null, "Connect"), /*#__PURE__*/React.createElement("div", {
      className: "links-row"
    }, socList.map(x => /*#__PURE__*/React.createElement("a", {
      className: "soc",
      key: x[0],
      href: x[2]
    }, /*#__PURE__*/React.createElement(Soc, {
      type: x[0]
    }), " ", x[1])))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer sig-closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Curious? Come to a meeting."), /*#__PURE__*/React.createElement("p", null, s.meeting.days, " at ", s.meeting.location, ". No experience required \u2014 bring a laptop and a question."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: links.discord || '#'
    }, "Join the Discord ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    SigDetail
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/sig.jsx", error: String((e && e.message) || e) }); }

// redesign/air-site/sponsors.jsx
try { (() => {
/* ACM Mānoa Air site — Sponsors (logo-forward) */
(function () {
  const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  function Sponsors() {
    const {
      Ic,
      Nav,
      Footer,
      ARR,
      nav
    } = window.AirShell;
    const sponsors = [{
      name: 'Hawaiian Telcom',
      website: '#'
    }, {
      name: 'DevLeague',
      website: '#'
    }, {
      name: 'Central Pacific Bank',
      website: '#'
    }, {
      name: 'Hawaiʻi Technology',
      website: '#'
    }, {
      name: 'Oceanit',
      website: '#'
    }, {
      name: 'ICS Department',
      website: '#'
    }, {
      name: 'Sudo Mekaki',
      website: '#'
    }, {
      name: 'Local Kine Labs',
      website: '#'
    }, {
      name: 'PACE',
      website: '#'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "air"
    }, /*#__PURE__*/React.createElement(Nav, {
      route: "#/sponsors"
    }), /*#__PURE__*/React.createElement("header", {
      className: "subhero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, "Sponsors"), /*#__PURE__*/React.createElement("h1", null, "Powered by partners."), /*#__PURE__*/React.createElement("p", null, "Mahalo nui loa to the companies and organizations that fund the workshops, hackathons, and pizza keeping ACM M\u0101noa running \u2014 and connect students to Hawai\u02BBi\u2019s tech industry."))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap-wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "spon-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tname"
    }, "Our partners"), /*#__PURE__*/React.createElement("span", {
      className: "pill"
    }, "Mahalo to all of you"), /*#__PURE__*/React.createElement("span", {
      className: "rule"
    })), /*#__PURE__*/React.createElement("div", {
      className: "spon-grid t-one"
    }, sponsors.map(sp => {
      const id = 'spon-' + slugify(sp.name);
      return /*#__PURE__*/React.createElement("a", {
        className: "spon solo",
        key: id,
        href: sp.website,
        onClick: e => sp.website === '#' && e.preventDefault()
      }, /*#__PURE__*/React.createElement("div", {
        className: "shot"
      }, /*#__PURE__*/React.createElement("image-slot", {
        id: id,
        shape: "rect",
        fit: "contain",
        placeholder: 'Drop ' + sp.name + ' logo'
      })), /*#__PURE__*/React.createElement("div", {
        className: "info"
      }, /*#__PURE__*/React.createElement("h4", null, sp.name), /*#__PURE__*/React.createElement("span", {
        className: "visit"
      }, "Visit website ", /*#__PURE__*/React.createElement(Ic, {
        d: ARR,
        s: 16
      }))));
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: '64px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap closer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("h2", null, "Become a sponsor."), /*#__PURE__*/React.createElement("p", null, "Reach 500+ motivated computing students at UH M\u0101noa. We\u2019ll tailor a partnership to your goals \u2014 recruiting, workshops, or hackathon prizes \u2014 and feature your logo right here."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-white btn-lg",
      href: "#/",
      onClick: e => nav(e, '#/')
    }, "Get in touch ", /*#__PURE__*/React.createElement(Ic, {
      d: ARR
    }))))), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.AirPages = Object.assign(window.AirPages || {}, {
    Sponsors
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/air-site/sponsors.jsx", error: String((e && e.message) || e) }); }

// redesign/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
/* ACM Mānoa website UI kit — About page content */
(function () {
  const LEADERS = [{
    name: 'Kai Nakamura',
    role: 'President'
  }, {
    name: 'Leilani Cruz',
    role: 'Vice President'
  }, {
    name: 'Marcus Lee',
    role: 'Treasurer'
  }, {
    name: 'Hana Watanabe',
    role: 'Secretary'
  }];
  function PageHero({
    title,
    subtitle
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-hero)',
        padding: '5rem 1.5rem',
        borderBottom: '4px solid transparent',
        borderImage: 'var(--gradient-accent-bar) 1'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "acm-blob",
      style: {
        position: 'absolute',
        width: '20rem',
        height: '20rem',
        background: 'var(--blue-300)',
        opacity: 0.4,
        top: '3rem',
        left: '4rem'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "acm-blob",
      style: {
        position: 'absolute',
        width: '20rem',
        height: '20rem',
        background: 'var(--purple-300)',
        opacity: 0.4,
        top: '5rem',
        right: '4rem',
        animationDelay: '2s'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 2,
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'clamp(2.5rem, 6vw, var(--text-7xl))',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        letterSpacing: 'var(--tracking-tight)',
        marginBottom: '1.5rem'
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-2xl)',
        color: 'var(--text-body)',
        maxWidth: '52rem',
        margin: '0 auto',
        lineHeight: 'var(--leading-relaxed)'
      }
    }, subtitle)));
  }
  function ProsePanel({
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-card)',
        padding: '3rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-prose)',
        margin: '0 auto',
        fontSize: 'var(--text-lg)',
        color: 'var(--text-body)',
        lineHeight: 'var(--leading-relaxed)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }
    }, children));
  }
  function About() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
      title: "About ACM M\u0101noa",
      subtitle: "The largest computer science student organization at the University of Hawai\u02BBi at M\u0101noa"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem'
      }
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '3rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Overview"
    })), /*#__PURE__*/React.createElement(ProsePanel, null, /*#__PURE__*/React.createElement("p", null, "The Association for Computing Machinery at UH M\u0101noa (ACM M\u0101noa) is the largest computer science student organization at the University of Hawai\u02BBi at M\u0101noa. As an official student chapter of the international ACM and a Registered Independent Organization, ACM M\u0101noa welcomes students of all backgrounds and experience levels who share a passion for computing."), /*#__PURE__*/React.createElement("p", null, "A core feature of ACM M\u0101noa's structure is its Special Interest Groups (SIGs), which empower members to lead initiatives based on their specific interests \u2014 enriching the overall experience and ensuring the organization grows alongside its members."))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '3rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Leadership Team"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '2rem'
      }
    }, LEADERS.map(l => /*#__PURE__*/React.createElement(DS.ProfileCard, {
      key: l.name,
      name: l.name,
      role: l.role,
      avatar: "../../assets/default_user.svg"
    })))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '3rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Mission",
      accent: "Statement"
    })), /*#__PURE__*/React.createElement(ProsePanel, null, /*#__PURE__*/React.createElement("p", null, "ACM M\u0101noa exists to bridge the gap between students and Hawai\u02BBi's growing IT industry by fostering a supportive and dynamic environment for aspiring computing professionals. Guided by its vision to empower every UH M\u0101noa Information & Computer Science graduate to thrive locally, the organization is committed to three core goals: social, professional, and technical enrichment.")))));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    About
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
/* ACM Mānoa website UI kit — interactive app shell */
(function () {
  const {
    useState
  } = React;
  function App() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    const {
      Hero,
      Programs,
      Events,
      Faq,
      About
    } = window.ACMKit;
    const [page, setPage] = useState('home');
    const NAV_LINKS = [{
      label: 'About',
      href: 'about'
    }, {
      label: 'Events',
      href: 'events'
    }, {
      label: 'Sponsors',
      href: 'sponsors'
    }, {
      label: 'ICSpace',
      href: 'icspace'
    }, {
      label: 'SIGS',
      href: 'sigs'
    }];

    // Intercept nav clicks for fake routing between Home and About.
    const onNav = e => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href === 'about') {
        e.preventDefault();
        setPage('about');
        window.scrollTo({
          top: 0
        });
      } else if (href === 'sigs' || href === 'events') {
        /* let in-page anchors work on home */
        if (page !== 'home') {
          e.preventDefault();
          setPage('home');
        }
      }
    };
    const goHome = e => {
      e.preventDefault();
      setPage('home');
      window.scrollTo({
        top: 0
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      onClickCapture: onNav
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        if (e.target.closest('a')?.getAttribute('href') === '/') goHome(e);
      }
    }, /*#__PURE__*/React.createElement(DS.NavBar, {
      logo: "../../assets/acm_logo.png",
      links: NAV_LINKS,
      activeHref: page === 'about' ? 'about' : undefined
    })), page === 'home' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Programs, null), /*#__PURE__*/React.createElement(Events, null), /*#__PURE__*/React.createElement(Faq, null)) : /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(DS.Footer, {
      logo: "../../assets/acm_logo.png",
      socials: [{
        type: 'github',
        href: 'https://github.com/8bitUHM/acmmanoa-site'
      }, {
        type: 'discord',
        href: '#'
      }, {
        type: 'instagram',
        href: 'https://www.instagram.com/manoaacm/'
      }, {
        type: 'linkedin',
        href: 'https://www.linkedin.com/company/acmanoa/'
      }]
    }));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    App
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Events.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ACM Mānoa website UI kit — Events section (upcoming list + featured gallery) */
(function () {
  const UPCOMING = [{
    day: '14',
    month: 'FEB',
    title: 'Intro to Git & GitHub Workshop',
    description: 'A beginner-friendly walkthrough of version control and collaboration.',
    dateLabel: 'February 14, 2025',
    time: '5:00 PM',
    location: 'POST 318B'
  }, {
    day: '28',
    month: 'FEB',
    title: 'Resume & LinkedIn Night',
    description: 'Get your resume reviewed by industry mentors and ACM alumni.',
    dateLabel: 'February 28, 2025',
    time: '6:00 PM',
    location: 'iLab, POST'
  }, {
    day: '08',
    month: 'MAR',
    title: 'Spring Hackathon Kickoff',
    description: '24 hours of building, mentoring, food, and prizes. All majors welcome.',
    dateLabel: 'March 8, 2025',
    time: '9:00 AM',
    location: 'Campus Center'
  }];
  function Events() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return /*#__PURE__*/React.createElement("section", {
      id: "events",
      style: {
        padding: '5rem 1.5rem',
        background: 'linear-gradient(to bottom right, var(--gray-50), var(--blue-50))'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '4rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Events &",
      accent: "Gallery",
      subtitle: "Discover our upcoming events and recent community activities that make our organization vibrant."
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--text-3xl)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        marginBottom: '1rem'
      }
    }, "Upcoming Events"), /*#__PURE__*/React.createElement("div", {
      className: "acm-divider",
      style: {
        marginBottom: '2rem'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }
    }, UPCOMING.map(e => /*#__PURE__*/React.createElement(DS.EventCard, _extends({
      key: e.title,
      layout: "compact",
      date: {
        day: e.day,
        month: e.month
      }
    }, e))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--text-3xl)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        marginBottom: '1rem'
      }
    }, "Featured"), /*#__PURE__*/React.createElement("div", {
      className: "acm-divider",
      style: {
        marginBottom: '2rem'
      }
    }), /*#__PURE__*/React.createElement(DS.EventCard, {
      layout: "media",
      title: "2024 Fall Showcase",
      description: "SIGs demo their semester projects to peers, faculty, and local tech companies.",
      dateLabel: "December 6, 2024",
      location: "Campus Center Ballroom"
    })))));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    Events
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Events.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Faq.jsx
try { (() => {
/* ACM Mānoa website UI kit — FAQ section */
(function () {
  const FAQ = [{
    question: 'How do I join ACM Mānoa?',
    answer: 'Membership is free and open to all students. Hop into our Discord, follow us on Instagram, and come to any event — no application needed.'
  }, {
    question: 'Do I need prior coding experience?',
    answer: 'Not at all. Our Special Interest Groups welcome complete beginners alongside seasoned builders. You will find mentors and project partners at every level.'
  }, {
    question: 'What are SIGs?',
    answer: 'Special Interest Groups are student-led communities focused on specific areas — AI, web, games, cybersecurity, robotics, and data. Each runs its own workshops and projects.'
  }, {
    question: 'Do I have to be a CS major?',
    answer: 'Nope! We welcome students from every major who share a passion for computing and technology.'
  }];
  function Faq() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return /*#__PURE__*/React.createElement("section", {
      id: "faq",
      style: {
        padding: '5rem 1.5rem',
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-prose)',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '4rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Frequently Asked",
      accent: "Questions",
      subtitle: "Find answers to common questions about ACM and our activities."
    })), /*#__PURE__*/React.createElement(DS.Accordion, {
      defaultOpen: 0,
      items: FAQ
    })));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    Faq
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Faq.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* ACM Mānoa website UI kit — Hero section */
(function () {
  const {
    useEffect,
    useRef
  } = React;
  function Blob({
    color,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "acm-blob",
      style: {
        position: 'absolute',
        width: '20rem',
        height: '20rem',
        background: color,
        opacity: 0.4,
        ...style
      }
    });
  }
  function Hero() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    const Arrow = /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M9 5l7 7-7 7"
    }));
    const Video = /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    }));
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-hero)',
        padding: '5rem 1.5rem 6rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0
      }
    }, /*#__PURE__*/React.createElement(Blob, {
      color: "var(--blue-300)",
      style: {
        top: '4rem',
        left: '3rem'
      }
    }), /*#__PURE__*/React.createElement(Blob, {
      color: "var(--purple-300)",
      style: {
        top: '8rem',
        right: '3rem',
        animationDelay: '2s'
      }
    }), /*#__PURE__*/React.createElement(Blob, {
      color: "var(--pink-300)",
      style: {
        bottom: '-2rem',
        left: '6rem',
        animationDelay: '4s'
      }
    }), /*#__PURE__*/React.createElement(Blob, {
      color: "var(--indigo-300)",
      style: {
        top: '12rem',
        left: '50%',
        width: '18rem',
        height: '18rem',
        animationDelay: '1s'
      }
    }), /*#__PURE__*/React.createElement(Blob, {
      color: "var(--cyan-300)",
      style: {
        bottom: '4rem',
        right: '20%',
        width: '16rem',
        height: '16rem',
        opacity: 0.35,
        animationDelay: '3s'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 10,
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/acm_logo.png",
      alt: "ACM Logo",
      style: {
        width: '11rem',
        height: '11rem',
        margin: '0 auto 1.5rem',
        filter: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.15))'
      }
    }), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'clamp(2.5rem, 6vw, var(--text-7xl))',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        lineHeight: 'var(--leading-tight)',
        letterSpacing: 'var(--tracking-tight)',
        marginBottom: '1.5rem'
      }
    }, "Welcome to", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "acm-gradient-text"
    }, "ACM at UH M\u0101noa")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-2xl)',
        color: 'var(--text-body)',
        maxWidth: '48rem',
        margin: '0 auto 2rem',
        lineHeight: 'var(--leading-relaxed)'
      }
    }, "The Association for Computing Machinery at the University of Hawai\u02BBi at M\u0101noa"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-lg)',
        color: 'var(--text-muted)',
        maxWidth: '36rem',
        margin: '0 auto 3rem'
      }
    }, "Empowering students through technology, innovation, and community. Join us in shaping the future of computing."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '4rem'
      }
    }, /*#__PURE__*/React.createElement(DS.Button, {
      variant: "gradient",
      size: "lg",
      icon: Arrow,
      href: "#programs"
    }, "Explore Programs"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "lg",
      icon: Video,
      href: "#events"
    }, "View Events")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '56rem',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(DS.StatCard, {
      value: "7+",
      label: "Special Interest Groups",
      color: "var(--blue-600)"
    }), /*#__PURE__*/React.createElement(DS.StatCard, {
      value: "500+",
      label: "Active Members",
      color: "var(--purple-600)"
    }), /*#__PURE__*/React.createElement(DS.StatCard, {
      value: "50+",
      label: "Events Annually",
      color: "var(--indigo-600)"
    }))));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    Hero
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Programs.jsx
try { (() => {
/* ACM Mānoa website UI kit — Programs (SIGs) section */
(function () {
  const SIGS = [{
    name: 'SIG-AI',
    color: '#9333ea',
    about: 'Hands-on machine learning projects, paper readings, and friendly Kaggle competitions for every skill level.'
  }, {
    name: 'SIG-Web',
    color: '#2563eb',
    about: 'Build and ship real web apps with modern frameworks alongside a supportive crew of builders.'
  }, {
    name: 'SIG-Game',
    color: '#db2777',
    about: 'Design and prototype games — from pixel art and sound to engines and game jams.'
  }, {
    name: 'SIG-Security',
    color: '#4f46e5',
    about: 'Capture-the-flag practice, ethical hacking workshops, and a path into cybersecurity.'
  }, {
    name: 'SIG-Robotics',
    color: '#0891b2',
    about: 'Embedded systems, sensors, and autonomous builds for the curious tinkerer.'
  }, {
    name: 'SIG-Data',
    color: '#7e22ce',
    about: 'Data wrangling, visualization, and analytics projects with real Hawaiʻi datasets.'
  }];
  function Programs() {
    const DS = window.ACMMNoaDesignSystem_b1bbe6;
    return /*#__PURE__*/React.createElement("section", {
      id: "programs",
      style: {
        padding: '5rem 1.5rem',
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '4rem'
      }
    }, /*#__PURE__*/React.createElement(DS.SectionHeader, {
      title: "Our",
      accent: "Programs",
      subtitle: "Discover our diverse range of Special Interest Groups, each focused on cutting-edge areas of computing and technology."
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }
    }, SIGS.map(s => /*#__PURE__*/React.createElement(DS.FeatureCard, {
      key: s.name,
      logo: "../../assets/acm_logo.png",
      title: s.name,
      description: s.about,
      accentColor: s.color
    })))));
  }
  window.ACMKit = Object.assign(window.ACMKit || {}, {
    Programs
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Programs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.ProfileCard = __ds_scope.ProfileCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
