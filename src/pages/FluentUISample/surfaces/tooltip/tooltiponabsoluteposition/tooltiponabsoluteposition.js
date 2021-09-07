import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { useId, useConst } from '@uifabric/react-hooks';

const rootStyles = { minHeight: 50 };
const buttonStyles = {
  root: { position: 'absolute', left: 200 },
};

const TooltipAbsolutePositionExample = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');
  const buttonId = useId('targetButton');

  const calloutProps = useConst({
    gapSpace: 0,
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${buttonId}`,
  });

  return (
    <div style={rootStyles}>
      <div className="fluenttitle divpadt10">
        Tooltip on absolutely-positioned element
      </div>
      <TooltipHost
        content="This is the tooltip"
        id={tooltipId}
        calloutProps={calloutProps}>
        <DefaultButton
          // Button is absolutely positioned (see above)
          styles={buttonStyles}
          id={buttonId}
          aria-describedby={tooltipId}>
          Hover over me
        </DefaultButton>
      </TooltipHost>
    </div>
  );
};

export default TooltipAbsolutePositionExample;
