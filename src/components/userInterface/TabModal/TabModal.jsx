import React from 'react';
import classes from './TabModal.module.scss';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Fragment } from 'react';

export const TabModal = props => {
  const mylist = [];
  if (props.liList) {
    props.liList.forEach((item, i) => {
      const count = item.count ? (
        <span className={classes.count}>{item.count}</span>
      ) : null;
      const fontIcon = item.icon ? <FontIcon iconName={item.icon} /> : null;
      mylist.push(
        <li key={i} className={classes.liitem}>
          <label
            className={classes.cursor + ' ' + item.classname}
            onClick={() => {
              props.linkClick(item.id);
            }}>
            {fontIcon} {item.name} {count}
          </label>
        </li>,
      );
    });
  }
  const borderActive = props.border ? classes.ulListBorder : classes.ulList;
  return (
    <>
      <nav>
        <ul className={borderActive}>{mylist}</ul>
      </nav>
      <div className="ms-Grid-row">
        <div className="mg-Grid-col ms-lg12">{props.tabView}</div>
      </div>
    </>
  );
};
