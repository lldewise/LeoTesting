import React, { Fragment } from 'react';
import { Callout, Link } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import styles from './SubjectDetail.module.scss';
import { DirectionalHint } from '@fluentui/react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import word from '../../../assets/images/office/word.png';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../store/store';
import helle from '../../../assets/images/persona/helle.png';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

type SubjectDetailProps = {
  id: string,
  title: string,
  timeSched: string,
  location: string,
  isSubjectToggle: boolean,
  targetEl: any,
  todos: any[] | undefined,
  selectedDate: string,
  handleDetailsCalloutVisible: () => void,
};

const SubjectDetail: React.FC<SubjectDetailProps> = items => {
  const history = useHistory();
  const [teacherProfile, dispatch] = useStore();

  const {
    title,
    timeSched,
    location,
    isSubjectToggle,
    targetEl,
    todos,
    handleDetailsCalloutVisible,
  } = items;

  const teacherPersona = {
    imageUrl: helle,
    imageInitials: teacherProfile.teacherProfile.imageInitials,
    text: teacherProfile.teacherProfile.text,
    secondaryText: teacherProfile.teacherProfile.secondaryText,
    tertiaryText: teacherProfile.teacherProfile.tertiaryText,
  };

  const onRenderCell = (item: any) => {
    return (
      <div className={styles.itemhover}>
        <div className={styles.itemCell} data-is-focusable={true}>
          <div className={styles.itemImage}>
            <Image
              className={styles.itemImage}
              src={item.thumbnail}
              width={45}
              height={45}
              imageFit={ImageFit.cover}
            />
          </div>
          <div className={styles.itemContent}>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.itemIndex}>{item.dueDate}</div>
          </div>
          <div>
            <div className={styles.itemDetails} />
          </div>
        </div>
      </div>
    );
  };

  function handleClick() {
    alert('Download in progress implementation...');
  }

  function handleExpand() {
    dispatch('UPDATE_NAVIGATION', '3');
    dispatch('ClassesUpdateSelectedSubject', title);
    history.push('./classes');
    handleDetailsCalloutVisible();
  }

  function gotoClasseSubject(value: any) {
    dispatch('ClassesUpdateSelectedDate', {});
    dispatch('ClassesUpdateSelectedSubject', value);
    dispatch('UPDATE_NAVIGATION', '3');

    history.push('./classes');
    handleDetailsCalloutVisible();
  }

  function onDismissCallout() {
    handleDetailsCalloutVisible();
  }

  return (
    <>
      {isSubjectToggle && (
        <Callout
          className={styles.callout}
          role="alertdialog"
          gapSpace={0}
          target={targetEl}
          setInitialFocus
          directionalHint={DirectionalHint.leftCenter}
          directionalHintFixed={false}
          onDismiss={onDismissCallout}>
          <div className={styles.subjectDetail}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              <div
                className={'ms-Grid-col ms-lg10 ' + styles.subjectTitle}
                onClick={() => {
                  gotoClasseSubject(title);
                }}>
                {title}
              </div>
              <div className={'ms-Grid-col ms-lg2 ' + styles.iconExp}>
                <Link
                  className={styles.fullScreenIcon}
                  target="_blank"
                  onClick={handleExpand}>
                  <FontIcon iconName="FullScreen" />
                </Link>
              </div>
            </div>
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              <div className="ms-Grid-col ms-lg10">
                <FontIcon iconName="Clock" className={styles.calendarIcon} />
                {timeSched} &nbsp;
                <FontIcon iconName="POI" className={styles.locationIcon} />
                {location}
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              <div className={'ms-Grid-col ms-lg12 ' + styles.todoTitle}>
                {intl(LabelNames.toDo)}
              </div>
              <div className="ms-Grid-row ">
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div className={styles.container} data-is-scrollable>
                    <List items={todos} onRenderCell={onRenderCell} />
                  </div>
                </FocusZone>
              </div>
              <div className="ms-Grid-row ">
                <Link
                  className={styles.linkMore}
                  href="http://microsoft.com"
                  target="_blank">
                  +2 more
                </Link>
              </div>
            </div>
            <hr className={styles.divider} />
            <div>
              <Persona
                {...teacherPersona}
                size={PersonaSize.size32}
                presence={PersonaPresence.online}
                imageAlt="Annie Lindqvist, status is online"
              />
            </div>
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              "No late comers allowed! Bring your English 101 Book. Please study
              the attached file."
            </div>
            <div className={styles.uploadContainer} onClick={handleClick}>
              <img src={word} alt={word} className={styles.imgUploaded} />
              <div className={styles.uploadedFileName}>
                <span>Study Reference.docx </span>
              </div>
            </div>
          </div>
        </Callout>
      )}
    </>
  );
};

export default SubjectDetail;
