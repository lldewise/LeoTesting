import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import classes from './Classes.module.scss';
import {
  FontIcon,
  ActionButton,
  IBreadcrumbItem,
} from 'office-ui-fabric-react';
import { useStore } from '../../store/store';
import Todos from './Todos/Todos';
import TodosDetails from './ClassesDetails/TodosDetails/TodosDetails';
import TeachersNotes from './TeachersNotes/TeachersNotes';
import TeachersNotesDetails from './ClassesDetails/TeacherNotesDetails/TeachersNotesDetails';
import Media from './Media/Media';
import MediaDetails from './ClassesDetails/MediaDetails/MediaDetails';
import Grades from './Grades/Grades';
import Quizzes from './Quizzes/Quizzes';
import QuizzesDetails from './ClassesDetails/QuizzesDetails/QuizzesDetails';
import MyNotes from '../../components/mynotes/MyNotes';
import MyNotesDetails from './ClassesDetails/MyNotesDetails/MyNotesDetails';
import moment from 'moment';
import { LabelNames } from '../../util/constant';
import { intl } from '../../util/commonFunction';
import AttendanceDetails from './ClassesDetails/AttendanceDetails/AttendanceDetails';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

import { hasRole } from '../../util/commonFunction';
import StudentRightLayout from '../../components/layout/RightLayout';
import TeacherRightLayout from '../../components/layout/TeacherRightLayout';
import AdminRightLayout from '../../components/layout/AdminRightLayout';
import { Roles } from '../../util/constant';

const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
    },
  ],
  linkIsSelected: {
    selectors: {
      ':before': {
        height: '3px',
        backgroundColor: '#6c35d4',
      },
    },
  },
  text: {
    fontSize: '14px',
    fontFamily: 'Segoe UI',
  },
};

const linkItem = [
  {
    id: 1,
    name: intl(LabelNames.toDo),
    classname: classes.aLinkactive,
    icon: 'WaitlistConfirm',
    count: 3,
  },
  {
    id: 2,
    name: intl(LabelNames.teachersNote),
    classname: classes.aLink,
    icon: 'Comment',
  },
  {
    id: 3,
    name: intl(LabelNames.myNotes),
    classname: classes.aLink,
    icon: 'QuickNote',
  },
  {
    id: 4,
    name: intl(LabelNames.media),
    classname: classes.aLink,
    icon: 'Media',
  },

  {
    id: 6,
    name: intl(LabelNames.quizzes),
    classname: classes.aLink,
    icon: 'Design',
  },
  {
    id: 7,
    name: intl(LabelNames.grades),
    classname: classes.aLink,
    icon: 'LineChart',
  },
];

const linkDetailsItem = [
  {
    id: 1,
    name: intl(LabelNames.toDo),
    classname: classes.aLinkactive,
    icon: 'WaitlistConfirm',
    count: 3,
  },
  {
    id: 2,
    name: intl(LabelNames.teachersNote),
    classname: classes.aLink,
    icon: 'Comment',
  },
  {
    id: 3,
    name: intl(LabelNames.myNotes),
    classname: classes.aLink,
    icon: 'QuickNote',
  },
  {
    id: 4,
    name: intl(LabelNames.media),
    classname: classes.aLink,
    icon: 'Media',
  },
  {
    id: 5,
    name: intl(LabelNames.attendance),
    classname: classes.aLink,
    icon: 'ClipboardList',
  },
  {
    id: 6,
    name: intl(LabelNames.quizzes),
    classname: classes.aLink,
    icon: 'Design',
  },
];

