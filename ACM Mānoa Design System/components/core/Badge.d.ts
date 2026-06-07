import * as React from 'react';

/**
 * Tinted pill used for role labels and status chips.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "brand" */
  variant?: 'brand' | 'neutral' | 'solid' | 'outline';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
