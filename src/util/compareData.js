export const CheckExist = (id, currentData) => {
  const index = currentData.findIndex(r => r.id === id);
  return index;
};

export const CheckUserIfExist = (studentId, currentData) => {
  const index = currentData.findIndex(r => r.studentId === studentId);
  return index;
};
export const checkIfAttendanceExist = (attendanceId, currentData) => {
  const index = currentData.findIndex(r => r.attendanceId === attendanceId);
  return index;
};

export const LessonIsConfirmed = (id, data) => {
  const idx = data.findIndex(r => r.id === id && r.confirmed === true);
  if (idx !== -1) {
    return true;
  } else {
    return false;
  }
};
