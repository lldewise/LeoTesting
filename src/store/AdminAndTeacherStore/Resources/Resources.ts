import { initStore } from '../../store';
import { CheckExist } from '../../../util/compareData';
import { AssingIconSchedule } from '../../../util/commonFunction';
import { AteduDataLiterals } from '../../../util/constant';
import { resourcesInitialState } from '../../storeInitialStates/adminAndTeacher/resources';
import { ResourcesState } from '../../../types/store/adminAndTeacher/resources';
import { IResources } from '../../../model/resouces';

const initialState: ResourcesState = resourcesInitialState;

const configureStore = () => {
  const actions = {
    SETRESOURCESBYSCHOOL: (curState: ResourcesState, data: any[]) => {
      var resources = data.filter(a => a[1][0].includes('resource'));
      const updateData: any[] = [];
      resources.forEach((element: any) => {
        const item = element[1][1];
        const details: IResources = {
          id: item.id,
          name: item['resource/name'],
          type: item['resource/type'],
        };
        updateData.push(details);
      });

      const resoucesList: IResources[] = updateData.filter(
        (r: IResources) => !r.type.includes('room'),
      );
      const roomsList: IResources[] = updateData.filter((r: IResources) =>
        r.type.includes('room'),
      );
      return {
        resourcesBySchool: resoucesList,
        roomsBySchool: roomsList,
        resourcesBySchoolChanged: Math.random().toString(),
      };
    },
    SETRESOUCESCHANGED: (curState: ResourcesState, data: any) => {
      return {
        resourcesBySchoolChanged: null,
      };
    },
  };
  initStore(actions, initialState);
};

export default configureStore;
