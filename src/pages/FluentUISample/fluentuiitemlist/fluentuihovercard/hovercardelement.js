import * as React from 'react';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from '@uifabric/example-data';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getColorFromString } from 'office-ui-fabric-react/lib/Color';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const itemClass = mergeStyles({
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
});
const items = createListItems(10);
const buildColumn = () => {
  return buildColumns(items).filter(
    column =>
      column.name === 'color' ||
      column.name === 'width' ||
      column.name === 'height',
  );
};
const columns = buildColumn();
const onRenderPlainCard = item => {
  const src = item.thumbnail + `/${getColorFromString(item.color).hex}`;
  return (
    <Image
      src={src}
      width={item.width}
      height={item.height}
      imageFit={ImageFit.cover}
    />
  );
};
const onRenderItemColumn = (item, index, column) => {
  const plainCardProps = {
    onRenderPlainCard: onRenderPlainCard,
    renderData: item,
  };
  if (column.key === 'color') {
    return (
      <HoverCard
        plainCardProps={plainCardProps}
        instantOpenOnClick
        type={HoverCardType.plain}>
        <div className={itemClass} style={{ color: item.color }}>
          {item.color}
        </div>
      </HoverCard>
    );
  }
  return item[column.key];
};

const HoverCardPlainCardElement = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Plain HoverCard wrapping an element
        </div>
        <div className=" divpadt10">
          <Fabric>
            <p>
              Hover over the <i>color</i> cell of a row item to see the card.
            </p>
            <DetailsList
              setKey="hoverSet"
              items={items}
              columns={columns}
              onRenderItemColumn={onRenderItemColumn}
            />
          </Fabric>
        </div>
      </div>
    </div>
  );
};

export default HoverCardPlainCardElement;
