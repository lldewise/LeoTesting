import React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { FontIcon, Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import classes from './SharedDocumentList.module.scss';
import { LabelNames } from './../../../util/constant';
import { intl } from './../../../util/commonFunction';
import moment from 'moment';

export const SharedDocumentList = props => {
  const onRenderCell = item => {
    const myicon = (
      <Icon
        {...getFileTypeIconProps({
          extension: item.icon,
          size: 40,
          imageFileType: 'png',
        })}
      />
    );
    return (
      <div
        className={
          'list-default-item ' + classes.mb2 + ' ' + classes.itemhover
        }>
        <div className={classes.itemCell}>
          <div className={'list-doc-icon ' + classes.docIcon}>{myicon}</div>
          <div className={classes.itemContent}>
            <div className={classes.itemName}>{item.name}</div>
            <div className={classes.itemIndex}>{item.item}</div>
          </div>
          <div className={classes.itemSingle}>
            {moment(new Date(item.createddate)).format('MMM DD')}
          </div>
          <div className={classes.itemIcon}>
            <FontIcon className={classes.icon} iconName="People" />
            <span className={classes.itemSingle}>{item.status}</span>
          </div>
          <div className={classes.itemSingle}>{item.selected}</div>
          <div className={classes.itemEdit}>
            <FontIcon iconName="Edit" className={classes.icon} />
          </div>
          <div className="floatR">
            <div className={classes.listrightwidth}>
              <div>
                <span className={classes.itemDetailsBold}>
                  {item.createdby}
                </span>
                <span> {intl(LabelNames.edited)}</span>
              </div>
              <div className={classes.itemDetails}>
                {moment(new Date(item.lastupdated)).format('ddd') +
                  ' at ' +
                  moment(new Date(item.date)).format('hh:mm a')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12  ms-lg12">
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-sm12  ms-lg12 bclist ">
            <div className="ms-Grid-row ">
              <div className={classes.assignmentDetails}>
                <FocusZone direction={FocusZoneDirection.vertical}>
                  <div className={classes.container} data-is-scrollable>
                    <List items={props.itemlist} onRenderCell={onRenderCell} />
                  </div>
                </FocusZone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
