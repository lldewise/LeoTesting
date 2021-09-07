import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleDailyList from '../ScheduleDailyList/ScheduleDailyList';
import moment from 'moment';
import './CalendarMonthView.scss';
import { INITIAL_COLORS } from '../../../util/calendar/eventColor';
import i18n from '../../../i18n/i18n';
import allLocales from '@fullcalendar/core/locales-all';

const type = require('../../../assets/ui-kit/_variables.scss');
const lang = i18n.language.split('_');
moment.locale(lang[0]);

type CalendarMonthViewProps = { today: Date; events: any[]; calView: string };

type CalendarMonthViewStates = {
  today: Date;
};

class CalendarMonthView extends Component<CalendarMonthViewProps> {
  private calendarRef = React.createRef<FullCalendar>();
  state: CalendarMonthViewStates = {
    today: new Date(),
  };

  handlePreviousDay = () => {
    const prev = moment(this.state.today)
      .subtract(1, 'months')
      .format('YYYY-MM-DD');
    this.setState({ today: new Date(prev) });
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(prev);
    }
  };

  handleNextDay = () => {
    const next = moment(this.state.today).add(1, 'months').format('YYYY-MM-DD');
    this.setState({ today: new Date(next) });
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(next);
    }
  };

  handleTodayDay = () => {
    this.setState({ today: this.props.today });
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(moment(this.props.today).format('YYYY-MM-DD'));
    }
  };

  handleSelectedDate = (item: Date) => {
    this.setState({ today: item });
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(moment(item).format('YYYY-MM-DD'));
    }
  };

  handleRemoveClick = (evt: any, e: any) => {
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      if (e) {
        for (let i = 0; i < evt.length; i++) {
          const tobeAdded = calendarApi.view.calendar;
          tobeAdded.addEvent(evt[i]);
        }
      } else {
        for (let i = 0; i < evt.length; i++) {
          const tobeRemove = calendarApi.getEventById(evt[i].id);
          if (tobeRemove) {
            tobeRemove.remove();
          }
        }
      }
    }
  };

  handleDayNumberClick = (evt: any) => {
    this.setState({ today: evt.date });
  };

  feedColors = () => {
    const events = this.props.events;
    const color = INITIAL_COLORS.colors;
    const filteredEvent = [];

    if (events && events.length > 0) {
      for (let i = 0; i < color.length; i++) {
        for (let x = 0; x < events.length; x++) {
          if (events[x]?.groupId === color[i].groupId) {
            let colArray = Object.assign({}, x, {
              display: color[i].display,
              color: color[i].color,
              borderColor: color[i].borderColor,
            });
            filteredEvent.push(Object.assign(events[x], colArray));
          }
        }
      }
    }
    return filteredEvent;
  };

  render() {
    const completedEvents = this.feedColors();
    const dayEvent = this.props.events.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(this.state.today).format('YYYY-MM-DD'),
    );
    return (
      <div>
        <div className="ms-Grid-col ms-lg9 calendarMonthView fullCalendarScroll ">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            dayMaxEventRows={true}
            headerToolbar={{
              left: '',
              center: '',
              right: '',
            }}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 2,
                moreLinkContent: renderMoreLink('...'),
              },
              month: {
                dayHeaderFormat: {
                  weekday: 'long',
                },
              },
            }}
            locale={lang[0]}
            locales={allLocales}
            firstDay={1}
            initialView={this.props.calView}
            initialEvents={completedEvents}
            eventContent={renderEventContent}
            fixedWeekCount={false}
            dateClick={this.handleDayNumberClick}
            unselectCancel={'false'}
            unselectAuto={false}
            ref={this.calendarRef}
          />
        </div>
        <div className="ms-Grid-col ms-lg3 calendarDaySched">
          <div className="dayTitle">
            <div className="day">{moment(this.state.today).format('ddd,')}</div>
            <div className="month">
              {moment(this.state.today).format('MMM DD')}
            </div>
          </div>
          <div className="dayList">
            {dayEvent.map((value, i) => {
              return <ScheduleDailyList key={i} item={value} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

function renderMoreLink(evt: any) {
  const moreStyles = {
    fontSize: '30px',
    color: type.classScheduleBorder,
    '&:hover': {
      cursor: 'pointer',
    },
  };
  return <span style={moreStyles}>{evt}</span>;
}

function renderEventContent(eventInfo: any) {
  const bStyle = {
    borderRight: '0px',
    borderBottom: '0px',
    borderTop: '0px',
    borderLeft: '3px solid ' + eventInfo.borderColor,
    color: '#595959',
  };

  const tStyle = {
    fontWeight: 600,
  };
  const time = moment(eventInfo.event.start).format('hA');
  return (
    <div className="monthViewSchedule" style={bStyle}>
      {time !== '12AM' ? (
        <span>
          {time}&nbsp;<span style={tStyle}>{eventInfo.event.title}</span>&nbsp;{' '}
          {eventInfo.event.extendedProps.location}
        </span>
      ) : (
        <span>
          <b>{eventInfo.event.title}</b>&nbsp;{' '}
          {eventInfo.event.extendedProps.location}
        </span>
      )}
    </div>
  );
}

export default CalendarMonthView;
