import React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './SharedDocumentList.module.scss';

const onRenderCell = item => {
  return (
    <div className={classes.itemhover}>
      <div className={classes.itemCell} data-is-focusable={true}>
        <Image
          className={classes.itemImage}
          src={item.thumbnail}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className={classes.itemContent}>
          <div className={classes.itemName}>{item.name}</div>
          <div className={classes.itemIndex}>{item.item}</div>
        </div>
        <div>
          <div className={classes.itemDetails} />
        </div>
        <div>
          <div className={classes.itemSingle}>Oct 2</div>
        </div>
      </div>
    </div>
  );
};

export const SharedDocumentlist = props => {
  return (
    <div className="ms-Grid-row ">
      <div className="ms-Grid-col ms-sm12  ms-lg12">
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-sm12  ms-lg12 bclist pad10">
            <div className={'ms-Grid-row ' + classes.sharedDocumentHeader}>
              <div className="ms-Grid-col  ms-lg6 card-title ">
                {props.title}
              </div>
              <div className="ms-Grid-col  ms-lg6 text-right ">
                <span className="padl10">
                  {' '}
                  <FontIcon
                    iconName="More"
                    className="icondDefault card-title"
                  />
                </span>
              </div>
            </div>
            <div className="ms-Grid-row ">
              <FocusZone direction={FocusZoneDirection.vertical}>
                <div className={classes.container} data-is-scrollable>
                  <List items={props.items} onRenderCell={onRenderCell} />
                </div>
              </FocusZone>
            </div>
            <div className={'ms-Grid-row ' + classes.sharedDocumentHeader}>
              <div className="ms-Grid-col  ms-lg6" />
              <div className="ms-Grid-col  ms-lg6 text-right ">
                <span className="padl10"> More</span>
                <span className="padl10">
                  {' '}
                  <FontIcon iconName="Forward" className="icondDefault" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
