import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_COLORS } from '../../../../util/calendar/eventColor';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import moment from 'moment';
import allLocales from '@fullcalendar/core/locales-all';
import 'moment/locale/da';
import i18n from '../../../../i18n/i18n';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import { Fragment } from 'react';
import ScheduleWeekList from '../../ScheduleWeekList/ScheduleWeekList';
import { Callout, IconButton, ActionButton } from 'office-ui-fabric-react';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from '@fluentui/react/lib/Shimmer';
import AdminDailySchedule from '../../AdminDailySchedule/AdminDailySchedule';
import { DirectionalHint } from '@fluentui/react';
import styles from './AdminDashboardCallout.module.scss';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import AdminSubjectDetails from '../AdminSubjectDetails/AdminSubjectDetails';

const lang = i18n.language.split('_');
moment.locale(lang[0]);

const color = INITIAL_COLORS.colors;
const wrapperStyles = {
  display: 'flex',
  marginBottom: '5px',
};
const iconStyles = { marginLeft: '5px', color: '#000' };
const options = [
  { key: 'agenda', text: intl(LabelNames.agenda) },
  { key: 'day', text: intl(LabelNames.dayView) },
];

type Events = {
  borderColor?: string;
  color?: string;
  display?: string;
  end?: string;
  groupId: string;
  id: string;
  location?: string;
  people: any[];
  remindedTime: any;
  repeat: any;
  start: string;
  title: string;
}[];

type AdminCalendarProps = {
  itemList: Events;
};

type AdminCalendarState = {
  currentDate: Date;
  isAgendaView: boolean;
  isFilterView: boolean;
  isToggleAgendaView: boolean;
  events: Events | undefined;
  calendarApi: any;
  isSubjectToggle: boolean;
  id: string | null;
  timeSched: string | null;
  title: string | null;
  location: string | null;
  targetEl: any;
  todos: any[];
  selectedDate: Date | null;
  lessonPerWeekLoad: boolean;
  week: number | null;
  end: string | null;
  start: string | null;
  confirmed: boolean;
};

type Options =
  | {
      key: string;
      text: string;
    }
  | undefined;

class AdminDashboardCalendar extends Component<AdminCalendarProps> {
  private calendarRef = React.createRef<FullCalendar>();
  private subjectSelectedRef = React.createRef<any>();

  state: AdminCalendarState = {
    currentDate: new Date(),
    isAgendaView: true,
    isFilterView: false,
    isToggleAgendaView: false,
    events: this.props.itemList,
    calendarApi: null,
    isSubjectToggle: false,
    id: null,
    timeSched: null,
    title: null,
    location: null,
    targetEl: null,
    todos: [],
    selectedDate: null,
    lessonPerWeekLoad: false,
    week: null,
    end: null,
    start: null,
    confirmed: false,
  };

  toggleAbsenceReg = (
    target: any,
    start: string,
    end: string,
    title: string,
    location: string,
    todos: any[],
  ) => {
    const strTime = moment(start).format('h:mm');
    const endTime = moment(end).format('h:mm');
    if (strTime !== endTime) {
      this.setState({
        timeSched: strTime + ' - ' + endTime,
        title: title,
        location: location,
        isSubjectToggle: !this.state.isSubjectToggle,
        targetEl: target,
        todos: todos,
        selectedDate: moment(start).format('YYYY-MM-DD'),
      });
    }
  };

  handleDetailsCalloutVisible = () => {
    this.setState({ isSubjectToggle: false });
  };

  handleAgendaCalloutVisible = () => {
    this.setState({
      isToggleAgendaView: false,
    });
  };

  onRenderOption = (option: Options) => {
    const a = this.state.isAgendaView && option?.key === 'agenda';
    const b = !this.state.isAgendaView && option?.key === 'day';
    let wrapper: any = '';
    if (a || b) {
      wrapper = <FontIcon iconName="Accept" className={styles.selectedView} />;
    }

    return (
      <div className={styles.listStyle} style={{ display: 'flex' }}>
        <>
          <div style={{ width: '20px' }} id={option?.key}>
            {wrapper}
          </div>
          <div style={iconStyles} id={option?.key}>
            {option?.text}
          </div>
        </>
      </div>
    );
  };

  navigatePrevious = () => {
    setTimeout(() => {
      this.setState({ calendarApi: this.calendarRef.current?.getApi() });
    });

    const current = moment(this.state.currentDate)
      .subtract(7, 'day')
      .format('YYYY-MM-DD');
    this.setState({ currentDate: current });
    setTimeout(() => {
      this.state.calendarApi.gotoDate(current);
    });
  };

  navigateNext = () => {
    setTimeout(() => {
      this.setState({ calendarApi: this.calendarRef.current?.getApi() });
    });

    const current = moment(this.state.currentDate)
      .add(7, 'day')
      .format('YYYY-MM-DD');
    this.setState({ currentDate: current });
    setTimeout(() => {
      this.state.calendarApi.gotoDate(current);
    });
  };

