import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 250,
  },
};
const stackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    justifyContent: 'center',
  },
};

// Tokens definition
const outerStackTokens = { childrenGap: 5 };
const innerStackTokens = {
  childrenGap: 5,
  padding: 10,
};

export const VerticalStackGrowExample = () => {
  return (
    <div>
      VerticalStackGrowExample
      <Stack tokens={outerStackTokens}>
        <Stack styles={stackStyles} tokens={innerStackTokens}>
          <Stack.Item grow={3} styles={stackItemStyles}>
            Grow is 3
          </Stack.Item>
          <Stack.Item grow={2} styles={stackItemStyles}>
            Grow is 2
          </Stack.Item>
          <Stack.Item grow styles={stackItemStyles}>
            Grow is 1
          </Stack.Item>
        </Stack>
      </Stack>
    </div>
  );
};

export default VerticalStackGrowExample;
