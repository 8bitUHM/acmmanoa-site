---
name: acm-manoa-design
description: Use this skill to generate well-branded interfaces and assets for ACM at UH Mānoa (the Association for Computing Machinery student chapter), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — the design guide: sources, content fundamentals, visual foundations, iconography, manifest.
- `styles.css` — link this one file to get all tokens + fonts. It `@import`s `tokens/*`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`.
- `components/` — React primitives (Button, Badge, SectionHeader, FeatureCard, EventCard, ProfileCard, StatCard, NavBar, Footer, Accordion). Each has a `.prompt.md` with usage.
- `ui_kits/website/` — a full interactive recreation of the ACM Mānoa site; the best reference for how the pieces fit together.
- `assets/` — logo, default avatar, sponsor + Discord-QR images.
- `guidelines/*.card.html` — visual specimen cards for type, color, spacing, brand.

## The one-line brand
Friendly, student-run, optimistic: rounded **Quicksand** type, a **blue
primary** with a signature **blue→purple gradient** on headline words and CTAs,
soft drifting hero "blobs", heavily-rounded white cards that lift on hover, and
a dark blue-black footer. Always write **"Mānoa"** with the macron.
