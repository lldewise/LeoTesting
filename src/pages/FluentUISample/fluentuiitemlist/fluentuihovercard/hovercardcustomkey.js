import * as React from 'react';
import {
  HoverCard,
  DirectionalHint,
} from 'office-ui-fabric-react/lib/HoverCard';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { createListItems } from '@uifabric/example-data';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useConst } from '@uifabric/react-hooks';
import logger from 'loglevel';

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

const log = text => {
  return () => {
    logger.log(text);
  };
};

const items = createListItems(10);
const columns = buildColumns(items).filter(
  column => column.name === 'location' || column.name === 'key',
);

const onRenderCompactCard = item => {
  return (
    <div className={classNames.compactCard}>
      <a href={`http://wikipedia.org/wiki/${item.location}`}>{item.location}</a>
    </div>
  );
};

const onRenderExpandedCard = item => {
  return (
    <div className={classNames.expandedCard}>
      {item.description}
      <DetailsList setKey="expandedCardSet" items={items} columns={columns} />
    </div>
  );
};

/**
 * Used for the hoverable "key" cell. In this case, the implementation uses hooks to control
 * open/closed state, so it must be a function component (not just code within a render callback).
 */
const KeyCellWithHoverCard = ({ item }) => {
  const [contentRendered, { toggle: toggleContentRendered }] =
    useBoolean(false);
  const targetElementRef = React.useRef(null);
  const expandingCardProps = useConst({
    onRenderCompactCard,
    onRenderExpandedCard,
    renderData: item,
    directionalHint: DirectionalHint.rightTopEdge,
    gapSpace: 16,
    calloutProps: {
      isBeakVisible: true,
    },
  });
  React.useEffect(toggleContentRendered, [toggleContentRendered]);

  return (
    <div className={classNames.item}>
      <div ref={targetElementRef} data-is-focusable>
        {item.key}
        {contentRendered && (
          <HoverCard
            expandingCardProps={expandingCardProps}
            target={targetElementRef.current}
            cardDismissDelay={300}
            onCardVisible={log('onCardVisible')}
            onCardHide={log('onCardHide')}
            trapFocus
            openHotKey={KeyCodes.enter}
          />
        )}
      </div>
    </div>
  );
};

const onRenderItemColumn = (item, index, column) => {
  if (column.key === 'key') {
    return <KeyCellWithHoverCard item={item} />;
  }
  return item[column.key];
};

const FluentHoverCardTargetCustom = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Expanding HoverCard using target, DirectionalHint and custom hotkey
        </div>
        <div className=" divpadt10">
          <Fabric>
            <p>
              Hover over the <strong>key</strong> cell of a row item to see the
              card or use the keyboard to navigate to it by tabbing to a row and
              hitting the right arrow key.
            </p>
            <p>
              When using the keyboard to navigate, open the card with the hotkey
              and it will automatically focus the first focusable element in the
              card allowing further navigation inside the card. The hotkey is
              <code>openHotKey</code> prop and is defined as 'enter' in the
              following example.
            </p>
            <DetailsList
              setKey="hoverSet"
              items={items}
              columns={columns}
              onRenderItemColumn={onRenderItemColumn}
              ariaLabel="Hover card DetailsList test"
            />
          </Fabric>
        </div>
      </div>
    </div>
  );
};

export default FluentHoverCardTargetCustom;
