import { initStore } from '../store';
import documentType from '../../util/msgraph/documentType';
import moment from 'moment';
import { dashboardInitialState } from '../storeInitialStates/dashboard';
import { DashboardState } from '../../types/store/dashboard';

const initialState: DashboardState = dashboardInitialState;

const configureStore = () => {
  const actions = {
    Update_Selected: (curState: DashboardState, assignmentId: any) => {
      const listIndex = curState.assignmentlist.findIndex(
        p => p.index === assignmentId,
      );
      const newStatus = !curState.assignmentlist[listIndex].selected;
      const updatedList = [...curState.assignmentlist];
      updatedList.map(item => {
        return (item.selected = false);
      });
      updatedList[listIndex] = {
        ...curState.assignmentlist[listIndex],
        selected: newStatus,
      };
      return { assignmentlist: updatedList };
    },

    Load_Assignment: (curState: DashboardState, payload: any) => {
      const newlist: any[] = [];
      payload.forEach((item: any, i: number) => {
        const day = moment(new Date(item.lastModifiedDateTime)).format('ddd');
        const hour = moment(new Date(item.lastModifiedDateTime)).format(
          'h:mm A',
        );
        const month = moment(new Date(item.lastModifiedDateTime)).format(
          'MMM D',
        );
        const dayHour = day + ' at ' + hour;
        const data = {
          name: item.name,
          item: 'Literature',
          index: i,
          isScrolling: false,
          icon: documentType(item.name),
          selected: false,
          createdby: item.lastModifiedBy.user.displayName,
          lastupdated: dayHour,
          fonticon: '',
          date: month,
          itemId: item.parentReference.id,
        };
        newlist.push(data);
      });
      return { assignmentlist: newlist };
    },
    Load_Dummy: () => {
      return {
        assignmentlist: [
          {
            name: 'Book Report',
            item: 'Literature',
            index: 1,
            isScrolling: true,
            icon: 'docx',
            selected: true,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Equation',
            item: 'Math',
            index: 2,
            isScrolling: true,
            icon: 'xlsx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Presentation',
            item: 'History',
            index: 3,
            isScrolling: false,
            icon: 'pptx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Reading Papers',
            item: 'English',
            index: 4,
            isScrolling: false,
            icon: 'pptx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
          },
        ],
        documentslist: [
          {
            name: 'Introduction',
            item: 'Literature',
            index: 1,
            isScrolling: true,
            icon: 'docx',
            selected: true,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Module',
            item: 'Math',
            index: 2,
            isScrolling: true,
            icon: 'docx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Reading Material',
            item: 'History',
            index: 3,
            isScrolling: false,
            icon: 'docx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
          {
            name: 'Lesson',
            item: 'English',
            index: 4,
            isScrolling: false,
            icon: 'docx',
            selected: false,
            createdby: 'Mona Kane',
            lastupdated: 'Mon at 3:58 PM',
            fonticon: '',
            date: 'Oct 2',
          },
        ],
      };
    },

    Load_Documents: (curState: DashboardState, payload: any) => {
      const newlist: any[] = [];
      payload.forEach((item: any, i: number) => {
        const day = moment(new Date(item.lastModifiedDateTime)).format('ddd');
        const hour = moment(new Date(item.lastModifiedDateTime)).format(
          'h:mm A',
        );
        const month = moment(new Date(item.lastModifiedDateTime)).format(
          'MMM D',
        );
        const dayHour = day + ' at ' + hour;
        const data = {
          name: item.name,
          item: 'Literature',
          index: i,
          isScrolling: false,
          icon: documentType(item.name),
          selected: false,
          createdby: item.lastModifiedBy.user.displayName,
          lastupdated: dayHour,
          fonticon: '',
          date: month,
          itemId: item.parentReference.id,
        };
        newlist.push(data);
      });

      return { documentslist: newlist };
    },

    showMore: (curState: DashboardState) => {
      const addedList = [
        {
          name: 'Equation',
          item: 'Math',
          index: 4,
          isScrolling: true,
          thumbnail: 'excel',
          selected: false,
        },
        {
          name: 'Presentation',
          item: 'History',
          index: 5,
          isScrolling: false,
          thumbnail: 'powerpoint',
          selected: false,
        },
      ];

      const updateList = [...curState.assignmentlist];
      let x = updateList.length;
      addedList.map((item: any) => {
        x++;
        item.index = x;
        return updateList.push(item);
      });
      return { assignmentlist: updateList };
    },
  };

  initStore(actions, initialState);
};

export default configureStore;
