import * as React from 'react';

/**
 * Translucent hero metric tile — big colored number + label.
 */
export interface StatCardProps {
  /** The metric, e.g. "500+". */
  value: React.ReactNode;
  label: string;
  /** Number color — rotate blue / purple / indigo across a row. @default blue-600 */
  color?: string;
  /** Frosted-glass surface (for use over the hero wash). @default true */
  glass?: boolean;
  style?: React.CSSProperties;
}

export function StatCard(props: StatCardProps): JSX.Element;