  toggleCalendar = () => {
    const a = this.state.calendarApi;
    if (a == null) {
      this.setState({ calendarApi: this.calendarRef.current?.getApi() });
    }
    this.setState({ isFilterView: !this.state.isFilterView });
  };

  toggleAgendaView = () => {
    this.setState({ isToggleAgendaView: !this.state.isToggleAgendaView });
  };

  dateClickEvent = (env: any) => {
    const selectedDate = moment(env.date).format('YYYY-MM-DD');
    this.setState({ currentDate: new Date(selectedDate) });
    if (!this.state.isAgendaView) {
      const a = this.state.calendarApi;
      if (a == null) {
        setTimeout(() => {
          this.setState({ calendarApi: this.calendarRef.current?.getApi() });
        }, 1000);
      } else {
        this.state.calendarApi.gotoDate(selectedDate);
      }
    }
  };

  onChangeScheduleRender = (item: any) => {
    if (item.target.id === 'agenda') {
      this.setState({ isAgendaView: true });
    } else {
      this.setState({ isAgendaView: false });
    }
    this.setState({ isToggleAgendaView: !this.state.isToggleAgendaView });
  };

  feedColors = () => {
    let colArray = [];
    let events = this.state.events;
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

  getWeekRange = (date: Date) => {
    return {
      from: moment(date).startOf('week').toDate(),
      to: moment(date).endOf('week').toDate(),
    };
  };

  handleTodayClick = () => {
    const selectedDate = moment(new Date()).format('YYYY-MM-DD');
    this.setState({ currentDate: new Date(selectedDate) });
    const a = this.state.calendarApi;
    if (a == null) {
      setTimeout(() => {
        this.setState({ calendarApi: this.calendarRef.current?.getApi() });
      }, 1000);
    } else {
      this.state.calendarApi.gotoDate(selectedDate);
    }
  };

  render() {
    const completedEvents = this.feedColors();
    const week = this.getWeekRange(this.state.currentDate);

    const firstWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).format('YYYY-MM-DD'),
    );
    const secondWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).add(1, 'day').format('YYYY-MM-DD'),
    );
    const thirdWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).add(2, 'day').format('YYYY-MM-DD'),
    );
    const fourthWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).add(3, 'day').format('YYYY-MM-DD'),
    );
    const fifthWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).add(4, 'day').format('YYYY-MM-DD'),
    );
    const sixthWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.from).add(5, 'day').format('YYYY-MM-DD'),
    );
    const seventhWeekDay = completedEvents.filter(
      a =>
        moment(a.start).format('YYYY-MM-DD') ===
        moment(week.to).format('YYYY-MM-DD'),
    );

    const currentMonth = moment(this.state.currentDate).format('MMMM');

    return (
      <>
        <div className="adminDashboardCalendar dashboardCalendar">
          <div className="ms-Grid-col ms-lg12 adminFilterDateContainer filterDateContainer">
            <div className="ms-Grid-col ms-lg6 monthDisplay">
              <ActionButton
                text={currentMonth}
                iconProps={{ iconName: 'ChevronDown' }}
                className="btnPlain btnIconRight btnDatePicker"
                onClick={this.toggleCalendar}
              />
            </div>
            <div className="ms-Grid-col ms-lg4">
              {moment(this.state.currentDate).format('MMM') !==
                moment(new Date()).format('MMM') && (
                <button
                  className={styles.btnCalendarToday}
                  onClick={this.handleTodayClick}>
                  <FontIcon
                    iconName="Calendar"
                    className={styles.todayCalendarIcon}
                  />
                  {intl(LabelNames.today)}
                </button>
              )}
            </div>
            <div className="ms-Grid-col ms-lg2">
              <IconButton
                iconProps={{ iconName: 'More' }}
                className="linkToggle"
                onClick={this.toggleAgendaView}
              />
              {this.state.isToggleAgendaView && (
                <Callout
                  className={styles.callout}
                  role="alertdialog"
                  gapSpace={0}
                  target={'.linkToggle'}
                  setInitialFocus
                  directionalHint={DirectionalHint.leftCenter}
                  directionalHintFixed={false}
                  onDismiss={this.handleAgendaCalloutVisible}>
                  <div>
                    <div className={'ms-Grid-row ' + styles.calloutContainer}>
                      <div className={styles.title}>
                        {intl(LabelNames.switchViews)}
                      </div>
                      <FocusZone direction={FocusZoneDirection.horizontal}>
                        <div data-is-scrollable>
                          <List
                            items={options}
                            onRenderCell={this.onRenderOption}
                            onClick={e => this.onChangeScheduleRender(e)}
                          />
                        </div>
                      </FocusZone>
                    </div>
                  </div>
                </Callout>
              )}
            </div>
          </div>
          {!this.state.isFilterView ? (
            <>
              <div className="ms-Grid-col ms-lg12 miniCalendarContainer">
                <IconButton
                  onClick={this.navigatePrevious}
                  className="prevBtnDiv"
                  iconProps={{ iconName: 'ChevronLeft' }}
                />
                <div className="adminCalendarContainer calendarContainer">
                  <FullCalendar
                    headerToolbar={{
                      left: '',
                      center: '',
                      right: '',
                    }}
                    dayHeaderContent={renderHeader}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={lang[0]}
                    locales={allLocales}
                    selectable={true}
                    unselectAuto={false}
                    //unselectCancel={false}
                    initialDate={this.state.currentDate}
                    dateIncrement={{ weeks: 1 }}
                    dateClick={this.dateClickEvent}
                    ref={this.calendarRef}
                  />
                </div>
                <IconButton
                  onClick={this.navigateNext}
                  className="nextBtnDiv"
                  iconProps={{ iconName: 'ChevronRight' }}
                />
              </div>
            </>
          ) : (
            <div className="ms-Grid-col ms-lg12 adminCalendarPickerContainer calendarPickerContainer">
              <FullCalendar
                headerToolbar={{
                  left: '',
                  center: '',
                  right: '',
                }}
                dayHeaderContent={renderHeader}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={lang[0]}
                locales={allLocales}
                selectable={true}
                unselectAuto={false}
                //unselectCancel={false}
                initialDate={this.state.currentDate}
                dateClick={this.dateClickEvent}
                ref={this.calendarRef}
              />
            </div>
          )}
          <hr className="calendarDivider" />
        </div>
        {this.state.isAgendaView ? (
          <>
            <div ref={this.subjectSelectedRef}>
              <AdminSubjectDetails
                id={this.state.id}
                title={this.state.title}
                timeSched={this.state.timeSched}
                location={this.state.location}
                isSubjectToggle={this.state.isSubjectToggle}
                targetEl={this.state.targetEl}
                todos={this.state.todos}
                selectedDate={this.state.selectedDate}
                week={this.state.week}
                start={this.state.start}
                end={this.state.end}
                confirmed={this.state.confirmed}
                handleDetailsCalloutVisible={this.handleDetailsCalloutVisible}
              />
            </div>
            {completedEvents.length > 0 ? (
              <div className="ms-Grid-col ms-lg12 adminWeekList weekList">
                {/* 1st day of the Week */}
                {moment(week.from).format('YYYY-MM-DD') >=
                  moment(this.state.currentDate).format('YYYY-MM-DD') && (
                  <div>
                    <div className="ms-Grid-col ms-lg12 todaySched">
                      {moment(week.from).format('YYYY-MM-DD') ===
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).add(1, 'day').format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).add(2, 'day').format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).add(3, 'day').format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).add(4, 'day').format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.from).add(5, 'day').format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
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
                        moment(this.state.currentDate).format('YYYY-MM-DD') && (
                        <>
                          <span>{intl(LabelNames.today)}</span>
                          <FontIcon
                            iconName="LocationDot"
                            className="locationDot"
                          />
                        </>
                      )}
                      {moment(week.to).format('YYYY-MM-DD') ===
                        moment(this.state.currentDate)
                          .add(1, 'day')
                          .format('YYYY-MM-DD') && (
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
                          <ScheduleWeekList
                            key={i}
                            item={value}
                            toggleAbsence={this.toggleAbsenceReg}
                          />
                        );
                      })
                    ) : (
                      <div className={styles.noEvent}>No events scheduled</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginLeft: '10px' }}>
                {Array.from(Array(7)).map((a, key) => (
                  <Shimmer
                    key={key}
                    customElementsGroup={getCustomElements()}
                    width="100%"
                    style={{ marginBottom: '10px' }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <AdminDailySchedule />
        )}
      </>
    );
  }
}

function renderHeader(evt: any) {
  const data = evt.text.split(' ');
  return (
    <>
      <span style={{ fontSize: '14px' }}>
        {data[0].toString().substring(0, 2)}
      </span>
    </>
  );
}

const getCustomElements = () => {
  return (
    <div style={wrapperStyles}>
      <ShimmerElementsGroup
        width={'15px'}
        // marginTop={'5px'}
        shimmerElements={[
          { type: ShimmerElementType.line, height: 70, width: 15 },
          { type: ShimmerElementType.gap, width: 10, height: 70 },
        ]}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          height: '60px',
        }}>
        <ShimmerElementsGroup
          flexWrap
          width={'100%'}
          style={{ marginTop: '5px' }}
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 8,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 8,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 8,
              verticalAlign: 'bottom',
            },
            { type: ShimmerElementType.gap, width: '99%', height: 20 },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminDashboardCalendar;
