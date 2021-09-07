import React, { useState } from 'react';
import { Card } from '@uifabric/react-cards';
import classes from './UnreadMessages.module.scss';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { DefaultButton } from 'office-ui-fabric-react';

const cardTokens = { childrenMargin: 12 };

const UnreadMessages: React.FC = () => {
  //eslint-disable-next-line
  const [mouseHover, setmouseHover] = useState(false);
  const logMouseEnter = () => {
    setmouseHover(true);
  };
  const logMouseLeave = () => {
    setmouseHover(false);
  };

  return (
    <Card className="card-default-body" tokens={cardTokens}>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col  ms-lg12">
          <div className="dashboard-title">
            <div>
              <span>Unread Messages</span>
              <span className="badge badge-primary badge-oblong">99</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={'ms-Grid-row loginuser ' + classes.emailItem}
        onMouseEnter={logMouseEnter}
        onMouseLeave={logMouseLeave}>
        <div className="ms-Grid-col  ms-lg12">
          <Persona
            size={PersonaSize.size40}
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online"
            text="Mary Kath"
            secondaryText="Important Update"
          />
          <div className={classes.emailInfo}>
            <p className={classes.messagesPadding}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed...
            </p>
            <span className={'padl10 ' + classes.date}>Sept 10</span>
          </div>
        </div>
        <div className={classes.emailCtrl}>
          <i
            className={
              'ms-Icon ms-Icon--StatusTriangleExclamation ' + classes.icon
            }
            aria-hidden="true"
          />
          <span className={classes.onHover}>
            <i
              className={'ms-Icon ms-Icon--FavoriteStar ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--IconSetsFlag ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--Delete ' + classes.iconHover}
              aria-hidden="true"
            />
            <br />
          </span>
        </div>
      </div>
      <hr className={'divider ' + classes.customDivider} />
      <div
        className={'ms-Grid-row loginuser ' + classes.emailItem}
        onMouseEnter={logMouseEnter}
        onMouseLeave={logMouseLeave}>
        <div className="ms-Grid-col  ms-lg12">
          <Persona
            size={PersonaSize.size40}
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online"
            text="Mary Kath"
            secondaryText="Important Update"
          />
          <div className={classes.emailInfo}>
            <p className={classes.messagesPadding}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed...
            </p>
            <span className={'padl10 ' + classes.date}>Sept 10</span>
          </div>
        </div>
        <div className={classes.emailCtrl}>
          <i
            className={
              'ms-Icon ms-Icon--StatusTriangleExclamation ' + classes.icon
            }
            aria-hidden="true"
          />
          <span className={classes.onHover}>
            <i
              className={'ms-Icon ms-Icon--FavoriteStar ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--IconSetsFlag ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--Delete ' + classes.iconHover}
              aria-hidden="true"
            />
            <br />
          </span>
        </div>
      </div>
      <hr className={'divider ' + classes.customDivider} />
      <div
        className={'ms-Grid-row loginuser ' + classes.emailItem}
        onMouseEnter={logMouseEnter}
        onMouseLeave={logMouseLeave}>
        <div className="ms-Grid-col  ms-lg12">
          <Persona
            size={PersonaSize.size40}
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online"
            text="Mary Kath"
            secondaryText="Important Update"
          />
          <div className={classes.emailInfo}>
            <p className={classes.messagesPadding}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed...
            </p>
            <span className={'padl10 ' + classes.date}>Sept 10</span>
          </div>
        </div>
        <div className={classes.emailCtrl}>
          <i
            className={
              'ms-Icon ms-Icon--StatusTriangleExclamation ' + classes.icon
            }
            aria-hidden="true"
          />
          <span className={classes.onHover}>
            <i
              className={'ms-Icon ms-Icon--FavoriteStar ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--IconSetsFlag ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--Delete ' + classes.iconHover}
              aria-hidden="true"
            />
            <br />
          </span>
        </div>
      </div>
      <hr className={'divider ' + classes.customDivider} />
      <div
        className={'ms-Grid-row loginuser ' + classes.emailItem}
        onMouseEnter={logMouseEnter}
        onMouseLeave={logMouseLeave}>
        <div className="ms-Grid-col  ms-lg12">
          <Persona
            size={PersonaSize.size40}
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online"
            text="Mary Kath"
            secondaryText="Important Update"
          />
          <div className={classes.emailInfo}>
            <p className={classes.messagesPadding}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed...
            </p>
            <span className={'padl10 ' + classes.date}>Sept 10</span>
          </div>
        </div>
        <div className={classes.emailCtrl}>
          <i
            className={
              'ms-Icon ms-Icon--StatusTriangleExclamation ' + classes.icon
            }
            aria-hidden="true"
          />
          <span className={classes.onHover}>
            <i
              className={'ms-Icon ms-Icon--FavoriteStar ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--IconSetsFlag ' + classes.iconHover}
              aria-hidden="true"
            />
            <i
              className={'ms-Icon ms-Icon--Delete ' + classes.iconHover}
              aria-hidden="true"
            />
            <br />
          </span>
        </div>
      </div>

      <div className={classes.btnPadding}>
        <DefaultButton className={classes.btnSize} text="+6 unread messages" />
      </div>
    </Card>
  );
};

export default UnreadMessages;