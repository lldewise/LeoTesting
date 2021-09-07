import React, { Fragment } from 'react';
import { useStore } from '../../../../store/store';
//import TeacherAttendance from "../../../../components/adminANDteacher/TeacherAttendance/TeacherAttendance";
import { useState } from 'react';

import { useEffect } from 'react';
import apiGet from '../../../../services/apiGet';
import apiTeacher from '../../../../services/apiTeacher';
import AttendanceTab from './AttendanceTab';
import AttendanceList from './AttendanceList';
import AttendanceHeader from './AttendanceHeader';

import { handleError } from '../../../../util/commonFunction';
import { useBoolean } from '@fluentui/react-hooks';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

function AttendanceDetails(props) {
  const { principal } = useAuthentication();
  const [data, dispatch] = useStore();
  // eslint-disable-next-line
  const [reload, setReload] = useState(false);
  // eslint-disable-next-line
  const [initLoad, setInitLoad] = useState(true);
  const [edit, setEdit] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  // eslint-disable-next-line
  const [studentsListOld, setStudentsListOld] = useState([]);
  // eslint-disable-next-line
  const [ClassStudentList, setClassStudentList] = useState([]);
  const [shimmer, setShimmer] = useState(true);
  const [filter, setFilter] = useState('studentTab');

  const [searchFilter, setSearchFilter] = useState('');
  const [toggleSaveButton, setToggleSaveButton] = useState(true);

  const [lessonDetails, setLessonDetails] = useState(data.classesInfo);
  // eslint-disable-next-line
  const { lessonId, classTitle } = props;

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  // const [confirm, setConfirm] = useState(false);
  /*  const [confirm, setConfirm] = useState(
    data.classesInfo.confirmed ? false : true
  ); */
  const [confirm, setConfirm] = useState(
    data.classesInfo.confirmed ? false : true,
  );

  const [toggleCalloutCounter, setToggleCalloutCounter] = useState(0);
  useEffect(() => {
    // getLessonInfo();
    setLessonDetails(data.classesInfo);
    setConfirm(data.classesInfo.confirmed ? false : true);
    setToggleSaveButton(data.classesInfo.confirmed ? false : true);
    //  setConfirm(data.classesInfo.selectedLesson.isConfirmed);
    // setToggleSaveButton(data.classesInfo.selectedLesson.isConfirmed);
    setShimmer(true);
    getAttendance();
  }, [data.classesInfo.selectedLessonId]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   setShimmer(true);
  //   getAttendance();
  // }, []);

  // const getLessonInfo = () => {
  //     var req = `/api/school/${encodeURIComponent(
  //       data.userProfile.school
  //     )}/teacher/lesson/${lessonId
  //       }?clientId=${data.userExternalUnique
  //       }`;

  //     apiGet
  //     .get(req)
  //     .then((res) => { })
  //     .catch(function (error) {
  //       handleError(error);
  //     })
  //     .then(function () {
  //     });
  // }
  const getAttendance = () => {
    const staffId = data.userData?.staff[0].split('/')[1];
    //data.userExternalId
    dispatch('DELETEATTENDANCE', null);
    console.log('selected 2 + ' + lessonDetails.selectedLessonId);
    const req = `/api/school/${encodeURIComponent(
      data.userProfile.school,
    )}/teacher/${staffId}/lessons/${
      lessonDetails.selectedLessonId
    }/attendance?clientId=${data.userExternalUnique}`;
    apiGet.get(req).then(response => {
      setTimeout(() => {
        loadStudentList();
      }, 1000);
    });
  };

  const loadStudentList = () => {
    const staffId = data.userData?.staff[0].split('/')[1];
    const req = `/api/school/${encodeURIComponent(
      data.userProfile.school,
    )}/teacher/${staffId}/class/${
      lessonDetails.selectedClass
    }/students?clientId=${data.userExternalUnique}`;
    // const fetchStudentList = () => {
    apiGet
      .get(req)
      .then(res => {})
      .catch(error => {
        handleError(error);
      })
      .then(() => {
        setShimmer(false);
      });
  };
  useEffect(() => {
    //  setConfirm(data.classesInfo.selectedLesson.isConfirmed);
    setToggleSaveButton(data.classesInfo.confirmed ? false : true);
    //setToggleSaveButton(data.classesInfo.selectedLesson.isConfirmed);
    setStudentsList(data.ClassStudentList);
    setEdit(true);
  }, [data.ClassStudentList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setConfirm(data.classesInfo.selectedLesson.isConfirmed);

    setToggleSaveButton(data.classesInfo.selectedLesson.isConfirmed);
    // setConfirm(data.classesInfo.confirmed ? false : true);
    // setToggleSaveButton(data.classesInfo.confirmed ?  false : true);
  }, [data.classesInfo.selectedLesson.isConfirmed]);

  // useEffect(() => {
  //   if (data.ClassStudentList.length >0 ) {
  //     setStudentsList(data.ClassStudentList);
  //     setEdit(true);
  //     setShimmer(false);
  //   }
  //   console.log("3");
  // }, [data.ClassStudentList]);

  const _setFilter = filter => {
    setFilter(filter);
  };

  const _setSearchFilter = searchFilter => {
    setSearchFilter(searchFilter);
  };

  useEffect(() => {
    setFilter(filter);
    setEdit(false);
  }, [edit]); // eslint-disable-line react-hooks/exhaustive-deps

  const _editStatus = (checked, item) => {
    const updatedData = studentsList;
    const index = updatedData.findIndex(r => r.id === item);
    updatedData[index].dataChanged = 1;
    if (checked) {
      updatedData[index].percentage = 100; //absent
      updatedData[index].type = 'attendance-type/present';
    } else {
      updatedData[index].percentage = 0; //updatedData[index].oldPercentage != ;
      updatedData[index].type = 'attendance-type/absent';
    }
    updatedData[index].present = checked;
    setStudentsList(updatedData);
    setEdit(true);
    checkChanges();
  };

  const _editAbsenceType = (value, item) => {
    const updatedData = studentsList;
    const index = updatedData.findIndex(r => r.id === item);

    if (updatedData[index].oldAbsenceType === undefined) {
      updatedData[index].oldAbsenceType = 1; //default approved
    }
    updatedData[index].absenceType = value;
    updatedData[index].dataChanged = 1;
    setStudentsList(updatedData);
    setEdit(true);
    checkChanges();
  };

  const _editRemarks = (value, item) => {
    const updatedData = studentsList;
    const index = updatedData.findIndex(r => r.id === item);
    updatedData[index].remarks = value;
    updatedData[index].dataChanged = 1;
    setStudentsList(updatedData);

    setEdit(true);
    checkChanges();
  };
  const _editPercentage = (value, item) => {
    const updatedData = studentsList;
    const index = updatedData.findIndex(r => r.id === item);
    updatedData[index].dataChanged = 1;
    switch (value) {
      case 100:
        updatedData[index].present = false;
        updatedData[index].type = 'attendance-type/absent';
        updatedData[index].percentage = 0;
        break;
      case 50:
        updatedData[index].present = false;
        updatedData[index].percentage = 50;
        updatedData[index].type = 'attendance-type/late';
        break;
      default:
        updatedData[index].present = true;
        updatedData[index].percentage = 100;
        updatedData[index].type = 'attendance-type/present';

        break;
    }
    setStudentsList(updatedData);
    setFilter(filter);
    setEdit(true);
    checkChanges();
  };

  // const updateState = (index, student) => {
  //   let students = [...studentsList];
  //   if (student.present && student.oldPresentStatus && student.remarks > 0) {
  //     student.dataChanged = 1;
  //   }
  //   students[index] = student;
  //   setStudentsList(students);
  // };

  const [attendanceList, setAttendanceList] = useState([]);
  const [ForDeletionList, setForDeletionList] = useState([]);
  const checkChanges = () => {
    const students = [...studentsList.filter(a => a.dataChanged === 1)];
    const studentList = [];
    const forDeletionItems = [];

    students.forEach(a => {
      //INSERT NEW RECORD - PRESENT WITH REMARKS
      if (a.present && a.oldPresentStatus && a.remarks.length > 0) {
        //insert new record with remarks.
        if (a.remarks.toString() !== a.oldRemarks.toString()) {
          studentList.push(a);
        }
      }
      //DELETE ATTENDANCE RECORD -NOT PRESENT WITHOUT REMARKS
      else if (a.present && !a.oldPresentStatus && a.remarks.length < 1) {
        forDeletionItems.push(a);
      }
      //DELETE ATTENDANCE RECORD -PRESENT WITHOUT REMARKS
      else if (a.present && a.oldPresentStatus && a.remarks.length < 1) {
        if (a.attendanceId !== null || a.attendanceId === '') {
          forDeletionItems.push(a);
        }
      } else if (!a.present && !a.oldPresentStatus) {
        if (
          a.percentage !== a.oldPercentage ||
          a.remarks !== a.oldRemarks ||
          a.absenceType !== a.oldAbsenceType
        ) {
          studentList.push(a);
        }
        /*     else if (!a.present) {
        if ( a.percen)
       } */
      } else if (
        a.present !== a.oldPresentStatus ||
        a.remarks !== a.oldRemarks
      ) {
        studentList.push(a);
      }

      setAttendanceList(studentList);
      setForDeletionList(forDeletionItems);

      if (confirm) {
        if (studentList.length > 0 || forDeletionItems.length > 0) {
          // setConfirm(false);
          setToggleSaveButton(false);
          if (toggleCalloutCounter === 0) {
            _toggleIsCalloutVisible();
            setToggleCalloutCounter(1);
          }
        } else {
          //  setConfirm(true);

          setToggleSaveButton(true);
        }
      } else {
        //  setConfirm(false);
        setToggleSaveButton(false);
      }
      if (studentList.length > 0 || forDeletionItems.length > 0) {
        // setConfirm(false);
        setToggleSaveButton(false);
      } else {
        if (!confirm) {
          //  setConfirm(false);
          setToggleSaveButton(false);
        }
      }
    });
  };

  const _toggleIsCalloutVisible = () => {
    if (confirm) {
      toggleIsCalloutVisible();
    }
  };
  const _SaveLessonHandler = () => {
    // if (!confirm) {
    const url = '/api/school/' + data.userProfile.school + '/teacher/lesson';
    const lessonData = {
      lessonId: 'lesson/' + lessonDetails.selectedLessonId,
      classId: 'class/' + lessonDetails.selectedClass,
      start: lessonDetails.start,
      end: lessonDetails.end,
      week: lessonDetails.week.toString(),
      confirmed: 'true',
    };
    apiTeacher
      .post(url, lessonData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(() => {
        setTimeout(() => {
          saveAttendance();
        }, 1000);
      });
    // } else {
    //   saveAttendance();
    // }
  };

  const _SaveDataHandler = () => {
    _SaveLessonHandler();
  };

  const saveAttendance = () => {
    const students = attendanceList;
    const studentList = [];

    if (students.length > 0) {
      let i = 0;
      for (i = 0; i < students.length; i++) {
        // console.log(students[i].attendanceId);
        const attendanceRec = {
          id: students[i].attendanceId,
          subjectId: 'lesson/' + lessonId,
          teacherId: 'user/' + String(data.userProfile.id),
          studentId: String(students[i].studentId),
          remarks: String(students[i].remarks),
          percentage: String(students[i].percentage),
          absentType: String(students[i].absenceType),
          type: String(students[i].type),
        };
        studentList.push(attendanceRec);
      }

      apiTeacher
        .post(
          '/api/school/' + data.userProfile.school + '/teacher/attendance',
          studentList,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${principal?.accessToken}`,
            },
          },
        )
        .then(res => {
          if (ForDeletionList.length > 0) {
            deleteAttendance(ForDeletionList);
            /* props.toggleSuccessMessage(true);
        dispatch("CLASSSTUDENTLIST", []);
        setInitLoad(true); */
          } else {
            setInitLoad(true);
            // dispatch("ATTENDANCELIST", []);
            setToggleSaveButton(true);
            setConfirm(true);
            props.toggleSuccessMessage(true);
            //  getAttendance();
          }
        });
    } else {
      if (ForDeletionList.length > 0) {
        deleteAttendance(ForDeletionList);
      } else {
        setInitLoad(true);
        // dispatch("ATTENDANCELIST", []);
        setToggleSaveButton(true);
        setConfirm(true);
        props.toggleSuccessMessage(true);
        //  getAttendance();
      }
    }
  };

  const deleteAttendance = items => {
    items.forEach(a => {
      apiTeacher
        .delete(
          'api/school/' +
            data.userProfile.school +
            '/teacher/attendance/' +
            a.attendanceId.split('/')[1].toString(),
        )
        .then(response => {
          setConfirm(true);
          setInitLoad(true);
          setToggleSaveButton(true);
          //  dispatch("ATTENDANCELIST", []);
          props.toggleSuccessMessage(true);
          //  getAttendance();
        });
    });
  };

  const newFilterHandler = data => {
    setStudentsList(data);
  };

  return (
    <>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12">
          <AttendanceHeader
            SaveDataHandler={_SaveDataHandler}
            _setSearchFilter={_setSearchFilter}
            toggleButton={toggleSaveButton}
            confirmed={confirm}
            isCalloutVisible={isCalloutVisible}
            toggleIsCalloutVisible={toggleIsCalloutVisible}
          />
          <AttendanceTab
            filter={filter}
            _setFilter={_setFilter}
            studentsList={studentsList}
          />
          <AttendanceList
            filter={filter}
            searchFilter={searchFilter}
            editStatus={_editStatus}
            editPercentage={_editPercentage}
            editRemarks={_editRemarks}
            editAbsenceType={_editAbsenceType}
            shimmer={shimmer}
            students={studentsList}
            newstudentlist={newFilterHandler}
            studentsListOld={studentsListOld}
          />
        </div>
      </div>
    </>
  );
}

export default AttendanceDetails;
