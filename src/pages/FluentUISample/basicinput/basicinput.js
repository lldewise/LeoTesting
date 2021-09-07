import React from 'react';
import FluentButton from './fluentuibutton/fluentbutton';
import FluentUICheckbox from './fluentuicheckbox/fluentuichekbox';
import FluentUIGroupChoice from './fluentuigroupchoice/fluentuigroupchoice';
import FluentUICombobox from './fluentuicombobox/fluentuicombobox';
import FluentUIDropdown from './fluentuidropdown/fluentuidropdown';
import FluentUILabel from './fluentuilabel/fluentuilabel';
import FluentUILink from './fluentuilink/fluentuilink';
//import FluentUIRating from  './fluentuirating/fluentuirating';
import FluentUISearchBox from './fluentuisearchbox/fluentuisearchbox';
import FluentUISlider from './fluentuislider/fluentuislider';
import FluetUISpinButton from './fluentuislipbuton/fluentuispinbutton';
import FluentUITextFields from './fluentuitextfields/fluentuitextfields';
import FluentUIToggle from './fluentuitoggle/fluentuitoggle';

const BasicInput = () => {
  return (
    <div>
      <FluentButton />
      <FluentUICheckbox />
      <FluentUIGroupChoice />
      <FluentUICombobox />
      <FluentUIDropdown />
      <FluentUILabel />
      <FluentUILink />
      {/* <FluentUIRating/> */}
      <FluentUISearchBox />
      <FluentUISlider />
      <FluetUISpinButton />
      <FluentUITextFields />
      <FluentUIToggle />
    </div>
  );
};

export default BasicInput;
