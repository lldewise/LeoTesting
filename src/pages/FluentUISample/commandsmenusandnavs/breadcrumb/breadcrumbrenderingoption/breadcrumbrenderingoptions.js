import * as React from 'react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
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

const CustomMenuItem = props => {
  const buttonOnMouseClick = () => alert(`${props.item.text} clicked`);
  // Due to ContextualMenu implementation quirks, passing styles here doesn't work
  // eslint-disable-next-line react/jsx-no-bind
  return <ContextualMenuItem {...props} onClick={buttonOnMouseClick} />;
};

const CustomButton = props => {
  const buttonOnMouseClick = () => alert(`${props.text} clicked`);
  // eslint-disable-next-line react/jsx-no-bind
  return <CommandBarButton {...props} onClick={buttonOnMouseClick} />;
};

const labelStyles = {
  root: {
    margin: '10px 0',
    selectors: { '&:not(:first-child)': { marginTop: 24 } },
  },
};

const items = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 2', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 3', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 4 (non-clickable)', key: 'f4' },
  { text: 'Folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 6', key: 'f6', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 7', key: 'f7', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 8', key: 'f8', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 9', key: 'f9', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 10', key: 'f10', onClick: _onBreadcrumbItemClicked },
  {
    text: 'Folder 11',
    key: 'f11',
    onClick: _onBreadcrumbItemClicked,
    isCurrentItem: true,
  },
];
// const itemsWithHref = [
//   // Normally each breadcrumb would have a unique href, but to make the navigation less disruptive
//   // in the example, it uses the breadcrumb page as the href for all the items
//   { text: 'Files', key: 'Files', href: '#/controls/web/breadcrumb' },
//   { text: 'Folder 1', key: 'f1', href: '#/controls/web/breadcrumb' },
//   { text: 'Folder 2', key: 'f2', href: '#/controls/web/breadcrumb' },
//   { text: 'Folder 3', key: 'f3', href: '#/controls/web/breadcrumb' },
//   { text: 'Folder 4 (non-clickable)', key: 'f4' },
//   { text: 'Folder 5', key: 'f5', href: '#/controls/web/breadcrumb', isCurrentItem: true },
// ];
const itemsWithHeading = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
  // Generally, only the last item should ever be a heading.
  // It would typically be h1 or h2, but we're using h4 here to better fit the structure of the page.
  { text: 'Folder 2', key: 'd2', isCurrentItem: true, as: 'h4' },
];

const _items = [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
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

export const BreadcrumbBasicExample = () => {
  return (
    <div>
      BreadcrumbBasicExample
      <Label styles={labelStyles}>With items rendered as buttons</Label>
      <Breadcrumb
        items={items}
        className="basic-breadcrumb"
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with items rendered as buttons"
        overflowAriaLabel="More links"
      />
      <div className="headerBreadcrumbs">
        <div className="headerBreadcrumbsLeft">
          <Breadcrumb
            items={itemsWithHeading}
            className="basic-breadcrumb"
            maxDisplayedItems={3}
          />
        </div>
        <div className="headerBreadcrumbsRight">
          <CommandBar
            className="headerBreadcrumbsRight"
            buttonAs={CustomButton}
            items={_items}
            overflowButtonProps={overflowProps}
          />
        </div>
      </div>
      {/* <Label styles={labelStyles}>With items rendered as links</Label>
      <Breadcrumb
        items={itemsWithHref}
        maxDisplayedItems={3}
        ariaLabel="Breadcrumb with items rendered as links"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With last item rendered as heading</Label>
      <Breadcrumb
        items={itemsWithHeading}
        ariaLabel="With last item rendered as heading"
        overflowAriaLabel="More links"
      />

      <Label styles={labelStyles}>With custom rendered divider and overflow icon</Label>
      <Breadcrumb
        items={itemsWithHeading}
        maxDisplayedItems={3}
        ariaLabel="With custom rendered divider and overflow icon"
        dividerAs={_getCustomDivider}
        onRenderOverflowIcon={_getCustomOverflowIcon}
        overflowAriaLabel="More links"
      /> */}
    </div>
  );
};

function _onBreadcrumbItemClicked(ev, item) {
  logger.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}

// function _getCustomDivider(dividerProps) {
//   const tooltipText = dividerProps.item ? dividerProps.item.text : '';
//   return (
//     <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
//       <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
//         /
//       </span>
//     </TooltipHost>
//   );
// }

// function _getCustomOverflowIcon() {
//   return <Icon iconName={'ChevronDown'} />;
// }

export default BreadcrumbBasicExample;
