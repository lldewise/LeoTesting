import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

const ProgressIndicatorIndeterminateExample: React.FunctionComponent = () => (
  <>
    <div className="fluenttitle divpadt10">Indeterminate ProgressIndicator</div>
    <ProgressIndicator
      label="Example title"
      description="Example description"
    />
  </>
);

export default ProgressIndicatorIndeterminateExample;
