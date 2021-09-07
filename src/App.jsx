// import React, { Suspense, useState, useEffect } from 'react';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { ProgressIndicator, styled } from '@fluentui/react';
import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './util/route';
import routeConfig from './routeConfig';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.scss';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import ateduSSO from './atedusso/services';
import AuthProvider from './atedusso/authProvider';
import { MsalProvider } from '@azure/msal-react';
import { CustomNavigationClient } from './util/NavigationClient';
import { getMSALAccessTokenForDownstreamApi } from './util/msgraph/authHandler';
import logger from 'loglevel';
import { useStore } from './store/store';
import { Base_URL } from './environment';
import { useAuthentication } from './util/context/authentication';
import ErrorMessage from './components/userInterface/ErrorMessage/ErrorMessage';
import { newsData, newsDelete } from './eventsource/news';
import {
  userSettingNotification,
  updateUser,
  guardianBySchool,
} from './eventsource/user';
import {
  updateLessonsByStaffPerWeek,
  updateStudentsByClass,
  updateAttendanceByLesson,
  setSelectedUserGuardians,
  updateLessonDetails,
  deleteTeacherAttendanceWeekly,
  updateStudentBySchoolIds,
  updateStudentBySchoolDetails,
  updateStaffBySchool,
  updateAttendanceList,
} from './eventsource/lesson';
import { updateCalendarLessonList } from './eventsource/calendar';
import { useAxiosLoader } from './services/apiGet';
import { useAxiosLoaderApiPost } from './services/apiPost';
import { useAxiosLoaderApiTeacher } from './services/apiTeacher';
import { useAxiosLoaderApiUser } from './services/apiUser';
import { useAxiosLoaderApi } from './services/api';
import { useAxiosLoaderApiIdentity } from './services/apiIdentity';
import { useAxiosLoaderApiNoBase } from './services/apiNoBase';
import { useAxiosLoaderApiAdmin } from './services/apiAdmin';
import apiSubscription, {
  useAxiosLoaderApiSubscription,
} from './services/apiSubscription';
import { Offline, Online } from 'react-detect-offline';
import noInternetConnection from './assets/images/no_internet_connection.jpg';
import { v4 as uuidv4 } from 'uuid';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import {
  activitiesBySchool,
  activityAttendance,
} from './eventsource/activities';
import { resourcesBySchool } from './eventsource/resources';
import {
  classesByschool,
  subjectListBySchool,
  classesListBySubject,
} from './eventsource/classes';
import * as log from 'loglevel';
loadTheme({
  palette: {
    themePrimary: '#6c35d4',
    themeLighterAlt: '#f8f6fd',
    themeLighter: '#e5daf8',
    themeLight: '#cfbcf2',
    themeTertiary: '#a27ee5',
    themeSecondary: '#7c4ad9',
    themeDarkAlt: '#6230be',
    themeDark: '#5228a1',
    themeDarker: '#3d1e77',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#323130',
    white: '#ffffff',
    orange: '#DF9836',
    orangeLight: '#F7A93B',
    orangeLighter: '#f8b451',
  },
});

