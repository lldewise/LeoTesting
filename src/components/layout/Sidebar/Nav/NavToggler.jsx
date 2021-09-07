import React, { Fragment } from 'react';
import { styled, classNamesFunction } from '@fluentui/react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { Nav } from './Nav';
import { SlimNav } from './SlimNav';
import { getStyles } from './Nav.styles';
import { NavLink } from './NavLink';
import logo from '../../../../assets/images/blue-logo@2x@2x.png';

const getClassNames = classNamesFunction();

class NavTogglerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavCollapsed:
        localStorage.getItem('NavToggler.isNavCollapsed') === 'true' ||
        window.innerWidth < 720,
      showMore: localStorage.getItem('NavToggler.showMore') === 'true',
    };
    this._onShowMoreLinkClicked = this._onShowMoreLinkClicked.bind(this);
  }

  render() {
    const { styles, groups, theme } = this.props;
    const { isNavCollapsed, showMore } = this.state;

    if (!groups?.length) {
      return null;
    }

    const classNames = getClassNames(styles, {
      isCollapsed: isNavCollapsed,
      theme: theme,
    });

    const toggleNavGroups = groups.filter(
      navGroup => navGroup?.groupType === 'ToggleGroup',
    );
    const nonToggleNavGroups = groups.filter(
      navGroup => navGroup?.groupType !== 'ToggleGroup',
    );

    return (
      <>
        {isNavCollapsed ? (
          <div className="left-logo" style={{ backgroundColor: 'white' }}>
            <img src={logo} alt="Logo" className="imgtb" />
          </div>
        ) : (
          <div className="left-logo" style={{ backgroundColor: 'white' }}>
            <img src={logo} alt="Logo" className="imgtb" />{' '}
            <label className="labeltb"> NGG & NIS</label>
          </div>
        )}

        <div className={'Navroot ' + classNames.Navroot}>
          <FocusZone
            direction={FocusZoneDirection.vertical}
            className="nav-group">
            <nav role="navigation">
              {isNavCollapsed ? (
                <>
                  <SlimNav
                    groups={nonToggleNavGroups}
                    selectedKey={this.props.selectedKey}
                    showMore={showMore}
                    onShowMoreLinkClicked={this._onShowMoreLinkClicked}
                  />
                </>
              ) : (
                <>
                  <Nav
                    groups={nonToggleNavGroups}
                    selectedKey={this.props.selectedKey}
                    showMore={showMore}
                    onShowMoreLinkClicked={this._onShowMoreLinkClicked}
                  />
                </>
              )}
              {/* Toggle button */}
            </nav>
          </FocusZone>
          <div className="nav-toggler">
            {this._renderExpandCollapseNavItem(toggleNavGroups)}
          </div>
        </div>
      </>
    );
  }

  _onNavCollapseClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState(prevState => {
      localStorage.setItem(
        'NavToggler.isNavCollapsed',
        prevState.isNavCollapsed ? 'false' : 'true',
      );
      return { isNavCollapsed: !prevState.isNavCollapsed };
    });
  }

  _renderExpandCollapseNavItem(toggleNavGroups) {
    const { styles, theme } = this.props;
    const { isNavCollapsed } = this.state;

    const link = toggleNavGroups?.[0]?.links?.[0];

    if (!link) {
      // There is no toggle group with links defined
      return null;
    }

    const classNames = getClassNames(styles, { theme: theme });
    const ariaLabel = isNavCollapsed ? link.name : link.alternateText;
    const icon = isNavCollapsed
      ? (link.icon = 'OpenPaneMirrored')
      : (link.icon = 'OpenPane');
    return (
      <NavLink
        id={link.key}
        href={link.url}
        icon={icon}
        onClick={this._onNavCollapseClicked.bind(this)}
        ariaExpanded={!isNavCollapsed}
        dataValue={link.key}
        ariaLabel={ariaLabel}
        rootClassName={classNames.navToggler}
        leftIconName={link.icon}
        iconClassName={classNames.navItemIconColumn}
        barClassName={classNames.navItemBarMarker}
        focusedStyle={classNames.focusedStyle}
        role="menu"
        title={link.title}
      />
    );
  }

  _onShowMoreLinkClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState(prevState => {
      localStorage.setItem(
        'NavToggler.showMore',
        prevState.showMore ? 'false' : 'true',
      );
      return { showMore: !prevState.showMore };
    });
  }
}

export const NavToggler = styled(NavTogglerComponent, getStyles);
