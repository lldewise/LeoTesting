import { IResources } from '../../../model/resouces';

export type ResourcesState = {
  resourcesBySchool: IResources[];
  roomsBySchool: IResources[];
  resourcesBySchoolChanged: any;
};
