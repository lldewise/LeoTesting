import { initStore } from '../../store';
import { teacherRegistrationsInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';

const initialState = teacherRegistrationsInitialState;

const configureStore = () => {
  const actions = {};

  initStore(actions, initialState);
};

export default configureStore;
