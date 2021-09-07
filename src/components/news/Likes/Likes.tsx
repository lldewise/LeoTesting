import React, { Fragment } from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './Likes.module.scss';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

type LikesProps = {
  active: any;
  likesClick: any;
  heartHandler: any;
  itemId: any;
  count: any;
  commentCount: any;
  clickComment: any;
};

const Likes: React.FC<LikesProps> = React.memo(props => {
  const icon = props.active ? (
    <FontIcon
      iconName="HeartFill"
      onClick={() => props.heartHandler(false, props.itemId)}
      className={classes.heartActiveIcon}
    />
  ) : (
    <FontIcon
      iconName="Heart"
      onClick={() => props.heartHandler(true, props.itemId)}
      className={classes.heartIcon}
    />
  );
  const commentCount =
    props.commentCount > 0 ? <span>{props.commentCount} Comment</span> : null;
  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
          <div className="ms-Grid-col ms-lg6">
            <span className="padR5"> {icon}</span>
            <span onClick={props.likesClick}>
              <span className="padR5"> {props.count}</span>
              <span>{intl(LabelNames.likes)}</span>
            </span>
          </div>
          <div
            onClick={props.clickComment}
            className={'ms-Grid-col ms-lg6 ' + classes.commentCount}>
            {commentCount}
          </div>
        </div>
      </div>
    </>
  );
});
export default Likes;
