import * as React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from 'office-ui-fabric-react/lib/Styling';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { useConst } from '@uifabric/react-hooks';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: 500,
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

const onRenderCell = (item, index, isScrolling) => {
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <Image
        className={classNames.itemImage}
        src={isScrolling ? undefined : item.thumbnail}
        width={50}
        height={50}
        imageFit={ImageFit.cover}
      />
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item.name}</div>
        <div className={classNames.itemIndex}>{`Item ${index}`}</div>
      </div>
    </div>
  );
};

const FluentUIListGhosting = () => {
  const items = useConst(() => createListItems(5));

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Rendering ghost items while the list is scrolling
        </div>
        <div className=" divpadt10">
          <FocusZone direction={FocusZoneDirection.vertical}>
            <div className={classNames.container} data-is-scrollable>
              <List items={items} onRenderCell={onRenderCell} />
            </div>
          </FocusZone>
        </div>
      </div>
    </div>
  );
};

export default FluentUIListGhosting;
