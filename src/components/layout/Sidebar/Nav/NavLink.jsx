import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Fragment } from 'react';

/**
 * Represents a composed link in the Nav component.
 */
export function NavLink({
  rightIconName,
  leftIconName,
  id,
  href,
  target,
  onClick,
  dataValue,
  ariaLabel,
  ariaExpanded,
  title,
  role,
  rootClassName,
  barClassName,
  content,
  iconClassName,
  textClassName,
  focusedStyle,
  hasChildren,
}) {
  const computedTextWidth = {
    // 100px to accomodate left and right icons (48px each)
    width: 'calc(100% - 96px)',
  };

  if (!rightIconName && !leftIconName) {
    // no icons, take full with to text jay
    //computedTextWidth.width = "100%";
  } else if (!leftIconName || !rightIconName) {
    // 48px to the left or right icon
    computedTextWidth.width = 'calc(100% - 48px)';
  }

  const fixedIconWidth = {
    width: '48px',
    display: rightIconName === 'OpenInNewWindow' ? 'none' : 'inline-block',
  };

  return (
    <>
      {hasChildren !== undefined ? (
        <div className={rootClassName} aria-hidden="true">
          <hr className={barClassName} />
          {leftIconName ? (
            <Icon iconName={leftIconName} className={iconClassName} />
          ) : (
            ''
          )}
          {content ? (
            <div
              onClick={ev => onClick(ev, 'news')}
              className={mergeStyles(textClassName, computedTextWidth)}>
              {content}
            </div>
          ) : null}

          <Icon
            onClick={onClick}
            iconName={rightIconName}
            className={mergeStyles(iconClassName, fixedIconWidth)}
          />
        </div>
      ) : (
        <a
          id={id}
          href={href}
          target={target}
          onClick={onClick}
          data-hint={false}
          data-value={dataValue}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          role={role}
          className={focusedStyle}
          title={title}>
          <div className={rootClassName} aria-hidden="true">
            <hr className={barClassName} />
            {leftIconName ? (
              <Icon iconName={leftIconName} className={iconClassName} />
            ) : (
              <Icon iconName="TaskManager" className="padR15 padl5" />
            )}
            {content ? (
              <div className={mergeStyles(textClassName, computedTextWidth)}>
                {content}
              </div>
            ) : null}
            {rightIconName ? (
              <Icon
                iconName={rightIconName}
                className={mergeStyles(iconClassName, fixedIconWidth)}
              />
            ) : null}
          </div>
        </a>
      )}
    </>
  );
}
