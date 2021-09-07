import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { createListItems, createGroups } from '@uifabric/example-data';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const headerAndFooterStyles = {
  minWidth: 300,
  minHeight: 40,
  lineHeight: 40,
  paddingLeft: 16,
};
const classNames = mergeStyleSets({
  header: [headerAndFooterStyles, theme.fonts.xLarge],
  footer: [headerAndFooterStyles, theme.fonts.large],
  name: {
    display: 'inline-block',
    overflow: 'hidden',
    height: 24,
    cursor: 'default',
    padding: 8,
    boxSizing: 'border-box',
    verticalAlign: 'top',
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: 32,
  },
});

const onRenderHeader = props => {
  if (props) {
    const toggleCollapse = () => {
      props.onToggleCollapse(props.group);
    };
    return (
      <div className={classNames.header}>
        This is a custom header for {props.group.name}
        &nbsp; (
        <Link
          // eslint-disable-next-line react/jsx-no-bind
          onClick={toggleCollapse}>
          {props.group.isCollapsed ? 'Expand' : 'Collapse'}
        </Link>
        )
      </div>
    );
  }

  return null;
};

const onRenderCell = (nestingDepth, item, itemIndex) => {
  return item ? (
    <div role="row" data-selection-index={itemIndex}>
      <span role="cell" className={classNames.name}>
        {item.name}
      </span>
    </div>
  ) : null;
};

const onRenderFooter = props => {
  return props ? (
    <div className={classNames.footer}>
      This is a custom footer for {props.group.name}
    </div>
  ) : null;
};

const groupedListProps = {
  onRenderHeader,
  onRenderFooter,
};
const items = createListItems(20);
const groups = createGroups(4, 0, 0, 5);

const FluentUIGroupedListCustomExample = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          GroupedList example with custom header and footer
        </div>
        <div className=" divpadt10">
          <GroupedList
            items={items}
            onRenderCell={onRenderCell}
            groupProps={groupedListProps}
            groups={groups}
          />
        </div>
      </div>
    </div>
  );
};

export default FluentUIGroupedListCustomExample;
