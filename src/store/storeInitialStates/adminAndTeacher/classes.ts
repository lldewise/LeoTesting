import { AdminClassesState } from '../../../types/store/adminAndTeacher/classes';

export const adminClassinitialState: AdminClassesState = {
  adminSubjectLists: [],
  adminClassesLists: [],
  adminSelectedClasses: {
    subjectId: null,
    code: null,
    name: null,
  },
  classesBySchool: [],
  classesBySchoolChanged: null,
};
