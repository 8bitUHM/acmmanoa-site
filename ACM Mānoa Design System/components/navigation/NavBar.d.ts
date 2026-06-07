import * as React from 'react';

/**
 * Sticky translucent top nav with logo, wordmark, links, and gradient accent bar.
 * @startingPoint section="Navigation" subtitle="Sticky site nav with gradient bar" viewport="1000x100"
 */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  /** Logo image URL. @default bundled acm_logo.png */
  logo?: string;
  /** Wordmark beside the logo. @default "at UH Mānoa" */
  brand?: string;
  links?: NavLink[];
  /** href of the current page (gets a persistent underline). */
  activeHref?: string;
  style?: React.CSSProperties;
}

export function NavBar(props: NavBarProps): JSX.Element;
