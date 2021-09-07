import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyleSets } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const styles = mergeStyleSets({
  root: {
    display: 'block',
  },
  settingsGroup: {
    paddingTop: '20px',
  },
  itemCountDropdown: {
    width: '180px',
  },
});

const overflowSetStyles = { root: { height: 40 } };
const dropdownOptions = [
  { key: '20', text: '20' },
  { key: '30', text: '30' },
  { key: '40', text: '40' },
  { key: '50', text: '50' },
  { key: '75', text: '75' },
  { key: '100', text: '100' },
  { key: '200', text: '200' },
];

const generateData = (count, cachingEnabled, checked) => {
  const icons = ['Add', 'Share', 'Upload'];
  const dataItems = [];
  let cacheKey = '';
  for (let index = 0; index < count; index++) {
    const item = {
      key: `item${index}`,
      name: `Item ${index}`,
      icon: icons[index % icons.length],
      checked: checked,
    };
    cacheKey = cacheKey + item.key;
    dataItems.push(item);
  }
  let result = {
    primary: dataItems,
    overflow: [],
  };
  if (cachingEnabled) {
    result = { ...result, cacheKey };
  }
  return result;
};

const computeCacheKey = primaryControls => {
  return primaryControls.reduce((acc, current) => acc + current.key, '');
};

const onRenderItem = item => (
  <CommandBarButton
    role="menuitem"
    text={item.name}
    iconProps={{ iconName: item.icon }}
    onClick={item.onClick}
    checked={item.checked}
  />
);

export const ResizeGroupOverflowSetExample = () => {
  const [numberOfItems, setNumberOfItems] = React.useState(20);
  const [buttonsChecked, { toggle: toggleButtonsChecked }] = useBoolean(false);
  const [cachingEnabled, { toggle: toggleCachingEnabled }] = useBoolean(false);
  const [onGrowDataEnabled, { toggle: toggleOnGrowDataEnabled }] =
    useBoolean(false);
  const dataToRender = generateData(
    numberOfItems,
    cachingEnabled,
    buttonsChecked,
  );

  const onReduceData = currentData => {
    if (currentData.primary.length === 0) {
      return undefined;
    }
    const overflow = [
      ...currentData.primary.slice(-1),
      ...currentData.overflow,
    ];
    const primary = currentData.primary.slice(0, -1);
    let cacheKey = undefined;
    if (cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  };

  const onGrowData = currentData => {
    if (currentData.overflow.length === 0) {
      return undefined;
    }
    const overflow = currentData.overflow.slice(1);
    const primary = [
      ...currentData.primary,
      ...currentData.overflow.slice(0, 1),
    ];
    let cacheKey = undefined;
    if (cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  };

  const onRenderOverflowButton = overflowItems => (
    <CommandBarButton role="menuitem" menuProps={{ items: overflowItems }} />
  );

  const onRenderData = data => {
    return (
      <OverflowSet
        role="menubar"
        items={data.primary}
        overflowItems={data.overflow.length ? data.overflow : null}
        onRenderItem={onRenderItem}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderOverflowButton={onRenderOverflowButton}
        styles={overflowSetStyles}
      />
    );
  };

  const onNumberOfItemsChanged = (event, option) => {
    setNumberOfItems(parseInt(option.text, 10));
  };

  return (
    <div>
      ResizeGroupOverflowSetExample
      <ResizeGroup
        role="tabpanel"
        aria-label="Resize Group with an Overflow Set"
        data={dataToRender}
        // eslint-disable-next-line react/jsx-no-bind
        onReduceData={onReduceData}
        onGrowData={onGrowDataEnabled ? onGrowData : undefined}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderData={onRenderData}
      />
      <div className={styles.settingsGroup}>
        <Toggle
          label="Enable caching"
          onChange={toggleCachingEnabled}
          checked={cachingEnabled}
        />
        <Toggle
          label="Enable onGrowData"
          onChange={toggleOnGrowDataEnabled}
          checked={onGrowDataEnabled}
        />
        <Toggle
          label="Buttons checked"
          onChange={toggleButtonsChecked}
          checked={buttonsChecked}
        />
        <div className={styles.itemCountDropdown}>
          <Dropdown
            label="Number of items to render"
            selectedKey={numberOfItems.toString()}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onNumberOfItemsChanged}
            options={dropdownOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ResizeGroupOverflowSetExample;
