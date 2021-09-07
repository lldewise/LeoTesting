import {
  UserAccountState,
  UserGuardianState,
  UserNotificationState,
  UserState,
} from '../../types/store/users';

export const userAccountInitialState: UserAccountState = {
  studentAccountByIds: [],
  studentAccountByIdChanged: null,
  studentAccountList: [],
  studentAccountListChanged: null,
  staffAccountByIds: [],
  staffAccountList: [],
  staffAccountListChanged: null,
  guardianAccountList: [],
  userAccountType: {
    isEdit: false,
    userType: 'Student',
  },
  selectedUserAccount: {
    id: null,
    name: null,
    email: null,
    phone: null,
    roles: null,
    createdBy: null,
    createOn: null,
    status: null,
    externalId: null,
    activateAccount: true,
    activationCode: null,
    classes: [],
    homeClass: []
  },
  selectedUserProfile: {
    imageUrl: null,
    imageInitials: null,
    text: null,
    secondaryText: null,
    tertiaryText: null,
    optionalText: null,
    firstname: '',
    lastname: '',
    email: '',
    id: null,
    lang: 'en',
    role: null,
    school: 'harvard',
    contactNo: '',
    secondaryContactNo: '',
  },
  selectedUserGuardians: [],
  schoolYear: [],
  staffEmploymentData: [],
};

export const userGuardianInitialState: UserGuardianState = {
  guardianBySchool: [],
  guardianBySchoolChanged: null,
};

export const userNotificationInitialState: UserNotificationState = {
  userSettingNotification: {
    id: null,
    userId: null,
    notification: {
      aboutPost: [],
      events: [],
      reminders: [],
      classUpdate: [],
    },
  },
  navigationActive: 0,
};

export const userProfileInitialState: UserState = {
  userProfile: {
    imageUrl: null,
    imageInitials: null,
    text: null,
    secondaryText: null,
    tertiaryText: null,
    optionalText: null,
    firstname: '',
    lastname: '',
    email: '',
    id: null,
    lang: 'en',
    role: null,
    school: 'harvard',
    contactNo: '',
    secondaryContactNo: '',
  },
  userExternalId: null,
  userExternalUnique: null,
  userData: {
    rawData: null,
    id: '',
    user: null,
    affiliations: null,
    school: null,
    roles: null,
    staff: null,
  },
  userPreferences: {
    timezone: 'UTC',
    timeFormat: 'HH:mm:ss',
    emailDomain: '',
  },
  authenticationData: null,
  m365Login: false,
};
