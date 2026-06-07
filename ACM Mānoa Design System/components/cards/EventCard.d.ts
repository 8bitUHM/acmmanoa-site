import * as React from 'react';

/**
 * Event card in compact (date-badge list) or media (image grid) layout.
 * @startingPoint section="Cards" subtitle="Event tile — compact or media layout" viewport="420x460"
 */
export interface EventCardProps {
  title: string;
  description?: string;
  /** Compact layout date badge, e.g. { day: "14", month: "FEB" }. */
  date?: { day: string; month: string };
  /** Full date string for the meta row, e.g. "February 14, 2025". */
  dateLabel?: string;
  time?: string;
  location?: string;
  /** Media layout top image URL. Falls back to a gradient placeholder. */
  image?: string;
  /** @default "compact" */
  layout?: 'compact' | 'media';
  href?: string;
  style?: React.CSSProperties;
}

export function EventCard(props: EventCardProps): JSX.Element;
