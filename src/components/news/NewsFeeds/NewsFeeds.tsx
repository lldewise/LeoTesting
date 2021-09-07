import React, { Fragment, useEffect, useState } from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './NewsFeeds.module.scss';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import logger from 'loglevel';

type NewsFeedsProps = {
  item: any;
};

const NewsFeeds: React.FC<NewsFeedsProps> = React.memo(props => {
  const [divHeight, setDivHeight] = useState(0);
  const [divComment, setDivComment] = useState<JSX.Element>();
  const [seeMore, setseeMore] = useState<JSX.Element>();
  const examplePersona = {
    imageUrl: props.item.persona,
    imageInitials: props.item.initial,
  };

  const getDivHeight = (divElement: any) => {
    if (divElement) {
      setDivHeight(divElement.clientHeight);
    }
  };

  useEffect(() => {
    if (divHeight > 87) {
      logger.log('Ulit ');
      logger.log(props.item.comments);
      const comment = (
        <div>
          <div
            className={classes.divComment}
            dangerouslySetInnerHTML={{ __html: props.item.comments }}
          />
          <div className="fade" />
        </div>
      );
      setDivComment(comment);
      setseeMore(seeMoreDiv);
    }
  }, [divHeight]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDivComment(
      <div
        ref={divElement => {
          getDivHeight(divElement);
        }}
        dangerouslySetInnerHTML={{ __html: props.item.comments }}
      />,
    );
  }, [props.item.comments]);

  const seeMoreHandler = (value: any) => {
    const comment = <div dangerouslySetInnerHTML={{ __html: value }} />;
    setDivComment(comment);
    setseeMore(hideMoreDiv);
  };

  const hideHandler = (value: any) => {
    const comment = (
      <div>
        <div
          className={classes.divComment}
          dangerouslySetInnerHTML={{ __html: value }}
        />
        <div className="fade" />
      </div>
    );
    setDivComment(comment);
    setseeMore(seeMoreDiv);
  };

  const seeMoreDiv = () => {
    const updatedSeeMore = (
      <div
        className={'ms-Grid-col ms-lg12 ' + classes.seeMore}
        onClick={() => {
          seeMoreHandler(props.item.comments);
        }}>
        {' '}
        {intl(LabelNames.seeMore)}
      </div>
    );
    return updatedSeeMore;
  };

  const hideMoreDiv = () => {
    const updatedSeeMore = (
      <div
        className={'ms-Grid-col ms-lg12 ' + classes.seeMore}
        onClick={() => {
          hideHandler(props.item.comments);
        }}>
        {' '}
        {intl(LabelNames.seeLess)}
      </div>
    );
    return updatedSeeMore;
  };

  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
          <div className="ms-Grid-row">
            <div className={'ms-Grid-col ms-lg12 ' + classes.containerPad}>
              <div className="ms-Grid-row">
                <div className={'ms-Grid-col ms-lg12 '}>
                  <div className="ms-Grid-col ms-lg1">
                    <Persona
                      {...examplePersona}
                      size={PersonaSize.size48}
                      presence={props.item.status}
                      hidePersonaDetails={true}
                    />
                  </div>
                  <div className="ms-Grid-col ms-lg11">
                    <div className={classes.divname}>
                      <span className={classes.name}>{props.item.name}</span>{' '}
                      {intl(LabelNames.postedThis)}{' '}
                    </div>
                    <div className={classes.personadetail}>
                      <span className="padR6">
                        <FontIcon
                          className={classes.fontIcon}
                          iconName="People"
                        />
                      </span>
                      <span className="padR6">{intl(LabelNames.shared)}</span>
                      <span className="padR6">
                        <FontIcon
                          className={classes.fontIcon}
                          iconName="LocationDot"
                        />
                      </span>
                      <span>{props.item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12">{divComment}</div>
              </div>
              <div className="ms-Grid-row">{seeMore}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default NewsFeeds;
