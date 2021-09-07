import React, { Fragment } from 'react';
import classes from './ScheduleWeekList.module.scss';
import moment from 'moment';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { useStore } from '../../../store/store';
import helle from '../../../assets/images/persona/helle.png';
import { FontSizes } from '@fluentui/react';

type ScheduleWeekListProps = {
  key: number;
  item: any;
  toggleAbsence: (
    target: any,
    start: string,
    end: string,
    title: string,
    location: string,
    todos: any[],
  ) => void;
};

const ScheduleWeekList: React.FC<ScheduleWeekListProps> = item => {
  const props = item;
  const time = moment(props.item.start).format('h A');
  let minutes = '';
  const color = props.item.borderColor;
  if (props.item.end !== undefined) {
    minutes =
      moment(props.item.end).subtract(props.item.start).format('mm') === '00'
        ? '1 hr'
        : moment(props.item.end).subtract(props.item.start).format('mm') +
          ' min';
  }

  const borderShades: React.CSSProperties = {
    width: '7px',
    height: '65px',
    borderRadius: '5px',
    backgroundColor: color,
    top: '-4px',
    position: 'relative',
  };
  const nextSchedBorderShades: React.CSSProperties = {
    width: '8px',
    height: '85px',
    borderRadius: '5px',
    backgroundColor: color,
    top: '-5px',
    position: 'relative',
  };

  const dateToday = moment(new Date());
  const startTime = moment(props.item.start);
  const interval =
    props.item.end !== undefined
      ? Math.floor(moment.duration(startTime.diff(dateToday)).asMinutes())
      : 0;
  const isNextSched = interval < 60 && interval > 0 ? true : false;
  const isToday =
    moment(props.item.start).format('YYYY-MM-DD') ===
    moment(dateToday).format('YYYY-MM-DD')
      ? true
      : false;

  const [teacherProfile] = useStore();
  const teacherPersona = {
    imageUrl: helle,
    imageInitials: teacherProfile.teacherProfile.imageInitials,
    text: teacherProfile.teacherProfile.text,
    secondaryText: teacherProfile.teacherProfile.secondaryText,
    tertiaryText: teacherProfile.teacherProfile.tertiaryText,
  };
  const col = props.item.groupId === 'exam' ? '#C96238' : '#6c35d4';
  const calendarIcon: React.CSSProperties = {
    fontSize: '12px',
    color: col,
    paddingRight: '5px',
  };

  const handleToggleAbsenceRegistration = (
    id: string,
    start: string,
    end: string,
    title: string,
    location: string,
    hasAbsenceRegistration: boolean,
    hasFile: boolean,
  ) => {
    const elem = '#toggleSched' + id;
    const todos = [];
    if (hasAbsenceRegistration) {
      todos.push({
        name: 'Absence Registration',
        dueDate: 'Awaiting Teacher',
        index: 1,
        isScrolling: true,
        icon: 'PenWorkspace',
      });
    }
    if (hasFile) {
      todos.push({
        name: '1y En Terno',
        dueDate: 'Awaiting Teacher',
        index: 2,
        isScrolling: true,
        icon: 'ClipboardList',
      });
    }
    props.toggleAbsence(elem, start, end, title, location, todos);
  };

  return (
    <>
      {isNextSched && isToday ? (
        <>
          <div className="ms-Grid-col mg-lg12" style={{ width: '100%' }}>
            <div className={'ms-Grid-col ms-lg3 ' + classes.nextContainer}>
              <FontIcon
                iconName="Clock"
                className={classes.monthCalendarIcon}
              />
              &nbsp; in {interval} mins
            </div>
          </div>

          <div
            className={'ms-Grid-col ms-lg12 ' + classes.nextSched}
            id={'toggleSched' + props.item.id}
            onClick={() =>
              handleToggleAbsenceRegistration(
                props.item.id,
                props.item.start,
                props.item.end,
                props.item.title,
                props.item.location,
                props.item.hasAbsenceRegistration,
                props.item.hasFile,
              )
            }>
            <div style={nextSchedBorderShades} />
            <div className={'ms-lg4 ' + classes.timeFrame}>
              <span>{time === '12 AM' ? 'All Day' : time}</span>
              <br />
              <span className={classes.minutes}>{minutes}</span>
            </div>
            <div className={'ms-lg8 ' + classes.details}>
              <span className={classes.titleName}>
                <i>
                  {time !== '12 AM' &&
                  props.item.groupId !== 'private' &&
                  props.item.groupId !== 'exam' ? (
                    <FontIcon
                      iconName="SkypeCircleClock"
                      style={calendarIcon}
                    />
                  ) : null}
                </i>
                {props.item.title}
              </span>
              <div className={classes.locationName}>{props.item.location}</div>
              <Persona
                {...teacherPersona}
                size={PersonaSize.size24}
                presence={PersonaPresence.online}
                imageAlt="Annie Lindqvist, status is online"
                primaryText={FontSizes.size10}
                className={classes.persona}
              />
            </div>
          </div>
        </>
      ) : (
        <div
          className={
            'ms-Grid-col ms-lg12 scheduleWeekList ' + classes.scheduleWeekList
          }
          id={'toggleSched' + props.item.id}
          onClick={() =>
            handleToggleAbsenceRegistration(
              props.item.id,
              props.item.start,
              props.item.end,
              props.item.title,
              props.item.location,
              props.item.hasAbsenceRegistration,
              props.item.hasFile,
            )
          }>
          <div style={borderShades} />
          <div className={'ms-lg4 ' + classes.timeFrame}>
            <span>{time === '12 AM' ? 'All Day' : time}</span>
            <br />
            <span className={classes.minutes}>{minutes}</span>
          </div>
          <div className={'ms-lg8 ' + classes.details}>
            <span className={classes.titleName}>
              <i>
                {time !== '12 AM' &&
                props.item.groupId !== 'private' &&
                props.item.groupId !== 'exam' ? (
                  <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
                ) : null}
              </i>
              {props.item.title}
            </span>
            <br />
            <span className={classes.locationName}>{props.item.location}</span>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleWeekList;