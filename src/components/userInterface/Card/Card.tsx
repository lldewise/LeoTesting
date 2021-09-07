import React from 'react';
import classes from './Card.module.scss';
import { FontIcon, Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

type CardProps = {
  item: any;
};
const Card: React.FC<CardProps> = props => {
  const myicon =
    props.item.icon.length > 0 ? (
      <Icon
        {...getFileTypeIconProps({
          extension: props.item.icon,
          size: 32,
          imageFileType: 'png',
        })}
      />
    ) : (
      <FontIcon className={classes.fontIcon} iconName={props.item.fonticon} />
    );
  return (
    <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
      <div className={'ms-Grid-col lg2 ' + classes.divpad10}>{myicon}</div>
      <div className="ms-Grid-col lg10">
        <div className={classes.itemIndex + ' ' + classes.duedate}>
          {props.item.duedate}
        </div>
        <div className={classes.itemIndex + ' ' + classes.title}>
          {props.item.title}
        </div>
        <div className={classes.itemIndex + ' ' + classes.postedby}>
          {props.item.postedby}
        </div>
      </div>
    </div>
  );
};
export default Card;
