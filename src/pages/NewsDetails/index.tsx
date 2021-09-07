import React, { useEffect, useState } from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '@uifabric/example-data';
import classes from './NewsDetails.module.scss';
import PostNews from '../../components/news/PostNews/PostNews';
import { LabelNames } from '../../util/constant';
import { intl } from '../../util/commonFunction';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { ActionButton } from '@fluentui/react';
import { hasRole } from '../../util/commonFunction';
import StudentRightLayout from '../../components/layout/RightLayout';
import TeacherRightLayout from '../../components/layout/TeacherRightLayout';
import AdminRightLayout from '../../components/layout/AdminRightLayout';
import { useStore } from '../../store/store';
import { Roles } from '../../util/constant';
import parse from 'html-react-parser';
import moment from 'moment';
import AvatarEditor from 'react-avatar-editor';

const NewsDetails: React.FC = () => {
  //eslint-disable-next-line
  const data = useStore()[0];
  //eslint-disable-next-line
  const [ManageNewsStories, setItemList] = useState<any | null>(
    data.manageNewsStories,
  );
  //eslint-disable-next-line
  const [newsposition, setNewsPosition] = useState<any | null>({
    x: Number(data.manageNewsStories?.bannerx),
    y: Number(data.manageNewsStories?.bannery),
  });

  const [userRole, setUserRole] = useState<string | null>(null);
  const [newsSmall, setNewsSmall] = useState<any[] | null>(null);

  useEffect(() => {
    const news: any[] = [];
    const updatedNews = data.adminRegularNews.filter(
      r =>
        r.category === data.manageNewsStories.category &&
        r.id !== data.manageNewsStories.id,
    );

    updatedNews.forEach((row, i) => {
      news.push(
        <div className="ms-Grid-col ms-lg4" key={i}>
          <PostNews item={row} />
        </div>,
      );
    });
    setNewsSmall(news);
  }, [data.adminRegularNews]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUserRole(data.userProfile.role);
  }, [data.userProfile.role]);

  const examplePersona = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AL',
    text: 'Kirsten Moller',
    secondaryText: moment(ManageNewsStories?.createddate).format(
      'MMMM DD yyyy',
    ),
    tertiaryText: 'Online',
    optionalText: 'Available at 4:00pm',
  };

  return (
    <div className={'ms-Grid-row '}>
      <div className="ms-Grid-col ms-lg12 container customScroll">
        <div className={'ms-Grid-col ms-lg9 main-container customScroll '}>
          <div className={'ms-Grid-row ' + classes.newsDiv}>
            <div className={'ms-Grid-col ms-lg12 ' + classes.arrowDiv}>
              <div className="ms-Grid-col ms-lg6">
                <ActionButton className={'btnPlain btnInfo'} allowDisabledFocus>
                  <FontIcon className={classes.leftArrow} iconName="Back" />
                  <span className={'padl5'}> </span>
                  <label className={classes.prevLabel}>
                    {intl(LabelNames.previouspost)}
                  </label>
                </ActionButton>
              </div>

              <div className={'ms-Grid-col ms-lg6 ' + classes.rightArrowDiv}>
                <ActionButton className={'btnPlain btnInfo'} allowDisabledFocus>
                  <label className={classes.nextLabel}>
                    {intl(LabelNames.nextpost)}
                  </label>
                  <span className={'padl5'}> </span>
                  <FontIcon className={classes.leftArrow} iconName="Forward" />
                </ActionButton>
              </div>
            </div>
          </div>
          <hr className={classes.dividerNewsDetails} />
          <div className={classes.bgColor}>
            <div className={classes.headerTitle}>
              <p className={classes.newsTitle}>{ManageNewsStories?.title}</p>
              <p className={classes.schoolName}>{ManageNewsStories?.desc}</p>

              <div className={'ms-Grid-row ' + classes.newsDiv}>
                <div className="ms-Grid-col ms-sm12  ms-lg12">
                  <div className="ms-Grid-col ms-lg2">
                    <div className="newsDetailsPersona">
                      <Persona
                        {...examplePersona}
                        size={PersonaSize.size40}
                        presence={PersonaPresence.online}
                        imageAlt="Annie Lindqvist, status is away"
                      />
                    </div>
                  </div>
                  <div
                    className={'ms-Grid-col ms-lg6 ' + classes.labeliconMargin}>
                    <label className={'card-title ' + classes.newsLabel}>
                      <i
                        className={
                          'ms-Icon ms-Icon--' +
                          ManageNewsStories?.icon +
                          ' ' +
                          classes.newsIcon
                        }
                        aria-hidden="true"
                      />
                      School News
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={'avatarEdit ' + classes.imagecontainer}>
              <AvatarEditor
                image={ManageNewsStories?.img}
                scale={Number(ManageNewsStories?.featuredscale)}
                width={950}
                height={350}
                border={0}
                position={newsposition}
              />
              <div className={classes.after} />
            </div>

            <div className={classes.calendarList}>
              <div className={'ms-Grid-row ' + classes.newsDiv}>
                <div className="ms-Grid-col ms-sm12  ms-lg12">
                  <div className="ms-Grid-row ">
                    <div className="ms-Grid-col ms-sm12  ms-lg12 bclist pad10">
                      {parse(ManageNewsStories?.content)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={'ms-Grid-row ' + classes.newsDiv}>
            <div
              className={'ms-Grid-col ms-lg12 ' + classes.relatedPostContainer}>
              <span className={classes.relatedPostlbl}>
                {intl(LabelNames.relatedPosts)}
              </span>
            </div>
          </div>

          <div className={'ms-Grid-row ' + classes.newsDiv}>
            <div className="ms-Grid-col ms-lg12">{newsSmall}</div>
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

export default NewsDetails;
