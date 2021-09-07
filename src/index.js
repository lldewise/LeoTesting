import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthenticationProvider } from './util/context/authentication';
import configureUserProfileStore from './store/User/userProfile';
import configureTeacherProfileStore from './store/TeacherProfile/teacherProfile';
import configureDashboardStore from './store/Dashboard/dashboard';
import configureClassesStore from './store/Classes/classes';

//News
import configureAdminNews from './store/AdminAndTeacherStore/News/news';
import configureAdminNewsStories from './store/AdminAndTeacherStore/News/newsStories';
import configureAdminNewsDraft from './store/AdminAndTeacherStore/News/newsDrafts';
//Admin
import configureAdminTodo from './store/AdminAndTeacherStore/Todo/todo';
import configureAdminEvents from './store/AdminAndTeacherStore/Events/events';
import configureAdminClasses from './store/AdminAndTeacherStore/Classes/adminClasses';
//Teacher
import configureTeacherTodos from './store/AdminAndTeacherStore/Teacher/teacherTodo';
import configureTeacherEvents from './store/AdminAndTeacherStore/Teacher/teacherEvents';
import configureTeacherTask from './store/AdminAndTeacherStore/Teacher/teacherTask';
import configureTeacherShared from './store/AdminAndTeacherStore/Teacher/teacherShared';
import configureTeacherAttendance from './store/AdminAndTeacherStore/Teacher/teacherAttendance';
import configureTeacherRegitration from './store/AdminAndTeacherStore/Teacher/teacherRegistrations';
import configureTeacherSubjects from './store/AdminAndTeacherStore/Teacher/teacherSubjectList';
import configureUserSettingNotification from './store/User/userNotification';
import configureTeacherLessonsByStaffAndStudent from './store/AdminAndTeacherStore/Teacher/teacherWeeklyAttendance';
import configureAdminActivity from './store/AdminAndTeacherStore/Activity/Activity';
//User Account (students, staffs or guardians)
import configureUserAccounts from './store/User/userAccounts';
import configureUserGuardian from './store/User/userGuardian';
//Enrolled
import configureEnrolledStudent from './store/Students/enrolledStudent';
import configureStudentCases from './store/Students/studentCases';
//Email
import configureEmailItems from './store/AdminAndTeacherStore/Mailbox/mailbox';
//Resources
import configureResources from './store/AdminAndTeacherStore/Resources/Resources';
//Navigation
import configureNavigation from './store/Navigation/navigation';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

// MSAL imports
import { oMSAL } from './util/msgraph/authHandler';

configureUserProfileStore();
configureDashboardStore();
configureTeacherProfileStore();
configureClassesStore();
initializeIcons();

configureAdminNews();
configureAdminNewsStories();
configureAdminNewsDraft();
configureAdminEvents();
configureAdminTodo();
configureAdminClasses();

configureUserAccounts();
configureTeacherEvents();
configureTeacherTodos();
configureTeacherShared();
configureTeacherTask();
configureTeacherAttendance();
configureTeacherRegitration();
configureTeacherSubjects();
configureUserSettingNotification();
configureTeacherLessonsByStaffAndStudent();
configureAdminActivity();
configureUserGuardian();
configureEnrolledStudent();
configureStudentCases();
configureNavigation();
configureEmailItems();
configureResources();
initializeFileTypeIcons(undefined);

ReactDOM.render(
  <AuthenticationProvider>
    <App pca={oMSAL} />
  </AuthenticationProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
