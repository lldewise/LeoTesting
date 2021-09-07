import React, { Fragment } from 'react';

import styles from './ProfileCard.module.scss';
import { Card } from '@uifabric/react-cards';
import { FontIcon, Callout } from 'office-ui-fabric-react';
import {
  Persona,
  PersonaSize,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { useBoolean } from '@fluentui/react-hooks';
import { DirectionalHint } from '@fluentui/react';
import { UserProfile } from '../../../types/store/users';

const typeScss = require('../../../assets/ui-kit/_variables.scss');

type ProfileCardProps = {
  user: any;
  gotoAccountSetting: any;
  tagRisk: any;
};

const ProfileCard: React.FC<ProfileCardProps> = props => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);

  const cardStyles = {
    root: {
      display: 'inline-block',
      marginRight: 20,
      marginBottom: 20,
      minWidth: 'auto',
      height: 430,
      borderRadius: '5px',
      backgroundColor: typeScss.whiteBackground,
    },
  };

  const dpPerson = {
    root: {
      margin: '0 auto',
      height: '80px',
      width: '81px',
      borderRadius: '50%',
      border: '5px solid ' + typeScss.classScheduleBorder,
      backgroundColor: typeScss.classScheduleBorder,
    },
  };

  return (
    <>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          role="alertdialog"
          gapSpace={5}
          target={`#profileExclamation`}
          onDismiss={toggleIsCalloutVisible}
          directionalHint={DirectionalHint.rightTopEdge}
          setInitialFocus>
          <div className={styles.callOutContainer}>
            <div className={styles.titleCallout}>
              <div className={styles.titleCol1}>
                <FontIcon className={styles.incident} iconName="Warning" />
              </div>
              <div>This student is at risk</div>
            </div>

            <div className={styles.description}>
              It seems that the student is at risk of dropping out pelase do the
              necessary action.
            </div>
          </div>
        </Callout>
      )}

      <Card styles={cardStyles}>
        <div className="ms-Grid-row">
          <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
            <div className={'ms-Grid-col ms-lg3 ' + styles.persona}>
              <div>
                <Persona
                  imageUrl={props.user?.imageUrl}
                  imageInitials={props.user?.imageInitials}
                  size={PersonaSize.size72}
                  styles={dpPerson}
                  initialsColor={PersonaInitialsColor.blue}
                />
              </div>
              {props.tagRisk && (
                <div className={styles.popOver}>
                  <FontIcon
                    className={styles.exclamationIcon}
                    id="profileExclamation"
                    onClick={toggleIsCalloutVisible}
                    iconName="StatusCircleExclamation"
                  />
                </div>
              )}
            </div>
            <div className={'ms-Grid-col ms-lg12 ' + styles.userName}>
              {props.user?.text}
            </div>
            <div className={'ms-Grid-col ms-lg12 ' + styles.userId}>
              2020/21 - 1B - Creative
            </div>
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + styles.body}>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-col ms-lg2 ' + styles.leftCol}>
                <FontIcon iconName="Phone" />
              </div>
              <div className={'ms-Grid-col ms-lg10 ' + styles.rightCol}>
                {props.user?.contactNo}
              </div>
            </div>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-col ms-lg2 ' + styles.leftCol}>
                <FontIcon iconName="Mail" />
              </div>
              <div className={'ms-Grid-col ms-lg10 ' + styles.rightCol}>
                {props.user?.email}
              </div>
            </div>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-col ms-lg2 ' + styles.leftCol}>
                <FontIcon iconName="Balloons" />
              </div>
              <div className={'ms-Grid-col ms-lg10 ' + styles.rightCol}>
                01/01/1998
              </div>
            </div>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-col ms-lg2 ' + styles.leftCol}>
                <FontIcon iconName="POI" />
              </div>
              <div className={'ms-Grid-col ms-lg10 ' + styles.rightCol}>
                Lottenborgveg 24 DK-2800 Kongens Lyngby
              </div>
            </div>
          </div>
          <div className={'ms-Grid-col ms-lg12 ' + styles.footer}>
            <div
              className={styles.linkUpdate}
              onClick={props.gotoAccountSetting}>
              <FontIcon iconName="Edit" /> <span>Edit profile</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfileCard;
