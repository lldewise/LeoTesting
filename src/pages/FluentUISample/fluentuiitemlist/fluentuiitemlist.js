import React from 'react';
import FluentUIActivityItem from './fluentuiactivityitem/fluentuiactivityitem';
import FluentUIDetailsList from './fluentuidetaillist/fluentuidetaillist';
import FluentUIDetailsListWithVariable from './fluentuidetaillist/fluentuidatalistwithvariable';
//import FluentUIDetailsListGrouped from './fluentuidetaillist/fluentuidetaillistgroup';
import FluentUIDetailsListNavigatingFocus from './fluentuidetaillist/fluentuidatalistnav';
import FluentUIShimmerApplication from './fluentuidetaillist/fluentuidatalistshimmer';
//import FluentUIDocumentCardBasic from './fluentuidocumentcard/fluentuidocumentcard';
//import FluentUIDocumentCardCompact from './fluentuidocumentcard/fluentuidocumentcardlayout';
//import FluentUIDocumentCardCompleteViewMultiple from './fluentuidocumentcard/fluentuidocumentcardviewmultiple';
//import FluentUIDocumentCardImage from './fluentuidocumentcard/fluentuidocumentcardimageicon';
//import FluentUIDocumentCardConversationLogo from './fluentuidocumentcard/fluentuidocumentcardlogo';
//import FluentUIFacepileBasic from './fluentuifecipile/fluentuifecipile';
//import FluentUIGroupedListBasic from './fluentuigrouplist/fluentuigrouplist';
//import FluentUIGroupedListCustomExample from './fluentuigrouplist/fluentuigrouplistcustom';
//import FluentUIHoverCardBasic from './fluentuihovercard/hovercardbasicelement';
//import FluentHoverCardTargetCustom  from './fluentuihovercard/hovercardcustomkey';
//import HoverCardPlainCardElement from './fluentuihovercard/hovercardelement';
//import FluentUIHoverCardInstantDismiss from './fluentuihovercard/fluentuihovercardclick';
//import ListGridExample from './fluentuibasiclist/fluentuilist';
//import ListBasicVariableHeight from './fluentuibasiclist/fluentuilistvariable';
//import FluentUIListGhosting from './fluentuibasiclist/fluentuilistrender';
import PersonaBasicExample from './fluentuipersona/personasize';
import PersonaInitialsExample from './fluentuipersona/personainitial';
//import PersonaColorsExample from './fluentuipersona/personacolor';
import PersonaCustomRenderExample from './fluentuipersona/personacustomtext';
import UnknownPersonaExample from './fluentuipersona/personaunknown';
//import PersonaPresenceExample from './fluentuipersona/personapresense';
const FluentUIItemList = () => {
  return (
    <div>
      <FluentUIActivityItem />
      <FluentUIDetailsList />
      <FluentUIDetailsListWithVariable />
      {/* <FluentUIDetailsListGrouped/> */}
      <FluentUIDetailsListNavigatingFocus />
      <FluentUIShimmerApplication />
      {/* <FluentUIDocumentCardBasic/> */}
      {/* <FluentUIDocumentCardCompact/>
        <FluentUIDocumentCardCompleteViewMultiple/>
        <FluentUIDocumentCardImage/>
        <FluentUIDocumentCardConversationLogo/>
        <FluentUIFacepileBasic/> */}
      {/* <FluentUIGroupedListBasic/>
        <FluentUIGroupedListCustomExample/> */}

      {/* <FluentUIGroupedListCustomCheckbox/> */}

      {/* <FluentUIHoverCardBasic/>
        <FluentHoverCardTargetCustom/>
        <HoverCardPlainCardElement/>
        <FluentUIHoverCardInstantDismiss/> */}
      {/* <ListGridExample/> */}
      {/* <ListBasicVariableHeight/>
        <FluentUIListGhosting/> */}
      <PersonaBasicExample />
      <PersonaInitialsExample />
      {/* <PersonaColorsExample/> */}
      <PersonaCustomRenderExample />
      <UnknownPersonaExample />
      {/* <PersonaPresenceExample/> */}
    </div>
  );
};

export default FluentUIItemList;
