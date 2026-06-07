import * as React from 'react';

/**
 * Feature / SIG program card — logo plate, title, blurb, gradient action.
 * @startingPoint section="Cards" subtitle="SIG / program tile with logo + CTA" viewport="380x440"
 */
export interface FeatureCardProps {
  /** Image URL or a React node (e.g. inline SVG icon). */
  logo: string | React.ReactNode;
  title: string;
  description?: string;
  /** @default "Learn More" */
  actionLabel?: string;
  href?: string;
  /** Optional border color for the logo plate (e.g. a SIG's brand color). */
  accentColor?: string;
  style?: React.CSSProperties;
}

export function FeatureCard(props: FeatureCardProps): JSX.Element;
