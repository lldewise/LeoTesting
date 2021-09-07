import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { useBoolean } from '@uifabric/react-hooks';

const explanation =
  'This panel has custom content in the navigation region (the part at the top which normally ' +
  'contains the close button). If the custom content replaces the close button, be sure to provide ' +
  'some other obvious way for users to close the panel.';
const searchboxStyles = {
  root: { margin: '5px', height: 'auto', width: '100%' },
};

const PanelNavigationExample = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const onRenderNavigationContent = React.useCallback(
    (props, defaultRender) => (
      <>
        <SearchBox
          placeholder="Search here..."
          styles={searchboxStyles}
          ariaLabel="Sample search box. Does not actually search anything."
        />
        {
          // This custom navigation still renders the close button (defaultRender).
          // If you don't use defaultRender, be sure to provide some other way to close the panel.
          defaultRender(props)
        }
      </>
    ),
    [],
  );

  return (
    <div>
      <div className="fluenttitle divpadt10">Panel - Custom navigation</div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Panel with custom navigation content"
        onRenderNavigationContent={onRenderNavigationContent}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close">
        <div>
          <p>{explanation}</p>
        </div>
      </Panel>
    </div>
  );
};

export default PanelNavigationExample;
