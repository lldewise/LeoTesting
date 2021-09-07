import React, { Fragment } from 'react';
import classes from './VideoAttachmentCard.module.scss';
import { FontIcon, Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

import ReactPlayer from 'react-player';

export const VideoAttachmentCard = props => {
  //eslint-disable-next-line
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
    <>
      <div className={'ms-Grid-col ' + classes.container}>
        <div className={'ms-Grid-col lg4 '}>
          <ReactPlayer
            height="50"
            width="269"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          />
        </div>
      </div>
    </>
  );
};
