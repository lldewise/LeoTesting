import React from 'react';
import CalloutBasicExample from './defaultcallout/defaultcallout';
//import CalloutFocusTrapExample from './focustrapcalloutvariant/focustrapcalloutvariant'
//import StatusCalloutExample from './nonfocusablecallout/nonfocusablecallout'
//import CalloutDirectionalExample from './calloutwithdirectionalhint/calloutwithdirectionalhint'
//import CalloutCoverExample from './calloutthatcoversthetargets/calloutthatcoversthetargets'

const CallOut = () => {
  return (
    <div className="ms-Grid-row">
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>Callout</h5>
        </span>
      </div>
      <CalloutBasicExample />
      {/* <CalloutFocusTrapExample/>
        <StatusCalloutExample/>
        <CalloutDirectionalExample/>
        <CalloutCoverExample/> */}
    </div>
  );
};

export default CallOut;
