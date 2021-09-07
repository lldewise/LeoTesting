import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';

const getStackStyles = memoizeFunction(isActive => ({
  root: {
    border: `2px solid ${isActive ? '#ababab' : 'transparent'}`,
    padding: 10,
  },
}));

const stackTokens = { childrenGap: 10 };
const fixedWidthToggleStyles = { root: { width: 200 } };
const FocusTrapComponent = props => {
  const [isActive, { toggle: toggleIsActive }] = useBoolean(false);
  const { zoneNumber, children } = props;
  const onStringButtonClicked = () => {
    alert(`Button ${zoneNumber} clicked`);
  };

  return (
    <FocusTrapZone disabled={!isActive} forceFocusInsideTrap={false}>
      <Stack
        horizontalAlign="start"
        tokens={stackTokens}
        styles={getStackStyles(isActive)}>
        <Toggle
          checked={isActive}
          onChange={toggleIsActive}
          label={'Enable trap zone ' + zoneNumber}
          onText="On (toggle to exit)"
          offText="Off"
          // Set a width on these toggles in the horizontal zone to prevent jumping when enabled
          styles={
            zoneNumber >= 2 && zoneNumber <= 4
              ? fixedWidthToggleStyles
              : undefined
          }
        />
        <DefaultButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onStringButtonClicked}
          text={`Zone ${zoneNumber} button`}
        />
        {children}
      </Stack>
    </FocusTrapZone>
  );
};

const FocusTrapZoneNestedExample = () => (
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-lg12 ">
      <div className="fluenttitle divpadt10">
        Multiple nested FocusTrapZones
      </div>
      <div className="divpadt10">
        <FocusTrapComponent zoneNumber={1}>
          <FocusTrapComponent zoneNumber={2}>
            <FocusTrapComponent zoneNumber={3} />
            <FocusTrapComponent zoneNumber={4} />
          </FocusTrapComponent>
          <FocusTrapComponent zoneNumber={5} />
        </FocusTrapComponent>
      </div>
    </div>
  </div>
);

export default FocusTrapZoneNestedExample;
