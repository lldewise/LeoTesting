import React from 'react';
import classes from './QuizzesCard.module.scss';
import { Doughnut } from 'react-chartjs-2';
const lightOptions = {
  cutoutPercentage: 80,
  responsive: true,
  maintainAspectRatio: false,
};
type QuizzesCardProps = {
  item: any;
};
const QuizzesCard: React.FC<QuizzesCardProps> = props => {
  const grade =
    props.item.gradepercentage < 75 ? (
      <label className={classes.customScoreFail}>
        {props.item.gradepercentage}%
      </label>
    ) : (
      <label className={classes.customScorePass}>
        {props.item.gradepercentage}%
      </label>
    );
  return (
    <div className={classes.divPadding}>
      <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
        <div className={'ms-Grid-col lg2 ' + classes.divpad10}>{grade}</div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12">
            <div className={'ms-Grid-col lg6 ' + classes.customChart}>
              <Doughnut
                data={props.item}
                options={lightOptions}
                width={85}
                height={85}
              />
            </div>
            <div className={'ms-Grid-col lg6 ' + classes.customLabel}>
              <label className={classes.gradeDesc}>
                {props.item.gradedesc}
              </label>
              <br />
              <div className={classes.quiznum}>
                <label className={classes.quizNumfont}>Quiz #7</label>
                <br />
                <label className={classes.daysfont}> 2 days ago</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesCard;
