import { UserNotificationState } from '../../types/store/users';
import { initStore } from '../store';
import { userNotificationInitialState } from '../storeInitialStates/users';

const initialState: UserNotificationState = userNotificationInitialState;

const configureStore = () => {
  const actions = {
    USERSETTING_NOTIFICATION: (curState: UserNotificationState, data: any) => {
      const updatedata = curState.userSettingNotification;
      data.forEach((element: any) => {
        const item = element[1][1];
        if (item == null) {
          return;
        }
        const notification = item['user-settings/notifications'];

        updatedata.id = item.id;
        updatedata.userId = item['id/target'];
        if (notification !== undefined) {
          updatedata.notification = {
            aboutPost: notification.aboutpost,
            events: notification.events,
            reminders: notification.reminders,
            classUpdate: notification.classupdate,
          };
        }
      });

      return { userSettingNotification: updatedata };
    },
    UPDATE_NAVIGATION: (curState: UserNotificationState, data: any) => {
      return { navigationActive: data };
    },
  };

  initStore(actions, initialState);
};
export default configureStore;
