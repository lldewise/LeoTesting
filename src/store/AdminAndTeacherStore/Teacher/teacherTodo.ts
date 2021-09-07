import { TeacherTodoState } from '../../../types/store/adminAndTeacher/teachers';
import { initStore } from '../../store';
import { teacherTodoInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';

const initialState: TeacherTodoState = teacherTodoInitialState;

const configureStore = () => {
  const actions = {
    TEACHERTODOCREATE: (curState: TeacherTodoState, data: any) => {
      const updateData = curState.teacherTodoList;
      const addData = {
        id: data.id,
        title: data.title,
        date: data.date,
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
        allday: data.allday,
        description: data.description,
        taskType: data.taskType,
        status: data.status,
        createdDate: data.createdDate,
        createdBy: data.createdBy,
        lastModifiedDate: data.lastModifiedDate,
        lastModifiedBy: data.lastModifiedBy,
      };
      updateData.push(addData);
      return { teacherTodoList: updateData };
    },
  };
  initStore(actions, initialState);
};

// function createEventId(){
//   return String(eventGuid++);
// }

export default configureStore;
