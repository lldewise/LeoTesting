import * as React from 'react';
import {
  CommandBarButton,
  OverflowSet,
  Checkbox,
} from 'office-ui-fabric-react';

const noOp = () => undefined;

const checkboxStyles = {
  root: {
    marginRight: 5,
  },
};

const onRenderItem = item => {
  if (item.onRender) {
    return item.onRender(item);
  }
  return (
    <CommandBarButton
      role="menuitem"
      iconProps={{ iconName: item.icon }}
      menuProps={item.subMenuProps}
      text={item.name}
    />
  );
};

const onRenderOverflowButton = overflowItems => {
  const buttonStyles = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  };
  return (
    <CommandBarButton
      ariaLabel="More items"
      role="menuitem"
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems }}
    />
  );
};

export const OverflowSetCustomExample = () => (
  <OverflowSet
    aria-label="Custom Example"
    role="menubar"
    items={[
      {
        key: 'checkbox',
        onRender: () => {
          return (
            <div>
              OverflowSetCustomExample{' '}
              <Checkbox
                inputProps={{ role: 'menuitemcheckbox' }}
                label="A Checkbox"
                styles={checkboxStyles}
              />{' '}
            </div>
          );
        },
      },
      {
        key: 'newItem',
        name: 'New',
        icon: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: noOp,
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              icon: 'Mail',
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              icon: 'Calendar',
            },
          ],
        },
      },
      {
        key: 'upload',
        name: 'Upload',
        icon: 'Upload',
        onClick: noOp,
      },
      {
        key: 'share',
        name: 'Share',
        icon: 'Share',
        onClick: noOp,
      },
    ]}
    overflowItems={[
      {
        key: 'move',
        name: 'Move to...',
        icon: 'MoveToFolder',
        onClick: noOp,
      },
      {
        key: 'copy',
        name: 'Copy to...',
        icon: 'Copy',
        onClick: noOp,
      },
      {
        key: 'rename',
        name: 'Rename...',
        icon: 'Edit',
        onClick: noOp,
      },
      {
        key: 'disabled',
        name: 'Disabled...',
        icon: 'Cancel',
        disabled: true,
        onClick: noOp,
      },
    ]}
    onRenderOverflowButton={onRenderOverflowButton}
    onRenderItem={onRenderItem}
  />
);

export default OverflowSetCustomExample;
