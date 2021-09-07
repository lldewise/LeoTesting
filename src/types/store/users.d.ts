type ModDate = {
  'valid-time': string;
  'tx-time': string;
};

export type StaffAccount = {
  activationCode: string;
  address1: string;
  address2: string;
  classes: any[];
  conavn: string;
  country: string;
  email: string;
  externalId: string[];
  firstName: string;
  id: string;
  imgUrl: string;
  lastName: string;
  modifiedBy: string;
  modifiedDate: ModDate;
  municipality: string;
  name: string;
  personalemail?: string;
  phone: string;
  phone1: string;
  roles: string[];
  ssid: string;
  staffId: string;
  status: string;
  userId: string;
  zipCode: string;
};

export type StaffEmployment = {
  classes: any[];
  empHistory: any;
  id: string;
  roles: string[];
  staffId: string;
  userId: string;
};

export type UserAccountState = {
  studentAccountByIds: StudentAccountById[];
  studentAccountByIdChanged: string | null;
  studentAccountList: any[];
  studentAccountListChanged: string | null;
  staffAccountByIds: any[];
  staffAccountList: StaffAccount[];
  staffAccountListChanged: string | null;
  guardianAccountList: any[];
  userAccountType: UserAccountType;
  selectedUserAccount: UserAccount;
  selectedUserProfile: UserProfile;
  selectedUserGuardians: any[];
  schoolYear: any[];
  staffEmploymentData: StaffEmployment[];
  guardianBySchool?: any;
};

export type UserGuardianState = {
  guardianBySchool: any[];
  guardianBySchoolChanged: string | null;
};

export type UserNotificationState = {
  userSettingNotification: UserNotification;
  navigationActive: number;
};

export type UserState = {
  userProfile: UserProfile;
  userExternalId: string | null;
  userExternalUnique: string | null;
  userData: UserData;
  userPreferences: UserPreference;
  authenticationData: any;
  m365Login: boolean;
};

export type UserProfile = {
  imageUrl: string | null;
  imageInitials: string | null;
  text: string | null;
  secondaryText: string | null;
  tertiaryText: string | null;
  optionalText: string | null;
  firstname: string;
  lastname: string;
  email: string;
  id: string | null;
  lang: string;
  role: string | null;
  school: string;
  contactNo: string;
  secondaryContactNo: string;
};

export type UserData = {
  rawData: any;
  id: string;
  user: any;
  affiliations: any;
  school: any;
  roles: any;
  staff: any;
};

export type UserPreference = {
  timezone: string;
  timeFormat: string;
  emailDomain: string;
};

export type UserAccount = {
  activateAccount: boolean;
  createOn: string | null;
  createdBy: string | null;
  email: number | null;
  externalId: any[] | null;
  id: string | null;
  name: number | null;
  phone: number | null;
  roles: any;
  status: any;
  activationCode: any;
  classes: any[];
  homeClass: any[];
};

export type UserAccountType = {
  isEdit: boolean;
  userType: string;
};

export type UserGenData = {
  affiliations: Affiliations;
  id: string;
  rawData: any[];
  roles: string[] | null;
  school: any;
  staff: any;
  user: any;
};

type Affiliations = {
  [string]: {
    [string]: string[];
  };
};
