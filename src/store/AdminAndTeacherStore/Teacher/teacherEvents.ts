import { initStore } from '../../store';
import moment from 'moment';
import { AteduDataLiterals } from '../../../util/constant';
import { CheckExist } from '../../../util/compareData';
import { teacherEventsInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';
import { TeacherEventsState } from '../../../types/store/adminAndTeacher/teachers';

const initialState: TeacherEventsState = teacherEventsInitialState;

const configureStore = () => {
  const actions = {
    TEACHERCREATEEVENT: (curState: TeacherEventsState, data: any) => {
      const updateData = curState.teacherEventsList;
      const date = moment(data.date).format('YYYY-MM-DD');
      const sTime = moment(data.eventStartTime, 'h:mm:ss A').format('HH:mm:ss');
      const eTime = moment(data.eventEndTime, 'h:mm:ss A').format('HH:mm:ss');
      const addData = {
        id: 1,
        title: data.title,
        start: date + 'T' + sTime,
        end: date + 'T' + eTime,
        location: data.locations.name,
        groupId: data.category.groupId,
        repeat: data.repeat,
        hasAbsenceRegistration: data.hasAbsenceRegistration,
        hasFile: data.hasFile,
        people: data.peoplesInvited?.name,
        remindedTime: data.remindme,
      };
      updateData.push(addData);
      return { teacherEventsList: updateData };
    },
    TEACHEREVENTADDCALENDAR: (curState: TeacherEventsState, data: any) => {
      if (data.length > 0) {
        const updateData = curState.teacherEventsList;
        data.forEach((elem: any) => {
          const a = elem[1][1];
          if (a) {
            const isConfirmed = a[AteduDataLiterals.ATTENDANCE_CONFIRMED];
            let id = a.id !== undefined ? a.id : a['crux.db/id'];
            id = id.split('/')[1].toString();
            const className = a['id/class'].split('/')[1];
            const addData = {
              id: id,
              title: className,
              start: a[AteduDataLiterals.LESSON_DATA]?.start,
              end: a[AteduDataLiterals.LESSON_DATA]?.end,
              location: 'R. M36',
              groupId: 'classSchedule',
              repeat: null,
              hasAbsenceRegistration:
                isConfirmed !== undefined ? !isConfirmed : true,
              hasFile: true,
              people: [],
              remindedTime: null,
              week: a['lesson/week'],
            };
            const index = CheckExist(id, updateData);
            if (index <= -1 && id !== undefined) {
              updateData.push(addData);
            } else if (id !== undefined) {
              updateData[index] = addData;
            }
          }
        });
        return {
          teacherEventsList: updateData,
        };
      }
    },
  };
  initStore(actions, initialState);
};

export default configureStore;
