import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from 'office-ui-fabric-react/lib/Selection';
import { createListItems } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useConst, useForceUpdate } from '@uifabric/react-hooks';

const commonStyles = {
  display: 'inline-block',
  cursor: 'default',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  background: 'none',
  backgroundColor: 'transparent',
  border: 'none',
};
const classNames = mergeStyleSets({
  item: {
    selectors: {
      '&:hover': { background: '#eee' },
    },
  },
  // Overwrites the default style for Button
  check: [commonStyles, { padding: '11px 8px' }],
  cell: [
    commonStyles,
    {
      overflow: 'hidden',
      height: 36,
      padding: 8,
      userSelect: 'none',
    },
  ],
});

const alertItem = item => {
  alert('item invoked: ' + item.name);
};

const startsWithVowel = item => {
  return /^[aeiou]/.test(item.name || '');
};

const selectionModes = {
  [SelectionMode[SelectionMode.none]]: 'None',
  [SelectionMode[SelectionMode.single]]: 'Single select',
  [SelectionMode[SelectionMode.multiple]]: 'Multi select',
};
const selectableItemTypes = {
  all: 'All items',
  vowels: 'Names starting with vowels',
};

const ITEM_COUNT = 100;

const SelectionItemExample = props => {
  const { item, itemIndex, selection } = props;
  let isSelected = false;

  if (selection && itemIndex !== undefined) {
    isSelected = selection.isIndexSelected(itemIndex);
  }

  return (
    <div
      className={classNames.item}
      data-is-focusable
      data-selection-index={itemIndex}>
      {selection &&
        selection.canSelectItem(item) &&
        selection.mode !== SelectionMode.none && (
        <div
          className={classNames.check}
          data-is-focusable
          data-selection-toggle>
          <Check checked={isSelected} />
        </div>
      )}
      <span className={classNames.cell}>{item.name}</span>
      <a className={classNames.cell} href="https://bing.com" target="_blank">
        Link that avoids selection
      </a>
      <a
        className={classNames.cell}
        data-selection-select
        href="https://bing.com"
        target="_blank">
        Link that selects first
      </a>
    </div>
  );
};

export const SelectionBasicExample = () => {
  const [selectableItemType, setSelectableItemType] = React.useState('all');
  const [selectionMode, setSelectionMode] = React.useState(
    SelectionMode.multiple,
  );
  const forceUpdate = useForceUpdate();
  const items = useConst(() => createListItems(ITEM_COUNT));
  const selection = React.useMemo(
    () =>
      new Selection({
        canSelectItem:
          selectableItemType === 'vowels' ? startsWithVowel : undefined,
        selectionMode,
        onSelectionChanged: forceUpdate,
        items,
      }),
    [selectableItemType, selectionMode, forceUpdate, items],
  );

  const commandItems = React.useMemo(
    () => [
      {
        key: 'selectionMode',
        text: 'Selection mode: ' + selectionModes[SelectionMode[selectionMode]],
        subMenuProps: {
          items: Object.keys(selectionModes).map(mode => ({
            key: mode,
            name: selectionModes[mode],
            canCheck: true,
            checked: selectionMode === SelectionMode[mode],
            onClick: () => setSelectionMode(SelectionMode[mode]),
          })),
        },
      },
      {
        key: 'allowCanSelect',
        text: 'Selectable item type: ' + selectableItemType,
        subMenuProps: {
          items: Object.keys(selectableItemTypes).map(itemType => ({
            key: itemType,
            name: selectableItemTypes[itemType],
            checked: selectableItemType === itemType,
            onClick: () => setSelectableItemType(itemType),
          })),
        },
      },
      {
        key: 'selectAll',
        text: 'Toggle select all',
        iconProps: { iconName: 'CheckMark' },
        onClick: () => selection.toggleAllSelected(),
        disabled: selectionMode !== SelectionMode.multiple,
      },
    ],
    [selectionMode, selection, selectableItemType],
  );

  return (
    <div>
      SelectionBasicExample
      <CommandBar items={commandItems} />
      <MarqueeSelection
        selection={selection}
        isEnabled={selection.mode === SelectionMode.multiple}>
        <SelectionZone selection={selection} onItemInvoked={alertItem}>
          {items.map((item, index) => (
            <SelectionItemExample
              key={item.key}
              item={item}
              itemIndex={index}
              selection={selection}
            />
          ))}
        </SelectionZone>
      </MarqueeSelection>
    </div>
  );
};

export default SelectionBasicExample;
