import React, { Fragment } from 'react';
import { Calendar, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';

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

// const workWeekDays = [
//   DayOfWeek.Tuesday,
//   DayOfWeek.Saturday,
//   DayOfWeek.Wednesday,
//   DayOfWeek.Friday,
// ];

export const CalendarMonthView = props => {
  return (
    <>
      <div className="CalendarMonth">
        <Calendar
          onSelectDate={props.onSelectDate}
          onDismiss={props.toggleShowCalendar}
          isDayPickerVisible={true}
          isMonthPickerVisible={true}
          firstDayOfWeek={DayOfWeek.Monday}
          strings={DayPickerStrings}
          highlightCurrentMonth={true}
          highlightSelectedMonth
          showGoToToday={false}
          value={props.selectedDate}
        />
      </div>
    </>
  );
};

export default CalendarMonthView;
