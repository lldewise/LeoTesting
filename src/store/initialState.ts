import { GlobalState } from '../types/store/globalstate';
import { activityInitialState } from './storeInitialStates/adminAndTeacher/activity';
import { adminClassinitialState } from './storeInitialStates/adminAndTeacher/classes';
import { adminEventInitialState } from './storeInitialStates/adminAndTeacher/events';
import { adminMailInitialState } from './storeInitialStates/adminAndTeacher/mail';
import {
  adminNewsDraftInitialState,
  adminNewsInitialState,
  adminNewsStoriesInitialState,
} from './storeInitialStates/adminAndTeacher/news';
import {
  teacherAttendanceInitialState,
  teacherEventsInitialState,
  teacherWeeklyAttendanceInitialState,
  teacherRegistrationsInitialState,
  teacherSharedInititalState,
  teacherSubjectListInitialState,
  teacherTaskInitialState,
  teacherTodoInitialState,
} from './storeInitialStates/adminAndTeacher/teachers';
import { adminTodoInitialState } from './storeInitialStates/adminAndTeacher/todo';
import { classesInitialState } from './storeInitialStates/classes';
import { dashboardInitialState } from './storeInitialStates/dashboard';
import { navigationInitialState } from './storeInitialStates/navigation';
import {
  enrolledStudentsInitialState,
  studentCasesInitialState,
} from './storeInitialStates/students';
import { teacherProfileInitialState } from './storeInitialStates/teachers';
import {
  userAccountInitialState,
  userGuardianInitialState,
  userNotificationInitialState,
  userProfileInitialState,
} from './storeInitialStates/users';

const initialState = {
  ...activityInitialState,
  ...adminClassinitialState,
  ...adminEventInitialState,
  ...adminMailInitialState,
  ...adminNewsInitialState,
  ...adminNewsDraftInitialState,
  ...adminNewsStoriesInitialState,
  ...teacherAttendanceInitialState,
  ...teacherEventsInitialState,
  ...teacherWeeklyAttendanceInitialState,
  ...teacherRegistrationsInitialState,
  ...teacherSharedInititalState,
  ...teacherSubjectListInitialState,
  ...teacherTaskInitialState,
  ...teacherTodoInitialState,
  ...adminTodoInitialState,
  ...classesInitialState,
  ...dashboardInitialState,
  ...navigationInitialState,
  ...enrolledStudentsInitialState,
  ...studentCasesInitialState,
  ...teacherProfileInitialState,
  ...userAccountInitialState,
  ...userGuardianInitialState,
  ...userNotificationInitialState,
  ...userProfileInitialState,
} as GlobalState;

export default initialState;
