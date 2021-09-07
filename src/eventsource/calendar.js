export const updateCalendarLessonList = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('TEACHEREVENTADDCALENDAR', filterData);
};
