import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const textFieldStyles = {
  subComponentStyles: {
    label: { root: { display: 'inline-block', marginRight: '10px' } },
  },
  fieldGroup: { display: 'inline-flex', maxWidth: '100px' },
  wrapper: { display: 'block', marginBottom: '10px' },
};

export const ContextualMenuSubmenuExample = () => {
  const [hoverDelay, setHoverDelay] = React.useState(250);

  const onHoverDelayChanged = React.useCallback((ev, newValue) => {
    setHoverDelay(Number(newValue) || 0);
  }, []);

  const menuProps = React.useMemo(
    () => ({
      shouldFocusOnMount: true,
      subMenuHoverDelay: hoverDelay,
      items: menuItems,
    }),
    [hoverDelay],
  );

  return (
    <div>
      ContextualMenuSubmenuExample
      <TextField
        value={String(hoverDelay)}
        label="Hover delay (ms)"
        type="number"
        onChange={onHoverDelayChanged}
        styles={textFieldStyles}
      />
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
    </div>
  );
};

const menuItems = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          title: 'Create an email',
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          title: 'Create a calendar event',
        },
      ],
    },
    href: 'https://bing.com',
    text: 'New',
    target: '_blank',
    ariaLabel: 'New. Press enter or right arrow keys to open submenu.',
  },
  {
    key: 'share',
    subMenuProps: {
      items: [
        { key: 'sharetotwitter', text: 'Share to Twitter' },
        { key: 'sharetofacebook', text: 'Share to Facebook' },
        {
          key: 'sharetoemail',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlook_1',
                text: 'Share to Outlook',
                title: 'Share to Outlook',
              },
              {
                key: 'sharetogmail_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail',
              },
            ],
          },
        },
      ],
    },
    text: 'Share',
    ariaLabel: 'Share. Press enter, space or right arrow keys to open submenu.',
  },
  {
    key: 'shareSplit',
    split: true,
    'aria-roledescription': 'split button',
    subMenuProps: {
      items: [
        { key: 'sharetotwittersplit', text: 'Share to Twitter' },
        { key: 'sharetofacebooksplit', text: 'Share to Facebook' },
        {
          key: 'sharetoemailsplit',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              {
                key: 'sharetooutlooksplit_1',
                text: 'Share to Outlook',
                title: 'Share to Outlook',
              },
              {
                key: 'sharetogmailsplit_1',
                text: 'Share to Gmail',
                title: 'Share to Gmail',
              },
            ],
          },
        },
      ],
    },
    text: 'Share w/ Split',
    ariaLabel:
      'Share w/ Split. Press enter or space keys to trigger action. Press right arrow key to open submenu.',
  },
];

export default ContextualMenuSubmenuExample;
