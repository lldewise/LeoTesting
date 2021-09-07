import React, { useState, useEffect, useLayoutEffect } from 'react';
import classes from './News.module.scss';
import PostNews from '../../components/news/PostNews/PostNews';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { useHistory } from 'react-router-dom';
import { LabelNames } from '../../util/constant';
import { intl } from '../../util/commonFunction';
import { ActionButton } from '@fluentui/react';
import { useStore } from '../../store/store';
import moment from 'moment';
import AvatarEditor from 'react-avatar-editor';

import { hasRole } from '../../util/commonFunction';
import StudentRightLayout from '../../components/layout/RightLayout';
import TeacherRightLayout from '../../components/layout/TeacherRightLayout';
import AdminRightLayout from '../../components/layout/AdminRightLayout';
import { Roles } from '../../util/constant';
import { UPDATEMANAGESTORIES } from '../../store/AdminAndTeacherStore/News/newsAction';

const News: React.FC = () => {
  const [data, dispatch] = useStore();
  const { adminRegularNews, adminFeaturedNews } = data;
  const [newsSmall, setNewsSmall] = useState<any[] | null>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [newsposition, setNewsPosition] = useState<any | null>({
    x: Number(data.adminFeaturedNews[0]?.featuredx),
    y: Number(data.adminFeaturedNews[0]?.featuredy),
  });

  const [width, setWidth] = useState(Number(900));
  // eslint-disable-next-line
  const [height, setHeight] = useState(Number(350));
  const [size, setSize] = useState([0, 0]);
  const [featuredNews, setFeaturedNews] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setWidth(size[0] * 0.42);
    setHeight(size[0] * 0.2);
  }, [size]);

  const history = useHistory();

  function handleClick() {
    dispatch(UPDATEMANAGESTORIES, data.adminFeaturedNews[0]);
    history.push('./newsdetails');
  }

  useEffect(() => {
    const news: any[] = [];
    data.adminRegularNews.forEach((row, i) => {
      news.push(
        <div className="ms-Grid-col ms-lg4" key={i}>
          <PostNews item={row} />
        </div>,
      );
    });
    setNewsSmall(news);
  }, [data.adminRegularNews]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let iconName = null;
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
    setNewsPosition({
      x: Number(data.adminFeaturedNews[0]?.featuredx),
      y: Number(data.adminFeaturedNews[0]?.featuredy)
    });

    const featured = (
      <div className={'ms-Grid-col ms-lg8 ' + classes.topNewGradient}>
        <div
          className={classes.newContent + ' ' + classes.topNew}
          onClick={handleClick}>
          <div className={'avatarEdit ' + classes.container}>
            <AvatarEditor
              image={data.adminFeaturedNews[0]?.img}
              scale={Number(data.adminFeaturedNews[0]?.featuredscale)}
              width={width}
              height={320}
              border={0}
              position={newsposition}
            />
            <div
              className={classes.branch_1}
              style={{ width: width, height: '320px' }}>
              <div className={classes.newsFeatured}>
                <div className={'ms-Grid-row ' + classes.newTopHeader}>
                  <FontIcon className="padR5" iconName={iconName} />{' '}
                  {categoryName}
                </div>
                <div className={'ms-Grid-row ' + classes.newTopTitle}>
                  {data.adminFeaturedNews[0]?.title}
                </div>
                <div className={'ms-Grid-row ' + classes.newTopDate}>
                  {' '}
                  {moment(data.adminFeaturedNews[0]?.publishdate).format(
                    'MMMM YYYY',
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    setFeaturedNews(featured);
  }, [data.adminFeaturedNews]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 container">
        <div className="ms-Grid-col ms-lg9 main-container customScrollFull ">
          <div className="ms-Grid-row">
            {data.userProfile.role !== 'Administrator' && (
              <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                  <FontIcon iconName="News" />
                </div>
                <div className={'ms-Grid-col ms-lg8 ' + classes.headertitle}>
                  News and Announcement
                </div>
              </div>
            )}

            {data.userProfile.role === 'Administrator' && (
              <div className={'ms-Grid-col ms-lg12 text-right'}>
                <div className={'ms-Grid-col ms-lg12 ' + classes.header}>
                  <div className={'ms-Grid-col ms-lg1 ' + classes.iconWidth}>
                    <FontIcon iconName="News" />
                  </div>
                  <div
                    className={
                      'ms-Grid-col ms-lg8 ' +
                      classes.headertitle +
                      ' ' +
                      classes.headerTitleAdmin
                    }>
                    News and Announcement
                  </div>
                  <div className={'AttendanceHeader ' + classes.printIcon}>
                    <ActionButton
                      iconProps={{ iconName: 'AddTo' }}
                      className={classes.actionButton}>
                      Print
                    </ActionButton>
                    <ActionButton
                      iconProps={{ iconName: 'settings' }}
                      className={classes.actionButton}>
                      Print
                    </ActionButton>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={
              'ms-Grid-row ' + classes.newsMargin + ' ' + classes.news
            }>
            {featuredNews}
            {newsSmall}
          </div>
        </div>
        <div className="ms-Grid-col ms-lg3 main-right-panel">
          {hasRole(userRole, Roles.STUDENT) && <StudentRightLayout />}
          {hasRole(userRole, Roles.TEACHER) && <TeacherRightLayout />}
          {hasRole(userRole, Roles.ADMINISTRATOR) && <AdminRightLayout />}
        </div>
      </div>
    </div>
  );
};

export default News;
