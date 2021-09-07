import * as React from 'react';
import logger from 'loglevel';
import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';

export const ContextualMenuBasicExample = () => {
  const linkRef = React.useRef(null);
  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const onShowContextualMenu = React.useCallback(ev => {
    ev.preventDefault(); // don't navigate
    setShowContextualMenu(true);
  }, []);
  const onHideContextualMenu = React.useCallback(
    () => setShowContextualMenu(false),
    [],
  );

  return (
    <div>
      ContextualMenuBasicExample
      <p>
        This example directly uses ContextualMenu to show how it can be attached
        to arbitrary elements. The remaining examples use ContextualMenu through
        Fluent UI Button components.
      </p>
      <p>
        <b>
          <a ref={linkRef} onClick={onShowContextualMenu} href="/#">
            Click for ContextualMenu
          </a>
        </b>
      </p>
      <ContextualMenu
        items={menuItems}
        hidden={!showContextualMenu}
        target={linkRef}
        onItemClick={onHideContextualMenu}
        onDismiss={onHideContextualMenu}
      />
    </div>
  );
};

const menuItems = [
  {
    key: 'newItem',
    text: 'New',
    onClick: () => logger.log('New clicked'),
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
    onClick: () => logger.log('Rename clicked'),
  },
  {
    key: 'edit',
    text: 'Edit',
    onClick: () => logger.log('Edit clicked'),
  },
  {
    key: 'properties',
    text: 'Properties',
    onClick: () => logger.log('Properties clicked'),
  },
  {
    key: 'linkNoTarget',
    text: 'Link same window',
    href: 'http://bing.com',
  },
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

export default ContextualMenuBasicExample;
