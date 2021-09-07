import React, { Fragment } from 'react';

import classes from './ImageCard.module.scss';

export const ImageCard = props => {
  return (
    <>
      <div className={'ms-Grid-col ' + classes.container}>
        <div className={'ms-Grid-col lg4 ' + classes.divpad10X}>
          <img src={props.item.src} alt={props.item.src} />
        </div>
      </div>
    </>
  );
};
