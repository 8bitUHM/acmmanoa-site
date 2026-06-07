import * as React from 'react';

/**
 * ACM Mānoa primary button. Solid blue, signature gradient, outline, or ghost.
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'gradient' | 'secondary' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon node (inline SVG). */
  icon?: React.ReactNode;
  /** @default "right" */
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  /** Render as a link when set. */
  href?: string;
  as?: 'button' | 'a';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
