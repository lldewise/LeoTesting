import { StudentCasesState } from '../../types/store/students';
import { initStore } from '../store';
import { studentCasesInitialState } from '../storeInitialStates/students';

const initialState: StudentCasesState = studentCasesInitialState;

const configureStore = () => {
  const actions = {};
  initStore(actions, initialState);
};

export default configureStore;
