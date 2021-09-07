import React, { Fragment, useState, useEffect } from 'react';
import styles from './StudentList.module.scss';
import { DefaultButton, FontIcon, ActionButton } from 'office-ui-fabric-react';
import StudentListTable from '../../../components/students/StudentList/StudentLists';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../store/store';
import apiGet from '../../../services/apiGet';

const StudentList: React.FC = () => {
  const [data, dispatch] = useStore();
  const [listItems, setListItems] = useState<any[]>([]);

  const history = useHistory();

  const handleEnrollStudent = () => {
    history.push('./student-enrollment');
  };

  useEffect(() => {
    if (data.userProfile.id !== null) {
      getStudentBySchool();
      getEnrolledStudent();
    }
  }, [data.userProfile.id]);

  useEffect(() => {
    if (data.studentAccountByIds.length > 0) {
      const items = data.studentAccountByIds;
      const list = data.studentAccountList;
      if (items) {
        const ids: any[] = [];
        items.forEach(a => {
          const user = list.find(r => r.userId === a.userId);
          if (!user) {
            ids.push(a.userId);
          }
        });
        getUserDetailsByIds(ids);
      }
    }
  }, [data.studentAccountByIds.length]); //eslint-disable-line react-hooks/exhaustive-deps

  const getUserDetailsByIds = (ids: any[]) => {
    if (ids.length > 0) {
      const p = {
        ids: JSON.stringify(ids),
      };
      apiGet.get(
        'api/school/' +
          data.userProfile.school +
          '/userlist?clientId=' +
          data.userExternalUnique,
        {
          params: p,
        },
      );
    }
  };

  useEffect(() => {
    if (data.enrolledStudentList?.length > 0) {
      setListItems(data.enrolledStudentList);
    }
  }, [data.enrolledStudentList]);

  const getStudentBySchool = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/student?clientId=' +
        data.userExternalUnique,
    );
  };

  const getEnrolledStudent = () => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/student/enrolled/list?clientId=' +
          data.userExternalUnique,
      )
      .then(res => {
        if (res.status === 200) {
          dispatch('SETENROLLEDSTUDENTLIST', res.data);
        }
      });
  };

  return (
    <>
      <div className="ms-Grid-row ">
        <div className={'ms-Grid-col ms-lg12 ' + styles.userAccCol}>
          {/* header container*/}
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
              <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                <FontIcon iconName="ContactCard" />
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.headerTitle}>
                Students
              </div>
              <div className={'AttendanceHeader ' + styles.helpIcon}>
                <ActionButton
                  iconProps={{ iconName: 'Print' }}
                  className={styles.actionButton}>
                  Print
                </ActionButton>
              </div>
            </div>
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + styles.bannerMessage}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.contentControl}>
              <div className="ms-Grid-col ms-lg6">
                <div
                  className={'ms-Grid-col ms-lg12 ' + styles.listheaderTitle}>
                  List of Students
                </div>
                <div className={styles.headerTitle2}>
                  This is the list of students enrolled in the school
                </div>
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.btnCreate}>
                <DefaultButton
                  iconProps={{ iconName: 'Add' }}
                  text="Enroll Student"
                  className={'btnPrimary'}
                  onClick={handleEnrollStudent}
                />
              </div>
            </div>
          </div>
          {/* content */}
          <div className="ms-Grid-row">
            <div>
              <StudentListTable listItems={listItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentList;
