import React, { useState, Fragment } from 'react';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react';
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

export const Calendar = props => {
  // eslint-disable-next-line
  const [evetDate, setDateEvent] = useState(new Date());
  // eslint-disable-next-line
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  // eslint-disable-next-line
  const formatSelectedDate = (data) => {
    const dateSelected = moment(data).format('MM/DD/YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  // eslint-disable-next-line
  const handleSelectedDate = (data) => {
    setDateEvent(data);
  };

  return (
    <>
      {/* <DatePicker                               
        strings={DayPickerStrings}
        value={evetDate}        
        onSelectDate={handleSelectedDate}                                
        styles={controlClass.control}
      /> */}

      <DatePicker
        //className={controlClass.control}
        formatDate={props.formatSelectedDate}
        onSelectDate={props.onSelectDate}
        strings={DayPickerStrings}
        placeholder={props.placeholder}
        ariaLabel="Select a date"
        value={props.value}
        styles={props.styles}
        views={['year']}
        textField={{ errorMessage: props.errorMessage }}
      />
    </>
  );
};

export default Calendar;
