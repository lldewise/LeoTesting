import React, { Fragment, useEffect, useState } from 'react';
import styles from './MyProfile.module.scss';
import { useStore } from '../../../store/store';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import StudentRightLayout from '../../../components/layout/RightLayout';
import TeacherRightLayout from '../../../components/layout/TeacherRightLayout';
import AdminRightLayout from '../../../components/layout/AdminRightLayout';
import ProfileCard from '../../../components/userInterface/ProfileCard/ProfileCard';
import ProfileInformation from '../../../components/userInterface/ProfileInformation/ProfileInformation';
import { Roles } from '../../../util/constant';
import { hasRole } from '../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import { ActionButton } from '@fluentui/react';
import { UserProfile } from '../../../types/store/users';

const MyProfile: React.FC = () => {
  const [data, dispatch] = useStore();
  const [userRole, setUserRole] = useState<string | null>();
  const [details, setDetails] = useState<UserProfile | null>(null);
  const [tagRisk, setTagRisk] = useState<boolean>(false);
  let history: any = useHistory();

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  useEffect(() => {
    let r = Math.random().toString(10).substring(7);
    dispatch('UPDATE_NAVIGATION', r);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.selectedUserProfile.id !== null) {
      setDetails(data.selectedUserProfile);
    }
  }, [data.userProfile.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const gotoAccountSetting = () => {
    history.push('./accountsetting');
  };

  const tagHandler = (tag: boolean) => {
    setTagRisk(tag);
  };

  return (
    <>
      <div className={'ms-Grid-col ms-lg12 ' + styles.myProfile}>
        <div className="ms-Grid-col main-container">
          <div className={styles.filterContainer}>
            <div className={styles.leftContainer}>
              <div className={'ms-Grid-col ms-lg4 ' + styles.iconProfile}>
                <FontIcon iconName="IDBadge" />
                &nbsp;
                <span>My Profile</span>
              </div>
            </div>
            <div className={styles.rightContainer}>
              {tagRisk ? (
                <ActionButton
                  className={'btnPlain btnAlert '}
                  iconProps={{ iconName: 'Warning' }}
                  onClick={() => {
                    tagHandler(false);
                  }}
                  text="Untag as at risk"
                />
              ) : (
                <ActionButton
                  className={'btnPlain btnPrimary '}
                  iconProps={{ iconName: 'Warning' }}
                  onClick={() => {
                    tagHandler(true);
                  }}
                  text="Tag as at risk"
                />
              )}

              <ActionButton
                className="btnPlain btnPrimary"
                iconProps={{ iconName: 'CommentAdd' }}
                text="Add note"
              />
              <ActionButton
                className="btnPlain btnPrimary"
                iconProps={{ iconName: 'Upload' }}
                text="Upload case"
              />
              <ActionButton
                className="btnPlain btnPrimary"
                iconProps={{ iconName: 'RemoveFilter' }}
                text="Disenroll"
              />
            </div>
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + styles.myProfileContainer}>
            <div className={'ms-Grid-col ms-lg4 ' + styles.profileCard}>
              <ProfileCard
                user={details}
                gotoAccountSetting={gotoAccountSetting}
                tagRisk={tagRisk}
              />
            </div>
            <div className={'ms-Grid-col ms-lg8 ' + styles.profileInfoCard}>
              <ProfileInformation user={details} dataStore={data} />
            </div>
          </div>
        </div>
        <div className="ms-Grid-col main-right-panel">
          {hasRole(userRole, Roles.STUDENT) && <StudentRightLayout />}
          {hasRole(userRole, Roles.TEACHER) && <TeacherRightLayout />}
          {hasRole(userRole, Roles.ADMINISTRATOR) && <AdminRightLayout />}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
