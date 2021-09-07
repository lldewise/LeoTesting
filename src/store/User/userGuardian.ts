import { initStore } from '../store';
import { CheckExist } from '../../util/compareData';
import { AteduDataLiterals } from '../../util/constant';
import { userGuardianInitialState } from '../storeInitialStates/users';
import { UserGuardianState } from '../../types/store/users';
import { AnyCnameRecord } from 'dns';

const initialState: UserGuardianState = userGuardianInitialState;

const configureStore = () => {
  const actions = {
    GUARDIANBYSCHOOLLIST: (curState: UserGuardianState, data: any[]) => {
      var updateData = [...curState.guardianBySchool];
      
      if (data.length > 0) {
        var user = data.filter((a) => a[1][0].includes("user"));
        var guardian = data.filter((a) => a[1][0].includes("guardian"));

        user.forEach((element) => {
          var guardianId = guardian.find(
            (a) => a[1][1]["id/user"] === element[1][0]
          );
          var item = element[1][1];

          var userId = element[1][0].split("/")[1];
          let userStatus = item[AteduDataLiterals.USER_STATUS] !== undefined ? item[AteduDataLiterals.USER_STATUS].split("/")[1] : 'Active';
          if (guardianId !== undefined) {
            var addData = {
              guardianId: guardianId[1][0].split("/")[1],
              guardianStudentId: guardianId[1][1]["ids/children"],
              userId: userId,
              id: userId,
              idsMotherTo: guardianId[1][1]["ids/mother-to"] !== undefined ? guardianId[1][1]["ids/mother-to"]: "",
              idsFatherTo: guardianId[1][1]["ids/father-to"] !== undefined ? guardianId[1][1]["ids/father-to"]: "",
              idsLegalTo: guardianId[1][1]["ids/legal-to"] !== undefined ? guardianId[1][1]["ids/legal-to"]: "",
              firstName: item[AteduDataLiterals.USER_FIRST_NAME],
              lastName: item[AteduDataLiterals.USER_LAST_NAME],
              name:
                item[AteduDataLiterals.USER_FIRST_NAME] +
                " " +
                item[AteduDataLiterals.USER_LAST_NAME],
              email: item[AteduDataLiterals.USER_EMAIL],
              phone: item[AteduDataLiterals.USER_DATA].phone,
              phone1:
                item[AteduDataLiterals.USER_DATA].phone1 !== undefined
                  ? item[AteduDataLiterals.USER_DATA].phone1
                  : "",
              externalId: item[AteduDataLiterals.USER_EXTERNAL_IDS],
              activationCode:
                item["user/activation-code"] !== undefined
                  ? item["user/activation-code"]
                  : "",
              address1:
                item[AteduDataLiterals.USER_DATA].address1 !== undefined
                  ? item[AteduDataLiterals.USER_DATA].address1
                  : "",
              address2:
                item[AteduDataLiterals.USER_DATA].address2 !== undefined
                  ? item[AteduDataLiterals.USER_DATA].address2
                  : "",
              conavn:
                item[AteduDataLiterals.USER_DATA].conavn !== undefined
                  ? item[AteduDataLiterals.USER_DATA].conavn
                  : "",
              country:
                item[AteduDataLiterals.USER_DATA].country !== undefined
                  ? item[AteduDataLiterals.USER_DATA].country
                  : "",
              imgUrl:
                item[AteduDataLiterals.USER_DATA].imgurl !== undefined
                  ? item[AteduDataLiterals.USER_DATA].imgurl
                  : "",
              municipality:
                item[AteduDataLiterals.USER_DATA].municipality !== undefined
                  ? item[AteduDataLiterals.USER_DATA].municipality
                  : "",
              ssid:
                item[AteduDataLiterals.USER_DATA].ssid !== undefined
                  ? item[AteduDataLiterals.USER_DATA].ssid
                  : "",
              zipCode:
                item[AteduDataLiterals.USER_DATA].zipcode !== undefined
                  ? item[AteduDataLiterals.USER_DATA].zipcode
                  : "",
              status: userStatus,
              modifiedBy:
                item[AteduDataLiterals.ID_MODIFIER] !== undefined
                  ? item[AteduDataLiterals.ID_MODIFIER]
                  : "",
              modifiedDate: item[AteduDataLiterals._META],
              roles:
                item["guardian/role"] !== undefined
                  ? item["guardian/role"]
                  : [],
            };
            var index = CheckExist(userId, updateData);
            if (index <= -1) {
              updateData.push(addData);
            } else {
              updateData[index] = addData;
            }
          }
        });
      }

      return { guardianBySchool: updateData, guardianBySchoolChanged: Math.random().toString(10).substring(7) };
    },
    REMOVEDELETEDGUARDIAN: (curState: UserGuardianState, data: any) => {
      const updatedData = [...curState.guardianBySchool];
      if (data) {
        let idx = updatedData.findIndex((a) => a.id === data.id);
        if (idx > -1) {
          updatedData.splice(idx, 1);
        }
      }
      return { guardianBySchool: updatedData };
    },
    CLEANUPGUARDIANLISTCHANGED: (curState: UserGuardianState, data: any) => {
      return { guardianAccountListChanged: null}
    }
  };
  initStore(actions, initialState);
};
export default configureStore;
