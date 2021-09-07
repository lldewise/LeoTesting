import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(useTrapZone => ({
  root: {
    border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`,
    padding: 10,
  },
}));

const textFieldStyles = { root: { width: 300 } };
const stackTokens = { childrenGap: 8 };

const FocusTrapZoneBoxExample = () => {
  const toggle = React.useRef(null);
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Simple Box</div>
        <div className="divpadt10">
          <Stack tokens={stackTokens}>
            <Stack.Item>
              <Text>
                If this button is used to enable FocusTrapZone, focus should
                return to this button after the FocusTrapZone is disabled.
              </Text>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton onClick={toggleUseTrapZone} text="Trap Focus" />
            </Stack.Item>
            <FocusTrapZone disabled={!useTrapZone}>
              <Stack
                horizontalAlign="start"
                tokens={stackTokens}
                styles={getStackStyles(useTrapZone)}>
                <Toggle
                  label="Use trap zone"
                  componentRef={toggle}
                  checked={useTrapZone}
                  onChange={toggleUseTrapZone}
                  onText="On (toggle to exit)"
                  offText="Off"
                />
                <TextField
                  label="Input inside trap zone"
                  styles={textFieldStyles}
                />
                <Link href="https://bing.com" target="_blank">
                  Hyperlink inside trap zone
                </Link>
              </Stack>
            </FocusTrapZone>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FocusTrapZoneBoxExample;
