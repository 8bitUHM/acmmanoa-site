# ACM at UH Mānoa — Design System

A design system reconstructed from the live website of the **Association for
Computing Machinery at the University of Hawaiʻi at Mānoa** (ACM Mānoa), the
largest computer-science student organization on campus.

This system captures the site's friendly, optimistic, student-run aesthetic:
the rounded **Quicksand** typeface, a **blue primary** with a signature
**blue→purple gradient**, soft drifting background "blobs", generously rounded
cards that lift on hover, and a dark blue-black footer.

---

## Sources

Everything here was derived from the official ACM Mānoa codebase. If you have
access, explore these to build with higher fidelity:

- **Primary repo (Django site):** https://github.com/8bitUHM/acmmanoa-site
  - Tailwind theme: `theme/static_src/tailwind.config.js` (declares Quicksand)
  - Templates: `website/templates/` — `base.html`, `components/{navbar,footer}.html`,
    and `pages/{home,about,events,sigs,sponsors,icspace}.html`
  - Static assets: `website/static/website/` (logo, default avatar, social images)
- **Maintainer org:** https://github.com/8bitUHM ("8bit" — the dev club that builds it)
- **Live site (old, pre-Django):** https://acmmanoa.org/
- **ACM International:** https://www.acm.org/ · **ICS Dept:** https://www.ics.hawaii.edu/

The site is built with **Tailwind CSS** (default palette) + **Flowbite**
components, Google-Fonts **Quicksand**, and a small set of hand-rolled
scroll/blob animations. This design system translates those Tailwind utilities
into portable CSS custom properties and React primitives.

> **Font note:** the site loads **Quicksand** from the Google Fonts CDN, so this
> system does the same (`tokens/fonts.css`). No `.woff2` binaries ship with the
> system. If you need fully offline/self-hosted fonts, drop the files into
> `assets/fonts/` and swap the `@import` for `@font-face` rules. **Flag to the
> user if self-hosting is required.**

---

## Content fundamentals

How ACM Mānoa writes copy:

- **Voice:** warm, welcoming, community-first, lightly aspirational. The reader
  is a student who might be nervous about belonging. Copy reassures and invites.
- **Person:** addresses the reader as **"you"** and the org as **"we / our"** —
  e.g. *"Join us in shaping the future of computing,"* *"Discover our diverse
  range of Special Interest Groups."*
- **Tone words:** *empowering, innovation, community, inclusive, hands-on,
  student-led, supportive, growth.* These recur verbatim across the site.
- **Casing:** **Title Case** for nav, buttons, and section labels
  ("View Events", "Learn More", "Quick Links"). Sentence case for body copy.
  **UPPERCASE + wide tracking** only for small footer column headers
  ("QUICK LINKS", "CONNECT", "RESOURCES").
- **Headlines** pair a neutral phrase with one **gradient accent word**:
  *"Welcome to **ACM at UH Mānoa**"*, *"Our **Programs**"*, *"Events & **Gallery**"*,
  *"Frequently Asked **Questions**"*.
- **CTAs** are short verb phrases, usually followed by a right-arrow icon:
  *"Explore Programs →", "Learn More →", "View Details", "Join Discord"*.
- **The diacritic matters:** always write **"Mānoa"** with the ʻokina/macron
  (Mānoa), and **"Hawaiʻi"** where space allows.
- **Stats** are phrased as round numbers with a `+`: *7+ Special Interest
  Groups, 500+ Active Members, 50+ Events Annually.*
- **Emoji:** essentially none in product copy. The single exception is the
  footer's *"Built with ♥ by 8bitUHM"*. Don't sprinkle emoji into UI.
- **Empty states** are encouraging, never dead-ends: *"No upcoming events at the
  moment. Check back soon for updates!"* always paired with a Discord CTA.

---

## Visual foundations

- **Typeface — Quicksand only.** Rounded, geometric, friendly sans. Weights
  300–700; headings use 700, buttons/labels 600, nav/labels 500, body 400.
  Large display headings use slight negative tracking (`--tracking-tight`).
- **Color.** Tailwind's default palette. **Blue** (`blue-600 #2563eb`) is the
  primary action color; **purple** (`purple-600`) and **indigo** are secondary.
  Neutrals are the Tailwind **gray** scale; the footer adds a **stone-800**
  mid-stop. Decorative accents (pink, cyan) appear *only* in blurred hero blobs.
- **The signature gradient.** `blue-600 → purple-600`, used three ways:
  (1) headline accent words (clipped to text), (2) primary/feature CTAs,
  (3) the round date badges on events. A lighter `blue-500 → indigo-500`
  variant draws the short underline divider beneath section headings.
