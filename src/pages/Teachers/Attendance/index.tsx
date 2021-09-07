import React, { Fragment, useEffect, useState } from 'react';
import { FontIcon, ActionButton, DefaultButton } from 'office-ui-fabric-react';
import classes from './Attendance.module.scss';
import TeacherRightLayout from '../../../components/layout/TeacherRightLayout';
import StudentRightLayout from '../../../components/layout/RightLayout';
import AdminRightLayout from '../../../components/layout/AdminRightLayout';
import { useStore } from '../../../store/store';
import MissingRegistration from '../../../components/adminANDteacher/MissingRegistration/MissingRegistration';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { getWeekRange, truncateLongName } from '../../../util/commonFunction';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from '@fluentui/react/lib/Shimmer';
import { Fabric } from '@fluentui/react/lib/Fabric';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { hasRole } from '../../../util/commonFunction';
import { Roles } from '../../../util/constant';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0',
    },
  },
});
const wrapperStyles = { display: 'flex' };

const Attendance: React.FC = () => {
  const [data, dispatch] = useStore();
  const [sectionSubjectList, setSectionSubjectList] = useState<any[] | null>(
    null,
  );
  const [teacherSubjectList, setTeacherSubjectList] = useState<any[]>();
  const [shimmer, setShimmer] = useState(true);
  const [userRole, setUserRole] = useState<any>();

  const history = useHistory();
  const week = getWeekRange(new Date());
  const gotoMonthly = (item: any, key: number) => {
    dispatch('SETSELECTEDLESSONBYSTAFF', item.data[0]);
    history.push('./weekly-attendance');
  };

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 8);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function filterEvent() {
    const items = [...data.teacherLessonsByStaffPerWeek];
    const toSubscribe = [];
    const list = items.filter(
      a =>
        a.confirmed === false &&
        moment(a.start).format('YYYY-MM-DD') >=
          moment(week.from).format('YYYY-MM-DD') &&
        moment(a.start).format('YYYY-MM-DD') <=
          moment(week.to).format('YYYY-MM-DD'),
    );
    list.forEach(a => {
      toSubscribe.push(a.class);
    });
    return list;
  }

  useEffect(() => {
    let groups: any[] = [];
    if (data.teacherLessonsByStaffPerWeek.length > 0) {
      groups = _.chain(data.teacherLessonsByStaffPerWeek)
        .groupBy('class')
        .map((data, classes) => ({ classes, data }))
        .value();
    }
    const divSectionSubject: any[] = [];
    groups.forEach((item, key) => {
      const title = item.classes.split('/')[1];
      const divItem = (
        <DefaultButton className={classes.classesBtn} key={key}>
          <div
            key={key}
            className={'ms-Grid-col ms-lg3 ' + classes.sectionSuject}
            onClick={() => gotoMonthly(item, key)}>
            <div className={classes.sectionSubjectFlex}>
              <div className={classes.fontIcon}>
                <FontIcon iconName="Group" className={classes.group} />
              </div>
              <div className={classes.iconDesc}>
                {truncateLongName(title, 12)}
              </div>
            </div>
          </div>
        </DefaultButton>
      );
      divSectionSubject.push(divItem);
    });
    setSectionSubjectList(divSectionSubject);
    setTeacherSubjectList(filterEvent);
    setTimeout(() => {
      setShimmer(false);
    }, 500);
  }, [data.teacherLessonsByStaffPerWeekUniqueId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 container ">
          <div className={'ms-Grid-col main-container customScrollFull '}>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                      <FontIcon iconName="ReminderPerson" />
                    </div>
                    <div
                      className={'ms-Grid-col ms-lg1 ' + classes.headertitle}>
                      Attendance
                    </div>
                    <div className={'AttendanceHeader ' + classes.printIcon}>
                      <ActionButton
                        iconProps={{ iconName: 'Print' }}
                        className={classes.actionButton}>
                        Print
                      </ActionButton>
                    </div>
                  </div>
                </div>

                <div className={'ms-Grid-row ' + classes.container}>
                  <div className="ms-Grid-col ms-lg12 ">
                    <br />
                    <div className="ms-Grid-row ">
                      <div className={'ms-Grid-col ms-lg12 ' + classes.title}>
                        Classes
                      </div>
                    </div>
                    <div className="ms-Grid-row padT5">
                      <div
                        className={'ms-Grid-col ms-lg12 ' + classes.titledesc}>
                        Register absences and perform task on a weekly basis
                      </div>
                    </div>
                    <br />
                    <div className={'ms-Grid-row ' + classes.subjectListRow}>
                      {data.teacherLessonsByStaffPerWeek.length > 0 &&
                        !shimmer && (
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' + classes.subjectList
                            }>
                            {sectionSubjectList}
                          </div>
                        )}
                      <Fabric className={wrapperClass}>
                        {shimmer && (
                          <Shimmer
                            customElementsGroup={getCustomElements()}
                            width="100%"
                          />
                        )}
                      </Fabric>
                    </div>
                    <br />
                    <div className="ms-Grid-row ">
                      <div className="ms-Grid-col ms-lg12 ">
                        <MissingRegistration
                          itemlist={teacherSubjectList}
                          shimmer={shimmer}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-col main-right-panel">
            {hasRole(userRole, Roles.STUDENT) && <StudentRightLayout />}
            {hasRole(userRole, Roles.TEACHER) && <TeacherRightLayout />}
            {hasRole(userRole, Roles.ADMINISTRATOR) && <AdminRightLayout />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const getCustomElements = () => {
  return (
    <div style={wrapperStyles}>
      <ShimmerElementsGroup
        width={'150px'}
        shimmerElements={[
          { type: ShimmerElementType.line, height: 80, width: 150 },
          { type: ShimmerElementType.gap, width: 10, height: 80 },
        ]}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <ShimmerElementsGroup
          flexWrap
          width={'100%'}
          style={{ marginTop: '5px' }}
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 10,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 10,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '99%',
              height: 10,
              verticalAlign: 'bottom',
            },
            { type: ShimmerElementType.gap, width: '99%', height: 20 },
          ]}
        />
      </div>
    </div>
  );
};

export default Attendance;
