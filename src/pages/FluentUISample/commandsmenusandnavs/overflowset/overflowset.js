import React from 'react';
import OverflowSetBasicExample from './overflowsetbasicexample/overflowsetbasicexample';
import OverflowSetCustomExample from './overflowsetcustomexample/overflowsetcustomexample';
import OverflowSetBasicReversedExample from './overflowsetreversedexample/overflowsetreversedexample';
import OverflowSetVerticalExample from './overflowsetverticalexample/overflowsetverticalexample';

const OverflowSet = () => {
  return (
    <div className="ms-Grid-row">
      <OverflowSetBasicExample />
      <OverflowSetVerticalExample />
      <OverflowSetCustomExample />
      <OverflowSetBasicReversedExample />
    </div>
  );
};

export default OverflowSet;
