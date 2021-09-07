import { initStore } from '../../store';
import { teacherTaskInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';

const initialState = teacherTaskInitialState;

const configureStore = () => {
  const actions = {};

  initStore(actions, initialState);
};

export default configureStore;
