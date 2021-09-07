import React, { useState, Fragment } from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react';
import styles from './TeacherDashboardTodos.module.scss';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { DirectionalHint } from '@fluentui/react';
import TeacherTodoList from '../TeacherTodoList/TeacherTodoList';
import { useStore } from '../../../../store/store';
import DialogConfimation from '../../../userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean } from '@uifabric/react-hooks';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';

const type = require('../../../../assets/ui-kit/_variables.scss');
const iconStyles = { marginLeft: '5px', color: '#000' };
const options = [
  { key: 'allTask', text: intl(LabelNames.allTasks) },
  { key: 'ateduTask', text: intl(LabelNames.ateduTask) },
  { key: 'schoolTask', text: intl(LabelNames.schoolTasks) },
  { key: 'personalTask', text: intl(LabelNames.personalTasks) },
];

const dialogContentTodo = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Cancel',
  subText: 'You want to complete this task?',
};

const TeacherDashboardTodos: React.FC = () => {
  const [data] = useStore();
  //eslint-disable-next-line
  const [teacherTodoList, setTeacherTodoList] = useState(data.teacherTodoList);
  //eslint-disable-next-line
  const [todoList, setTodoList] = useState(
    teacherTodoList.filter(a => a.status !== 'completed'),
  );
  const [completedTodoList, setCompletedTodoList] = useState(
    teacherTodoList.filter(a => a.status === 'completed'),
  );
  const [isFilterTask, setIsFilterTask] = useState(false);
  const [taskStatus, setTaskStatus] = useState('new');
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleFilter = () => {
    setIsFilterTask(!isFilterTask);
  };

  const onTaskCompleted = (option: any) => {
    if (option) {
      setSelectedItem(option);
      toggleHideDialog();
    }
  };

  const onTaskFavorite = (option: any) => {
    if (option) {
      const updatedItemList = [...teacherTodoList];
      updatedItemList.forEach(a => {
        if (a.id === option.id) {
          a.isFavorite = !option.isFavorite;
        }
      });
      const data = updatedItemList.filter(a => a.status === 'new');
      setTodoList(data);
      setCompletedTodoList(
        teacherTodoList.filter(a => a.status === 'completed'),
      );
    }
  };

  const ConfirmHandler = () => {
    const option = selectedItem;
    if (option) {
      const updatedItemList = [...teacherTodoList];
      updatedItemList.forEach(a => {
        // if (a.id === option.id) {
        //   a.status = 'completed';
        // }
      });
      const data = updatedItemList.filter(a => a.status === 'new');
      setTodoList(data);
      setCompletedTodoList(
        teacherTodoList.filter(a => a.status === 'completed'),
      );
      toggleHideDialog();
    }
  };

  const onChangeScheduleRender = (item: any) => {
    if (item.target.id !== '') {
      let filteredEvent = [];
      if (item.target.id === 'allTask') {
        setTodoList(teacherTodoList.filter(a => a.status === 'new'));
      } else {
        filteredEvent = teacherTodoList.filter(
          a => a.groupId === item.target.id && a.status === 'completed',
        );
        setTodoList(filteredEvent);
      }
      setIsFilterTask(!isFilterTask);
    }
  };

  const handleShowCompleted = () => {
    const a = taskStatus;
    if (a === 'completed') {
      setTaskStatus('new');
    } else {
      setTaskStatus('completed');
    }
  };

  const onRenderOption = (option: any) => {
    let wrapper: any = '';
    let color = type.standardFontColor;
    if (option.key === 'personalTask') {
      color = type.privateEventBorder;
    } else if (option.key === 'ateduTask') {
      color = type.classScheduleBorder;
    } else if (option.key === 'schoolTask') {
      color = type.schoolEventBorder;
    }
    const updatedStyle = { color: color };

    if (option.key !== 'allTask') {
      wrapper = <i className="custom-icon-event-check" style={updatedStyle} />;
    }

    return (
      <div className={styles.listStyle} style={{ display: 'flex' }}>
        <>
          <div style={{ width: '20px' }} id={option.key}>
            {wrapper}
          </div>
          <div style={iconStyles} id={option.key}>
            {option.text}
          </div>
        </>
      </div>
    );
  };

  const onDismissCalloutTask = () => {
    setIsFilterTask(false);
  };

  return (
    <div className={styles.teacherDashboardTodos}>
      <div className={styles.teacherTodoHeader}>
        {intl(LabelNames.allTasks)}
        <FontIcon
          iconName="ChevronDown"
          id="btnToggleFilter"
          className={styles.btnToggleView}
          onClick={toggleFilter}
        />
        {isFilterTask && (
          <Callout
            className={styles.callout}
            role="alertdialog"
            gapSpace={0}
            target={'#btnToggleFilter'}
            setInitialFocus
            directionalHint={DirectionalHint.bottomCenter}
            directionalHintFixed={false}
            onDismiss={onDismissCalloutTask}>
            <div>
              <div className={'ms-Grid-row ' + styles.calloutContainer}>
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div data-is-scrollable>
                    <List
                      items={options}
                      onRenderCell={onRenderOption}
                      onClick={e => {
                        onChangeScheduleRender(e);
                      }}
                    />
                  </div>
                </FocusZone>
              </div>
            </div>
          </Callout>
        )}
        <DialogConfimation
          dialogContentProps={dialogContentTodo}
          hideDialog={hideDialog}
          toggleHideDialog={toggleHideDialog}
          onConfirm={ConfirmHandler}
          text={null}
          spinner={false}
        />
      </div>
      <br />
      <hr className={styles.teacherTodosDivider} />
      <div className={'ms-Grid-row ' + styles.teacherTodoContainer}>
        <div className="ms-Grid-col ms-lg12">
          <TeacherTodoList
            taskStatus={'new'}
            itemlist={data.teacherTodoList.filter(
              a => a.status !== 'completed',
            )}
            onTaskFavorite={onTaskFavorite}
            onTaskCompleted={onTaskCompleted}
          />
        </div>
        <div
          className={'ms-Grid-col ms-lg12 ' + styles.teacherDivShowCompleted}>
          <div
            className={styles.btnShowCompleted}
            onClick={handleShowCompleted}>
            {taskStatus !== 'completed' ? (
              <>
                <FontIcon iconName="ChevronRight" /> &nbsp;{' '}
                {intl(LabelNames.showRecentlyCompleted)}
              </>
            ) : (
              <>
                <FontIcon iconName="ChevronDown" /> &nbsp;{' '}
                {intl(LabelNames.hideCompletedTasks)}
              </>
            )}
          </div>
        </div>
        {taskStatus === 'completed' && (
          <div className="ms-Grid-col ms-lg12">
            <TeacherTodoList
              taskStatus={'completed'}
              itemlist={completedTodoList}
              onTaskFavorite={onTaskFavorite}
              onTaskCompleted={onTaskCompleted}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboardTodos;
