import { IUser } from '../../../model/user';
import { SharedItem } from '../item';
import { UserProfile } from '../users';

export type TeacherAttendanceState = {
  teacherAttendanceStudents: any[];
  classStudentList: any[];
  attendanceList: any[];
};

export type TeacherEventsState = {
  teacherEventsList: any[];
};

export type TeacherWeeklyAttendanceState = {
  teacherLessonsByStaffIDPerWeek: any[];
  teacherLessonsByStaffPerWeek: any[];
  teacherLessonsByStaffPerWeekPerId: any;
  teacherLessonsByStaffPerWeekUniqueId: any;
  teacherStudentsListByClass: any[];
  teacherAttendanceByLesson: any[];
  teacherAttendanceByEvent: any[];
  selectedLessonsByStaff: Lesson;
  studentByClass: IUser[];
  studentByClassChanged: any;
};

export type TeacherItem = {
  date: string | Date;
  description: string;
  icon: string;
  icon1: string;
  id: number;
  title: string;
  type: string;
};

export type TeacherRegistrationsState = {
  teacherRegistrations: TeacherItem[];
};

export type TeacherSharedState = {
  teacherSharedDocuments: SharedItem[];
};

export type Lesson = {
  class: string | null;
  end: string | null;
  id: number | null;
  start: string | null;
  week: string | null;
};

export type Subject = {
  description: string | null;
  end: string | null;
  id: string | null;
  location: string | null;
  start: string | null;
  title: string | null;
};

export type TeacherSubjectListState = {
  teacherSubjectList: Subject[];
  selectedSubject: Subject;
};

export type TeacherTaskState = {
  teacherTaskDocuments: TeacherItem[];
};

export type TeacherTodoState = {
  teacherTodoList: any[];
};