const dueSoonList: any[] = [
  {
    duedate: intl(LabelNames.dueToday),
    title: intl(LabelNames.assignmentReactionPaper),
    postedby: 'Posted by Clarrise',
    icon: 'docx',
    fonticon: '',
  },
  {
    duedate: intl(LabelNames.dueTomorrow),
    title: intl(LabelNames.assignmentReactionPaper),
    postedby: 'Posted by Clarrise',
    icon: 'docx',
    fonticon: '',
  },
  {
    duedate: 'Due 3 days from now',
    title: intl(LabelNames.dueReadPages) + ' 100',
    postedby: 'Posted by Clarrise',
    icon: '',
    fonticon: 'ReadingMode',
  },
  {
    duedate: 'test1',
    title: intl(LabelNames.assignmentReactionPaper),
    postedby: 'Posted by Clarrise',
    icon: 'docx',
    fonticon: '',
  },
  {
    duedate: 'test2',
    title: intl(LabelNames.assignmentReactionPaper),
    postedby: 'Posted by Clarrise',
    icon: 'docx',
    fonticon: '',
  },
];

const chartData = [
  {
    gradepercentage: 95,
    gradecolor: '#8ED85F',
    gradedesc: intl(LabelNames.almostperfect),
    datasets: [
      {
        data: [95, 5],
        backgroundColor: ['#8ED85F', '#E1DFDD'],
        hoverBackgroundColor: ['#8ED85F', '#E1DFDD'],
      },
    ],
  },
  {
    gradepercentage: 85,
    gradecolor: '#8ED85F',
    gradedesc: intl(LabelNames.goodjob),
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ['#8ED85F', '#E1DFDD'],
        hoverBackgroundColor: ['#8ED85F', '#E1DFDD'],
      },
    ],
  },
  {
    gradepercentage: 25,
    gradecolor: '#8ED85F',
    gradedesc: intl(LabelNames.needhelp),
    datasets: [
      {
        data: [25, 75],
        backgroundColor: ['red', '#E1DFDD'],
        hoverBackgroundColor: ['red', '#E1DFDD'],
      },
    ],
  },
];

const chartDataDetails = [
  {
    gradepercentage: 95,
    gradecolor: '#8ED85F',
    gradedesc: intl(LabelNames.almostperfect),
    datasets: [
      {
        data: [95, 5],
        backgroundColor: ['#8ED85F', '#E1DFDD'],
        hoverBackgroundColor: ['#8ED85F', '#E1DFDD'],
      },
    ],
  },
];

