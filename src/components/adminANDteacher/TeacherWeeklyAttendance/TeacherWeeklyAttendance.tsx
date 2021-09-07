import React, { useState } from 'react';
import { SearchBox, DefaultButton } from 'office-ui-fabric-react';
import { DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import './TeacherWeeklyAttendance.scss';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import moment from 'moment';
import styles from './TeacherWeeklyAttendance.module.scss';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { FontIcon } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import CalendarViewMonth from '../../fluentui/Calendar/CalendarMonthView';
import TeacherAttendanceDetails from '../TeacherAttendanceDetails/TeacherAttendanceDetails';
import logger from 'loglevel';

import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { attributesToProps } from 'html-react-parser';

const type = require('../../../assets/ui-kit/_variables.scss');
let calendarButtonElement: any;

const classNames = mergeStyleSets({
  wrapper: {
    height: '72.5vh',
    backgroundColor: 'white',
  },
  root: {
    height: '65px',
    paddingTop: '0px',
    textAlign: 'center',
  },
  filter: {
    backgroundColor: 'white',
    paddingBottom: 20,
    maxWidth: 300,
  },
  header: {
    margin: 0,
    backgroundColor: 'white',
  },
  row: {
    display: 'inline-block',
    backgroundColor: 'white',
  },
  stickyAbove: {
    height: '70px',
    paddingTop: '1px',
  },
});

const onRenderDetailsHeader = (props: any, defaultRender: any) => {
  if (!props) {
    return null;
  }
  const onRenderColumnHeaderTooltip = (tooltipHostProps: any) => (
    <TooltipHost {...tooltipHostProps} />
  );
  return (
    <Sticky
      stickyPosition={StickyPositionType.Header}
      //styles={classNames.root}
      isScrollSynced>
      {defaultRender({
        ...props,
        onRenderColumnHeaderTooltip,
      })}
    </Sticky>
  );
};

type TeacherWeeklyAttendanceProps = {
  studentList: any[];
  monthlySchedule: any[];
  attendanceList: any[];
  handleAbsences: (
    checked: boolean | undefined,
    item: any,
    id: string,
    lessonId: string,
  ) => void;
  dataHasConfirm: boolean;
  selectedDate: (date: any) => void;
  searchChange: (ev: any) => void;
  shimmer: boolean;
  selectedSubject: string;
};

const TeacherWeeklyAttendance: React.FC<TeacherWeeklyAttendanceProps> =
  props => {
    const [showCalendar, { toggle: toggleShowCalendar }] = useBoolean(false);
    const [selectedDate, setSelectedDate] = useState<any>(new Date());
    //This is for callout params
    const [lessonId, setLessonId] = useState();
    const [timeSched, setTimeSched] = useState<string | null>(null);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState(null);
    const [isSubjectToggle, setIsSubjectToggle] = useState(false);
    const [targetEl, setTargetEl] = useState<string | null>(null);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [week, setWeek] = useState();
    const [isConfirmed, setIsConfirmed] = useState(null);

    const _column: any[] = [];

    const presentAttendance = {
      text: {
        fontSize: '12px',
      },
      pill: {
        height: '16px',
        width: '30px',
        fontSize: '12px',
      },
      thumb: {
        borderWidth: '4px !important',
        height: '8px',
        width: '8px',
      },
      root: {
        paddingTop: '1px !important',
      },
    };
    const futureAttendance = {
      text: {
        fontSize: '12px',
      },
      pill: {
        height: '16px',
        width: '30px',
        fontSize: '12px',
      },
      thumb: {
        borderWidth: '4px !important',
        height: '8px',
        width: '8px',
      },
      root: {
        paddingTop: '1px !important',
      },
    };

    const dpPerson = {
      root: {
        fontSize: '18px',
      },
      primaryText: {
        fontSize: '14px',
        fontWeight: '600',
      },
      secondaryText: {
        fontSize: '14px',
      },
    };

    const todos = [
      {
        name: 'Absence Registration',
        dueDate: 'Awaiting Teacher',
        index: 1,
        isScrolling: true,
        icon: 'ClipboardList',
      },
    ];

    if (props.studentList?.length > 0) {
      const row = {
        key: 0,
        name: 'Name',
        fieldName: 'NameWithSort',
        minWidth: 271,
        maxWidth: 293,
        isSorted: true,
        isSortedDescending: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        headerClassName: 'headerClassName',
        onRender: (item: any) => {
          return (
            <div className={styles.studentName}>
              <Persona
                text={item.idUser}
                size={PersonaSize.size32}
                secondaryText={item.course}
                styles={dpPerson}
              />
            </div>
          );
        },
      };
      _column.push(row);
    }

    const toggleOnChange = (
      checked: boolean | undefined,
      item: any,
      id: string,
      lessonId: string,
    ) => {
      props.handleAbsences(checked, item, id, lessonId);
    };

    const showRegistration = (item: any, idx: number) => {
      const id = item.id.split('/')[1];
      const subjectTile = item.class.split('/')[1];
      if (!isSubjectToggle) {
        const el = '#schedElem' + idx;
        const hasConfirmed =
          item.confirmed !== undefined &&
          moment(item.start).format('YYYY-MM-DD') <=
            moment(new Date()).format('YYYY-MM-DD')
            ? item.confirmed
            : false;
        const strTime = moment(item.start).format('h:mm');
        const endTime = moment(item.end).format('h:mm');
        setLessonId(id);
        setTimeSched(strTime + ' - ' + endTime);
        setSelectedScheduleDate(item.start);
        setLocation(item.location);
        setTitle(subjectTile);
        setIsSubjectToggle(!isSubjectToggle);
        setTargetEl(el);
        setStart(item.start);
        setEnd(item.end);
        setWeek(item.week);
        setIsConfirmed(hasConfirmed);
      }
    };

    function handleDetailsCalloutVisible() {
      setIsSubjectToggle(false);
    }

    function drawRowData(
      r: any,
      item: any,
      start: string,
      current: string,
      defCheck: boolean,
      attendanceId: string,
    ) {
      return (
        <>
          <div style={{ marginTop: '5px' }}>
            {start <= current ? (
              <Toggle
                defaultChecked={defCheck}
                key={attendanceId}
                role="checkbox"
                onText="Present"
                offText="Absent"
                onChange={(
                  ev: React.MouseEvent<HTMLElement, MouseEvent>,
                  checked?: boolean | undefined,
                ) => toggleOnChange(checked, item, r.id, attendanceId)}
                styles={presentAttendance}
                className="attendanceToggle"
              />
            ) : (
              <div>
                <Toggle
                  disabled
                  key={attendanceId}
                  offText="Unavailable"
                  styles={futureAttendance}
                />
              </div>
            )}
          </div>
        </>
      );
    }

    if (props.studentList?.length > 0) {
      props.monthlySchedule.forEach((r, index) => {
        const start = moment(r.start).format('YYYY-MM-DD');
        const current = moment(new Date()).format('YYYY-MM-DD');
        let label: any = null;
        const subject = r.class.split('/')[1];

        label = (
          <div
            className={styles.moduleName}
            onClick={() => showRegistration(r, index)}>
            <FontIcon iconName="ClipboardList" />
            {moment(r.start).format('YYYY-MM-DD') <=
              moment(new Date()).format('YYYY-MM-DD') &&
            r.confirmed === false ? (
              <span className="dot not-confirmed" />
            ) : (
              <span className="dot confirmed" />
            )}
            {subject}
          </div>
        );

        const row = {
          key: index + 1,
          name: (
            <div className={styles.cellHeader} id={'schedElem' + index}>
              {moment(r.start).format('MMM DD')} <br /> {label}
            </div>
          ),
          fieldName: '',
          minWidth: 145,
          maxWidth: 145,
          onRender: (item: any) => {
            let defCheck = true;
            let attendanceId: any = null;
            const data = props.attendanceList;
            data.forEach((a: any) => {
              if (a.idStudent === item.id && r.id === a.idLesson) {
                defCheck = false;
                attendanceId = a.id;
              }
            });
            return drawRowData(r, item, start, current, defCheck, attendanceId);
          },
        };
        _column.push(row);
      });
    }

    const onSelectDate = (date: Date) => {
      if (props.dataHasConfirm) {
        toggleShowCalendar();
        setSelectedDate(date);
        props.selectedDate(new Date(date));
      } else {
        toggleShowCalendar();
        props.selectedDate(selectedDate);
      }
    };

    const previousMonth = () => {
      if (props.dataHasConfirm) {
        const month = moment(selectedDate).subtract(7, 'day');
        setSelectedDate(month);
        props.selectedDate(month);
      } else {
        props.selectedDate(selectedDate);
      }
    };
    const presentMonth = () => {
      if (props.dataHasConfirm) {
        const month = moment(selectedDate).add(7, 'day');
        setSelectedDate(month);
        props.selectedDate(month);
      } else {
        props.selectedDate(selectedDate);
      }
    };

    return (
      <>
        <div>
          <TeacherAttendanceDetails
            id={lessonId}
            title={title}
            timeSched={timeSched}
            location={location}
            isSubjectToggle={isSubjectToggle}
            targetEl={targetEl}
            todos={todos}
            selectedDate={selectedScheduleDate}
            hasConfirmed={isConfirmed}
            handleDetailsCalloutVisible={handleDetailsCalloutVisible}
            start={start}
            end={end}
            week={week}
          />
        </div>
        <div
          className={'contentData ' + classNames.wrapper}
          style={{ position: 'relative', height: '100% !important' }}>
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.always}>
            <Sticky>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12 ">
                  <div
                    className={'ms-Grid-col ms-lg2 ' + styles.searchContainer}>
                    <SearchBox
                      placeholder="Search"
                      onChange={ev => props.searchChange(ev)}
                      className={'underlinedSearch ' + styles.search}
                      onSearch={newValue => logger.log('value is ' + newValue)}
                    />
                  </div>
                  {props.shimmer ? (
                    <div
                      className={
                        'ms-Grid-col ms-lg10 ' + styles.calendarContainer
                      }>
                      <div className={styles.iconLRDisabled}>
                        <FontIcon iconName="Back" />
                      </div>
                      <div className={styles.iconLRDisabled}>
                        <FontIcon iconName="Forward" />
                      </div>

                      <div
                        ref={calendarBtn =>
                          (calendarButtonElement = calendarBtn)
                        }>
                        <DefaultButton
                          className={styles.defaultBorder + 'btnDisabled'}
                          disabled={true}>
                          <div
                            className={
                              showCalendar
                                ? styles.calendarclick
                                : styles.calendar
                            }>
                            <div className={'padR15 ' + styles.iconDisabled}>
                              <FontIcon iconName="Calendar" />
                            </div>
                            <div
                              className="padR15"
                              style={{ color: '#c8c6c4' }}>
                              {moment(selectedDate).format('MMMM yyyy') +
                                ' (Week ' +
                                moment(selectedDate).week() +
                                ')'}
                            </div>
                            <div className={styles.iconDisabled}>
                              <FontIcon iconName="ChevronDown" />
                            </div>
                          </div>
                        </DefaultButton>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={
                        'ms-Grid-col ms-lg10 ' + styles.calendarContainer
                      }>
                      <div className={styles.iconLR} onClick={previousMonth}>
                        {' '}
                        <FontIcon iconName="Back" />
                      </div>
                      <div className={styles.iconLR} onClick={presentMonth}>
                        {' '}
                        <FontIcon iconName="Forward" />
                      </div>

                      <div
                        ref={calendarBtn =>
                          (calendarButtonElement = calendarBtn)
                        }>
                        <DefaultButton
                          className={styles.defaultBorder}
                          onClick={toggleShowCalendar}>
                          <div
                            className={
                              showCalendar
                                ? styles.calendarclick
                                : styles.calendar
                            }>
                            <div className={'padR15 ' + styles.icon}>
                              {' '}
                              <FontIcon iconName="Calendar" />
                            </div>
                            <div
                              className="padR15"
                              style={{ color: type.classScheduleBorder }}>
                              {moment(selectedDate).format('MMMM yyyy') +
                                ' (Week ' +
                                moment(selectedDate).week() +
                                ')'}
                            </div>
                            <div className={styles.icon}>
                              <FontIcon iconName="ChevronDown" />
                            </div>
                          </div>
                        </DefaultButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showCalendar && (
                <Callout
                  isBeakVisible={false}
                  className="ms-DatePicker-callout"
                  gapSpace={0}
                  doNotLayer={false}
                  target={calendarButtonElement}
                  directionalHint={DirectionalHint.bottomLeftEdge}
                  onDismiss={toggleShowCalendar}
                  setInitialFocus>
                  <FocusTrapZone
                    firstFocusableSelector="ms-DatePicker-day--today"
                    isClickableOutsideFocusTrap>
                    {
                      <CalendarViewMonth
                        toggleShowCalendar={toggleShowCalendar}
                        onSelectDate={onSelectDate}
                        selectedDate={new Date(selectedDate)}
                      />
                    }
                  </FocusTrapZone>
                </Callout>
              )}
            </Sticky>

            {props.studentList?.length > 0 ? (
              <div className="monthlyAttendance">
                <ShimmeredDetailsList
                  items={props.studentList || []}
                  layoutMode={DetailsListLayoutMode.fixedColumns}
                  columns={_column}
                  onRenderDetailsHeader={onRenderDetailsHeader}
                  checkboxVisibility={2}
                  enableShimmer={props.shimmer}
                />{' '}
              </div>
            ) : (
              <div className={styles.noData}>No data found.</div>
            )}
          </ScrollablePane>
        </div>
      </>
    );
  };
export default TeacherWeeklyAttendance;
