import React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { FontIcon, Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import classes from './Assignmentlist.module.scss';
import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import { IconButton } from 'office-ui-fabric-react';
import { ClassAssignment } from '../../../types/store/item';

type ListProps = {
  itemlist: ClassAssignment[];
  onClickRow: (value: ClassAssignment) => void;
};

export const Assignmentlist: React.FC<ListProps> = props => {
  const onRenderCell = (item?: ClassAssignment) => {
    if (item) {
      const depth = item.selected ? ' ' + classes.itemCell : classes.itemCell;
      let shared = item.selected ? (
        <div className={classes.itemSingle}>
          {' '}
          <FontIcon iconName="Share" className={classes.shared} />
        </div>
      ) : null;
      const myicon =
        item.icon.length > 0 ? (
          <Icon
            {...getFileTypeIconProps({
              extension: item.icon,
              size: 40,
              imageFileType: 'png',
            })}
          />
        ) : (
          <FontIcon className={classes.fontIcon} iconName={item.fonticon} />
        );

      if (item.uploaded) {
        shared = (
          <div className={classes.itemSingle}>
            {' '}
            <FontIcon iconName="Upload" className={classes.shared} />
          </div>
        );
      }

      return (
        <div
          className={classes + ' ' + classes.itemhover}
          onClick={() => {
            props.onClickRow(item);
          }}>
          <div className={depth}>
            <div>{myicon}</div>
            <div className={classes.itemContent}>
              <div className={classes.itemName}>{item.name}</div>
              <div className={classes.itemIndex}>{item.item}</div>
            </div>
            {shared}
            <div>
              <div className={classes.itemSingle}>{item.date}</div>
            </div>
            <div>
              <div className={classes.itemSingle}>
                {intl(LabelNames.submitted)}
              </div>
            </div>
            <div>
              <div className={classes.itemSingle}>{item.selected}</div>
            </div>
            <div>
              <div className={classes.itemSingle}>
                <IconButton
                  iconProps={{ iconName: 'Edit' }}
                  className={'btnIcon hideMenuIcon' + classes.iconEdit}
                />
              </div>
            </div>

            <div className="floatR">
              <div className={classes.listrightwidth}>
                <div>
                  <span className={classes.itemDetailsBold}>
                    {item.createdby}
                  </span>
                  <span> {intl(LabelNames.edited)}</span>
                </div>
                <div className={classes.itemDetails}>{item.lastupdated}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12  ms-lg12">
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-sm12 ms-lg12 studDashTable bclist ">
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
