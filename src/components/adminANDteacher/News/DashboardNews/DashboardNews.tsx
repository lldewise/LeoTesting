import React, { useState, useEffect, useLayoutEffect } from 'react';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import moment from 'moment';
import classes from './DashboardNews.module.scss';
import AvatarEditor from 'react-avatar-editor';
import logger from 'loglevel';

type DashboardNewsProps = {
  item: any,
};

const DashboardNews: React.FC<DashboardNewsProps> = props => {
  //eslint-disable-next-line
  const [newsposition, setNewsPosition] = useState({
    x: Number(props.item.thumb2x),
    y: Number(props.item.thumb2y),
  });
  logger.log(props);
  const [width, setWidth] = useState(Number(50));
  //eslint-disable-next-line
  const [height, setHeight] = useState(Number(350));

  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setWidth(size[0] * 0.1);
    setHeight(size[0] * 0.1);
  }, [size]);

  let iconName = null;
  //eslint-disable-next-line
  let categoryName = null;
  if (props.item.category === '1') {
    categoryName = intl(LabelNames.schoolnews);
    iconName = 'Bank';
  } else if (props.item.category === '2') {
    categoryName = intl(LabelNames.events);
    iconName = 'SpecialEvent';
  } else {
    categoryName = intl(LabelNames.miscellaneous);
    iconName = 'Megaphone';
  }

  return (
    <div className="card-gallery gallery-row">
      <div className="card-image">
        <AvatarEditor
          image={props.item.img}
          scale={Number(props.item.thumb1scale)}
          width={width}
          height={100}
          border={0}
          position={newsposition}
        />
      </div>
      <div className="card-details">
        <div className="card-title-group">
          <label className="card-title">
            <i
              className={
                'ms-Icon ms-Icon--' + iconName + ' ' + classes.newsIcon
              }
              aria-hidden="true"
            />
            {props.item?.title}
          </label>
          <span className="card-timestamp">
            {moment(props.item?.publishdate).format('MMM D')}
          </span>
        </div>
        <div className="card-description">
          <p>{props.item?.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardNews;