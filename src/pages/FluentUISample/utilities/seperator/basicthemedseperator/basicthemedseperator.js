import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

const theme = createTheme({
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px',
    },
  },
});

const stackTokens = { childrenGap: 12 };

export const SeparatorThemingExample = () => (
  <div>
    SeparatorThemingExample
    <Stack tokens={stackTokens}>
      <Text>Horizontal center aligned with custom theme</Text>
      <Separator theme={theme}>Today</Separator>
    </Stack>
  </div>
);

export default SeparatorThemingExample;
