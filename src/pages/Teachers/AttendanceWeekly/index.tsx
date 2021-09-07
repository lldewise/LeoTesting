import React, { Fragment, useEffect, useState } from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import styles from './AttendanceWeekly.module.scss';
import { DefaultButton } from 'office-ui-fabric-react';
import TeacherWeeklyAttendance from '../../../components/adminANDteacher/TeacherWeeklyAttendance/TeacherWeeklyAttendance';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import moment from 'moment';
import { useStore } from '../../../store/store';
import apiGet from '../../../services/apiGet';
import apiTeacher from '../../../services/apiTeacher';
import _ from 'lodash';
import DialogConfirmationAttendance from '../../../components/userInterface/DialogConfirmationAttendance/DialogConfirmationAttendance';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean } from '@uifabric/react-hooks';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { getWeekRange } from '../../../util/commonFunction';
import { useAuthentication } from '../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

const type = require('../../../assets/ui-kit/_variables.scss');

const ddlSubject = {
  root: {
    width: '220px',
    marginLeft: '-30px',
  },
  title: {
    fontSize: '20px',
    backgroundColor: type.grayBackground,
    fontWeight: '400',
  },
  dropdownOptionText: { fontSize: '20px', height: '22px' },
};

const dialogContentConfirm = {
  type: DialogType.normal,
  title: 'Do you want to confirm this attendance?',
  closeButtonAriaLabel: 'Cancel',
  subText: 'You can always return here and make changes.',
};

