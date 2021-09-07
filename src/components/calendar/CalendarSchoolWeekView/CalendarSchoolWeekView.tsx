import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import moment from 'moment';
import './CalendarSchoolWeekView.scss';
import { INITIAL_COLORS } from '../../../util/calendar/eventColor';
import i18n from '../../../i18n/i18n';
import allLocales from '@fullcalendar/core/locales-all';

const lang = i18n.language.split('_');
moment.locale(lang[0]);

type CalendarSchoolWeekViewProps = {
  today: Date;
  events: any[];
  calView: string;
};

type CalendarSchoolWeekViewStates = {
  today: Date;
};

class CalendarSchoolWeekView extends Component<CalendarSchoolWeekViewProps> {
  private calendarRef = React.createRef<FullCalendar>();
  state: CalendarSchoolWeekViewStates = {
    today: new Date(),
  };

  handlePreviousDay = () => {
    const prev = moment(this.state.today)
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    this.setState({ today: new Date(prev) });
    const calendarApi = this.calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(prev);
    }
  };

  handleNextDay = () => {
    const next = moment(this.state.today).add(7, 'days').format('YYYY-MM-DD');
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
    return (
      <div className="calendarSchoolWeekView fullCalendarScroll ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: '',
            center: '',
            right: '',
          }}
          views={{
            timeGridDay: {
              titleFormat: {
                month: 'short',
                day: 'numeric',
                weekday: 'short',
              },
            },
            week: {
              dayHeaderFormat: {
                day: 'numeric',
                weekday: 'short',
              },
            },
          }}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
          }}
          dayHeaderContent={renderHeader}
          locale={lang[0]}
          locales={allLocales}
          firstDay={1}
          weekends={false}
          initialView={'timeGridWeek'}
          initialEvents={completedEvents}
          dayMaxEvents={false}
          eventContent={renderEventContent}
          forceEventDuration={true}
          displayEventTime={true}
          allDaySlot={true}
          scrollTime={'07:00:00'}
          ref={this.calendarRef}
          slotMinTime={'07:00:00'}
          slotMaxTime={'24:00:00'}
        />
      </div>
    );
  }
}

function renderHeader(evt: any) {
  const data = evt.text.split(' ');
  return (
    <>
      <span style={{ fontSize: '20px' }}>{data[0]}</span>&nbsp;
      <span style={{ fontSize: '14px' }}>{data[1]}</span>
    </>
  );
}

function renderEventContent(eventInfo: any) {
  const a = moment(eventInfo.event.start).format('YYYY-MM-DD');
  const b = moment(new Date()).format('YYYY-MM-DD');
  const col = eventInfo.event.borderColor;
  const icon = eventInfo.event.extendedProps.icon;
  let labelStyle: React.CSSProperties = {};
  const calendarIcon: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: col,
    margin: '10px',
  };
  if (eventInfo.event.groupId !== 'classSchedule') {
    labelStyle = {
      marginLeft: '10px',
    };
  }

  return (
    <div className={`event-card type-${eventInfo.event.groupId}`}>
      <div className="event-title scheduled">
        {eventInfo.event.groupId === 'classSchedule' ? (
          a < b ? (
            <FontIcon
              iconName={icon}
              className="schoolWeekCompleteIcon"
              style={{ color: eventInfo.event.textColor }}
            />
          ) : (
            <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
          )
        ) : null}
        <div className="event-title no-sched" style={labelStyle}>
          <span className="ms-fontWeight-semibold noWrap">
            {eventInfo.event.title}
          </span>
          <span className="event-loc">
            {eventInfo.event.extendedProps.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CalendarSchoolWeekView;
