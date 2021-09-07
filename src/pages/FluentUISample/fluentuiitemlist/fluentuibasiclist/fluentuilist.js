import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { createListItems } from '@uifabric/example-data';
import { useConst } from '@uifabric/react-hooks';

const theme = getTheme();
const { palette, fonts } = theme;
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;
const classNames = mergeStyleSets({
  listGridExample: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative',
  },
  listGridExampleTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: palette.neutralLighter,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: `1px solid ${palette.white}`,
      },
    },
  },
  listGridExampleSizer: {
    paddingBottom: '100%',
  },
  listGridExamplePadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2,
  },
  listGridExampleLabel: {
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    width: '100%',
    fontSize: fonts.small.fontSize,
    boxSizing: 'border-box',
  },
  listGridExampleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

const ListGridExample = () => {
  const columnCount = React.useRef(0);
  const rowHeight = React.useRef(0);

  const getItemCountForPage = React.useCallback((itemIndex, surfaceRect) => {
    if (itemIndex === 0) {
      columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      rowHeight.current = Math.floor(surfaceRect.width / columnCount.current);
    }
    return columnCount.current * ROWS_PER_PAGE;
  }, []);

  const onRenderCell = React.useCallback((item, index) => {
    return (
      <div
        className={classNames.listGridExampleTile}
        data-is-focusable
        style={{
          width: 100 / columnCount.current + '%',
        }}>
        <div className={classNames.listGridExampleSizer}>
          <div className={classNames.listGridExamplePadder}>
            <img
              alt=""
              src={item.thumbnail}
              className={classNames.listGridExampleImage}
            />
            <span
              className={
                classNames.listGridExampleLabel
              }>{`item ${index}`}</span>
          </div>
        </div>
      </div>
    );
  }, []);

  const getPageHeight = React.useCallback(() => {
    return rowHeight.current * ROWS_PER_PAGE;
  }, []);

  const items = useConst(() => createListItems(10));

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">List of 10 grid items</div>
        <div className=" divpadt10">
          <FocusZone>
            <List
              className={classNames.listGridExample}
              items={items}
              getItemCountForPage={getItemCountForPage}
              getPageHeight={getPageHeight}
              renderedWindowsAhead={4}
              onRenderCell={onRenderCell}
            />
          </FocusZone>
        </div>
      </div>
    </div>
  );
};

export default ListGridExample;
