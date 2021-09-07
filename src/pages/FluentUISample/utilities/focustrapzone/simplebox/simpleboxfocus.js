import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const stackTokens = { childrenGap: 10 };
const getTrapZoneStackStyles = memoizeFunction(useTrapZone => ({
  root: {
    border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`,
    padding: 10,
  },
}));
const focusZoneStackStyles = {
  root: {
    border: '2px dashed #ababab',
    padding: 10,
  },
};

const FocusTrapZoneFocusZoneExample = () => {
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);
  const toggle = React.useRef(null);
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          FocusTrapZone with FocusZones
        </div>
        <div className="divpadt10">
          <FocusTrapZone
            disabled={!useTrapZone}
            forceFocusInsideTrap
            focusPreviouslyFocusedInnerElement>
            <Stack
              tokens={stackTokens}
              horizontalAlign="start"
              styles={getTrapZoneStackStyles(useTrapZone)}>
              <Toggle
                label="Use trap zone"
                componentRef={toggle}
                checked={useTrapZone}
                onChange={toggleUseTrapZone}
                onText="On (toggle to exit)"
                offText="Off"
              />
              <FocusZone
                direction={FocusZoneDirection.horizontal}
                data-is-visible>
                <Stack
                  horizontal
                  tokens={stackTokens}
                  styles={focusZoneStackStyles}>
                  <DefaultButton text="FZ1" />
                  <DefaultButton text="FZ1" />
                  <DefaultButton text="FZ1" />
                </Stack>
              </FocusZone>
              <DefaultButton text="No FZ" />
              <FocusZone
                direction={FocusZoneDirection.horizontal}
                data-is-visible>
                <Stack
                  horizontal
                  tokens={stackTokens}
                  styles={focusZoneStackStyles}>
                  <DefaultButton text="FZ2" />
                  <DefaultButton text="FZ2" />
                  <DefaultButton text="FZ2" />
                </Stack>
              </FocusZone>
            </Stack>
          </FocusTrapZone>
        </div>
      </div>
    </div>
  );
};

export default FocusTrapZoneFocusZoneExample;
