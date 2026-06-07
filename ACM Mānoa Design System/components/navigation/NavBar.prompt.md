**NavBar** — the sticky, translucent, blurred top nav. Logo + wordmark left, links right with an animated underline, and a thin gradient accent bar pinned to the bottom edge.

```jsx
<NavBar
  activeHref="/events"
  links={[
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'SIGS', href: '/sigs' },
  ]}
/>
```

- `activeHref` keeps one link underlined.
- Defaults render the real ACM Mānoa nav (About / Events / Sponsors / ICSpace / SIGS).
