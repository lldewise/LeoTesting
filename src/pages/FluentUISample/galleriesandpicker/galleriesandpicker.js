import React from 'react';

import FluentUICalendar from './fluentuicalendar/fluentuicalendar';
//import FluentUIColorPicker from './fluentuicolorpicker/fluentuicolorpicker';
import FluentUIPeoplePicker from './fluentuipeoplepicker/fluentuipeoplepicker';
import FluentUIPicker from './fleuntuipicker/fluentuipicker';
//import FluentUISwatchColorPicker from './fluentuiswatchcolorpicker/fluentuiswatchcolorpicker';

const GalleriesandPicker = () => {
  return (
    <div>
      <FluentUICalendar />
      {/* <FluentUIColorPicker /> */}
      <FluentUIPeoplePicker />
      <FluentUIPicker />
      {/* <FluentUISwatchColorPicker /> */}
    </div>
  );
};

export default GalleriesandPicker;
