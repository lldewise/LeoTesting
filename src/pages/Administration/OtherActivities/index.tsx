import React, { useEffect, useState, useRef } from 'react';
import classes from './OtherActivities.module.scss';
import {
  PrimaryButton,
  FontIcon,
  ActionButton,
  mergeStyleSets,
  SearchBox,
  IconButton,
  DialogType,
} from 'office-ui-fabric-react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import Calendar from '../../../components/fluentui/Calendar/Calendar';
import moment from 'moment';
import ActivitiesList from '../../../components/adminANDteacher/OtherActivities/ActivitiesList/ActivitiesList';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../store/store';
import apiGet from '../../../services/apiGet';
import { useBoolean } from '@uifabric/react-hooks';
import { truncateLongName } from '../../../util/commonFunction';
import { IResources } from '../../../model/resouces';
import { IActivity } from '../../../model/activity';
import apiAdmin from '../../../services/apiAdmin';
import DeleteDialogConfirmation from '../../../components/userInterface/DeleteDialogConfirmation/DeleteDialogConfirmation';
const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '130px',
  },
});

const dialogContentConfirm = {
  type: DialogType.largeHeader,
  title: 'Are you sure you want to delete this activity?',
  subText:
    'This action is irreversible and cannot be undone. All information in this activity will be deleted and will not be visible to all participants.',
  closeButtonAriaLabel: 'Cancel',
};

