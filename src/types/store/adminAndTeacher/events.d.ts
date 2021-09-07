export type AdminEventState = {
  eventsList: Events[];
};

export type Events = {
  borderColor?: string;
  color?: string;
  display?: string;
  end?: string;
  groupId: string;
  id: string;
  location?: string;
  people: any[];
  remindedTime: any;
  repeat: any;
  start: string;
  title: string;
};
