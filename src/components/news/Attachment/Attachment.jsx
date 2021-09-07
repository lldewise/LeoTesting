import React from 'react';
import Slider from 'infinite-react-carousel';
import classes from './Attachment.module.scss';
import { AttachmentCard } from '../../userInterface/AttachmentCard';
import { VideoAttachmentCard } from '../../userInterface/VideoAttachmentCard';
import { ImageCard } from '../../userInterface/ImageCard/ImageCard';

const settings = {
  slidesToShow: 5,
  arrows: false,
  arrowsBlock: false,
};

export const Attachment = props => {
  const cardView = [];
  props.item.forEach((item, i) => {
    if (item.fileType === 'video') {
      cardView.push(
        <div className={classes.cardContainer} key={i}>
          <VideoAttachmentCard item={item} />
        </div>,
      );
    } else if (item.fileType === 'image') {
      cardView.push(
        <div className={classes.cardContainer} key={i}>
          <ImageCard item={item} />
        </div>,
      );
    } else {
      cardView.push(
        <div className={classes.cardContainer} key={i}>
          <AttachmentCard item={item} />
        </div>,
      );
    }
  });
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 AttachementCoursel">
        <Slider {...settings}>{cardView}</Slider>
      </div>
    </div>
  );
};
