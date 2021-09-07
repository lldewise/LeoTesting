import React, { Fragment, useEffect, useState } from 'react';
import classes from './AccountSetting.module.scss';
import StudentRightLayout from '../../../components/layout/RightLayout';
import TeacherRightLayout from '../../../components/layout/TeacherRightLayout';
import AdminRightLayout from '../../../components/layout/AdminRightLayout';
import { Nav, FontIcon, INavLinkGroup } from 'office-ui-fabric-react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { useStore } from '../../../store/store';
import Profile from './Profile/Profile';
import Notification from './Notification/Notification';
import { hasRole } from '../../../util/commonFunction';
import { Roles } from '../../../util/constant';
const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Profile',
        key: '1',
        icon: 'IDBadge',
        url: '',
      },
      {
        name: 'Security',
        key: '2',
        icon: 'Shield',
        url: '',
      },

      {
        name: 'Notification',
        key: '3',
        icon: 'Ringer',
        target: '_blank',
        url: '',
      },
      {
        name: 'Language',
        icon: 'LocaleLanguage',
        key: '4',
        target: '_blank',
        url: '',
      },
    ],
  },
];

const AccountSetting: React.FC = () => {
  const [data, dispatch] = useStore();
  const [selectedMenu, setSelectedMenu] = useState(
    data.navigationActive.toString(),
  );
  const [container, setContainer] = useState<JSX.Element>();
  const [userRole, setUserRole] = useState<string | null>();

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  useEffect(() => {
    if (Number(data.navigationActive) > 0) {
      setSelectedMenu(data.navigationActive.toString());
      selectedNavigation(data.navigationActive);
    }
  }, [data.navigationActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const _onLinkClick = (ev: any, item: any) => {
    dispatch('UPDATE_NAVIGATION', item.key);
  };
  const gotoProfileHandler = () => {
    setSelectedMenu('1');
    dispatch('UPDATE_NAVIGATION', '1');
  };

  const selectedNavigation = (key: any) => {
    switch (Number(key)) {
      case 1:
        return setContainer(
          <Profile
            user={data.userProfile}
            userExternalId={data.userExternalId}
          />,
        );
      case 2:
        return setContainer(<div>Student</div>);
      case 3:
        return setContainer(
          <Notification
            usernotification={data.userSettingNotification}
            user={data.userProfile}
            gotoProfile={gotoProfileHandler}
          />,
        );
      case 4:
        return setContainer(<div>Language</div>);
      default:
        return setContainer(
          <Profile
            user={data.userProfile}
            userExternalId={data.userExternalId}
          />,
        );
    }
  };

  useEffect(() => {
    if (data.userSettingNotification.id != null) {
      selectedNavigation(selectedMenu);
    }
  }, [data.userSettingNotification.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data.userProfile.id != null) {
      // getUserNotification();
      if (data.navigationActive.toString() === '0') {
        setSelectedMenu('1');
        selectedNavigation('1');
      } else {
        setSelectedMenu(data.navigationActive.toString());
        selectedNavigation(data.navigationActive);
      }
    }
  }, [data.userProfile.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 ">
          <div className="ms-Grid-col ms-lg9  ">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-lg12">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                      <FontIcon
                        iconName="PlayerSettings"
                        className={'padR10 ' + classes.headerIcon}
                      />
                    </div>
                    <div className={'ms-Grid-col ms-lg3 '}>
                      {' '}
                      Account Setting{' '}
                    </div>
                  </div>
                </div>
                <div className={'ms-Grid-row ' + classes.container}>
                  <div className="ms-Grid-col ms-lg12">
                    <div className={classes.flexcontainer}>
                      <div className={classes.containerleft}>
                        <div
                          className={
                            'AccountSettingPersona ' + classes.persona
                          }>
                          <Persona
                            text={data.userProfile.text?.toString()}
                            imageUrl={data.userProfile.imageUrl?.toString()}
                            secondaryText="Your Personal Account"
                            imageInitials={data.userProfile.imageInitials?.toString()}
                            size={PersonaSize.size40}
                            presence={PersonaPresence.online}
                          />
                        </div>
                        <div className="navProfileContainer">
                          <Nav
                            onLinkClick={_onLinkClick}
                            selectedKey={selectedMenu}
                            ariaLabel="Nav basic example"
                            styles={navStyles}
                            groups={navLinkGroups}
                          />
                        </div>
                      </div>
                      <div
                        className={
                          'accountSettingScroll ' +
                          classes.accountSettingContainer
                        }>
                        {container}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-col ms-lg3 main-right-panel">
            {hasRole(userRole, Roles.STUDENT) && <StudentRightLayout />}
            {hasRole(userRole, Roles.TEACHER) && <TeacherRightLayout />}
            {hasRole(userRole, Roles.ADMINISTRATOR) && <AdminRightLayout />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;
