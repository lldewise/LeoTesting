export type ClassesState = {
  classesInfo: ClassInfo;
  mediaList: Media[];
  classesassignmentlist: ClassAssignment[];
  classeshomeworklist: ClassAssignment[];
  scheduleInfo: any[];
};
export type ClassInfo = {
  bolSelected: boolean;
  confirmed: boolean;
  end: any;
  selectedClass: string;
  selectedDate: Date | string;
  selectedDay: any;
  selectedLate: any;
  selectedLesson: any;
  selectedLocation: any;
  selectedTab: string;
  selectedTime: any;
  start: any;
  week: any;
  selectedLessonId?: any;
};
