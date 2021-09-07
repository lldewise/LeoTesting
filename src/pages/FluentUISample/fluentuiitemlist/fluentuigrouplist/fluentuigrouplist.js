import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean, useConst } from '@uifabric/react-hooks';
import { createListItems, createGroups } from '@uifabric/example-data';

const toggleStyles = { root: { marginBottom: '20px' } };
const groupCount = 2;
const groupDepth = 2;
const items = createListItems(Math.pow(groupCount, groupDepth + 1));
const columns = Object.keys(items[0])
  .slice(0, 3)
  .map(key => ({
    key: key,
    name: key,
    fieldName: key,
    minWidth: 300,
  }));

const groups = createGroups(groupCount, groupDepth, 0, groupCount);

const FluentUIGroupedListBasic = () => {
  const [isCompactMode, { toggle: toggleIsCompactMode }] = useBoolean(false);
  const selection = useConst(() => {
    const s = new Selection();
    s.setItems(items, true);
    return s;
  });

  const onRenderCell = (nestingDepth, item, itemIndex) => {
    return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
      <DetailsRow
        columns={columns}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={selection}
        selectionMode={SelectionMode.multiple}
        compact={isCompactMode}
      />
    ) : null;
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">GroupedList basic example</div>
        <div className=" divpadt10">
          <Toggle
            label="Enable compact mode"
            checked={isCompactMode}
            onChange={toggleIsCompactMode}
            onText="Compact"
            offText="Normal"
            styles={toggleStyles}
          />
          <SelectionZone
            selection={selection}
            selectionMode={SelectionMode.multiple}>
            <GroupedList
              items={items}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCell={onRenderCell}
              selection={selection}
              selectionMode={SelectionMode.multiple}
              groups={groups}
              compact={isCompactMode}
            />
          </SelectionZone>
        </div>
      </div>
    </div>
  );
};

export default FluentUIGroupedListBasic;
