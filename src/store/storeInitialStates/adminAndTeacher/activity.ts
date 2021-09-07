import { ActivityState } from '../../../types/store/adminAndTeacher/activity';

export const activityInitialState: ActivityState = {
  adminActivityDoubleList: [
    // { id:"1", name: "1p EN", },
  ],
  activityList: [
    // {
    //   title: "English Tutorial, Symposium Activity, Symposium Activity",
    //   type:"Other Activity",
    //   start: "11/05-2020 24:00",
    //   end: "11/05-2020 24:00",
    //   showInSchedule:true,
    //   reserveParticipants:true,
    //   hold: ["1p EN", "2p EN", "3p EN"],
    //   student: ["Bella Chaou"],
    //   teacher: ["Eldell Centeno", "James Yap", "Jay Celeste"],
    //   room: ["Rm. M44"],
    //   resources: ["English Book 1", "English Book 2"],
    //   openCredit: "1",
    //   account:"12345",
    //   note:"12345"
    // },
  ],
  adminResourcesList: [],
  classesList: [],
  studentsList: [],
  teachersList: [],
  adminRoomsList: [],
  activityItemSelected: null,
  activityAttendance: [],
  activityAttendanceChanged: null,
  activityListChanged: null,
};
