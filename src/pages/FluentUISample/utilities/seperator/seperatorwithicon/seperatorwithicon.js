import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const iconStyles = {
  root: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
};

const stackTokens = { childrenGap: 12 };

export const SeparatorIconExample = () => (
  <div>
    SeparatorIconExample
    <Stack tokens={stackTokens}>
      <Text>Horizontal center aligned with an icon as content</Text>
      <Separator>
        <Icon iconName="Clock" styles={iconStyles} />
      </Separator>
    </Stack>
  </div>
);

export default SeparatorIconExample;
