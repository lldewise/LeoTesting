import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@fluentui/react';
import { useBoolean, useId } from '@uifabric/react-hooks';
import ateduLogo from '../../../assets/images/atedu-one-word-white.svg';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import MessagePanel from '../../panel/MessagePanel/MessagePanel';
import NotificationPanel from '../../panel/NotificationPanel/NotificationPanel';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { useStore } from '../../../store/store';
import {
  ActionButton,
  DefaultButton,
  Callout,
  getTheme,
  FontWeights,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import { useAuthentication } from '../../../util/context/authentication';
import i18n from '../../../i18n/i18n';
import apiGet from '../../../services/apiGet';
import moment from 'moment';
import { Roles } from '../../../util/constant';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../types/util/context';

const theme = getTheme();

const shieldIcon = { iconName: 'Shield' };
const ringerIcon = { iconName: 'Ringer' };
const languageIcon = { iconName: 'LocaleLanguage' };
const powerButtonIcon = { iconName: 'PowerButton' };

const styles: any = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
    width: 250,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  // inner: {
  //   height: "100%",
  // },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

const UserMenu: React.FC = () => {
  const { principal }: AuthContext = useAuthentication();
  const data = useStore()[0];

  const [
    isOpenMessage,
    { setTrue: openPanelMessages, setFalse: dismissPanelMessages },
  ] = useBoolean(false);
  const [
    isOpenNotifications,
    { setTrue: openPanelNotifications, setFalse: dismissPanelNotifications },
  ] = useBoolean(false);
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [userProfile, dispatch] = useStore();
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const history = useHistory();

  const examplePersona = {
    imageUrl: userProfile.userProfile.imageUrl as string | undefined,
    imageInitials: userProfile.userProfile.imageInitials as string | undefined,
    text: userProfile.userProfile.firstname as string | undefined,
  };

  const examplePersona2 = {
    imageUrl: userProfile.userProfile.imageUrl as string | undefined,
    imageInitials: userProfile.userProfile.imageInitials as string | undefined,
    text: userProfile.userProfile.text as string | undefined,
    secondaryText: userProfile.userProfile.secondaryText as string | undefined,
    tertiaryText: userProfile.userProfile.tertiaryText as string | undefined,
    optionalText: userProfile.userProfile.optionalText as string | undefined,
  };

  const { logout } = useAuthentication();

  const gotoMyProfile = () => {
    toggleIsCalloutVisible();
    dispatch('SELECTEDUSERPROFILE', data.userProfile);
    history.push('/' + i18n.language + '/profile/myprofile');
  };

  const iconClass = {
    fontSize: 20,
    height: 20,
    width: 25,
    margin: '0 8px',
    color: '#fff',
    paddingTop: '5px',
  };

  const notificationHandler = () => {
    history.push('/' + i18n.language + '/profile/accountsetting');
    dispatch('UPDATE_NAVIGATION', 3);
    toggleIsCalloutVisible();
  };

  useEffect(() => {
    if (data.userProfile.id != null) {
      apiGet
        .get(
          '/api/school/' +
            encodeURIComponent(data.userProfile.school) +
            '/userSettingNotification/' +
            data.userProfile.id +
            '?clientId=' +
            data.userExternalUnique,
        )
        .then(response => {})
        .catch(error => {})
        .then(() => {
          setTimeout(() => {
            loadNews();
          }, 500);
        });
    }
  }, [data.userProfile.id]); //eslint-disable-line react-hooks/exhaustive-deps

  const loadNews = () => {
    apiGet
      .get(
        '/api/school/' +
          encodeURIComponent(data.userProfile.school) +
          '/news?clientId=' +
          data.userExternalUnique,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(response => {})
      .catch(error => {})
      .then(() => {
        setTimeout(() => {
          loadLesson();
        }, 500);

        setTimeout(() => {}, 3000);
        // loadUserList();
      });
  };

  const loadLesson = () => {
    if (data.userProfile.role === Roles.TEACHER) {
      if (data.userData?.staff != null) {
        const staffId = data.userData?.staff[0].split('/')[1];
        apiGet
          .get(
            'api/school/' +
              data.userProfile.school +
              '/teacher/' +
              staffId +
              '/lessons/week?clientId=' +
              data.userExternalUnique +
              '&date=' +
              moment(new Date()).format('YYYY-MM-DD'),
          )
          .then(response => {});
      }
    }
  };

  // const loadUserList = async () => {
  //   await apiGet.get('api/school/' + data.userProfile.school + '/guardians');

  //   await apiGet.get('api/school/' + data.userProfile.school + '/student');

  //   await apiGet.get('api/school/' + data.userProfile.school + '/teacher');
  // };

  return (
    <>
      <div className="navtopbar vl">
        <Link className="notification">
          <FontIcon
            iconName="Message"
            style={iconClass}
            onClick={openPanelMessages}
          />

          <span className="badge">3</span>
        </Link>

        <MessagePanel
          isOpenMessage={isOpenMessage}
          dismissPanelMessages={dismissPanelMessages}
        />

        <Link className="notification">
          <FontIcon
            iconName="Ringer"
            style={iconClass}
            onClick={openPanelNotifications}
          />
          <span className="badge">2</span>
        </Link>

        <NotificationPanel
          isOpenNotifications={isOpenNotifications}
          dismissPanelNotifications={dismissPanelNotifications}
        />

        <Link
          className={
            isCalloutVisible ? 'UserProfilePersonaBg' : 'notification'
          }>
          <div
            className="UserProfilePersona"
            id="btnProfile"
            onClick={toggleIsCalloutVisible}>
            <Persona
              {...examplePersona}
              size={PersonaSize.size32}
              imageAlt="Annie Lindqvist, status is online"
              initialsColor={PersonaInitialsColor.blue}
            />
          </div>
        </Link>

        <img src={ateduLogo} className="atedu-logo" alt="Logo" />

        {isCalloutVisible && (
          <Callout
            className={styles.callout + ' userMenu'}
            ariaLabelledBy={labelId}
            ariaDescribedBy={descriptionId}
            role="alertdialog"
            id=""
            gapSpace={0}
            target={'#btnProfile'}
            onDismiss={toggleIsCalloutVisible}
            setInitialFocus>
            <div className={styles.header}>
              <Persona
                {...examplePersona2}
                size={PersonaSize.size48}
                presence={PersonaPresence.online}
                imageAlt="Annie Lindqvist, status is online"
                initialsColor={PersonaInitialsColor.blue}
              />
            </div>
            <div className={styles.inner}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12  ">
                  <DefaultButton
                    text="My Profile"
                    className="myProfileBtn"
                    onClick={gotoMyProfile}
                  />
                </div>
              </div>

              <hr className="dividerMyProfile" />

              <div className="accountSettings">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12">
                    <label className="myProfileFont">Account Settings</label>
                  </div>
                </div>
              </div>

              <div className="myProfileMargin">
                <div className="ms-Grid-row myProfileDivPadding">
                  <div className="ms-Grid-col ms-lg12 userProfilePadding">
                    <ActionButton iconProps={shieldIcon} text="Security" />

                    {/* <i
                      className="ms-Icon ms-Icon--Shield"
                      aria-hidden="true"></i>{" "}
                    <label className="myProfilePadding">Security</label> */}
                  </div>
                </div>

                <div
                  className="ms-Grid-row myProfileDivPadding"
                  onClick={notificationHandler}>
                  <div className="ms-Grid-col ms-lg12 userProfilePadding">
                    <ActionButton iconProps={ringerIcon} text="Notification" />

                    {/* <i
                      className="ms-Icon ms-Icon--Ringer"
                      aria-hidden="true"></i>{" "}
                    <label className="myProfilePadding">Notification</label> */}
                  </div>
                </div>

                <div className="ms-Grid-row myProfileDivPadding">
                  <div className="ms-Grid-col ms-lg12 userProfilePadding">
                    <ActionButton iconProps={languageIcon} text="Language" />

                    {/* <i
                      className="ms-Icon ms-Icon--LocaleLanguage"
                      aria-hidden="true"></i>{" "}
                    <label className="myProfilePadding">Language</label> */}
                  </div>
                </div>

                <hr className="dividerMySignOut" />

                <div
                  className="ms-Grid-row myProfileSignOutDivPadding"
                  onClick={logout}>
                  <div className="ms-Grid-col ms-lg12 userProfilePadding">
                    <ActionButton iconProps={powerButtonIcon} text="Sign out" />

                    {/* <i
                      className="ms-Icon ms-Icon--PowerButton"
                      aria-hidden="true"></i>{" "}
                    <label className="myProfilePadding">Sign out</label> */}
                  </div>
                </div>
              </div>
            </div>
          </Callout>
        )}
      </div>
    </>
  );
};

export default UserMenu;
