import { NavigationState } from '../../types/store/navigation';
import { initStore } from '../store';
import { navigationInitialState } from '../storeInitialStates/navigation';

const initialState: NavigationState = navigationInitialState;

const configureStore = () => {
  const actions = {
    SIDEBARSELECTEDKEY: (curState: NavigationState, data: any) => {
      return { sidebarSelectedKey: data };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
