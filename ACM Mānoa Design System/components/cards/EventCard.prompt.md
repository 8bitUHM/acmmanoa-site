**EventCard** — event listing tile in two layouts. `compact` is the home "Upcoming Events" list (gradient date badge + meta rows); `media` is the Events index grid (top image + "View Details" pill).

```jsx
<EventCard
  layout="compact"
  date={{ day: '14', month: 'FEB' }}
  title="Intro to Git & GitHub Workshop"
  dateLabel="February 14, 2025"
  time="5:00 PM"
  location="POST 318B"
/>

<EventCard layout="media" image="assets/event.jpg"
  title="Spring Hackathon" description="24 hours of building."
  dateLabel="March 8, 2025" location="iLab" />
```

- `media` falls back to a blue gradient placeholder with a calendar glyph when `image` is omitted.
