import React from 'react';
import { Fragment, useState } from 'react';
import classes from './SubstitutionCard.module.scss';
import { Stack, ActionButton, FontIcon, IFontWeight, FontWeights } from '@fluentui/react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  PersonaSize,
  PersonaInitialsColor,
  Persona,
} from 'office-ui-fabric-react/lib/Persona';
import { facepilePersonas } from '@uifabric/example-data';
import {
  Facepile,
  IFacepilePersona,
  OverflowButtonType,
} from 'office-ui-fabric-react/lib/Facepile';
import { TestImages } from '@uifabric/example-data';
import ill_persona from '../../../../assets/images/illpersona.png';
import { Callout } from 'office-ui-fabric-react';
import { DirectionalHint } from '@fluentui/react';
import { useStore } from '../../../../store/store';
import moment from 'moment';
import FullCalendar, {
  CustomContentGenerator,
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import i18n from '../../../../i18n/i18n';
import allLocales from '@fullcalendar/core/locales-all';
import './SubstitutionCard.scss';
import { AnyCnameRecord } from 'dns';

const lang = i18n.language.split('_');
moment.locale(lang[0]);

const SubstitutionCard: React.FC = () => {
  const [initData] = useStore();
  const [data] = useState(initData.eventsList);
  const [isToggleSubstitute, setIsToggleSubstitute] = useState(false);

  const overflow = OverflowButtonType.descriptive;
  const overflowButtonProps = {
    ariaLabel: 'More users',
  };

  function handleClickSubstituted() {
    setIsToggleSubstitute(!isToggleSubstitute);
  }

  const examplePersona1 = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'KM',
  };

  const examplePersona2 = {
    imageUrl: TestImages.personaMale,
    imageInitials: 'KM',
    text: 'Kirsten Moller',
  };

  const examplePersona3 = {
    imageInitials: 'HP',
  };

  const sharedPersonaProps = {
    size: PersonaSize.size32,
    styles: {
      root: {
        width: 25,
        margin: 2,
      },
    },
  };

  const filterData = data.filter(
    a =>
      moment(a.start).format('YYYY-MM-DD') ===
        moment(new Date()).format('YYYY-MM-DD') && a.title === 'English',
  );

  return (
    <>
      <div className="card-default">
        <div
          className={
            'ms-Grid-row card-default-body ' +
            classes.BgColor +
            ' ' +
            classes.container
          }>
          <div
            className={
              'ms-Grid-col ms-sm12 ms-xl4 ms-xxl5  ' +
              classes.illnessCountContainer
            }>
            <img
              className={'ms-hiddenLgDown ' + classes.imgStyle}
              alt=""
              src={ill_persona}
            />
            <article className={'' + classes.content}>
              <Label className={classes.NumberOfIll}>6</Label>
              <br />
              <b>Teachers are ill today. </b>
              <br />
              Please cancel the class or find a substitute.
            </article>
          </div>
          <div className={'ms-Grid-col ms-sm12 ms-xl8 ms-xxl7 '}>
            <div className={'' + classes.illnessTeacherContainer}>
              <ActionButton
                className={'btnPlain ' + classes.teacherBtn}
                onClick={handleClickSubstituted}
                id="linkToggle">
                <Stack verticalAlign="center" className={classes.personaSpace}>
                  <Stack horizontal horizontalAlign="center">
                    <Stack.Item>
                      <Persona
                        className={classes.imgOpacity}
                        {...examplePersona1}
                        text=""
                        size={PersonaSize.size40}
                      />
                    </Stack.Item>
                    <Stack.Item align="center">
                      <span className={classes.padRight}>
                        <FontIcon
                          className={classes.purple}
                          id="drillTrough"
                          iconName="DrillThrough"
                        />
                      </span>
                    </Stack.Item>
                    <Stack.Item>
                      <Persona
                        {...examplePersona2}
                        text=""
                        size={PersonaSize.size40}
                      />
                    </Stack.Item>
                  </Stack>
                  {isToggleSubstitute && (
                    <Callout
                      className={classes.callout}
                      role="alertdialog"
                      gapSpace={0}
                      target={'#drillTrough'}
                      setInitialFocus
                      directionalHint={DirectionalHint.leftCenter}
                      directionalHintFixed={false}>
                      <div>
                        <div className={classes.teacherContainer}>
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' + classes.sickTeacher
                            }>
                            <Persona
                              className={classes.imgOpacity}
                              {...examplePersona1}
                              text="Kristen Moller"
                              secondaryText="Sick Leave"
                              size={PersonaSize.size40}
                            />
                          </div>
                          <div
                            className="ms-Grid-col ms-lg12"
                            style={{ display: 'flex' }}>
                            <div className="ms-Grid-col ms-lg11">
                              <Persona
                                {...examplePersona2}
                                text="Alex Andersen"
                                secondaryText="Substitute"
                                size={PersonaSize.size40}
                              />
                            </div>
                            <div
                              className={
                                'ms-Grid-col ms-lg1 ' + classes.btnSubstitute
                              }>
                              <button className={classes.btnEdit}>
                                <FontIcon iconName="Edit" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={'ms-Grid-row ' + classes.calloutContainer}>
                          <div className="calendarDayView">
                            <FullCalendar
                              plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                              ]}
                              headerToolbar={{
                                left: '',
                                center: '',
                                right: '',
                              }}
                              locale={lang[0]}
                              locales={allLocales}
                              initialView={'timeGridDay'}
                              initialEvents={filterData}
                              dayMaxEvents={false}
                              eventContent={renderEventContent}
                              forceEventDuration={true}
                              displayEventTime={true}
                              allDaySlot={false}
                              scrollTime={'07:00:00'}
                              slotMinTime={'07:00:00'}
                              slotMaxTime={'20:00:00'}
                            />
                          </div>
                        </div>
                      </div>
                    </Callout>
                  )}
                  <div className={classes.userDetails}>
                    <label>
                      <b>Kirsten Moller</b>
                    </label>{' '}
                    <br />
                    <small>English Teacher</small>
                  </div>
                </Stack>
              </ActionButton>
              <ActionButton
                className={
                  'btnPlain ' +
                  classes.teacherBtn +
                  ' ' +
                  classes.contentContainer
                }
                onClick={handleClickSubstituted}>
                <Stack horizontalAlign="center">
                  <Persona
                    {...examplePersona3}
                    hidePersonaDetails
                    size={PersonaSize.size40}
                  />
                  <div className={classes.user2ndDetails}>
                    <label>
                      <b>Helle Pedersen</b>
                    </label>{' '}
                    <br />
                    <small>History Teacher</small>
                  </div>
                </Stack>
              </ActionButton>
              <div
                className={classes.contentContainer + ' ' + classes.teacherBtn}>
                <div className={classes.wrap}>
                  <Stack horizontal wrap horizontalAlign="center">
                    <Stack.Item>
                      {' '}
                      <Persona
                        initialsColor={PersonaInitialsColor.green}
                        {...sharedPersonaProps}
                        text="green10"
                        imageAlt="Green circle with the letter G in white text at the center"
                      />
                    </Stack.Item>
                    <Stack.Item>
                      {' '}
                      <Persona
                        initialsColor={PersonaInitialsColor.darkGreen}
                        {...sharedPersonaProps}
                        text="darkGreen20"
                        imageAlt="Dark green circle with the letter D in white text at the center"
                      />
                    </Stack.Item>
                    <Stack.Item>
                      <Persona
                        initialsColor={PersonaInitialsColor.darkGreen}
                        {...sharedPersonaProps}
                        text="darkGreen20"
                        imageAlt="Dark green circle with the letter D in white text at the center"
                      />
                    </Stack.Item>
                    <Stack.Item className={classes.facePile}>
                      <Facepile
                        personaSize={PersonaSize.size32}
                        personas={facepilePersonas as IFacepilePersona[]}
                        maxDisplayablePersonas={0}
                        overflowButtonType={overflow}
                        overflowButtonProps={overflowButtonProps}
                        ariaDescription={
                          'To move through the items use left and right arrow keys.'
                        }
                        ariaLabel={'Example list of Facepile personas'}
                      />{' '}
                    </Stack.Item>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function renderEventContent(eventInfo: any) {
  const col = eventInfo?.event?.borderColor;
  const calendarIcon = {
    fontSize: '12px',
    fontWeight: 'bold' as any,
    color: col,
    margin: '10px',
  };

  return (
    <div className={`event-card type-${eventInfo.event.groupId}`}>
      {eventInfo.timeText !== '' &&
      eventInfo.event.groupId !== 'private' &&
      eventInfo.event.groupId !== 'exam' ? (
        <div className="event-title scheduled">
          <FontIcon iconName="SkypeCircleClock" style={calendarIcon} />
            <span className="ms-fontWeight-semibold">
              {eventInfo.event.title}
            </span>
          <br />
        </div>
      ) : (
        <div className="event-title no-sched">
          <span className="ms-fontWeight-semibold">
            {eventInfo.event.title}
          </span>
          <br />
        </div>
      )}
      <div className="event-details">
        <span className="event-time">{eventInfo.timeText}</span>
        <span className="event-loc">
          {eventInfo.timeText !== '' ? <FontIcon iconName="POI" /> : null}
          {eventInfo.event.extendedProps.location}
        </span>
      </div>
    </div>
  );
}
export { SubstitutionCard };
