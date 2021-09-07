import React from 'react';
import FocusTrapZoneBoxExample from './simplebox/simplebox';
import FocusTrapZoneBoxCustomElementExample from './simplebox/simpleboxcustom';
import FocusTrapZoneBoxClickExample from './simplebox/simpleboxoutsidetrap';
import FocusTrapZoneNestedExample from './simplebox/simpleboxmutipletrap';
import FocusTrapZoneFocusZoneExample from './simplebox/simpleboxfocus';
import FocusTrapZoneDialogInPanelExample from './simplebox/simpleboxdialogpanel';
const FluentUIFocusTrapZone = () => {
  return (
    <div>
      <FocusTrapZoneBoxExample />
      <FocusTrapZoneBoxCustomElementExample />
      <FocusTrapZoneBoxClickExample />
      <FocusTrapZoneNestedExample />
      <FocusTrapZoneFocusZoneExample />
      <FocusTrapZoneDialogInPanelExample />
    </div>
  );
};

export default FluentUIFocusTrapZone;
