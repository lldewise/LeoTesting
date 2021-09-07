export type EnrolledStudentsState = {
  enrolledStudentList: any[];
  studentInfo: StudentInfo;
  enrolledStudentSelected: any;
};

export type StudentCasesState = {
  casesList: Case[];
};

export type StudentAccountById = {
  class: any[];
  id: string;
  roles: string[];
  studentId: string;
  userId: string;
};

export type StudentInfo = {
  imageInitials: string;
  imageUrl: string;
  secondaryText: string;
  text: string;
};

export type Case = {
  createdby: string;
  icon: string;
  id: number;
  lastupdated: string;
  name: string;
  selected: boolean;
};
