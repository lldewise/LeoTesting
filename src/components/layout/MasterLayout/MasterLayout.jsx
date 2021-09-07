import React from 'react';
import { Stack, styled, classNamesFunction } from '@fluentui/react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import Sidebar from '../Sidebar';
import TopMenu from '../TopMenu';

const getStyles = ({ theme }) => {
  return {
    root: {},
    sidebar: {},
    contentWrapper: {
      paddingLeft: theme.spacing.l2,
      paddingRight: theme.spacing.l2,
      height: '100vh',
    },
  };
};

const getClassNames = classNamesFunction();

function MasterLayoutComponent({ children, theme, styles }) {
  const classNames = getClassNames(styles, { theme });
  return (
    <Stack horizontal className={classNames.root}>
      <SWRConfig value={{ fetcher: url => axios(url).then(r => r.data) }}>
        <Stack.Item grow={false} className={classNames.sidebar}>
          <Sidebar />
        </Stack.Item>
        <Stack.Item grow={true}>
          <TopMenu />
          {children}
        </Stack.Item>
      </SWRConfig>
    </Stack>
  );
}

export const MasterLayout = styled(MasterLayoutComponent, getStyles);
