import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';

const PanelBasicExample = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <div>
      <div className="fluenttitle divpadt10">Basic</div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close">
        <p>Content goes here.</p>
      </Panel>
    </div>
  );
};

export default PanelBasicExample;
