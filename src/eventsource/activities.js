export const activitiesBySchool = (dispatch, data) => {
  dispatch('SETACTIVITYLIST', data);
};
export const activityAttendance = (dispatch, data) => {
  var filterData = data.filter(a => a[0] === 'entity/data');
  console.log(filterData);
  dispatch('SETACTIVITYATTENDANCE', filterData);
};