const AttendanceWeekly: React.FC = () => {
  const { principal } = useAuthentication();
  const [data] = useStore();
  const [selectedLessonByStaff, setSelectedLessonByStaff] = useState<
    any | null
  >(getSelectedSubj);
  const [subjectList] = useState(data.teacherLessonsByStaffPerWeek);
  const [studentList, setStudentList] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [montlySched, setMontlySched] = useState<any[]>([]);
  // eslint-disable-next-line
  const [missingRegistration, setMissingRegistration] = useState(
    data.teacherLessonsByStaffPerWeek,
  );
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);
  const [toggleWarning, setToggleWarning] = useState(false);
  const [toggleSave, setToggleSave] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(true);
  const [absencesList, setAbsencesList] = useState<any[]>([]);
  // eslint-disable-next-line
  const [attendanceList, setAttendanceList] = useState(
    data.teacherAttendanceByLesson,
  );
  const [shimmer, setShimmer] = useState(true);

  const week = getWeekRange(selectedDate);

  //function call
  function getSelectedSubj() {
    const item = data.selectedLessonsByStaff.class;
    if (item) {
      return item.split('/')[1];
    } else {
      return null;
    }
  }

  function filterEvent(date: Date) {
    const items = [...data.teacherLessonsByStaffPerWeek];
    const list = items.filter(
      a =>
        a.class.split('/')[1] === selectedLessonByStaff &&
        moment(a.start).format('YYYY-MM-DD') >=
          moment(week.from).format('YYYY-MM-DD') &&
        moment(a.start).format('YYYY-MM-DD') <=
          moment(week.to).format('YYYY-MM-DD'),
    );
    if (list.length > 0) {
      list.forEach(a => {
        if (
          a.confirmed === false &&
          moment(a.start).format('YYYY-MM-DD') <=
            moment(new Date()).format('YYYY-MM-DD') &&
          moment(a.start).format('YYYY-MM-DD') <=
            moment(date).format('YYYY-MM-DD')
        ) {
          setHasConfirmed(false);
        }
      });
    }
    return list;
  }

  function _onDropdownChanged(evt: any) {
    setShimmer(true);
    setStudentList([]);
    setSelectedLessonByStaff(evt.key);
  }

  const renderOptions = (items: any) => {
    const groups = _.chain(items)
      .groupBy('class')
      .map((data, classes) => ({ classes, data }))
      .value();

    const i = [];
    for (let a = 0; a < groups.length; a++) {
      const title = groups[a].classes.split('/')[1];
      i.push({
        key: title,
        text: title,
        title: title,
      });
    }
    return i;
  };

  const onSearchHandler = (ev: any) => {
    const updateData: any[] = studentList;
    if (ev !== undefined) {
      const value = ev.target.value;
      const newdata = updateData.filter(
        i => i.idUser.toLowerCase().indexOf(value) > -1,
      );
      const onSearch = value ? newdata : updateData;
      setStudentList(onSearch);
    } else {
      setStudentList(updateData);
    }
  };

  const selectedDateHandler = (value: any) => {
    const items: any = absencesList;
    if (hasConfirmed && items === null) {
      setSelectedDate(value);
      setShimmer(true);
    } else if (hasConfirmed && items.AbsentList?.length === 0) {
      setSelectedDate(value);
      setHasConfirmed(false);
    } else {
      setToggleWarning(true);
    }
  };

  const handleconfirmAttendance = () => {
    toggleHideDialogConfirm();
  };

  const AttendanceConfirmHandler = () => {
    if (toggleWarning) {
      setToggleWarning(false);
    }
    const items = [...data.teacherLessonsByStaffPerWeek].filter(
      a => a.class.split('/')[1] === selectedLessonByStaff,
    );
    const dataToBeSave: any[] = [];
    const week = getWeekRange(selectedDate);
    items.forEach(a => {
      if (
        moment(a.start).format('YYYY-MM-DD') <=
          moment(new Date()).format('YYYY-MM-DD') &&
        moment(a.start).format('YYYY-MM-DD') >=
          moment(week.from).format('YYYY-MM-DD') &&
        moment(week.from).format('YYYY-MM-DD') &&
        moment(a.start).format('YYYY-MM-DD') <=
          moment(week.to).format('YYYY-MM-DD')
      ) {
        dataToBeSave.push(a);
      }
    });
    saveData(dataToBeSave);
  };

  const saveData = (itemList: any[]) => {
    const lessons: any[] = [];
    const attendance: any[] = [];
    itemList.forEach(a => {
      if (!a.confirmed) {
        const list = {
          lessonId: a.id,
          classId: a.class,
          start: a.start,
          end: a.end,
          week: a.week.toString(),
          confirmed: 'true',
        };
        lessons.push(list);
      }
    });

    if (absencesList && absencesList?.length > 0) {
      const absent = [...absencesList]?.filter(a => a.IsAbsent === true);
      const present = [...absencesList]?.filter(a => a.IsAbsent === false);
      absent.forEach(a => {
        const item = {
          Id: a.Id,
          SubjectId: a.SubjectId,
          TeacherId: a.TeacherId,
          StudentId: a.StudentId,
          Remarks: a.Remarks,
          Percentage: a.Percentage,
          AbsentType: a.AbsentType,
        };
        attendance.push(item);
      });
      if (present.length > 0) {
        saveUpdatedData(present);
      }
    }

    apiTeacher
      .post(
        '/api/school/' + data.userProfile.school + '/teacher/lesson/week',
        lessons,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          if (attendance && attendance.length > 0) {
            apiTeacher
              .post(
                '/api/school/' +
                  data.userProfile.school +
                  '/teacher/attendance/week',
                attendance,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Correlation-Id': uuidv4(),
                    Authorization: `Bearer ${principal?.accessToken}`,
                  },
                },
              )
              .then(res => {});
          }
          setAbsencesList([]);
          setHasConfirmed(true);
          setToggleSave(true);
        }
      });
    toggleHideDialogConfirm();
    setTimeout(() => {
      setToggleSave(false);
    }, 2500);
  };

  //save attendance and remove from data service if present
  //per entity
  const saveUpdatedData = (items: any[]) => {
    items.forEach(a => {
      apiTeacher
        .delete(
          'api/school/' +
            data.userProfile.school +
            '/teacher/attendance/' +
            a.Id.split('/')[1].toString(),
        )
        .then(response => {});
    });
  };

  const closeErrMessage = () => {
    setToggleWarning(!toggleWarning);
  };

  const closeSuccessMessage = () => {
    if (toggleSave) {
      setToggleSave(false);
    }
  };

  const handleAbsencesHander = (
    isCheck: boolean | undefined,
    item: any,
    id: string,
    attendanceId: string,
  ) => {
    if (toggleWarning) {
      setToggleWarning(false);
    }
    if (toggleSave) {
      setToggleSave(false);
    }
    let absences: any[] = [];

    if (absencesList !== null) {
      absences = [...absencesList];
    }
    const idx = absences.findIndex(
      obj => obj.StudentId === item.id && obj.SubjectId === id,
    );
    if (idx !== -1) {
      absences.splice(idx, 1);
    } else {
      absences.push({
        Id: attendanceId,
        SubjectId: id,
        TeacherId: 'staff/' + data.userExternalId,
        StudentId: item.id,
        Remarks: 'approved',
        Percentage: '100',
        AbsentType: 'attendance-type/absent',
        IsAbsent: !isCheck,
      });
    }
    setAbsencesList(absences);
  };

  const loadAbsencesListFromDb = (itemList: any[]) => {
    //attendance by lessons
    if (itemList.length > 0) {
      const staffId = data.userData?.staff[0].split('/')[1];

      itemList.forEach(a => {
        const id = a.id.split('/')[1];
        const p = {
          clientId: data.userExternalUnique,
        };
        setTimeout(() => {
          apiGet
            .get(
              'api/school/' +
                data.userProfile.school +
                '/teacher/' +
                staffId +
                '/lessons/' +
                id +
                '/attendance',
              { params: p },
            )
            .then(response => {});
        }, 200);
      });
    }
  };

  //student by class
  useEffect(() => {
    if (data.userData.affiliations) {
      if (data.teacherLessonsByStaffPerWeek.length > 0) {
        const staffId = data.userData?.staff[0].split('/')[1];
        apiGet
          .get(
            '/api/school/' +
              data.userProfile.school +
              '/teacher/' +
              staffId +
              '/class/' +
              selectedLessonByStaff +
              '/students?clientId=' +
              data.userExternalUnique,
          )
          .then(res => {});
      }
    }
  }, [selectedLessonByStaff]); // eslint-disable-line react-hooks/exhaustive-deps

  //lesson by staff
  useEffect(() => {
    if (data.userProfile.id) {
      const staffId = data.userData?.staff[0].split('/')[1];
      apiGet
        .get(
          'api/school/' +
            data.userProfile.school +
            '/teacher/' +
            staffId +
            '/lessons/week?clientId=' +
            data.userExternalUnique +
            '&date=' +
            moment(selectedDate).format('YYYY-MM-DD'),
        )
        .then(response => {});
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  //loading data
  useEffect(() => {
    setTimeout(() => {
      setShimmer(false);
    }, 3000);
  }, [selectedDate, selectedLessonByStaff]);

  useEffect(() => {
    setHasConfirmed(true);
    setMontlySched(filterEvent(selectedDate));
    setMissingRegistration(data.teacherLessonsByStaffPerWeek);
  }, [selectedLessonByStaff]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.teacherLessonsByStaffPerWeekUniqueId !== null) {
      setHasConfirmed(true);
      setMontlySched(filterEvent(selectedDate));
    }
  }, [data.teacherLessonsByStaffPerWeekUniqueId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setStudentList(data.teacherStudentsListByClass);
  }, [data.teacherStudentsListByClass]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.teacherLessonsByStaffPerWeek.length > 0) {
      const list = [...data.teacherLessonsByStaffPerWeek];
      const listItems = list.filter(
        a =>
          a.class.split('/')[1] === selectedLessonByStaff &&
          moment(a.start).format('YYYY-MM-DD') >=
            moment(week.from).format('YYYY-MM-DD') &&
          moment(a.start).format('YYYY-MM-DD') <=
            moment(week.to).format('YYYY-MM-DD') &&
          a.confirmed === true,
      );
      loadAbsencesListFromDb(listItems);
    }
  }, [data.teacherLessonsByStaffPerWeekUniqueId, selectedLessonByStaff]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <DialogConfirmationAttendance
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={AttendanceConfirmHandler}
      />
      {/* warning message */}
      <div>
        {toggleWarning && (
          <MessageBar
            //hideDialog={true}
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={closeErrMessage}
            dismissButtonAriaLabel="Close">
            Please <b>confirm attendance</b> first before you move to the next
            date selected.
          </MessageBar>
        )}
      </div>
      {/* saved message */}
      <div>
        {hasConfirmed && toggleSave && (
          <MessageBar
            //hideDialog={true}
            messageBarType={MessageBarType.success}
            isMultiline={false}
            onDismiss={closeSuccessMessage}
            dismissButtonAriaLabel="Close">
            Awesome! Attendance confirmed successfully!
          </MessageBar>
        )}
      </div>

      <div className={'ms-Grid-col ms-lg12 ' + styles.attendanceMonthly}>
        <div className="ms-Grid-col ms-lg12">
          <div className={styles.headerContainer}>
            <div className={'ms-lg6 ' + styles.leftContainer}>
              <div className={'ms-Grid-col ms-lg4 ' + styles.iconProfile}>
                <FontIcon iconName="ReminderPerson" />
                &nbsp;
                <span>Attendance</span>
              </div>
            </div>
            <div className={'ms-lg6 ' + styles.rightContainer}>
              <div className={'ms-Grid-col ms-lg4 ' + styles.iconManage}>
                <FontIcon iconName="Print" />
                &nbsp;
                <span>Print</span>
              </div>
            </div>
          </div>
        </div>
        <div className={'ms-Grid-col ms-lg12 ' + styles.bannerMessage}>
          <div className={styles.messageTitle}>
            Register absence on a weekly basis
          </div>
          <div className={styles.messageBody}>
            To register absences and perform tasks on a weekly basis, you must
            be a team teacher
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + styles.contentControl}>
            <div className={'ms-Grid-col ms-lg6 ' + styles.dpSubject}>
              <div className="ms-Grid-col ms-lg1">
                <FontIcon iconName="Group" className={styles.iconGroup} />
              </div>
              <div className="ms-Grid-col ms-lg11 DropdownBoderLess">
                <Dropdown
                  styles={ddlSubject}
                  defaultSelectedKey={selectedLessonByStaff}
                  options={renderOptions(subjectList)}
                  onChanged={_onDropdownChanged}
                  placeholder="Choose a class..."
                />
              </div>
            </div>
            <div className={'ms-Grid-col ms-lg6 ' + styles.btnConfirm}>
              {hasConfirmed === true &&
              (absencesList === null || absencesList?.length === 0) ? (
                <DefaultButton
                  disabled={true}
                  text="Confirm Attendance"
                  className={'btnDissabled'}
                />
              ) : (
                <DefaultButton
                  text="Confirm Attendance"
                  className={'btnPrimary'}
                  onClick={handleconfirmAttendance}
                />
              )}
            </div>
          </div>
        </div>
        <div className={'ms-Grid-col ms-lg12 ' + styles.contentMessage}>
          <TeacherWeeklyAttendance
            studentList={studentList}
            monthlySchedule={_.orderBy(
              montlySched,
              a => {
                return moment(a.start).format('YYYY-MM-DD');
              },
              ['asc'],
            )}
            attendanceList={attendanceList}
            searchChange={onSearchHandler}
            selectedDate={selectedDateHandler}
            selectedSubject={selectedLessonByStaff}
            dataHasConfirm={hasConfirmed}
            handleAbsences={handleAbsencesHander}
            shimmer={shimmer}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AttendanceWeekly;
