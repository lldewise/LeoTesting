export type SelectedClass = {
  subjectId: string | null;
  code: string | null;
  name: string | null;
};

export type AdminClassesState = {
  adminSubjectLists: any[];
  adminClassesLists: any[];
  adminSelectedClasses: SelectedClass;
  selectedUserAccount?: any;
  classesBySchool: anu[];
  classesBySchoolChanged: any;
};
