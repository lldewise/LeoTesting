import React, { Fragment, useEffect, useState } from 'react';
import styles from './UserAccountsCreate.module.scss';
import {
  FontIcon,
  Nav,
  Persona,
  PersonaSize,
  ActionButton,
} from 'office-ui-fabric-react';
import UserRoles from './UserRoles/UserRoles';
import ateduimg from '../../../../assets/profileatedu.png';
import { useStore } from '../../../../store/store';
import EmploymentInfo from './EmploymentInfo/EmploymentInfo';
import SchoolYear from './SchoolYear/SchoolYear';
import Profile from './Profile/Profile';
import Guardian from './Guardian/Guardian';
import apiUser from '../../../../services/apiUser';
import apiAccount from '../../../../services/apiAccount';
import apiTeacher from '../../../../services/apiTeacher';
import apiStudent from '../../../../services/apiStudent';
import { DialogType, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import DialogConfirmation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import CreateGuardian from './CreateGuardian/CreateGuardian';
import { LabelNames } from '../../../../util/constant';
import {
  intl,
  isCPRValid,
  isUndefinedOrEmpty,
} from '../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import logger from 'loglevel';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import moment from 'moment';
const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
  },
};

const StudentNav = [
  {
    links: [
      {
        name: intl(LabelNames.profile),
        key: '2',
        disabled: false,
        icon: 'IDBadge',
      },
      {
        name: intl(LabelNames.guardian),
        key: '3',
        disabled: true,
        icon: 'ContactHeart',
      },
      {
        name: intl(LabelNames.ateduAccount),
        key: '1',
        disabled: true,
        icon: 'PlayerSettings',
      },
    ],
  },
];
const StaffNav = [
  {
    links: [
      {
        name: intl(LabelNames.profile),
        key: '2',
        icon: 'IDBadge',
        disabled: false,
      },
      {
        name: intl(LabelNames.employmentInfo),
        key: '4',
        icon: 'AccountManagement',
        disabled: true,
      },
      {
        name: intl(LabelNames.schoolyear),
        key: '5',
        icon: 'CalendarSettings',
        disabled: true,
      },
      {
        name: intl(LabelNames.ateduAccount),
        key: '1',
        icon: 'PlayerSettings',
        disabled: true,
      },
    ],
  },
];

const GuardianNav = [
  {
    links: [
      {
        name: intl(LabelNames.profile),
        key: '2',
        icon: 'IDBadge',
        disabled: false,
      },

      {
        name: intl(LabelNames.student),
        key: '6',
        icon: 'ContactHeart',
        disabled: true,
      },
      {
        name: intl(LabelNames.ateduAccount),
        key: '1',
        icon: 'PlayerSettings',
        disabled: true,
      },
    ],
  },
];

let userProfile: any = {};

const dialogContentConfirm = {
  type: DialogType.normal,
  title: intl(LabelNames.doYouWantToSaveThisUser),
  closeButtonAriaLabel: 'Cancel',
  subText: intl(LabelNames.userprofileDesc),
};

const rolesList = ['Student', 'SC-President', 'Teacher', 'Guardian'].map(
  item => ({
    key: item.toLocaleLowerCase(),
    name: item,
  }),
);

