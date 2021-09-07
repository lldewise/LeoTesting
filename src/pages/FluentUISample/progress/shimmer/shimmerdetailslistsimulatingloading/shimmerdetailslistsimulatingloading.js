import * as React from 'react';
import { createListItems } from '@uifabric/example-data';
import {
  buildColumns,
  SelectionMode,
  Toggle,
} from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { useSetInterval, useConst } from '@uifabric/react-hooks';

const ITEMS_COUNT = 200;
const INTERVAL_DELAY = 1200;
const toggleStyle = {
  marginBottom: '20px',
};
const shimmeredDetailsListProps = {
  renderedWindowsAhead: 0,
  renderedWindowsBehind: 0,
};

const fileIcons = [
  { name: 'accdb' },
  { name: 'audio' },
  { name: 'code' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'model' },
  { name: 'one' },
  { name: 'onetoc' },
  { name: 'pdf' },
  { name: 'photo' },
  { name: 'pptx' },
  { name: 'presentation' },
  { name: 'potx' },
  { name: 'pub' },
  { name: 'rtf' },
  { name: 'spreadsheet' },
  { name: 'txt' },
  { name: 'vector' },
  { name: 'vsdx' },
  { name: 'xlsx' },
  { name: 'xltx' },
  { name: 'xsn' },
];

const randomFileIcon = () => {
  const docType =
    fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
  };
};

const onRenderItemColumn = (item, index, column) => {
  if (column.key === 'thumbnail') {
    return <img alt="" src={item.thumbnail} />;
  }
  return item[column.key];
};

const exampleItems = createListItems(ITEMS_COUNT).map(item => {
  const randomFileType = randomFileIcon();
  return { ...item, thumbnail: randomFileType.url };
});

const ShimmerApplicationExample = () => {
  const { current: state } = React.useRef({
    lastIntervalId: 0,
    visibleCount: 0,
  });

  const [items, setItems] = React.useState(undefined);

  const shimmerColumns = useConst(() => {
    const currentItems = createListItems(1);
    const columns = buildColumns(currentItems);
    for (const column of columns) {
      if (column.key === 'thumbnail') {
        column.name = 'FileType';
        column.minWidth = 16;
        column.maxWidth = 16;
        column.isIconOnly = true;
        column.iconName = 'Page';
        break;
      }
    }
    return columns;
  });

  const { setInterval, clearInterval } = useSetInterval();

  const onLoadData = React.useCallback(
    (ev, checked) => {
      const loadMoreItems = () => {
        state.visibleCount = Math.min(
          exampleItems.length,
          state.visibleCount + 2,
        );

        setItems(
          exampleItems.map((current, index) =>
            index < state.visibleCount ? current : null,
          ),
        );
      };

      state.visibleCount = 0;
      if (checked) {
        loadMoreItems();
        state.lastIntervalId = setInterval(loadMoreItems, INTERVAL_DELAY);
      } else {
        setItems(undefined);
        clearInterval(state.lastIntervalId);
      }
    },
    [clearInterval, setInterval, state],
  );

  return (
    <>
      <div className="fluenttitle divpadt10">
        Shimmered DetailsList simulating loading data asynchronously
      </div>
      <Toggle
        style={toggleStyle}
        label="Toggle to load content"
        onChange={onLoadData}
        onText="Content"
        offText="Shimmer"
      />
      <div>
        <ShimmeredDetailsList
          setKey="items"
          items={items || []}
          columns={shimmerColumns}
          selectionMode={SelectionMode.none}
          onRenderItemColumn={onRenderItemColumn}
          enableShimmer={!items}
          ariaLabelForShimmer="Content is being fetched"
          ariaLabelForGrid="Item details"
          listProps={shimmeredDetailsListProps}
        />
      </div>
    </>
  );
};

export default ShimmerApplicationExample;
