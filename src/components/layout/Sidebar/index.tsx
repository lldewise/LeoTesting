import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useRoutePath from '../../../util/route/useRoutePath';
import { Nav, FontIcon, INavLinkGroup, INavLink } from 'office-ui-fabric-react';
import logo from '../../../assets/images/blue-logo@2x@2x.png';
import classes from './Sidebar.module.scss';
import i18n from '../../../i18n/i18n';
import useWindowDimensions from '../../../util/windowdimension';
import { useStore } from '../../../store/store';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
// import { NavLinkOnPress } from "../../../types/components/layout/sidebar";

function isVisible(route: INavLink) {
  return !route.isHidden;
}
const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};
const navSmallStyles = {
  root: {
    width: 50,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navList: INavLinkGroup[] = [
  {
    links: [
      {
        key: '1',
        name: intl(LabelNames.smenu_dashboard),
        icon: 'Home',
        routes: '/',
        url: '',
      },
      {
        key: '2',
        name: intl(LabelNames.smenu_schedules),
        icon: 'Calendar',
        routes: '/schedules',
        url: '',
      },

      {
        key: '3',
        name: intl(LabelNames.smenu_classes),
        icon: 'Dictionary',
        routes: '/classes',
        url: '',
      },
      {
        key: '4',
        name: intl(LabelNames.smenu_files),
        icon: 'FabricFolder',
        routes: '/files',
        url: '',
      },
      {
        key: '5',
        name: intl(LabelNames.smenu_students),
        icon: 'ContactCard',
        routes: '/students',
        url: '',
      },
      // {
      //   key: '6',
      //   name: intl(LabelNames.smenu_groups),
      //   icon: 'Group',
      //   routes: '/',
      //   url: '',
      // },
      {
        key: '64',
        name: intl(LabelNames.smenu_mail),
        icon: 'Mail',
        routes: '/mail',
        url: '',
      },
      {
        key: '7',
        name: intl(LabelNames.smenu_messages),
        icon: 'Message',
        routes: '/',
        url: '',
      },
      {
        key: '8',
        name: intl(LabelNames.smenu_attendance),
        icon: 'ReminderPerson',
        routes: '/attendance',
        url: '',
      },
      {
        key: '9',
        name: intl(LabelNames.smenu_news),
        icon: 'news',
        routes: '/news',
        url: '',
        links: [
          {
            name: intl(LabelNames.smenu_news_manage),
            key: '51',
            icon: 'SecurityGroup',
            routes: '/news/list',
            url: '',
            // isExpanded: expanded,
          },
        ],
        //isExpanded: expanded,
      },
      // {
      //   key: '10',
      //   name: intl(LabelNames.smenu_events),
      //   icon: 'FavoriteStar',
      //   routes: '/',
      //   url: '',
      // },
      {
        key: '11',
        name: intl(LabelNames.smenu_admin),
        icon: 'Processing',
        routes: '/administration',
        url: '',
        links: [
          {
            key: '61',
            name: intl(LabelNames.smenu_admin_useraccounts),
            icon: 'ContactCardSettings',
            routes: '/administration/user-account',
            url: '',
          },
          {
            key: '62',
            name: intl(LabelNames.smenu_admin_classes),
            icon: 'Dictionary',
            routes: '/administration/manage-classes',
            url: '',
          },
          {
            key: '63',
            name: intl(LabelNames.smenu_admin_activities),
            icon: 'EditCreate',
            routes: '/administration/activities',
            url: '',
          },

          {
            key: '65',
            name: 'Create Email',
            icon: 'Mail',
            routes: '/administration/create',
            url: '',
          },
        ],
        // isExpanded: expandedAdministration,
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const history = useHistory();
  //eslint-disable-next-line
  const { current, paths } = useRoutePath();
  const [navigationToggle, setNavigationToggle] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  //eslint-disable-next-line
  const [expanded, setExpanded] = useState(false);
  //eslint-disable-next-line
  const [expandedAdministration, setExpandedAdministration] = useState(false);
  const [data, dispatch] = useStore();
  const [navLink, setNavLink] = useState<INavLinkGroup[]>([...navList]);

  useEffect(() => {
    if (data.userProfile.role != null) {
      if (data.userProfile.role?.toLowerCase() === 'student') {
        const newNav = navList[0].links.filter(r => r.key !== '11');
        setNavLink([{ links: newNav }]);
      } else {
        setNavLink(navList);
      }
    }
  }, [data.userProfile.role]); //eslint-disable-line react-hooks/exhaustive-deps

  const _onLinkClick = (ev: any, item: any): any => {
    if (item) {
      setSelectedMenu(item.key as string);
      dispatch('SIDEBARSELECTEDKEY', item.key);
      history.push('/' + i18n.language + item.routes);
      if (item.key === '9' || item.key === '51') {
        setExpanded(true);
        setExpandedAdministration(false);
      } else {
        setExpanded(false);
        setExpandedAdministration(true);
      }
      if (
        item.key === '11' ||
        item.key === '61' ||
        item.key === '62' ||
        item.key === '63' ||
        item.key === '64'
      ) {
        setExpandedAdministration(true);
        setExpanded(false);
      } else {
        setExpandedAdministration(false);
        setExpanded(true);
      }
    }
  };

  useEffect(() => {
    if (width) {
      if (width <= 1024) {
        setNavigationToggle(true);
      } else {
        setNavigationToggle(false);
      }
    }
  }, [width]);

  const navigationHandler = () => {
    setNavigationToggle(!navigationToggle);
  };

  useEffect(() => {
    if (data.navigationActive !== null) {
      setSelectedMenu(data.navigationActive as string);
    }
    if (data.navigationActive === '51') {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
    if (
      data.navigationActive === '61' ||
      data.navigationActive === '62' ||
      data.navigationActive === '63' ||
      data.navigationActive === '64'
    ) {
      setExpandedAdministration(true);
    } else {
      setExpandedAdministration(false);
    }
  }, [data.navigationActive]);

  return (
    <div className="NavigationContainer">
      {navigationToggle ? (
        <div className="left-logo" style={{ backgroundColor: 'white' }}>
          <img src={logo} alt="Logo" className="imgtb" />
        </div>
      ) : (
        <div className="left-logo" style={{ backgroundColor: 'white' }}>
          <img src={logo} alt="Logo" className="imgtb" />{' '}
          <label className="labeltb"> NGG & NIS</label>
        </div>
      )}

      <div className="sidebarContainer">
        <Nav
          onLinkClick={_onLinkClick}
          selectedKey={selectedMenu.toString()}
          ariaLabel="Nav basic example"
          styles={navigationToggle ? navSmallStyles : navStyles}
          groups={navLink}
        />
      </div>
      <div className="nav-toggler ">
        {navigationToggle ? (
          <div className={classes.toogleLeft}>
            <FontIcon iconName="OpenPaneMirrored" onClick={navigationHandler} />
          </div>
        ) : (
          <div className={classes.toogleRight}>
            <FontIcon iconName="OpenPane" onClick={navigationHandler} />
          </div>
        )}
      </div>
    </div>
  );

  //eslint-disable-next-line
  function mapRouteToNavLink(route: INavLink, deeply = true) {
    return {
      name: route.name,
      key: route.uniqueKey,
      alternateText: route.name,
      title: route.name,
      url: route.path,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        history.push(route.path);
      },
      isExpanded:
        deeply &&
        hasChildren(route) &&
        paths.some((that: INavLink) => that.uniqueKey === route.uniqueKey),
      links:
        deeply &&
        hasChildren(route) &&
        route.children
          .filter(isVisible)
          //eslint-disable-next-line
          .map((child: INavLink) => mapRouteToNavLink(child, deeply)),
      icon: route.icon
        ? route.icon
        : hasChildren(route)
        ? 'DocumentSet'
        : 'TextDocument',
    };
  }

  function hasChildren(route: INavLink) {
    return route?.children?.filter(isVisible).length;
  }
};

export default Sidebar;
