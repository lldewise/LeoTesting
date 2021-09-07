import React from 'react';
import Slider from 'infinite-react-carousel';
import classes from './DueSoon.module.scss';
import { intl } from '../../util/commonFunction';
import { LabelNames } from '../../util/constant';
import { SubjectDue } from '../../types/store/dashboard';

type DueSoonProps = {
  dueSoonList: SubjectDue[];
};
const DueSoon: React.FC<DueSoonProps> = props => {
  const settings = {
    slidesToShow: 4,
  };

  const cardView: any[] = [];
  props.dueSoonList.forEach((item, i) => {
    cardView.push(
      <div key={i}>
        <div className={classes.divPadding} key={i}>
          <div className={'ms-Grid-col ms-lg12 ' + classes.alarmCLock}>
            <span className="">
              <i
                className={'ms-Icon ms-Icon--AlarmClock ' + classes.iconTime}
                aria-hidden="true"
              />
            </span>
            <span className="">
              <label className={classes.labelTime}>
                {intl(LabelNames.today)} at {item.dueDate}
              </label>
            </span>
          </div>
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 ' + classes.divBgColor}>
              <i
                className={'ms-Icon ms-Icon--PenWorkspace ' + classes.iconStyle}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 ' + classes.labelMargin}>
              <label>{item.description}</label>
            </div>
          </div>
          <div className={'ms-Grid-row '}>
            <div
              className={'ms-Grid-col ms-lg12 ' + classes.labelMarginSubject}>
              <label>{item.subject}</label>
            </div>
          </div>
        </div>
      </div>,
    );
  });

  return (
    <div className={'dueSoonCarousel ' + classes.dueSoonSlider}>
      <label className={classes.label}>{intl(LabelNames.dueSoon)} </label>
      <Slider {...settings}>{cardView}</Slider>
    </div>
  );
};

export default DueSoon;
