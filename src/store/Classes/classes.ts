import { initStore } from '../store';
import { AteduDataLiterals } from '../../util/constant';
import { classesInitialState } from '../storeInitialStates/classes';
import { ClassesState } from '../../types/store/classes';

const initialState: ClassesState = classesInitialState;

const configureStore = () => {
  const actions = {
    ClassesSelectedTab: (curState: ClassesState, selectedTab: any) => {
      curState.classesInfo.selectedTab = selectedTab;
      const updateSelected = curState.classesInfo;
      return { classesInfo: updateSelected };
    },

    ClassesUpdateSelectedSubject: (
      curState: ClassesState,
      subjectName: any,
    ) => {
      curState.classesInfo.selectedClass = subjectName;
      const updateSelected = curState.classesInfo;
      return { classesInfo: updateSelected };
    },
    ClassesUpdateSelectedDate: (curState: ClassesState, data: any) => {
      curState.classesInfo.selectedDate = data.date;
      curState.classesInfo.selectedTime = data.time;
      curState.classesInfo.selectedLocation = data.location;
      curState.classesInfo.selectedDay = data.day;
      curState.classesInfo.selectedLate = data.late;
      curState.classesInfo.selectedLessonId = data.id;
      curState.classesInfo.week = data.week;
      curState.classesInfo.start = data.start;
      curState.classesInfo.end = data.end;
      curState.classesInfo.confirmed = data.confirmed;

      const updateSelected = curState.classesInfo;

      return { classesInfo: updateSelected };
    },

    SelectedSchedulePerDay: (curState: ClassesState, data: any) => {
      data.forEach((a: any) => {
        curState.scheduleInfo.push(a);
      });
      const updatedData = curState.scheduleInfo;
      return { scheduleInfo: updatedData };
    },

    LESSONDETAILS: (curState: ClassesState, data: any) => {
      curState.classesInfo.selectedLesson.lessonId = 0;
      // curState.classesInfo.confirmed = !curState.classesInfo.confirmed ;
      curState.classesInfo.selectedLesson.isConfirmed = false;
      if (data.length > 0) {
        // let lessonData = data[0][1][1];

        data.forEach((elem: any) => {
          const a = elem[1][1];
          if (a) {
            const isConfirmed = a[AteduDataLiterals.ATTENDANCE_CONFIRMED];

            // let confirmation = isConfirmed !== undefined ? !isConfirmed : true;

            let id = a.id !== undefined ? a.id : a['crux.db/id'];
            id = id.split('/')[1].toString();
            curState.classesInfo.selectedLesson.lessonId = id;
            curState.classesInfo.selectedLesson.isConfirmed = isConfirmed;
            // curState.classesInfo.confirmed =
            curState.classesInfo.confirmed =
              isConfirmed === true ? false : true;
          }
        });
        const updateSelected = curState.classesInfo;
        return {
          classesInfo: updateSelected,
        };
      }
    },
  };

  initStore(actions, initialState);
};

export default configureStore;
