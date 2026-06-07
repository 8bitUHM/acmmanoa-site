**FeatureCard** — the SIG / program tile from the home page. Logo on a soft blue→indigo plate, bold title, blurb, and a full-width gradient action. Lifts 12px on hover.

```jsx
<FeatureCard
  logo="assets/sig-ai.png"
  title="SIG-AI"
  description="Hands-on machine learning projects, paper readings, and Kaggle competitions."
  actionLabel="Learn More"
  accentColor="#9333ea"
/>
```

- `logo` accepts an image URL or a React node.
- `accentColor` tints the logo's ring (use a SIG's own brand color).
- Designed for a 3-up responsive grid with `gap: var(--space-8)`.
