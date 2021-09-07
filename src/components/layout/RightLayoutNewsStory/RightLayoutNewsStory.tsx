import React, { useEffect, Fragment } from 'react';
import logger from 'loglevel';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { useStore } from '../../../store/store';
import { intl } from '../../../util/commonFunction';
import { LabelNames, Literal } from '../../../util/constant';
import ModalUserProfile from '../../modal/modaluserprofile/ModalUserProfile';

import { useBoolean } from '@uifabric/react-hooks';
import { useSessionStorage } from 'react-use';
import { CURRENTDB_USER } from '../../../store/User/userProfileAction';
import apiIdentity from '../../../services/apiIdentity';
import moment from 'moment';
import classes from './RightLayoutNewsStory.module.scss';
import CreateSidebarNewsStory from '../../../components/adminANDteacher/News/CreateSidebarNewsStory/CreateSidebarNewsStory';

const defaultbtnStyles = {
  rootHovered: {
    backgroundColor: 'white',
    border: '1px solid white',
  },
};

const dateToday = moment(new Date()).format('MMM DD, YYYY hh:mm:ss');

type RightLayoutNewsStoryProps = {
  manageNewStories: any;
  categoryItem: any;
  categoryData: any;
  onSaveDraft: any;
  onPublish: any;
  publishDate: any;
  archivedDate: any;
  customizedurl: any;
  featuredArticle: any;
  privacy: any;
  errorMessage: any;
};

const RightLayoutNewsStory: React.FC<RightLayoutNewsStoryProps> = props => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [isSpinner, setIsSpinner] = React.useState(false);
  const [userProfile, dispatch] = useStore();
  const value: any = useSessionStorage(Literal.AUTH_STOREGE_KEY);

  const getUserDetails = () => {
    const config = {
      headers: { Authorization: `Bearer ${value[0].principal.AccessToken}` },
    };

    apiIdentity
      .get('/api/user/' + encodeURIComponent(value[0].principal.id), config)
      .then(response => {
        dispatch(CURRENTDB_USER, response.data);
      })
      .catch(error => {
        logger.log(error);
      })
      .then(() => {});
  };

  useEffect(() => {
    if (value[0].principal.AccessToken !== undefined) {
      logger.log(value[0].principal);
      getUserDetails();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: any) => {
    setIsSpinner(true);
    const post = {
      StudentId: userProfile.userProfile.id,
      FirstName: data.firstname,
      LastName: data.lastname,
      Email: data.email,
      HomeClass: 'home-class/ngg-2020-1a',
      Classes: [],
    };
    apiIdentity
      .post('/api/user/UpdateUserData', post)
      .then(response => {
        if (response.data === userProfile.userProfile.id) {
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
        user={userProfile.userProfile}
        showModal={showModalHandler}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        onSubmit={onSubmit}
        isUpdated={isUpdated}
        isSpinner={isSpinner}
      />

      <div className="ms-Grid-col ms-lg12 rightpanelNews">
        <div className={'RightLayoutNewsStory ' + classes.container}>
          <br />
          <div className="ms-Grid-row">
            <div
              className={'ms-Grid-col ms-lg12 ' + classes.padL15}
              onClick={showModal}>
              <Persona
                imageUrl={
                  userProfile.userProfile.imageUrl !== null
                    ? userProfile.userProfile.imageUrl
                    : undefined
                }
                text={
                  userProfile.userProfile.text !== null
                    ? userProfile.userProfile.text
                    : undefined
                }
                secondaryText={
                  userProfile.userProfile.role !== null
                    ? userProfile.userProfile.role
                    : undefined
                }
                size={PersonaSize.size48}
                presence={PersonaPresence.online}
                imageAlt="Annie Lindqvist, status is online"
              />
            </div>
          </div>
          <br />
          <div className="ms-Grid-row">
            <div className={'ms-Grid-col ms-lg12 ' + classes.padL15}>
              <div>{intl(LabelNames.createddate)}</div>
              <div className={classes.date}>
                {props.manageNewStories != null
                  ? moment(props.manageNewStories.createddate).format(
                      'MMM DD, YYYY hh:mm:ss',
                    )
                  : dateToday}
              </div>
            </div>
          </div>
          <br />
          <div className="ms-Grid-row">
            <div className={'ms-Grid-col ms-lg12 ' + classes.padL15}>
              <div>{intl(LabelNames.lastmodifieddate)}</div>
              <div className={classes.date}>
                {props.manageNewStories != null
                  ? moment(props.manageNewStories.createddate).format(
                      'MMM DD, YYYY hh:mm:ss',
                    )
                  : dateToday}
              </div>
            </div>
          </div>
          <br />
          <hr className="divider" />
          <CreateSidebarNewsStory
            categoryItem={props.categoryItem}
            categoryData={props.categoryData}
            publishDate={props.publishDate}
            archivedDate={props.archivedDate}
            customizedurl={props.customizedurl}
            featuredArticle={props.featuredArticle}
            privacy={props.privacy}
            manageNewStories={props.manageNewStories}
            errorMessage={props.errorMessage}
          />
        </div>
      </div>

      <div className="ms-Grid-col ms-lg12">
        <div className={classes.footerContainer}>
          <hr className="divider" />
          <div className={'ms-Grid-row ' + classes.padTop}>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-col ms-lg12 ' + classes.textRight}>
                <span>
                  {' '}
                  <DefaultButton
                    text={intl(LabelNames.saveasdraft)}
                    type="button"
                    styles={defaultbtnStyles}
                    className={classes.defaultbtn}
                    onClick={props.onSaveDraft}
                  />{' '}
                </span>
                <span className="padR5" />
                <span>
                  {' '}
                  <PrimaryButton
                    className="btnPrimary"
                    onClick={props.onPublish}
                    text={intl(LabelNames.publish)}
                    type="submit"
                  />{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightLayoutNewsStory;