const UserAccountsCreate: React.FC = () => {
  // eslint-disable-next-line
  const [dataStore, dispatch] = useStore();
  const { principal } = useAuthentication();
  // const [tmpPassword, setTmpPassword] = useState("");
  const selectedUserType = useRef(dataStore.userAccountType);
  const [selectedMenu, setSelectedMenu] = useState<string>('2');
  const [container, setContainer] = useState<any>();
  const [navLink, setNavLink] = useState<any>();
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);
  const [selectedLang, setSelecetedLang] = useState<string | undefined>();

  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showEnrollment, setShowEnrollment] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const [toggleWarning, setToggleWarning] = useState<boolean>(false);
  const [imgView, setimgView] = useState(ateduimg);
  const [completeName, setCompleteName] = useState(
    selectedUserType.current.userType,
  );

  const selectedMenuRef = useRef<any>();
  const spinnerValue = useRef<boolean>(false);
  const history = useHistory();

  const guardianList = dataStore.guardianBySchool.map(element => ({
    key: element.guardianId,
    name: element.lastName + ' ' + element.firstName,
    contactNo: element.phone,
    email: element.email,
    status: element.guardianId,
    userId: element.id,
    studentIds: element.guardianStudentId,
  }));

  const _onLinkClick = (ev: any, item: any) => {
    selectedMenuRef.current = item.key.toString();
    setSelectedMenu(item.key.toString());
    selectedNavigation(item.key);
  };

  let scYear: any[] = [];
  let profile: any = {};
  let ateduAccount: any = {};
  let employee: any = {};
  let initialGuardian: any[] = [];
  let guardianStudentList: any[] = [];

  useEffect(() => {
    if (selectedUserType.current.isEdit) {
      setShowPassword(true);
      if (dataStore.selectedUserAccount.id !== null) {
        let item = dataStore.selectedUserAccount;
        if (item !== undefined) {
          loadInitialData(item, 'profile');
        }
      }
    }
  }, [dataStore.selectedUserAccount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedUserType.current.isEdit) {
      setShowPassword(true);
      if (dataStore.selectedUserGuardians.length > 0) {
        let guardians = dataStore.selectedUserGuardians;
        if (guardians !== undefined) {
          loadInitialData(guardians, 'guardians');
        }
      }
    }
  }, [dataStore.selectedUserGuardians]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedUserType.current.isEdit) {
      setShowPassword(true);
      if (dataStore.staffEmploymentData.length > 0) {
        let staff = dataStore.staffEmploymentData.find(
          element => element.userId === dataStore.selectedUserAccount.id,
        );
        if (staff !== undefined) {
          loadInitialData(staff, 'staff');
        }
      }
    }
  }, [dataStore.staffEmploymentData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!selectedUserType.current.isEdit) {
      loadInitialData(null, 'initial');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStudentName = (name: string) => {
    let student = dataStore.studentAccountList.find(
      a => a.id === name.split('/')[1],
    );
    if (student !== undefined) {
      return student.name;
    } else {
      return null;
    }
  };

  const loadInitialData = (item: any, tobeUpdate: any) => {
    if (tobeUpdate === 'staff') {
      scYear = [
        {
          id: 1,
          active: 1,
          // schoolYear: "2021/21",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
        {
          id: 2,
          active: 1,
          // schoolYear: "2021/22",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
        {
          id: 3,
          active: 1,
          // schoolYear: "2021/23",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
      ];
      employee = {
        bankNo: item.empHistory.bankNo,
        bankAccountNo: item.empHistory.bankAccountNo,
        withdrawalPercentage: item.empHistory.withdrawalPercentage,
        employmentRate: item.empHistory.employmentRate,
        dateEmployment: item.empHistory.dateEmployment,
        dateResignation: item.empHistory.dateResignation,
        homeInstitutionNo: item.empHistory.homeInstitutionNo,
      };
    } else if (tobeUpdate === 'initial') {
      scYear = [
        {
          id: 1,
          active: 1,
          // schoolYear: "2021/21",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
        {
          id: 2,
          active: 1,
          // schoolYear: "2021/22",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
        {
          id: 3,
          active: 1,
          // schoolYear: "2021/23",
          // agreedTime: "1709,40",
          // plusBankBussiness: "1709,40",
          // minusBankBussiness: "1709,40",
          // maxOvertime: "1709,40",
          // maxUndertime: "1709,40",
        },
      ];
      employee = {
        bankNo: null,
        bankAccountNo: null,
        withdrawalPercentage: null,
        employmentRate: null,
        dateEmployment: null,
        dateResignation: null,
        homeInstitutionNo: null,
      };
    }

    if (tobeUpdate === 'profile') {
      var img = item.imgUrl != undefined ? item.imgUrl : ateduimg;
      setimgView(img);
      var firstName = item?.firstName !== null ? item?.firstName : null;
      var lastName = item?.firstName !== null ? item?.lastName : null;
      setCompleteName(firstName + ' ' + lastName);
      profile = {
        firstName: item?.firstName !== null ? item?.firstName : null,
        lastName: item?.lastName !== null ? item?.lastName : null,
        birthday: item?.birthday !== null ? item?.birthday : null,
        cprNumber: item?.cprNumber !== null ? item?.cprNumber : null,
        imgProfile: item?.imgUrl,
        phone: item?.phone,
        phone1: item?.phone1,
        address1: item?.address1,
        address2: item?.address2,
        zipcode: item?.zipCode,
        conavn: item?.conavn,
        ssid: item?.ssid,
        municipality: item?.municipality,
        country: item?.country,
        id: item?.id,
        guardianId: item?.guardianId,
        personalemail: item?.personalemail,
        status: item?.status,
      };
      if (selectedUserType.current.userType === 'Guardian') {
        let relation = [];
        if (item.idsMotherTo.length > 0) {
          relation.push([...item.idsMotherTo, 'relation/mother']);
        }
        if (item.idsFatherTo.length > 0) {
          relation.push([...item.idsFatherTo, 'relation/father']);
        }
        if (item.idsLegalTo.length > 0) {
          relation.push([...item.idsLegalTo, 'relation/legal']);
        }
        if (relation.length > 0) {
          relation.forEach(a => {
            let items = a;
            if (items.length > 0) {
              let relationship = items[a.length - 1].split('/')[1];
              items.forEach((b, i) => {
                if (b.split('/')[0] === 'user') {
                  let student = getStudentName(b);
                  if (student !== null) {
                    let details = {
                      id: i + 1,
                      fullName: [{ key: b.split('/')[1], name: student }],
                      relationship: relationship,
                    };
                    guardianStudentList.push(details);
                  }
                }
              });
            }
          });
        }
      }
    } else if (tobeUpdate === 'initial') {
      profile = {
        firstName: null,
        lastname: null,
        birthday: null,
        cprNumber: null,
        imgProfile: null,
        phone: null,
        phone1: null,
        address1: null,
        address2: null,
        zipcode: null,
        conavn: null,
        ssid: null,
        municipality: null,
        country: null,
        id: null,
        guardianId: null,
        status: 'Inactive',
      };
    }
    if (tobeUpdate === 'profile') {
      var roles: any[] = item.roles.map((r: any) => {
        var rolesItem = {
          key: r,
          name: r.replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
        };
        return rolesItem;
      });
      ateduAccount = {
        roles: roles,
        ssid: item?.ssid,
        email: item?.email,
        activeAccount: item?.status,
        tmpPassword: '',
        id: item.studentId,
      };
    } else if (tobeUpdate === 'initial') {
      ateduAccount = {
        roles: [],
        ssid: null,
        email: null,
        activeAccount: true,
        id: null,
        tmpPassword: '',
      };
    }
    // employee = {
    //   bankNo: null,
    //   bankAccountNo: null,
    //   withdrawalPercentage: null,
    //   employmentRate: null,
    //   dateEmployment: null,
    //   dateResignation: null,
    //   homeInstitutionNo: null,
    //   id: null,
    // };

    if (tobeUpdate === 'guardians') {
      item.forEach((a: any, key: number) => {
        let relation = null;
        if (a.idsFatherTo.length > 0) {
          relation = 'father';
        } else if (a.idsMotherTo.length > 0) {
          relation = 'mother';
        } else {
          relation = 'legal';
        }
        let add = {
          id: key + 1,
          fullName: [
            {
              key: a.guardianId,
              name: a.lastName + ' ' + a.firstName,
              contactNo: a.phone,
              email: a.email,
              status: a.guardianId,
              userId: a.id,
              studentIds: a.guardianStudentId,
            },
          ],
          firstName: a.firstName,
          lastName: a.lastName,
          useStudentAddress: true,
          relationship: relation,
          contactNo: a?.phone,
          email: a?.email,
          status: false,
          conavn: a?.conavn,
          address1: a?.address1,
          address2: a?.address2,
          zipcode: a?.zipCode,
          municipality: a?.municipality,
          country: a?.country,
          guardianStat: 'edit',
          active: a?.status === 'Active' ? true : false,
        };
        initialGuardian.push(add);
      });
    } else if (tobeUpdate === 'initial') {
      initialGuardian = [];
    }

    userProfile = {
      ateduAccount: ateduAccount,
      profile: profile,
      guardian: initialGuardian,
      employee: employee,
      schoolYear: scYear,
      student: guardianStudentList,
    };

    selectedNavigation('2');
  };

  const updateUserData = (data: any, value: any, navKey: any) => {
    var updateData: any = userProfile;
    switch (value) {
      case '1':
        updateData.ateduAccount = data;
        updateData.profile.ssid = data.ssid;
        break;
      case '2':
        updateData.profile = data;
        break;
      case '3':
        updateData.guardian = data;
        break;
      case '4':
        updateData.employee = data;
        break;
      case '5':
        updateData.schoolyear = data;
        break;
      case '6':
        updateData.student = data;
        break;
      default:
        break;
    }
    selectedNavigation(navKey);
    userProfile = updateData;
  };

  const RolesHandler = (value: any, navKey: any, data: any) => {
    updateUserData(data, value, navKey);
    if (navKey === '10') navKey = selectedMenuRef.current;
    setSelectedMenu(navKey);
    selectedMenuRef.current = navKey;
  };

  const cancelHandler = () => {
    history.push('../user-account');
  };
  useEffect(() => {
    if (toggleSuccess) {
      if (!selectedUserType.current.isEdit) {
        selectedNavigation(1);
      }
    }
  }, [toggleSuccess]);

  useEffect(() => {
    if (resetPassword) {
      selectedNavigation(1);
      setResetPassword(false);
    }
  }, [resetPassword]);

  useEffect(() => {
    if (hideDialogConfirm) {
      setSelectedMenu(selectedMenuRef.current);
    }
  }, [hideDialogConfirm]);

  const selectedNavigation = (key: any) => {
    switch (Number(key)) {
      case 1:
        return setContainer(
          <UserRoles
            next={RolesHandler}
            userType={selectedUserType.current.userType}
            ateduAccount={userProfile.ateduAccount}
            rolesList={rolesList}
            showPassword={showPassword}
            showEnrollment={showEnrollment}
            isEdit={selectedUserType.current.isEdit}
            resetPassword={resetPasswordHandler}
          />,
        );
      case 2:
        return setContainer(
          <Profile
            next={RolesHandler}
            userType={selectedUserType.current.userType}
            profile={userProfile.profile}
            isEdit={selectedUserType.current.isEdit}
            cancel={cancelHandler}
          />,
        );
      case 3:
        return setContainer(
          <Guardian
            next={RolesHandler}
            guardianList={guardianList}
            isEdit={selectedUserType.current.isEdit}
            guardian={userProfile.guardian}
            cancel={cancelHandler}
            profile={userProfile.profile}
          />,
        );
      case 4:
        return setContainer(
          <EmploymentInfo
            next={RolesHandler}
            employee={userProfile.employee}
            isEdit={selectedUserType.current.isEdit}
            cancel={cancelHandler}
          />,
        );
      case 5:
        return setContainer(
          <SchoolYear
            schoolYear={userProfile.schoolYear}
            isEdit={selectedUserType.current.isEdit}
            cancel={cancelHandler}
            next={RolesHandler}
          />,
        );
      case 6:
        return setContainer(
          <CreateGuardian
            next={RolesHandler}
            isEdit={selectedUserType.current.isEdit}
            cancel={cancelHandler}
            students={userProfile.student}
          />,
        );
      case 10:
        spinnerValue.current = false;
        toggleHideDialogConfirm();
        break;
      default:
    }
  };

  useEffect(() => {
    if (toggleSuccess) selectedUserType.current.isEdit = true;
    if (selectedUserType.current.userType != null) {
      if (selectedMenuRef.current === undefined) {
        selectedMenuRef.current = '2';
      }
      switch (selectedUserType.current.userType.toString().toUpperCase()) {
        case 'STUDENT':
          if (selectedUserType.current.isEdit) {
            var newNav = [...StudentNav];
            newNav[0].links.forEach(element => {
              element.disabled = false;
            });
            setNavLink(newNav);
          } else {
            var newNav = [...StudentNav];
            newNav[0].links.forEach(element => {
              if (element.key === selectedMenuRef.current) {
                element.disabled = false;
              } else {
                element.disabled = true;
              }
            });
            setNavLink(newNav);
          }
          break;
        case 'STAFF':
          if (selectedUserType.current.isEdit) {
            var newNav = [...StaffNav];
            newNav[0].links.forEach(element => {
              element.disabled = false;
            });
            setNavLink(newNav);
          } else {
            var newNav = [...StaffNav];
            newNav[0].links.forEach(element => {
              if (element.key === selectedMenuRef.current) {
                element.disabled = false;
              } else {
                element.disabled = true;
              }
            });
            setNavLink(newNav);
          }
          break;
        case 'GUARDIAN':
          if (selectedUserType.current.isEdit) {
            var newNav = [...GuardianNav];
            newNav[0].links.forEach(element => {
              element.disabled = false;
            });
            setNavLink(newNav);
          } else {
            var newNav = [...GuardianNav];
            newNav[0].links.forEach(element => {
              if (element.key === selectedMenuRef.current) {
                element.disabled = false;
              } else {
                element.disabled = true;
              }
            });
            setNavLink(newNav);
          }
          break;
        default:
          setNavLink(StudentNav);
          break;
      }
    } else {
      setNavLink(StudentNav);
    }
  }, [selectedMenuRef.current, toggleSuccess]); //eslint-disable-line react-hooks/exhaustive-deps

  const saveData = async () => {
    var student = userProfile.profile;
    var ateduAccount = userProfile.ateduAccount;
    var imageName = '';
    var externalId = [];
    var statusValue = '';
    var activaionData = null;
    var cpr =
      student.cprNumber.split('-')[1] !== 'XXX' ? student.cprNumber : null;

    if (selectedUserType.current.isEdit) {
      if (dataStore.selectedUserAccount.externalId != null) {
        externalId = dataStore.selectedUserAccount.externalId;
        activaionData = dataStore.selectedUserAccount.activationCode;
        statusValue = ateduAccount.activeAccount;
      }
    }

    var response: any = undefined;
    if (!selectedUserType.current.isEdit) {
      let username: string =
        !isUndefinedOrEmpty(student.ssid) && isCPRValid(student.ssid)
          ? student.ssid
          : userProfile.ateduAccount.email;

      response = await createIdentity(
        username,
        userProfile.ateduAccount.email,
        true,
        true,
        null,
        true,
      );
    } else {
      response = { status: 200 };
    }

    if (response.status === 200) {
      if (student.imgProfile !== undefined && student.imgProfile !== null)
        imageName = student.imgProfile.name;
      if (response.data != undefined) {
        activaionData =
          response.data.ActivaionData !== undefined
            ? response.data.ActivaionData
            : null;
        statusValue =
          response.data.ActivaionData !== undefined ? 'Active' : 'Inactive';
      }

      var postData = {
        userId: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        birthday: moment.utc(student.birthday).format(),
        cprNumber: cpr,
        email: ateduAccount.email,
        externalId: externalId,
        contantNo: student.phone,
        secondaryContantNo: student.phone1,
        imgUrl: imageName,
        ssid: ateduAccount.ssid,
        cOnavn: student.conavn,
        address1: student.address1,
        address2: student.address2,
        zipCode: student.zipcode,
        munincipality: student.municipality,
        country: student.country,
        modifiedBy: dataStore.userProfile.id,
        activationcode: activaionData,
        status: student.status,
        personalemail: student.email,
      };

      await apiUser
        .post(
          '/api/school/' + dataStore.userProfile.school + '/user',
          postData,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Correlation-Id': uuidv4(),
              Authorization: `Bearer ${principal?.accessToken}`,
            },
          },
        )
        .then(async function (response) {
          if (
            student.imgProfile !== undefined &&
            student.imgProfile !== null &&
            student.imgProfile !== ''
          ) {
            let formData = new FormData();
            formData.append(
              'image',
              student.imgProfile,
              student.imgProfile.name,
            );
            uploadImage(formData, response.data);
          }
          await saveSubEntity(response.data);
        })
        .catch(function (error) {
          logger.error(error);
        })
        .then(function () {});
    } else {
      setToggleWarning(true);
      spinnerValue.current = false;
      toggleHideDialogConfirm();
      setTimeout(() => {
        setToggleWarning(false);
      }, 3000);
    }
  };

  const createIdentity = async (
    username: string,
    email: string,
    returnPassword: boolean,
    sendEmail: boolean,
    password: string | null,
    isStudent: any,
  ) => {
    let endpointURI = undefined;
    let payload = undefined;
    if (username) {
      endpointURI = '/api/CreateAteduSSOIdentity';
      payload = {
        Username: escape(username),
        Email: escape(email !== undefined ? email : username),
        ReturnPassword: returnPassword,
        SendEmail: sendEmail,
      };
    } else {
      endpointURI = '/api/CreateIdentityForNemID';
      payload = {
        Email: escape(email !== undefined ? email : username),
        ReturnPassword: returnPassword,
        SendEmail: sendEmail,
      };
    }
    return await apiAccount
      .post(endpointURI, payload, {
        headers: {
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        if (isStudent === true) {
          if (response.data.hasOwnProperty('Password')) {
            userProfile.ateduAccount.tmpPassword = response.data.Password;
          }
          // saveActivation(id, response.data.ActivaionData);
        }
        //saveActivation(id, response.data.ActivaionData);
        return response;
      })
      .catch(function (error) {
        logger.error(error);
        return { status: 409 };
      });
  };

  const resetPasswordHandler = (email: string) => {
    apiAccount
      .post(
        '/api/ResetPassword',
        {
          Email: email,
          ReturnPassword: true,
        },
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        userProfile.ateduAccount.tmpPassword = response.data.Password;
        setResetPassword(true);
      })
      .catch(function (error) {
        logger.error(error);
      });
  };

  const saveSubEntity = (id: any) => {
    switch (selectedUserType.current.userType.toString().toUpperCase()) {
      case 'STUDENT':
        saveStudent(id);
        break;
      case 'STAFF':
        saveEmployment(id);
        break;
      case 'GUARDIAN':
        saveGuardian(id);
        break;
      default:
        break;
    }
  };

  const uploadImage = (formData: any, id: any) => {
    apiUser.post(
      '/api/school/' + dataStore.userProfile.school + '/profile/blob/' + id,
      formData,
      {
        headers: {
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      },
    );
  };

  const saveEmployment = (id: any) => {
    var schoolYear: any[] = [];
    userProfile.schoolYear.forEach((element: any) => {
      var item = {
        sy: element.schoolYear,
        agreeNoHours: element.agreedTime,
        plusbank: element.plusBankBussiness,
        minubank: element.minusBankBussiness,
        overtimeMask: element.maxOvertime,
        undertimeMask: element.maxUndertime,
      };
      schoolYear.push(item);
    });
    var roles: any[] = [];
    userProfile.ateduAccount.roles.forEach((element: any) => {
      roles.push(element.key.toString());
    });
    var classes: any[] = [];
    if (selectedUserType.current.isEdit) {
      classes = dataStore.selectedUserAccount.classes;
    }
    var employee = userProfile.employee;
    var postData = {
      id: employee.id,
      userId: id,
      bankNo: employee.bankNo,
      bankAccountNo: employee.bankAccountNo,
      withdrawalPercentage: employee.withdrawalPercentage,
      employementRate: employee.employmentRate,
      dateEmployment: employee.dateEmployment,
      dateResignation: employee.dateResignation,
      homeInstitutionNo: employee.homeInstitutionNo,
      school: dataStore.userProfile.school,
      roles: roles,
      schoolYear: schoolYear,
      classes: classes,
    };
    apiTeacher
      .post(
        '/api/school/' + dataStore.userProfile.school + '/staff',
        postData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(() => {
        setShowPassword(true);
        setToggleSuccess(true);
        toggleHideDialogConfirm();
        setTimeout(() => {
          setToggleSuccess(false);
        }, 3000);
      });
  };

  const saveStudent = (id: any) => {
    var roles: any[] = [];
    var classes: any[] = [];
    var homeClass: any = '';

    if (selectedUserType.current.isEdit) {
      classes = dataStore.selectedUserAccount.classes;
      homeClass = dataStore.selectedUserAccount.homeClass;
    }
    if (
      userProfile.ateduAccount.roles &&
      userProfile.ateduAccount.roles.length > 0
    ) {
      userProfile.ateduAccount.roles.forEach((element: any) => {
        roles.push(element.key.toString());
      });
    }

    var postData = {
      id: userProfile.ateduAccount.id,
      userId: id,
      roles: roles,
      homeClass: homeClass,
      classes: classes,
    };

    apiStudent
      .post(
        '/api/school/' + dataStore.userProfile.school + '/student',
        postData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(() => {
        setTimeout(() => {
          saveUserGuardian(id);
        }, 2000);
      });
  };

  const saveGuardian = (id: any) => {
    var roles: any[] = [];
    userProfile.ateduAccount.roles.forEach((element: any) => {
      roles.push(element.key.toString());
    });
    var studentList = userProfile.student;
    var motherTo: any[] = [];
    var fatherTo: any[] = [];
    var legalTo: any[] = [];
    studentList.forEach((element: any) => {
      switch (element.relationship.toLowerCase()) {
        case 'mother':
          motherTo.push(element.fullName[0].key);
          break;
        case 'father':
          fatherTo.push(element.fullName[0].key);
          break;
        case 'legal':
          legalTo.push(element.fullName[0].key);
          break;
        default:
          legalTo.push(element.fullName[0].key);
          break;
      }
    });
    var postData = {
      id: userProfile.profile.guardianId,
      userId: id,
      MotherTo: motherTo,
      FatherTo: fatherTo,
      LegalTo: legalTo,
      roles: roles,
    };
    apiUser
      .post(
        '/api/school/' + dataStore.userProfile.school + '/guardian',
        postData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(res => {
        setShowPassword(true);
        setToggleSuccess(true);
        toggleHideDialogConfirm();
        setTimeout(() => {
          setToggleSuccess(false);
        }, 3000);
      });
  };

  const saveUserGuardian = async (id: any) => {
    var student = userProfile.profile;
    var studentName = student.firstName + ' ' + student.lastName;
    userProfile.guardian.forEach(async (guardian: any) => {
      let guardianId = guardian.fullName[0]
        ? guardian.fullName[0].userId
        : null;
      if (guardian.guardianStat === 'new') {
        if (guardian.firstName !== undefined) {
          var response: any = null;
          if (guardian.activateAtedu) {
            response = await createIdentity(
              guardian.email,
              guardian.email,
              false,
              true,
              null,
              false,
            );
          }

          var activationCode =
            response?.status === 200 ? response.data.ActivaionData : '';
          var postData = {
            userId: isNaN(guardian.id) ? guardian.id : null,
            firstName: guardian.firstName,
            lastName: guardian.lastName,
            email: guardian.email,
            externalId: [],
            contantNo: guardian.contactNo,
            secondaryContantNo: student.phone1,
            imgUrl: '',
            ssid: '',
            cOnavn: '',
            address1: guardian.useStudentAddress
              ? student.address1
              : guardian.address1,
            address2: guardian.useStudentAddress
              ? student.address2
              : guardian.address2,
            zipCode: guardian.useStudentAddress
              ? student.zipcode
              : guardian.zipcode,
            munincipality: guardian.useStudentAddress
              ? student.municipality
              : guardian.municipality,
            country: guardian.useStudentAddress
              ? student.country
              : guardian.country,
            activationcode: activationCode,
            status: 'Inactive',
          };

          await apiUser
            .post(
              '/api/school/' + dataStore.userProfile.school + '/user',
              postData,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'X-Correlation-Id': uuidv4(),
                  Authorization: `Bearer ${principal?.accessToken}`,
                },
              },
            )
            .then(function (response) {
              saveGuardianFromStudent(
                null,
                response.data,
                id,
                guardian,
                studentName,
              );
            });
        }
      } else if (!guardian.status) {
        var postData = {
          userId: guardianId,
          firstName: guardian.firstName,
          lastName: guardian.lastName,
          email: guardian.email,
          externalId: [],
          contantNo: guardian.contactNo,
          secondaryContantNo: student.phone1,
          imgUrl: '',
          ssid: '',
          cOnavn: '',
          address1: guardian.useStudentAddress
            ? student.address1
            : guardian.address1,
          address2: guardian.useStudentAddress
            ? student.address2
            : guardian.address2,
          zipCode: guardian.useStudentAddress
            ? student.zipcode
            : guardian.zipcode,
          munincipality: guardian.useStudentAddress
            ? student.municipality
            : guardian.municipality,
          country: guardian.useStudentAddress
            ? student.country
            : guardian.country,
          activationcode: activationCode,
          status: guardian.active ? 'Active' : 'Inactive',
        };
        await apiUser
          .post(
            '/api/school/' + dataStore.userProfile.school + '/user',
            postData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-Correlation-Id': uuidv4(),
                Authorization: `Bearer ${principal?.accessToken}`,
              },
            },
          )
          .then(function (response) {
            saveGuardianFromStudent(
              null,
              response.data,
              id,
              guardian,
              studentName,
            );
          });
      } else {
        saveGuardianFromStudent(
          guardian.fullName[0].key,
          guardian.fullName[0].userId,
          id,
          guardian,
          studentName,
        );
      }
    });

    //selectedUserType.current.isEdit = true;
    spinnerValue.current = false;
    setShowPassword(true);
    setToggleSuccess(true);
    toggleHideDialogConfirm();

    setTimeout(() => {
      setToggleSuccess(false);
    }, 3000);
    setShowEnrollment(true);
  };

  //associate and deassociate guardians per student based on actvite status
  const saveGuardianFromStudent = (
    guardianId: any,
    userId: any,
    studentId: any,
    guardian: any,
    studentName: any,
  ) => {
    let motherTo: any[] = [];
    let fatherTo: any[] = [];
    let legalTo: any[] = [];
    let associatedGuardian: any = null;
    let deassociatedGuardian: any = null;

    if (guardian.active === true && guardian.guardianStat === 'new') {
      associatedGuardian = guardian;
    }
    if (guardian.active === false && guardian.guardianStat !== 'new') {
      deassociatedGuardian = guardian;
    }
    if (guardian.active === true && guardian.guardianStat === 'deleted') {
      deassociatedGuardian = guardian;
    }

    //if (guardian.active && guardian.guardianStat !== "deleted") {
    if (guardian.guardianStat !== 'deleted') {
      switch (guardian.relationship.toLowerCase()) {
        case 'mother':
          motherTo.push(studentId);
          break;
        case 'father':
          fatherTo.push(studentId);
          break;
        case 'legal':
          legalTo.push(studentId);
          break;
        default:
          legalTo.push(studentId);
          break;
      }
    }

    var postData = {
      id: guardianId,
      userId: userId,
      MotherTo: motherTo,
      FatherTo: fatherTo,
      LegalTo: legalTo,
      roles: [],
    };

    apiUser
      .post(
        '/api/school/' + dataStore.userProfile.school + '/guardian',
        postData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(res => {
        if (res.status == 200) {
          if (associatedGuardian) {
            let email = associatedGuardian.email;
            let guardianName =
              associatedGuardian.firstName + ' ' + associatedGuardian.lastName;
            //send email for associated guardian
            sendEmailAssigningGuardian(email, guardianName, studentName);
          }
          if (deassociatedGuardian) {
            let email = deassociatedGuardian.email;
            let guardianName =
              deassociatedGuardian.firstName +
              ' ' +
              deassociatedGuardian.lastName;
            //send email for deassociated guardian
            sendEmailRemovingGuardian(email, guardianName, studentName);
          }
        }
      });
  };

  // send email for assigning guardian
  const sendEmailAssigningGuardian = async (
    email: string,
    guardianName: string,
    studentName: string,
  ) => {
    return await apiAccount
      .post(
        '/api/SendStudentGuardianAssignedEmail?guardianEmail=' +
          email +
          '&guardianFriendlyName=' +
          guardianName +
          '&studentFriendlyName=' +
          studentName,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return { status: 409 };
      });
  };

  // send email removing guardian
  const sendEmailRemovingGuardian = async (
    email: string,
    guardianName: string,
    studentName: string,
  ) => {
    return await apiAccount
      .post(
        '/api/SendStudentGuardianUnassignedEmail?guardianEmail=' +
          email +
          '&guardianFriendlyName=' +
          guardianName +
          '&studentFriendlyName=' +
          studentName,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return { status: 409 };
      });
  };

  const saveConfirmHandler = () => {
    spinnerValue.current = true;
    saveData();
  };

  useEffect(() => {
    switch (selectedUserType.current.userType.toString().toUpperCase()) {
      case 'STUDENT':
        setSelecetedLang(intl(LabelNames.student));
        break;
      case 'STAFF':
        setSelecetedLang(intl(LabelNames.staff));
        break;
      case 'GUARDIAN':
        setSelecetedLang(intl(LabelNames.guardian));
        break;
      default:
        break;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const closeSuccessMessage = () => {
    setToggleSuccess(false);
  };
  const closeWarningMessage = () => {
    setToggleWarning(false);
  };

  const printHandler = () => {
    var printContents = document.getElementById('ateduPrint')!.innerHTML;
    var frame: any = document.createElement('iframe');
    frame.name = 'frame1';
    frame.style.position = 'absolute';
    frame.style.top = '-1000000px';
    document.body.appendChild(frame);

    var frameDoc = frame.contentWindow;
    if (frameDoc) {
      frameDoc.document.open();
      frameDoc.document.write('<html><head><title>Atedu</title>');

      frameDoc.document.write('</head><body><div >');
      frameDoc.document.write(printContents);
      frameDoc.document.write('</div></body></html>');
      frameDoc.document.close();
      setTimeout(function () {
        window.frames[frame].focus();
        window.frames[frame].print();
        document.body.removeChild(frame);
      }, 500);
    }
  };
  return (
    <Fragment>
      {toggleSuccess && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={closeSuccessMessage}
          dismissButtonAriaLabel="Close">
          Account sucessfully saved.
        </MessageBar>
      )}

      {toggleWarning && (
        <MessageBar
          messageBarType={MessageBarType.warning}
          isMultiline={false}
          onDismiss={closeWarningMessage}
          dismissButtonAriaLabel="Close">
          Email already exist or invalid email!
        </MessageBar>
      )}

      <DialogConfirmation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={saveConfirmHandler}
        spinner={spinnerValue.current}
        text="Save"
      />
      <div className={'ms-Grid-row noAteduPrint'}>
        <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 '}>
              <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                <FontIcon iconName="ContactCardSettings" />
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.headertitle}>
                {intl(LabelNames.userAccounts)}
              </div>
              {selectedMenu === '1' && (
                <div className={'AttendanceHeader ' + styles.helpIcon}>
                  <ActionButton
                    iconProps={{ iconName: 'Print' }}
                    className={styles.actionButton}
                    onClick={printHandler}>
                    Print
                  </ActionButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.containerPad}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
            {selectedUserType.current.isEdit
              ? 'Manage a '
              : intl(LabelNames.userprofilecreate)}{' '}
            {selectedLang} {intl(LabelNames.userprofilecreate1)}
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.headerdesc}>
            {intl(LabelNames.userprofileDesc1)} {selectedLang}{' '}
            {intl(LabelNames.userprofileDesc2)}
          </div>
        </div>
        <br />
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-lg12 ">
            <div className={styles.container}>
              <div className={styles.sidenav}>
                <div className={'AccountSettingPersona ' + styles.persona}>
                  <Persona
                    text={completeName}
                    secondaryText={
                      selectedUserType.current.isEdit ? '' : 'New user account'
                    }
                    size={PersonaSize.size40}
                    imageUrl={imgView}
                  />
                </div>
                <div className={'navProfileContainer '}>
                  <Nav
                    onLinkClick={_onLinkClick}
                    selectedKey={selectedMenu}
                    ariaLabel="Nav basic example"
                    styles={navStyles}
                    groups={navLink}
                  />
                </div>
              </div>
              <div className={'accountSettingScroll ' + styles.content}>
                {container}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="ateduPrint" hidden={true}>
        <div>Email: {userProfile.ateduAccount?.email}</div>
        <div>Password: {userProfile.ateduAccount?.tmpPassword}</div>
      </div>
    </Fragment>
  );
};

export default UserAccountsCreate;
