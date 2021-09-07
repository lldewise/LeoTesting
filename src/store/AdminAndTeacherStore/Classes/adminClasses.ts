import ateduSSO from '../../../atedusso/services';
import { AdminClassesState } from '../../../types/store/adminAndTeacher/classes';
import { AteduDataLiterals } from '../../../util/constant';
import { initStore } from '../../store';
import { adminClassinitialState } from '../../storeInitialStates/adminAndTeacher/classes';
import moment from 'moment';

const initialState: AdminClassesState = adminClassinitialState;

const configureStore = () => {
  const actions = {
    SETADMINSUBJECTLISTS: (curState: AdminClassesState, data: any) => {      
      let subject = data.filter((a: any) => a[1][0].includes('subject'));  
      const updateData: any[] = [];
      if (subject.length > 0) {
        subject.forEach((a: any) => {
          let element = a[1][1];
          const item = {
            subjectId: element.id,
            name: element[AteduDataLiterals.SUBJECT_NAME],
            idForScool: element[AteduDataLiterals.ID_FOR_SCHOOL],
            code: element[AteduDataLiterals.SUBJECT_NAME].substring(0, 2).toUpperCase(),
          };              
          updateData.push(item);
        });
        return { adminSubjectLists: updateData };
      }
    },
    SETADMINCLASSESLISTS: (curState: AdminClassesState, data: any) => {  
      let classes = data.filter((a: any) => a[1][0].includes('class'));  
      const updateData: any[] = [];
      if (classes && classes?.length > 0) {
        classes.forEach((a: any) => {          
          let details = a[1][1];             
          if(details) {
            let code = details[AteduDataLiterals.CLASS_NAME] !== undefined ? details[AteduDataLiterals.CLASS_NAME].substring(0, 2).toUpperCase() : '';
            let alias = details[AteduDataLiterals.CLASS_DATA] !== undefined ? details[AteduDataLiterals.CLASS_DATA].alias : '';
            let start = details[AteduDataLiterals.CLASS_DATA] !== undefined ? moment(details[AteduDataLiterals.CLASS_DATA][AteduDataLiterals.CLASS_START_DATE]).format("DD-MM-YYYY") : '01-01-2000';
            let end = details[AteduDataLiterals.CLASS_DATA] !== undefined ? moment(details[AteduDataLiterals.CLASS_DATA][AteduDataLiterals.CLASS_END_DATE]).format("DD-MM-YYYY") : '01-01-2000';
            let noOfStudent = details[AteduDataLiterals.CLASS_DATA] !== undefined ? details[AteduDataLiterals.CLASS_DATA][AteduDataLiterals.NUMBER_OF_STUDENT] : '0';            
            const item = {
              classTitle: details[AteduDataLiterals.CLASS_YEAR_NUMBER] + ' ' + code + '/' + alias,
              xprsSubject: details[AteduDataLiterals.XPRS_SUBJECT] !== undefined ? details[AteduDataLiterals.XPRS_SUBJECT].split("/")[1] : '',
              period: start + ' to ' +  end,
              classYear: details[AteduDataLiterals.CLASS_NAME] !== undefined ? details[AteduDataLiterals.CLASS_NAME] : '',
              numberOfStudent: noOfStudent,
              teacher: null
            };            
            updateData.push(item);
          }    
        });
        return { adminClassesLists: updateData };
      } else {
        return { adminClassesLists: updateData };
      }
    },
    SETADMINSELECTEDCLASSES: (curState: AdminClassesState, data: any) => {
      let updateSelected = null;
      if (data.id) {
        curState.adminSelectedClasses.subjectId = data.subjectId;
        curState.adminSelectedClasses.code = data.code;
        curState.adminSelectedClasses.name = data.name;

        updateSelected = curState.selectedUserAccount;
        return { adminSelectedClasses: updateSelected };
      } else {
        curState.adminSelectedClasses.subjectId = null;
        curState.adminSelectedClasses.code = null;
        curState.adminSelectedClasses.name = null;

        updateSelected = curState.selectedUserAccount;
        return { adminSelectedClasses: updateSelected };
      }
    },
    SETCLASSBYSCHOOL: (curState: AdminClassesState, data: any[]) => {
      var classes = data.filter(a => a[1][0].includes('class'));

      const updateData: any[] = [];
      classes.forEach((element: any) => {
        const item = element[1][1];
        const details = {
          id: item.id,
          name: item['class/name'],
        };
        updateData.push(details);
      });

      return {
        classesBySchool: updateData,
        classesBySchoolChanged: Math.random().toString(),
      };
    },
    SETCLASSBYSCHOOLCHANGED: (curState: AdminClassesState, data: any) => {
      return {
        classesBySchoolChanged: null,
      };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
