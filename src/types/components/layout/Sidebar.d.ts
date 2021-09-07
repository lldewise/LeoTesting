import React from 'react';
import { INavLink } from 'office-ui-fabric-react';

export type NavLinkOnPress = (
  ev: React.MouseEvent<HTMLElement> | undefined,
  item: INavLink | undefined,
) => void;
