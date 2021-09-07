export type UserNotification = {
  id: string | null;
  notification: Notification;
  userId: string | null;
};

type Notification = {
  aboutPost: any[];
  classUpdate: any[];
  events: any[];
  reminders: any[];
};
