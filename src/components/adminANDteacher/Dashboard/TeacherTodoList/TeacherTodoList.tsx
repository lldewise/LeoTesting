import React, { Fragment } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import styles from './TeacherTodoList.module.scss';
import moment from 'moment';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react';

const type = require('../../../../assets/ui-kit/_variables.scss');

const dpStyle: React.CSSProperties = {
  fontSize: '16px',
  marginRight: '5px',
  position: 'relative',
  top: '2px',
};

const favStyle: React.CSSProperties = {
  fontSize: '14px',
  marginTop: '5px',
  position: 'relative',
  top: '15px',
  color: type.schoolEventBorder,
};

type TeacherTodoListProps = {
  taskStatus: String;
  itemlist: any[];
  onTaskFavorite: (item: any) => void;
  onTaskCompleted: (item: any) => void;
};

const TeacherTodoList: React.FC<TeacherTodoListProps> = props => {
  const { itemlist, taskStatus, onTaskCompleted, onTaskFavorite } = props;
  const mode =
    taskStatus === 'completed' ? SelectionMode.none : SelectionMode.single;

  function handleCheckTask(item: any) {
    onTaskCompleted(item);
  }
  function handleCompleteTask(item: any) {
    if (item.status === 'new') {
      onTaskCompleted(item);
    }
  }
  function handleFavClick(item: any) {
    onTaskFavorite(item);
  }

  const _columns = [
    {
      key: 'column0',
      name: 'Name',
      fieldName: '',
      minWidth: 50,
      maxWidth: 50,
      onRender: (item: any) => {
        return (
          <>
            {item.status !== 'completed' && (
              <Checkbox
                className={styles.checkItem}
                onChange={e => handleCheckTask(item)}
              />
            )}
          </>
        );
      },
    },
    {
      key: 'column1',
      name: 'Name',
      fieldName: '',
      minWidth: 160,
      maxWidth: 160,
      onRender: (item: any) => {
        let color = null;
        let updatedStyle = null;
        let cmStyle = null;
        if (item.taskType === 'personalTask') {
          color = type.privateEventBorder;
        } else if (item.taskType === 'ateduTask') {
          color = type.classScheduleBorder;
        } else {
          color = type.schoolEventBorder;
        }
        if (item.status === 'completed') {
          updatedStyle = { ...dpStyle, color: color };
          cmStyle = {
            ...dpStyle,
            fontSize: '14px',
            color: type.standardFontColor,
            textDecorationLine: 'line-through',
          };
        } else {
          updatedStyle = { ...dpStyle, color: color };
          cmStyle = {
            ...dpStyle,
            fontSize: '14px',
            color: type.standardFontColor,
          };
        }
        return (
          <>
            <div onClick={e => handleCompleteTask(item)}>
              <div style={cmStyle}>{item.title}</div>
              <br />
              <div>
                <i className="custom-icon-event-check" style={updatedStyle} />
                <span className={styles.date}>
                  {moment(item.start).format('ddd,')}
                </span>
                &nbsp;
                <span className={styles.date}>
                  {moment(item.start).format('MMM DD,')}
                </span>
                &nbsp;
                <span className={styles.date}>
                  {moment(item.start).format('hh:MM A')}
                </span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      key: 'column2',
      name: '',
      fieldName: '',
      minWidth: 20,
      maxWidth: 20,
      onRender: (item: any) => {
        let wrapper: any = '';
        let updatedStyle = null;
        if (item.status === 'completed') {
          updatedStyle = { ...favStyle };
        } else {
          updatedStyle = { ...favStyle };
        }
        if (item.isFavorite) {
          wrapper = (
            <FontIcon
              iconName="FavoriteStarFill"
              style={favStyle}
              onClick={e => handleFavClick(item)}
            />
          );
        } else {
          wrapper = (
            <FontIcon
              iconName="FavoriteStar"
              style={updatedStyle}
              onClick={e => handleFavClick(item)}
            />
          );
        }
        return wrapper;
      },
    },
  ];

  return (
    <Fabric>
      <DetailsList
        items={itemlist}
        columns={_columns}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        selectionPreservedOnEmptyClick={true}
        selectionMode={mode}
        isHeaderVisible={false}
        onRenderRow={renderRow}
        checkboxVisibility={2}
      />
    </Fabric>
  );

  function renderRow(props: any) {
    return <DetailsRow rowFieldsAs={renderRowFields} {...props} />;
  }

  function renderRowFields(props: any) {
    return (
      <span>
        <DetailsRowFields {...props} />
      </span>
    );
  }
};

export default TeacherTodoList;