- **Backgrounds.** Pages sit on a soft `blue-50 → white → indigo-50` diagonal
  wash. Heroes layer **5 large blurred color "blobs"** (`mix-blend-multiply`,
  `blur(40px)`, ~40% opacity) that **drift on a 7s loop**. No photographic
  hero backgrounds; imagery lives inside cards and carousels.
- **Cards.** White, **heavily rounded** (`rounded-2xl`/`rounded-3xl` →
  `--radius-lg`/`--radius-xl`), a **1px `gray-100` hairline border**, and
  `shadow-lg` at rest. On hover they **lift** (`-translate-y-2`/`-3`) and deepen
  to `shadow-2xl`. Feature cards' logos scale up; titles shift to brand blue.
- **Buttons.** Pill-ish `rounded-xl` (`--radius-md`), `font-semibold`,
  `shadow-lg`. Primary = solid `blue-600` → `blue-700` on hover; gradient =
  the signature wash; secondary = 2px gray outline that turns blue on hover.
  All lift ~1px on hover.
- **Pills / badges.** `rounded-full`, `blue-50` background, `blue-600` text —
  used for role labels and chips.
- **Borders & dividers.** Hairline `gray-100`/`gray-200`. Section dividers are
  a 6rem × 4px gradient bar with full rounding. Page heroes get a 4px gradient
  bottom border; the nav gets a 4px gradient bar along its bottom edge.
- **Shadows.** Tailwind elevation: `sm` (nav, chips) → `lg` (resting cards) →
  `xl` (prose panels) → `2xl` (hover). Soft, neutral, never colored.
- **Transparency & blur.** The nav is `white/95` + `backdrop-blur`; hero stat
  tiles are `white/60` + blur (frosted glass). Blobs rely on multiply blending.
- **Motion.** One easing curve everywhere: `cubic-bezier(0.4,0,0.2,1)`.
  Durations: 200ms (color/hover), 300ms (lift/scale), 500ms (large card hover),
  800ms (scroll-reveal fade-ins). Reveals fade up 30px on scroll-into-view;
  stats count up. Nothing bounces. Respect `prefers-reduced-motion`.
- **Corner radii.** sm 8 · md 12 (buttons) · lg 16 (cards) · xl 24 (features) · full (pills/avatars).
- **Layout.** Centered `max-w-7xl` (1280px) container, 1.5rem gutters; reading
  columns cap at `max-w-4xl`. Sticky 80px nav. Sections are tall (≈95–100vh on
  the home page) with `py-20` breathing room and centered headers.

---

## Iconography

- **UI icons are inline SVG in the Heroicons (outline) style** — 24×24 viewBox,
  `stroke="currentColor"`, `stroke-width="2"`, round caps/joins. Used for
  arrows (`→`), calendar, map-pin, clock, mail, and empty-state glyphs. There is
  **no icon font** and no sprite sheet in the codebase.
- **Brand / social icons are solid-fill SVG** (GitHub, Discord, Instagram,
  LinkedIn) — these exact paths are baked into the `Footer` component so you
  never need to hand-draw them.
- **The FAQ help icon** is a solid blue question-mark circle on a `blue-100` dot.
- **Emoji / Unicode as icons:** avoid. The only Unicode glyph in use is the
  heart (♥) in the footer credit.
- **Assets shipped** (`assets/`): `acm_logo.png` (the light-blue ACM diamond
  with the UH seal and Hawaiian floral motifs — the primary mark),
  `default_user.svg` (avatar fallback), `handshake.png` (sponsor/partner glyph),
  `discord.png` (the chapter's Discord-invite QR code).
- **Recreating UI?** Prefer copying these assets and the built-in component SVGs
  over drawing your own. If you need icons the codebase lacks, pull from
  **Heroicons** (outline, 2px) to match the existing stroke style, and flag it.

---

## Index / manifest

**Foundations**
- `styles.css` — root entry; `@import`s every token + base file (consumers link this).
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css`
- `guidelines/*.card.html` — Design-System-tab specimen cards (Type, Colors, Spacing, Brand).

**Components** (`window.ACMMNoaDesignSystem_b1bbe6.*`)
- `components/core/` — **Button**, **Badge**, **SectionHeader**
- `components/cards/` — **FeatureCard**, **EventCard**, **ProfileCard**, **StatCard**
- `components/navigation/` — **NavBar**, **Footer**
- `components/feedback/` — **Accordion**
- Each directory has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and a `*.card.html` thumbnail.

**UI kit**
- `ui_kits/website/` — interactive recreation of the ACM Mānoa marketing site
  (home hero + programs + events + FAQ, plus About). See its `README.md`.

**Other**
- `assets/` — logo, avatar, sponsor + Discord-QR images.
- `SKILL.md` — Agent-Skills front-matter so this folder works as a Claude skill.

---

*Reconstructed from https://github.com/8bitUHM/acmmanoa-site. Built by the ACM
Mānoa dev club, 8bitUHM. Explore that repo for the source of truth.*
