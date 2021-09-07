import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

export const CommandBarLazyExample = () => {
  const [menuItems, setMenuItems] = React.useState(undefined);

  const timeoutRef = React.useRef();

  const items = React.useMemo(() => {
    const loadItems = () => {
      const itemCount = Math.floor(Math.random() * 5) + 1;

      const newMenuItems = [];

      for (let i = 0; i < itemCount; i++) {
        newMenuItems.push({
          key: `sub-item-${i}`,
          name: `Item ${i}`,
        });
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setMenuItems(newMenuItems);
      }, 2000);
    };

    return [
      {
        key: 'a',
        name: 'Test',
      },
      {
        key: 'menu',
        name: 'Lazy-loaded menu',
        subMenuProps: {
          items: menuItems
            ? [
                ...menuItems,
                {
                  key: 'divider',
                  name: '-',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'permanent',
                  name: 'Permanent option',
                },
              ]
            : [],
          onMenuOpened: loadItems,
          onMenuDismissed: () => setMenuItems(undefined),
        },
      },
    ];
  }, [menuItems]);

  return (
    <div>
      CommandBarLazyExample
      <CommandBar items={items} />
    </div>
  );
};

export default CommandBarLazyExample;
