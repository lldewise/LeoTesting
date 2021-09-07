import React from 'react';
import logger from 'loglevel';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

const options = [
  { key: 'A', text: 'Action Text' },
  { key: 'B', text: 'Action Text' },
  { key: 'C', text: 'Action Text', disabled: true },
];

function _onChange(ev, option) {
  logger.dir(option);
}

const FluentUIGroupChoice = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>ChoiceGroup</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <ChoiceGroup
          className="cg-default"
          defaultSelectedKey="A"
          options={options}
          onChange={_onChange}
          label="Default"
          required={true}
        />
      </div>

      <div className="divpadt10">
        <ChoiceGroup
          className="cg-primary"
          defaultSelectedKey="A"
          options={options}
          onChange={_onChange}
          label="Primary"
          required={true}
        />
      </div>

      <div className="divpadt10">
        <ChoiceGroup
          className="cg-secondary"
          defaultSelectedKey="A"
          options={options}
          onChange={_onChange}
          label="Secondary"
          required={true}
        />
      </div>

      <div className="divpadt10">
        <ChoiceGroup
          className="cg-disabled"
          defaultSelectedKey="A"
          options={options}
          onChange={_onChange}
          label="Disabled"
          required={true}
        />
      </div>
    </div>
  );
};

export default FluentUIGroupChoice;
