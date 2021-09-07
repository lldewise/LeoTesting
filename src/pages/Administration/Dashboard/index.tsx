import React, { Fragment, useEffect } from 'react';
import AdminRightLayout from '../../../components/layout/AdminRightLayout';
import styles from './Dashboard.module.scss';
import UnreadMessages from '../../../components/adminANDteacher/Dashboard/UnreadMessages/UnreadMessages';
import News from '../../../components/adminANDteacher/Dashboard/News/News';
import MyQuickLinks from '../../../components/adminANDteacher/Dashboard/MyQuicklinks/MyQuicklinks';
import { useStore } from '../../../store/store';
import { SubstitutionCard } from '../../../components/adminANDteacher/Dashboard/Substitution/SubstitutionCard';

const AdminDashboard: React.FC = () => {
  const [data, dispatch] = useStore();

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={'ms-Grid-row ' + styles.dashboard}>
        <div className="ms-Grid-col ms-lg12 container">
          <div
            className={
              'ms-Grid-col main-container customScrollFull ' +
              styles.dashboardMessageBanner
            }>
            <MyQuickLinks />
            <div className="ms-Grid-row">
              <SubstitutionCard />
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
                  <div className={'card-default'}>
                    <News />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-col main-right-panel">
            <AdminRightLayout />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
