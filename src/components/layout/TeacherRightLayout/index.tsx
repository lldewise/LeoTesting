import React, { useEffect, useState } from 'react';
import { useStore } from '../../../store/store';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import { Fragment } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import styles from './TeacherRightLayout.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import TeacherDashboardCalendar from '../../adminANDteacher/Dashboard/TeacherDashboardCalendar/TeacherDashboardCalendar';
import TeacherDashboardTodos from '../../adminANDteacher/Dashboard/TeacherDashboardTodos/TeacherDashboardTodos';
import TeacherCreateEvents from '../../adminANDteacher/Dashboard/TeacherCreateEvents/TeacherCreateEvents';
import { useHistory } from 'react-router-dom';
import DialogConfimation from '../../userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
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

const TeacherRightLayout: React.FC = props => {
  const { principal } = useAuthentication();
  const [data, dispatch] = useStore();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [dataSave, setDataSave] = useState<any | null>();
  const [subject, setSubject] = useState<string | null>(null);
  const [teacherEventsList, setTeacherEventsList] = useState(
    data.teacherEventsList,
  );
  //modal for Event and Todo
  const [isModalOpenET, { setTrue: showModalET, setFalse: hideModalET }] =
    useBoolean(false);
  const [isUpdatedET, setIsUpdatedET] = useState(false);
  //eslint-disable-next-line
  const [isSpinnerET, setIsSpinnerET] = useState(false);
  const [pivotActive, setPivotActive] = useState(1);
  const [activeTabModal, setActiveTabModal] = useState<number | null>(1);

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
    todoTitle: undefined,
    todoStartDate: null,
    todoStartTime: null,
    todoEndTime: null,
    todoIsAllDay: false,
    description: undefined,
    type: null,
  };

  useEffect(() => {
    const currentPage = history.location.pathname.split('/')[2];
    if (currentPage === 'classes') {
      const subj = data.classesInfo.selectedClass;
      setSubject(subj);
      setTeacherEventsList(teacherEventsList.filter(a => a.title === subj));
    } else {
      setSubject(null);
      setTeacherEventsList(data.teacherEventsList);
    }
  }, [history]); //eslint-disable-line react-hooks/exhaustive-deps

  function handleExpand() {
    history.push('./schedules');
  }

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
      dispatch('TEACHERCREATEEVENT', dataSave);
    } else {
      saveData();
    }
    setTimeout(() => {
      setIsUpdatedET(false);
      toggleHideDialog();
      hideModalET();
    }, 500);
  };

  const saveData = () => {
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
        const todo = todoData;
        if (response) {
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
          dispatch('TEACHERTODOCREATE', item);
        }
      })
      .catch(error => {})
      .then(() => {});
  };

  const showModalHandler = () => {
    showModalET();
  };
  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContentTodo}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        text={null}
        spinner={false}
      />

      <TeacherCreateEvents
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
                <TeacherDashboardCalendar
                  itemList={teacherEventsList}
                  external={data.userExternalUnique}
                  userData={data.userData}
                  user={data.userProfile}
                  subject={subject}
                  currentDate={new Date(data.classesInfo.selectedDate)}
                />
              </PivotItem>
              <PivotItem headerText={intl(LabelNames.toDo)} itemKey="2">
                <TeacherDashboardTodos />
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
        <div className="ms-Grid-col ms-lg-12 create-container createNewSchedBtn">
          <ActionButton
            className={'btnPlain btnPrimary'}
            iconProps={{ iconName: 'Add' }}
            onClick={showModalHandler}>
            {intl(LabelNames.create)}
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default TeacherRightLayout;
