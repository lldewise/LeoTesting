import React, { Fragment, useEffect, useState, useRef } from 'react';
import styles from './UserAccounts.module.scss';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
import { useStore } from '../../../../store/store';
import apiGet from '../../../../services/apiGet';
import {
  DefaultButton,
  FontIcon,
  ActionButton,
  MessageBar,
  MessageBarType,
  DialogType,
} from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import UserAccountLists from '../../../../components/adminANDteacher/UserAccounts/UserAccountLists/UserAccountLists';
import CategoryModal from '../../../../components/adminANDteacher/News/CategoryModal/CategoryModal';
import { useBoolean } from '@uifabric/react-hooks';
import {
  isCPRValid,
  isUndefinedOrEmpty,
} from '../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import logger from 'loglevel';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';
import apiUser from '../../../../services/apiUser';
import apiAccount from '../../../../services/apiAccount';
import apiStudent from '../../../../services/apiStudent';
import apiTeacher from '../../../../services/apiTeacher';
import DeleteDialogConfirmation from '../../../../components/userInterface/DeleteDialogConfirmation/DeleteDialogConfirmation';
import i18n from '../../../../i18n/i18n';

const type = require('../../../../assets/ui-kit/_variables.scss');

const pivotStyles = {
  root: [{ borderBottomColor: type.classScheduleBorder }],
  linkIsSelected: {
    selectors: {
      ':before': {
        backgroundColor: type.classScheduleBorder,
      },
    },
  },
};

let CategoryMenu = [
  {
    id: 1,
    classname: styles.boxActive,
    icon: 'IDBadge',
    title: 'Student',
    description: 'Create an account for a student in your school',
    active: true,
  },
  {
    id: 2,
    classname: styles.box,
    icon: 'Suitcase',
    title: 'Staff',
    description:
      'Create an account for all school staff such as teacher, admin, security, etc.',
    active: false,
  },
  {
    id: 3,
    classname: styles.box,
    icon: 'ContactHeart',
    title: 'Guardian',
    description: "Create an account for the student's guardian.",
    active: false,
  },
];

const dialogContentConfirm = {
  type: DialogType.largeHeader,
  title: 'Are you sure you want to delete this user?',
  subText: 'This user will be permanently removed from the system.',
  closeButtonAriaLabel: 'Cancel',
};

const UserAccounts: React.FC = () => {
  const [data, dispatch] = useStore();
  const { principal } = useAuthentication();

  const [students, setStudents] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>(data.staffAccountList);
  const [guardians, setGuardians] = useState<any[]>(data.guardianBySchool);
  const [dataLists, setDataLists] = useState<any[]>([]);

  const [id, setId] = useState<string | undefined>();
  const [isModalOpenCat, { setTrue: showModalCat, setFalse: hideModalCat }] =
    useBoolean(false);
  const [activeTab, setActiveTab] = useState<string>('Student');
  const [toggleWarning, setToggleWarning] = useState<boolean>(false);
  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);
  const [toggleSuccessDelete, setToggleSuccessDelete] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);
  const history = useHistory();

  const triggerLoad = useRef<boolean>(false);
  const tobeRemove = useRef<any>(null);
  const successDeletion = useRef<boolean>(false);
  const pivotActive = useRef<string>('1');
  const selectedAccount = useRef<any | null>(null);

  const closeErrMessage = () => {
    setToggleWarning(false);
  };

  const closeSuccessMessage = () => {
    successDeletion.current = false;
    setToggleSuccessDelete(false);
    setToggleSuccess(false);
  };

  const getGuardianBySchool = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/guardians?clientId=' +
        data.userExternalUnique,
    );
  };

  const getStudentBySchool = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/student?clientId=' +
        data.userExternalUnique,
    );
  };
  const getStaffBySchool = () => {
    apiGet.get(
      'api/school/' +
        data.userProfile.school +
        '/teacher?clientId=' +
        data.userExternalUnique,
    );
  };

  const handleCreateAccount = (key: any) => {
    updateCategoryMenu(pivotActive.current);
    showModalCat();
  };

  const pivotHandler = (value: any) => {
    let key = value.props.itemKey;
    pivotActive.current = key;
    setIsLoading(true);
    switch (key) {
      case '1':
        setTimeout(() => {
          setIsLoading(false);
          setDataLists(students);
          setActiveTab('Student');
        }, 500);
        break;
      case '2':
        setTimeout(() => {
          setIsLoading(false);
          setDataLists(staffs);
          setActiveTab('Staff');
        }, 500);
        break;
      case '3':
        setTimeout(() => {
          setIsLoading(false);
          setDataLists(guardians);
          setActiveTab('Guardian');
        }, 500);
        break;
      default:
        break;
    }
  };

  const updateCategoryMenu = (id: any) => {
    var updateData = [...CategoryMenu];
    updateData.forEach(element => {
      element.active = false;
      if (element.id === Number(id)) {
        element.active = true;
      }
    });
    CategoryMenu = updateData;
  };

  useEffect(() => {
    if (data.userProfile.id !== null) {
      if (!triggerLoad.current) {
        getStudentBySchool();
        getStaffBySchool();
        getGuardianBySchool();
      }
      triggerLoad.current = true;
    }
  }, [data.userProfile.id]);

  // populate student details per id
  // useEffect(() => {
  //   if (data.studentAccountByIdChanged) {
  //     let items = data.studentAccountByIds;
  //     if (items) {
  //       let ids: any[] = [];
  //       items.forEach(a => {
  //         ids.push(a.userId);
  //       });
  //       getUserDetailsByIds(ids);
  //     }
  //   }
  // }, [data.studentAccountByIds.length, data.studentAccountByIdChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.studentAccountList.length > 0) {
      let items = data.studentAccountList;
      setStudents(items);
      setDataLists(items);
      setActiveTab('Student');
      dispatch('SELECTEDUSERACCOUNT', null);
      dispatch('SELECTEDGUARDIANBYUSER', null);
    }
  }, [data.studentAccountList.length, data.studentAccountListChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.staffAccountList?.length > 0) {
      setStaffs(data.staffAccountList);
      if (activeTab === 'Staff') {
        setDataLists(data.staffAccountList);
      }
    }
  }, [data.staffAccountList.length, data.staffAccountListChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.guardianBySchool?.length > 0) {
      setGuardians(data.guardianBySchool);
      if (activeTab === 'Guardian') {
        setDataLists(data.guardianBySchool);
      }
    }
  }, [data.guardianBySchool.length, data.guardianBySchoolChanged]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      data.studentAccountListChanged &&
      data.staffAccountListChanged &&
      data.guardianBySchoolChanged
    ) {
      setIsLoading(false);
    }
  }, [
    data.studentAccountListChanged,
    data.staffAccountListChanged,
    data.guardianBySchoolChanged,
  ]);

  useEffect(() => {
    return () => {
      dispatch('CLEANUPRANDOMIZEDDATACHANGED', null);
      dispatch('CLEANUPGUARDIANLISTCHANGED', null);
    };
  }, []);

  const showModalCatHandler = () => {
    showModalCat();
  };
  const categoryContinueHandler = (item: any) => {
    var accountType = {
      isEdit: false,
      userType: item.title,
    };
    dispatch('SELECTEDUSERACCOUNTTYPE', accountType);
    hideModalCat();
    history.push('user-account/user');
  };

  // Dispatching via manage account callout
  const manageAccountHandler = (item: any) => {
    setSpinner(true);
    let dataItem = [];
    switch (item) {
      case 'Manage Account':
        setId(selectedAccount.current?.userId);
        let user = selectedAccount.current.userId;

        if (activeTab === 'Student') {
          dataItem = data.studentAccountList.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        } else if (activeTab === 'Staff') {
          dataItem = data.staffAccountList.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        } else {
          dataItem = data.guardianBySchool.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        }

        dispatch('SELECTEDUSERACCOUNT', dataItem);

        getUserGuardians(user);
        var accountType = {
          isEdit: true,
          userType: activeTab,
        };
        dispatch('SELECTEDUSERACCOUNTTYPE', accountType);
        setTimeout(() => {
          history.push('user-account/user');
        }, 2000);
        break;
      case 'Activate Account':
        setId(selectedAccount.current.userId);
        let details = selectedAccount.current;

        if (!isUndefinedOrEmpty(details.ssid) && isCPRValid(details.ssid)) {
          createIdentity(
            selectedAccount.current.userId,
            details.ssid,
            details.email,
            true,
            true,
            null,
            true,
            details,
          );
        } else {
          createIdentity(
            selectedAccount.current.userId,
            details.email,
            details.email,
            true,
            true,
            null,
            true,
            details,
          );
        }
        break;
      case 'Delete User':
        setId(selectedAccount.current.userId);

        if (activeTab === 'Student') {
          dataItem = data.studentAccountList.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        } else if (activeTab === 'Staff') {
          dataItem = data.staffAccountList.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        } else {
          dataItem = data.guardianBySchool.filter(
            a => a.userId === selectedAccount.current.userId,
          );
        }
        tobeRemove.current = dataItem;
        successDeletion.current = false;
        toggleHideDialogConfirm();
        break;
      default:
        break;
    }
  };

  const manageCalloutHandler = (item: any) => {
    selectedAccount.current = item;
  };

  //----- removing user profile function -----------------------------------

  const deleteConfirmHandler = () => {
    deleteUserAndSubEntity(activeTab);
    setTimeout(() => {
      toggleHideDialogConfirm();
      tobeRemove.current = null;
      if (successDeletion.current) {
        setToggleSuccessDelete(true);
      }
    }, 2000);
  };

  const deleteUserAndSubEntity = (type: any) => {
    let item = tobeRemove.current;

    apiUser
      .delete('api/school/' + data.userProfile.school + '/user/' + item[0].id, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          switch (type) {
            case 'Student':
              removeStudentEntity(item[0].studentId, item[0]);
              break;
            case 'Staff':
              removeStaffEntity(item[0].staffId, item[0]);
              break;
            case 'Guardian':
              removeGuardianEntity(item[0].guardianId, item[0]);
              break;
            default:
              break;
          }
        }
      });
  };

  const removeStudentEntity = (id: any, user: any) => {
    apiStudent
      .delete('api/school/' + data.userProfile.school + '/student/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          successDeletion.current = true;
          setTimeout(() => {
            dispatch('REMOVEDELETEDSTUDENT', user);
          }, 500);
        }
      });
  };

  const removeStaffEntity = (staffId: any, user: any) => {
    apiTeacher
      .delete('api/school/' + data.userProfile.school + '/staff/' + staffId, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          successDeletion.current = true;
          setTimeout(() => {
            dispatch('REMOVEDELETEDSTAFF', user);
          }, 1500);
        }
      });
  };

  const removeGuardianEntity = (id: any, user: any) => {
    apiUser
      .delete('api/school/' + data.userProfile.school + '/guardian/' + id, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          successDeletion.current = true;
          setTimeout(() => {
            dispatch('REMOVEDELETEDGUARDIAN', user);
          }, 1500);
        }
      });
  };
  //------------------------------------------------------------------------------------

  const getUserGuardians = (user: any) => {
    // Get user guardians
    const p = {
      clientId: data.userExternalUnique,
    };
    apiGet.get(
      'api/school/' + data.userProfile.school + '/guardians/user/' + user,
      { params: p },
    );
  };

  const getUserDetailsByIds = (ids: any) => {
    if (ids.length > 0) {
      const p = {
        ids: JSON.stringify(ids),
      };
      apiGet.get(
        'api/school/' +
          data.userProfile.school +
          '/userlist?clientId=' +
          data.userExternalUnique,
        {
          params: p,
        },
      );
    }
  };

  // Dispatching via user profil name link
  const manageLinkHandler = (item: any) => {
    setId(item.id);
    var accountType = {
      isEdit: true,
      userType: activeTab,
    };
    dispatch('SELECTEDUSERACCOUNTTYPE', accountType);
    let dataItem: any = {};
    if (activeTab === 'Student') {
      dataItem = data.studentAccountList.filter(a => a.id === item.id)[0];
    } else if (activeTab === 'Staff') {
      dataItem = data.staffAccountList.filter(a => a.id === item.id)[0];
    } else {
      dataItem = data.guardianBySchool.filter(a => a.id === item.id)[0];
    }

    var details: any = {
      imageUrl: dataItem.imgUrl,
      imageInitials:
        dataItem.firstName.substring(0, 1) + dataItem.lastName.substring(0, 1),
      text: item.firstName + ' ' + item.lastName,
      secondaryText: null,
      tertiaryText: null,
      optionalText: null,
      firstname: dataItem.firstName,
      lastname: dataItem.lastName,
      email: dataItem.email,
      id: dataItem.id,
      lang: 'en',
      role: data.userProfile.role,
      school: dataItem.school,
      contactNo: dataItem.phone,
      secondaryContactNo: dataItem.phone1,
    };
    dispatch('SELECTEDUSERPROFILE', details);
    history.push('/' + i18n.language + '/profile/myprofile');
  };

  const createIdentity = (
    id: any,
    username: string,
    email: string,
    returnPassword: boolean,
    sendEmail: boolean,
    password: string | null,
    isStudent: boolean,
    user: any,
  ) => {
    let endpointURI = undefined;
    if (username) {
      endpointURI = `/api/CreateAteduSSOIdentity?username=${escape(
        username,
      )}&email=${escape(
        email,
      )}&returnPassword=${returnPassword}&sendEmail=${sendEmail}`;
    } else {
      endpointURI = `/api/CreateIdentityForNemID?email=${escape(
        email,
      )}&returnPassword=${returnPassword}&sendEmail=${sendEmail}`;
    }
    apiAccount
      .post(endpointURI, '', {
        headers: {
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(function (response) {
        saveActivation(user, response.data.ActivaionData);
      })
      .catch(function (error) {
        logger.error(error);
        setToggleWarning(true);
      })
      .finally(() => {
        setTimeout(() => {
          setToggleWarning(false);
        }, 3000);
      });
  };

  const saveActivation = async (user: any, activationcode: any) => {
    if (activationcode !== null || activationcode !== '') {
      var postData = {
        userId: user.id ?? id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        externalId: [],
        contantNo: user.phone,
        secondaryContantNo: user.phone1,
        imgUrl: user.id ?? id,
        ssid: user.ssid,
        cOnavn: user.conavn,
        address1: user.address1,
        address2: user.address2,
        zipCode: user.zipCode,
        munincipality: user.municipality,
        country: user.country,
        activationcode: activationcode,
        status: 'Active',
      };
      await apiUser
        .post('/api/school/' + data.userProfile.school + '/user', postData, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        })
        .then(res => {
          setToggleSuccess(true);
        })
        .finally(() => {
          setTimeout(() => {
            setToggleSuccess(false);
          }, 3000);
        });
    }
  };

  const onCancel = () => {
    toggleHideDialogConfirm();
    setSpinner(false);
  };

  return (
    <Fragment>
      <DeleteDialogConfirmation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={deleteConfirmHandler}
        onCancel={onCancel}
        spinner={false}
      />
      <CategoryModal
        showModal={showModalCatHandler}
        isModalOpen={isModalOpenCat}
        hideModal={hideModalCat}
        continue={categoryContinueHandler}
        title="Choose a category for the user you're creating"
        subtitle=""
        menu={CategoryMenu}
      />
      {toggleWarning && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={closeErrMessage}
          dismissButtonAriaLabel="Close">
          The email that used for this account already exist.
        </MessageBar>
      )}
      {toggleSuccess && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={closeSuccessMessage}
          dismissButtonAriaLabel="Close">
          Account successfully activated.
        </MessageBar>
      )}
      {toggleSuccessDelete && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={closeSuccessMessage}
          dismissButtonAriaLabel="Close">
          Account successfully deleted.
        </MessageBar>
      )}
      <div className="ms-Grid-row ">
        <div className={'ms-Grid-col ms-lg12 ' + styles.userAccCol}>
          {/* header container*/}
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
              <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                <FontIcon iconName="ContactCardSettings" />
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.headertitle}>
                User Accounts
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
          <div className={'ms-Grid-col ms-lg12 ' + styles.bannerMessage}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.contentControl}>
              <div className="ms-Grid-col ms-lg6">
                <div className={'ms-Grid-col ms-lg12 ' + styles.pivotContainer}>
                  <Pivot styles={pivotStyles} onLinkClick={pivotHandler}>
                    <PivotItem headerText="Students" itemKey="1"></PivotItem>
                    <PivotItem headerText="Staff" itemKey="2"></PivotItem>
                    <PivotItem headerText="Guardians" itemKey="3"></PivotItem>
                  </Pivot>
                </div>
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.btnCreate}>
                <DefaultButton
                  iconProps={{ iconName: 'Add' }}
                  text="Create User"
                  className={'btnPrimary'}
                  onClick={() => handleCreateAccount(pivotActive)}
                />
              </div>
            </div>
          </div>
          {/* content */}
          <div className="ms-Grid-row">
            <div>
              <UserAccountLists
                spinner={spinner}
                listItem={dataLists}
                activeTab={activeTab}
                isLoading={isLoading}
                manageAccountHandler={manageAccountHandler}
                manageLinkHandler={manageLinkHandler}
                manageCalloutHandler={manageCalloutHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAccounts;
