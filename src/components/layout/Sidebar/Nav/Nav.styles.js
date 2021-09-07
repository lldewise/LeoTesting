import { AnimationClassNames, getFocusStyle } from '@fluentui/react';

export function getStyles({
  isSelected,
  hasChildren,
  nestingLevel,
  isCollapsed,
  scrollTop,
  isChildLinkSelected,
  hasGroupName,
  theme,
}) {
  const { semanticColors, fonts } = theme;

  const navFontSize = fonts.medium.fontSize;
  const navTextColor = semanticColors.menuItemText;
  const navWidth = 240;
  const navCollapsedWidth = 48;
  const shortenedIconWidth = 32;
  const navFloatingWidth = 230;
  const navItemHeight = 48;
  const navChildItemHeight = 32;
  const navBackgroundColor = semanticColors.menuBackground;
  const floatingNavBackgroundColor = semanticColors.menuBackground;
  const navItemHoverColor = semanticColors.menuItemBackgroundHovered;
  const navGroupSeparatorItemHeight = 40;
  const navGroupSeparatorWithGroupNameHeight = 70;
  const navItemWithChildBgColor = semanticColors.menuItemBackgroundPressed;
  const navItemSelectedColor = semanticColors.menuItemBackgroundPressed;
  const navItemIndentSize = 10;
  const navFloatingItemIndentSize = 20;
  const BackDropSelector =
    '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';
  const MouseEnabledDeviceSelector =
    '@media (hover: hover) and (pointer: fine)';

  return {
    Navroot: {
      width: isCollapsed ? navCollapsedWidth : navWidth,
      height: '100vh',
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      borderRightStyle: 'solid',
      borderRightWidth: '1px',
      borderRightColor: semanticColors.bodyFrameDivider,
      position: 'relative',
      selectors: {
        ul: {
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          fontSize: navFontSize,
          selectors: {
            [MouseEnabledDeviceSelector]: {
              selectors: {
                li: {
                  cursor: 'pointer',
                },
                'li:hover  a i, li:hover a div': {
                  backgroundColor: navItemHoverColor,
                },
              },
            },
          },
        },
        a: {
          color: `${navTextColor} !important`,
          outline: 'none',
          background: navItemHoverColor,
          cursor: 'pointer',
        },
      },
    },
    navItemRoot: {
      height:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      paddingLeft:
        !!nestingLevel && nestingLevel > 0
          ? nestingLevel * navItemIndentSize
          : 'inherit',

      background:
        isSelected || isChildLinkSelected ? navItemHoverColor : '#fff',
      selectors: {
        ':hover': {
          backgroundColor: hasChildren
            ? navItemWithChildBgColor
            : navItemHoverColor,
        },
        ':active': {
          backgroundColor: navItemSelectedColor,
        },
      },
    },
    navItemBarMarker: {
      marginLeft:
        !!nestingLevel && nestingLevel > 0 && !hasChildren ? '-10px' : '0px',
      marginRight:
        !!nestingLevel && nestingLevel > 0 && !hasChildren ? '8px' : '4px',

      marginTop: 0,
      width: '4px',

      height: '100%',
      backgroundColor:
        !!nestingLevel && nestingLevel > 0 ? '#6C35D4' : '#6C35D4',
      display: isSelected || isChildLinkSelected ? 'inline-block' : 'none',
      borderWidth: 0,
    },
    navItemIconColumn: {
      width:
        isSelected || isChildLinkSelected
          ? shortenedIconWidth
          : navCollapsedWidth,
      fontSize: '16px',
      lineHeight:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      textAlign: 'center',
      color: navTextColor,
      verticalAlign: 'top',
      background:
        isSelected || isChildLinkSelected ? navItemHoverColor : '#fff',
    },
    navItemNameColumn: {
      width: 'auto',
      paddingLeft:
        isChildLinkSelected ||
        (!hasChildren && isSelected && !(nestingLevel && nestingLevel > 0))
          ? '8px'
          : '0px',
      lineHeight:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      verticalAlign: 'top',
      display: 'inline-block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: navTextColor,
      background:
        isSelected || isChildLinkSelected ? navItemHoverColor : '#fff',
    },
    navSlimItemRoot: {
      selectors: {
        ':hover': {
          backgroundColor: hasChildren
            ? navItemWithChildBgColor
            : navItemHoverColor,
        },
      },
    },
    navFloatingRoot: [
      {
        display: 'none',
        zIndex: 1901,
        position: 'absolute',
        marginLeft: navCollapsedWidth,
        marginTop:
          -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        boxShadow:
          '0px 1.2px 3.6px rgba(0, 0, 0, 0.18), 0px 6.4px 14.4px rgba(0, 0, 0, 0.22)',
        backgroundColor: floatingNavBackgroundColor,
        opacity: '0.6',
        selectors: {
          [BackDropSelector]: {
            webkitBackdropFilter: 'blur(20px) saturate(125%)',
            backdropFilter: 'blur(20px) saturate(125%)',
            backgroundColor: 'rgba(255,255,255,.6)',
          },
          a: {
            width: '100%',
            backgroundColor: 'inherit',
          },
        },
      },
      AnimationClassNames.slideRightIn20,
    ],
    navFloatingItemRoot: {
      height:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      backgroundColor: !(nestingLevel && nestingLevel > 0)
        ? navItemHoverColor
        : floatingNavBackgroundColor,
      paddingLeft: navFloatingItemIndentSize,
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor,
        },
        ':active': {
          backgroundColor: navItemSelectedColor,
        },
      },
    },
    navGroupSeparatorRoot: {
      height: hasGroupName
        ? navGroupSeparatorWithGroupNameHeight
        : navGroupSeparatorItemHeight,
      textAlign: 'center',
    },
    navGroupSeparatorHrLine: {
      position: 'relative',
      height: '20px',
      borderBottom: `1px solid ${navItemWithChildBgColor}`,
    },
    navGroupSeparatorHeaderGroupName: {
      position: 'absolute',
      marginTop: '40px',
      left: '16px',
      color: navTextColor,
      fontWeight: 'bold',
    },
    navToggler: {
      height: navItemHeight,
      cursor: 'pointer',
      backgroundColor: '#fff',
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor,
        },
      },
      textAlign: 'right',
      borderBottom: '1px solid #f8f8f8',
      borderTop: '1px solid #f8f8f8',
    },
    focusedStyle: [
      getFocusStyle(
        theme,
        undefined,
        undefined,
        undefined,
        'transparent',
        undefined,
      ),
      {
        display: 'block',
        position: 'relative',
        height:
          !!nestingLevel && nestingLevel > 0
            ? navChildItemHeight
            : navItemHeight,
        lineHeight:
          !!nestingLevel && nestingLevel > 0
            ? navChildItemHeight
            : navItemHeight,
      },
    ],
  };
}
