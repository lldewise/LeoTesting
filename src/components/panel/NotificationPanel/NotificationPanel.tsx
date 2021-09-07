import React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import classes from './NotificationPanel.module.scss';

type NotificationPanelProps = {
  isOpenNotifications: any;
  dismissPanelNotifications: any;
};


const NotificationPanel: React.FC<NotificationPanelProps> = props => {
  return (
    <Panel
      headerText="Notifications"
      isBlocking={false}
      isOpen={props.isOpenNotifications}
      onDismiss={props.dismissPanelNotifications}
      closeButtonAriaLabel="Close"
      className={classes.Panel}>
      <div className="notif-padding-top">
        <div className="ms-Grid-row notif-padding" dir="ltr">
          <div className="ms-Grid-col  ms-lg1">
            <div className={classes.customWidth}>
              <i
                className="ms-Icon ms-Icon--StatusCircleBlock"
                aria-hidden="true"
              />
              <p className="messages-padding" />
            </div>
          </div>
          <div className="ms-Grid-col  ms-lg10">
            <span className="padl10">Dennis cancelled a meeting.</span>
          </div>
        </div>
        <hr className="divider" />

        <div className="ms-Grid-row notif-padding" dir="ltr">
          <div className="ms-Grid-col  ms-lg1">
            <div className={classes.customWidth}>
              <i
                className="ms-Icon ms-Icon--StatusCircleBlock"
                aria-hidden="true"
              />
              <p className="messages-padding" />
            </div>
          </div>
          <div className="ms-Grid-col  ms-lg10">
            <span className="padl10">Jay cancelled a meeting.</span>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </Panel>
  );
};

export default NotificationPanel;