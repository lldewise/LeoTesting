import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  ISearchBoxStyles,
  SearchBox,
} from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  IContextualMenuListProps,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import logger from 'loglevel';

export const ContextualMenuWithCustomMenuListExample = () => {
  const [items, setItems] = React.useState(menuItems);

  const onAbort = React.useCallback(() => {
    setItems(menuItems);
  }, []);

  const onChange = React.useCallback((ev, newValue) => {
    const filteredItems = menuItems.filter(
      item =>
        item.text &&
        item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1,
    );

    if (!filteredItems || !filteredItems.length) {
      filteredItems.push({
        key: 'no_results',
        onRender: (item, dismissMenu) => (
          <div key="no_results" style={filteredItemsStyle}>
            <Icon iconName="SearchIssue" title="No actions found" />
            <span>No actions found</span>
          </div>
        ),
      });
    }

    setItems(filteredItems);
  }, []);

  const renderMenuList = React.useCallback(
    (menuListProps, defaultRender) => {
      return (
        <div>
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <SearchBox
              ariaLabel="Filter actions by text"
              placeholder="Filter actions"
              onAbort={onAbort}
              onChange={onChange}
              styles={searchBoxStyles}
            />
          </div>
          {defaultRender(menuListProps)}
        </div>
      );
    },
    [onAbort, onChange],
  );

  const menuProps = React.useMemo(
    () => ({
      onRenderMenuList: renderMenuList,
      title: 'Actions',
      shouldFocusOnMount: true,
      items,
    }),
    [items, renderMenuList],
  );

  return (
    <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
  );
};

const filteredItemsStyle = {
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const searchBoxStyles = {
  root: { margin: '8px' },
};

const menuItems = [
  { key: 'newItem', text: 'New', onClick: () => logger.log('New clicked') },
  {
    key: 'rename',
    text: 'Rename',
    onClick: () => logger.log('Rename clicked'),
  },
  { key: 'edit', text: 'Edit', onClick: () => logger.log('Edit clicked') },
  {
    key: 'properties',
    text: 'Properties',
    onClick: () => logger.log('Properties clicked'),
  },
  { key: 'linkNoTarget', text: 'Link same window', href: 'http://bing.com' },
  {
    key: 'linkWithTarget',
    text: 'Link new window',
    href: 'http://bing.com',
    target: '_blank',
  },
  {
    key: 'linkWithOnClick',
    name: 'Link click',
    href: 'http://bing.com',
    onClick: ev => {
      alert('Link clicked');
      ev.preventDefault();
    },
    target: '_blank',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
    onClick: () => logger.error('Disabled item should not be clickable.'),
  },
];

export default ContextualMenuWithCustomMenuListExample;
