import React from 'react';
import SpinnerBasicExample from './spinnersizes/spinnersizes';
import SpinnerLabeledExample from './spinnerlabelpositioning/spinnerlabelpositioning';
const Spinner = () => {
  return (
    <div className="ms-Grid-row">
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>Spinner</h5>
        </span>
      </div>
      <SpinnerBasicExample />
      <SpinnerLabeledExample />
    </div>
  );
};

export default Spinner;
