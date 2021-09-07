import * as React from 'react';
import { HoverCard } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  expandedCard: {
    padding: '16px 24px',
  },
  item: {
    selectors: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
});

const items = createListItems(10);

const buildColumn = () => {
  return buildColumns(items).filter(
    column => column.name === 'location' || column.name === 'key',
  );
};

const onRenderCompactCard = item => {
  return (
    <div className={classNames.compactCard}>
      <a href={`http://wikipedia.org/wiki/${item.location}`}>{item.location}</a>
    </div>
  );
};

const columns = buildColumn();

const onRenderExpandedCard = item => {
  return (
    <div className={classNames.expandedCard}>
      {item.description}
      <DetailsList setKey="expandedCardSet" items={items} columns={columns} />
    </div>
  );
};

const onRenderItemColumn = (item, index, column) => {
  const expandingCardProps = {
    onRenderCompactCard: onRenderCompactCard,
    onRenderExpandedCard: onRenderExpandedCard,
    renderData: item,
  };
  if (column.key === 'location') {
    return (
      <HoverCard
        expandingCardProps={expandingCardProps}
        instantOpenOnClick={true}>
        <div className={classNames.item}>{item.location}</div>
      </HoverCard>
    );
  }
  return item[column.key];
};

export const FluentUIHoverCardBasic = () => (
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-lg12 ">
      <div className="fluenttitle divpadt10">
        Expanding HoverCard wrapping an element
      </div>
      <div className=" divpadt10">
        <Fabric>
          <p>
            Hover over the <i>location</i> cell of a row item to see the card or
            use the keyboard to navigate to it.
          </p>
          <p>
            When using the keyboard to tab to it, the card will open but
            navigation inside of it will not be available.
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

export default FluentUIHoverCardBasic;
