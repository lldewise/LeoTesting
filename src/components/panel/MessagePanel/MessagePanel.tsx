import React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import classes from './MessagePanel.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';


function _onRenderPrimaryText(props:any) {
  return <div className={classes.unRead}>{props.text}</div>;
}
function _onRenderSecondaryText(props:any) {
  return <div className={classes.unRead}>{props.secondaryText}</div>;
}

type MessagePanelProps = {
  isOpenMessage: any;
  dismissPanelMessages: any;
};

const MessagePanel:React.FC<MessagePanelProps> = props => {
  return (
    <Panel
      headerText="Messages"
      isBlocking={false}
      isOpen={props.isOpenMessage}
      onDismiss={props.dismissPanelMessages}
      closeButtonAriaLabel="Close"
      className={classes.Panel}>
      <div className="ms-Grid-row" dir="rtl">
        <div>
          <Label className={classes.linkAllMessages}>See All messages</Label>{' '}
        </div>
      </div>
      <div className="ms-Grid-row loginuser" dir="ltr">
        <div className="ms-Grid-col  ms-lg8 ">
          <div className={classes.customWidth}>
            <Persona
              size={PersonaSize.size40}
              presence={PersonaPresence.online}
              imageAlt="Annie Lindqvist, status is online"
              text="Dennis Migriño"
              secondaryText="Sample Subject"
              onRenderPrimaryText={_onRenderPrimaryText}
              onRenderSecondaryText={_onRenderSecondaryText}
            />
            <p className={classes.messageTitle}>Sample Message</p>
          </div>
        </div>
        <div className="ms-Grid-col  ms-lg4 text-right ">
          <span className="padl10">Sept 10</span>
        </div>
      </div>
      <hr className="divider" />

      <div className="ms-Grid-row loginuser" dir="ltr">
        <div className="ms-Grid-col  ms-lg8">
          <div className={classes.customWidth}>
            <Persona
              size={PersonaSize.size40}
              presence={PersonaPresence.online}
              imageAlt="Annie Lindqvist, status is online"
              text="Jay Celeste"
              secondaryText="Sample Subject"
              onRenderPrimaryText={_onRenderPrimaryText}
              onRenderSecondaryText={_onRenderSecondaryText}
            />
            <p className={classes.messageTitle}>Sample Message</p>
          </div>
        </div>
        <div className="ms-Grid-col  ms-lg4 text-right ">
          <span className="padl10">Sept 10</span>
        </div>
      </div>
      <hr className="divider" />

      <div className="ms-Grid-row loginuser" dir="ltr">
        <div className="ms-Grid-col  ms-lg8">
          <div className={classes.customWidth}>
            <Persona
              size={PersonaSize.size40}
              presence={PersonaPresence.online}
              imageAlt="Annie Lindqvist, status is online"
              text="Eric Cantorna"
              imageInitials="EC"
              secondaryText="Sample Subject"
              onRenderPrimaryText={_onRenderPrimaryText}
              onRenderSecondaryText={_onRenderSecondaryText}
            />
            <p className={classes.messageTitle}>Sample Message</p>
          </div>
        </div>
        <div className="ms-Grid-col  ms-lg4 text-right ">
          <span className="padl10">Sept 10</span>
        </div>
      </div>
      <hr className="divider" />
    </Panel>
  );
};

export default MessagePanel;