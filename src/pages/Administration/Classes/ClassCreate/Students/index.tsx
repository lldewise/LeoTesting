import React from 'react';
import styles from './Students.module.scss';
import StudentEnrollmentList from '../../../../../components/students/StudentEnrollmentList/StudentEnrollmentList';

const Students: React.FC = () => {
  const onCancel = () => {};
  return (
    <div>
      <div className={'ms-Grid-row ' + styles.pad}>
        <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
          Students
        </div>
        <div className={'ms-Grid-col ms-lg12 ' + styles.headerDesc}>
          Add students to this class. Check/uncheck the students enrolled in
          each year.
        </div>
      </div>
      <br />
      <br />
      <div className={'ms-Grid-row ' + styles.pad}>
        <div className="ms-Grid-col ms-lg12">
          <StudentEnrollmentList cancel={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default Students;
