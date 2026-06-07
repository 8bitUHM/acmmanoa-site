**StatCard** — frosted metric tile from the hero. Big colored number + label. Rotate the `color` across a row (blue / purple / indigo).

```jsx
<StatCard value="7+"   label="Special Interest Groups" color="var(--blue-600)" />
<StatCard value="500+" label="Active Members"          color="var(--purple-600)" />
<StatCard value="50+"  label="Events Annually"         color="var(--indigo-600)" />
```

- `glass` (default true) gives the translucent blur surface for placing over the hero wash. Set `glass={false}` on solid backgrounds.
