import { CheckExist, LessonIsConfirmed } from '../../../util/compareData';
import { AteduDataLiterals } from '../../../util/constant';
import { beautifyName } from '../../../util/commonFunction';
import { initStore } from '../../store';
import { teacherWeeklyAttendanceInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';
import { TeacherWeeklyAttendanceState } from '../../../types/store/adminAndTeacher/teachers';
import { IUser } from '../../../model/user';

const initialState: TeacherWeeklyAttendanceState =
  teacherWeeklyAttendanceInitialState;

const configureStore = () => {
  const actions = {
    TEACHERSTUDENTSBYCLASS: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      
      const updateData = [];
      if (data.length > 0) {
        const items = data[0][1][1];
        const addData = {
          id: items.id,
          homeClass: items[AteduDataLiterals.ID_HOME_CLASS],
          idUser: beautifyName(items[AteduDataLiterals.ID_USER]),
          studentClasses: items[AteduDataLiterals.STUDENT_CLASSES][0],
        };
        updateData.push(addData);
        return { teacherStudentsListByClass: updateData };
      } else {
        return { teacherStudentsListByClass: [] };
      }
    },
    TEACHERLESSONSBYSTAFFPERWEEK: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      if (data.length > 0) {
        const updateData = curState.teacherLessonsByStaffPerWeek;
        const item = Math.random().toString(10).substring(7);
        data.forEach((elem: any) => {
          const a = elem[1][1];
          if (a) {
            const isConfirmed = a[AteduDataLiterals.ATTENDANCE_CONFIRMED];
            const id = a.id !== undefined ? a.id : a['crux.db/id'];
            if (!LessonIsConfirmed(id, updateData)) {
              const addData = {
                id: id,
                unigueId: item,
                class: a[AteduDataLiterals.ID_CLASS],
                start: a[AteduDataLiterals.LESSON_DATA]?.start,
                end: a[AteduDataLiterals.LESSON_DATA]?.end,
                week: a[AteduDataLiterals.LESSON_WEEK],
                confirmed: isConfirmed !== undefined ? isConfirmed : false,
                isPresent: true,
              };
              const index = CheckExist(id, updateData);
              if (index <= -1 && id !== undefined) {
                updateData.push(addData);
              } else if (id !== undefined) {
                updateData[index] = addData;
              }
            }
          }
        });
        return {
          teacherLessonsByStaffPerWeek: updateData,
          teacherLessonsByStaffPerWeekUniqueId: item,
        };
      }
    },
    SETSELECTEDLESSONBYSTAFF: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      curState.selectedLessonsByStaff.id = data.id;
      curState.selectedLessonsByStaff.class = data.class;
      curState.selectedLessonsByStaff.start = data.start;
      curState.selectedLessonsByStaff.end = data.end;
      curState.selectedLessonsByStaff.week = data.week;

      const updateSelected = curState.selectedLessonsByStaff;
      return { selectedLessonsByStaff: updateSelected };
    },
    TEACHERATTENDANCEBYLESSON: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      const updateData = curState.teacherAttendanceByLesson;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i][1][1];
          if (item) {
            const id = item.id !== undefined ? item.id : item['crux.db/id'];
            const addData = {
              id: id,
              idAuthor: item[AteduDataLiterals.ATTENDANCE_DATA]['id/staff'],
              idLesson: item[AteduDataLiterals.ID_EVENT],
              idStudent: item[AteduDataLiterals.ID_STUDENT],
              absentType: item[AteduDataLiterals.ABSENT_TYPE],
              percentage: item[AteduDataLiterals.ATTENDANCE_DATA].percentage,
              remarks: item[AteduDataLiterals.ATTENDANCE_DATA].remarks,
            };
            const index = CheckExist(item.id, updateData);
            if (index <= -1) {
              updateData.push(addData);
            } else {
              updateData[index] = addData;
            }
          }
        }
      }
      return { teacherAttendanceByLesson: updateData };
    },

    DELETETEACHERATTENDANCEBYLESSON: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      const updateData = curState.teacherAttendanceByLesson;
      if (data) {
        const id = data[0][1];
        const idx = CheckExist(id, updateData);
        if (idx !== -1) {
          updateData.splice(idx, 1);
        }
      }
      return { teacherAttendanceByLesson: updateData };
    },
    TEACHERLESSONBYSTAFFIDS: (
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) => {
      const item = Math.random().toString(10).substring(7);
      const updateData: any[] = []; //curState.teacherLessonsByStaffIDPerWeek;
      const items = data[1][1];
      if (items.length > 0) {
        items.forEach((a: any) => {
          const addData = {
            id: a,
          };
          const index = CheckExist(a, updateData);
          if (index <= -1) {
            updateData.push(addData);
          } else {
            updateData[index] = addData;
          }
        });
      }
      return {
        teacherLessonsByStaffIDPerWeek: updateData,
        teacherLessonsByStaffPerWeekPerId: item,
      };
    },
    SETSTUDENTBYCLASS: (curState: TeacherWeeklyAttendanceState, data: any) => {
      const updateData: IUser[] = [];
      
      if (data.length > 0) {
        const userList: any[] = data.filter((a: any) =>
          a[1][0].includes('user'),
        );
        const studentList: any[] = data.filter((a: any) =>
          a[1][0].includes('student'),
        );

        userList.forEach((element: any) => {
          const student: any = studentList.find(
            (a: any) => a[1][1]['id/user'] === element[1][0],
          );

          const item: any = element[1][1];
          const userId: any = element[1][0].split('/')[1];

          if (student !== undefined) {
            const studentItem = student[1][1];
            const addData: IUser = {
              id: item.id,
              studentId: studentItem.id,
              img: '',
              name:
                item[AteduDataLiterals.USER_FIRST_NAME] +
                ' ' +
                item[AteduDataLiterals.USER_LAST_NAME],
              firstName: item[AteduDataLiterals.USER_FIRST_NAME],
              lastName: item[AteduDataLiterals.USER_LAST_NAME],
              email: item[AteduDataLiterals.USER_EMAIL],
              data: item[AteduDataLiterals.USER_DATA],
            };
            updateData.push(addData);
          }
        });
      }

      return {
        studentByClass: updateData,
        studentByClassChanged: Math.random(),
      };
    },
    SETSTUDENTBYCLASSCHANGED(
      curState: TeacherWeeklyAttendanceState,
      data: any,
    ) {
      return {
        studentByClassChanged: null,
      };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
