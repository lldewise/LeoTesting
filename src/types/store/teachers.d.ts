export type TeacherProfileState = {
  teacherProfile: TeacherProfile;
};

export type TeacherProfile = {
  imageInitials: string;
  imageUrl: string | null;
  lang: 'en';
  secondaryText: string;
  tertiaryText: string;
  text: string;
};
