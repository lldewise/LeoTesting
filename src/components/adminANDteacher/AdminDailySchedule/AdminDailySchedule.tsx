import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS } from '../../../util/calendar/event.utils';
import { INITIAL_COLORS } from '../../../util/calendar/eventColor';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import './AdminDailySchedule.scss';
import moment from 'moment';
import word from '../../../assets/images/office/word.png';
import book from '../../../assets/images/office/book.png';
import allLocales from '@fullcalendar/core/locales-all';
import 'moment/locale/da';
import i18n from '../../../i18n/i18n';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

const lang = i18n.language.split('_');
moment.locale(lang[0]);

const todos = [
  {
    name: intl(LabelNames.assignmentReactionPaper),
    dueDate: intl(LabelNames.dueToday),
    index: 1,
    isScrolling: true,
    thumbnail: word,
  },
  {
    name: intl(LabelNames.readChapter) + ' 1',
    dueDate: intl(LabelNames.dueToday),
    index: 2,
    isScrolling: true,
    thumbnail: book,
  },
];

type AdminDailyScheduleState = {
  timeSched: string | null;
  title: string | null;
  location: string | null;
  isSubjectToggle: boolean;
  targetEl: any;
  todos: any[];
};

class AdminDailySchedule extends Component {
  state: AdminDailyScheduleState = {
    timeSched: null,
    title: null,
    location: null,
    isSubjectToggle: false,
    targetEl: null,
    todos: [],
  };

  feedColors = () => {
    const events = INITIAL_EVENTS;
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
      <div className="adminDailyCalendar">
        <div className="adminDailySchedule">
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
                  year: 'numeric',
                  month: 'long',
                },
              },
            }}
            locale={lang[0]}
            locales={allLocales}
            initialView="timeGridDay"
            initialEvents={completedEvents}
            dayMaxEvents={false}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            forceEventDuration={true}
            displayEventTime={true}
            allDaySlot={true}
            scrollTime={'07:00:00'}
            slotMinTime={'07:00:00'}
            slotMaxTime={'24:00:00'}
          />
        </div>
      </div>
    );
  }

  handleEventClick = (clickInfo: any) => {
    const strTime = moment(clickInfo.event.start).format('h:mm');
    const endTime = moment(clickInfo.event.end).format('h:mm');
    if (strTime !== endTime) {
      this.setState({
        timeSched: strTime + ' - ' + endTime,
        title: clickInfo.event.title,
        location: clickInfo.event.extendedProps.location,
        isSubjectToggle: !this.state.isSubjectToggle,
        targetEl: clickInfo.el,
        todos: todos,
      });
    }
  };
}

function renderEventContent(eventInfo: any) {
  const col = eventInfo.event.borderColor;
  const calendarIcon = {
    color: col,
  };
  return (
    <div className={`event-card type-${eventInfo.event.groupId}`}>
      {eventInfo.timeText !== '' &&
      eventInfo.event.groupId !== 'private' &&
      eventInfo.event.groupId !== 'exam' ? (
        <div className="event-title scheduled">
          <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
          <span className="ms-fontWeight-semibold">
            {eventInfo.event.title}
          </span>
          <br />
        </div>
      ) : (
        <div className="event-title no-sched">
          <span className="ms-fontWeight-semibold">
            {eventInfo.event.title}
          </span>
          <br />
        </div>
      )}
      <div className="event-details">
        <span className="event-time">{eventInfo.timeText}</span>
        <span className="event-loc">
          {eventInfo.timeText !== '' ? <FontIcon iconName="POI" /> : null}
          {eventInfo.event.extendedProps.location}
        </span>
      </div>
    </div>
  );
}

export default AdminDailySchedule;
