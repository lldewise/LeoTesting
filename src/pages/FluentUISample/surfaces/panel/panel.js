import React from 'react';
import PanelBasicExample from './basicpanel/basicpanel';
import PanelSizesExample from './sizeoptionpanel/sizeoptionpanel';
import PanelFooterExample from './panelfooter/panelfooter';
//import PanelLightDismissExample from './lightdismisspanel/lightdismisspanel'
//import PanelHiddenOnDismissExample from './hiddenondismisspanel/hiddenondismisspanel'
//import PanelControlledExample from './controlvisibilitypanel/controlvisibilitypanel'
//import PanelConfirmDismissExample from './confirmdismisspanel/confirmdismisspanel'
//import PanelLightDismissCustomExample from './confirmlightdismisspanel/confirmlightdismisspanel'
//import PanelNonModalExample from './nonmodalpanel/nonmodalpanel'
//import PanelNavigationExample from './panelcustomnavigation/panelcustomnavigation'
//import PanelHandleDismissTargetExample from './paneldetectdismissal/paneldetectdismissal'

const Panel = () => {
  return (
    <div className="ms-Grid-row">
      <PanelBasicExample />
      <PanelSizesExample />
      <PanelFooterExample />
      {/* <PanelLightDismissExample/>
            <PanelHiddenOnDismissExample/>
            <PanelControlledExample/>
            <PanelConfirmDismissExample/>
            <PanelLightDismissCustomExample/>
            <PanelNonModalExample/>
            <PanelNavigationExample/>
            <PanelHandleDismissTargetExample/> */}
    </div>
  );
};

export default Panel;
