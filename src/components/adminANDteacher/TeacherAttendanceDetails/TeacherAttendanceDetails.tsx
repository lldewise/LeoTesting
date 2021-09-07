import React, { Fragment } from 'react';
import {
  Callout,
  Link,
  IconButton,
  DefaultButton,
} from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import styles from './TeacherAttendanceDetails.module.scss';
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
import word from '../../../assets/images/office/word.png';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../store/store';
import helle from '../../../assets/images/persona/helle.png';
import moment from 'moment';
//import { intl } from "../../../util/commonFunction";
//import { LabelNames } from "../../../util/constant";

type TeacherAttendanceDetailProps = {
  id: string | undefined;
  title: string | null;
  timeSched: string | null;
  location: string | null;
  isSubjectToggle: boolean;
  targetEl: string | null;
  todos: any[];
  selectedDate: Date | null;
  hasConfirmed: boolean | null;
  handleDetailsCalloutVisible: () => void;
  start: string | undefined;
  end: string | undefined;
  week: number | undefined;
};

const TeacherAttendanceDetails: React.FC<TeacherAttendanceDetailProps> =
  items => {
    const {
      id,
      title,
      timeSched,
      location,
      isSubjectToggle,
      targetEl,
      todos,
      selectedDate,
      hasConfirmed,
      handleDetailsCalloutVisible,
      start,
      end,
      week,
    } = items;
    const history = useHistory();
    const [teacherProfile, dispatch] = useStore();

    const onRenderCell = (item: any, renderClick: any) => {
      return (
        <Link>
          <div className={styles.itemhover}>
            <div className={styles.itemCell} data-is-focusable={true}>
              <div className={styles.itemImage}>
                <FontIcon className={styles.itemIcon} iconName={item.icon} />
              </div>
              <div className={styles.itemContent}>
                <div className={styles.itemName}>{item.name}</div>
                {items.hasConfirmed ? (
                  <div className={styles.itemIndexConfirm}>Confirmed</div>
                ) : (
                  <div className={styles.itemIndex}>{item.dueDate}</div>
                )}
              </div>
              <div>
                <div className={styles.itemDetails} />
              </div>
            </div>
          </div>
        </Link>
      );
    };

    const teacherPersona = {
      imageUrl: helle,
      imageInitials: teacherProfile.teacherProfile.imageInitials,
      text: teacherProfile.teacherProfile.text,
      secondaryText: teacherProfile.teacherProfile.secondaryText,
      tertiaryText: teacherProfile.teacherProfile.tertiaryText,
    };

    const onClickAbsenceRegistration = (item: any) => {
      if (item.target.innerText !== '') {
        if (item.target.innerText === 'Absence Registration') {
          const data = {
            id: id,
            date: moment(selectedDate).format('YYYY-MM-DD'),
            day: moment(selectedDate).format('ddd'),
            time: timeSched,
            location: location,
            late: '',
            week: week,
            start: start,
            end: end,
            confirmed: !hasConfirmed,
          };
          dispatch('ClassesUpdateSelectedDate', data);
          dispatch('ClassesUpdateSelectedSubject', title);
          dispatch('ClassesSelectedTab', '5');
          dispatch('UPDATE_NAVIGATION', '3');

          history.push('./classes');
        }
      }
    };

    function handleClick() {
      alert('Download in progress implementation...');
    }

    function handleExpand() {
      const data = {
        id: id,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        day: moment(selectedDate).format('ddd'),
        time: timeSched,
        location: location,
        late: '',
        confirmed: hasConfirmed,
      };
      dispatch('ClassesUpdateSelectedDate', data);
      dispatch('ClassesUpdateSelectedSubject', title);
      dispatch('ClassesSelectedTab', '1');
      dispatch('UPDATE_NAVIGATION', '3');

      history.push('./classes');
    }

    function gotoClassSubject(value: any) {
      const data = {
        id: id,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        day: moment(selectedDate).format('ddd'),
        time: timeSched,
        location: location,
        late: '',
        confirmed: hasConfirmed,
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
                    gotoClassSubject(title);
                  }}>
                  {title}
                </Link>
                <IconButton
                  className={styles.fullScreenIcon}
                  onClick={handleExpand}
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
                          onClickAbsenceRegistration(e);
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
                "No late comers allowed! Bring your English 101 Book. Please
                study the attached file."
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

export default TeacherAttendanceDetails;
