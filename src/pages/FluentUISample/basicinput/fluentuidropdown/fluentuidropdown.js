import React from 'react';

import {
  Dropdown,
  DropdownMenuItemType,
} from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles = {
  dropdown: { width: 300 },
};

const options = [
  {
    key: 'fruitsHeader',
    text: 'Fruits',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  {
    key: 'vegetablesHeader',
    text: 'Vegetables',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

const FluentUIDropdown = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">Dropdown</div>
      <div className="divpadt10">
        <Dropdown
          placeholder="Select an option"
          label="Basic uncontrolled example"
          options={options}
          styles={dropdownStyles}
        />

        <Dropdown
          label="Disabled example with defaultSelectedKey"
          defaultSelectedKey="broccoli"
          options={options}
          disabled={true}
          styles={dropdownStyles}
        />

        <Dropdown
          placeholder="Select options"
          label="Multi-select uncontrolled example"
          defaultSelectedKeys={['apple', 'banana', 'grape']}
          multiSelect
          options={options}
          styles={dropdownStyles}
        />
      </div>
    </div>
  );
};

export default FluentUIDropdown;
