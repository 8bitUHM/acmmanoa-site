import * as React from 'react';

/**
 * Profile card for leadership & faculty grids — avatar, name, role pill, bio.
 */
export interface ProfileCardProps {
  name: string;
  /** Role label rendered as a brand pill, e.g. "President". */
  role?: string;
  bio?: string;
  /** Avatar image URL. Defaults to the bundled default_user.svg. */
  avatar?: string;
  style?: React.CSSProperties;
}

export function ProfileCard(props: ProfileCardProps): JSX.Element;
