import { EnrolledStudentsState } from '../../types/store/students';
import { initStore } from '../store';
import { enrolledStudentsInitialState } from '../storeInitialStates/students';

const initialState: EnrolledStudentsState = enrolledStudentsInitialState;

const configureStore = () => {
  const actions = {
    SETENROLLEDSTUDENTLIST: (curState: EnrolledStudentsState, data: any) => {
      const updateData: any[] = [];
      if (data && data?.length > 0) {
        data.forEach((a: any) => {
          const item = {
            id: a.id,
            student: a.student,
            batchId: a.batchId,
            education: a.education,
            educationGroup: a.educationGroup,
            enrollmentDate: a.enrollmentDate,
            firstName: a.firstName,
            lastName: a.lastName,
            fullName: a.firstName + ' ' + a.lastName,
            lineStudy: a.lineStudy,
            studyProgram: a.studyProgram,
            meta: a.meta,
            modifiedBy: a.modifiedBy,
          };
          updateData.push(item);
        });
      }
      return { enrolledStudentList: updateData };
    },
    ENROLLEDSTUDENTSELECTED: (curState: EnrolledStudentsState, data: any) => {
      return { enrolledStudentSelected: data };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
