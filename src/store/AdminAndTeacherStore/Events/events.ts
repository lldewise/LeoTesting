import { initStore } from '../../store';
import moment from 'moment';
import { adminEventInitialState } from '../../storeInitialStates/adminAndTeacher/events';
import { AdminEventState } from '../../../types/store/adminAndTeacher/events';

let eventGuid = 0;

const initialState: AdminEventState = adminEventInitialState;

const configureStore = () => {
  const actions = {
    ADMINCREATEEVENT: (curState: AdminEventState, data: any) => {
      const updateData = curState.eventsList;
      const date = moment(data.date).format('YYYY-MM-DD');
      const sTime = moment(data.eventStartTime, 'h:mm:ss A').format('HH:mm:ss');
      const eTime = moment(data.eventEndTime, 'h:mm:ss A').format('HH:mm:ss');
      const addData = {
        id: createEventId(),
        title: data.title,
        start: date + 'T' + sTime,
        end: date + 'T' + eTime,
        location: data.locations.name,
        groupId: data.category.groupId,
        repeat: data.repeat,
        people: data.peoplesInvited?.name,
        remindedTime: data.remindme,
      };
      updateData.push(addData);
      return { eventsList: updateData };
    },
  };

  initStore(actions, initialState);
};

function createEventId() {
  return String(eventGuid++);
}
export default configureStore;
