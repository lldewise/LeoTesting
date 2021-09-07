import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import logger from 'loglevel';

const FluentUIToggle = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          <div className="fluentDivTitle">
            <span className="titleLine" />
            <span>
              <h5>Toggles</h5>
            </span>
          </div>
        </div>
        <div className="divpadt10">
          <Toggle
            label="Default Toggle"
            className="defaultToggle"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Primary Toggle"
            className="primaryToggle"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Secondary Toggle"
            className="secondaryToggle"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Attendance Toggle"
            className="attendanceToggle"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Enabled and unchecked"
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Disabled and checked"
            defaultChecked
            disabled
            onText="On"
            offText="Off"
          />

          <Toggle
            label="Disabled and unchecked"
            disabled
            onText="On"
            offText="Off"
          />

          <Toggle
            label="With inline label"
            inlineLabel
            onText="On"
            offText="Off"
            onChange={_onChange}
          />

          <Toggle
            label="Disabled with inline label"
            inlineLabel
            disabled
            onText="On"
            offText="Off"
          />

          <Toggle
            label="With inline label and without onText and offText"
            inlineLabel
            onChange={_onChange}
          />

          <Toggle
            label="Disabled with inline label and without onText and offText"
            inlineLabel
            disabled
          />

          <Toggle
            label="Enabled and checked (ARIA 1.0 compatible)"
            defaultChecked
            onText="On"
            offText="Off"
            onChange={_onChange}
            role="checkbox"
          />
        </div>
      </div>
    </div>
  );
};

function _onChange(ev, checked) {
  logger.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}

export default FluentUIToggle;
