import { initStore } from '../../store';
import { CheckExist } from '../../../util/compareData';
import { AssingIconSchedule } from '../../../util/commonFunction';
import { AteduDataLiterals } from '../../../util/constant';
import { activityInitialState } from '../../storeInitialStates/adminAndTeacher/activity';
import { ActivityState } from '../../../types/store/adminAndTeacher/activity';
import { IActivity } from '../../../model/activity';

const initialState: ActivityState = activityInitialState;

const configureStore = () => {
  const actions = {
    GETACTIVITYLIST: (curState: ActivityState, data: any) => {
      var updatedData = data;
      return { adminRegularNews: updatedData };
    },
    ADDACTIVITYDATA: (curState: ActivityState, data: any[]) => {
      const updatedData = [...curState.adminActivityDoubleList];
      data.forEach(element => {
        const item = {
          id: element[0],
          name: element[1].title,
          group: AssingIconSchedule(element[1].group),
        };

        const index = CheckExist(element[0], updatedData);
        if (index <= -1) {
          updatedData.push(item);
        } else {
          updatedData[index] = item;
        }
      });
      return { adminActivityDoubleList: updatedData };
    },

    GETROOMS: (curState: ActivityState, data: any) => {
      const updatedData: any[] = [];
      data.forEach((element: any) => {
        const item = {
          id: element[0],
          name: element[1].name,
        };
        updatedData.push(item);
      });
      return { adminRoomsList: updatedData };
    },

    GETRESOURCES: (curState: ActivityState, data: any) => {
      const updatedData: any[] = [];
      data.forEach((element: any) => {
        const item = {
          id: element[0],
          name: element[1].name,
        };
        updatedData.push(item);
      });
      return { adminResourcesList: updatedData };
    },

    GETCLASSES: (curState: ActivityState, data: any) => {
      const updatedData: any[] = [];
      data.forEach((element: any) => {
        const item = {
          id: element[0],
          name: element['class/name'].split('/')[1],
        };
        updatedData.push(item);
      });
      return { studentsList: updatedData };
    },

    SELECTEDACTIVITYITEM: (curState: ActivityState, data: any) => {
      return { activityItemSelected: data };
    },
    SETACTIVITYLIST: (curState: ActivityState, data: any[]) => {
      const updatedData: IActivity[] = [];

      if (data.length > 0) {
        let x = 0;
        data.forEach((a: any) => {
          if (x >= 1) {
            const staffList = a.Attendees.filter((a: any) =>
              a.toString().includes('staff'),
            );
            const studentList = a.Attendees.filter((a: any) =>
              a.toString().includes('student'),
            );

            const resourcesList = a.ResourcesIds.filter((a: any) =>
              a.toString().includes('resource'),
            );
            
            const addData: IActivity = {
              id: a.Id,
              title: a.Data.Title,
              type: a.Type,
              showInSchedule: a.Data.ShowInSchedule,
              reserveParticipants: a.Data.Credit,
              start: a.DateStart,
              end: a.DateEnd,
              class: a.ClassesIds !== null ? AssingIdName(a.ClassesIds) : [], //need to pass in object with a "name" property
              teachers: staffList !== null ? AssingIdName(staffList) : [], //need to pass in object with a "name" property
              rooms: [], //need to pass in object with a "name" property
              resources: [], //need to pass in object with a "name" property
              status: a.Confirmed,
              account: '',
              note: a.Data.Note,
              students: AssingIdName(studentList),
              steachers: '',
              srooms: '',
              sresources: '',
              sclass: '',
              roomsresources:
                resourcesList !== null ? AssingIdName(resourcesList) : [], //need to pass in object with a "name" property
            };
            const index = CheckExist(a.Id, updatedData);
            if (index <= -1) {
              updatedData.push(addData);
            } else {
              updatedData[index] = addData;
            }
          }
          x++;
        });
        return {
          activityList: updatedData,
          activityListChanged: Math.random(),
        };
      }
    },

    SETACTIVITYATTENDANCE: (curState: ActivityState, data: any[]) => {
      var attendance = data.filter(a => a[1][0].includes('attendance'));
      
      const updateData: any[] = [];
      attendance.forEach((element: any) => {
        const item = element[1][1];
        const itemData = element[1][1]['attendance/data'];
        const meta = element[1][1]['_meta'];
        const details = {
          id: item.id !== undefined ? item.id : item['crux.db/id'],
          eventId: item['id/event'],
          modifierId: item['id/modifier'],
          studentId: item['id/student'],
          lastModifiedDate: meta !== undefined ? meta['tx-time'] : new Date(),
          remarks: itemData.remarks,
          percentage: itemData.percentage,
        };
        updateData.push(details);
      });

      return {
        activityAttendance: updateData,
        activityAttendanceChanged: Math.random().toString(),
      };
    },
    SETACTIVITYATTENDANCECHANGED: (curState: any, data: any) => {
      return {
        activityAttendanceChanged: null,
      };
    },
    SETACTIVITYLISTCHANGED: (curState: any, data: any) => {
      return {
        activityListChanged: null,
      };
    },
  };
  initStore(actions, initialState);
};

const AssingIdName = (data: any[]) => {
  var result: any[] = [];
  if (data !== null) {
    data.forEach(element => {
      const item = {
        id: element,
        name: element,
      };
      result.push(item);
    });
  }
  return result;
};

export default configureStore;
