import React, { useState, useRef, useEffect, ReactElement } from 'react';
import styles from './Schedules.module.scss';
import FilterCalendar from '../../components/calendar/FilterCalendarView/FilterCalendarView';
import FilterMySchedule from '../../components/calendar/FilterMySchedule/FilterMySchedule';
import CalendarCallout from '../../components/calendar/CalendarCallout/CalendarCallout';
import DayView from '../../components/calendar/CalendarDayView/CalendarDayView';
import WeekView from '../../components/calendar/CalendarWeekView/CalendarWeekView';
import SchoolWeekView from '../../components/calendar/CalendarSchoolWeekView/CalendarSchoolWeekView';
import MonthView from '../../components/calendar/CalendarMonthView/CalendarMonthView';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { intl } from '../../util/commonFunction';
import { LabelNames } from '../../util/constant';
import i18n from '../../i18n/i18n';
import moment from 'moment';
import 'moment/locale/da';
import { DefaultButton, IconButton } from 'office-ui-fabric-react';
import { Roles } from '../../util/constant';
import { useStore } from '../../store/store';
import apiGet from '../../services/apiGet';
import { MONTH_EVENTS } from '../../util/calendar/eventMonth.utils';

const lang = i18n.language.split('_');
moment.locale(lang[0]);

//eslint-disable-next-line
const statusColorIcon = [
  {
    status: 1,
    icon: 'SkypeCircleCheck',
    color: '#008000',
  },
  {
    status: 2,
    icon: 'DRM',
    color: '#FF0000',
  },
  {
    status: 3,
    icon: 'Blocked',
    color: '#000',
  },
  {
    status: 4,
    icon: 'AlertSolid',
    color: '#F7A93B',
  },
  {
    status: 5,
    icon: 'SkypeCircleClock',
    color: '#6c35d4',
  },
];

