import React, { Fragment } from 'react';
import classes from './AttendanceDetails.module.scss';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';

function AttendanceTab(props) {
  const onFilter = item => {
    props._setFilter(item.props.itemKey);
  };
  // eslint-disable-next-line
  const { studentsList, spinner } = props;
  const totalStudent = studentsList.length;

  const totalPresent = studentsList.filter(a => a.percentage === 100).length;

  const totalLatecomer = studentsList.filter(a => a.percentage === 50).length;

  const totalAbsent = studentsList.filter(a => a.percentage === 0).length;

  /*     const tokens = {
        sectionStack: {
          childrenGap: 10,
        },
        spinnerStack: {
          childrenGap: 20,
        },
      };
    const spin =  <Stack>
    
    <Spinner size={SpinnerSize.large} label =" students" labelPosition="right" />
       <Label>students</Label>   
  </Stack> */
  return (
    <>
      <div className={classes.divBg}>
        <Pivot
          aria-label="Links of Large Tabs Pivot Example"
          onLinkClick={onFilter}
          linkFormat={PivotLinkFormat.tabs}
          linkSize={PivotLinkSize.large}
          className={props.filter}>
          <PivotItem
            itemKey="studentTab"
            itemIcon="ContactCard"
            headerText={totalStudent + ' students'}
            headerButtonProps={{
              style: { color: '#6c35d4', fontSize: '14px' },
            }}
          />
          <PivotItem
            itemKey="presentTab"
            headerText={totalPresent + ' present'}
            itemIcon="SkypeCircleCheck"
            headerButtonProps={{
              style: { color: '#6bb700', fontSize: '14px' },
            }}
          />
          <PivotItem
            itemKey="absentTab"
            itemIcon="SkypeCircleMinus"
            headerButtonProps={{
              style: { color: '#d43b35', fontSize: '14px' },
            }}
            headerText={totalAbsent + ' absent'}
          />
          <PivotItem
            itemKey="latecomerTab"
            itemIcon="AlertSolid"
            headerButtonProps={{
              style: { color: '#f7a93b', fontSize: '14px' },
            }}
            headerText={totalLatecomer + ' latecomer'}
          />
        </Pivot>
      </div>
    </>
  );
}
export default AttendanceTab;
