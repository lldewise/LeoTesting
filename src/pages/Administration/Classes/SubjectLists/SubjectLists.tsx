import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import styles from './SubjectLists.module.scss';
import { FontIcon, ActionButton, DefaultButton } from 'office-ui-fabric-react';
import SubjectList from '../../../../components/itemlist/SubjectList/SubjectList';
import ClassesLists from '../ClassesLists/ClassesLists';
import { useStore } from '../../../../store/store';
import { useHistory } from 'react-router-dom';
import apiGet from '../../../../services/apiGet';

const SubjectLists: React.FC = () => {
  let history: any = useHistory();
  const [data, dispatch] = useStore();
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [shimmer, setShimmer] = useState<boolean>(false);

  const handleSelectedItem = (item: any) => {
    setShimmer(true);
    let id = item.subjectId.split('/')[1];
    setSelectedData(item);
    dispatch('SETADMINSELECTEDCLASSES', item);
    dispatchDataBySelectedSubject(id);
  };

  const gotoCreateClass = () => {
    history.push('./manage-classes/class');
  };

  useEffect(() => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/admin/subject/list?clientId=' +
          data.userExternalUnique,
      )
      .then();
  }, [data.userProfile.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const dispatchDataBySelectedSubject = (id: string) => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/admin/classes/subject/list?clientId=' +
          data.userExternalUnique +
          '&subject=' +
          id,
      )
      .then();
  };

  const updateLoading = () => {
    setShimmer(false);
  };

  return (
    <>
      <div className="container">
        {/* header container*/}
        <div className={styles.headerContainer}>
          <div className={styles.headerTitleContainer}>
            <div className={styles.iconWidth}>
              <FontIcon iconName="Dictionary" />
            </div>
            <div className={styles.headertitle}>Classes</div>
          </div>
          <div className={styles.headerIconContainer}>
            <div className={styles.helpIcon}>
              <ActionButton
                iconProps={{ iconName: 'Settings' }}
                className={styles.actionButton}>
                Manage Subject
              </ActionButton>
            </div>
          </div>
        </div>

        <div className={styles.bannerContainer}>
          <div className={styles.container}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.createClassCol}>
              <div className={'ms-Grid-col ms-lg6 ' + styles.createClassCol}>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.title}>
                    List of classes per subject
                  </div>
                </div>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.titledesc}>
                    Select a subject to view the classes inside.
                  </div>
                </div>
              </div>

              <div className={'ms-Grid-col ms-lg12 ' + styles.btnCreate}>
                <DefaultButton
                  iconProps={{ iconName: 'Add' }}
                  text="Create Class"
                  className={'btnPrimary'}
                  onClick={gotoCreateClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.dataContainer}>
            <div className={'ms-Grid-col ms-lg2 ' + styles.listBg}>
              <SubjectList handleSelectedItem={handleSelectedItem} />
            </div>
            <div className="ms-Grid-col ms-lg10">
              <ClassesLists
                adminSelectedSubject={selectedData}
                shimmer={shimmer}
                updateLoading={updateLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectLists;
