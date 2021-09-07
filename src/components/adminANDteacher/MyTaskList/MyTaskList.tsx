import React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './MyTaskList.module.scss';
//import { LabelNames } from './../../../util/constant';
//import { intl } from './../../../util/commonFunction';
import { Link } from 'office-ui-fabric-react';
import moment from 'moment';

type MyTaskListProps = {
  itemlist: any;
};

const MyTaskList: React.FC<MyTaskListProps> = props => {
  const onRenderCell = (item:any) => {
    return (
      <div className={'list-default-item ' + classes.mb2}>
        <div className={classes.itemCell}>
          <div className="list-task-icon">
            <FontIcon className={classes.icontitle} iconName={item.icon} />
          </div>
          <div className={classes.itemContent}>
            <div className={classes.itemName}>
              <Link className={classes.myTasklink} /*underline*/>
                {item.title}
              </Link>
            </div>

            <div className={classes.itemIndex}>
              <Link className={classes.myTasklink} /*underline*/>
                {item.type}
              </Link>
            </div>
          </div>
          <div className={classes.itemIcon}>
            <FontIcon className={classes.icon} iconName={item.icon1} />
            <span className={classes.itemSingle}>
              <Link className={classes.myTasklink} /*underline*/>
                {item.description}
              </Link>
            </span>
          </div>
          <div className={classes.itemIcon}>
            <FontIcon className={classes.icon} iconName="Clock" />
            <span className={classes.itemDate}>
              {moment(new Date(item.date)).format('MMMM D, YYYY') +
                ' at ' +
                moment(new Date(item.date)).format('hh:mm a').toUpperCase()}
            </span>
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
                    <List
                      className="list-default"
                      items={props.itemlist}
                      onRenderCell={onRenderCell}
                    />
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

export default MyTaskList;