const Classes: React.FC = () => {
  const [data, dispatch] = useStore();
  // eslint-disable-next-line
  const [liList, setliList] = useState<any[] | null>();
  // eslint-disable-next-line
  const [liDetailsList, setliDetailsList] = useState<any[] | null>();
  const [breadcrumbList, setBreadCrumb] = useState<IBreadcrumbItem[]>([]);
  // eslint-disable-next-line
  const [containerTab, setContainerTab] = useState(
    <Todos dueSoonList={dueSoonList} />,
  );
  // eslint-disable-next-line
  const [containerDetailTab, setContainerDetailsTab] = useState(
    <TodosDetails dueSoonList={dueSoonList} />,
  );
  const [gotoDetails, setgotoDetails] = useState(false);
  const [late, setlate] = useState<JSX.Element | null>();
  // eslint-disable-next-line
  const [toggleSaveButton, setToggleSaveButton] = useState(true);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [toggleMessage, setToggleMessage] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>();

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 3);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBreadcrumbItemClicked = (ev: any, item: any) => {
    const updatedItem = [...items];
    updatedItem[1].text = data.classesInfo.selectedClass;

    setBreadCrumb(updatedItem);
    updateContainerTab(data.classesInfo.selectedTab);
    UpdateActiveTab();
    setgotoDetails(false);
    dispatch('ClassesUpdateSelectedDate', {});
  };

  const items: any[] = [
    { text: intl(LabelNames.classes) },
    { text: 'English', onClick: onBreadcrumbItemClicked },
    { text: intl(LabelNames.toDo), isCurrentItem: true },
  ];

  // eslint-disable-next-line
  const linkHandler = (value: any) => {
    const updatedList = [...linkItem];
    updatedList.forEach(item => {
      item.classname = classes.aLink;
      if (item.name === value.name) {
        item.classname = classes.aLinkactive;
      }
    });
    setliList(updatedList);
    updateBreadCrumbList1(value);
    updateContainerTab(value.id);
  };

  // eslint-disable-next-line
  const linkDetailsHandler = (value: any) => {
    const updatedList = [...linkDetailsItem];
    updatedList.forEach(item => {
      item.classname = classes.aLink;
      if (item.name === value.name) {
        item.classname = classes.aLinkactive;
      }
    });
    setliDetailsList(updatedList);
    UpdateBreadCrumbDetails1(value);
    updateContainerDetailsTab(value.id);
  };

  const updateBreadCrumbList1 = (value: any) => {
    const updatedItem = [...items];
    updatedItem[1].text = data.classesInfo.selectedClass;
    const lastIndex = items.length - 1;
    updatedItem.splice(lastIndex, 1);
    updatedItem.push({ text: value.name });

    setBreadCrumb(updatedItem);
  };

  const UpdateBreadCrumbDetails1 = (value: any) => {
    const updatedBreadCrumb = [...items];
    updatedBreadCrumb[1].text = data.classesInfo.selectedClass;
    const lastIndex = items.length - 1;
    updatedBreadCrumb.splice(lastIndex, 1);
    updatedBreadCrumb.push({ text: intl(LabelNames.lesson) });
    var selectedData =
      data.classesInfo.selectedDay !== null ? data.classesInfo.selectedDay : '';
    updatedBreadCrumb.push({
      text: data.classesInfo.selectedDate + ' ' + selectedData,
    });
    updatedBreadCrumb.push({ text: value.name });
    setBreadCrumb(updatedBreadCrumb);
  };

  const updateContainerTab = (value: any) => {
    switch (value) {
      case 1:
        return setContainerTab(<Todos dueSoonList={dueSoonList} />);
      case 2:
        return setContainerTab(<TeachersNotes user={data.userProfile} />);
      case 3:
        return setContainerTab(<MyNotes />);

      case 4:
        return setContainerTab(<Media />);
      case 6:
        return setContainerTab(<Quizzes chartData={chartData} />);
      case 7:
        return setContainerTab(<Grades />);
      default:
        return '';
    }
  };

  const updateContainerDetailsTab = (value: any) => {
    switch (value) {
      case 1:
        return setContainerDetailsTab(
          <TodosDetails dueSoonList={dueSoonList} />,
        );
      case 2:
        return setContainerDetailsTab(
          <TeachersNotesDetails user={data.userProfile} />,
        );
      case 3:
        return setContainerDetailsTab(<MyNotesDetails />);
      case 4:
        return setContainerDetailsTab(<MediaDetails />);
      case 5:
        return setContainerDetailsTab(<AttendanceDetails />);
      case 6:
        return setContainerDetailsTab(
          <QuizzesDetails chartData={chartDataDetails} />,
        );
      default:
        return setContainerDetailsTab(
          <TodosDetails dueSoonList={dueSoonList} />,
        );
    }
  };

  const UpdateBreadCrumbDetails = () => {
    const updatedBreadCrumb = [...items];
    updatedBreadCrumb[1].text = data.classesInfo.selectedClass;
    const lastIndex = items.length - 1;
    updatedBreadCrumb.splice(lastIndex, 1);
    updatedBreadCrumb.push({ text: intl(LabelNames.lesson) });
    var selectedData =
      data.classesInfo.selectedDay !== null ? data.classesInfo.selectedDay : '';
    updatedBreadCrumb.push({
      text: data.classesInfo.selectedDate + ' ' + selectedData,
    });
    updatedBreadCrumb.push({
      text: intl(LabelNames.toDo),
      isCurrentItem: true,
    });
    setBreadCrumb(updatedBreadCrumb);
  };

  useEffect(() => {
    const updatedItem = [...items];
    updatedItem[1].text = data.classesInfo.selectedClass;
    setBreadCrumb(updatedItem);
    UpdateActiveTab();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const UpdateActiveTab = () => {
    const updatedList = [...linkItem];
    updatedList.forEach(item => {
      item.classname = classes.aLink;
      if (item.id === 1) {
        item.classname = classes.aLinkactive;
      }
    });
    setliList(updatedList);
  };

  const UpdateActiveTabDetails = () => {
    const updatedList = [...linkDetailsItem];
    updatedList.forEach(item => {
      item.classname = classes.aLink;
      if (item.id === 1) {
        item.classname = classes.aLinkactive;
      }
    });
    setliDetailsList(updatedList);
  };

  useEffect(() => {
    if (data.classesInfo.selectedDate != null) {
      UpdateBreadCrumbDetails();
      setgotoDetails(true);
      UpdateActiveTabDetails();
      updateContainerDetailsTab(1);
      AddLateDiv();
    }
  }, [data.classesInfo.selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const AddLateDiv = () => {
    setlate(null);
    if (data.classesInfo.selectedLate !== null) {
      const late = data.classesInfo.selectedLate.toString();
      if (late.length > 0) {
        setlate(
          <span className={'padl10 ' + classes.lateColor}>
            {' '}
            <FontIcon
              iconName="AlertSolid"
              className={classes.lateColor}
            />{' '}
            {intl(LabelNames.youWere)} {late} {intl(LabelNames.minsLate)}
          </span>,
        );
      }
    }
  };

  const _customRenderer = (link: any, defaultRenderer: any) => {
    return (
      <span>
        {defaultRenderer(link)}
        <span className={classes.badge}>{dueSoonList.length}</span>
      </span>
    );
  };

  const closeSuccessMsg = () => {
    toggleMessage ? setToggleMessage(false) : setToggleMessage(true);
  };
  const _toggleSuccessMessage = (isConfirmed: any) => {
    if (isConfirmed) {
      setHasConfirmed(true);
    }
    setTimeout(() => {
      setHasConfirmed(false);
    }, 5000);
  };
  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.borderbot}>
          <div className="ms-Grid-col ms-lg8">
            <Breadcrumb
              items={breadcrumbList}
              maxDisplayedItems={10}
              ariaLabel="Breadcrumb with items rendered as buttons"
              overflowAriaLabel="More links"
              className={classes.BreadcrumbContainer}
            />
          </div>
          {!gotoDetails ? (
            <div className={'ms-Grid-col  ms-lg4  ' + classes.padUS}>
              <div className={classes.floatR}>
                <div className={'ms-Grid-col  ms-lg6' + classes.addNoteWidth}>
                  <ActionButton
                    iconProps={{ iconName: 'CalculatorAddition' }}
                    className={classes.uploadText}>
                    {intl(LabelNames.addNote)}
                  </ActionButton>
                </div>
                <div className={'ms-Grid-col ms-lg6 ' + classes.uploadHomework}>
                  <ActionButton
                    iconProps={{ iconName: 'Upload' }}
                    className={classes.uploadText}>
                    {intl(LabelNames.upload)} {intl(LabelNames.homeWorks)}
                  </ActionButton>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={'ms-Grid-row '}>
        <div className={'ms-Grid-col ms-lg12 '}>
          <div
            className={
              'ms-Grid-col ms-lg9 main-container customScroll ' +
              classes.container
            }>
            <div>
              {hasConfirmed && toggleMessage && (
                <MessageBar
                  // hideDialog={true}
                  messageBarType={MessageBarType.success}
                  isMultiline={false}
                  onDismiss={closeSuccessMsg}
                  dismissButtonAriaLabel="Close">
                  Awesome! Attendance confirmed successfully!
                </MessageBar>
              )}
            </div>
            <br />
            {!gotoDetails ? (
              <div>
                <div className="ms-Grid-row">
                  <div
                    className={'ms-Grid-col ms-lg12 ' + classes.titleSubject}>
                    {data.classesInfo.selectedClass}
                  </div>
                </div>
                <br />
                <br />

                <div className="ms-Grid-row">
                  <div
                    className={'ms-Grid-col ms-lg12 ' + classes.borderbottab}>
                    <Pivot
                      styles={pivotStyles}
                      defaultSelectedKey={data.classesInfo.selectedTab}>
                      <PivotItem
                        headerText={intl(LabelNames.toDo)}
                        itemIcon="WaitlistConfirm"
                        onRenderItemLink={_customRenderer}
                        itemKey="1">
                        <Todos dueSoonList={dueSoonList} />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Comment"
                        headerText={intl(LabelNames.teachersNote)}
                        itemKey="2">
                        <TeachersNotes user={data.userProfile} />
                      </PivotItem>
                      <PivotItem
                        itemIcon="QuickNote"
                        headerText={intl(LabelNames.myNotes)}
                        itemKey="3">
                        <MyNotes />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Media"
                        headerText={intl(LabelNames.media)}
                        itemKey="4">
                        <Media />
                      </PivotItem>
                      <PivotItem
                        itemIcon="ClipboardList"
                        headerText={intl(LabelNames.quizzes)}
                        itemKey="5">
                        <Quizzes chartData={chartData} />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Design"
                        headerText={intl(LabelNames.grades)}
                        itemKey="6">
                        <Grades />
                      </PivotItem>
                    </Pivot>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg-12">
                    <div className={'ms-Grid-col ms-lg-2 ' + classes.titleDate}>
                      <div>
                        <div className={classes.dateBoxMonth}>
                          {moment(new Date(data.classesInfo.selectedDate))
                            .format('MMM')
                            .toUpperCase()}
                        </div>
                        <div className={classes.dateBoxDay}>
                          {moment(
                            new Date(data.classesInfo.selectedDate),
                          ).format('DD')}
                        </div>
                      </div>
                    </div>
                    <div className="ms-Grid-col ms-lg-10">
                      <div
                        className={
                          'ms-Grid-col ms-lg12 ' + classes.titleSubject
                        }>
                        {data.classesInfo.selectedClass}{' '}
                        {intl(LabelNames.lesson)}
                      </div>
                      <div
                        className={
                          'ms-Grid-col ms-lg12 ' + classes.titleSubjectDetils
                        }>
                        <FontIcon iconName="Clock" className="padR5" />{' '}
                        {data.classesInfo.selectedTime} {late}
                      </div>
                      <div
                        className={
                          'ms-Grid-col ms-lg12 ' + classes.titleSubjectDetils
                        }>
                        <FontIcon iconName="POI" className="padR5" />{' '}
                        {data.classesInfo.selectedLocation}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />

                <div className="ms-Grid-row">
                  <div
                    className={'ms-Grid-col ms-lg12 ' + classes.borderbottab}>
                    <Pivot styles={pivotStyles}>
                      <PivotItem
                        headerText={intl(LabelNames.toDo)}
                        itemIcon="WaitlistConfirm"
                        onRenderItemLink={_customRenderer}
                        itemKey="1">
                        <TodosDetails dueSoonList={dueSoonList} />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Comment"
                        headerText={intl(LabelNames.teachersNote)}
                        itemKey="2">
                        <TeachersNotesDetails user={data.userProfile} />
                      </PivotItem>
                      <PivotItem
                        itemIcon="QuickNote"
                        headerText={intl(LabelNames.myNotes)}
                        itemKey="3">
                        <MyNotesDetails />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Media"
                        headerText={intl(LabelNames.media)}
                        itemKey="4">
                        <MediaDetails />
                      </PivotItem>
                      <PivotItem
                        itemIcon="ClipboardList"
                        headerText={intl(LabelNames.attendance)}
                        itemKey="5">
                        <AttendanceDetails
                          toggleSuccessMessage={_toggleSuccessMessage}
                          lessonId={data.classesInfo.selectedLessonId}
                          classTitle={data.classesInfo.selectedClass}
                        />
                      </PivotItem>
                      <PivotItem
                        itemIcon="Design"
                        headerText={intl(LabelNames.quizzes)}
                        itemKey="6">
                        <QuizzesDetails chartData={chartDataDetails} />
                      </PivotItem>
                    </Pivot>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={'ms-Grid-col ms-lg3 main-right-panel'}>
            {hasRole(userRole, Roles.STUDENT) && <StudentRightLayout />}
            {hasRole(userRole, Roles.TEACHER) && <TeacherRightLayout />}
            {hasRole(userRole, Roles.ADMINISTRATOR) && <AdminRightLayout />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Classes;
