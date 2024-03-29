import * as React from 'react';
import {
  GroupHeader,
  GroupedList,
} from 'office-ui-fabric-react/lib/GroupedList';
import { DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useConst } from '@uifabric/react-hooks';
import { createListItems, createGroups } from '@uifabric/example-data';

const groupCount = 3;
const groupDepth = 1;

const groupProps = {
  onRenderHeader: props => (
    <GroupHeader
      onRenderGroupHeaderCheckbox={onRenderGroupHeaderCheckbox}
      {...props}
    />
  ),
};

const onRenderGroupHeaderCheckbox = props => (
  <Toggle checked={props ? props.checked : undefined} />
);

export const FluentUIGroupedListCustomCheckbox = () => {
  const items = useConst(() =>
    createListItems(Math.pow(groupCount, groupDepth + 1)),
  );
  const groups = useConst(() =>
    createGroups(groupCount, groupDepth, 0, groupCount),
  );
  const columns = useConst(() =>
    Object.keys(items[0])
      .slice(0, 3)
      .map(key => ({
        key: key,
        name: key,
        fieldName: key,
        minWidth: 300,
      })),
  );
  const selection = useConst(() => new Selection({ items }));

  const onRenderCell = React.useCallback(
    (nestingDepth, item, itemIndex) => (
      <DetailsRow
        columns={columns}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={selection}
        selectionMode={SelectionMode.multiple}
      />
    ),
    [columns, selection],
  );

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          GroupedList example with custom checkbox
        </div>
        <div className=" divpadt10">
          <FocusZone>
            <SelectionZone
              selection={selection}
              selectionMode={SelectionMode.multiple}>
              <GroupedList
                items={items}
                onRenderCell={onRenderCell}
                selection={selection}
                selectionMode={SelectionMode.multiple}
                groups={groups}
                groupProps={groupProps}
              />
            </SelectionZone>
          </FocusZone>
        </div>
      </div>
    </div>
  );
};
export default FluentUIGroupedListCustomCheckbox;
