import React, { Fragment } from 'react';
import classes from './AttachmentCard.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

export const AttachmentCard = props => {
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
      <fontIcon className={classes.fontIcon} iconName={props.item.fonticon} />
    );

  return (
    <>
      <div className={'ms-Grid-col ' + classes.container}>
        <div className={'ms-Grid-col lg4 ' + classes.AttachmentCard}>
          <div className={classes.verticalalign}>
            <div className={'text-center '}>
              <div className={classes.cursor}> {myicon}</div>
              <div className={classes.title + ' ' + classes.cursor}>
                {' '}
                {props.item.fileName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
