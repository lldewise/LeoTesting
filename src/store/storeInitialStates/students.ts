import {
  EnrolledStudentsState,
  StudentCasesState,
} from '../../types/store/students';

export const enrolledStudentsInitialState: EnrolledStudentsState = {
  enrolledStudentList: [],
  studentInfo: {
    imageUrl: '',
    imageInitials: 'JC',
    text: 'Jay Celeste',
    secondaryText: 'jayxceleste@gmail.com',
  },
  enrolledStudentSelected: null,
};

export const studentCasesInitialState: StudentCasesState = {
  casesList: [
    {
      id: 1,
      name: 'File1',
      icon: 'docx',
      selected: true,
      createdby: 'Mona Kane',
      lastupdated: 'May 6, 2021',
    },
    {
      id: 2,
      name: 'File2',
      icon: 'docx',
      selected: true,
      createdby: 'Mona Kane',
      lastupdated: 'May 6, 2021',
    },
    {
      id: 3,
      name: 'File3',
      icon: 'docx',
      selected: true,
      createdby: 'Mona Kane',
      lastupdated: 'May 6, 2021',
    },
  ],
};
