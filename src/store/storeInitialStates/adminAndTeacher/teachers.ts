import moment from 'moment';
import {
  TeacherAttendanceState,
  TeacherEventsState,
  TeacherWeeklyAttendanceState,
  TeacherRegistrationsState,
  TeacherSharedState,
  TeacherSubjectListState,
  TeacherTaskState,
  TeacherTodoState,
} from '../../../types/store/adminAndTeacher/teachers';

export const teacherAttendanceInitialState: TeacherAttendanceState = {
  teacherAttendanceStudents: [
    // {
    //   id: 1,
    //   present: "True",
    //   students: 'Clarrise Washington',
    //   absencePercentage: 0,
    //   absenceType: "Approved",
    //   Remarks: "",
    //   lastModifiedBy: "Clarrise Washington",
    //   isHidden: true
    // },
  ],
  classStudentList: [],
  attendanceList: [],
};

export const teacherEventsInitialState: TeacherEventsState = {
  teacherEventsList: [],
};

export const teacherWeeklyAttendanceInitialState: TeacherWeeklyAttendanceState =
  {
    teacherLessonsByStaffPerWeekUniqueId: null,
    teacherLessonsByStaffPerWeekPerId: null,
    teacherLessonsByStaffPerWeek: [],
    teacherLessonsByStaffIDPerWeek: [],
    teacherStudentsListByClass: [],
    teacherAttendanceByLesson: [],
    teacherAttendanceByEvent: [],
    selectedLessonsByStaff: {
      id: null,
      class: null,
      start: null,
      end: null,
      week: null,
    },
    studentByClass: [],
    studentByClassChanged: null,
  };

export const teacherRegistrationsInitialState: TeacherRegistrationsState = {
  teacherRegistrations: [
    {
      id: 1,
      title: 'En 27/03 1. modul',
      type: 'Absence',
      description: '1p En',
      icon: 'ClipboardList',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 2,
      title: 'En 28/03 2. modul',
      type: 'Attendance',
      description: '1p En',
      icon: 'ClipboardList',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 4,
      title: 'EN 29/03 1. modul',
      type: 'Attendance',
      description: '1p En',
      icon: 'ClipboardList',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 5,
      title: 'EN 30/03 2. modul',
      type: 'Attendance',
      description: '1y En',
      icon: 'ClipboardList',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 6,
      title: 'EN 31/03 2. modul',
      type: 'Attendance',
      description: '1y En',
      icon: 'ClipboardList',
      icon1: 'People',
      date: new Date().toString(),
    },
  ],
};

export const teacherSharedInititalState: TeacherSharedState = {
  teacherSharedDocuments: [
    {
      id: 1,
      name: 'Arrangement bestsellingshliste',
      item: 'Ministry of Education',
      status: 'Shared',
      isScrolling: true,
      icon: 'xlsx',
      selected: false,
      createdby: 'Mona Kane',
      createddate: new Date().toString(),
      lastupdated: new Date().toString(),
    },
    {
      id: 2,
      name: 'Andre aktiviteter',
      item: 'NGG',
      status: 'Shared',
      isScrolling: true,
      icon: 'docx',
      selected: false,
      createdby: 'Mona Kane',
      createddate: new Date().toString(),
      lastupdated: new Date().toString(),
    },
    {
      id: 3,
      name: 'Module',
      item: 'Math',
      status: 'Shared',
      isScrolling: true,
      icon: 'pptx',
      selected: false,
      createdby: 'Mona Kane',
      lastupdated: new Date().toString(),
      createddate: new Date().toString(),
    },
  ],
};

let eventGuid = 0;
const todayStr = moment().format('YYYY-MM-DD');
function createEventId() {
  return String(eventGuid++);
}

export const teacherSubjectListInitialState: TeacherSubjectListState = {
  teacherSubjectList: [
    {
      id: createEventId(),
      title: '1p En',
      description: 'English',
      start: todayStr + 'T09:00:00',
      end: todayStr + 'T09:45:00',
      location: 'R. M44',
    },
    {
      id: createEventId(),
      title: '1y En',
      description: 'English',
      start: todayStr + 'T10:00:00',
      end: todayStr + 'T10:45:00',
      location: 'R. M01',
    },
  ],
  selectedSubject: {
    id: null,
    title: null,
    description: null,
    start: null,
    end: null,
    location: null,
  },
};
export const teacherTaskInitialState: TeacherTaskState = {
  teacherTaskDocuments: [
    {
      id: 1,
      title: 'ti 1/12 7. modul',
      type: 'Attendance',
      description: '1p En',
      icon: 'PenWorkspace',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 1,
      title: 'ti 1/12 7. modul',
      type: 'Attendance',
      description: '1p En',
      icon: 'PenWorkspace',
      icon1: 'People',
      date: new Date().toString(),
    },
    {
      id: 1,
      title: 'ti 1/12 7. modul',
      type: 'Attendance',
      description: '1p En',
      icon: 'PenWorkspace',
      icon1: 'People',
      date: new Date().toString(),
    },
  ],
};

export const teacherTodoInitialState: TeacherTodoState = {
  teacherTodoList: [
    // {
    //   id: createEventId(),
    //   title: 'Go to gym',
    //   description: '',
    //   start: todayStr + 'T16:00:00',
    //   end: todayStr + 'T17:00:00',
    //   isCompleted: false,
    //   isFavorite: false,
    //   groupId: "personalTask"
    // },
  ],
};
