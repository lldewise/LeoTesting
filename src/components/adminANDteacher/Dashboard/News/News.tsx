import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card } from '@uifabric/react-cards';
import classes from './News.module.scss';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import { ActionButton, DefaultButton } from 'office-ui-fabric-react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import  DashboardNews  from '../../News/DashboardNews/DashboardNews';
import { useStore } from '../../../../store/store';
import AvatarEditor from 'react-avatar-editor';

const cardTokens = { childrenMargin: 12 };

const News: React.FC = () => {
  const history = useHistory();
  const data = useStore()[0];

  const [newsSmall, setNewsSmall] = useState<any | null>(null);
  const [featuredNews, setFeaturedNews] = useState<any | null>(null);
  const [width, setWidth] = useState(Number(150));
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

  const handleClick = () => {
    history.push('./news');
  };
  const gotoCreateNewsStory = () => {
    history.push('./news/create');
  };

  useEffect(() => {
    const news : any[] = [];
    const newData = data.adminRegularNews.slice(0, 2);
    newData.forEach((row, i) => {
      news.push(
        <div className="ms-Grid-row" key={i}>
          <DashboardNews item={row} />
        </div>,
      );
    });
    setNewsSmall(news);
  }, [data.adminRegularNews]);

  useEffect(() => {
    try {
      if (data.adminFeaturedNews[0].name !== undefined) {
        let iconName = null;
        //eslint-disable-next-line
        let categoryName = null;
        if (data.adminFeaturedNews[0]?.category === '1') {
          categoryName = intl(LabelNames.schoolnews);
          iconName = 'Bank';
        } else if (data.adminFeaturedNews[0]?.category === '2') {
          categoryName = intl(LabelNames.events);
          iconName = 'SpecialEvent';
        } else {
          categoryName = intl(LabelNames.miscellaneous);
          iconName = 'Megaphone';
        }

        const position = {
          x: Number(data.adminFeaturedNews[0].thumb2x),
          y: Number(data.adminFeaturedNews[0].thumb2y),
        };

        const featured = (
          <div className="card-gallery gallery-row">
            <div className="card-image ">
              <AvatarEditor
                image={data.adminFeaturedNews[0].img}
                scale={Number(data.adminFeaturedNews[0].thumb1scale)}
                width={width}
                height={100}
                border={0}
                position={position}
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
                  {data.adminFeaturedNews[0]?.title}
                </label>
                <span className="card-timestamp">
                  {moment(data.adminFeaturedNews[0]?.publishdate).format(
                    'MMM D',
                  )}
                </span>
              </div>
              <div className="card-description">
                <p>{data.adminFeaturedNews[0]?.desc}</p>
              </div>
            </div>
          </div>
        );
        setFeaturedNews(featured);
      }
    } catch {}
  }, [data.adminFeaturedNews]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      className="card-default-body"
      aria-label="Basic horizontal card"
      tokens={cardTokens}>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col  ms-lg12">
          <div className={'dashboard-title ' + classes.noTPad}>
            <span>News</span>
            <ActionButton
              className="btnPlain btnInfo"
              iconProps={{ iconName: 'CircleAddition' }}
              onClick={gotoCreateNewsStory}>
              Create New Story
            </ActionButton>
          </div>
        </div>

        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-lg12">
            {featuredNews}
            {newsSmall}
          </div>
          <div className={classes.btnPadding} onClick={handleClick}>
            <DefaultButton className={classes.btnSize} text="More news" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default News;
