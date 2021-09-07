import * as React from 'react';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(useTrapZone => ({
  root: {
    border: `2px dashed ${useTrapZone ? '#ababab' : 'transparent'}`,
    padding: 10,
  },
}));
const textFieldStyles = { root: { width: 300 } };
const stackTokens = { childrenGap: 15 };

const FocusTrapZoneBoxClickExample = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  const toggle = React.useRef(null);
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Simple box with clicking outside trap zone enabled
        </div>
        <div className="divpadt10">
          <FocusTrapZone
            disabled={!useTrapZone}
            isClickableOutsideFocusTrap
            forceFocusInsideTrap={false}>
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
        </div>
      </div>
    </div>
  );
};

export default FocusTrapZoneBoxClickExample;
