import React, { useState, Fragment } from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Calendar, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { useBoolean } from '@uifabric/react-hooks';
import styles from './CalendarCallout.module.scss';
import moment from 'moment';

const DayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

type CalendarProps = {
  handleSelectDate: (date: Date) => void,
  dateToday: Date,
  showMonth: boolean,
  miniCalendar: boolean,
};

const CalendarCalloutTS: React.FC<CalendarProps> = props => {
  const [showCalendar, { toggle: toggleShowCalendar }] = useBoolean(false);
  const [selectedDate, setSelectedDate] = useState(props.dateToday);

  const onSelectDate = (date: Date) => {
    toggleShowCalendar();
    setSelectedDate(date);
    props.handleSelectDate(date);
  };

  return (
    <>
      <div>
        <ActionButton
          className={
            'btnPlain btnPrimary btnIconRight ' + styles.btnCalendarCallout
          }
          id="calendarButtonElement"
          onClick={toggleShowCalendar}
          iconProps={
            props.miniCalendar
              ? { iconName: 'Calendar' }
              : { iconName: 'ChevronDown' }
          }
          text={
            props.miniCalendar
              ? moment(props.dateToday).format('MMMM YYYY')
              : moment(props.dateToday).format('MMMM DD, YYYY')
          }
        />
      </div>
      {showCalendar && (
        <Callout
          isBeakVisible={false}
          className="ms-DatePicker-callout"
          gapSpace={0}
          doNotLayer={false}
          target={'#calendarButtonElement'}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={toggleShowCalendar}
          setInitialFocus>
          <FocusTrapZone
            firstFocusableSelector="ms-DatePicker-day--today"
            isClickableOutsideFocusTrap>
            <Calendar
              onSelectDate={onSelectDate}
              onDismiss={toggleShowCalendar}
              isMonthPickerVisible={props.showMonth}
              value={selectedDate}
              firstDayOfWeek={DayOfWeek.Monday}
              strings={DayPickerStrings}
              isDayPickerVisible={true}
              highlightCurrentMonth={true}
              highlightSelectedMonth={true}
              showMonthPickerAsOverlay={false}
              showGoToToday={false}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </>
  );
};

export default CalendarCalloutTS;
