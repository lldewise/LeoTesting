import * as React from 'react';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuItem,
  IContextualMenuProps,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const keys = [
  'newItem',
  'share',
  'mobile',
  'enablePrint',
  'enableMusic',
  'newSub',
  'emailMessage',
  'calendarEvent',
  'disabledNewSub',
  'disabledEmailMessage',
  'disabledCalendarEvent',
  'splitButtonSubMenuLeftDirection',
  'emailMessageLeft',
  'calendarEventLeft',
  'disabledPrimarySplit',
];

export const ContextualMenuCheckmarksExample = () => {
  const [selection, setSelection] = React.useState({});

  const onToggleSelect = React.useCallback(
    (ev, item) => {
      ev && ev.preventDefault();

      if (item) {
        setSelection({
          ...selection,
          [item.key]:
            selection[item.key] === undefined ? true : !selection[item.key],
        });
      }
    },
    [selection],
  );

  const menuProps = React.useMemo(
    () => ({
      shouldFocusOnMount: true,
      items: [
        {
          key: keys[0],
          text: 'New',
          canCheck: true,
          isChecked: selection[keys[0]],
          onClick: onToggleSelect,
        },
        {
          key: keys[1],
          text: 'Share',
          canCheck: true,
          isChecked: selection[keys[1]],
          onClick: onToggleSelect,
        },
        {
          key: keys[2],
          text: 'Mobile',
          canCheck: true,
          isChecked: selection[keys[2]],
          onClick: onToggleSelect,
        },
        { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
        {
          key: keys[3],
          text: 'Print',
          canCheck: true,
          isChecked: selection[keys[3]],
          onClick: onToggleSelect,
        },
        {
          key: keys[4],
          text: 'Music',
          canCheck: true,
          isChecked: selection[keys[4]],
          onClick: onToggleSelect,
        },
        {
          key: keys[5],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[6],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[6]],
                onClick: onToggleSelect,
              },
              {
                key: keys[7],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[7]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button',
          canCheck: true,
          isChecked: selection[keys[5]],
          split: true,
          onClick: onToggleSelect,
          ariaLabel:
            'Split Button. Click to check/uncheck. Press right arrow key to open submenu.',
        },
        {
          key: keys[8],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[9],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[9]],
                onClick: onToggleSelect,
              },
              {
                key: keys[10],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[10]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button',
          canCheck: true,
          isChecked: selection[keys[8]],
          split: true,
          onClick: onToggleSelect,
          disabled: true,
          ariaLabel:
            'Split Button. Click to check/uncheck. Press right arrow key to open submenu.',
        },
        {
          key: keys[11],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            directionalHint: DirectionalHint.leftCenter,
            items: [
              {
                key: keys[12],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[12]],
                onClick: onToggleSelect,
              },
              {
                key: keys[13],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[13]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button Left Menu',
          canCheck: true,
          isChecked: selection[keys[11]],
          split: true,
          onClick: onToggleSelect,
          ariaLabel:
            'Split Button Left Menu. Click to check/uncheck. Press right arrow key to open submenu.',
        },
        {
          key: keys[12],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[12],
                name: 'Email message',
                canCheck: true,
                isChecked: selection[keys[12]],
                onClick: onToggleSelect,
              },
            ],
          },
          name: 'Split Button Disabled Primary',
          split: true,
          primaryDisabled: true,
          ariaLabel:
            'Split Button Disabled Primary. Click to check/uncheck. Press right arrow key to open submenu.',
        },
        {
          key: keys[13],
          iconProps: {
            iconName: selection[keys[13]]
              ? 'SingleBookmarkSolid'
              : 'SingleBookmark',
          },
          name: selection[keys[13]]
            ? 'Toogled command no checkmark'
            : 'Toogle command no checkmark',
          canCheck: false,
          isChecked: selection[keys[13]],
          onClick: onToggleSelect,
        },
      ],
    }),
    [selection, onToggleSelect],
  );

  return (
    <div>
      ContextualMenuCheckmarksExample{' '}
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />{' '}
    </div>
  );
};

export default ContextualMenuCheckmarksExample;
