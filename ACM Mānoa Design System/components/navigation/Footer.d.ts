import * as React from 'react';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterSocial {
  type: 'github' | 'discord' | 'instagram' | 'linkedin';
  href: string;
}

/**
 * Dark gradient site footer with brand blurb, link columns, and social icons.
 * @startingPoint section="Navigation" subtitle="Dark footer with columns + socials" viewport="1000x420"
 */
export interface FooterProps {
  logo?: string;
  blurb?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  year?: number;
  style?: React.CSSProperties;
}

export function Footer(props: FooterProps): JSX.Element;
