const type = require('../../assets/ui-kit/_variables.scss');

export const INITIAL_COLORS = {
  colors: [
    {
      id: '1',
      groupId: 'classSchedule',
      display: 'backgound',
      color: type.classScheduleBackground,
      borderColor: type.classScheduleBorder,
    },
    {
      id: '2',
      groupId: 'private',
      display: 'backgound',
      color: type.privateEventBackground,
      borderColor: type.privateEventBorder,
    },
    {
      id: '3',
      groupId: 'exam',
      display: 'backgound',
      color: type.examEventBackground,
      borderColor: type.examEventBorder,
    },
    {
      id: '4',
      groupId: 'schoolEvent',
      display: 'backgound',
      color: type.schoolEventBackground,
      borderColor: type.schoolEventBorder,
    },
    {
      id: '5',
      groupId: 'otherEvent',
      display: 'backgound',
      color: type.otherEventBackground,
      borderColor: type.otherEventBorder,
    },
  ],
};
