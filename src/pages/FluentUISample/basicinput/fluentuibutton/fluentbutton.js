import React from 'react';
import {
  DefaultButton,
  PrimaryButton,
  CompoundButton,
  CommandBarButton,
  Stack,
  IconButton,
  ContextualMenu,
  ActionButton,
} from 'office-ui-fabric-react';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';
import logger from 'loglevel';
const _alertClicked = () => {
  alert('Clicked');
};

const disabled = false;
const checked = false;

const menuProps = {
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
};

const addIcon = { iconName: 'Add' };
const mailIcon = { iconName: 'Mail' };
const stackStyles = { root: { height: 44 } };

const emojiIcon = { iconName: 'Emoji2' };

const stackTokens = { childrenGap: 40 };

const calloutProps = { gapSpace: 0 };
const hostStyles = { root: { display: 'inline-block' } };

function _getMenu(props) {
  // Customize contextual menu with menuAs
  return <ContextualMenu {...props} />;
}

function _onMenuClick(ev) {
  logger.log(ev);
}

const FluentButton = () => {
  const tooltipId = useId('tooltip');
  return (
    <div>
      <div className="fluenttitle divpadt10 componentName">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Button</h5>
          </span>
        </div>
      </div>
      <div className="subName">Solid</div>
      <div className="divpadt10">
        <span>
          <DefaultButton
            text="Default"
            className="btnDefault marginR15"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </span>
        <span>
          <PrimaryButton
            text="Primary"
            className="btnPrimary marginR15"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </span>
        <span>
          <DefaultButton
            text="Secondary"
            className="btnSecondary marginR15"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </span>
        <span>
          <DefaultButton
            text="Danger"
            className="btnDanger marginR15"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
        </span>
        <span>
          <DefaultButton
            text="Disabled"
            className="btnDissabled marginR15"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled="true"
            checked={checked}
          />
        </span>
      </div>

      <div className="fluenttitle divpadt10">Compound Button</div>
      <div className="divpadt10">
        <span>
          {' '}
          <CompoundButton
            secondaryText="This is the secondary text."
            disabled={disabled}
            checked={checked}>
            Standard
          </CompoundButton>
        </span>
        <span>
          <CompoundButton
            primary
            secondaryText="This is the secondary text."
            disabled={disabled}
            checked={checked}>
            Primary
          </CompoundButton>{' '}
        </span>
      </div>

      <div className="fluenttitle divpadt10">CommandBar Button</div>
      <div className="divpadt10">
        <Stack horizontal styles={stackStyles}>
          <CommandBarButton
            iconProps={addIcon}
            text="New item"
            // Set split=true to render a SplitButton instead of a regular button with a menu
            // split={true}
            menuProps={menuProps}
            disabled={disabled}
            checked={checked}
          />
          <CommandBarButton
            iconProps={mailIcon}
            text="Send mail"
            disabled={disabled}
            checked={checked}
          />
          <CommandBarButton
            iconProps={mailIcon}
            text="btnPlain"
            className="btnPlain"
            checked={checked}
          />
        </Stack>
      </div>
      <div className="fluenttitle divpadt10">Action Button</div>
      <div className="divpadt10">
        <Stack horizontal styles={stackStyles}>
          <ActionButton
            iconProps={mailIcon}
            text="btnPlain"
            className="btnPlain"
            checked={checked}
          />
          <ActionButton
            iconProps={mailIcon}
            text="btnPlain btnPrimary"
            className="btnPlain btnPrimary"
            checked={checked}
          />
          <ActionButton
            text="btnIconRight"
            iconProps={mailIcon}
            className="btnPlain btnIconRight"
            checked={checked}
          />
          <ActionButton
            text="Without Icon"
            className="btnPlain btnPrimary"
            checked={checked}
          />
          <ActionButton
            text="btnPlain btnInfo"
            iconProps={mailIcon}
            className="btnPlain btnInfo"
            checked={checked}
          />
          <ActionButton
            text="btnUnderlined"
            iconProps={mailIcon}
            className="btnUnderlined"
            checked={checked}
          />
        </Stack>
      </div>
      <div className="fluenttitle divpadt10">Icon Button </div>
      <div className="divpadt10">
        <Stack tokens={{ childrenGap: 8 }} horizontal>
          <IconButton
            iconProps={emojiIcon}
            title="Emoji ji"
            ariaLabel="Emoji"
            disabled={disabled}
            checked={checked}
          />
          <IconButton
            menuProps={menuProps}
            iconProps={emojiIcon}
            ariaLabel="Emoji"
            disabled={disabled}
            checked={checked}
          />
          <IconButton
            iconProps={{ iconName: 'more' }}
            className="btnIcon btnIconDark btnIconLg"
          />
          <IconButton
            iconProps={{ iconName: 'moreVertical' }}
            className="btnIcon btnIconDark btnIconLg hideMenuIcon"
            menuProps={menuProps}
          />
        </Stack>
      </div>
      <div className="fluenttitle divpadt10">Split Button</div>
      <div className="divpadt10 fluentSplitButton">
        <Stack horizontal wrap tokens={stackTokens}>
          <DefaultButton
            text="Standard"
            split
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            menuProps={menuProps}
            onClick={_alertClicked}
            disabled={disabled}
            checked={checked}
          />
          <DefaultButton
            text="Primary"
            primary
            split
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            menuProps={menuProps}
            onClick={_alertClicked}
            disabled={disabled}
            checked={checked}
          />
          <DefaultButton
            text="Disabled"
            disabled
            allowDisabledFocus
            split
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            menuProps={menuProps}
            onClick={_alertClicked}
            checked={checked}
          />

          <DefaultButton
            text="Show more"
            className="splitUnderlined"
            allowDisabledFocus
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            menuProps={menuProps}
            onClick={_alertClicked}
            checked={checked}
          />
        </Stack>
      </div>

      <div className="fluenttitle divpadt10">Icon Button with tooltip</div>
      <div className="divpadt10">
        <TooltipHost
          content="Emoji"
          // This id is used on the tooltip itself, not the host
          // (so an element with this id only exists when the tooltip is shown)
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}>
          <IconButton
            iconProps={emojiIcon}
            title="Emoji"
            ariaLabel="Emoji"
            disabled={disabled}
            checked={checked}
          />
        </TooltipHost>
      </div>

      <div className="fluenttitle divpadt10">Contextual Menu Button</div>
      <div className="divpadt10">
        <DefaultButton
          text="New item"
          iconProps={addIcon}
          menuProps={menuProps}
          // Optional callback to customize menu rendering
          menuAs={_getMenu}
          // Optional callback to do other actions (besides opening the menu) on click
          onMenuClick={_onMenuClick}
          // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
          // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
          // persistMenu={true}
          allowDisabledFocus
          disabled={disabled}
          checked={checked}
        />
      </div>
    </div>
  );
};

export default FluentButton;
