import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  ConstrainMode,
  DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
    backgroundColor: 'white',
  },
  filter: {
    backgroundColor: 'white',
    paddingBottom: 20,
    maxWidth: 300,
  },
  header: {
    margin: 0,
    backgroundColor: 'white',
  },
  row: {
    display: 'inline-block',
  },
});

const footerItem = {
  key: 'footer',
  test1: 'Footer 1',
  test2: 'Footer 2',
  test3: 'Footer 3',
  test4: 'Footer 4',
  test5: 'Footer 5',
  test6: 'Footer 6',
};

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
const lorem = wordCount => {
  const startIndex =
    loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
};
const allItems = Array.from({ length: 200 }).map((item, index) => ({
  key: index,
  test1: lorem(4),
  test2: lorem(4),
  test3: lorem(4),
  test4: lorem(4),
  test5: lorem(4),
  test6: lorem(4),
}));
const columns = Array.from({ length: 6 }).map((item, index) => ({
  key: 'column' + (index + 1),
  name: 'Test ' + (index + 1),
  fieldName: 'test' + (index + 1),
  minWidth: 100,
  maxWidth: 200,
  isResizable: true,
}));
const onItemInvoked = item => {
  alert('Item invoked: ' + item.test1);
};
const onRenderDetailsHeader = (props, defaultRender) => {
  if (!props) {
    return null;
  }
  const onRenderColumnHeaderTooltip = tooltipHostProps => (
    <TooltipHost {...tooltipHostProps} />
  );
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
      {defaultRender({
        ...props,
        onRenderColumnHeaderTooltip,
      })}
    </Sticky>
  );
};
const onRenderDetailsFooter = (props, defaultRender) => {
  if (!props) {
    return null;
  }
  return (
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true}>
      <div className={classNames.row}>
        <DetailsRow
          columns={props.columns}
          item={footerItem}
          itemIndex={-1}
          selection={props.selection}
          selectionMode={
            (props.selection && props.selection.mode) || SelectionMode.none
          }
          rowWidth={props.rowWidth}
        />
      </div>
    </Sticky>
  );
};
const hasText = (item, text) => {
  return (
    `${item.test1}|${item.test2}|${item.test3}|${item.test4}|${item.test5}|${item.test6}`.indexOf(
      text,
    ) > -1
  );
};

const ScrollablePaneDetailsListExample = () => {
  const [items, setItems] = React.useState(allItems);
  const [selection] = React.useState(() => {
    const s = new Selection();
    s.setItems(items, true);
    return s;
  });
  const onFilterChange = (ev, text) => {
    setItems(text ? allItems.filter(item => hasText(item, text)) : allItems);
  };
  return (
    <div className={classNames.wrapper}>
      <div className="fluenttitle divpadt10">DetailsList Locked Header</div>
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <Sticky stickyPosition={StickyPositionType.Header}>
          <TextField
            className={classNames.filter}
            label="Filter by name:"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onFilterChange}
          />
        </Sticky>
        <Sticky stickyPosition={StickyPositionType.Header}>
          <h5 className={classNames.header}>Item list</h5>
        </Sticky>
        <MarqueeSelection selection={selection}>
          <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            constrainMode={ConstrainMode.unconstrained}
            onRenderDetailsHeader={onRenderDetailsHeader}
            onRenderDetailsFooter={onRenderDetailsFooter}
            selection={selection}
            selectionPreservedOnEmptyClick
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={onItemInvoked}
          />
        </MarqueeSelection>
      </ScrollablePane>
    </div>
  );
};

export default ScrollablePaneDetailsListExample;
