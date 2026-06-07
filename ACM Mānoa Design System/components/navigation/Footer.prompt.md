**Footer** — the dark blue-black gradient footer. Brand blurb on the left, link columns, divider, copyright, and brand social icons (GitHub / Discord / Instagram / LinkedIn SVGs are built in).

```jsx
<Footer
  socials={[
    { type: 'discord', href: 'https://discord.gg/...' },
    { type: 'instagram', href: '...' },
  ]}
/>
```

- Renders the real ACM Mānoa columns by default — pass `columns` to override.
- `socials` accepts the four supported `type`s; icons are included.
