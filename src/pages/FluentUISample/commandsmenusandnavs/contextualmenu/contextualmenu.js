import React from 'react';
import ContextualMenuBasicExample from './basiccontextualmenu/basiccontextualmenu';
import ContextualMenuWithCustomMenuItemExample from './contextmenuwithcustomrenderedmenuitems/contextmenuwithcustomrenderedmenuitems';
import ContextualMenuPersistedExample from './contextualmenuwhichisperistedinthedom/contextualmenuwhichisperistedinthedom';
import ContextualMenuWithScrollBarExample from './contextualmenuwithascrollbardandfixeddirection/contextualmenuwithascrollbardandfixeddirection';
import ContextualMenuDirectionalExample from './contextualmenuwithbreakanddirectionalsettings/contextualmenuwithbreakanddirectionalsettings';
import ContextualMenuCheckmarksExample from './contextualmenuwithcheckablemenuitemsandtoggleablesplitbutton/contextualmenuwithcheckablemenuitemsandtoggleablesplitbutton';
import ContextualMenuCustomizationExample from './contextualmenuwithcustomizedsubmenus/contextualmenuwithcustomizedsubmenus';
import ContextualMenuCustomizationWithNoWrapExample from './contextualmenuwithcustomizedsubmenusandnowrapattributes/contextualmenuwithcustomizedsubmenusandnowrapattributes';
import ContextualMenuWithCustomMenuListExample from './contextualmenuwithcustomrenderedmenulistthatrendersasearch/contextualmenuwithcustomrenderedmenulistthatrendersasearch';
import ContextualMenuHeaderExample from './contextualmenuwithheader/contextualmenuwithheader';
import ContextualMenuIconExample from './contextualmenuwithicons/contextualmenuwithicons';
import ContextualMenuIconSecondaryTextExample from './contextualmenuwithiconsandsecondarytext/contextualmenuwithiconsandsecondarytext';
import ContextualMenuSectionExample from './contextualmenuwithsectionheaders/contextualmenuwithsectionheaders';
import ContextualMenuSubmenuExample from './contextualmenuwithsubmenus/contextualmenuwithsubmenus';
import ContextualMenuDefaultExample from './defaultcontextualmenu/defaultcontextualmenu';

const Contextualmenu = () => {
  return (
    <div>
      <ContextualMenuBasicExample />
      <ContextualMenuDefaultExample />
      <ContextualMenuPersistedExample />
      <ContextualMenuIconExample />
      <ContextualMenuIconSecondaryTextExample />
      <ContextualMenuSubmenuExample />
      <ContextualMenuSectionExample />
      <ContextualMenuCheckmarksExample />
      <ContextualMenuDirectionalExample />
      <ContextualMenuCustomizationExample />
      <ContextualMenuCustomizationWithNoWrapExample />
      <ContextualMenuWithScrollBarExample />
      <ContextualMenuWithCustomMenuItemExample />
      <ContextualMenuWithCustomMenuListExample />
      <ContextualMenuHeaderExample />
    </div>
  );
};

export default Contextualmenu;
