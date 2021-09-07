import { initStore } from '../../store';
import { teacherSharedInititalState } from '../../storeInitialStates/adminAndTeacher/teachers';

const initialState = teacherSharedInititalState;

const configureStore = () => {
  const actions = {};

  initStore(actions, initialState);
};

export default configureStore;
