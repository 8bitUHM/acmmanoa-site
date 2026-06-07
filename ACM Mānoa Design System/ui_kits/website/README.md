# UI Kit — ACM Mānoa Marketing Site

An interactive, high-fidelity recreation of the public ACM Mānoa website,
composed entirely from this design system's components.

## Run it
Open `index.html`. It loads `styles.css` (tokens) and the compiled
`_ds_bundle.js` (components), then mounts the React app.

## What's interactive
- **Sticky nav** with the animated gradient accent bar and hover underlines.
- **Click "About"** in the nav to route to the About page (overview,
  leadership grid, mission). The ACM logo / other links return you home.
- **In-page anchors** ("Explore Programs", "View Events") smooth-scroll the home page.
- **FAQ accordion** expands/collapses (single-open).
- **Cards** lift and respond on hover throughout.

## Structure
- `index.html` — shell: loads React, the DS bundle, and the section scripts.
- `App.jsx` — app shell + fake routing between Home and About; renders `NavBar` + `Footer`.
- `Hero.jsx` — gradient hero with drifting blobs, logo, headline, CTAs, stat tiles.
- `Programs.jsx` — SIG grid built from `FeatureCard`.
- `Events.jsx` — upcoming list (`EventCard` compact) + featured (`EventCard` media).
- `Faq.jsx` — `Accordion` of common questions.
- `About.jsx` — About page: overview/mission prose panels + `ProfileCard` leadership grid.

Section files are plain Babel scripts that attach to `window.ACMKit` and pull
primitives from `window.ACMMNoaDesignSystem_b1bbe6`. They are intentionally
*not* design-system components (no `.d.ts`) — they're product surfaces.

## Fidelity notes
- Content (SIG names, events, leaders) is representative placeholder data — the
  live site loads these from a Django/Postgres backend. Swap in real data freely.
- The live site uses Tailwind + Flowbite; this recreation uses the portable
  token CSS and React primitives instead, but matches the visual design.
