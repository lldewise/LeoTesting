import { TeacherProfileState } from '../../types/store/teachers';
import { initStore } from '../store';
import { teacherProfileInitialState } from '../storeInitialStates/teachers';

const initialState: TeacherProfileState = teacherProfileInitialState;

const configureStore = () => {
  initStore(null, initialState);
};
export default configureStore;
