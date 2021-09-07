import React, { Fragment } from 'react';
import {
  Stack,
  styled,
  classNamesFunction,
  IStackStyles,
  memoizeFunction,
} from '@fluentui/react';

import UserMenu from './UserMenu';
import SearchEngine from './SearchEngine';
import classes from './TopMenu.module.scss';
import { MenuProps } from '../../../types/components/layout/topmenu';

const getStyles = memoizeFunction(
  ({ theme }: { theme: any }): Partial<IStackStyles> => {
    return {
      root: {
        borderBottomStyle: 'solid',
        borderBottomColor: theme.semanticColors.bodyFrameDivider,
        borderBottomWidth: 1,
        height: 50,
        backgroundColor: '#6c35d4',
        alignItems: 'center',
      },
    };
  },
);

const getClassNames = classNamesFunction();

const TopMenuComponent: React.FC<MenuProps> = ({ styles, theme }) => {
  const classNames = getClassNames(styles, { theme });

  return (
    <>
      {/* <Stack
        horizontal disableShrink
        //horizontalAlign="space-between"
        //align="center"
        className={classNames.root}
        tokens={{ childrenGap: "1em" }}>        
      </Stack> */}
      <div className={classes.container}>
        <div className={classes.search}>
          <SearchEngine />
        </div>
        <div className={classes.menu}>
          {' '}
          <UserMenu />
        </div>
      </div>
    </>
  );
};

const TopMenu = styled(TopMenuComponent, getStyles);

export default TopMenu;
