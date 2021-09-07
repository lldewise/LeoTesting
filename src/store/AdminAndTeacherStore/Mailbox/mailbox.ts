import { AdminEmailState } from '../../../types/store/adminAndTeacher/mail';
import { initStore } from '../../store';
import { adminMailInitialState } from '../../storeInitialStates/adminAndTeacher/mail';

const initialState: AdminEmailState = adminMailInitialState;

const configureStore = () => {
  const actions = {
    EMAILSEARCHLISTRESULT: (curState: AdminEmailState, data: any) => {
      return { EmailSearchList: data };
    },
  };

  initStore(actions, initialState);
};

export default configureStore;
