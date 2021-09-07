import React from 'react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './MissingRegistration.module.scss';
import { Fabric } from '@fluentui/react/lib/Fabric';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from '@fluentui/react/lib/Shimmer';
import { useStore } from '../../../store/store';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0',
    },
  },
});
const wrapperStyles = { display: 'flex' };

type MissingRegistrationProps = {
  itemlist: any[] | undefined;
  shimmer: boolean;
};

const MissingRegistration: React.FC<MissingRegistrationProps> = props => {
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const history = useHistory();

  const gotoDetails = (data: any) => {
    const startTime = moment(data.start).format('h:mm');
    const endTime = moment(data.end).format('h:mm');
    const id = data.id.split('/')[1];
    const title = data.class.split('/')[1];
    const selectedDate = data.start;
    const location = null;
    const timeSched = startTime + ' - ' + endTime;
    const item = {
      id: id,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      day: moment(selectedDate).format('ddd'),
      time: timeSched,
      location: location,
      late: '',
      week: data.week,
      start: startTime,
      end: endTime,
      confirmed: !data.confirmed,
    };
    dispatch('ClassesUpdateSelectedDate', item);
    dispatch('ClassesUpdateSelectedSubject', title);
    dispatch('ClassesSelectedTab', '5');
    dispatch('UPDATE_NAVIGATION', '3');

    history.push('./classes');
  };

  const onRenderCell = (item: any) => {
    const title = item.class.split('/')[1];
    return (
      <div
        className={classes.mb2 + ' ' + classes.itemhover}
        onClick={() => gotoDetails(item)}>
        <div className={classes.itemCell}>
          <div className={classes.fontIcon}>
            <FontIcon
              className={classes.icontitle}
              iconName={'ClipboardList'}
            />
          </div>
          <div className={classes.itemContent}>
            <Link className={classes.missingRegLink} to={'#'}>
              <div className={classes.itemName}>{title}</div>
            </Link>
            <Link className={classes.missingRegLink} to={'#'}>
              <div className={classes.itemIndex}>{'Absences'}</div>
            </Link>
          </div>
          <div className={classes.itemIcon}>
            <FontIcon className={classes.ClipboardList} iconName={'Group'} />
          </div>
          <div>
            <Link className={classes.missingRegLink} to={'#'}>
              <div className={classes.itemSingle}>{title}</div>
            </Link>
          </div>
          <div className={classes.itemIcon}>
            <FontIcon className={classes.icon} iconName="Clock" />
          </div>
          <div className="floatR">
            <div className={classes.itemDate}>
              {moment(new Date(item.start)).format('MMMM D, YYYY') +
                ' at ' +
                moment(new Date(item.start)).format('hh:mm a').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ms-Grid-row ">
      <div className={'ms-Grid-col ms-sm12  ms-lg12 ' + classes.mrlist}>
        <div className="ms-Grid-row ">
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg12 ' + classes.containerTitle
            }>
            <div className={classes.title}>Missing Registrations</div>
            {!props.shimmer && (
              <div className={classes.number}>{props.itemlist?.length}</div>
            )}
          </div>
        </div>

        <div className="ms-Grid-row ">
          <div className={classes.assignmentDetails}>
            <FocusZone direction={FocusZoneDirection.vertical}>
              {props.itemlist && props.itemlist?.length > 0 && !props.shimmer && (
                <div className={classes.container} data-is-scrollable>
                  <List items={props.itemlist} onRenderCell={onRenderCell} />
                </div>
              )}
              {props.itemlist?.length === 0 && !props.shimmer && (
                <div className={'ms-Grid-col ms-lg12 ' + classes.noData}>
                  No data found.
                </div>
              )}
            </FocusZone>
            <Fabric className={wrapperClass}>
              {props.shimmer && (
                <div>
                  {Array.from(Array(6)).map((a, key) => (
                    <Shimmer
                      key={key}
                      customElementsGroup={getCustomElements()}
                      width="100%"
                    />
                  ))}
                </div>
              )}
            </Fabric>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCustomElements = () => {
  return (
    <div style={wrapperStyles}>
      <ShimmerElementsGroup
        width={'40px'}
        shimmerElements={[
          { type: ShimmerElementType.line, height: 60, width: 40 },
          { type: ShimmerElementType.gap, width: 10, height: 80 },
        ]}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <ShimmerElementsGroup
          flexWrap
          width={'100%'}
          style={{ marginTop: '5px' }}
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              width: '100%',
              height: 10,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '100%',
              height: 10,
              verticalAlign: 'bottom',
            },
            {
              type: ShimmerElementType.line,
              width: '100%',
              height: 10,
              verticalAlign: 'bottom',
            },
            { type: ShimmerElementType.gap, width: '100%', height: 20 },
          ]}
        />
      </div>
    </div>
  );
};

export default MissingRegistration;
