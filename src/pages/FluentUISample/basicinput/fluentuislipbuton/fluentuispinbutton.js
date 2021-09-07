import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

const FluetUISpinButton = () => (
  <div className="ms-Grid-col ms-lg4">
    <div className="fluenttitle divpadt10">
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>Spin Button</h5>
        </span>
      </div>
    </div>
    <div className="divpadt10">
      <div className="divpadt10">
        <SpinButton
          defaultValue="0"
          label={'Basic SpinButton:'}
          min={0}
          max={100}
          step={1}
          iconProps={{ iconName: 'IncreaseIndentLegacy' }}
          incrementButtonAriaLabel={'Increase value by 1'}
          decrementButtonAriaLabel={'Decrease value by 1'}
        />
      </div>
      <div className="divpadt10">
        <SpinButton
          defaultValue="0"
          label={'Decimal SpinButton:'}
          min={0}
          max={10}
          step={0.1}
          incrementButtonAriaLabel={'Increase value by 0.1'}
          decrementButtonAriaLabel={'Decrease value by 0.1'}
        />
      </div>
    </div>
  </div>
);

export default FluetUISpinButton;
