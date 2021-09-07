import React, { useEffect, useState } from 'react';
import logger from 'loglevel';
import DashboardDailySchedule from '../../calendar/DashboardDailySchedule/DashboardDailySchedule';
import { useStore } from '../../../store/store';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import ModalUserProfile from '../../modal/modaluserprofile/ModalUserProfile';
import { Fragment } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { useHistory } from 'react-router-dom';
import apiIdentity from '../../../services/apiIdentity';
import { INITIAL_EVENTS } from '../../../util/calendar/event.utils';
import { IconButton } from 'office-ui-fabric-react';

const moreIcon = { iconName: 'More' };

const RightLayout: React.FC = () => {
  const history = useHistory();
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [subject, setSubject] = useState<string | null>(null);
  const [isAgendaView, setIsAgendaView] = useState(false);
  const [itemList, setItemList] = useState(INITIAL_EVENTS);

  useEffect(() => {
    const currentPage = history.location.pathname.split('/')[2];
    if (currentPage === 'classes') {
      const subj = data.classesInfo.selectedClass;
      setIsAgendaView(true);
      setSubject(subj);
      setItemList(itemList.filter(a => a.title === subj));
    } else {
      setIsAgendaView(false);
      setSubject(null);
      setItemList(INITIAL_EVENTS);
    }
  }, [history]); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: any) => {
    setIsSpinner(true);

    const post = {
      StudentId: data.userProfile.id,
      FirstName: data.userProfile.firstname,
      LastName: data.userProfile.lastname,
      Email: data.userProfile.email,
      Role: data.userProfile.userProfile.role,
      HomeClass: 'home-class/ngg-2020-1a',
      Classes: [],
    };
    apiIdentity
      .post('/api/user/UpdateUserData', post)
      .then(response => {
        if (response.data === data.userProfile.id) {
          setIsUpdated(true);
          setIsSpinner(false);
          setTimeout(() => {
            setIsUpdated(false);
            hideModal();
          }, 1000);
        }
      })
      .catch(error => {
        logger.log(error);
      });
  };
  const showModalHandler = () => {
    showModal();
  };

  return (
    <>
      <ModalUserProfile
        user={data.userProfile}
        showModal={showModalHandler}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        onSubmit={onSubmit}
        isUpdated={isUpdated}
        isSpinner={isSpinner}
      />
      <div className="ms-Grid-col ms-lg12 rightpanel">
        <div className="ms-Grid-col ms-lg12 calendarday">
          <div className="ms-Grid-col  ms-lg6 card-title">
            {intl(LabelNames.lbl_schedules)}
          </div>
          <div className="ms-Grid-col  ms-lg6 text-right ">
            <IconButton
              iconProps={moreIcon}
              title="More"
              className="dashMore"
              ariaLabel="More"
            />
          </div>
          <br />
          <DashboardDailySchedule
            itemList={itemList}
            subject={subject}
            isAgendaView={isAgendaView}
          />
        </div>
      </div>
    </>
  );
};

export default RightLayout;
