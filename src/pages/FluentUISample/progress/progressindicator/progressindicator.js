import React from 'react';
import ProgressIndicatorBasicExample from './defaultprogressindicator/defaultprogressindicator';
import ProgressIndicatorIndeterminateExample from './indeterminateprogressindicator/indeterminateprogressindicator';

const ProgressIndicator = () => {
  return (
    <div className="ms-Grid-row">
      <ProgressIndicatorBasicExample />
      <ProgressIndicatorIndeterminateExample />
    </div>
  );
};

export default ProgressIndicator;
