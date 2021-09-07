import React, { Fragment, useState } from 'react';
import styles from './Enrollment.module.scss';
import {
  FontIcon,
  ActionButton,
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import EducationalInformation from '../../../components/enrollment/EducationalInformation';
import apiStudent from '../../../services/apiStudent';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../../store/store';
import { useAuthentication } from '../../../util/context/authentication';
import { useHistory } from 'react-router-dom';

type EnrollmentProps = {};

const Enrollment: React.FC<EnrollmentProps> = props => {
  const [data] = useStore();
  const { principal } = useAuthentication();
  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
  const [toggleWarning, setToggleWarning] = useState<boolean>(false);

  const history = useHistory();

  const submitFormHandler = (value: any) => {
    const item = {
      id: null,
      student: 'user/jeff.turing',
      education: value.education,
      studyProgram: value.studyProgram,
      lineStudy: value.lineOfStudy,
      batch: value.batchId,
      temporaryBatch: value.temporaryBatch,
      enrollmentDate: value.enrollmentDate,
      modifiedBy: data.userProfile.id,
    };

    apiStudent
      .post(
        '/api/school/' + data.userProfile.school + '/student/enroll',
        item,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(res => {
        setToggleSuccess(true);
        setTimeout(() => {
          history.push('./students');
        }, 1000);
      })
      .catch(err => {
        setToggleWarning(true);
      });
  };

  const closeSuccessMessage = () => {
    setToggleSuccess(false);
  };

  const closeWarningMessage = () => {
    setToggleWarning(false);
  };

  return (
    <>
      {toggleSuccess && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={closeSuccessMessage}
          dismissButtonAriaLabel="Close">
          Student sucessfully enrolled.
        </MessageBar>
      )}

      {toggleWarning && (
        <MessageBar
          messageBarType={MessageBarType.warning}
          isMultiline={false}
          onDismiss={closeWarningMessage}
          dismissButtonAriaLabel="Close">
          Something went wrong!
        </MessageBar>
      )}
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 fullContainer customScrollFull ">
          {/* header container*/}
          <div className={'ms-Grid-col ' + styles.headerContainer}>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                      <FontIcon iconName="ContactCard" />
                    </div>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.headertitle}>
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
              </div>
            </div>
          </div>
          {/* content */}
          <div className="ms-Grid-row">
            <div className={'ms-Grid-col ' + styles.container}>
              <br />
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + styles.title}>
                  Enroll a student
                </div>
              </div>
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + styles.titledesc}>
                  Input the student's educational information to enroll them to
                  the school.
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className={'ms-Grid-col ' + styles.formPanel}>
                  {/* remove student value if you want to display the search list 
                  <EducationalInformation student= {student} />*/}
                  <EducationalInformation
                    isFromUserAccount={false}
                    submitFormHandler={submitFormHandler}
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

export default Enrollment;
