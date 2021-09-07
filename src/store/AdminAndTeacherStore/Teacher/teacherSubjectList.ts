import { TeacherSubjectListState } from '../../../types/store/adminAndTeacher/teachers';
import { initStore } from '../../store';
import { teacherSubjectListInitialState } from '../../storeInitialStates/adminAndTeacher/teachers';

let eventGuid = 0;

const initialState: TeacherSubjectListState = teacherSubjectListInitialState;

const configureStore = () => {
  const actions = {
    TEACHERCREATESUBJECT: (curState: TeacherSubjectListState, data: any) => {
      const updateData = curState.teacherSubjectList;
      const addData = {
        id: createEventId(),
        title: data.title,
        description: data.description,
        start: data.start,
        end: data.end,
        location: data.roomLocation.name,
      };
      updateData.push(addData);
      return { teacherSubjectList: updateData };
    },
    SETSELECTEDSUBJECT: (curState: TeacherSubjectListState, data: any) => {
      curState.selectedSubject.id = data.id;
      curState.selectedSubject.title = data.title;
      curState.selectedSubject.description = data.description;
      curState.selectedSubject.start = data.start;
      curState.selectedSubject.end = data.end;
      curState.selectedSubject.location = data.location;

      const updateSelected = curState.selectedSubject;
      return { selectedSubject: updateSelected };
    },
  };

  initStore(actions, initialState);
};

function createEventId() {
  return String(eventGuid++);
}
export default configureStore;
