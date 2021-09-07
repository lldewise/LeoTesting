import React from 'react';
//import CommandBarButtonAsExample from './commandbarcustombuttonsandoverflowmenu/commandbarcustombuttonsandoverflowmenu';
//import IndividualCommandBarButtonAsExampleWrapper from './commandbarwithcoachmarkonindividualbutton/commandbarwithcoachmarkonindividualbutton';
//import CommandBarLazyExample from './commandbarwithlazy-loadingmenus/commandbarwithlazy-loadingmenus';
import CommandBarBasicExample from './commandbarwithoverflowingmenuitems/commandbarwithoverflowingmenuitems';
//import CommandBarSplitDisabledExample from './commandbarwithsplitanddisabledbuttons/commandbarwithsplitanddisabledbuttons';

const Commandbar = () => {
  return (
    <div>
      <CommandBarBasicExample />
      {/* <CommandBarButtonAsExample/>
            <IndividualCommandBarButtonAsExampleWrapper/>
            <CommandBarSplitDisabledExample/>
            <CommandBarLazyExample/> */}
    </div>
  );
};

export default Commandbar;
