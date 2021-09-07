export const updateLessonsByStaff = (dispatch, data) => {
  dispatch('TEACHERLESSONSBYSTAFF', data);
};

export const updateLessonsByStaffPerWeek = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('TEACHERLESSONSBYSTAFFPERWEEK', filterData);
};

export const updateStudentsByClass = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('TEACHERSTUDENTSBYCLASS', filterData);
  dispatch('SETSTUDENTBYCLASS', filterData);
};

export const updateLessonsByIdPerWeek = (dispatch, data) => {
  dispatch('TEACHERLESSONBYID', data);
};

export const updateAttendanceByLesson = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  if (filterData.length > 0) {
    dispatch('TEACHERATTENDANCEBYLESSON', filterData);
  }
};

export const updateLessonsByStaffIDSPerWeek = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'lessons/by-staff')[0];
  dispatch('TEACHERLESSONBYSTAFFIDS', filterData);
};

export const setSelectedAccount = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('SELECTEDUSERACCOUNT', filterData);
};

export const setSelectedUserGuardians = (dispatch, data) => {
  dispatch('SELECTEDGUARDIANBYUSER', data);
};

export const updateLessonDetails = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('LESSONDETAILS', filterData);
};

export const updateAttendanceList = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('UPDATEATTENDANCELIST', filterData);
};

export const deleteTeacherAttendanceWeekly = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/deleted');
  dispatch('DELETETEACHERATTENDANCEBYLESSON', filterData);
};

export const updateStudentBySchoolIds = (dispatch, data) => {  
  const filterData = data.filter(a => a[0] === 'entity/data');
  //dispatch('STUDENTSBYSCHOOLBYIDS', filterData);
  dispatch('STUDENTSBYSCHOOLLIST', filterData);
};

export const updateStudentBySchoolDetails = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('STUDENTSBYSCHOOLLIST', filterData);
};

export const updateStaffBySchool = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('STAFFBYSCHOOLLIST', filterData);
};
