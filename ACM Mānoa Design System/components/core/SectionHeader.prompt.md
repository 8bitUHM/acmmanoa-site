**SectionHeader** — the recurring centered heading that opens nearly every section ("Our **Programs**", "Events & **Gallery**"). The accent word renders in the brand gradient; a gradient divider sits beneath.

```jsx
<SectionHeader
  title="Our"
  accent="Programs"
  subtitle="Discover our Special Interest Groups, each focused on cutting-edge computing."
/>
```

- Put the gradient word in `accent`, the rest in `title`.
- `align="left"` drops the auto-centering for use in two-column layouts.
