import { initStore } from '../store';
import { AteduDataLiterals } from '../../util/constant';
import { capitalizeFirstLetter } from '../../util/commonFunction';
//import pic2 from '../../assets/images/persona/mona.png'
import { UserState } from '../../types/store/users';
import { userProfileInitialState } from '../storeInitialStates/users';

const initialState: UserState = userProfileInitialState;

const configureStore = () => {
  const actions = {
    USER_PROFILEUPDATE: (curState: UserState, data: any) => {
      const profile = data[0][1][1];
      const profileData = profile[AteduDataLiterals.USER_DATA];

      const updateUser = curState.userProfile;
      updateUser.imageUrl = data.img;
      updateUser.contactNo = profileData[AteduDataLiterals.USER_CONTACT];
      const secondContactNo = profileData[AteduDataLiterals.USER_CONTACT1];
      updateUser.secondaryContactNo =
        secondContactNo !== undefined ? secondContactNo : null;
      updateUser.imageUrl =
        'https://stornewsapi.blob.core.windows.net/profileimage/' +
        profileData.imgurl;
      setTimeout(() => {}, 3000);
      return { userProfile: updateUser };
    },
    CURRENTDB_USER: (curState: UserState, data: any) => {
      const updateUser = curState.userProfile;
      const updateData = curState.userData;
      const updatePreferences = curState.userPreferences;

      if (data.data !== undefined) {
        const profile = data.profile;
        const profileData = data.profile[AteduDataLiterals.USER_DATA];
        const preferences = data.preferences;

        if (data.profileInformation === undefined) {
          updateUser.firstname = profile[AteduDataLiterals.USER_FIRST_NAME];
          updateUser.lastname = profile[AteduDataLiterals.USER_LAST_NAME];
          updateUser.email = profile[AteduDataLiterals.USER_EMAIL];
          const id =
            data.profile.id !== undefined
              ? data.profile.id
              : data.profile['crux.db/id'];
          updateUser.id = id?.includes('/') ? id?.split('/')[1] : id;
          /*  #region TEMPORARY until Bug 6257 has been resolved
           * updateUser.role = capitalizeFirstLetter((data.data.roles?.length > 0) ? data.data.roles[0] : "");  //prettfyArray(data.data.roles);
           */
          updateUser.role = capitalizeFirstLetter(
            data.data.roles?.length > 0 ? data.data.roles[0] : 'Student',
          ); //prettfyArray(data.data.roles);
          // #region TEMPORARY until Bug 6257 has been resolved
          updateUser.text =
            profile[AteduDataLiterals.USER_FIRST_NAME] +
            ' ' +
            profile[AteduDataLiterals.USER_LAST_NAME];
          updateUser.imageInitials =
            data.profile[AteduDataLiterals.USER_FIRST_NAME]?.substring(0, 1) +
            data.profile[AteduDataLiterals.USER_LAST_NAME]?.substring(0, 1);
          updateUser.imageUrl =
            profileData?.imgurl !== undefined
              ? 'https://stornewsapi.blob.core.windows.net/profileimage/' +
                profileData.imgurl
              : null;
          if (profileData !== undefined) {
            updateUser.contactNo = profileData[AteduDataLiterals.USER_CONTACT];
            const secondContactNo =
              profileData[AteduDataLiterals.USER_CONTACT1];
            updateUser.secondaryContactNo =
              secondContactNo !== undefined ? secondContactNo : null;
          }
        } else {
          updateUser.firstname = data.profileInformation.firstname;
          updateUser.lastname = data.profileInformation.lastname;
          updateUser.email = data.profileInformation.email;
          updateUser.id = data.profileInformation.id;
          // updateUser.role = data.profileInformation.role
          updateUser.text = data.profileInformation.text;
          updateUser.imageInitials = data.profileInformation.imageInitials;
          updateUser.imageUrl = data.profileInformation.imageUrl;
        }

        updateData.rawData = data.data.rawData;
        updateData.id = data.data.id;

        updateData.user = data.data.user;
        updateData.affiliations = data.data.affiliations;
        updateData.school = data.data.school;
        // updateData.roles = data.data.roles;
        updateData.staff = data.data?.staff;

        if (preferences !== undefined && preferences !== null) {
          updatePreferences.timezone = preferences.timezone;
          updatePreferences.timeFormat = preferences.timeFormat;
          updatePreferences.emailDomain = preferences.emailDomain;
        }
      }
      return { userProfile: updateUser, userData: updateData };
    },
    UPDATE_EXTERNALID: (curState: UserState, data: any) => {
      const r = Math.random().toString(10).substring(7);

      let externalId = data;
      for (let i = 0; i < externalId.length; i++) {
        externalId = externalId.replace('-', '');
      }
      return { userExternalId: data, userExternalUnique: externalId + r };
    },
    AUTHENTICATIONDATA: (curState: UserState, data: any) => {
      return { authenticationData: data };
    },
    M365LOGIN: (curState: UserState, data: any) => {
      return { m365Login: data };
    },
  };

  initStore(actions, initialState);
};
export default configureStore;
