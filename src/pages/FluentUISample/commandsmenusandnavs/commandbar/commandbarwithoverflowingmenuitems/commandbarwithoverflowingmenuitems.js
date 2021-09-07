import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import logger from 'loglevel';

const overflowProps = { ariaLabel: 'More commands' };

export const CommandBarBasicExample = () => {
  return (
    <div>
      CommandBarBasicExample
      <CommandBar
        items={_items}
        overflowItems={_overflowItems}
        overflowButtonProps={overflowProps}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

const _items = [
  {
    key: 'newItem',
    text: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          iconProps: { iconName: 'Mail' },
          //['data-automation-id']: 'newEmailButton', // optional
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' },
        },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
    href: 'https://developer.microsoft.com/en-us/fluentui',
  },
  {
    key: 'share',
    text: 'Share',
    iconProps: { iconName: 'Share' },
    onClick: () => logger.log('Share'),
  },
  {
    key: 'download',
    text: 'Download',
    iconProps: { iconName: 'Download' },
    onClick: () => logger.log('Download'),
  },
];

const _overflowItems = [
  {
    key: 'move',
    text: 'Move to...',
    onClick: () => logger.log('Move to'),
    iconProps: { iconName: 'MoveToFolder' },
  },
  {
    key: 'copy',
    text: 'Copy to...',
    onClick: () => logger.log('Copy to'),
    iconProps: { iconName: 'Copy' },
  },
  {
    key: 'rename',
    text: 'Rename...',
    onClick: () => logger.log('Rename'),
    iconProps: { iconName: 'Edit' },
  },
];

const _farItems = [
  {
    key: 'tile',
    text: 'Grid view',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Grid view',
    iconOnly: true,
    iconProps: { iconName: 'Tiles' },
    onClick: () => logger.log('Tiles'),
  },
  {
    key: 'info',
    text: 'Info',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => logger.log('Info'),
  },
];

export default CommandBarBasicExample;
