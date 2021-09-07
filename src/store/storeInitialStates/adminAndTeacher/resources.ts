import { ResourcesState } from '../../../types/store/adminAndTeacher/resources';

export const resourcesInitialState: ResourcesState = {
  resourcesBySchool: [],
  roomsBySchool: [],
  resourcesBySchoolChanged: null,
};
