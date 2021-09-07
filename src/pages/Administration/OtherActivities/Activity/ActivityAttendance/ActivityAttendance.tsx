import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useStore } from '../../../../../store/store';
import AttendanceList from './ActivityAttendanceList';
import AttendanceHeader from './ActivityAttendanceHeader';
import classes from './ActivityAttendance.module.scss';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  Slider,
  Toggle,
  Persona,
  PersonaSize,
  TextField,
  FontIcon,
  PrimaryButton,
  ActionButton,
  Panel,
  DialogType,
} from 'office-ui-fabric-react';
import moment from 'moment';
import apiGet from '../../../../../services/apiGet';
import { useBoolean } from '@uifabric/react-hooks';
import apiAdmin from '../../../../../services/apiAdmin';
import ActivityAttendancePanel from './ActivityAttendancePanel';
import DialogConfimation from '../../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { IUser } from '../../../../../model/user';

const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
const dialogContentConfirm = {
  type: DialogType.normal,
  styles: dialogStyles,
  title: 'Do you want to confirm this attendance?',
  closeButtonAriaLabel: 'Cancel',
  subText: 'You can always return here and make changes.',
};

type ActivityAttendanceProps = {
  saveData: any;
};

const ActivityAttendance: React.FC<ActivityAttendanceProps> = props => {
  const [data, dispatch] = useStore();
  const [column, setColumn] = useState<any[]>();
  //eslint-disable-next-line
  const [shimmer, setShimmer] = useState(true);

  const attendanceList = useRef(
    data.activityItemSelected.students.map((element: any, index: any) => {
      const item = {
        id: index,
        attendanceId: null,
        studentId: element.id,
        studentname: element.name,
        studentimage: null,
        percentage: 0,
        remarks: '',
        lastupdatedby: data.userProfile.imageInitials,
        lastupdatedimage: null,
        lastupdateddate: new Date(),
      };
      return item;
    }),
  );
  const [studentList, setStudentList] = useState<any[]>([]);
  const [presentList, setPresentList] = useState<any[]>([]);
  const [absentList, setAbsentList] = useState<any[]>([]);
  const [lateList, setLateList] = useState<any[]>([]);
  const [pivotCSS, setPivotCSS] = useState<string>('studentTab');
  const [filterText, setFilterText] = useState('');
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);
  const [calloutTargetId, setCalloutTargetId] = useState();
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [calloutdiv, setCalloutdiv] = useState<any[]>();

  const _onConfirm = () => {
    const dataToSave = attendanceList.current.filter(
      (a: any) => a.percentage > 0 || a.remarks !== null,
    );

    const items = dataToSave.map((a: any) => {
      const attendanceId =
        a.attendanceId !== null ? a.attendanceId.split('/')[1] : null;
      const value = {
        id: attendanceId,
        activtyId: data.activityItemSelected.id.split('/')[1],
        studentId: removeDash(a.studentId),
        remarks: a.remarks,
        percentage: a.percentage.toString(),
        modifiedby: data.userProfile.id,
      };
      return value;
    });
    saveData(items);
    toggleHideDialogConfirm();
  };

  const removeDash = (value: any) => {
    if (value.includes('/')) {
      value = value.split('/')[1];
    }
    return value;
  };

  const onSave = () => {
    toggleHideDialogConfirm();
  };

  const saveData = (items: any) => {
    apiAdmin
      .post(
        '/api/school/' + data.userProfile.school + '/admin/activity/attendance',
        items,
      )
      .then(() => {
        props.saveData();
      });
  };

  useEffect(() => {
    if (data.activityItemSelected.class.length > 0) {
      studentByClass(data.activityItemSelected.class);
    } else {
      getListofAttendance();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.activityAttendanceChanged) {
      var newData: any = [];
      attendanceList.current.forEach((element: any, index: any) => {
        const updateItem = data.activityAttendance.find(
          r => removeDash(r.studentId) === removeDash(element.studentId),
        );
        const item = {
          id: index,
          attendanceId: updateItem !== undefined ? updateItem.id : null,
          studentId:
            updateItem !== undefined ? updateItem.studentId : element.studentId,
          studentname: element.studentname,
          studentimage: null,
          percentage:
            updateItem !== undefined ? Number(updateItem.percentage) : 0,
          remarks: updateItem !== undefined ? updateItem.remarks : '',
          lastupdatedby: data.userProfile.imageInitials,
          lastupdatedimage: null,
          lastupdateddate:
            updateItem !== undefined
              ? new Date(updateItem.lastModifiedDate)
              : new Date(),
        };
        newData.push(item);
      });
      attendanceList.current = newData;
      if (pivotCSS === 'studentTab') {
        if (newData.filter((r: any) => r.percentage > 0).length > 0) {
          setColumn(_activityColumn);
        } else {
          setColumn(_activityColumn.filter(r => r.key !== '3'));
        }
      }
      updateTabList();
      setShimmer(false);
    }
  }, [data.activityAttendanceChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  const studentByClass = (classList: any[]) => {
    classList.forEach((element: any) => {
      setTimeout(() => {
        apiGet.get(
          'api/school/' +
            data.userProfile.school +
            '/teacher/staffId/class/' +
            removeDash(element.id) +
            '/students' +
            '?clientId=' +
            data.userExternalUnique,
        );
      }, 500);
    });
  };

  useEffect(() => {
    if (data.studentByClassChanged) {
      var updateData: any[] = [...attendanceList.current];
      const count: number = updateData.length;
      data.studentByClass.forEach((element: IUser, index: number) => {
        const item = {
          id: count + index,
          attendanceId: null,
          studentId: element.studentId,
          studentname: element.name,
          studentimage: null,
          percentage: 0,
          remarks: '',
          lastupdatedby: data.userProfile.imageInitials,
          lastupdatedimage: null,
          lastupdateddate: new Date(),
        };
        var exist = attendanceList.current.find(
          (r: any) => r.studentId == item.studentId,
        );
        if (exist === undefined) updateData.push(item);
      });

      attendanceList.current = updateData;
      getListofAttendance();
    }
  }, [data.studentByClassChanged]);
  useEffect(() => {
    return () => {
      dispatch('SETACTIVITYATTENDANCECHANGED', null);
      dispatch('SETSTUDENTBYCLASSCHANGED', null);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const getListofAttendance = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/admin/activity/attendance/' +
        data.activityItemSelected.id.split('/')[1] +
        '?clientId=' +
        data.userExternalUnique,
    );
  };

  const toggleHandler = (checked: any, id: any) => {
    var updateData = [...attendanceList.current];
    var index = updateData.findIndex(r => r.id === id);
    if (checked) {
      updateData[index].percentage = 0;
    } else {
      updateData[index].percentage = 100;
    }

    attendanceList.current = updateData;
    searhFilterHandler(filterText);
  };
  const sliderHandler = (value: any, id: any) => {
    var updateData = [...attendanceList.current];
    var index = updateData.findIndex(r => r.id === id);
    updateData[index].percentage = value;
    attendanceList.current = updateData;
    searhFilterHandler(filterText);
  };

  const textHandler = (ev: any, id: any) => {
    var updateData = [...attendanceList.current];
    var index = updateData.findIndex(r => r.id === id);
    updateData[index].remarks = ev.target.value;
    attendanceList.current = updateData;
    searhFilterHandler(filterText);
  };
  const onFilterHandler = (item: any) => {
    switch (item.props.itemKey) {
      case 'studentTab':
        if (
          attendanceList.current.filter((r: any) => r.percentage > 0).length > 0
        ) {
          setColumn(_activityColumn);
        } else {
          setColumn(_activityColumn.filter((r: any) => r.key !== '3'));
        }
        setPivotCSS(item.props.itemKey);
        break;
      case 'presentTab':
        var columns = _activityColumn.filter((r: any) => r.key !== '3');
        setColumn(columns);
        setPivotCSS(item.props.itemKey);
        break;
      case 'absentTab':
        setColumn(_activityColumn);
        setPivotCSS(item.props.itemKey);
        break;
      case 'latecomerTab':
        setColumn(_activityColumn);
        setPivotCSS(item.props.itemKey);
        break;
      default:
        break;
    }
  };

  const updateTabList = () => {
    setStudentList([...attendanceList.current]);
    setPresentList(
      attendanceList.current.filter((r: any) => r.percentage === 0),
    );
    setLateList(attendanceList.current.filter((r: any) => r.percentage === 50));
    setAbsentList(
      attendanceList.current.filter((r: any) => r.percentage === 100),
    );
  };

  const searhFilterHandler = (item: any) => {
    setFilterText(item);
    if (item !== undefined) {
      var result =
        item !== ''
          ? attendanceList.current.filter(
              (i: any) => i.studentname.toLowerCase().indexOf(item) > -1,
            )
          : attendanceList.current;
      setStudentList(result);
      setPresentList(result.filter((r: any) => r.percentage === 0));
      setLateList(result.filter((r: any) => r.percentage === 50));
      setAbsentList(result.filter((r: any) => r.percentage === 100));
    } else {
      updateTabList();
    }
  };

  const calloutClassHandler = (item: any, targetId: any) => {
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
              <div className={'padR5 ' + classes.contentIcon}>{element}</div>
            </div>
          </div>,
        );
    });
    setCalloutdiv(divContent);
    toggleIsCalloutVisible();
  };

  const _activityColumn: any[] = [
    {
      key: '0',
      name: 'Present',
      minWidth: 50,
      maxWidth: 50,
      isSorted: false,
      isSortedDescending: false,
      onRender: (item: any) => {
        return (
          <div className={classes.presentToggle}>
            <Toggle
              role="checkbox"
              checked={
                item.percentage !== 100 && item.percentage !== 50 ? true : false
              }
              onChange={(ev, checked) => {
                toggleHandler(checked, item.id);
              }}
              className="attendanceToggle"
            />
          </div>
        );
      },
    },

    {
      key: '1',
      name: 'Student',
      minWidth: 300,
      maxWidth: 300,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        // _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any) => {
        return (
          <div className={'showhim'}>
            <div className={classes.flex}>
              <div className={classes.flex + ' ' + classes.studentContent}>
                <div className="padR5">
                  <Persona
                    text={item.studentname}
                    imageUrl={item.studentimage}
                    size={PersonaSize.size32}
                  />
                </div>
              </div>
              {/* <div className={'showme'} onClick={getDoubleBooking}>
                <i
                  className={
                    'ms-Icon ms-Icon--SearchAndApps ' + classes.fontSearch
                  }
                  aria-hidden="true"></i>
              </div> */}
            </div>
          </div>
        );
      },
    },
    // {
    //   key: "2",
    //   name: "Class",
    //   minWidth: 150,
    //   maxWidth: 150,
    //   isSorted: false,
    //   isSortedDescending: false,
    //   onColumnClick: (ev, column) => {
    //     // _onColumnClickDrafts(ev, column, data.activityList);
    //   },
    //   onRender: (item, index) => {
    //     var content = "";
    //     var count = "";

    //     if (item.class.length >= 2) {
    //       count = item.class.length - 1;
    //     }
    //     if (item.class.length > 0) {
    //       content = item.class[0];
    //     }
    //     return (
    //       <div className={classes.flex}>
    //         <div className={classes.flex + "  " + classes.bgContent}>
    //           <div className="padR5">
    //             <FontIcon iconName="Group" className={classes.icon} />
    //           </div>
    //           <div className={"padR5 " + classes.contentIcon}>{content}</div>
    //         </div>
    //         <div
    //           className={"btnLinkDark " + classes.contentCount}
    //           id={"Class" + index}
    //           onClick={() => {
    //             calloutClassHandler(item, "Class" + index);
    //           }}>
    //           {item.class.length > 1 ? "+" : ""} {count}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      key: '3',
      name: 'Absence %',
      minWidth: 170,
      maxWidth: 170,
      isSorted: false,
      isSortedDescending: false,
      onRender: (item: any) => {
        return (
          <div>
            {item.percentage > 0 ? (
              <Slider
                min={0}
                max={100}
                step={50}
                value={item.percentage}
                showValue
                snapToStep
                onChanged={(ev, value) => {
                  sliderHandler(value, item.id);
                }}
                className={
                  item.percentage === 100
                    ? 'sliderBackground100'
                    : 'sliderBackground50'
                }
              />
            ) : (
              ''
            )}
          </div>
        );
      },
    },
    {
      key: '4',
      name: 'Remarks',
      minWidth: 170,
      maxWidth: 170,
      isSorted: false,
      isSortedDescending: false,

      onRender: (item: any, index: any) => {
        return (
          <div className={classes.RemarksDiv} key={index}>
            <TextField
              key={index}
              id={index}
              placeholder="Type here.."
              defaultValue={item.remarks}
              onChange={ev => textHandler(ev, item.id)}
            />
          </div>
        );
      },
    },
    {
      key: '5',
      name: 'Last Modified by',
      minWidth: 170,
      maxWidth: 170,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        // _onColumnClickDrafts(ev, column, data.activityList);
      },
      onRender: (item: any, index: any) => {
        return (
          <div className={classes.flex}>
            <div>
              <Persona
                imageInitials={item.lastupdatedby}
                imageUrl={item.lastupdateimage}
                size={PersonaSize.size32}
              />
            </div>
            <div className={classes.contentCount}>
              on {moment(item.lastupdateddate).format('MMM D, yyyy')}
            </div>
          </div>
        );
      },
    },
  ];

  // useEffect(() => {
  //   setColumn(_activityColumn);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDoubleBooking = () => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/admin/activity/conflict?datefrom=' +
          moment(new Date()).format('YYYY-MM-DD') +
          '&dateTo=' +
          moment(new Date()).format('YYYY-MM-DD') +
          '&clientId=' +
          data.userExternalUnique,
      )
      .then(function (response) {
        var data = JSON.parse(response.data);
        dispatch('ADDACTIVITYDATA', data);
      });
    openPanel();
  };

  return (
    <>
      <Panel
        headerText="Double Booking"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        isBlocking={false}
        closeButtonAriaLabel="Close"
        className={classes.doubleBookingPanel}>
        <ActivityAttendancePanel />
      </Panel>

      <DialogConfimation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={_onConfirm}
        spinner={false}
        text={null}
      />

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12">
          <AttendanceHeader searhFilter={searhFilterHandler} />
          <div className={classes.divBg + ' ' + classes.index1}>
            <div className={classes.headerFlex}>
              {/* <div className="padR5">
                <ActionButton
                  iconProps={{ iconName: 'Mail' }}
                  text="Double Bookings"
                  onClick={getDoubleBooking}
                  className={'btnPlain btnPrimary ' + classes.btnDoubleBooking}
                />
              </div> */}
              <div>
                <PrimaryButton
                  text="Confirm Attendance"
                  className="btnPrimary marginR15"
                  onClick={onSave}
                />
              </div>
            </div>
          </div>
          <div className={classes.divBg + ' ' + classes.index0}>
            <Pivot
              aria-label="Links of Large Tabs Pivot Example"
              linkFormat={PivotLinkFormat.tabs}
              linkSize={PivotLinkSize.large}
              onLinkClick={onFilterHandler}
              className={pivotCSS}>
              <PivotItem
                itemKey="studentTab"
                itemIcon="ContactCard"
                headerText={studentList.length + ' students'}
                headerButtonProps={{
                  style: { color: '#6c35d4', fontSize: '14px' },
                }}>
                <div className="studentBg AbsenceDetailListHeader">
                  <AttendanceList
                    itemlist={studentList}
                    _columns={column}
                    shimmer={shimmer}
                    targetId={calloutTargetId}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    calloutdiv={calloutdiv}
                    isCalloutVisible={isCalloutVisible}
                  />
                </div>
              </PivotItem>
              <PivotItem
                itemKey="presentTab"
                headerText={presentList.length + ' present'}
                itemIcon="SkypeCircleCheck"
                headerButtonProps={{
                  style: { color: '#6bb700', fontSize: '14px' },
                }}>
                <div className="presentBg AbsenceDetailListHeader">
                  <AttendanceList
                    itemlist={presentList}
                    _columns={column}
                    shimmer={shimmer}
                    targetId={calloutTargetId}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    calloutdiv={calloutdiv}
                    isCalloutVisible={isCalloutVisible}
                  />
                </div>
              </PivotItem>
              <PivotItem
                itemKey="absentTab"
                itemIcon="SkypeCircleMinus"
                headerButtonProps={{
                  style: { color: '#d43b35', fontSize: '14px' },
                }}
                headerText={absentList.length + ' absent'}>
                <div className="absentBg AbsenceDetailListHeader">
                  <AttendanceList
                    itemlist={absentList}
                    _columns={column}
                    shimmer={shimmer}
                    targetId={calloutTargetId}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    calloutdiv={calloutdiv}
                    isCalloutVisible={isCalloutVisible}
                  />
                </div>
              </PivotItem>
              <PivotItem
                itemKey="latecomerTab"
                itemIcon="AlertSolid"
                headerButtonProps={{
                  style: { color: '#f7a93b', fontSize: '14px' },
                }}
                headerText={lateList.length + ' latecomer'}>
                <div className="latecomerBg AbsenceDetailListHeader">
                  <AttendanceList
                    itemlist={lateList}
                    _columns={column}
                    shimmer={shimmer}
                    targetId={calloutTargetId}
                    toggleIsCalloutVisible={toggleIsCalloutVisible}
                    calloutdiv={calloutdiv}
                    isCalloutVisible={isCalloutVisible}
                  />
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityAttendance;
