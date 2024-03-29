import * as React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import {
  CommandBarButton,
  IButtonProps,
} from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import {
  IContextualMenuItemProps,
  ContextualMenuItem,
  IContextualMenuItemStyles,
  IContextualMenuStyles,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { getTheme, concatStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import logger from 'loglevel';

const theme = getTheme();
// Styles for both command bar and overflow/menu items
const itemStyles = {
  label: { fontSize: 18 },
  icon: { color: theme.palette.red },
  iconHovered: { color: theme.palette.redDark },
};
// For passing the styles through to the context menus
const menuStyles = {
  subComponentStyles: { menuItem: itemStyles, callout: {} },
};

const getCommandBarButtonStyles = memoizeFunction(originalStyles => {
  if (!originalStyles) {
    return itemStyles;
  }

  return concatStyleSets(originalStyles, itemStyles);
});

// Custom renderer for main command bar items
const CustomButton = props => {
  const buttonOnMouseClick = () => alert(`${props.text} clicked`);
  // eslint-disable-next-line react/jsx-no-bind
  return (
    <CommandBarButton
      {...props}
      onClick={buttonOnMouseClick}
      styles={getCommandBarButtonStyles(props.styles)}
    />
  );
};

// Custom renderer for menu items (these must have a separate custom renderer because it's unlikely
// that the same component could be rendered properly as both a command bar item and menu item).
// It's also okay to custom render only the command bar items without changing the menu items.
const CustomMenuItem = props => {
  const buttonOnMouseClick = () => alert(`${props.item.text} clicked`);
  // Due to ContextualMenu implementation quirks, passing styles here doesn't work
  // eslint-disable-next-line react/jsx-no-bind
  return <ContextualMenuItem {...props} onClick={buttonOnMouseClick} />;
};

const overflowProps = {
  ariaLabel: 'More commands',
  menuProps: {
    contextualMenuItemAs: CustomMenuItem,
    // Styles are passed through to menu items here
    styles: menuStyles,
    items: [], // CommandBar will determine items rendered in overflow
    isBeakVisible: true,
    beakWidth: 20,
    gapSpace: 10,
    directionalHint: DirectionalHint.topCenter,
  },
};

export const CommandBarButtonAsExample = () => {
  return (
    <div>
      CommandBarButtonAsExample
      <CommandBar
        overflowButtonProps={overflowProps}
        // Custom render all buttons
        buttonAs={CustomButton}
        items={_items}
        overflowItems={_overflowItems}
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
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      // Must specify the menu item type for submenus too!
      contextualMenuItemAs: CustomMenuItem,
      // Styles are passed through to menu items here
      styles: menuStyles,
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          iconProps: { iconName: 'Mail' },
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
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => logger.log('Info'),
  },
];

export default CommandBarButtonAsExample;
