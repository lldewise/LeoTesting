import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from 'office-ui-fabric-react/lib/Styling';
import { createListItems } from '@uifabric/example-data';
import { useConst } from '@uifabric/react-hooks';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
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

const onRenderCell = (item, index) => {
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <Image
        className={classNames.itemImage}
        src={item.thumbnail}
        width={50}
        height={50}
        imageFit={ImageFit.cover}
      />
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item.name}</div>
        <div className={classNames.itemIndex}>{`Item ${index}`}</div>
        <div>{item.description}</div>
      </div>
      <Icon
        className={classNames.chevron}
        iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}
      />
    </div>
  );
};

const ListBasicVariableHeight = () => {
  const originalItems = useConst(() => createListItems(5));
  const [items, setItems] = React.useState(originalItems);

  const resultCountText =
    items.length === originalItems.length
      ? ''
      : ` (${items.length} of ${originalItems.length} shown)`;

  const onFilterChanged = (_, text) => {
    setItems(
      originalItems.filter(
        item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0,
      ),
    );
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          List of 5 variable height items
        </div>
        <div className=" divpadt10">
          <FocusZone direction={FocusZoneDirection.vertical}>
            <TextField
              label={'Filter by name' + resultCountText}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={onFilterChanged}
            />
            <List items={items} onRenderCell={onRenderCell} />
          </FocusZone>
        </div>
      </div>
    </div>
  );
};
export default ListBasicVariableHeight;
