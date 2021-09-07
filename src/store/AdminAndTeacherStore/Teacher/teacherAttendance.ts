import { CheckExist, CheckUserIfExist } from '../../../util/compareData';
import { initStore } from '../../store';
import { beautifyName } from '../../../util/commonFunction';
import { teacherAttendanceInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';
import { TeacherAttendanceState } from '../../../types/store/adminAndTeacher/teachers';

const initialState: TeacherAttendanceState = teacherAttendanceInitialState;

const configureStore = () => {
  const actions = {
    CLASSSTUDENTLIST: (curState: TeacherAttendanceState, data: any) => {
      const updatedData = [...curState.classStudentList];
      const attendanceList = [...curState.teacherAttendanceStudents];
      let i;
      let id;
      let student: any = '';
      // let items = data[0][1][1];
      // var addData = {
      //  id: items.id,
      // h//omeClass: items[AteduDataLiterals.ID_HOME_CLASS],
      // idUser: beautifyName(items[AteduDataLiterals.ID_USER]),
      //studentClasses: items[AteduDataLiterals.STUDENT_CLASSES][0]
      //  };
      // var test3 = data[1]
      if (data.length > 0) {
        for (i = 1; i < data[0][1].length; i++) {
          student = {
            id: data[0][1][i].id,
            attendanceId: null,
            studentId: data[0][1][i]['id/user'],
            students: beautifyName(data[0][1][i]['id/user']),
            percentage: 100,
            absenceType: '1',
            type: 'attendance-type/present',
            remarks: '',
            lastModifiedBy: '',
            present: true,
            dataChanged: 0,
            oldRemarks: '',
            oldPresentStatus: true,
            oldPercentage: 100,
            oldAbsenceType: 1,
            subjectId: '',
          };
          id = data[0][1][i].id;
          const index = CheckExist(id, updatedData);
          if (index <= -1) {
            updatedData.push(student);
          } else {
            updatedData[index] = student;
          }
        }

        for (i = 0; i < attendanceList.length; i++) {
          const idUser = attendanceList[i].studentId;
          const idUserIndex = CheckUserIfExist(idUser, updatedData);
          if (idUserIndex > -1) {
            updatedData[idUserIndex].attendanceId =
              attendanceList[i].attendanceId;
            updatedData[idUserIndex].percentage = attendanceList[i].percentage;
            updatedData[idUserIndex].absenceType =
              attendanceList[i].absenceType;
            updatedData[idUserIndex].remarks = attendanceList[i].remarks;
            updatedData[idUserIndex].type = attendanceList[i].type;
            updatedData[idUserIndex].lastModifiedBy =
              attendanceList[i].lastModifiedBy;
            updatedData[idUserIndex].present = attendanceList[i].present;
            updatedData[idUserIndex].oldRemarks = attendanceList[i].oldRemarks;
            updatedData[idUserIndex].oldPresentStatus =
              attendanceList[i].oldPresentStatus;
            updatedData[idUserIndex].oldPercentage =
              attendanceList[i].oldPercentage;
            updatedData[idUserIndex].oldAbsenceType =
              attendanceList[i].oldAbsenceType;
            updatedData[idUserIndex].dataChanged =
              attendanceList[i].dataChanged;
            updatedData[idUserIndex].subjectId = attendanceList[i].subjectId;
          }
        }
        console.log(updatedData);
      }
      return { ClassStudentList: updatedData };
    },

    ATTENDANCELIST: (curState: TeacherAttendanceState, data: any) => {
      const studentlist = [];

      let student: any = '';
      if (data.length > 0) {
        /*       for(var i=1; i< data[0][1].length  ; i++) {
          
          let id = data[0][1][i]["crux.db/id"] === undefined ? '' : data[0][1][i]["crux.db/id"];
            student = {  
              id: '',
              studentId: data[0][1][i]["id/student"],
              //attendanceId: data[0][1][i]["id"],
              attendanceId: id,
              percentage: data[0][1][i]["attendance/data"]["percentage"],
              absenceType: data[0][1][i]["attendance/data"]["absence/type"] === undefined ?  1 : data[0][1][i]["attendance/data"]["absence/type"],
              type: data[0][1][i]["attendance/data"]["type"],
              remarks: data[0][1][i]["attendance/data"]["remarks"],
              lastModifiedBy:   beautifyName(data[0][1][i]["attendance/data"]["id/staff"]),
              present:  data[0][1][i]["attendance/data"]["percentage"] === 100 ? true : false,
              dataChanged:0,
              oldRemarks: data[0][1][i]["attendance/data"]["remarks"],  
              oldPresentStatus:  data[0][1][i]["attendance/data"]["percentage"] === 100 ? true : false,
              oldPercentage: data[0][1][i]["attendance/data"]["percentage"],
              oldAbsenceType: data[0][1][i]["attendance/data"]["absence/type"] === undefined ?  1 : data[0][1][i]["attendance/data"]["absence/type"],
              subjectId: data[0][1][i]["id/lesson"],
            }
            studentlist.push(student);
           }       
         */
        for (let i = 0; i < data.length; i++) {
          const item = data[i][1][1];
          if (item) {
            const id =
              item['crux.db/id'] === undefined ? '' : item['crux.db/id'];
            student = {
              id: '',
              studentId: item['id/student'],
              //attendanceId: item["id"],
              attendanceId: id,
              percentage: item['attendance/data'].percentage,
              absenceType:
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'],
              type: item['attendance/data'].type,
              remarks: item['attendance/data'].remarks,
              lastModifiedBy: beautifyName(item['attendance/data']['id/staff']),
              present:
                item['attendance/data'].percentage === 100 ? true : false,
              dataChanged: 0,
              oldRemarks: item['attendance/data'].remarks,
              oldPresentStatus:
                item['attendance/data'].percentage === 100 ? true : false,
              oldPercentage: item['attendance/data'].percentage,
              oldAbsenceType:
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'],
              subjectId: item['id/lesson'],
            };
            studentlist.push(student);
          }
        }
      }
      console.log(studentlist);
      return {
        teacherAttendanceStudents: studentlist,
      };
    },
    UPDATEATTENDANCELIST: (curState: TeacherAttendanceState, data: any) => {
      const CurrentclassStudentList = [...curState.classStudentList];
      const studentlist = [];
      let student: any = '';
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i][1][1];
          if (item) {
            const id =
              item['crux.db/id'] === undefined ? '' : item['crux.db/id'];
            student = {
              id: '',
              studentId: item['id/student'],
              //attendanceId: item["id"],
              attendanceId: id,
              percentage: item['attendance/data'].percentage,
              absenceType:
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'],
              type: item['attendance/data'].type,
              remarks: item['attendance/data'].remarks,
              lastModifiedBy: beautifyName(item['attendance/data']['id/staff']),
              present:
                item['attendance/data'].percentage === 100 ? true : false,
              dataChanged: 0,
              oldRemarks: item['attendance/data'].remarks,
              oldPresentStatus:
                item['attendance/data'].percentage === 100 ? true : false,
              oldPercentage: item['attendance/data'].percentage,
              oldAbsenceType:
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'],
              subjectId: item['id/lesson'],
            };
            studentlist.push(student);

            const idUser = item['id/student'];
            const idUserIndex = CheckUserIfExist(
              idUser,
              CurrentclassStudentList,
            );
            if (idUserIndex > -1) {
              CurrentclassStudentList[idUserIndex].attendanceId = id;
              CurrentclassStudentList[idUserIndex].percentage =
                item['attendance/data'].percentage;
              CurrentclassStudentList[idUserIndex].absenceType =
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'];
              CurrentclassStudentList[idUserIndex].remarks =
                item['attendance/data'].remarks;
              CurrentclassStudentList[idUserIndex].type =
                item['attendance/data'].type;
              CurrentclassStudentList[idUserIndex].lastModifiedBy =
                beautifyName(item['attendance/data']['id/staff']);
              CurrentclassStudentList[idUserIndex].present =
                item['attendance/data'].percentage === 100 ? true : false;
              CurrentclassStudentList[idUserIndex].oldRemarks =
                item['attendance/data'].remarks;
              CurrentclassStudentList[idUserIndex].oldPresentStatus =
                item['attendance/data'].percentage === 100 ? true : false;
              CurrentclassStudentList[idUserIndex].oldPercentage =
                item['attendance/data'].percentage;
              CurrentclassStudentList[idUserIndex].oldAbsenceType =
                item['attendance/data']['absence/type'] === undefined
                  ? 1
                  : item['attendance/data']['absence/type'];
              CurrentclassStudentList[idUserIndex].dataChanged = 0;
              CurrentclassStudentList[idUserIndex].subjectId =
                item['id/lesson'];
            }
          }
        }
      }
      // console.log(studentlist)
      return {
        ClassStudentList: CurrentclassStudentList,
        teacherAttendanceStudents: studentlist,
      };
    },

    DELETEATTENDANCE: (curState: TeacherAttendanceState, data: any) => {
      return {
        teacherAttendanceStudents: [],
        ClassStudentList: [],
      };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
