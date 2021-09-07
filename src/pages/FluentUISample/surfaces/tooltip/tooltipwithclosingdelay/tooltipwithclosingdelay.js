import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const styles = { root: { display: 'inline-block' } };
const calloutProps = { gapSpace: 0 };

const TooltipInteractiveExample = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');

  return (
    <div>
      <div className="fluenttitle divpadt10">Tooltip with a closing delay</div>
      <TooltipHost
        content="This is the tooltip"
        // Give the user more time to interact with the tooltip before it closes
        closeDelay={500}
        id={tooltipId}
        calloutProps={calloutProps}
        styles={styles}>
        <DefaultButton aria-describedby={tooltipId}>
          Interact with my tooltip
        </DefaultButton>
      </TooltipHost>
    </div>
  );
};

export default TooltipInteractiveExample;
