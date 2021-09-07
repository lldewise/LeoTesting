import React, { Fragment, useState, useEffect } from 'react';
import TeacherRightLayout from '../../../components/layout/TeacherRightLayout';

import styles from './Dashboard.module.scss';
import UnreadMessages from '../../../components/adminANDteacher/Dashboard/UnreadMessages/UnreadMessages';
import News from '../../../components/adminANDteacher/Dashboard/News/News';
import MyQuickLinks from '../../../components/adminANDteacher/Dashboard/MyQuicklinks/MyQuicklinks';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ActionButton, IconButton } from 'office-ui-fabric-react';

import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import  MyTaskList  from '../../../components/adminANDteacher/MyTaskList/MyTaskList';
import { SharedDocumentList } from '../../../components/adminANDteacher/SharedDocumentList/SharedDocumentList';
import { useStore } from '../../../store/store';
import { useBoolean } from '@uifabric/react-hooks';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
      backgroundColor: '#fff',
      paddingTop: '0px',
    },
  ],
  linkIsSelected: {
    selectors: {
      ':before': {
        height: '3px',
        backgroundColor: '#6c35d4',
      },
    },
  },
};
// eslint-disable-next-line
let taskSharedButtonElement;
const TeacherDashboard: React.FC = () => {
  const [data, dispatch] = useStore();
  const [mytask, setMyTask] = useState(true);
  const [showTaskShared, { toggle: toggleShowTaskShared }] = useBoolean(false);

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pivotHandler = (value?: PivotItem) => {
    if (value?.props.itemKey === '2') {
      setMyTask(false);
    } else {
      setMyTask(true);
    }
  };

  return (
    <>
      {showTaskShared && (
        <Callout
          isBeakVisible={false}
          gapSpace={0}
          doNotLayer={false}
          target={`.${styles.padUS}`}
          onDismiss={toggleShowTaskShared}
          setInitialFocus>
          <div>
            <ActionButton className={styles.actionButton}>
              {intl(LabelNames.download)}
            </ActionButton>
          </div>
          <div>
            <ActionButton className={styles.actionButton}>
              {intl(LabelNames.upload)}
            </ActionButton>
          </div>
        </Callout>
      )}

      <div className={'ms-Grid-row  ' + styles.dashboard}>
        <div className="ms-Grid-col ms-lg12 container">
          <div
            className={
              'ms-Grid-col main-container customScrollFull padT10 ' +
              styles.dashboardMessageBanner
            }>
            <div className="ms-Grid-row">
              <MyQuickLinks />
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-lg12">
                <div className="ms-Grid-col ms-lg12">
                  <div className="card-default">
                    <div
                      className={'card-default-body ' + styles.cardCustom}
                      style={{ position: 'relative' }}>
                      <div className={styles.padUS}>
                        {mytask || (
                          <div className="TeacherActionButton">
                            <ActionButton
                              iconProps={{ iconName: 'Upload' }}
                              className={styles.actionButton}>
                              {intl(LabelNames.uploaddocument)}
                            </ActionButton>
                          </div>
                        )}
                        <IconButton
                          iconProps={{ iconName: 'More' }}
                          onClick={toggleShowTaskShared}
                          className={'icondDefault'}
                          ref={btn => (taskSharedButtonElement = btn)}
                        />
                      </div>

                      <Pivot
                        className={styles.pivotDefault}
                        styles={pivotStyles}
                        onLinkClick={pivotHandler}>
                        <PivotItem
                          headerText={intl(LabelNames.mytask)}
                          itemKey="1">
                          <div className="">
                            <MyTaskList itemlist={data.teacherTaskDocuments} />

                            <div
                              className={
                                'ms-Grid-row bclist ' + styles.assignmentHeader
                              }>
                              <div className={'ms-Grid-col  ms-lg6 text-left '}>
                                <ActionButton
                                  iconProps={{ iconName: 'ChevronDown' }}
                                  text="Show More"
                                  className="btnPlain btnIconRight"
                                />
                              </div>
                              <div
                                className={'ms-Grid-col  ms-lg6 text-right '}>
                                <ActionButton
                                  iconProps={{ iconName: 'Forward' }}
                                  text="More"
                                  className="btnPlain btnIconRight btnInfo"
                                />
                              </div>
                            </div>
                          </div>
                        </PivotItem>
                        <PivotItem
                          headerText={intl(LabelNames.shareddocument)}
                          itemKey="2">
                          <SharedDocumentList
                            itemlist={data.teacherSharedDocuments}
                          />

                          <div
                            className={
                              'ms-Grid-row bclist ' + styles.assignmentHeader
                            }>
                            <div className={'ms-Grid-col  ms-lg6 text-left '}>
                              <ActionButton
                                iconProps={{ iconName: 'ChevronDown' }}
                                text="Show More"
                                className="btnPlain btnIconRight"
                              />
                            </div>
                            <div className={'ms-Grid-col  ms-lg6 text-right '}>
                              <ActionButton
                                iconProps={{ iconName: 'Forward' }}
                                text="More"
                                className="btnPlain btnIconRight btnInfo"
                              />
                            </div>
                          </div>
                        </PivotItem>
                      </Pivot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-lg12 ms-xl6 ms-xxl6">
                <div className="ms-Grid-col ms-lg12">
                  <div className={'card-default'}>
                    <UnreadMessages />
                  </div>
                </div>
              </div>
              <div className="ms-Grid-col ms-lg12 ms-xl6 ms-xxl6">
                <div className="ms-Grid-col ms-lg12">
                  <div className="card-default">
                    <News />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-col main-right-panel">
            <TeacherRightLayout  />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
