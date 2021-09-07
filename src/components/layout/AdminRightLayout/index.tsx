import React, { useState } from 'react';
import { useStore } from '../../../store/store';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import { Fragment } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import styles from './AdminRightLayout.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import AdminDashboardCalendar from '../../adminANDteacher/Dashboard/DashboardCalendar/AdminDashboardCalendar';
import AdminDashboardTodos from '../../adminANDteacher/Dashboard/AdminDashboardTodos/AdminDashboardTodos';
import AdminCreateEvents from '../../adminANDteacher/Dashboard/AdminCreateEvents/AdminCreateEvents';
import { useHistory } from 'react-router-dom';
import DialogConfimation from '../../userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import apiTeacher from '../../../services/apiTeacher';
import { useAuthentication } from '../../../util/context/authentication';

const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
    },
  ],
};

const dialogContentTodo = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Close',
  subText: 'Save this record?',
};

type InitialValues = {
  eventTitle: string | undefined;
  eventStartDate: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  eventIsAllDay: boolean | null;
  repeated: string | null;
  peoplesInvited: any[];
  locations: any[];
  remindMe: string | null;
  category: string | null;
  todoTitle: string | undefined;
  todoStartDate: string | null;
  todoStartTime: string | null;
  todoEndTime: string | null;
  todoIsAllDay: boolean | null;
  description: string | undefined;
  type: string | null;
};

const AdminRightLayout: React.FC = () => {
  //eslint-disable-next-line
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [data, dispatch] = useStore();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [dataSave, setDataSave] = useState<any | null>();
  //modal for Event and Todo
  const [isModalOpenET, { setTrue: showModalET, setFalse: hideModalET }] =
    useBoolean(false);
  const [isUpdatedET, setIsUpdatedET] = useState(false);
  const [isSpinnerET] = useState(false);
  const [pivotActive, setPivotActive] = useState(1);
  const [activeTabModal, setActiveTabModal] = useState<number | null>(1);
  //eslint-disable-next-line
  const { logout, principal } = useAuthentication();

  const history = useHistory();
  const initialValues: InitialValues = {
    eventTitle: undefined,
    eventStartDate: null,
    eventStartTime: null,
    eventEndTime: null,
    eventIsAllDay: false,
    repeated: null,
    peoplesInvited: [],
    locations: [],
    remindMe: null,
    category: null,
    // todo
    todoTitle: undefined,
    todoStartDate: null,
    todoStartTime: null,
    todoEndTime: null,
    todoIsAllDay: false,
    description: undefined,
    type: null,
  };

  function handleExpand() {
    history.push('./schedules');
  }

  //eslint-disable-next-line
  const showModalHandler = () => {
    showModal();
  };

  const showModalHandlerET = () => {
    showModalET();
  };

  const onSubmitET = (data: any, tab: number) => {
    setDataSave(data);
    setActiveTabModal(tab);
    toggleHideDialog();
  };

  const pivotHandler = (value: any) => {
    setPivotActive(value.props.itemKey);
  };

  const ConfirmHandler = () => {
    if (activeTabModal === 1) {
      dataSave.hasAbsenceRegistration = true;
      dataSave.hasFile = true;
      dispatch('ADMINCREATEEVENT', dataSave);
    } else {
      //using teacher api for the moment
      SaveAdminTodo();
    }
    setTimeout(() => {
      setIsUpdatedET(false);
      toggleHideDialog();
      hideModalET();
    }, 500);
  };

  const SaveAdminTodo = () => {
    const todoData = {
      id: null,
      title: dataSave.todoTitle,
      date: dataSave.todoStartDate.toLocaleString(),
      timeFrom: dataSave.todoStartTime,
      timeTo: dataSave.todoEndTime,
      allday: dataSave.todoIsAllDay.toString(),
      description: dataSave.description,
      taskType: dataSave.type,
      status: 'new',
      createdfiedDate: new Date(),
      createdBy: data.userProfile.id,
      lastModifiedDate: new Date(),
      lastModifiedBy: data.userProfile.id,
    };
    apiTeacher
      .post(
        '/api/school/' + data.userProfile.school + '/teacher/todo',
        todoData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(response => {
        if (response) {
          const todo = todoData;
          const item = {
            id: response.data.split('/')[1],
            title: todo.title,
            date: todo.date.toLocaleString(),
            timeFrom: todo.timeFrom,
            timeTo: todo.timeTo,
            allday: todo.allday.toString(),
            description: todo.description,
            taskType: todo.taskType,
            status: 'new',
            createdDate: new Date(),
            createdBy: data.userProfile.id,
            lastModifiedDate: new Date(),
            lastModifiedBy: data.userProfile.id,
          };
          dispatch('ADMINTODOCREATE', item);
        }
      })
      .catch(error => {})
      .then(() => {});
  };

  return (
    <>
      <DialogConfimation
        spinner={false}
        dialogContentProps={dialogContentTodo}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        text={null}
      />

      <AdminCreateEvents
        user={null}
        showModal={showModalHandlerET}
        isModalOpen={isModalOpenET}
        hideModal={hideModalET}
        onSubmit={onSubmitET}
        isUpdated={isUpdatedET}
        isSpinner={isSpinnerET}
        pivotActive={pivotActive}
        initialValues={initialValues}
      />

      <div className="ms-Grid-col ms-lg12 rightpanel">
        <div className={'ms-Grid-col ms-lg12 ' + styles.mTop5}>
          <div className="ms-Grid-col ms-lg12">
            <Pivot styles={pivotStyles} onLinkClick={pivotHandler}>
              <PivotItem headerText={intl(LabelNames.calendar)} itemKey="1">
                <AdminDashboardCalendar itemList={data.eventsList} />
              </PivotItem>
              <PivotItem headerText={intl(LabelNames.toDo)} itemKey="2">
                <AdminDashboardTodos />
              </PivotItem>
            </Pivot>
            <br />
          </div>
          <div className="ms-Grid-col ms-lg1 expandCal">
            <IconButton
              iconProps={{ iconName: 'MiniExpandMirrored' }}
              onClick={handleExpand}
              className="btnIcon btnIconLg btnIconDark"
            />
          </div>
        </div>
        <div className="ms-Grid-col ms-lg-12  create-container createNewSchedBtn">
          <ActionButton
            className={'btnPlain btnPrimary'}
            iconProps={{ iconName: 'Add' }}
            onClick={showModalET}>
            {intl(LabelNames.create)}
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default AdminRightLayout;
