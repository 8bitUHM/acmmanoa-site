**Button** — the brand's call-to-action. Use `gradient` for the hero/primary marketing CTA, `primary` for standard actions, `secondary` (outline) as the paired alternative, `ghost` for inline text links with an arrow.

```jsx
const Arrow = <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>;

<Button variant="gradient" size="lg" icon={Arrow}>Explore Programs</Button>
<Button variant="secondary" size="lg">View Events</Button>
<Button variant="ghost" icon={Arrow}>Learn More</Button>
```

- All variants lift slightly (`translateY(-1px)`) and deepen their shadow on hover.
- Pass `href` to render an `<a>`; otherwise it's a `<button>`.
- Default radius is `--radius-md` (rounded-xl, 12px), matching site buttons.
