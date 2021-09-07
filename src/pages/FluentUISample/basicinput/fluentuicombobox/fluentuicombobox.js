import React from 'react';
import {
  ComboBox,
  SelectableOptionMenuItemType,
} from 'office-ui-fabric-react/lib/index';

const comboBoxBasicOptions = [
  {
    key: 'Header1',
    text: 'First heading',
    itemType: SelectableOptionMenuItemType.Header,
  },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  {
    key: 'Header2',
    text: 'Second heading',
    itemType: SelectableOptionMenuItemType.Header,
  },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];

const FluentUICombobox = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>ComboBox</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <ComboBox
          // componentRef={comboBoxRef}
          defaultSelectedKey="C"
          label="Basic ComboBox"
          allowFreeform
          autoComplete="on"
          options={comboBoxBasicOptions}
        />
      </div>
    </div>
  );
};

export default FluentUICombobox;
