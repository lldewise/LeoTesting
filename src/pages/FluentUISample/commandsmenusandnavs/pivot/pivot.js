import React from 'react';
import PivotIconCountExample from './countandicon/countandicon';

const Pivot = () => {
  return (
    <div className="ms-Grid-row">
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>Pivot</h5>
        </span>
      </div>
      {/* <PivotBasicExample/> */}
      <PivotIconCountExample />
      {/* <PivotLargeExample/>
            <PivotTabsExample/>
            <PivotTabsLargeExample/>
            <PivotOnChangeExample/>
            <PivotRemoveExample/>
            <PivotOverrideExample/> */}
      {/* <PivotSeparateExample/> */}
    </div>
  );
};

export default Pivot;
