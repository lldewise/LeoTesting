import * as React from 'react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';

export const PivotOnChangeExample = () => {
  const [lastHeader, setLastHeader] = React.useState(undefined);

  return (
    <div>
      PivotOnChangeExample
      <Label>Last onLinkClick from: {lastHeader?.props.headerText}</Label>
      <Pivot
        aria-label="OnChange Pivot Example"
        linkSize={PivotLinkSize.large}
        linkFormat={PivotLinkFormat.tabs}
        onLinkClick={setLastHeader}>
        <PivotItem headerText="Foo">
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Bar">
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Bas">
          <Label>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Biz">
          <Label>Pivot #4</Label>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default PivotOnChangeExample;