const Schedule: React.FC = () => {
  const [data, dispatch] = useStore();
  const [calView, setCalView] = useState<string>('');
  const [calIcon, setCalIcon] = useState('CalendarDay');
  const [calText, setCalText] = useState<string>(
    intl(LabelNames.schoolWeekView),
  );
  const [isFilterView, setIsFilterView] = useState(false);
  const [isMyScheduleView, setIsMyScheduleView] = useState(false);
  const [isCheckSchoolEvent, setIsCheckSchoolEvent] = useState(true);
  const [isCheckClassSchedule, setIsCheckClassSchedule] = useState(true);
  const [isCheckExam, setIsCheckExam] = useState(true);
  const [isCheckPrivateEvent, setIsCheckPrivateEvent] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date());
  const [calCallout, setCalCallout] = useState<any>(null);
  const [completedEvents, setCompletedEvents] = useState<any[]>([]);
  const [view, setView] = useState<ReactElement<any, any>>();

  const childDayView = useRef<any>(null);
  const childWeekView = useRef<any>(null);
  const childSchoolWeekView = useRef<any>(null);
  const childMonthView = useRef<any>(null);
  const today = new Date();
  const currentView = useRef<string>();

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 2);
    loadLessonByStaff();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function handleTodayClick() {
    setCurrentDay(new Date());
    if (calView === 'timeGridDay') {
      childDayView.current.handleTodayDay();
    } else if (calView === 'timeGridWeek') {
      childWeekView.current.handleTodayDay();
    } else if (calView === 'timeGridSchoolWeek') {
      childSchoolWeekView.current.handleTodayDay();
    } else if (calView === 'dayGridMonth') {
      childMonthView.current.handleTodayDay();
    }
  }

  const loadLessonByStaff = () => {
    if (data.userProfile.role === Roles.TEACHER) {
      const staffId = data.userData?.staff[0].split('/')[1];
      apiGet
        .get(
          'api/school/' +
            data.userProfile.school +
            '/teacher/' +
            staffId +
            '/lessons/week?clientId=' +
            data.userExternalUnique +
            '&date=' +
            moment(new Date()).format('YYYY-MM-DD'),
        )
        .then(response => {});
    }
  };

  function addIconColor(events: any[]) {
    const dateEvents: any[] = [];
    let statArray: any = {};
    for (let x = 0; x < events.length; x++) {
      statArray = { x, textColor: '#6c35d4', icon: 'SkypeCircleClock' };
      dateEvents.push(Object.assign(events[x], statArray));
    }
    return dateEvents;
  }

  function feedData(events: any[]) {
    const dateEvents: any[] = [];
    let statArray: any = {};
    for (let i = 0; i < statusColorIcon.length; i++) {
      for (let x = 0; x < events.length; x++) {
        if (events[x].status === statusColorIcon[i].status) {
          statArray = {
            x,
            textColor: statusColorIcon[i].color,
            icon: statusColorIcon[i].icon,
          };
          dateEvents.push(Object.assign(events[x], statArray));
        }
      }
    }
    return dateEvents;
  }

  useEffect(() => {
    if (data.userProfile.id != null) {
      loadLessonByStaff();
    }
  }, [data.userProfile.id]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data.teacherEventsList && data.teacherEventsList?.length > 0) {
      setCompletedEvents(addIconColor(data.teacherEventsList));
    }
  }, [data.teacherEventsList.length]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (completedEvents.length > 0) {
      setView(renderCalendar(completedEvents));
    }
  }, [completedEvents.length, calView]); //eslint-disable-line react-hooks/exhaustive-deps

  // for student and admin (empty for now)
  // TODO: need refactoring if final data comes in
  useEffect(() => {
    if (data.userProfile.role !== Roles.TEACHER) {
      setView(renderCalendar(feedData(MONTH_EVENTS)));
    }
  }, [calView]); //eslint-disable-line react-hooks/exhaustive-deps

  function handlePreviousClick() {
    if (calView === 'timeGridDay') {
      setCurrentDay(
        new Date(moment(currentDay).subtract(1, 'days').format('YYYY-MM-DD')),
      );
      childDayView.current.handlePreviousDay();
    } else if (calView === 'timeGridWeek') {
      setCurrentDay(
        new Date(moment(currentDay).subtract(7, 'days').format('YYYY-MM-DD')),
      );
      childWeekView.current.handlePreviousDay();
    } else if (calView === 'timeGridSchoolWeek') {
      setCurrentDay(
        new Date(moment(currentDay).subtract(7, 'days').format('YYYY-MM-DD')),
      );
      childSchoolWeekView.current.handlePreviousDay();
    } else if (calView === 'dayGridMonth') {
      setCurrentDay(
        new Date(moment(currentDay).subtract(1, 'months').format('YYYY-MM-DD')),
      );
      childMonthView.current.handlePreviousDay();
    }
  }

  function handleNextClick() {
    if (calView === 'timeGridDay') {
      setCurrentDay(
        new Date(moment(currentDay).add(1, 'days').format('YYYY-MM-DD')),
      );
      childDayView.current.handleNextDay();
    } else if (calView === 'timeGridWeek') {
      setCurrentDay(
        new Date(moment(currentDay).add(7, 'days').format('YYYY-MM-DD')),
      );
      childWeekView.current.handleNextDay();
    } else if (calView === 'timeGridSchoolWeek') {
      setCurrentDay(
        new Date(moment(currentDay).add(7, 'days').format('YYYY-MM-DD')),
      );
      childSchoolWeekView.current.handleNextDay();
    } else if (calView === 'dayGridMonth') {
      setCurrentDay(
        new Date(moment(currentDay).add(1, 'months').format('YYYY-MM-DD')),
      );
      childMonthView.current.handleNextDay();
    }
  }

  function handleSelectedDateClick(item: Date) {
    setCurrentDay(new Date(item));
    if (currentView.current === 'timeGridDay') {
      childDayView.current.handleSelectedDate(item);
    } else if (currentView.current === 'timeGridWeek') {
      childWeekView.current.handleSelectedDate(item);
    } else if (currentView.current === 'timeGridSchoolWeek') {
      childSchoolWeekView.current.handleSelectedDate(item);
    } else if (currentView.current === 'dayGridMonth') {
      childMonthView.current.handleSelectedDate(item);
    }
  }

  function handleCalendarViewChange() {
    setIsFilterView(!isFilterView);
    if (isMyScheduleView) {
      setIsMyScheduleView(false);
    }
  }

  function handleMyScheduleChange() {
    setIsMyScheduleView(!isMyScheduleView);
    if (isFilterView) {
      setIsFilterView(false);
    }
  }

  function renderCalendar(item: any[]) {
    switch (calView) {
      case 'timeGridDay':
        setCalView('timeGridDay');
        return (
          <DayView
            today={today}
            events={item}
            calView={calView}
            ref={childDayView}
          />
        );
      case 'timeGridWeek':
        setCalView('timeGridWeek');
        return (
          <WeekView
            today={today}
            events={item}
            calView={calView}
            ref={childWeekView}
          />
        );
      case 'timeGridSchoolWeek':
        setCalView('timeGridSchoolWeek');
        return (
          <SchoolWeekView
            today={today}
            events={item}
            calView={calView}
            ref={childSchoolWeekView}
          />
        );
      case 'dayGridMonth':
        setCalView('dayGridMonth');
        return (
          <MonthView
            today={today}
            events={item}
            calView={calView}
            ref={childMonthView}
          />
        );
      default:
        setCalView('timeGridSchoolWeek');
        return (
          <SchoolWeekView
            today={today}
            events={item}
            calView={calView}
            ref={childSchoolWeekView}
          />
        );
    }
  }

  const onChangeFilterRender = (item: any) => {
    let key: any = {};
    if (item.target === undefined) {
      key = item.key;
    } else {
      key = item.target.id;
    }
    switch (key) {
      case 'day':
        setCalIcon('CalendarDay');
        setCalText(intl(LabelNames.dayView));
        setCalView('timeGridDay');
        setCompletedEvents(completedEvents);
        currentView.current = 'timeGridDay';
        break;
      case 'schoolWeek':
        setCalIcon('CalendarWorkWeek');
        setCalText(intl(LabelNames.schoolWeekView));
        setCalView('timeGridSchoolWeek');
        setCompletedEvents(completedEvents);
        currentView.current = 'timeGridSchoolWeek';
        break;
      case 'week':
        setCalIcon('CalendarWeek');
        setCalText(intl(LabelNames.weekView));
        setCalView('timeGridWeek');
        setCompletedEvents(completedEvents);
        currentView.current = 'timeGridWeek';
        break;
      case 'month':
        setCalIcon('Calendar');
        setCalText(intl(LabelNames.monthView));
        setCalView('dayGridMonth');
        setCompletedEvents(completedEvents);
        currentView.current = 'dayGridMonth';
        break;
      default:
        break;
    }
    setIsFilterView(false);
  };

  const onChangeScheduleRender = (item: string) => {
    if (item !== '') {
      switch (item) {
        case 'classSchedule':
          setIsCheckClassSchedule(!isCheckClassSchedule);
          updateEvents(item, !isCheckClassSchedule);
          break;
        case 'exam':
          setIsCheckExam(!isCheckExam);
          updateEvents(item, !isCheckExam);
          break;
        case 'schoolEvent':
          setIsCheckSchoolEvent(!isCheckSchoolEvent);
          updateEvents(item, !isCheckSchoolEvent);
          break;
        case 'private':
          setIsCheckPrivateEvent(!isCheckPrivateEvent);
          updateEvents(item, !isCheckPrivateEvent);
          break;
        default:
          break;
      }
    }
  };

  const updateEvents = (item: string, e: any) => {
    const evt: any[] = completedEvents.filter(a => item === a.groupId);
    if (calView === 'timeGridDay') {
      childDayView.current.handleRemoveClick(evt, e);
    } else if (calView === 'timeGridWeek') {
      childWeekView.current.handleRemoveClick(evt, e);
    } else if (calView === 'timeGridSchoolWeek') {
      childSchoolWeekView.current.handleRemoveClick(evt, e);
    } else if (calView === 'dayGridMonth') {
      childMonthView.current.handleRemoveClick(evt, e);
    }
  };
  useEffect(() => {
    setCalCallout(
      <CalendarCallout
        handleSelectDate={handleSelectedDateClick}
        dateToday={currentDay}
        showMonth={true}
        miniCalendar={false}
      />,
    );
  }, [currentDay]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMyScheduleView) {
      const handler = (event: any) => {
        const a = event.target.textContent.replace(/[^a-zA-Z0-9 ]/g, '').trim();
        if (
          a !== intl(LabelNames.classSchedule) &&
          a !== '' &&
          a !== intl(LabelNames.examEvent) &&
          a !== '' &&
          a !== intl(LabelNames.schoolEvent) &&
          a !== '' &&
          a !== intl(LabelNames.privateEvent) &&
          a !== '' &&
          a !== intl(LabelNames.mySchedules) &&
          a !== ''
        ) {
          setIsMyScheduleView(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }
  });

  useEffect(() => {
    if (isFilterView) {
      const handler = (event: any) => {
        const a = event.target.textContent.replace(/[^a-zA-Z0-9 ]/g, '').trim();
        if (
          a !== intl(LabelNames.schoolWeekView) &&
          a !== intl(LabelNames.weekView) &&
          a !== intl(LabelNames.monthView) &&
          a !== intl(LabelNames.dayView)
        ) {
          setIsFilterView(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }
  });

  return (
    <div className={styles.schedules}>
      <div className={styles.filterContainer}>
        <div className={'ms-lg6 ' + styles.leftContainer}>
          <DefaultButton
            className={styles.btnCalendarToday}
            onClick={handleTodayClick}>
            <FontIcon
              iconName="GotoToday"
              className={styles.todayCalendarIcon}
            />
            {intl(LabelNames.today)}
          </DefaultButton>
          <IconButton
            iconProps={{ iconName: 'ChromeBack' }}
            className={styles.btnPrevious}
            onClick={handlePreviousClick}
          />
          <IconButton
            iconProps={{ iconName: 'ChromeBackMirrored' }}
            className={styles.btnNext}
            onClick={handleNextClick}
          />
          <div>{calCallout}</div>
        </div>
        <div className={'ms-lg6 ' + styles.rightContainer}>
          <DefaultButton
            className={styles.btnCalendarAll}
            id="btnCalFilter"
            onClick={handleCalendarViewChange}>
            <FontIcon iconName={calIcon} className={styles.calendarAllIcon} />
            {calText}{' '}
            <FontIcon
              iconName="ChevronDown"
              className={styles.calendarDownIcon}
            />
          </DefaultButton>
          <DefaultButton
            className={styles.btnFilterEvent}
            id="btnMySchedFilter"
            onClick={handleMyScheduleChange}>
            <FontIcon iconName="Filter" className={styles.filterEventIcon} />
            {intl(LabelNames.mySchedules)}{' '}
            <FontIcon
              iconName="ChevronDown"
              className={styles.filterDownIcon}
            />
          </DefaultButton>
          <DefaultButton className={styles.btnPrint}>
            <FontIcon iconName="Print" className={styles.printIcon} />
            {intl(LabelNames.btn_Print)}
          </DefaultButton>
        </div>
      </div>
      <div className={styles.multiSchedule}>{view}</div>

      <FilterCalendar
        targetEl="#btnCalFilter"
        isFilterView={isFilterView}
        onChangeFilterRender={onChangeFilterRender}
      />

      <FilterMySchedule
        targetEl="#btnMySchedFilter"
        isMyScheduleView={isMyScheduleView}
        isCheckSchoolEvent={isCheckSchoolEvent}
        isCheckClassSchedule={isCheckClassSchedule}
        isCheckPrivateEvent={isCheckPrivateEvent}
        isCheckExam={isCheckExam}
        onChangeScheduleRender={onChangeScheduleRender}
      />
    </div>
  );
};

export default Schedule;
