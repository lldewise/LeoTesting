import { initStore } from '../store';
import { CheckExist } from '../../util/compareData';
import { AteduDataLiterals } from '../../util/constant';
import { userAccountInitialState } from '../storeInitialStates/users';
import { UserAccountState } from '../../types/store/users';

const initialState: UserAccountState = userAccountInitialState;

const configureStore = () => {
  const actions = {
    STUDENTSBYSCHOOLBYIDS: (curState: UserAccountState, data: any[]) => {
      let studentList = data.filter(a => a[1][0].includes('student'));
      const updateData = [];
      if (studentList.length > 0) {
        for (let i = 0; i < studentList.length; i++) {
          let item = studentList[i][1][1];
          if (item[AteduDataLiterals.USER_DATA] === undefined) {
            let id =
              item.id !== undefined
                ? item.id.split('/')[1]
                : item['crux.db/id'].split('/')[1];
            let studentRoles: any[] = [];
            let rolesInitial =
              item[AteduDataLiterals.STUDENT_ROLES] !== undefined
                ? item[AteduDataLiterals.STUDENT_ROLES]
                : [];
            let studentClass: any[] = [];
            let classInitial =
              item[AteduDataLiterals.STUDENT_CLASS] !== undefined
                ? item[AteduDataLiterals.STUDENT_CLASS]
                : [];
            if (rolesInitial.length > 0) {
              rolesInitial.forEach((r: any) => {
                studentRoles.push(r);
              });
            }

            if (classInitial.length > 0) {
              classInitial.forEach((r: any) => {
                studentClass.push(r.split('/')[1]);
              });
            }

            var addData = {
              id: id,
              studentId: id,
              userId: item[AteduDataLiterals.ID_USER].split('/')[1],
              roles: studentRoles,
              class: studentClass,
              homeClass:
                item['id/home-class'] !== undefined
                  ? item['id/home-class'].split('/')[1]
                  : '',
            };
            var index = CheckExist(id, updateData);
            if (index <= -1) {
              updateData.push(addData);
            } else {
              updateData[index] = addData;
            }
          }
        }
        return {
          studentAccountByIds: updateData,
          studentAccountByIdChanged: Math.random().toString(10).substring(7),
        };
      }
    },

    STUDENTSBYSCHOOLLIST: (curState: UserAccountState, data: any[]) => {      
      const updateData = [...curState.studentAccountList];
      if (data.length > 0) {
        let users = data.filter((a) => a[1][0].includes("user"));
        let students = data.filter((a) => a[1][0].includes("student"));
        
        users.forEach(element => {        
             let userItem = element[1][1];       
             let id = userItem.id !== undefined ? userItem.id : userItem['crux.db/id'];                
             let studentItem = students.find((a) => a[1][1]["id/user"] === element[1][0])[1][1];             
             
             if(studentItem) { 
               debugger
              let roles = studentItem?.roles;
              let classes = studentItem?.class;
              let homeClass = studentItem?.homeClass;
              let userId = id.split('/')[1];
              let userStatus =
              userItem[AteduDataLiterals.USER_STATUS] !== undefined
                  ? userItem[AteduDataLiterals.USER_STATUS].split('/')[1]
                  : 'Active';
              var addData = {
                studentId: studentItem.id.split('/')[1],
                userId: userId,
                id: userId,
                firstName: userItem[AteduDataLiterals.USER_FIRST_NAME],
                lastName: userItem[AteduDataLiterals.USER_LAST_NAME],
                birthday: userItem[AteduDataLiterals.USER_BIRTHDAY],
                cprNumber:
                userItem[AteduDataLiterals.USER_CPRNUMBER] !== undefined
                    ? userItem[AteduDataLiterals.USER_CPRNUMBER]
                    : '',
                name:
                userItem[AteduDataLiterals.USER_FIRST_NAME] +
                  ' ' +
                  userItem[AteduDataLiterals.USER_LAST_NAME],
                email: userItem[AteduDataLiterals.USER_EMAIL],
                personalemail:
                userItem[AteduDataLiterals.USER_DATA]['personal-email'],
                phone: userItem[AteduDataLiterals.USER_DATA].phone,
                phone1:
                userItem[AteduDataLiterals.USER_DATA].phone1 !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].phone1
                    : '',
                externalId: userItem[AteduDataLiterals.USER_EXTERNAL_IDS],
                activationCode:
                userItem['user/activation-code'] !== undefined
                    ? userItem['user/activation-code']
                    : '',
                address1:
                userItem[AteduDataLiterals.USER_DATA].address1 !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].address1
                    : '',
                address2:
                userItem[AteduDataLiterals.USER_DATA].address2 !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].address2
                    : '',
                conavn:
                userItem[AteduDataLiterals.USER_DATA].conavn !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].conavn
                    : '',
                country:
                userItem[AteduDataLiterals.USER_DATA].country !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].country
                    : '',
                imgUrl:
                userItem[AteduDataLiterals.USER_DATA].imgurl !== undefined
                    ? 'https://stornewsapi.blob.core.windows.net/profileimage/' +
                    userItem[AteduDataLiterals.USER_DATA].imgurl
                    : '',
                municipality:
                userItem[AteduDataLiterals.USER_DATA].municipality !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].municipality
                    : '',
                ssid:
                userItem[AteduDataLiterals.USER_DATA].ssid !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].ssid
                    : '',
                zipCode:
                userItem[AteduDataLiterals.USER_DATA].zipcode !== undefined
                    ? userItem[AteduDataLiterals.USER_DATA].zipcode
                    : '',
                status: userStatus,
                roles: roles,
                class: classes,
                modifiedBy:
                userItem[AteduDataLiterals.ID_MODIFIER] !== undefined
                    ? userItem[AteduDataLiterals.ID_MODIFIER]
                    : '',
                modifiedDate: userItem[AteduDataLiterals._META],
                homeClass: homeClass,
              };
              debugger;
              var index = CheckExist(userId, updateData);
              if (index <= -1) {
                updateData.push(addData);
              } else {
                updateData[index] = addData;
              }
          }
        });
        return {
          studentAccountList: updateData,
          studentAccountListChanged: Math.random().toString(10).substring(7),
        };
      }
    },

    STAFFBYSCHOOLLIST: (curState: UserAccountState, data: any[]) => {
      const updateData: any[] = [];

      var dataList = data.filter(
        a => a[1][0].includes('user') || a[1][0].includes('staff'),
      );

      if (data.length > 0) {
        let ids: any[] = [];
        let details = [];

        for (let i = 0; i < dataList.length; i++) {
          let item = dataList[i][1][1];
          if (item[AteduDataLiterals.USER_DATA] === undefined) {
            let id =
              item.id !== undefined
                ? item.id.split('/')[1]
                : item['crux.db/id'].split('/')[1];
            let staffRoles: any[] = [];
            let rolesInitial =
              item[AteduDataLiterals.STAFF_ROLES] !== undefined
                ? item[AteduDataLiterals.STAFF_ROLES]
                : [];
            if (rolesInitial.length > 0) {
              rolesInitial.forEach((r: any) => {
                staffRoles.push(r.split('/')[1]);
              });
            }

            let classes: any[] = [];
            let classesInitial =
              item[AteduDataLiterals.STAFF_CLASSES] !== undefined
                ? item[AteduDataLiterals.STAFF_CLASSES]
                : [];
            if (classesInitial.length > 0) {
              classesInitial.forEach((r: any) => {
                classes.push(r.split('/')[1]);
              });
            }

            var empHistory = {};
            var addData = {
              id: id,
              staffId: id,
              userId: item[AteduDataLiterals.ID_USER].split('/')[1],
              roles: staffRoles,
              classes: classes,
            };
            if (item[AteduDataLiterals.STAFF_DATA] !== undefined) {
              empHistory = {
                bankNo:
                  item[AteduDataLiterals.STAFF_DATA].bankno !== undefined
                    ? item[AteduDataLiterals.STAFF_DATA].bankno
                    : '',
                bankAccountNo:
                  item[AteduDataLiterals.STAFF_DATA].bankaccountno !== undefined
                    ? item[AteduDataLiterals.STAFF_DATA].bankaccountno
                    : '',
                withdrawalPercentage:
                  item[AteduDataLiterals.STAFF_DATA].withdrawalpercentage !==
                  undefined
                    ? item[AteduDataLiterals.STAFF_DATA].withdrawalpercentage
                    : '',
                dateResignation:
                  item[AteduDataLiterals.STAFF_DATA].dateresignation !==
                  undefined
                    ? item[AteduDataLiterals.STAFF_DATA].dateresignation
                    : '',
                employmentRate:
                  item[AteduDataLiterals.STAFF_DATA].employmentrate !==
                  undefined
                    ? item[AteduDataLiterals.STAFF_DATA].employmentrate
                    : '',
                homeInstitutionNo:
                  item[AteduDataLiterals.STAFF_DATA].homeinstitutionno !==
                  undefined
                    ? item[AteduDataLiterals.STAFF_DATA].homeinstitutionno
                    : '',
                dateEmployment:
                  item[AteduDataLiterals.STAFF_DATA].dateemployment !==
                  undefined
                    ? item[AteduDataLiterals.STAFF_DATA].dateemployment
                    : '',
                schoolYear:
                  item[AteduDataLiterals.STAFF_DATA].schoolyear !== undefined
                    ? item[AteduDataLiterals.STAFF_DATA].schoolyear
                    : [],
              };
            }
            ids.push({ ...addData, empHistory });
          } else {
            details.push(item);
          }
        }

        if (details.length > 0) {
          details.forEach(a => {
            var id = a.id !== undefined ? a.id : a['crux.db/id'];
            let staff = ids.find(i => i.userId === id.split('/')[1]);
            let userStatus =
              a[AteduDataLiterals.USER_STATUS] !== undefined
                ? a[AteduDataLiterals.USER_STATUS].split('/')[1]
                : 'Active';
            if (staff !== undefined) {
              var addDetails = {
                staffId: staff.staffId,
                userId: id.split('/')[1],
                id: id.split('/')[1],
                firstName: a[AteduDataLiterals.USER_FIRST_NAME],
                lastName: a[AteduDataLiterals.USER_LAST_NAME],
                name:
                  a[AteduDataLiterals.USER_FIRST_NAME] +
                  ' ' +
                  a[AteduDataLiterals.USER_LAST_NAME],
                birthday: a[AteduDataLiterals.USER_BIRTHDAY],
                cprNumber:
                  a[AteduDataLiterals.USER_CPRNUMBER] !== undefined
                    ? a[AteduDataLiterals.USER_CPRNUMBER]
                    : '',
                email: a[AteduDataLiterals.USER_EMAIL],
                personalemail: a[AteduDataLiterals.USER_DATA]['personal-email'],
                phone: a[AteduDataLiterals.USER_DATA].phone,
                phone1:
                  a[AteduDataLiterals.USER_DATA].phone1 !== undefined
                    ? a[AteduDataLiterals.USER_DATA].phone1
                    : '',
                externalId: a[AteduDataLiterals.USER_EXTERNAL_IDS],
                activationCode:
                  a['user/activation-code'] !== undefined
                    ? a['user/activation-code']
                    : '',
                address1:
                  a[AteduDataLiterals.USER_DATA].address1 !== undefined
                    ? a[AteduDataLiterals.USER_DATA].address1
                    : '',
                address2:
                  a[AteduDataLiterals.USER_DATA].address2 !== undefined
                    ? a[AteduDataLiterals.USER_DATA].address2
                    : '',
                conavn:
                  a[AteduDataLiterals.USER_DATA].conavn !== undefined
                    ? a[AteduDataLiterals.USER_DATA].conavn
                    : '',
                country:
                  a[AteduDataLiterals.USER_DATA].country !== undefined
                    ? a[AteduDataLiterals.USER_DATA].country
                    : '',
                imgUrl:
                  a[AteduDataLiterals.USER_DATA].imgurl !== undefined
                    ? a[AteduDataLiterals.USER_DATA].imgurl
                    : '',
                municipality:
                  a[AteduDataLiterals.USER_DATA].municipality !== undefined
                    ? a[AteduDataLiterals.USER_DATA].municipality
                    : '',
                ssid:
                  a[AteduDataLiterals.USER_DATA].ssid !== undefined
                    ? a[AteduDataLiterals.USER_DATA].ssid
                    : '',
                zipCode:
                  a[AteduDataLiterals.USER_DATA].zipcode !== undefined
                    ? a[AteduDataLiterals.USER_DATA].zipcode
                    : '',
                status: userStatus,
                modifiedBy:
                  a[AteduDataLiterals.ID_MODIFIER] !== undefined
                    ? a[AteduDataLiterals.ID_MODIFIER]
                    : '',
                modifiedDate: a[AteduDataLiterals._META],
                roles: staff.roles,
                classes: staff.classes,
              };
              var index = CheckExist(staff.userId, updateData);
              if (index <= -1) {
                updateData.push(addDetails);
              } else {
                updateData[index] = addDetails;
              }
            }
          });
        }
        return {
          staffAccountList: updateData,
          staffEmploymentData: ids,
          staffAccountListChanged: Math.random().toString(10).substring(7),
        };
      }
    },

    STAFFBYSCHOOLEMPLOYMENTLIST: (curState: UserAccountState, data: any) => {
      const updateData = curState.guardianAccountList;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i][1][1];
          if (item[AteduDataLiterals.STAFF_DATA] === undefined) {
          }
        }
      }
      return { staffEmploymentData: updateData };
    },
    GUARDIANACCOUNTLISTS: (curState: UserAccountState, data: any) => {
      const updateData = curState.guardianAccountList;
      if (data.length > 0) {
        data.forEach((a: any) => {
          const addData = {
            id: a.id,
            name: a.firstname + ' ' + a.lastname,
            email: a.email,
            roles: a.roles,
            createdBy: a.createdby,
            createOn: a.createdon,
            status: a.status,
            entityId: a.entityid,
          };
          const itemId = a.id;
          const index = CheckExist(itemId, updateData);
          if (index <= -1) {
            updateData.push(addData);
          } else {
            updateData[index] = addData;
          }
        });
        return { guardianAccountList: updateData };
      }
    },

    SELECTEDUSERACCOUNTTYPE: (curState: UserAccountState, data: any) => {
      return { userAccountType: data };
    },

    SELECTEDUSERACCOUNT: (curState: UserAccountState, data: any) => {
      if (data) {
        return { selectedUserAccount: data[0] };
      } else {
        return { selectedUserAccount: data };
      }
    },

    SELECTEDUSERPROFILE: (curState: UserAccountState, data: any) => {
      return { selectedUserProfile: data };
    },

    SELECTEDGUARDIANBYUSER: (curState: UserAccountState, data: any) => {
      const updateData: any[] = [];
      const guardianList = [...curState.guardianBySchool];
      if (data !== null) {
        const guardian = data[0][1][1];
        guardian.forEach((element: any) => {
          const item = guardianList.find(
            r => r.guardianId === element.split('/')[1],
          );
          if (item !== undefined && item !== null) {
            updateData.push(item);
          }
        });
        if (updateData.length === 0) {
          const user = data.filter((a: any) => a[1][0].includes('user'));
          const list = data.filter((a: any) => a[1][0].includes('guardian'));

          user.forEach((element: any) => {
            const guardianId = list.find(
              (a: any) => a[1][1]['id/user'] === element[1][0],
            );
            const item = element[1][1];

            const userId = element[1][0].split('/')[1];
            if (guardianId !== undefined) {
              const addData = {
                guardianId: guardianId[1][0].split('/')[1],
                guardianStudentId: guardianId[1][1]['ids/children'],
                userId: userId,
                id: userId,
                firstName: item[AteduDataLiterals.USER_FIRST_NAME],
                lastName: item[AteduDataLiterals.USER_LAST_NAME],
                name:
                  item[AteduDataLiterals.USER_FIRST_NAME] +
                  ' ' +
                  item[AteduDataLiterals.USER_LAST_NAME],
                email: item[AteduDataLiterals.USER_EMAIL],
                personalemail:
                  item[AteduDataLiterals.USER_DATA]['personal-email'],
                phone: item[AteduDataLiterals.USER_DATA].phone,
                phone1:
                  item[AteduDataLiterals.USER_DATA].phone1 !== undefined
                    ? item[AteduDataLiterals.USER_DATA].phone1
                    : '',
                externalId: item[AteduDataLiterals.USER_EXTERNAL_IDS],
                activationCode:
                  item['user/activation-code'] !== undefined
                    ? item['user/activation-code']
                    : '',
                address1:
                  item[AteduDataLiterals.USER_DATA].address1 !== undefined
                    ? item[AteduDataLiterals.USER_DATA].address1
                    : '',
                address2:
                  item[AteduDataLiterals.USER_DATA].address2 !== undefined
                    ? item[AteduDataLiterals.USER_DATA].address2
                    : '',
                conavn:
                  item[AteduDataLiterals.USER_DATA].conavn !== undefined
                    ? item[AteduDataLiterals.USER_DATA].conavn
                    : '',
                country:
                  item[AteduDataLiterals.USER_DATA].country !== undefined
                    ? item[AteduDataLiterals.USER_DATA].country
                    : '',
                imgUrl:
                  item[AteduDataLiterals.USER_DATA].imgurl !== undefined
                    ? item[AteduDataLiterals.USER_DATA].imgurl
                    : '',
                municipality:
                  item[AteduDataLiterals.USER_DATA].municipality !== undefined
                    ? item[AteduDataLiterals.USER_DATA].municipality
                    : '',
                ssid:
                  item[AteduDataLiterals.USER_DATA].ssid !== undefined
                    ? item[AteduDataLiterals.USER_DATA].ssid
                    : '',
                zipCode:
                  item[AteduDataLiterals.USER_DATA].zipcode !== undefined
                    ? item[AteduDataLiterals.USER_DATA].zipcode
                    : '',
                status:
                  item[AteduDataLiterals.USER_DATA].status !== undefined
                    ? item[AteduDataLiterals.USER_DATA].status
                    : 'Active',
                modifiedby:
                  item['id/modifier'] === undefined ? item['id/modifier'] : '',
                // roles: roles
              };
              const index = CheckExist(userId, updateData);
              if (index <= -1) {
                updateData.push(addData);
              } else {
                updateData[index] = addData;
              }
            }
          });
        }
      }
      return { selectedUserGuardians: updateData };
    },

    SETSCHOOLYEAR: (curState: UserAccountState, data: any) => {
      const updateData = curState.schoolYear;
      if (data && data?.length > 0) {
        data.forEach(() => {
          const id = 0;
          const item = {};
          const index = CheckExist(id, updateData);
          if (index <= -1) {
            updateData.push(item);
          } else {
            updateData[index] = item;
          }
        });
      }
      return { schoolYear: updateData };
    },

    REMOVEDELETEDSTUDENT: (curState: UserAccountState, data: any) => {
      const updatedUserData = [...curState.studentAccountList];
      const updatedStudentData = [...curState.studentAccountByIds];
      if (data) {
        let userIdx = updatedUserData.findIndex(a => a.id === data.id);
        let studIdx = updatedStudentData.findIndex(
          b => b.studentId === data.studentId,
        );
        if (studIdx > -1) {
          updatedStudentData.splice(studIdx, 1);
        }
        if (userIdx > -1) {
          updatedUserData.splice(userIdx, 1);
        }
      }
      return {
        studentAccountList: updatedUserData,
        studentAccountByIds: updatedStudentData,
      };
    },

    REMOVEDELETEDSTAFF: (curState: UserAccountState, data: any) => {
      const updatedData = [...curState.staffAccountList];
      if (data) {
        let idx = updatedData.findIndex(a => a.id === data.id);
        if (idx > -1) {
          updatedData.splice(idx, 1);
        }
      }
      return { staffAccountList: updatedData };
    },

    CLEANUPRANDOMIZEDDATACHANGED: (curState: UserAccountState, data: any) => {
      return {
        studentAccountListChanged: null,
        staffAccountListChanged: null,
        studentAccountByIdChanged: null,
      };
    },
  };
  initStore(actions, initialState);
};
export default configureStore;
