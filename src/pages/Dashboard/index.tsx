import React, { useEffect, useState } from 'react';
import { useSessionStorage } from 'react-use';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Assignmentlist } from '../../components/itemlist';
import RightLayout from '../../components/layout/RightLayout';
import { useStore } from '../../store/store';
import styles from './Dashboard.module.scss';
import DueSoon from '../../components/duesoon/DueSoon';
import axios from '../../services/api';
import logger from 'loglevel';
import {
  Modal,
  IconButton,
  PrimaryButton,
  mergeStyleSets,
  getTheme,
  FontWeights,
  CommandBarButton,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { LabelNames } from '../../util/constant';
import { intl } from '../../util/commonFunction';
import { Fragment } from 'react';
import AdminDashboard from '../Administration/Dashboard';
import TeacherDashboard from '../Teachers/Dashboard';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import MessageBanner from '../../components/banner/MessageBanner/MessageBanner';
import { ClassAssignment } from '../../types/store/item';
import AttendanceCard from '../../components/attendance/AttendanceCard';
import CarouselNews from '../../components/news/CarouselNews/CarouselNews';

const uploadIcon = { iconName: 'Upload' };
const moreIcon = { iconName: 'More' };
const chevronDownIcon = { iconName: 'ChevronDown' };
const forwardIcon = { iconName: 'Forward' };

const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
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

const linkItem = [
  {
    id: 1,
    name: intl(LabelNames.homeWorks),
    foldername: 'HOMEWORKS',
    classname: styles.aLinkactive,
  },
  {
    id: 2,
    name: intl(LabelNames.assignments),
    foldername: 'ASSIGNMENT',
    classname: styles.aLink,
  },
  {
    id: 3,
    name: intl(LabelNames.smenu_documents),
    foldername: 'DOCUMENTS',
    classname: styles.aLink,
  },
];

const Dashboard: React.FC = () => {
  const [data, dispatch] = useStore();
  // eslint-disable-next-line
  const [liList, setliList] = useState(linkItem);
  const [containerList, setContainerList] = useState(data.homeworklist);
  const value: [any, (value: any) => void] = useSessionStorage(
    'atedusso.authentication',
  );
  // for file upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadLabel, setUploadLabel] = useState(intl(LabelNames.upload));
  const [isUploadProgress, setIsUploadProgress] = useState(false);
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(intl(LabelNames.homeWorks));
  const [userView, setUserView] = useState<JSX.Element | null>(null);
  const { userProfile } = data;

  const getAllItemDrive = () => {};

  useEffect(() => {
    if (value[0].principal.accessToken !== undefined) {
      getAllItemDrive();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const assignmentClickHandler = (value: ClassAssignment) => {
    const updateItemList = [...containerList];
    updateItemList.forEach(item => {
      item.selected = false;
      if (item.index === value.index) {
        item.selected = !value.selected;
      }
    });
    setContainerList(updateItemList);
  };

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const cancelIcon = { iconName: 'Cancel' };

  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header: [
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });

  //const toggleStyles = { root: { marginBottom: "20px" } };
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    setIsUploadProgress(true);
    setUploadLabel(intl(LabelNames.uploading) + '...');
    const folderName = liList
      .filter(a => a.classname.includes('aLinkactive'))[0]
      .foldername.toUpperCase();
    const formData = new FormData();

    // Update the formData object
    formData.append('file', selectedFile as Blob, selectedFile?.name);

    const config = {
      headers: {
        Authorization: `Bearer ${value[0].principal.accessToken}`,
      },
    };
    axios
      .post('/api/file/UploadFiles/' + folderName, formData, config)
      .catch(error => {
        logger.log(error);
      })
      .then((response: any) => {
        setSelectedFile(null);
        setUploadLabel(intl(LabelNames.upload));

        if (response.data.uploadSucceeded) {
          setIsUploaded(true);
          setTimeout(() => {
            setIsUploadProgress(false);
            hideModal();
          }, 3000);
        } else {
          setIsUploadProgress(false);
          hideModal();
        }
      });
  };

  const pivotHandler = (value: any) => {
    //UpdateContainer(  value.props.itemKey)
    // setMyTask(false);
  };

  useEffect(() => {
    if (userProfile.role != null) {
      switch (userProfile.role) {
        case 'Student':
          const admiview: JSX.Element = (
            <div className={'ms-Grid-row ' + styles.dashboard}>
              <div
                className={
                  'ms-Grid-col ms-lg9 customScroll dashboardMainPanel dashboard-center-panel ' +
                  styles.dashboardMessageBanner
                }>
                <div className="">
                  <div className="ms-Grid-row">
                    <MessageBanner />
                  </div>

                  <div className="ms-Grid-row">
                    <DueSoon dueSoonList={data.dueSoon} />
                  </div>

                  <div className="ms-Grid-row bclist borderDiv">
                    <div
                      className={
                        'ms-Grid-col  ms-lg12 text-right ' + styles.padUS
                      }>
                      <span className="padl10">
                        <CommandBarButton
                          iconProps={uploadIcon}
                          text="Upload"
                          className="btnPlain dashUpload"
                          onClick={showModal}
                        />
                        <IconButton
                          iconProps={moreIcon}
                          title="More"
                          className="dashMore"
                          ariaLabel="More"
                        />
                      </span>
                    </div>
                    <div className="ms-Grid-col ms-lg12">
                      <Pivot
                        styles={pivotStyles}
                        className="dashboardPivotTab"
                        onLinkClick={pivotHandler}>
                        <PivotItem
                          headerText={intl(LabelNames.homeWorks)}
                          itemKey="1">
                          <div className="ms-Grid-row">
                            <Assignmentlist
                              itemlist={data.homeworklist}
                              onClickRow={assignmentClickHandler}
                            />
                            <div
                              className={
                                'ms-Grid-row bclist ' + styles.assignmentHeader
                              }>
                              <div className="ms-Grid-col  ms-lg6">
                                <span>
                                  <CommandBarButton
                                    iconProps={chevronDownIcon}
                                    text="Show More"
                                    className="btnPlain dashUpload rightBtnIcon"
                                    onClick={showModal}
                                  />
                                </span>
                              </div>
                              <div
                                className={
                                  'ms-Grid-col  ms-lg6 text-right ' +
                                  styles.cursor
                                }>
                                <span>
                                  <CommandBarButton
                                    iconProps={forwardIcon}
                                    text="More"
                                    className="btnPlain dashUpload rightBtnIcon"
                                    onClick={showModal}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </PivotItem>
                        <PivotItem
                          headerText={intl(LabelNames.assignments)}
                          itemKey="2">
                          <div className="ms-Grid-row">
                            <Assignmentlist
                              itemlist={data.assignmentlist}
                              onClickRow={assignmentClickHandler}
                            />
                            <div
                              className={
                                'ms-Grid-row bclist ' + styles.assignmentHeader
                              }>
                              <div className="ms-Grid-col  ms-lg6">
                                <span className={'padl10 ' + styles.cursor}>
                                  {intl(LabelNames.showMore)}
                                </span>
                                <span className="padl10">
                                  {' '}
                                  <FontIcon
                                    iconName="ChevronDown"
                                    className={styles.cursor}
                                  />
                                </span>
                              </div>
                              <div
                                className={
                                  'ms-Grid-col  ms-lg6 text-right ' +
                                  styles.cursor
                                }>
                                <span className="padl10">
                                  {' '}
                                  {intl(LabelNames.more)}
                                </span>
                                <span className="padl10">
                                  {' '}
                                  <FontIcon
                                    iconName="Forward"
                                    className="icondDefault"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </PivotItem>
                        <PivotItem
                          headerText={intl(LabelNames.smenu_documents)}
                          itemKey="3">
                          <div className="ms-Grid-row">
                            <Assignmentlist
                              itemlist={data.documentslist}
                              onClickRow={assignmentClickHandler}
                            />
                            <div
                              className={
                                'ms-Grid-row bclist ' + styles.assignmentHeader
                              }>
                              <div className="ms-Grid-col  ms-lg6">
                                <span className={'padl10 ' + styles.cursor}>
                                  {intl(LabelNames.showMore)}
                                </span>
                                <span className="padl10">
                                  {' '}
                                  <FontIcon
                                    iconName="ChevronDown"
                                    className={styles.cursor}
                                  />
                                </span>
                              </div>
                              <div
                                className={
                                  'ms-Grid-col  ms-lg6 text-right ' +
                                  styles.cursor
                                }>
                                <span className="padl10">
                                  {' '}
                                  {intl(LabelNames.more)}
                                </span>
                                <span className="padl10">
                                  {' '}
                                  <FontIcon
                                    iconName="Forward"
                                    className="icondDefault"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </PivotItem>
                      </Pivot>
                    </div>
                  </div>

                  <br />
                  <div className="ms-Grid-row">
                    <div className={'ms-Grid-col ms-lg6 ' + styles.col100}>
                      <div
                        className={'ms-Grid-row ' + styles.dashboardAttendance}>
                        <div
                          className={
                            'ms-Grid-col ms-lg12 padR18 ' +
                            styles.dashboardColAttendance
                          }>
                          <AttendanceCard />
                        </div>
                      </div>
                    </div>
                    <div className={'ms-Grid-col ms-lg6 ' + styles.col100}>
                      <div
                        className={'ms-Grid-row ' + styles.dashboardNewsCard}>
                        <div className="ms-Grid-col ms-lg12">
                          <CarouselNews
                            featuredNewsList={data.adminFeaturedNews}
                            regularNewsList={data.adminRegularNews}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <div className="ms-Grid-col ms-lg3 dashboard-right-panel">
                <RightLayout />
              </div>
            </div>
          );
          setUserView(admiview);
          break;
        case 'Administrator':
          setUserView(<AdminDashboard />);
          break;
        case 'Teacher':
          setUserView(<TeacherDashboard />);
          break;
        default:

        // code block
      }
    }
  }, [userProfile.role, data.adminFeaturedNews, data.adminRegularNews]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Modal isOpen={isModalOpen} onDismiss={hideModal} isBlocking={false}>
        <div className={contentStyles.header}>
          <span>{intl(LabelNames.upload) + ' ' + activeTab}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <br />
        <div className={styles.uploadAlign}>
          <input type="file" onChange={onFileChange} /> <br />
          <br />
          <br />
          <div className={styles.uploadProgress}>
            <PrimaryButton
              text={uploadLabel}
              onClick={onFileUpload}
              disabled={!selectedFile}
            />{' '}
            &nbsp;
            {isUploadProgress && !isUploaded && (
              <Spinner size={SpinnerSize.medium} />
            )}
          </div>
          {isUploaded && (
            <div className={styles.uploadLabelComplete}>
              {intl(LabelNames.uploadCompleted)}
            </div>
          )}
        </div>
      </Modal>
      {userView}
    </>
  );
};

export default Dashboard;
