import * as React from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';

const SpinnerLabeledExample = () => {
  const stackTokens = {
    childrenGap: 20,
    maxWidth: 250,
  };

  return (
    <>
      <div className="fluenttitle divpadt10">Spinner label positioning</div>
      <Stack tokens={stackTokens}>
        <div>
          <Label>Spinner with label positioned below</Label>
          <Spinner label="I am definitely loading..." />
        </div>

        <div>
          <Label>Spinner with label positioned above</Label>
          <Spinner
            label="Seriously, still loading..."
            ariaLive="assertive"
            labelPosition="top"
          />
        </div>

        <div>
          <Label>Spinner with label positioned to right</Label>
          <Spinner
            label="Wait, wait..."
            ariaLive="assertive"
            labelPosition="right"
          />
        </div>

        <div>
          <Label>Spinner with label positioned to left</Label>
          <Spinner
            label="Nope, still loading..."
            ariaLive="assertive"
            labelPosition="left"
          />
        </div>
      </Stack>
    </>
  );
};

export default SpinnerLabeledExample;
