import React, { Fragment } from 'react';
import {
  Callout,
  DefaultButton,
  IconButton,
  Link,
} from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import styles from './AdminSubjectDetails.module.scss';
import { DirectionalHint } from '@fluentui/react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import word from '../../../../assets/images/office/word.png';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../../store/store';
import helle from '../../../../assets/images/persona/helle.png';
//import { intl } from "../../../../util/commonFunction";
//import { LabelNames } from "../../../../util/constant";
import moment from 'moment';

import i18n from '../../../../i18n/i18n';

type SubjectDetailProps = {
  id: string | null;
  title: string | null;
  timeSched: string | null;
  location: string | null;
  isSubjectToggle: boolean;
  targetEl: any;
  todos: any[];
  selectedDate: Date | null;
  week: number | null;
  start: string | null;
  end: string | null;
  confirmed: boolean;
  handleDetailsCalloutVisible: () => void;
};

const AdminSubjectDetails: React.FC<SubjectDetailProps> = items => {
  const {
    id,
    title,
    timeSched,
    location,
    isSubjectToggle,
    targetEl,
    todos,
    selectedDate,
    handleDetailsCalloutVisible,
    week,
    start,
    end,
    confirmed,
  } = items;
  const history = useHistory();
  const [teacherProfile, dispatch] = useStore();

  const teacherPersona = {
    imageUrl: helle,
    imageInitials: teacherProfile.teacherProfile.imageInitials,
    text: teacherProfile.teacherProfile.text,
    secondaryText: teacherProfile.teacherProfile.secondaryText,
    tertiaryText: teacherProfile.teacherProfile.tertiaryText,
  };

  const onRenderCell = (item: any) => {
    return (
      <Link className={styles.adminSubjectLink}>
        <div className={styles.itemhover}>
          <div className={styles.itemCell} data-is-focusable={true}>
            <div className="list-task-icon">
              <FontIcon className={styles.itemIcon} iconName={item.icon} />
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
      </Link>
    );
  };

  const onClickAbsenceRegistration = (
    item: any,
    id: string | null,
    title: string | null,
    timeSched: string | null,
    location: string | null,
    selectedDate: Date | null,
  ) => {
    const data = {
      id: id,
      date: selectedDate,
      day: moment(selectedDate).format('ddd'),
      time: timeSched,
      location: location,
      late: '',
      week: week,
      start: start,
      end: end,
      confirmed: confirmed,
    };

    dispatch('ClassesUpdateSelectedDate', data);
    dispatch('ClassesUpdateSelectedSubject', title);
    dispatch('ClassesSelectedTab', '5');
    dispatch('UPDATE_NAVIGATION', '3');

    history.push(`/${i18n.language}/classes/${title}/lessons/${id}/attendance`);
  };

  function handleClick() {
    alert('Download in progress implementation...');
  }

  function handleExpand(
    id: string | null,
    title: string | null,
    timeSched: string | null,
    location: string | null,
    selectedDate: Date | null,
  ) {
    handleDetailsCalloutVisible();
    const data = {
      id: id,
      date: selectedDate,
      day: moment(selectedDate).format('ddd'),
      time: timeSched,
      location: location,
      late: '',
    };
    dispatch('ClassesUpdateSelectedDate', data);
    dispatch('ClassesUpdateSelectedSubject', title);
    dispatch('ClassesSelectedTab', '1');
    dispatch('UPDATE_NAVIGATION', '3');
    history.push('./classes');
  }

  function gotoClassSubject(
    id: string | null,
    title: string | null,
    timeSched: string | null,
    location: string | null,
    selectedDate: Date | null,
  ) {
    handleDetailsCalloutVisible();
    const data = {
      id: id,
      date: selectedDate,
      day: moment(selectedDate).format('ddd'),
      time: timeSched,
      location: location,
      late: '',
    };
    dispatch('ClassesUpdateSelectedDate', data);
    dispatch('ClassesUpdateSelectedSubject', title);
    dispatch('ClassesSelectedTab', '1');
    dispatch('UPDATE_NAVIGATION', '3');
    history.push('./classes');
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
            <div className={styles.eventTitle}>
              <Link
                className={'btnLinkDark ' + styles.subjectTitle}
                onClick={() => {
                  gotoClassSubject(
                    id,
                    title,
                    timeSched,
                    location,
                    selectedDate,
                  );
                }}>
                {title}
              </Link>
              <IconButton
                className={styles.fullScreenIcon}
                onClick={() =>
                  handleExpand(id, title, timeSched, location, selectedDate)
                }
                iconProps={{ iconName: 'FullScreen' }}
              />
            </div>
            <div className={'gray-dark-text ' + styles.alignCenter}>
              <FontIcon iconName="Clock" className={styles.calendarIcon} />
              {timeSched} &nbsp;
              <FontIcon iconName="POI" className={styles.locationIcon} />
              {location}
            </div>
            <hr className={styles.divider} />
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              <div className={'ms-Grid-col ms-lg12 ' + styles.todoTitle}>
                My Tasks
              </div>
              <div className="ms-Grid-row ">
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div className={styles.container} data-is-scrollable>
                    <List
                      items={todos}
                      onRenderCell={onRenderCell}
                      onClick={e => {
                        onClickAbsenceRegistration(
                          e,
                          id,
                          title,
                          timeSched,
                          location,
                          selectedDate,
                        );
                      }}
                    />
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
                size={PersonaSize.size40}
                presence={PersonaPresence.online}
                secondaryText="2 days ago"
                imageAlt="Annie Lindqvist, status is online"
              />
            </div>
            <div className={'ms-Grid-col ms-lg12 ' + styles.mTop15}>
              "No late comers allowed! Bring your English 101 Book. Please study
              the attached file."
            </div>
            <DefaultButton
              className={styles.uploadContainer}
              onClick={handleClick}>
              <img src={word} alt={word} className={styles.imgUploaded} />
              <div className={styles.uploadedFileName}>
                <span>Study Reference.docx </span>
              </div>
            </DefaultButton>
          </div>
        </Callout>
      )}
    </>
  );
};

export default AdminSubjectDetails;
