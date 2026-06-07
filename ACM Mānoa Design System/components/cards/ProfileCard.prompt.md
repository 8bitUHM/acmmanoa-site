**ProfileCard** — leadership & faculty grid member. Circular ringed avatar, name, brand role pill, optional bio. Avatar scales and name turns blue on hover.

```jsx
<ProfileCard
  name="Jane Developer"
  role="President"
  bio="Senior in CS, passionate about open source."
  avatar="assets/jane.jpg"
/>
```

- Omit `avatar` to use the bundled `default_user.svg`.
- Use in a `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` grid.
