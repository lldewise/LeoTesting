import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const stackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 5,
  },
};

// Tokens definition
const containerStackTokens = { childrenGap: 5 };
const verticalGapStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const itemAlignmentsStackTokens = {
  childrenGap: 5,
  padding: 10,
};
const clickableStackTokens = {
  padding: 10,
};

export const VerticalStackBasicExample = () => {
  return (
    <div>
      VerticalStackBasicExample
      <Stack tokens={containerStackTokens}>
        <span>Default vertical stack</span>
        <Stack styles={stackStyles}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>

        <span>Ordered stack</span>
        <Stack styles={stackStyles}>
          <Stack.Item order={2}>
            <span>Item One</span>
          </Stack.Item>
          <Stack.Item order={3}>
            <span>Item Two</span>
          </Stack.Item>
          <Stack.Item order={1}>
            <span>Item Three</span>
          </Stack.Item>
        </Stack>

        <span>Vertical gap between items</span>
        <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>

        <span>Item alignments</span>
        <Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
          <Stack.Item align="auto" styles={stackItemStyles}>
            <span>Auto-aligned item</span>
          </Stack.Item>
          <Stack.Item align="stretch" styles={stackItemStyles}>
            <span>Stretch-aligned item</span>
          </Stack.Item>
          <Stack.Item align="baseline" styles={stackItemStyles}>
            <span>Baseline-aligned item</span>
          </Stack.Item>
          <Stack.Item align="start" styles={stackItemStyles}>
            <span>Start-aligned item</span>
          </Stack.Item>
          <Stack.Item align="center" styles={stackItemStyles}>
            <span>Center-aligned item</span>
          </Stack.Item>
          <Stack.Item align="end" styles={stackItemStyles}>
            <span>End-aligned item</span>
          </Stack.Item>
        </Stack>

        <span>Clickable vertical stack</span>
        <Stack
          onClick={_onClick}
          styles={stackStyles}
          tokens={clickableStackTokens}>
          <span>Click inside this box</span>
        </Stack>
      </Stack>
    </div>
  );
};

function _onClick() {
  alert('Clicked VerticalStack');
}

export default VerticalStackBasicExample;
