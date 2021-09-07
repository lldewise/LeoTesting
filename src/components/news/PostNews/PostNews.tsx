import React, { useState, useEffect, useLayoutEffect } from 'react';
import classes from './PostNews.module.scss';
import logger from 'loglevel';
import {
  DocumentCard,
  DocumentCardTitle,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import moment from 'moment';
import AvatarEditor from 'react-avatar-editor';
import { useStore } from '../../../store/store';
import { UPDATEMANAGESTORIES } from '../../../store/AdminAndTeacherStore/News/newsAction';
import { useHistory } from 'react-router-dom';

const PostNews = React.memo((props: any) => {
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const history = useHistory();
  const examplePersona = {
    imageUrl: undefined,
    imageInitials: props.item.initial,
  };

  const [width, setWidth] = useState(Number(900));
  //eslint-disable-next-line
  const [height, setHeight] = useState(Number(200));
  //eslint-disable-next-line
  const [newsposition, setNewsPosition] = useState({
    x: Number(props.item.thumb1x),
    y: Number(props.item.thumb1y),
  });

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
    setWidth(size[0] * 0.2);
    setHeight(size[0] * 0.5);
  }, [size]);

  let iconName = null;
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

  function handleClick() {
    dispatch(UPDATEMANAGESTORIES, props.item);
    history.push('./newsdetails');
  }

  logger.log(props);
  return (
    <div className={classes.newContent} onClick={handleClick}>
      <DocumentCard
        className={classes.documentRaduis}
        aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago.">
        <div>
          <div className={classes.imageDiv}>
            <AvatarEditor
              image={props.item.img}
              scale={Number(props.item.thumb1scale)}
              width={width}
              height={195}
              border={0}
              position={newsposition}
            />
          </div>
        </div>
        <div className={classes.divNewsCard}>
          <DocumentCardTitle
            className={classes.padTBTitle}
            title={props.item.title}
            shouldTruncate
          />
          <div className={'ms-Grid-row ' + classes.rowPostCardDetails}>
            <div className={'ms-Grid-col ms-lg-12 ' + classes.padBName}>
              <div className="ms-Grid-col  ms-lg-1 ">
                <div className={classes.imagePad}>
                  <Persona
                    {...examplePersona}
                    size={PersonaSize.size32}
                    hidePersonaDetails={true}
                  />
                </div>
              </div>
              <div className="ms-Grid-col  ms-lg-11 ">
                <div className="ms-Grid-row">
                  <span className={classes.personaName}>{props.item.name}</span>
                </div>
                <div className="ms-Grid-row">
                  <span className={classes.personSecondary}>
                    {moment(props.item.publishdate).format('MMMM YYYY')}
                  </span>
                  <span className={'pad10 ' + classes.personSecondary}>
                    <FontIcon
                      className={classes.fontIcon}
                      iconName={iconName}
                    />
                  </span>
                  <span
                    className={classes.personSecondary + ' ' + classes.newtyoe}>
                    {categoryName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentCard>
    </div>
  );
});

export default PostNews;
