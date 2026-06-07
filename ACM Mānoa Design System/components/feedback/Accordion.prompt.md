**Accordion** — the home-page FAQ list. Rounded bordered cards, a blue help-circle icon beside each question, and a chevron that rotates open. Single-open by default; the body height animates via a `grid-template-rows` transition.

```jsx
<Accordion
  defaultOpen={0}
  items={[
    { question: 'How do I join ACM?', answer: 'Hop into our Discord and come to any event — membership is free and open to all majors.' },
    { question: 'Do I need coding experience?', answer: 'Not at all. Our SIGs welcome complete beginners.' },
  ]}
/>
```

- Set `allowMultiple` to let several panels stay open.
