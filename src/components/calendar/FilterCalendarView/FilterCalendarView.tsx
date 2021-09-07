import React from 'react';
import { Callout } from 'office-ui-fabric-react';
import styles from './FilterCalendarView.module.scss';
import { DirectionalHint } from '@fluentui/react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

const iconStyles: React.CSSProperties = {
  marginRight: '8px',
  color: '#6c35d4',
};
const options = [
  {
    key: 'schoolWeek',
    text: intl(LabelNames.schoolWeekView),
    data: { icon: 'CalendarWorkWeek' },
  },
  {
    key: 'week',
    text: intl(LabelNames.weekView),
    data: { icon: 'CalendarWeek' },
  },
  {
    key: 'month',
    text: intl(LabelNames.monthView),
    data: { icon: 'Calendar' },
  },
  { key: 'day', text: intl(LabelNames.dayView), data: { icon: 'CalendarDay' } },
];

type FilterCalendarViewProps = {
  targetEl: any;
  isFilterView: boolean;
  onChangeFilterRender: (item: any) => void;
};

const FilterCalendarView: React.FC<FilterCalendarViewProps> = items => {
  const { targetEl, isFilterView, onChangeFilterRender } = items;

  const onRenderOption = (option: any) => {
    return (
      <div
        className={styles.listStyle}
        onClick={e => onChangeFilterRender(option)}>
        {option.data && option.data.icon && (
          <Icon
            style={iconStyles}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
            onClick={e => onChangeFilterRender(e)}
          />
        )}
        <span
          style={iconStyles}
          id={option.key}
          onClick={e => onChangeFilterRender(e)}>
          {option.text}
        </span>
      </div>
    );
  };

  return (
    <div>
      {isFilterView && (
        <Callout
          className={styles.callout}
          role="alertdialog"
          gapSpace={0}
          target={targetEl}
          setInitialFocus
          directionalHint={DirectionalHint.bottomLeftEdge}
          directionalHintFixed={false}>
          <div>
            <div className="ms-Grid-row ">
              <FocusZone direction={FocusZoneDirection.horizontal}>
                <div data-is-scrollable>
                  <List items={options} onRenderCell={onRenderOption} />
                </div>
              </FocusZone>
            </div>
          </div>
        </Callout>
      )}
    </div>
  );
};

export default FilterCalendarView;
