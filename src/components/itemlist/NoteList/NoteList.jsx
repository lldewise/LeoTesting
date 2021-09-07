import React from 'react';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import classes from './NoteList.module.scss';

export const NoteList = props => {
  const onRenderCell = (item, index, isScrolling) => {
    const bgSelected = item.selected
      ? 'ms-depth-8 ' + classes.itemCellSelected
      : classes.itemCell;

    return (
      <div
        className={classes.mb2 + ' ' + classes.itemhover}
        onClick={() => {
          props.selecteditem(item.index);
        }}>
        <div className={bgSelected} onClick={() => {}}>
          <div>
            <div className={'ms-Grid-row ' + classes.itemContainer}>
              <div className={classes.itemName}> {item.title}</div>
              <div className={classes.itemSender}>
                {' '}
                {'By ' + item.senderName}
              </div>
            </div>
            <div className={'ms-Grid-row ' + classes.cardList}>
              <div className="ms-Grid-col ms-lg8">
                <div className={classes.itemSender}> {item.dateSent}</div>
              </div>
              <div className="ms-Grid-col ms-lg4">
                <div className={classes.itemPrivacy}>
                  {' '}
                  <FontIcon iconName="Contact" /> {' ' + item.privacy}{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <div className={classes.container} data-is-scrollable>
        <List items={props.itemlist} onRenderCell={onRenderCell} />
      </div>
    </FocusZone>
  );
};
