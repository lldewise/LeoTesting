import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles = { root: { display: 'inline-block' } };

const TooltipBasicExample = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');

  return (
    <>
      <div className="fluenttitle divpadt10">Default Tooltip</div>
      <div>
        <TooltipHost
          content="This is the tooltip content"
          // This id is used on the tooltip itself, not the host
          // (so an element with this id only exists when the tooltip is shown)
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}>
          <DefaultButton aria-describedby={tooltipId}>
            Hover over me
          </DefaultButton>
        </TooltipHost>
      </div>
    </>
  );
};

export default TooltipBasicExample;
