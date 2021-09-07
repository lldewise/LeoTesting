import React, { Fragment, useEffect, useState } from 'react';
import styles from './OtherActivityCreate.module.scss';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
//import { useForm } from "react-hook-form";
import {
  PrimaryButton,
  DefaultButton,
  FontIcon,
  ActionButton,
} from 'office-ui-fabric-react';
import RightLayoutActivity from '../../../../components/layout/RightLayoutActivity/RightLayoutActivity';
import ActivitiesInformation from '../../../../components/adminANDteacher/OtherActivities/ActivitiesInformation/ActivitiesInformation';
import ActivitiesParticipants from '../../../../components/adminANDteacher/OtherActivities/ActivitiesParticipants/ActivitiesParticipants';
import { useStore } from '../../../../store/store';
import { useBoolean } from '@uifabric/react-hooks';
import moment from 'moment';
import apiGet from '../../../../services/apiGet';
import apiPost from '../../../../services/apiAdmin';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType, Persona, PersonaSize, Icon } from 'office-ui-fabric-react';
import { useHistory } from 'react-router-dom';
import classes from './OtherActivityCreate.module.scss';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

const dialogContent = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Close',
  subText: 'Are you sure you want to save this record?',
};
const typeSCSS = require('../../../../assets/ui-kit/_variables.scss');

