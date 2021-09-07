import moment from 'moment';
import { AdminEventState } from '../../../types/store/adminAndTeacher/events';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

let eventGuid = 0;
const todayStr = moment().format('YYYY-MM-DD');
const minusOneDayStr = moment(todayStr)
  .subtract(1, 'days')
  .format('YYYY-MM-DD');
const minusTwoDayStr = moment(todayStr)
  .subtract(2, 'days')
  .format('YYYY-MM-DD');
const minusThreeDayStr = moment(todayStr)
  .subtract(3, 'days')
  .format('YYYY-MM-DD');
const plusOneDayStr = moment(todayStr).add(1, 'days').format('YYYY-MM-DD');

function createEventId() {
  return String(eventGuid++);
}

export const adminEventInitialState: AdminEventState = {
  eventsList: [
    {
      id: createEventId(),
      title: intl(LabelNames.english),
      start: minusThreeDayStr + 'T08:00:00',
      end: minusThreeDayStr + 'T08:45:00',
      location: 'R. 302 A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.mathematics),
      start: minusThreeDayStr + 'T09:00:00',
      end: minusThreeDayStr + 'T09:45:00',
      location: 'R. 302 B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.biology),
      start: minusThreeDayStr + 'T10:00:00',
      end: minusThreeDayStr + 'T11:00:00',
      location: 'LAB A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.chemistry),
      start: minusThreeDayStr + 'T11:00:00',
      end: minusThreeDayStr + 'T12:00:00',
      location: 'LAB B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.socialStudies),
      start: minusThreeDayStr + 'T13:00:00',
      end: minusThreeDayStr + 'T13:45:00',
      location: 'R. 101 C',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.english),
      start: minusTwoDayStr + 'T08:00:00',
      end: minusTwoDayStr + 'T08:45:00',
      location: 'R. 302 A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.mathematics),
      start: minusTwoDayStr + 'T09:00:00',
      end: minusTwoDayStr + 'T09:45:00',
      location: 'R. 302 B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.biology),
      start: minusTwoDayStr + 'T10:00:00',
      end: minusTwoDayStr + 'T11:00:00',
      location: 'LAB A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.chemistry),
      start: minusTwoDayStr + 'T11:00:00',
      end: minusTwoDayStr + 'T12:00:00',
      location: 'LAB B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.socialStudies),
      start: minusTwoDayStr + 'T13:00:00',
      end: minusTwoDayStr + 'T13:45:00',
      location: 'R. 101 C',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: 'Football Practice',
      start: minusTwoDayStr + 'T15:00:00',
      end: minusTwoDayStr + 'T15:30:00',
      location: 'Footbal Field',
      groupId: 'private',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.english),
      start: minusOneDayStr + 'T08:00:00',
      end: minusOneDayStr + 'T08:45:00',
      location: 'R. 302 A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.mathematics),
      start: minusOneDayStr + 'T09:00:00',
      end: minusOneDayStr + 'T09:45:00',
      location: 'R. 302 B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.biology),
      start: minusOneDayStr + 'T10:00:00',
      end: minusOneDayStr + 'T11:00:00',
      location: 'LAB A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.chemistry),
      start: minusOneDayStr + 'T11:00:00',
      end: minusOneDayStr + 'T12:00:00',
      location: 'LAB B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.socialStudies),
      start: minusOneDayStr + 'T13:00:00',
      end: minusOneDayStr + 'T13:45:00',
      location: 'R. 101 C',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: 'SC Meeting',
      start: minusOneDayStr + 'T15:00:00',
      end: minusOneDayStr + 'T15:30:00',
      location: 'Auditorium',
      groupId: 'private',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.eventFoundationDay),
      start: todayStr,
      groupId: 'schoolEvent',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.english),
      start: todayStr + 'T08:00:00',
      end: todayStr + 'T08:45:00',
      location: 'R. 302 A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.mathematics),
      start: todayStr + 'T09:00:00',
      end: todayStr + 'T09:45:00',
      location: 'R. 302 B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.biology),
      start: todayStr + 'T10:00:00',
      end: todayStr + 'T11:00:00',
      location: 'LAB A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.chemistry),
      start: todayStr + 'T11:00:00',
      end: todayStr + 'T12:00:00',
      location: 'LAB B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.socialStudies),
      start: todayStr + 'T13:00:00',
      end: todayStr + 'T13:45:00',
      location: 'R. 101 C',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: 'Exams',
      start: todayStr + 'T14:00:00',
      end: todayStr + 'T15:00:00',
      location: 'R. 201 A',
      groupId: 'exam',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: 'Lunch With Jens',
      start: todayStr + 'T18:00:00',
      end: todayStr + 'T17:00:00',
      location: 'Cafeteria',
      groupId: 'private',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.english),
      start: plusOneDayStr + 'T08:00:00',
      end: plusOneDayStr + 'T08:45:00',
      location: 'R. 302 A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },

    {
      id: createEventId(),
      title: intl(LabelNames.biology),
      start: plusOneDayStr + 'T10:00:00',
      end: plusOneDayStr + 'T11:00:00',
      location: 'LAB A',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.chemistry),
      start: plusOneDayStr + 'T11:00:00',
      end: plusOneDayStr + 'T12:00:00',
      location: 'LAB B',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
    {
      id: createEventId(),
      title: intl(LabelNames.socialStudies),
      start: plusOneDayStr + 'T13:00:00',
      end: plusOneDayStr + 'T13:45:00',
      location: 'R. 101 C',
      groupId: 'classSchedule',
      repeat: null,
      people: [],
      remindedTime: null,
    },
  ],
};
