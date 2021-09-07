import { Item } from './item';

export type DashboardState = {
  assignmentlist: Item[];
  homeworklist: Item[];
  documentslist: Item[];
  dueSoon: SubjectDue[];
};

export type SubjectDue = {
  description: string;
  dueDate: string;
  icon: string;
  id: number;
  subject: string;
};