const OtherActivityCreate: React.FC = () => {
  const { principal } = useAuthentication();
  const [data, dispatch] = useStore();
  const [groupValue, setGroupValue] = useState<any>();
  const [activityList, setActivityList] = useState(
    data.adminActivityDoubleList,
  );
  // eslint-disable-next-line
  const [sortToggle, { toggle: toggleSort }] = useBoolean(false);
  const intialValues = {
    type: null,
    title: null,
    startDate: new Date(),
    startTime: '7:00 AM',
    endDate: new Date(),
    endTime: '7:00 AM',
    account: '---',
    isShowInSchedule: true,
    status: true,
  };
  const [formValues, setFormValues] = useState<any | null>(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  //to be save upon clicking save button
  const [groupHold, setGroupHold] = useState<any[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);
  const [groupTeachers, setGroupTeachers] = useState<any[]>([]);
  const [groupRooms, setGroupRooms] = useState<any[]>([]);
  const [groupResources, setGroupResources] = useState<any[]>([]);

  const [studentList, setStudentList] = useState<any[] | []>([]);
  const [staffList, setStaffList] = useState<any[] | []>([]);
  const [classesList, setClassesList] = useState<any[] | []>([]);
  const [resourcesList, setResourcesList] = useState<any[] | []>([]);
  const [roomsList, setRoomsList] = useState<any[] | []>([]);
  // eslint-disable-next-line
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [isCallout, { setTrue: showCallOut, setFalse: hideCallOut }] =
    useBoolean(false);
  const [searchList, setSearchList] = useState<any[]>();
  const [defaultValue, setDefaultValue] = useState<any>();

  useEffect(() => {
    if (data.userProfile.id !== null) {
      getStudentBySchool();
    }
  }, [data.userProfile.id]); //eslint-disable-line react-hooks/exhaustive-deps

  const getStudentBySchool = () => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/student?clientId=' +
          data.userExternalUnique,
      )
      .then(() => {
        // setTimeout(() => {
        //   getStaffBySchool();
        // }, 1500);
      });
  };

  useEffect(() => {
    setStudentList(data.studentAccountList);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.staffAccountList?.length > 0) {
      setStaffList(data.staffAccountList);
    }
  }, [data.staffAccountList.length]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.classesBySchool?.length > 0) {
      setClassesList(data.classesBySchool);
    }
  }, [data.classesBySchool.length]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.resourcesBySchool?.length > 0) {
      setResourcesList(data.resourcesBySchool);
    }
  }, [data.resourcesBySchool.length]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.roomsBySchool?.length > 0) {
      setRoomsList(data.roomsBySchool);
    }
  }, [data.roomsBySchool.length]); //eslint-disable-line react-hooks/exhaustive-deps

  // const inputProps = {
  //   onBlur: (ev:any) => console.log('onBlur called'),
  //   onFocus: (ev:any) => console.log('onFocus called'),
  // };

  const handleChange = (e: any, item: any, fields: any) => {
    if (e != null) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      if (fields === 'status') {
        let stat = item;
        setFormValues({ ...formValues, [fields]: stat });
      } else {
        setFormValues({ ...formValues, [fields]: item });
      }
    }
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: any) => {
    let errors: any = {};
    if (!values.type) {
      errors.type = 'Please input required field';
    }
    if (!values.title) {
      errors.title = 'Please input required field';
    }
    // if (!values.startTime) {
    //   errors.startTime = 'Please input required field';
    // }
    // if (!values.endTime) {
    //   errors.endTime = 'Please input required field';
    // }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = () => {
    //TODO save data if form is valid
    // let data = {
    //   type: formValues.type,
    //   title: formValues.title,
    //   startDate: formValues.startDate,
    //   startTime: formValues.startTime,
    //   endDate: formValues.endDate,
    //   endTime: formValues.endTime,
    //   account: formValues.account,
    //   isShowInSchedule: formValues.isShowInSchedule,
    // };
    toggleHideDialog();
  };

  const ConfirmHandler = () => {
    const saveGroupHold: any[] = [];
    const saveGroupResources: any[] = [];
    const saveGroupAttendees: any[] = [];

    groupHold.forEach((item: any) => {
      saveGroupHold.push(item.id);
    });

    groupRooms.forEach((item: any) => {
      saveGroupResources.push(item.id);
    });

    groupResources.forEach((item: any) => {
      saveGroupResources.push(item.id);
    });

    groupStudents.forEach((item: any) => {
      if (item.studentId) {
        saveGroupAttendees.push('student/' + item.studentId);
      } else {
        saveGroupAttendees.push(item.id);
      }
    });

    groupTeachers.forEach((item: any) => {
      if (item.staffId) {
        saveGroupAttendees.push('staff/' + item.staffId);
      } else {
        saveGroupAttendees.push(item.id);
      }
    });

    if (data.activityItemSelected !== null) {
      var sdate =
        moment(formValues.startDate).format('YYYY-MM-DD') +
        'T' +
        moment(formValues.startTime, ['h:mm:ss A']).format('HH:mm:ss') +
        'Z';
      var edate =
        moment(formValues.endDate).format('YYYY-MM-DD') +
        'T' +
        moment(formValues.endTime, ['h:mm:ss A']).format('HH:mm:ss') +
        'Z';
      const activity: any = {
        id: data.activityItemSelected.id.split('/')[1],
        type: formValues.type,
        title: formValues.title,
        startDate: sdate,
        endDate: edate,
        account: formValues.account,
        showSchedule: formValues.isShowInSchedule,
        confirmed: formValues.status,
        classes: saveGroupHold,
        attendees: saveGroupAttendees,
        resources: saveGroupResources,
        note: formValues.note,
        // reserveParticipants: null,
      };

      apiPost
        .post(
          '/api/school/' + data.userProfile.school + '/admin/activity',
          activity,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${principal?.accessToken}`,
            },
          },
        )
        .then(function (response) {
          toggleHideDialog();
          setTimeout(() => {
            history.push('../activities');
          }, 2000);
        });
    } else {
      var sdate =
        moment(formValues.startDate).format('YYYY-MM-DD') +
        'T' +
        moment(formValues.startTime, ['h:mm:ss A']).format('HH:mm:ss') +
        'Z';
      var edate =
        moment(formValues.endDate).format('YYYY-MM-DD') +
        'T' +
        moment(formValues.endTime, ['h:mm:ss A']).format('HH:mm:ss') +
        'Z';
      const activity: any = {
        id: null,
        type: formValues.type,
        title: formValues.title,
        startDate: sdate,
        endDate: edate,
        account: formValues.account,
        showSchedule: formValues.isShowInSchedule,
        confirmed: formValues.status,
        classes: saveGroupHold,
        attendees: saveGroupAttendees,
        resources: saveGroupResources,
        note: formValues.note,
        // reserveParticipants: null,
      };

      apiPost
        .post(
          '/api/school/' + data.userProfile.school + '/admin/activity',
          activity,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${principal?.accessToken}`,
            },
          },
        )
        .then(function (response) {
          toggleHideDialog();
          setTimeout(() => {
            history.push('../activities');
          }, 2000);
        });
    }
  };

  const getTextFromItem = (item: any) => item.name;

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested tags',
    noResultsFoundText: 'No data found',
  };

  const groupHandler = (item: any) => {
    setGroupValue(item.text);
  };

  const getScheduleDouble = () => {
    var url =
      'api/school/' +
      data.userProfile.school +
      '/admin/activity/conflict?datefrom=' +
      moment(new Date(formValues.startDate)).format('YYYY-MM-DD') +
      '&dateTo=' +
      moment(new Date(formValues.endDate)).format('YYYY-MM-DD') +
      '&clientId=' +
      data.userExternalUnique;
    apiGet.get(url).then(function (response) {
      var data = JSON.parse(response.data);
      dispatch('ADDACTIVITYDATA', data);
    });
  };

  useEffect(() => {
    setActivityList(data.adminActivityDoubleList);
  }, [data.adminActivityDoubleList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.activityItemSelected !== null) {
      const intialValuesEdit: any = {
        type: data.activityItemSelected.type,
        title: data.activityItemSelected.title,
        startDate: new Date(),
        startTime: null,
        endDate: new Date(),
        endTime: null,
        account: data.activityItemSelected.account,
        isShowInSchedule: data.activityItemSelected.showInSchedule,
        status: data.activityItemSelected.status,
        note: data.activityItemSelected.note,
        id: data.activityItemSelected.id,
      };

      // const groupHold = [];
      // const groupRooms = [];
      // const groupResources = [];
      // const groupStudents = [];
      // const groupTeachers = [];

      // data.activityItemSelected.hold.forEach((item) => {
      //   groupHold.push({ name: item });
      // });

      // data.activityItemSelected.room.forEach((item) => {
      //   groupRooms.push({ name: item });
      // });

      // data.activityItemSelected.resources.forEach((item) => {
      //   groupResources.push({ name: item });
      // });

      // // data.activityItemSelected.student.forEach((item) => {
      // //   groupStudents.push({name:item})
      // // });

      // data.activityItemSelected.teacher.forEach((item) => {
      //   groupTeachers.push({ name: item });
      // });

      setGroupHold(data.activityItemSelected.class);
      setGroupRooms(data.activityItemSelected.rooms);
      setGroupResources(data.activityItemSelected.resources);
      setGroupStudents(data.activityItemSelected.students);
      setGroupTeachers(data.activityItemSelected.teachers);
      setFormValues(intialValuesEdit);
    }
  }, [data.activityItemSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchOnchanged = (item: any) => {
    setDefaultValue(item);
    if (item !== null && item !== '') {
      switch (groupValue) {
        case 'Class':
          classesDiv(classesList, item);
          break;
        case 'Students':
          peopleDiv(studentList, item);
          break;
        case 'Teachers':
          peopleDiv(staffList, item);
          break;
        case 'Rooms':
          roomsDiv(roomsList, item);
          break;
        case 'Resources':
          resourcesDiv(resourcesList, item);
          break;
        default:
          setSearchList([]);
          break;
      }
    } else {
      hideCallOut();
    }
  };

  const classesDiv = (data: any[], text: any) => {
    var div: any[] = [];

    var filter = data.filter(r =>
      r.name.toLowerCase().includes(text.toLowerCase()),
    );
    filter.forEach((item, i) => {
      div.push(
        <div key={i} className={classes.otherDivPadding}>
          <div
            className={'ms-Grid-row '}
            onClick={() => handleSelectedItemClick(item)}>
            <Icon
              iconName="Group"
              aria-hidden="true"
              style={{
                color: typeSCSS.classScheduleBorder,
                marginRight: '5px',
              }}
            />
            {item.name}
          </div>
        </div>,
      );
    });
    setSearchList(div);
    showCallOut();
  };

  const roomsDiv = (data: any[], text: any) => {
    var div: any[] = [];

    var filter = data.filter(r =>
      r.name.toLowerCase().includes(text.toLowerCase()),
    );
    filter.forEach((item, i) => {
      div.push(
        <div key={i} className={classes.otherDivPadding}>
          <div
            className={'ms-Grid-row'}
            onClick={() => handleSelectedItemClick(item)}>
            <Icon
              iconName="POI"
              aria-hidden="true"
              style={{
                color: typeSCSS.classScheduleBorder,
                marginRight: '5px',
              }}
            />
            {item.name}
          </div>
        </div>,
      );
    });
    setSearchList(div);
    showCallOut();
  };

  const resourcesDiv = (data: any[], text: any) => {
    var div: any[] = [];

    var filter = data.filter(r =>
      r.name.toLowerCase().includes(text.toLowerCase()),
    );
    filter.forEach((item, i) => {
      div.push(
        <div key={i} className={classes.otherDivPadding}>
          <div
            className={'ms-Grid-row '}
            onClick={() => handleSelectedItemClick(item)}>
            <Icon
              iconName="CubeShape"
              aria-hidden="true"
              style={{
                color: typeSCSS.classScheduleBorder,
                marginRight: '5px',
              }}
            />
            {item.name}
          </div>
        </div>,
      );
    });
    setSearchList(div);
    showCallOut();
  };

  const peopleDiv = (data: any[], text: any) => {
    var div: any[] = [];

    var filter = data.filter(
      r =>
        r.firstName.toLowerCase().includes(text.toLowerCase()) ||
        r.lastName.toLowerCase().includes(text.toLowerCase()),
    );
    filter.forEach((item, i) => {
      div.push(
        <div key={i}>
          <div
            className={'ms-Grid-row ' + classes.myProfileDivPadding}
            onClick={() => handleSelectedItemClick(item)}>
            <Persona
              imageUrl={undefined}
              text={item.lastName + ' ' + item.firstName}
              size={PersonaSize.size32}
            />
          </div>
        </div>,
      );
    });
    setSearchList(div);
    showCallOut();
  };

  const handleSelectedItemClick = (item: any) => {
    setDefaultValue(null);
    addToTable(item);
    hideCallOut();
  };

  const addToTable = (item: any) => {
    switch (groupValue) {
      case 'Class':
        let hold: any[] = [...groupHold];
        hold.push(item);
        setGroupHold(hold);
        break;
      case 'Students':
        let students: any[] = [...groupStudents];
        students.push(item);
        setGroupStudents(students);
        break;
      case 'Teachers':
        let teachers: any[] = [...groupTeachers];
        teachers.push(item);
        setGroupTeachers(teachers);
        break;
      case 'Rooms':
        let rooms: any[] = [...groupRooms];
        rooms.push(item);
        setGroupRooms(rooms);
        break;
      case 'Resources':
        let resources: any[] = [...groupResources];
        resources.push(item);
        setGroupResources(resources);
        break;
      default:
        break;
    }
  };

  const groupItem = (item: any, curData: any) => {
    var result = [...curData];
    var element = {
      key: item.id,
      name: item.lastName + ' ' + item.firstName,
    };
    result.push(element);
    return result;
  };

  const onDeleteItem = (item: any, group: any) => {
    switch (group) {
      case 'Class':
        let holdData: any[] = [...groupHold];
        let idxHold: any = holdData.findIndex(a => a.id === item.id);
        if (idxHold !== -1) {
          holdData.splice(idxHold, 1);
          setGroupHold(holdData);
        }
        break;
      case 'Students':
        let studentsData = [...groupStudents];
        let idxStudent = studentsData.findIndex(a => a.id === item.id);
        if (idxStudent !== -1) {
          studentsData.splice(idxStudent, 1);
          setGroupStudents(studentsData);
        }
        break;
      case 'Teachers':
        let teachersData = [...groupTeachers];
        let idxTeacher = teachersData.findIndex(a => a.id === item.id);
        if (idxTeacher !== -1) {
          teachersData.splice(idxTeacher, 1);
          setGroupTeachers(teachersData);
        }
        break;
      case 'Rooms':
        let roomsData = [...groupRooms];
        let idxRoom = roomsData.findIndex(a => a.id === item.id);
        if (idxRoom !== -1) {
          roomsData.splice(idxRoom, 1);
          setGroupRooms(roomsData);
        }
        break;
      case 'Resources':
        let resourcesData: any[] = [...groupResources];
        let idxResource: any = resourcesData.findIndex(
          (a: any) => a.id === item.id,
        );
        if (idxResource !== -1) {
          resourcesData.splice(idxResource, 1);
          setGroupResources(resourcesData);
        }
        break;
      default:
        break;
    }
  };

  const activityHandler = (data: any) => {
    setActivityList(data);
  };

  const refreshHandler = () => {
    getScheduleDouble();
  };

  let history: any = useHistory();

  function onCancel() {
    history.push('../activities');
  }

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContent}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        text={null}
        spinner={false}
      />
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 ">
          {/* header container*/}
          <div className={'ms-Grid-col ' + styles.headerContainer}>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                      <FontIcon iconName="EditCreate" />
                    </div>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.headertitle}>
                      Activity
                    </div>
                    <div className={'AttendanceHeader ' + styles.helpIcon}>
                      <ActionButton
                        iconProps={{ iconName: 'Unknown' }}
                        className={styles.actionButton}>
                        Help
                      </ActionButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="ms-Grid-row">
            <div
              className={
                'ms-Grid-col main-container customScroll ' + styles.container
              }>
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + styles.title}>
                  {data.activityItemSelected != null
                    ? 'Edit Activity'
                    : 'Create activity'}
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className={'ms-Grid-col ms-lg12 ' + styles.titledesc}>
                  {data.activityItemSelected != null
                    ? ' Edit activity for the activity in the school they will bedoing the activity.'
                    : ' Create activity for the activity in the school they will be doing the activity.'}
                </div>
              </div>
              <br />
              <div className="ms-Grid-row">
                <ActivitiesInformation
                  formValues={formValues}
                  formErrors={formErrors}
                  handleChange={handleChange}
                />
              </div>
              <br />
              <div className="ms-Grid-row">
                <ActivitiesParticipants
                  groupHandler={groupHandler}
                  searchOnchanged={searchOnchanged}
                  // filterSuggestedTags={filterSuggestedTags}
                  getTextFromItem={getTextFromItem}
                  pickerSuggestionsProps={pickerSuggestionsProps}
                  // inputProps={inputProps}
                  groupHold={groupHold}
                  groupStudents={groupStudents}
                  groupTeachers={groupTeachers}
                  groupRooms={groupRooms}
                  groupResources={groupResources}
                  onDeleteItem={onDeleteItem}
                  groupValue={groupValue}
                  isCalloutVisible={isCallout}
                  toggleIsCalloutVisible={toggleIsCalloutVisible}
                  searchList={searchList}
                  defaultValue={defaultValue}
                  handleChange={handleChange}
                  formValues={formValues}
                />
              </div>
              <br />
              <div className="ms-Grid-row">
                <div
                  className="ms-Grid-col ms-lg6"
                  style={{ textAlign: 'left' }}>
                  <span>
                    {data.activityItemSelected != null ? (
                      <DefaultButton
                        text="Delete Activity"
                        className="btnDanger marginR15"
                        //onClick={onCancel}
                      />
                    ) : (
                      ' '
                    )}
                  </span>
                </div>

                <div
                  className="ms-Grid-col ms-lg6"
                  style={{ textAlign: 'right' }}>
                  <span>
                    <DefaultButton
                      text="Cancel"
                      className="btnDefault marginR15"
                      onClick={onCancel}
                    />
                  </span>
                  <span className="padR10"></span>
                  <span>
                    <PrimaryButton
                      text="Save"
                      className="btnPrimary marginR15"
                      onClick={handleSaveClick}
                    />
                  </span>
                </div>
              </div>
              <br />
            </div>
            {/* <div className="ms-Grid-col main-right-panel">
              <div className="ms-Grid-col ms-lg12 rightpanel ">
                <RightLayoutActivity
                  activityList={activityList}
                  setActivityList={activityHandler}
                  refresh={refreshHandler}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherActivityCreate;
