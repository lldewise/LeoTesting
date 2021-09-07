import React from 'react';
import { Card } from '@uifabric/react-cards';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import {
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react/lib/Styling';
import classes from './AttendanceCard.module.scss';
import { Doughnut } from 'react-chartjs-2';
import { intl } from '../../util/commonFunction';
import { LabelNames } from '../../util/constant';
import { IconButton } from 'office-ui-fabric-react';

const chartData = {
  labels: ['95% Lessons Attended', '5% Absences'],
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ['#8ED85F', '#E1DFDD'],
      hoverBackgroundColor: ['#8ED85F', '#E1DFDD'],
    },
  ],
};

const lightOptions = {
  legend: {
    display: false,
    responsive: true,
    maintainAspectRatio: true,
  },
  cutoutPercentage: 80,
};

const cardTokens = { childrenMargin: 12 };

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '90px 13px',
  position: 'absolute',
});

const classNames = mergeStyleSets({
  greenYellow: [{ color: 'greenyellow' }, iconClass],
});

const AttendanceCard: React.FC = () => {
  return (
    <Card
      className={classes.customBackgroundAttendance}
      aria-label="Basic horizontal card"
      horizontal
      tokens={cardTokens}>
      <label className={classes.attendanceTitle}>
        {intl(LabelNames.attendance)}
      </label>
      <div className={classes.attendanceContainer}>
        <FontIcon
          iconName="Emoji"
          className={classes.iconGreenYellow + ' ' + classNames.greenYellow}
        />
        <Card.Item>
          <div className={classes.customChart}>
            <Doughnut data={chartData} options={lightOptions} />
          </div>
        </Card.Item>
      </div>
      <label className={classes.customMargin}>
        {intl(LabelNames.keepitup)}
      </label>
      <label className={classes.customMargin2}>
        {intl(LabelNames.yourseldomabsentnorlate)}
      </label>
      <label className={classes.customMarginAttendedPercent}>95%</label>
      <label className={classes.customMarginAttended}>
        {intl(LabelNames.lessonsAttended)}
      </label>
      <label className={classes.customMarginAbsencesPercent}>5%</label>
      <label className={classes.customMarginAbsences}>
        {intl(LabelNames.absences)}
      </label>

      <div className="ms-Grid-col  ms-lg10 text-right ">
        <IconButton
          iconProps={{ iconName: 'more' }}
          className="btnIcon btnIconDark btnIconLg newsCardMore"
        />
      </div>
    </Card>
  );
};

export default AttendanceCard;
