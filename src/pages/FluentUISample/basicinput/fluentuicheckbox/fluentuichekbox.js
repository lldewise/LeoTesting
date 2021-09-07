import React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import logger from 'loglevel';

function _onChange(ev, isChecked) {
  logger.log(`The option has been changed to ${isChecked}.`);
}

const FluentUICheckbox = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Checkbox</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <Checkbox
          label="Unchecked checkbox (uncontrolled)"
          onChange={_onChange}
        />

        <Checkbox
          label="Checked checkbox (uncontrolled)"
          defaultChecked
          onChange={_onChange}
        />

        <Checkbox label="Disabled checkbox" disabled />

        <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
      </div>
    </div>
  );
};

export default FluentUICheckbox;
