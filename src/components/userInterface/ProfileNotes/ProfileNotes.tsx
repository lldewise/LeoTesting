import React, { Fragment, useEffect, useState } from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './ProfileNotes.module.scss';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import logger from 'loglevel';

type ProfileNotesProps = {
  item: any;
};

const ProfileNotes: React.FC<ProfileNotesProps> = props => {
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
            dangerouslySetInnerHTML={{ __html: props.item.comments }}></div>
          <div className="fade"></div>
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
        dangerouslySetInnerHTML={{ __html: props.item.comments }}></div>,
    );
  }, [props.item.comments]);

  const seeMoreHandler = (value: any) => {
    const comment = <div dangerouslySetInnerHTML={{ __html: value }}></div>;
    setDivComment(comment);
    setseeMore(hideMoreDiv);
  };

  const hideHandler = (value: any) => {
    const comment = (
      <div>
        <div
          className={classes.divComment}
          dangerouslySetInnerHTML={{ __html: value }}></div>
        <div className="fade"></div>
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
                  <div className={'ms-Grid-col ms-lg1 ' + classes.imgStyle}>
                    <Persona
                      {...examplePersona}
                      size={PersonaSize.size48}
                      presence={props.item.status}
                      hidePersonaDetails={true}
                    />
                  </div>
                  <div className="ms-Grid-col ms-lg10">
                    <div className={classes.divname}>
                      <span className={classes.name}>{props.item.name}</span>{' '}
                      {intl(LabelNames.postedThis)}{' '}
                    </div>
                    <div className={classes.personadetail}>
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
};

export default ProfileNotes;
