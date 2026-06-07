import * as React from 'react';

/**
 * Centered section heading with a gradient accent word and signature divider.
 */
export interface SectionHeaderProps {
  /** Leading title text (renders in strong neutral). */
  title: React.ReactNode;
  /** Optional accent word rendered in the blue→purple gradient. */
  accent?: string;
  /** Optional supporting line below the divider. */
  subtitle?: React.ReactNode;
  /** @default "center" */
  align?: 'center' | 'left';
  style?: React.CSSProperties;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
