export const resourcesBySchool = (dispatch, data) => {
  var filterData = data.filter(a => a[0] === 'entity/data');
  console.log(filterData);
  dispatch('SETRESOURCESBYSCHOOL', filterData);
};