const OtherActivities: React.FC = () => {
  const [data, dispatch] = useStore();
  const [column, setColumn] = useState<any[] | []>();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [activityList, setActivityList] = useState(data.activityList);
  const [shimmer, setShimmer] = useState(true);
  let history: any = useHistory();
  const formatSelectedDate = (data: any) => {
    const dateSelected = moment(data).format('DD/MM-YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };
  // eslint-disable-next-line
  const [menucss, setMenucss] = useState();
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [calloutdiv, setCalloutdiv] = useState<any[]>();
  const [calloutTargetId, setCalloutTargetId] = useState();
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);
  const activitySelected = useRef<any>();

  const dateFromHandler = (data: any) => {
    setDateFrom(data);
  };
  const dateToHandler = (data: any) => {
    setDateTo(data);
  };

  const getActivityList = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/admin/actvity/list?clientId=' +
        data.userExternalUnique,
    );
  };

  const menuProps = {
    items: [
      {
        id: '1',
        key: 'edit',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
      },
      {
        id: '2',
        key: 'delete',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
      },
    ],
    onItemClick: (data: any, value: any) => {
      clickMenuHandler(data, value);
    },
  };

  const clickMenuHandler = (data: any, value: any) => {
    if (value.key === 'edit') {
      history.push('activities/create');
    }
    if (value.key === 'delete') {
      toggleHideDialogConfirm();
    }
  };

  const deleteActivity = () => {
    apiAdmin
      .delete(
        '/api/school/' +
          data.userProfile.school +
          '/admin/activity/' +
          removeDash(activitySelected.current.id),
      )
      .then(() => {
        var updateData: IActivity[] = [...data.activityList];
        var index = updateData.findIndex(
          (r: IActivity) => r.id == activitySelected.current.id,
        );
        updateData.splice(index, 1);
        setActivityList(updateData);
        toggleHideDialogConfirm();
      });
  };

  const deleteConfirmHandler = () => {
    deleteActivity();
  };

  const _onColumnClickDrafts = (ev: any, column: any, value: any[]) => {
    const newColumns: any[] = _activityColumn.slice();
    const currColumn: any = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];

    let newItems: any[] = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending,
    );

    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev: any, column: any) => {
          _onColumnClickDrafts(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    setActivityList(newItems);
    setColumn(newColumns);
  };

  const manageCalloutHandler = (item: any) => {
    activitySelected.current = item;
    item.students.forEach((r: any) => {
      var student = studentList.current.find(
        (a: any) => a.studentId == removeDash(r.id),
      );
      if (student !== undefined) {
        r.name = student.name;
      }
    });
    dispatch('SELECTEDACTIVITYITEM', item);
  };

  const CreateHandler = () => {
    dispatch('SELECTEDACTIVITYITEM', null);
    history.push('./activities/create');
  };

  const calloutHoldHandler = (item: any, targetId: any) => {
    setCalloutTargetId(targetId);
    let divContent: any[] = [];
    item.class.forEach((element: any, index: any) => {
      if (index > 0)
        divContent.push(
          <div className="padT5">
            <div key={index} className={classes.flex + ' ' + classes.bgContent}>
              <div className="padR5">
                <FontIcon iconName="Group" className={classes.icon} />
              </div>
              <div className={'padR5 ' + classes.contentIcon}>
                {element.name}
              </div>
            </div>
          </div>,
        );
    });
    setCalloutdiv(divContent);
    toggleIsCalloutVisible();
  };

  const calloutTeacherHandler = (item: any, targetId: any) => {
    setCalloutTargetId(targetId);
    let divContent: any[] = [];
    item.teachers.forEach((element: any, index: any) => {
      if (index > 0)
        divContent.push(
          <div className="padT5">
            <Persona
              imageUrl={undefined}
              text={element.name}
              size={PersonaSize.size24}
            />
          </div>,
        );
    });
    setCalloutdiv(divContent);
    toggleIsCalloutVisible();
  };

  const calloutRoomHandler = (item: any, targetId: any) => {
    setCalloutTargetId(targetId);
    let divContent: any[] = [];
    item.rooms.forEach((element: any, index: any) => {
      if (index > 0)
        divContent.push(
          <div className="padT5">
            <div key={index} className={classes.flex + ' ' + classes.bgContent}>
              <div className="padR5">
                <FontIcon iconName="POI" className={classes.icon} />
              </div>
              <div className={'padR5 ' + classes.contentIcon}>
                {element.name}
              </div>
            </div>
          </div>,
        );
    });
    setCalloutdiv(divContent);
    toggleIsCalloutVisible();
  };

  const calloutResourcesHandler = (item: any, targetId: any) => {
    setCalloutTargetId(targetId);
    let divContent: any[] = [];
    item.resources.forEach((element: any, index: any) => {
      if (index > 0)
        divContent.push(
          <div className="padT5">
            <div key={index} className={classes.flex + ' ' + classes.bgContent}>
              <div className="padR5">
                <FontIcon iconName="CubeShape" className={classes.icon} />
              </div>
              <div className={'padR5 ' + classes.contentIcon}>
                {element.name}
              </div>
            </div>
          </div>,
        );
    });
    setCalloutdiv(divContent);
    toggleIsCalloutVisible();
  };

  const gotoActivityHandler = (item: any) => {
    item.students.forEach((r: any) => {
      var student = studentList.current.find(
        (a: any) => a.studentId == removeDash(r.id),
      );
      if (student !== undefined) {
        r.name = student.name;
      }
    });
    dispatch('SELECTEDACTIVITYITEM', item);
    history.push('activities/details');
  };

  const removeDash = (value: any) => {
    if (value.includes('/')) {
      value = value.split('/')[1];
    }
    return value;
  };

  const _activityColumn: any[] = [
    {
      key: '0',
      name: 'Title',
      minWidth: 190,
      maxWidth: 300,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any) => {
        return (
          <div className={classes.flexTitle}>
            <div className={classes.activityTitle + ' ' + classes.content}>
              <div
                className={'btnLinkStandard ' + classes.flexWrapContent}
                onClick={() => {
                  gotoActivityHandler(item);
                }}>
                {item.title}
              </div>
            </div>
            <div>
              <IconButton
                id={'moreLink' + item.id}
                iconProps={{
                  iconName: 'moreVertical',
                  onClick: () => manageCalloutHandler(item),
                }}
                className="btnIcon btnIconDark btnIconLg hideMenuIcon"
                menuProps={menuProps}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: '1',
      name: 'Start',
      minWidth: 80,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any) => {
        return (
          <div className={classes.content}>
            <div className={classes.flexWrapContent}>
              {moment(item.start).format('DD/MM-YYYY HH:mm')}
            </div>
          </div>
        );
      },
    },
    {
      key: '2',
      name: 'End',
      minWidth: 80,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any) => {
        return (
          <div className={classes.content}>
            <div className={classes.flexWrapContent}>
              {moment(item.end).format('DD/MM-YYYY HH:mm')}
            </div>
          </div>
        );
      },
    },
    {
      key: '3',
      name: 'Class',
      minWidth: 160,
      maxWidth: 200,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any, index: any) => {
        var content: any = '';
        var count: any = '';

        if (item.class.length >= 2) {
          count = item.class.length - 1;
        }
        if (item.class.length > 0) {
          content = item.class[0].name;
        }

        return (
          <div>
            {item.class.length > 0 && (
              <div className={classes.flex}>
                <div className={classes.flex + '  ' + classes.bgContent}>
                  <div className="padR5">
                    <FontIcon iconName="Group" className={classes.icon} />
                  </div>
                  <div className={'padR5 ' + classes.contentIcon}>
                    {truncateLongName(content, 12)}
                  </div>
                </div>
                <div
                  className={'btnLinkDark ' + classes.contentCount}
                  id={'class' + index}
                  onClick={() => {
                    calloutHoldHandler(item, 'class' + index);
                  }}>
                  {item.class.length > 1 ? '+' : ''} {count}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: '4',
      name: 'Teacher',
      minWidth: 160,
      maxWidth: 200,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any, index: any) => {
        var content: any = '';
        var count: any = '';

        if (item.teachers.length >= 2) {
          count = item.teachers.length - 1;
        }
        if (item.teachers.length > 0) {
          content = item.teachers[0].name;
        }

        return (
          <div>
            {item.teachers.length > 0 && (
              <div className={classes.flex}>
                <div className={'padR5 ' + classes.bgContent}>
                  <Persona
                    imageUrl={undefined}
                    text={content}
                    size={PersonaSize.size24}
                  />
                </div>
                <div
                  className={'btnLinkDark ' + classes.contentCount}
                  id={'Teacher' + index}
                  onClick={() => {
                    calloutTeacherHandler(item, 'Teacher' + index);
                  }}>
                  {item.teachers.length > 1 ? '+' : ''} {count}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: '5',
      name: 'Room',
      minWidth: 130,
      maxWidth: 160,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any, index: any) => {
        var content: any = '';
        var count: any = '';

        if (item.rooms.length >= 2) {
          count = item.rooms.length - 1;
        }
        if (item.rooms.length > 0) {
          content = item.rooms[0].name;
        }

        return (
          <div>
            {item.rooms.length > 0 && (
              <div className={classes.flex}>
                <div className={classes.flex + '  ' + classes.bgContent}>
                  <div className="padR5">
                    <FontIcon iconName="POI" className={classes.icon} />
                  </div>
                  <div className={'padR5 ' + classes.contentIcon}>
                    {content}
                  </div>
                </div>
                <div
                  className={'btnLinkDark ' + classes.contentCount}
                  id={'Room' + index}
                  onClick={() => {
                    calloutRoomHandler(item, 'Room' + index);
                  }}>
                  {item.rooms.length > 1 ? '+' : ''} {count}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: '6',
      name: 'Resources',
      minWidth: 140,
      maxWidth: 200,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any, index: any) => {
        var content: any = '';
        var count: any = '';

        if (item.resources.length >= 2) {
          count = item.resources.length - 1;
        }
        if (item.resources.length > 0) {
          content = item.resources[0].name;
        }

        return (
          <div>
            {item.resources.length > 0 && (
              <div className={classes.flex}>
                <div className={classes.flex + '  ' + classes.bgContent}>
                  <div className="padR5">
                    <FontIcon iconName="CubeShape" className={classes.icon} />
                  </div>
                  <div className={'padR5 ' + classes.contentIcon}>
                    {content}
                  </div>
                </div>
                <div
                  className={'btnLinkDark ' + classes.contentCount}
                  id={'Resources' + index}
                  onClick={() => {
                    calloutResourcesHandler(item, 'Resources' + index);
                  }}>
                  {item.resources.length > 1 ? '+' : ''} {count}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: '7',
      name: 'Status',
      minWidth: 80,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any) => {
        // eslint-disable-next-line
        var classWarning = !item.status ? classes.cancelColor : '';
        var icon: any = !item.status ? (
          <FontIcon iconName="StatusErrorFull" className={classes.cross} />
        ) : (
          <FontIcon iconName="CompletedSolid" className={classes.check} />
        );
        return <div className="text-center">{icon}</div>;
      },
    },
  ];
  useEffect(() => {
    setColumn(_activityColumn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const _onChangeText = (ev: any, text: any) => {
    var filter = text.toLowerCase();
    var filteredList = data.activityList.filter(
      r =>
        r.steachers.toLowerCase().includes(filter) ||
        r.title.toLowerCase().includes(filter) ||
        r.sclass.toLowerCase().includes(filter) ||
        r.srooms.toLowerCase().includes(filter) ||
        r.sresources.toLowerCase().includes(filter),
    );

    if (dateFrom && dateTo) {
      filteredList = filteredList.filter(
        r =>
          moment(r.start) >= moment(dateFrom) &&
          moment(r.end) <= moment(dateTo),
      );
    }

    setActivityList(filteredList);
  };

  useEffect(() => {
    _onChangeText(null, '');
  }, [dateTo]);

  useEffect(() => {
    _onChangeText(null, '');
  }, [dateFrom]);

  useEffect(() => {
    if (data.activityListChanged) {
      updateIdsName();
    }
  }, [data.activityListChanged]);

  useEffect(() => {
    return () => {
      dispatch('SETRESOUCESCHANGED', null);
      dispatch('SETACTIVITYLISTCHANGED', null);
      dispatch('SETCLASSBYSCHOOLCHANGED', null);
      dispatch('CLEANUPRANDOMIZEDDATACHANGED', null);
    };
  }, []);

  const updateIdsName = () => {
    var updatedata: IActivity[] = [...data.activityList];
    var resoucesList: IResources[] = [...data.resourcesBySchool];
    var roomsList: IResources[] = [...data.roomsBySchool];
    updatedata.forEach((element: IActivity) => {
      element.rooms = idsLookUp(element.roomsresources, roomsList);
      element.resources = idsLookUp(element.roomsresources, resoucesList);
      element.class = idsLookUp(element.class, data.classesBySchool);
      element.teachers = idsTeacher(element.teachers, data.staffAccountList);
      element.steachers = ConvertToString(element.teachers);
      element.srooms = ConvertToString(element.rooms);
      element.sclass = ConvertToString(element.class);
      element.sresources = ConvertToString(element.resources);
    });
    setShimmer(false);
    setActivityList(updatedata);
  };

  const ConvertToString = (data: any) => {
    let result: any = '';
    if (data !== null) {
      data.forEach((item: any) => {
        result = result + ' ' + item.name;
      });
    }
    return result;
  };

  const idsTeacher = (data: any[], lookUp: any[]) => {
    var result: any[] = [];
    if (data !== null) {
      data.forEach((element: any) => {
        var name: any = lookUp.find(
          (r: any) => r.staffId === element.id.split('/')[1],
        );
        if (name !== undefined) {
          const item = {
            id: element.id,
            name: name.name,
          };
          result.push(item);
        }
      });
    }
    return result;
  };

  const idsLookUp = (data: any[], lookUp: any[]) => {
    var result: any[] = [];
    if (data !== null) {
      data.forEach((element: any) => {
        var name: any = lookUp.find((r: any) => r.id === element.id);
        if (name != undefined) {
          const item = {
            id: element.id,
            name: name.name,
          };
          result.push(item);
        }
      });
    }
    return result;
  };

  useEffect(() => {
    if (data.userProfile.id) {
      loadInitialdata();
    }
  }, [data.userProfile.id]);

  const loadInitialdata = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/teacher?clientId=' +
        data.userExternalUnique,
    );

    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/student?clientId=' +
        data.userExternalUnique,
    );

    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/admin/resources/list?clientId=' +
        data.userExternalUnique,
    );
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/admin/classes/list?clientId=' +
        data.userExternalUnique,
    );
  };

  useEffect(() => {
    if (
      data.resourcesBySchoolChanged &&
      data.classesBySchoolChanged &&
      data.staffAccountListChanged
    ) {
      getActivityList();
    }
  }, [
    data.resourcesBySchoolChanged,
    data.classesBySchoolChanged,
    data.staffAccountListChanged,
  ]);

  useEffect(() => {
    if (data.studentAccountByIdChanged) {
      let items: any = data.studentAccountByIds;
      let list: any[] = data.studentAccountList;
      if (items) {
        items.forEach((a: any) => {
          let user = list.find(r => r.userId === a.userId);
          if (!user) {
            getUserDetails(a.userId);
          } else {
            studentList.current = data.studentAccountList;
          }
        });
      }
    }
  }, [data.studentAccountByIdChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  const getUserDetails = (name: any) => {
    if (name !== '') {
      const p = {
        clientId: data.userExternalUnique,
      };
      apiGet.get('api/school/' + data.userProfile.school + '/user/' + name, {
        params: p,
      });
    }
  };

  const studentList = useRef<any[]>([]);
  useEffect(() => {
    if (data.studentAccountListChanged) {
      studentList.current = [...data.studentAccountList];
    }
  }, [data.studentAccountListChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  const onCancel = () => {
    toggleHideDialogConfirm();
  };

  return (
    <>
      <DeleteDialogConfirmation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={deleteConfirmHandler}
        spinner={false}
        onCancel={onCancel}
      />
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 ">
          {/* header container*/}
          <div className={'ms-Grid-col ' + classes.headerContainer}>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                      <FontIcon iconName="EditCreate" />
                    </div>
                    <div
                      className={'ms-Grid-col ms-lg1 ' + classes.headertitle}>
                      Activity
                    </div>
                    <div className={'AttendanceHeader ' + classes.helpIcon}>
                      <ActionButton
                        iconProps={{ iconName: 'Print' }}
                        className={classes.actionButton}>
                        Print
                      </ActionButton>
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
          {/* --content-- */}
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 ">
              <div className={classes.titleContainer}>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + classes.title}>
                    List of activities
                  </div>
                </div>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + classes.titledesc}>
                    Manage other activities here
                  </div>
                </div>
                <br />
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
                    <div className={'padR10 ' + classes.calendar}>
                      <Calendar
                        value={dateFrom}
                        formatSelectedDate={formatSelectedDate}
                        onSelectDate={dateFromHandler}
                        styles={controlClass.control}
                        placeholder={'dd/mm-yyyy'}
                      />
                    </div>
                    <div className={'padR10 padT5'}>to</div>
                    <div className={'padR10 ' + classes.calendar}>
                      <Calendar
                        value={dateTo}
                        formatSelectedDate={formatSelectedDate}
                        onSelectDate={dateToHandler}
                        styles={controlClass.control}
                        placeholder={'dd/mm-yyyy'}
                      />
                    </div>
                    <div className={classes.search} id="testing101">
                      <SearchBox
                        placeholder="Search title, hold, teacher, room, resource"
                        onChange={(ev, newValue) => _onChangeText(ev, newValue)}
                      />
                    </div>
                    <div className={classes.bottom}>
                      <PrimaryButton
                        onClick={() => {
                          CreateHandler();
                        }}
                        text={'Create Activity'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-Grid-row ">
                <div
                  className={'ms-Grid-col ms-lg12 ' + classes.tableContainer}>
                  <ActivitiesList
                    itemlist={activityList}
                    _columns={column}
                    shimmer={shimmer}
                    isCalloutVisible={isCalloutVisible}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    calloutdiv={calloutdiv}
                    targetId={calloutTargetId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherActivities;
function _copyAndSort(items: any[], columnKey: any, isSortedDescending: any) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}
