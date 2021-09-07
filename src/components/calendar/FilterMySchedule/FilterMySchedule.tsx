import React, { Fragment } from 'react';
import { Callout } from 'office-ui-fabric-react';
import styles from './FilterMySchedule.module.scss';
import { DirectionalHint } from '@fluentui/react';
import {
  FocusZone,
  FocusZoneDirection,
} from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

const type = require('../../../assets/ui-kit/_variables.scss');

const iconStyles = {
  marginRight: '8px',
  color: '#6c35d4',
  '&:hover': {
    cursor: 'pointer',
  },
};

const schoolEventStyles = {
  checkmark: {
    backgroundColor: type.schoolEventBorder,
    padding: '10px',
  },
};

const classScheduleStyles = {
  checkmark: {
    backgroundColor: type.classScheduleBorder,
    padding: '10px',
  },
  root: {
    borderStyle: 'none !important',
  },
};

const privateStyles = {
  checkmark: {
    backgroundColor: type.privateEventBorder,
    padding: '10px',
  },
  root: {
    borderStyle: 'none !important',
  },
};

const examStyles = {
  checkmark: {
    backgroundColor: type.examEventBorder,
    padding: '10px',
  },
  root: {
    borderStyle: 'none !important',
  },
};

type FilterMyScheduleProps = {
  targetEl: any;
  isMyScheduleView: boolean;
  isCheckSchoolEvent: boolean;
  isCheckClassSchedule: boolean;
  isCheckPrivateEvent: boolean;
  isCheckExam: boolean;
  onChangeScheduleRender: (item: string) => void;
};

class FilterMySchedule extends React.Component<FilterMyScheduleProps> {
  onRenderOption = (option: any) => {
    let wrapper: any = '';
    switch (option.key) {
      case 'schoolEvent':
        wrapper = (
          <Checkbox
            className="schedEventCheck"
            styles={schoolEventStyles}
            checked={option.checked}
          />
        );
        break;
      case 'classSchedule':
        wrapper = (
          <Checkbox
            className="schedClassCheck"
            styles={classScheduleStyles}
            checked={option.checked}
          />
        );
        break;
      case 'private':
        wrapper = (
          <Checkbox
            className="schedPrivateCheck"
            styles={privateStyles}
            checked={option.checked}
          />
        );
        break;
      case 'exam':
        wrapper = (
          <Checkbox
            className="schedExamCheck"
            styles={examStyles}
            checked={option.checked}
          />
        );
        break;
      default:
        break;
    }

    return (
      <div
        className={styles.listStyle}
        style={{ display: 'flex' }}
        onClick={e => this.props.onChangeScheduleRender(option.key)}>
        {option.data && (
          <>
            <div style={{ width: '30px', borderStyle: 'none !important' }}>
              {wrapper}
            </div>
            <div style={iconStyles} id={option.key}>
              {option.text}
            </div>
          </>
        )}
      </div>
    );
  };

  render() {
    const options = [
      {
        key: 'classSchedule',
        text: intl(LabelNames.classSchedule),
        checked: this.props.isCheckClassSchedule,
        data: { color: '#6c35d4' },
      },
      {
        key: 'exam',
        text: intl(LabelNames.examEvent),
        checked: this.props.isCheckExam,
        data: { color: '#0078d4' },
      },
      {
        key: 'schoolEvent',
        text: intl(LabelNames.schoolEvent),
        checked: this.props.isCheckSchoolEvent,
        data: { color: '#f7a93b' },
      },
      {
        key: 'private',
        text: intl(LabelNames.privateEvent),
        checked: this.props.isCheckPrivateEvent,
        data: { color: '#6bb700' },
      },
    ];
    return (
      <div>
        {this.props.isMyScheduleView && (
          <Callout
            className={styles.callout}
            role="alertdialog"
            gapSpace={0}
            target={this.props.targetEl}
            setInitialFocus
            directionalHint={DirectionalHint.bottomLeftEdge}
            directionalHintFixed={false}>
            <div>
              <div className="ms-Grid-row ">
                <FocusZone direction={FocusZoneDirection.horizontal}>
                  <div data-is-scrollable>
                    <List items={options} onRenderCell={this.onRenderOption} />
                  </div>
                </FocusZone>
              </div>
            </div>
          </Callout>
        )}
      </div>
    );
  }
}

export default FilterMySchedule;
