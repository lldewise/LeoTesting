export const classesByschool = (dispatch, data) => {
  var filterData = data.filter(a => a[0] === 'entity/data');
  console.log(filterData);
  dispatch('SETCLASSBYSCHOOL', filterData);
};

export const subjectListBySchool = (dispatch, data) => {
  var filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('SETADMINSUBJECTLISTS', filterData);
}

export const classesListBySubject = (dispatch, data) => {
  var filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('SETADMINCLASSESLISTS', filterData);
}