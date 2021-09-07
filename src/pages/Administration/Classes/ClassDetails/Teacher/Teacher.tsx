import React, { Fragment } from 'react';
import styles from './Teacher.module.scss';
import helle from '../../../../../assets/images/persona/helle.png';
import { ActionButton, Persona, PersonaSize } from 'office-ui-fabric-react';

const teacherPersona = {
  imageUrl: helle,
  imageInitials: 'AL',
  text: 'Ada Lovelace',
};

const teacherSubjects = [
  {
    schoolYear: '2021/22',
    name: 'English',
    code: 'EN',
    homeClass: '1k',
  },
  {
    schoolYear: '2022/23',
    name: 'English',
    code: 'EN',
    homeClass: '2k',
  },
];

const Teacher: React.FC = () => {
  const handleEditData = () => {
    alert('Test');
  };

  return (
    <div className="ms-Grid-row">
      <div className={'ms-Grid-col ms-lg-12 ' + styles.teacherMainContainer}>
        <div className={'ms-Grid-col ms-lg-12 ' + styles.teacherInfo}>
          <div className={styles.persona}>
            <Persona
              text={teacherPersona.text}
              size={PersonaSize.size40}
              imageUrl={helle}
            />
          </div>
          <div className={styles.subjects}>
            {teacherSubjects.map((item, i) => (
              <div key={i}>
                <span>{item.homeClass}</span>{' '}
                <span>{item.code.toLocaleLowerCase()}</span>{' '}
                <span>{item.schoolYear}</span>
                <span style={{ marginRight: '3px' }}>
                  {i !== teacherSubjects.length - 1 && ', '}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.btn}>
            <ActionButton
              className={'btnPlain btnPrimary '}
              iconProps={{ iconName: 'Edit' }}
              text="Edit"
              onClick={handleEditData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
