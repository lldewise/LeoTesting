import { ClassAssignment, SharedItem } from './item';
import { ClassInfo } from './classes';
import { SubjectDue } from './dashboard';
import { UserNotification } from './notifications';
import { Case, StudentAccountById, StudentInfo } from './students';
import { TeacherProfile } from './teachers';
import {
  StaffAccount,
  StaffEmployment,
  UserAccount,
  UserAccountType,
  UserGenData,
  UserPreference,
  UserProfile,
} from './users';
import { Events } from './adminAndTeacher/events';
import { Lesson, Subject, TeacherItem } from './adminAndTeacher/teachers';
import { SelectedClass } from './adminAndTeacher/classes';
import { INews } from '../../model/news';
import { IResources } from '../../model/resouces';
import { IUser } from '../../model/user';

export type GlobalState = {
  attendanceList: any[];
  classStudentList: any[];
  emailSearchList: any[];
  manageNewsStories: any;
  activityItemSelected: any;
  activityAttendance: any[];
  activityList: any[];
  activityListChanged: any;
  adminActivityDoubleList: any[];
  activityAttendanceChanged: any;
  adminClassesLists: any[];
  adminFeaturedNews: any[];
  adminNewsDrafts: any[];
  adminNewsStories: INews[];
  adminRegularNews: any[];
  adminResourcesList: any[];
  adminRoomsList: any[];
  adminSelectedClasses: SelectedClass;
  adminSubjectLists: any[];
  adminTodoList: any[];
  assignmentlist: ClassAssignment[];
  authenticationData: any;
  casesList: Case[];
  classesInfo: ClassInfo;
  classesList: any[];
  classesassignmentlist: ClassAssignment[];
  classeshomeworklist: ClassAssignment[];
  classesBySchoolChanged: any;
  classesBySchool: any[];
  documentslist: ClassAssignment[];
  dueSoon: SubjectDue[];
  enrolledStudentList: any[];
  enrolledStudentSelected: any;
  eventsList: Events[];
  guardianAccountList: any[];
  guardianBySchool: any[];
  guardianBySchoolChanged: string;
  homeworklist: ClassAssignment[];
  m365Login: boolean;
  mediaList: Media[];
  navigationActive: number | string;
  scheduleInfo: any[];
  schoolYear: any[];
  selectedLessonsByStaff: Lesson;
  selectedSubject: Subject;
  selectedUserAccount: UserAccount;
  selectedUserGuardians: any[];
  selectedUserProfile: UserProfile;
  sidebarSelectedKey: any;
  staffAccountByIds: any[];
  staffAccountList: StaffAccount[];
  staffAccountListChanged: string;
  staffEmploymentData: StaffEmployment[];
  studentAccountByIds: StudentAccountById[];
  studentAccountByIdChanged: string;
  studentAccountList: any[];
  studentAccountListChanged: string;
  studentInfo: StudentInfo;
  studentsList: any[];
  teacherAttendanceByLesson: any[];
  teacherAttendanceByEvent: any[];
  teacherAttendanceStudents: any[];
  teacherEventsList: any[];
  teacherLessonsByStaffIDPerWeek: any[];
  teacherLessonsByStaffPerWeek: any[];
  teacherLessonsByStaffPerWeekPerId: any;
  teacherLessonsByStaffPerWeekUniqueId: any;
  teacherProfile: TeacherProfile;
  teacherRegistrations: TeacherItem[];
  teacherSharedDocuments: SharedItem[];
  teacherStudentsListByClass: any[];
  teacherSubjectList: Subject[];
  teacherTaskDocuments: TeacherItem[];
  teacherTodoList: any[];
  teachersList: any[];
  userAccountType: UserAccountType;
  userData: UserGenData;
  userExternalId: string;
  userExternalUnique: string;
  userPreferences: UserPreference;
  userProfile: UserProfile;
  userSettingNotification: UserNotification;
  resourcesBySchool: IResources[];
  roomsBySchool: IResources[];
  resourcesBySchoolChanged: any;

  studentByClass: IUser[];
  studentByClassChanged: any;
};
