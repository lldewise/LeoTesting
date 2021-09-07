import { AdminTodoState } from '../../../types/store/adminAndTeacher/todo';
import { initStore } from '../../store';
import { adminTodoInitialState } from '../../storeInitialStates/adminAndTeacher/todo';

const initialState: AdminTodoState = adminTodoInitialState;

const configureStore = () => {
  const actions = {
    ADMINTODOCREATE: (curState: AdminTodoState, data: any) => {
      const updateData = curState.adminTodoList;
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
      return { adminTodoList: updateData };
    },
  };

  initStore(actions, initialState);
};

// function createEventId(){
//     return String(eventGuid++);
//   }

// const convertTime12to24 = (time12h) => {
//   const [time, modifier] = time12h.split(' ');
//   let [hours, minutes] = time.split(':');

//   if (hours === '12') {
//     hours = '00';
//   }
//   if (modifier === 'PM') {
//     hours = parseInt(hours, 10) + 12;
//   }
//   if(hours.length==1){
//     hours ='0'+ hours
//   }
//   return `${hours}:${minutes}`;
// }

export default configureStore;
