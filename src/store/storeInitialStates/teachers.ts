import { TeacherProfileState } from '../../types/store/teachers';

export const teacherProfileInitialState: TeacherProfileState = {
  teacherProfile: {
    imageUrl: null,
    imageInitials: 'CW',
    text: 'Clarrise Washington',
    secondaryText: 'posted this',
    tertiaryText: '2 days ago',
    lang: 'en',
  },
};
