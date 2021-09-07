import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { FontIcon } from 'office-ui-fabric-react';
import CalendarCallout from '../CalendarCallout/CalendarCallout';
import SubjectDetail from '../SubjectDetail/SubjectDetail';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import word from '../../../assets/images/office/word.png';
import book from '../../../assets/images/office/book.png';
import i18n from '../../../i18n/i18n';
import { getWeekRange } from '../../../util/commonFunction';
import styles from './DashboardDailyScheduleCallout.module.scss';
import './DashboardDailySchedule.scss';
import { INITIAL_COLORS } from '../../../util/calendar/eventColor';
import CalendarAgendaView from '../CalendarAgendaView/CalendarAgendaView';
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
const statusColorIcon = [
  {
    status: 1,
    icon: 'SkypeCircleCheck',
    color: '#6c35d4',
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
];

type Events =
  | {
      id: string;
      title: string;
      start: string;
      status: number;
      groupId: string;
      end?: string | undefined;
      location?: string | undefined;
    }[]
  | undefined;

type DailyScheduleProps = {
  itemList: Events;
  subject: string | null;
  isAgendaView: boolean;
};

type DailyScheduleState = {
  events: Events | undefined;
  id: string;
  timeSched: string;
  title: string;
  location: string;
  isSubjectToggle: boolean;
  targetEl: any;
  todos: any[] | undefined;
  currentDate: Date;
  selectedDate: string;
  calCallout: string;
};

class DashboardDailySchedule extends Component<DailyScheduleProps> {
  state: DailyScheduleState = {
    events: this.props.itemList,
    id: '',
    timeSched: '',
    title: '',
    location: '',
    isSubjectToggle: false,
    targetEl: null,
    todos: todos,
    currentDate: new Date(),
    selectedDate: '',
    calCallout: '',
  };
  private calendarRef = React.createRef<FullCalendar>();

  handleSelectedDateClick = (item: Date) => {
    let a = moment(item);
    this.setState({ currentDate: a });
    if (!this.props.isAgendaView) {
      let calendarApi = this.calendarRef.current?.getApi();
      return calendarApi?.gotoDate(moment(a).format('YYYY-MM-DD'));
    }
  };

  previousDay = (item: Date) => {
    let a = moment(item).subtract(1, 'day');
    this.setState({ currentDate: a });
    if (!this.props.isAgendaView) {
      let calendarApi = this.calendarRef.current?.getApi();
      return calendarApi?.gotoDate(moment(a).format('YYYY-MM-DD'));
    }
  };

  nextDay = (item: Date) => {
    let a = moment(item).add(1, 'day');
    this.setState({ currentDate: a });
    if (!this.props.isAgendaView) {
      let calendarApi = this.calendarRef.current?.getApi();
      return calendarApi?.gotoDate(moment(a).format('YYYY-MM-DD'));
    }
  };

  handleDetailsCalloutVisible = () => {
    this.setState({ isSubjectToggle: false });
  };

  toggleSubjectDetails = (
    targetEl: any,
    id: string,
    start: string,
    end: string,
    title: string,
    location: string,
  ) => {
    const strTime = moment(start).format('h:mm');
    const endTime = moment(end).format('h:mm');
    this.setState({
      id: id,
      timeSched: strTime + ' - ' + endTime,
      title: title,
      location: location,
      isSubjectToggle: !this.state.isSubjectToggle,
      targetEl: targetEl,
      todos: todos,
    });
  };

  feedColors = () => {
    let events = this.state.events;
    let color = INITIAL_COLORS.colors;

    let filteredEvent = [];

    if (events && events.length > 0) {
      for (let i = 0; i < color.length; i++) {
        for (let x = 0; x < events.length; x++) {
          if (events[x].groupId === color[i].groupId) {
            let status: number = events[x].status;
            let a = statusColorIcon.filter(b => b.status == status)[0];
            let colArray = Object.assign({}, x, {
              display: color[i].display,
              color: color[i].color,
              borderColor: color[i].borderColor,
              icon: a.icon,
              iconColor: a.color,
            });
            filteredEvent.push(Object.assign(events[x], colArray));
          }
        }
      }
    }
    return filteredEvent;
  };

  render() {
    let completedEvents: any[] = [];

    if (this.props.subject) {
      let items = this.feedColors();
      items.forEach((a: any) => {
        if (a.title === this.props.subject) {
          completedEvents.push(a);
        }
      });
    } else {
      completedEvents = this.feedColors();
    }

    let week = getWeekRange(this.state.currentDate);

    const firstWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const secondWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).add(1, 'day').format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const thirdWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).add(2, 'day').format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const fourthWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).add(3, 'day').format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const fifthWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).add(4, 'day').format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const sixthWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.from).add(5, 'day').format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const seventhWeekDay = completedEvents
      .filter(
        a =>
          moment(a.start).format('YYYY-MM-DD') ===
          moment(week.to).format('YYYY-MM-DD'),
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    return (
      <div className="dailyCalendar">
        <div className="todayContainer">
          <div className="headerDate">
            <div className="dateCurrent">
              <div className="day">
                {moment(this.state.currentDate).format('DD')}
              </div>
              <div className="week">
                {moment(this.state.currentDate).format('dddd')}
              </div>
            </div>
            <div className="dateNav">
              <div
                className="iconLR"
                onClick={() => this.previousDay(this.state.currentDate)}>
                {' '}
                <FontIcon iconName="ChevronLeft" />
              </div>
              <div
                className="iconLR"
                onClick={() => this.nextDay(this.state.currentDate)}>
                {' '}
                <FontIcon iconName="ChevronRight" />
              </div>
            </div>
            <div className="dateMonth">
              <div className="month">
                <CalendarCallout
                  handleSelectDate={this.handleSelectedDateClick}
                  dateToday={this.state.currentDate}
                  showMonth={false}
                  miniCalendar={true}
                />
              </div>
            </div>
          </div>
        </div>
        <SubjectDetail
          id={this.state.id}
          title={this.state.title}
          timeSched={this.state.timeSched}
          location={this.state.location}
          isSubjectToggle={this.state.isSubjectToggle}
          targetEl={this.state.targetEl}
          todos={this.state.todos}
          selectedDate={this.state.selectedDate}
          handleDetailsCalloutVisible={this.handleDetailsCalloutVisible}
        />
        {!this.props.isAgendaView ? (
          <div className="dailySchedule">
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
              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: true,
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
              ref={this.calendarRef}
            />
          </div>
        ) : (
          <Fragment>
            <div className="ms-Grid-col ms-lg12 studentWeekList weekList">
              {/* 1st day of the Week */}
              {moment(week.from).format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 todaySched">
                    {moment(week.from).format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>{moment(week.from).format('ddd,')}</span>&nbsp;
                    <span>{moment(week.from).format('MMM DD')}</span>
                  </div>
                  {firstWeekDay?.length > 0 ? (
                    firstWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 2nd day of the Week */}
              {moment(week.from).add(1, 'day').format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.from).add(1, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).add(1, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>
                      {moment(week.from).add(1, 'day').format('ddd,')}
                    </span>
                    &nbsp;
                    <span>
                      {moment(week.from).add(1, 'day').format('MMM DD')}
                    </span>
                  </div>
                  {secondWeekDay?.length > 0 ? (
                    secondWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 3rd day of the Week */}
              {moment(week.from).add(2, 'day').format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.from).add(2, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).add(2, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>
                      {moment(week.from).add(2, 'day').format('ddd,')}
                    </span>
                    &nbsp;
                    <span>
                      {moment(week.from).add(2, 'day').format('MMM DD')}
                    </span>
                  </div>
                  {thirdWeekDay?.length > 0 ? (
                    thirdWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 4th day of the Week */}
              {moment(week.from).add(3, 'day').format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.from).add(3, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).add(3, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>
                      {moment(week.from).add(3, 'day').format('ddd,')}
                    </span>
                    &nbsp;
                    <span>
                      {moment(week.from).add(3, 'day').format('MMM DD')}
                    </span>
                  </div>
                  {fourthWeekDay?.length > 0 ? (
                    fourthWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 5th day of the Week */}
              {moment(week.from).add(4, 'day').format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.from).add(4, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).add(4, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>
                      {moment(week.from).add(4, 'day').format('ddd,')}
                    </span>
                    &nbsp;
                    <span>
                      {moment(week.from).add(4, 'day').format('MMM DD')}
                    </span>
                  </div>
                  {fifthWeekDay?.length > 0 ? (
                    fifthWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 6th day of the Week */}
              {moment(week.from).add(5, 'day').format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.from).add(5, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.from).add(5, 'day').format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>
                      {moment(week.from).add(5, 'day').format('ddd,')}
                    </span>
                    &nbsp;
                    <span>
                      {moment(week.from).add(5, 'day').format('MMM DD')}
                    </span>
                  </div>
                  {sixthWeekDay?.length > 0 ? (
                    sixthWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}

              {/* 7th day of the Week */}
              {moment(week.to).format('YYYY-MM-DD') >=
                moment(this.state.currentDate).format('YYYY-MM-DD') && (
                <div>
                  <div className="ms-Grid-col ms-lg12 tomorrowSched">
                    {moment(week.to).format('YYYY-MM-DD') ===
                      moment(new Date()).format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.today)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    {moment(week.to).format('YYYY-MM-DD') ===
                      moment(new Date()).add(1, 'day').format('YYYY-MM-DD') && (
                      <>
                        <span>{intl(LabelNames.tomorrow)}</span>
                        <FontIcon
                          iconName="LocationDot"
                          className="locationDot"
                        />
                      </>
                    )}
                    <span>{moment(week.to).format('ddd,')}</span>&nbsp;
                    <span>{moment(week.to).format('MMM DD')}</span>
                  </div>
                  {seventhWeekDay?.length > 0 ? (
                    seventhWeekDay.map((value, i) => {
                      return (
                        <CalendarAgendaView
                          key={i}
                          item={value}
                          toggleSubjectDetails={this.toggleSubjectDetails}
                        />
                      );
                    })
                  ) : (
                    <div className={styles.noEvent}>No events scheduled</div>
                  )}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }

  handleEventClick = (clickInfo: any) => {
    const strTime = moment(clickInfo.event.start).format('h:mm');
    const endTime = moment(clickInfo.event.end).format('h:mm');
    if (strTime !== endTime) {
      this.setState({
        id: clickInfo.event.id,
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
  let col = eventInfo.event.borderColor;
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

export default DashboardDailySchedule;
