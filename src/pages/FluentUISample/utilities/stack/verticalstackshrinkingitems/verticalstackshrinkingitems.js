import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import {
  mergeStyles,
  DefaultPalette,
  IStyle,
} from 'office-ui-fabric-react/lib/Styling';

// Non-mutating styles definition
const stackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
const containerStyles = {
  height: 200,
};
const nonShrinkingStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
};

// Tokens definition
const outerStackTokens = { childrenGap: 5 };
const innerStackTokens = {
  childrenGap: 5,
  padding: 10,
};

export const VerticalStackShrinkExample = () => {
  const [stackHeight, setStackHeight] = React.useState(100);

  // Mutating styles definition
  const stackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      height: `${stackHeight}%`,
      overflow: 'hidden',
    },
  };

  return (
    <div>
      VerticalStackShrinkExample
      <Stack tokens={outerStackTokens}>
        <Slider
          label="Change the stack height to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={setStackHeight}
        />
        <div className={mergeStyles(containerStyles)}>
          <Stack styles={stackStyles} tokens={innerStackTokens}>
            <Stack.Item grow styles={stackItemStyles}>
              I shrink
            </Stack.Item>
            <Stack.Item grow styles={stackItemStyles}>
              I shrink
            </Stack.Item>
            <Stack.Item grow disableShrink styles={nonShrinkingStackItemStyles}>
              I don't shrink
            </Stack.Item>
            <Stack.Item grow styles={stackItemStyles}>
              I shrink
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default VerticalStackShrinkExample;