function App({ pca }) {
  const loading = useAxiosLoader();
  const apiPostError = useAxiosLoaderApiPost();
  const apiTeacherError = useAxiosLoaderApiTeacher();
  const apiUserError = useAxiosLoaderApiUser();
  const apiError = useAxiosLoaderApi();
  const apiIdentityError = useAxiosLoaderApiIdentity();
  const apiNoBaseError = useAxiosLoaderApiNoBase();
  const apiAdminError = useAxiosLoaderApiAdmin();
  // eslint-disable-next-line
  const { logout, principal } = useAuthentication();
  const [dataStore, dispatch] = useStore();

  // const [showModal, { toggle: setToggleErrorModal }] = useBoolean(false);
  const [toggleErrorModal, setToggleErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line
  const [errorMessageNo, setErrorMessageNo] = useState('');

  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  useEffect(() => {
    if (dataStore.userExternalId != null) {
      logger.setDefaultLevel(
        process.env.NODE_ENV === 'production'
          ? logger.levels.ERROR
          : logger.levels.INFO,
      );

      let qEventSource = NativeEventSource || EventSourcePolyfill;
      let qReconnectFrequencySeconds = 1;

      const qWait = function () {
        return qReconnectFrequencySeconds * 1000;
      };
      const qTryToSetup = function () {
        initMainSSE();
        qReconnectFrequencySeconds *= 2;

        if (qReconnectFrequencySeconds >= 64) {
          qReconnectFrequencySeconds = 64;
        }
      };
      const qReconnect = function () {
        setTimeout(qTryToSetup, qWait());
      };
      const initMainSSE = () => {
        logger.debug('Main SSE: [ Connecting ]');
        qEventSource = new EventSourcePolyfill(
          Base_URL.eventsource +
            '/api/eventSource/' +
            dataStore.userExternalUnique,
          {
            headers: {
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${principal.accessToken}`,
            },
          },
        );
        qEventSource.onmessage = e => {
          logger.log(e);
          let split = '';
          const data = JSON.parse(e.data);
          if (data != null) {
            if (data.length > 0) {
              if (data[0][0].includes('data')) {
                split = data[0][1][0].split('/');
                switch (split[0]) {
                  case 'news':
                    newsData(dispatch, data);
                    break;
                  case 'user-settings':
                    userSettingNotification(dispatch, data);
                    break;
                  case 'user':
                    // updateUserProfile(dispatch, data);
                    updateStudentBySchoolDetails(dispatch, data);
                    break;
                  case 'lesson':
                    updateLessonsByStaffPerWeek(dispatch, data);
                    updateCalendarLessonList(dispatch, data);
                    updateLessonDetails(dispatch, data);
                    break;
                  case 'attendance':
                    updateAttendanceList(dispatch, data);
                    break;
                  default:
                    break;
                }
              }
              if (data[0][0].includes('delete')) {
                deleteTeacherAttendanceWeekly(dispatch, data);
              } else {
                split = data[0][0];
                switch (split) {
                  case 'user/by-external-id':
                    updateUser(dispatch, data, dataStore, logger, logout);
                    break;
                  case 'lessons/by-staff':
                    updateLessonsByStaffPerWeek(dispatch, data);
                    updateCalendarLessonList(dispatch, data);
                    break;
                  case 'students/by-class':
                    updateStudentsByClass(dispatch, data);
                    break;
                  case 'user-settings/by-user':
                    userSettingNotification(dispatch, data);
                    break;
                  case 'attendance/by-lesson':
                    updateAttendanceByLesson(dispatch, data);
                    break;
                  case 'news/by-school-attribute':
                    newsData(dispatch, data);
                    break;
                  case 'guardians/by-user':
                    setSelectedUserGuardians(dispatch, data);
                    break;
                  case 'students/by-school':
                    updateStudentBySchoolIds(dispatch, data);
                    break;
                  case 'guardians/by-school':
                    guardianBySchool(dispatch, data);
                    break;
                  case 'staff/by-school-attribute':
                    updateStaffBySchool(dispatch, data);
                    break;
                  case 'activities/by-school-attribute':
                    activitiesBySchool(dispatch, data);
                    break;
                  case 'attendances/by-event-attribute':
                    if (
                      data[0][1][0].split('/')[0].toLowerCase() === 'activity'
                    ) {
                      activityAttendance(dispatch, data);
                    } else {
                      updateAttendanceByLesson(dispatch, data);
                    }
                    break;
                  case 'resources/by-school-attribute':
                    resourcesBySchool(dispatch, data);
                    break;
                  case 'classes/by-school-attribute':
                    classesByschool(dispatch, data);
                    break;
                  case 'subjects/by-for-school-attribute':
                    subjectListBySchool(dispatch, data);
                    break;
                  case 'classes/by-subject-attribute':
                    classesListBySubject(dispatch, data);
                    break;
                  default:
                    break;
                  // code block
                }
              }
              // if()
              // for(var i=0; i<data.length;i++) {
              //   var split2 = "";
              //   split2 = data[i][0];
              //   switch (split2) {
              //     case AteduDataLiterals.ATTENDANCE_BY_LESSON:
              //       attendanceByLesson(data[i][1]);
              //       break;
              //     case AteduDataLiterals.STUDENT_BY_CLASS:
              //       studentsByClass(data[i][1]);
              //     break;
              //     default:
              //   }
              // }
              let split2 = '';
              split2 = data[0][0];

              switch (split2) {
                case 'attendance/by-lesson':
                  attendanceByLesson(data);
                  updateAttendanceByLesson(dispatch, data);
                  break;
                case 'students/by-class':
                  studentsByClass(data);
                  break;
                default:
              }

              if (data[0][0].includes('delete')) {
                split = data[0][1].split('/');
                switch (split[0]) {
                  case 'news':
                    newsDelete(dispatch, data);
                    break;
                  case 'student':
                    // updateUser(data);
                    break;
                  default:
                    break;
                }
              }
            }
          }
        };
        qEventSource.onopen = event => {
          logger.debug('Main SSE: [ Connected ]');
        };
        qEventSource.onerror = event => {
          logger.error(
            `Main SSE Connection State: ${
              qEventSource.readyState
            }, error occurred: ${JSON.stringify(event)}`,
          );

          if (event.target.readyState === EventSource.CLOSED) {
            logger.debug(
              `Main SSE: [ Disconnected ] (event readyState = ${event.target.readyState})`,
            );
          } else if (event.target.readyState === EventSource.CONNECTING) {
            logger.debug(
              `Main SSE: [ Attempting to reconnect... ] (event readyState = ${event.target.readyState})`,
            );
          }

          qEventSource.close();
          logger.debug('Main SSE: [ Reconnecting ]');
          qReconnect();
        };
        return () => {
          qEventSource.close();
          logger.debug('Main SSE: [ Disconnected ]');
        };
      };
      initMainSSE();
    }
  }, [dataStore.userExternalId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dataStore.m365Login) {
      let nEventSource = NativeEventSource || EventSourcePolyfill;
      let nReconnectFrequencySeconds = 1;

      const nWait = function () {
        return nReconnectFrequencySeconds * 1000;
      };
      const nTryToSetup = function () {
        initNotificationsSSE();
        nReconnectFrequencySeconds *= 2;

        if (nReconnectFrequencySeconds >= 64) {
          nReconnectFrequencySeconds = 64;
        }
      };
      const nReconnect = function () {
        setTimeout(nTryToSetup, nWait());
      };
      const initNotificationsSSE = async () => {
        logger.debug('Notification SSE: [ Connecting ]');
        const access_token = await getMSALAccessTokenForDownstreamApi();

        nEventSource = new EventSourcePolyfill(
          Base_URL.notificationSource + '/api/notifications/GetNotifications',
          {
            headers: {
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        nEventSource.onmessage = e => {
          logger.debug(e);
        };
        nEventSource.onopen = async event => {
          logger.debug('Notification SSE: [ Connected ]');
          const createSubscriptionResponse = await apiSubscription
            .post(
              '/api/subscriptions/CreateSubscriptionToAUserMailbox',
              {
                ChangeType: 'created',
                ResourceType: 'message',
                Id: '',
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'X-Correlation-Id': uuidv4(),
                  Authorization: `Bearer ${access_token}`,
                },
              },
            )
            .then(async function (response) {
              logger.log(response);
              return response;
            })
            .catch(async function (error) {
              return null;
            });
        };
        nEventSource.onerror = event => {
          logger.error(
            `Notification SSE Connection State: ${
              nEventSource.readyState
            }, error occurred: ${JSON.stringify(event)}`,
          );

          if (event.target.readyState === EventSource.CLOSED) {
            logger.debug(
              `Notification SSE: [ Disconnected ] (event readyState = ${event.target.readyState})`,
            );
          } else if (event.target.readyState === EventSource.CONNECTING) {
            logger.debug(
              `Notification SSE: [ Attempting to reconnect... ] (event readyState = ${event.target.readyState})`,
            );
          }

          nEventSource.close();
          logger.debug('Notification SSE: [ Reconnecting ]');
          nReconnect();
        };
        return () => {
          nEventSource.close();
          logger.debug('Notification SSE: [ Disconnected ]');
        };
      };

      initNotificationsSSE();
    }
  }, [dataStore.m365Login]);

  useEffect(() => {
    if (loading[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(loading[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiPostError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiPostError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiTeacherError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiTeacherError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiUserError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiUserError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiIdentityError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiIdentityError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiNoBaseError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiNoBaseError[1]);
      setErrorMessageNo(apiPostError[0]);
    }

    if (apiAdminError[0] !== 0) {
      setToggleErrorModal(true);
      setErrorMessage(apiAdminError[1]);
      setErrorMessageNo(apiAdminError[0]);
    }
  }, [
    loading[0],
    apiPostError[0],
    apiTeacherError[0],
    apiUserError[0],
    apiError[0],
    apiIdentityError[0],
    apiNoBaseError[0],
    apiAdminError[0],
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(()=>{
  //   if(dataStore.userProfile.id!=null){
  //     apiGet
  //     .get(
  //       "/api/school/" +
  //       encodeURIComponent(dataStore.userProfile.school) +
  //       "/userSettingNotification/" + dataStore.userProfile.id + "?clientId=" +
  //       dataStore.userExternalUnique
  //     )
  //   }
  //  },[dataStore.userProfile.id])

  // const entityData = (data) => {
  //   var split = data[0][1][0].split("/");

  //   switch (split[0]) {
  //     case "news":
  //       // newsData(data);
  //       break;
  //     case "student":
  //       // updateUser(data);
  //       break;
  //     default:
  //   }
  // }

  const studentsByClass = value => {
    var filterData = value.filter(a => a[0] === 'entity/data');
    dispatch('CLASSSTUDENTLIST', filterData);
  };
  const attendanceByLesson = value => {
    // data[0][1]
    // let latestData = value.length - 1;
    //let latestData = 0//value.length - 1;

    var filterData = value.filter(a => a[0] === 'entity/data');
    dispatch('ATTENDANCELIST', filterData);
    // dispatch("ATTENDANCELIST", value[0][1]);
    // dispatch("ATTENDANCELIST", value[latestData][1]);
  };

  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = '#fffff';
    document.body.style.color = '#323130';
  }, []);

  /* jay   const updatedRoute = routeConfig;
    updatedRoute['path'] = "/" + i18n.language + "/";
    updatedRoute.children.map(item => {
      return item.path = "/" + i18n.language + item.path;
    });
     */

  const polling = {
    url: 'https://ipv4.icanhazip.com/',
  };

  return (
    <div>
      <ErrorMessage
        openModal={toggleErrorModal}
        errorMessage={errorMessage}
        apiPostError={apiPostError}
      />
      <AuthProvider atedusso={ateduSSO}>
        <MsalProvider instance={pca}>
          <Router>
            <AutoSwitchLayout>
              <Online polling={polling}>
                <Suspense
                  fallback={<ProgressIndicator label="Page loading..." />}>
                  <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{ overflow: 'hidden' }}>
                    {renderRoutes(routeConfig)}
                  </div>
                </Suspense>
                <img
                  src={noInternetConnection}
                  alt={noInternetConnection}
                  className="loadErrorMessage"
                />
              </Online>
              <Offline polling={polling}>
                <div className="errorMessage">
                  <img src={noInternetConnection} alt={noInternetConnection} />
                </div>
              </Offline>
            </AutoSwitchLayout>
          </Router>
        </MsalProvider>
      </AuthProvider>
    </div>
  );
}

logger.log(process.env.NODE_ENV);
// Live reload != hot reload! CRA doesn't do hot reload, so we install it here.
//let HotApp = process.env.NODE_ENV === 'production' ? App : hot(module)(App);

export default styled(App);
