import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';
import logger from 'loglevel';

const explanation =
  'This example demonstrates detecting whether a panel was dismissed using the close button ' +
  'or using "light dismiss" (a click outside the panel area).';

const PanelHandleDismissTargetExample = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const onDismiss = React.useCallback(
    ev => {
      if (!ev) {
        logger.log('Panel dismissed.');
        return;
      }

      // Demonstrates how to do different things depending on how which element dismissed the panel
      logger.log('Close button clicked or light dismissed.');

      const srcElement = ev.nativeEvent.srcElement | null;
      if (srcElement && srcElement.className.indexOf('ms-Button-icon') !== -1) {
        logger.log('Close button clicked.');
      }
      if (srcElement && srcElement.className.indexOf('ms-Overlay') !== -1) {
        logger.log('Light dismissed.');
      }
      dismissPanel();
    },
    [dismissPanel],
  );

  return (
    <div>
      <div className="fluenttitle divpadt10">
        Panel - Detect dismissal method
      </div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={onDismiss}
        headerText="Panel - Handle close button clicks or light dismissal"
        closeButtonAriaLabel="Close"
        isLightDismiss={true}>
        <div>
          <p>{explanation}</p>
          <p>
            (Check the debug console for results after dismissing the panel.)
          </p>
        </div>
      </Panel>
    </div>
  );
};

export default PanelHandleDismissTargetExample;
