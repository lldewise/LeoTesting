import React, { useState, useEffect } from 'react';
import ActivitiesDouble from '../../../components/adminANDteacher/OtherActivities/ActivitiesDouble/ActivitiesDouble';
import classes from './RightLayoutActivity.module.scss';
import { FontIcon } from 'office-ui-fabric-react';

const RightLayoutActivity = props => {
  const [column, setColumn] = useState();
  //eslint-disable-next-line
  const [snumber, setsNumber] = useState(0);

  const _onColumnClickDrafts = (ev, column, value) => {
    const newColumns = _activityColumn.slice();
    const currColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];

    const newItems = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending,
    );

    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev, column) => {
          _onColumnClickDrafts(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    props.setActivityList(newItems);

    setColumn(newColumns);
    setsNumber(1);
  };

  const _activityColumn = [
    {
      key: '0',
      name: 'Activity',
      minWidth: 100,
      maxWidth: 420,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev, column) => {
        _onColumnClickDrafts(ev, column, props.activityList);
      },
      onRender: item => {
        return (
          <div className={'padT10 ' + classes.itemContainer}>
            <div className="padR10">
              <FontIcon className={classes.icon1} iconName={item.group} />
            </div>
            <div> {item.name}</div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setColumn(_activityColumn);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ms-Grid-col ms-lg12">
      <div className={'ms-Grid-row ' + classes.rightLayoutContainer}>
        <div className={classes.container}>
          <div className={classes.fistCol}>
            <div className={'ms-Grid-col  ms-lg12  ' + classes.title}>
              Double Booking
            </div>
            <div className={classes.desc}>List of double booked activities</div>
          </div>
          <div className={classes.secondCol} onClick={props.refresh}>
            <FontIcon className={classes.icon} iconName="Refresh" />
          </div>
        </div>
        <br />
        <ActivitiesDouble itemlist={props.activityList} _columns={column} />
      </div>
    </div>
  );
};

export default RightLayoutActivity;
function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}
