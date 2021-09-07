import React, { Fragment } from 'react';
import classes from './ActivityAttendance.module.scss';
import { SearchBox } from 'office-ui-fabric-react';

type ActivityAttendanceHeaderProps = {
  searhFilter: any;
};
const ActivityAttendanceHeader: React.FC<ActivityAttendanceHeaderProps> =
  props => {
    function _onChangeText(item: any) {
      props.searhFilter(item?.target.value);
    }

    return (
      <>
        <div className="ms-Grid-row ">
          <div
            className={
              'ms-Grid-col ms-md12 ms-lg12  searchBoxActivity ' +
              classes.divBg +
              ' ' +
              classes.divSearch
            }>
            <SearchBox
              placeholder="Search student name..."
              onChange={_onChangeText}
              underlined={true}
            />
          </div>
        </div>
      </>
    );
  };
export default ActivityAttendanceHeader;
