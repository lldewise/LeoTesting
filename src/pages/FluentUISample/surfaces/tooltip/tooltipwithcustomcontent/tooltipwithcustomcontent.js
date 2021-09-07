import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost,
  TooltipDelay,
  DirectionalHint,
} from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const tooltipProps = {
  onRenderContent: () => (
    <ul style={{ margin: 10, padding: 0 }}>
      <li>1. One</li>
      <li>2. Two</li>
    </ul>
  ),
};
const hostStyles = { root: { display: 'inline-block' } };

const TooltipCustomExample = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');

  return (
    <>
      <div className="fluenttitle divpadt10">
        Indeterminate ProgressIndicator
      </div>
      <TooltipHost
        tooltipProps={tooltipProps}
        delay={TooltipDelay.zero}
        id={tooltipId}
        directionalHint={DirectionalHint.bottomCenter}
        styles={hostStyles}>
        <DefaultButton aria-describedby={tooltipId} text="Hover over me" />
      </TooltipHost>
    </>
  );
};

export default TooltipCustomExample;
