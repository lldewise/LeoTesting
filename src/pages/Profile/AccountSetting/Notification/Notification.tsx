import React, { Fragment, useEffect, useState } from 'react';
import { ActionButton, PrimaryButton } from 'office-ui-fabric-react';

import classes from './Notification.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import { Layer, Toggle, FontIcon } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import apiUser from '../../../../services/apiUser';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

type NotificationProps = {
  usernotification: any;
  user: any;
  gotoProfile: any;
};

const Notification: React.FC<NotificationProps> = props => {
  const { principal } = useAuthentication();
  const [showLayer, { toggle: toggleShowLayer }] = useBoolean(false);
  const [showLayer1, { toggle: toggleShowLayer1 }] = useBoolean(true);
  const [showLayer2, { toggle: toggleShowLayer2 }] = useBoolean(true);
  const [showLayer3, { toggle: toggleShowLayer3 }] = useBoolean(true);
  const [aboutpost, setAboutPost] = useState();
  const [reminder, setReminder] = useState();
  const [events, setEvents] = useState();
  const [classUpdate, setClassUpdate] = useState();
  const [notificationValue, setNotificationValue] = useState(
    props.usernotification?.notification,
  );
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useState(false);

  const dialogContent = {
    type: DialogType.normal,
    title: 'Do you want to save your changes?',
    closeButtonAriaLabel: 'Close',
    subText: 'This will replace all current details!',
  };

  const getCollectionToggle = (key: any, value: any, check: any) => {
    const updateData = notificationValue;
    switch (key) {
      case 'aboutPost':
        check
          ? updateData.aboutPost.push(value)
          : updateData.aboutPost.splice(
              removeItemNotification(updateData.aboutPost, value),
              1,
            );
        break;
      case 'reminders':
        check
          ? updateData.reminders.push(value)
          : updateData.reminders.splice(
              removeItemNotification(updateData.reminders, value),
              1,
            );
        break;
      case 'events':
        check
          ? updateData.events.push(value)
          : updateData.events.splice(
              removeItemNotification(updateData.events, value),
              1,
            );
        break;
      case 'classUpdate':
        check
          ? updateData.classUpdate.push(value)
          : updateData.classUpdate.splice(
              removeItemNotification(updateData.classUpdate, value),
              1,
            );
        break;
      default:
        break;
    }
    setNotificationValue(updateData);
  };

  const removeItemNotification = (arrayItem: any, value: any) => {
    var index = arrayItem.findIndex((r: any) => r === value);
    return index;
  };

  useEffect(() => {
    var aboutview = toogleView(
      'aboutPost',
      props.usernotification?.notification.aboutPost,
    );
    setAboutPost(aboutview);
    setReminder(
      toogleView('reminders', props.usernotification?.notification.reminders),
    );
    setEvents(
      toogleView('events', props.usernotification?.notification.events),
    );
    setClassUpdate(
      toogleView(
        'classUpdate',
        props.usernotification?.notification.classUpdate,
      ),
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    var aboutview = toogleView(
      'aboutPost',
      props.usernotification?.notification.aboutPost,
    );
    setAboutPost(aboutview);
    setReminder(
      toogleView('reminders', props.usernotification?.notification.reminders),
    );
    setEvents(
      toogleView('events', props.usernotification?.notification.events),
    );
    setClassUpdate(
      toogleView(
        'classUpdate',
        props.usernotification?.notification.classUpdate,
      ),
    );
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  const toogleView: any = (column: any, arrayItem: any) => {
    var sms = false;
    var push = false;
    var email = false;
    var inapp = false;
    if (arrayItem !== undefined) {
      sms = arrayItem.includes('sms');
      push = arrayItem.includes('push');
      email = arrayItem.includes('email');
      inapp = arrayItem.includes('in-app');
    }

    var divToggle: any = (
      <div>
        <Toggle
          label={intl(LabelNames.sms)}
          inlineLabel
          defaultChecked={sms}
          onChange={(ev, value) => {
            getCollectionToggle(column, 'sms', value);
          }}
        />
        <Toggle
          label={intl(LabelNames.push)}
          inlineLabel
          defaultChecked={push}
          onChange={(ev, value) => {
            getCollectionToggle(column, 'push', value);
          }}
        />

        <Toggle
          label={intl(LabelNames.email)}
          inlineLabel
          defaultChecked={email}
          onChange={(ev, value) => {
            getCollectionToggle(column, 'email', value);
          }}
        />
        <Toggle
          label={intl(LabelNames.inApp)}
          inlineLabel
          defaultChecked={inapp}
          onChange={(ev, value) => {
            getCollectionToggle(column, 'in-app', value);
          }}
        />
      </div>
    );
    return divToggle;
  };

  const saveHandler = () => {
    toggleHideDialog();
  };

  const ConfirmHandler = () => {
    saveData();
  };

  const saveData = () => {
    var postData = {
      id: props.usernotification.id,
      userId: props.user.id,
      notifications: notificationValue,
    };

    apiUser
      .post(
        '/api/school/' + props.user.school + '/userSettingNotification',
        postData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(function (response) {
        // handle success
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {
        setSpinner(false);
        toggleHideDialog();
        // always executed
      });
  };

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContent}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        spinner={false}
        text={null}
      />

      <div className={'ms-Grid-row ' + classes.container}>
        <div className="ms-Grid-col ms-lg12 ms-md12 ">
          <div className={'ms-Grid-row ' + classes.containerSub}>
            <div className={'ms-Grid-col ms-lg12 '}>
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div className={classes.header}>
                    {intl(LabelNames.notification)}
                  </div>
                  <div className={classes.headerdesc}>
                    {intl(LabelNames.notificationDesc)}
                  </div>
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div
                    className="ms-Grid-col ms-lg3"
                    onClick={props.gotoProfile}>
                    <ActionButton
                      className="btnPlain btnInfo"
                      iconProps={{ iconName: 'Phone' }}
                      text={props.user.contactNo}
                    />
                  </div>
                  <div
                    className="ms-Grid-col ms-lg3"
                    onClick={props.gotoProfile}>
                    <ActionButton
                      className="btnPlain btnInfo"
                      iconProps={{ iconName: 'Mail' }}
                      text={props.user.email}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className={'ms-Grid-row '}>
                <div className={'ms-Grid-col ms-lg12 ' + classes.border}>
                  <div className={classes.hover}>
                    <div
                      className={classes.togglecontainer}
                      onClick={toggleShowLayer}>
                      <div className={classes.divWidth80}>
                        <div className={classes.panelHeader}>
                          {intl(LabelNames.aboutYourPost)}{' '}
                        </div>
                        <div>{intl(LabelNames.aboutYourPostDesc)} </div>
                      </div>
                      <div className={classes.divWidth20}>
                        {showLayer ? (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickDown"
                          />
                        ) : (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickUp"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {showLayer ? (
                    <Layer></Layer>
                  ) : (
                    <div className={classes.pad12}>{aboutpost}</div>
                  )}
                </div>
              </div>

              <br />
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + classes.border}>
                  <div className={classes.hover}>
                    <div
                      className={classes.togglecontainer}
                      onClick={toggleShowLayer1}>
                      <div className={classes.divWidth80}>
                        <div className={classes.panelHeader}>
                          {intl(LabelNames.reminders)}
                        </div>
                        <div>{intl(LabelNames.remindersDesc)}</div>
                      </div>
                      <div className={classes.divWidth20}>
                        {showLayer1 ? (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickDown"
                          />
                        ) : (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickUp"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {showLayer1 ? (
                    <Layer></Layer>
                  ) : (
                    <div className={classes.pad12}>{reminder}</div>
                  )}
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + classes.border}>
                  <div className={classes.hover}>
                    <div
                      className={classes.togglecontainer}
                      onClick={toggleShowLayer2}>
                      <div className={classes.divWidth80}>
                        <div className={classes.panelHeader}>
                          {intl(LabelNames.events)}
                        </div>
                        <div>{intl(LabelNames.eventsDesc)}</div>
                      </div>
                      <div className={classes.divWidth20}>
                        {showLayer2 ? (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickDown"
                          />
                        ) : (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickUp"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {showLayer2 ? (
                    <Layer></Layer>
                  ) : (
                    <div className={classes.pad12}>{events}</div>
                  )}
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + classes.border}>
                  <div className={classes.hover}>
                    <div
                      className={classes.togglecontainer}
                      onClick={toggleShowLayer3}>
                      <div className={classes.divWidth80}>
                        <div className={classes.panelHeader}>
                          {intl(LabelNames.classUpdates)}
                        </div>
                        <div>{intl(LabelNames.classUpdatesDesc)}</div>
                      </div>
                      <div className={classes.divWidth20}>
                        {showLayer3 ? (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickDown"
                          />
                        ) : (
                          <FontIcon
                            className={classes.floatR}
                            iconName="FlickUp"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {showLayer3 ? (
                    <Layer></Layer>
                  ) : (
                    <div className={classes.pad12}>{classUpdate}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + classes.publish}>
              <div className={classes.floatR}>
                <PrimaryButton
                  className="btnPrimary"
                  onClick={saveHandler}
                  text={intl(LabelNames.update)}
                />
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Notification;
