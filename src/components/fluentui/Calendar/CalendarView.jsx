import React, { useState, Fragment } from 'react';
import { Calendar, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
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
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

export const CalendarView = props => {
  return (
    <>
      <Calendar
        onSelectDate={props.onSelectDate}
        onDismiss={props.toggleShowCalendar}
        value={props.value}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={DayPickerStrings}
      />
    </>
  );
};

export default CalendarView;
