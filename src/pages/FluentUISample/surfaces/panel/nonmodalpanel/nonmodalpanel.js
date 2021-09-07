import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';

const explanation =
  "This panel is non-modal: even when it's open, it allows interacting with content outside the panel.";

const PanelNonModalExample = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <div>
      <div className="fluenttitle divpadt10">Non-modal</div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Non-modal panel"
        // this prop makes the panel non-modal
        isBlocking={false}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close">
        <p>{explanation}</p>
      </Panel>
    </div>
  );
};

export default PanelNonModalExample;
