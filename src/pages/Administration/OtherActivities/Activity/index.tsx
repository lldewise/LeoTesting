import React, { useEffect, useState } from 'react';
import classes from './Activity.module.scss';

import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import {
  DialogType,
  ActionButton,
  FontIcon,
  Pivot,
  PivotItem,
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

import moment from 'moment';
import ActivityAttendance from './ActivityAttendance/ActivityAttendance';
import { useStore } from '../../../../store/store';
const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
    },
  ],
  linkIsSelected: {
    selectors: {
      ':before': {
        height: '3px',
        backgroundColor: '#6c35d4',
      },
    },
  },
  text: {
    fontSize: '14px',
    fontFamily: 'Segoe UI',
  },
};

const Activity: React.FC = () => {
  const data = useStore()[0];
  const [time, settime] = useState<any>('');
  const [days, setDay] = useState<any>('');
  const [months, setMonth] = useState<any>('');
  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);

  const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
  const dialogContentConfirm = {
    type: DialogType.normal,
    styles: dialogStyles,
    title: 'Do you want to confirm this attendance?',
    closeButtonAriaLabel: 'Cancel',
    subText: 'You can always return here and make changes.',
  };

  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);

  const _onConfirm = () => {
    toggleHideDialogConfirm();
  };

  useEffect(() => {
    if (data.activityItemSelected !== null) {
      const from = moment(data.activityItemSelected.start).format('h:mm A');
      const to = moment(data.activityItemSelected.end).format('h:mm A');
      settime(from + ' - ' + to);
      setDay(moment(data.activityItemSelected.start).format('DD'));
      setMonth(moment(data.activityItemSelected.start).format('MMM'));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const closeSuccessMessage = () => {
    setToggleSuccess(false);
  };

  const saveAttendanceHandler = () => {
    setToggleSuccess(true);
    setTimeout(() => {
      setToggleSuccess(true);
    }, 3000);
  };
  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={_onConfirm}
        text={null}
        spinner={false}
      />

      <div className={classes.headerContainer}>
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-lg12 ">
            <div className={'ms-Grid-row '}>
              <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                  <FontIcon iconName="EditCreate" />
                </div>
                <div className={'ms-Grid-col ms-lg1 ' + classes.headertitle}>
                  Activity
                </div>
                <div className={'AttendanceHeader ' + classes.helpIcon}>
                  <ActionButton
                    iconProps={{ iconName: 'Unknown' }}
                    className={classes.actionButton}>
                    Help
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleSuccess && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={closeSuccessMessage}
          dismissButtonAriaLabel="Close">
          Activity Attendance sucessfully saved.
        </MessageBar>
      )}

      <div className={'ms-Grid-row ' + classes.date}>
        <div className="ms-Grid-col ms-lg-12">
          <div className={'ms-Grid-col ms-lg-2 ' + classes.titleDate}>
            <div>
              <div className={classes.dateBoxMonth}>{months.toUpperCase()}</div>
              <div className={classes.dateBoxDay}>{days}</div>
            </div>
          </div>
          <div className="ms-Grid-col ms-lg-10">
            <div className={classes.titleSubject}>
              {data.activityItemSelected?.title}
            </div>

            <div className={classes.headerFlex}>
              <div className={classes.titleSubjectDetils}>
                <FontIcon iconName="Clock" className="padR5"></FontIcon> {time}
              </div>
              <div className={classes.titleSubjectDetils}>
                {data.activityItemSelected?.rooms.length > 0 && (
                  <div>
                    <FontIcon iconName="POI" className="padR5"></FontIcon>
                    {data.activityItemSelected?.rooms[0].name}
                    {data.activityItemSelected.rooms.length > 1 && (
                      <span>
                        {' '}
                        +{data.activityItemSelected.rooms.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.headerFlex}>
              <div className={classes.titleSubjectDetils}>
                {data.activityItemSelected?.class.length > 0 && (
                  <div>
                    <FontIcon iconName="Group" className="padR5"></FontIcon>
                    {data.activityItemSelected?.class[0].name}
                    {data.activityItemSelected.class.length > 1 && (
                      <span>
                        {' '}
                        +{data.activityItemSelected.class.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className={classes.titleSubjectDetils}>
                {data.activityItemSelected?.students.length > 0 && (
                  <div>
                    <FontIcon iconName="IDBadge" className="padR5"></FontIcon>
                    {data.activityItemSelected?.students[0].name}
                    {data.activityItemSelected.students.length > 1 && (
                      <span>
                        {' '}
                        +{data.activityItemSelected.students.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className={classes.titleSubjectDetils}>
                {data.activityItemSelected?.teachers.length > 0 && (
                  <div>
                    <FontIcon
                      iconName="AccountManagement"
                      className="padR5"></FontIcon>
                    {data.activityItemSelected?.teachers[0].name}
                    {data.activityItemSelected.teachers.length > 1 && (
                      <span>
                        {' '}
                        +{data.activityItemSelected.teachers.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <Pivot styles={pivotStyles} defaultSelectedKey={'3'}>
          <PivotItem
            headerText={'Information'}
            itemIcon="WaitlistConfirm"
            itemKey="1"></PivotItem>
          <PivotItem
            itemIcon="Comment"
            headerText={'Student Feedback'}
            itemKey="2"></PivotItem>
          <PivotItem
            itemIcon="ClipboardList"
            headerText={'Attendance'}
            itemKey="3">
            <ActivityAttendance saveData={saveAttendanceHandler} />
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};
export default Activity;
