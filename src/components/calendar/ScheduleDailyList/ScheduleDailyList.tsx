import React, { Fragment } from 'react';
import classes from './ScheduleDailyList.module.scss';
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

type ScheduleDailyListProps = {
  key: number;
  item: any;
};

const ScheduleDailyList: React.FC<ScheduleDailyListProps> = item => {
  const props = item;
  let isNextSched = false;
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
    width: '6px',
    height: '65px',
    borderRadius: '5px',
    backgroundColor: color,
    top: '-4px',
    position: 'relative',
  };
  const nextSchedBorderShades: React.CSSProperties = {
    width: '7px',
    height: '90px',
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
  isNextSched = interval < 60 && interval > 0 ? true : false;

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
    fontWeight: 'bold',
    color: col,
    marginRight: '5px',
  };

  return (
    <>
      {isNextSched ? (
        <>
          <div className={'ms-Grid-col ms-lg3 ' + classes.nextContainer}>
            <FontIcon iconName="Clock" className={classes.monthCalendarIcon} />
            &nbsp; in {interval} mins
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + classes.nextSched}>
            <div style={nextSchedBorderShades} />
            <div className={'ms-lg4 ' + classes.timeFrame}>
              <span>{time === '12 AM' ? 'All Day' : time}</span>
              <br />
              <span className={classes.minutes}>{minutes}</span>
            </div>
            <div className={'ms-lg8 ' + classes.details}>
              {time !== '12 AM' &&
              props.item.groupId !== 'private' &&
              props.item.groupId !== 'exam' ? (
                <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
              ) : null}
              <span>
                <b>{props.item.title}</b>
              </span>
              <br />
              <span>{props.item.location}</span>
              <br />
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
        <div className={'ms-Grid-col ms-lg12 ' + classes.scheduleDailyList}>
          <div style={borderShades} />
          <div className={'ms-lg4 ' + classes.timeFrame}>
            <span>{time === '12 AM' ? 'All Day' : time}</span>
            <br />
            <span className={classes.minutes}>{minutes}</span>
          </div>
          <div className={'ms-lg8 ' + classes.details}>
            {time !== '12 AM' &&
            props.item.groupId !== 'private' &&
            props.item.groupId !== 'exam' ? (
              <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
            ) : null}
            <span>
              <b>{props.item.title}</b>
            </span>
            <br />
            <span>{props.item.location}</span>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleDailyList;
