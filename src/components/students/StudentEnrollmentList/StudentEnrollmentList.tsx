import React, { useState, Fragment, useEffect } from 'react';
import styles from './StudentEnrollmentList.module.scss';
import {
  Dropdown,
  Icon,
  SearchBox,
  Checkbox,
  FontIcon,
  DefaultButton,
  PrimaryButton,
  Callout,
  DirectionalHint,
  FocusZone,
  FocusZoneDirection,
  List,
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react';

import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import SelectedDetailsList from '../SelectedDetailsList/SelectedDetailsList';
import { useStore } from '../../../store/store';
import _ from 'lodash';

const type = require('../../../assets/ui-kit/_variables.scss');
const groupOptions = [
  { key: '1', text: 'Home Class' },
  { key: '2', text: 'Students' },
];

const dropdownStylesGroups = {
  dropdown: { width: '200px' },
};
const dpPerson = {
  root: {
    fontSize: '18px !important',
    display: 'inline-block',
  },
  primaryText: {
    fontSize: '14px !important',
  },
  secondaryText: {
    fontSize: '14px !important',
  },
};

type StudentEnrollmentListProps = {
  cancel: () => void;
};

const StudentEnrollmentList: React.FC<StudentEnrollmentListProps> = props => {
  const [data, dispatch] = useStore();
  const [placeHolder, setPlaceHolder] = useState<string>('Search to add...');
  const [hasSelectedCategory, setHasSelectedCategory] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedData, setSelectedData] = useState<any>();
  const [enrolledStudent, setEnrolledStudent] = useState<any[]>([]);
  const [searchOptions, setSearchOptions] = useState<any[]>([]);
  const [calloutVisible, setCalloutVisible] = useState<boolean>(false);
  const [shimmer, setShimmer] = useState<boolean>(false);
  const yearCount = 3;
  useEffect(() => {
    if (data.enrolledStudentList?.length > 0) {
      setEnrolledStudent(data.enrolledStudentList);
    }
  }, [data.enrolledStudentList]);

  const onRenderGroupOption = (option: any) => {
    let wrapper: any = '';
    if (option.text === 'Home Class') {
      wrapper = (
        <Icon
          iconName="Group"
          aria-hidden="true"
          style={{ color: type.classScheduleBorder }}
        />
      );
    } else if (option.text === 'Students') {
      wrapper = (
        <Icon
          iconName="IDBadge"
          aria-hidden="true"
          style={{ color: type.classScheduleBorder }}
        />
      );
    }

    return (
      <div>
        <span style={{ paddingRight: '6px' }}>{wrapper}</span>
        <span>{option.text}</span>
      </div>
    );
  };

  const onSelectListItems = (event: any) => {
    let result: any[] = [];
    if (selectedCategory === 'Home Class') {
      result = event.data.map((a: any) => a);
      setSelectedData(result);
    } else {
      result.push(event);
      setSelectedData(result);
    }
    setCalloutVisible(false);
  };

  const onRenderSearchOption = (option: any) => {
    let wrapper: any = '';
    if (selectedCategory === 'Home Class') {
      wrapper = (
        <Fragment>
          <div>{option.batchId}</div>
          <div className={styles.secondElem}>
            {option.data.length} {' students'}
          </div>
        </Fragment>
      );
    } else if (selectedCategory === 'Students') {
      let initials =
        option.firstName.substring(0, 1) + option.lastName.substring(0, 1);
      let batch = option.id.split('/')[1] + ' 01';
      wrapper = (
        <Fragment>
          <div className={styles.studentPersona}>
            <Persona
              imageInitials={initials}
              styles={dpPerson}
              size={PersonaSize.size32}
            />
            <div className={styles.personaInfo}>
              <div className={styles.name}>{option.fullName}</div>
              <div className={styles.batch}>
                {option.batchId}
                {' (' + batch + ')'}
              </div>
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <div
        className={styles.listItems}
        onClick={() => onSelectListItems(option)}>
        <span>{wrapper}</span>
      </div>
    );
  };

  const onChangeGroupSelected = (event: any) => {
    if (event) setHasSelectedCategory(true);
    setSelectedCategory(event.text);
    if (event.text === 'Home Class') {
      setPlaceHolder('Search a batch you want to add...');
      const groups = _.chain(enrolledStudent)
        .groupBy('batchId')
        .map((data, batchId) => ({ batchId, data }))
        .value();

      setSearchOptions(groups);
    } else {
      setPlaceHolder('Search a student you want to add...');
      setSearchOptions(enrolledStudent);
    }
  };

  const onChangeValue = (value: any) => {
    setSelectedData(value);
  };

  const onCheckBoxTick = () => {};

  const handleSubmit = () => {};

  const onFocusResult = () => {
    setCalloutVisible(true);
  };

  const onDismissCalloutTask = () => {
    setCalloutVisible(false);
  };

  const deleteStudentHandler = (item: any) => {};

  return (
    <Fragment>
      <div className="ms-Grid-row">
        <div className="horizontal-textfield">
          <Dropdown
            options={groupOptions}
            styles={dropdownStylesGroups}
            onRenderOption={onRenderGroupOption}
            defaultSelectedKey="-1"
            onChanged={onChangeGroupSelected}
            placeholder="Choose category..."
          />
          <div className="padR10"></div>
          <div className={'divpadt10 ' + styles.searchField}>
            <SearchBox
              placeholder={placeHolder}
              onChanged={ev => {
                onChangeValue(ev);
              }}
              id="searchBoxStudentClassTab"
              onFocus={onFocusResult}
              disabled={!hasSelectedCategory}
            />
            {calloutVisible && (
              <Callout
                className={styles.calloutStudentTab}
                role="alertdialog"
                gapSpace={0}
                beakWidth={0}
                target={'#searchBoxStudentClassTab'}
                setInitialFocus
                directionalHint={DirectionalHint.bottomLeftEdge}
                directionalHintFixed={false}
                onDismiss={onDismissCalloutTask}>
                <div>
                  <div className={'ms-Grid-row ' + styles.calloutContainer}>
                    <FocusZone direction={FocusZoneDirection.horizontal}>
                      <div data-is-scrollable>
                        {selectedCategory === 'Home Class' ? (
                          <span className={styles.title}>
                            Suggested Home Class
                          </span>
                        ) : (
                          <span className={styles.title}>
                            Suggested Student
                          </span>
                        )}
                        <List
                          items={searchOptions}
                          onRenderCell={onRenderSearchOption}
                        />
                      </div>
                    </FocusZone>
                  </div>
                </div>
              </Callout>
            )}
          </div>
        </div>

        {!selectedData ? (
          <div className="ms-Grid-col ms-lg12">
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th className={styles.rightCol} style={{ width: '15%' }}>
                    Home Class
                  </th>
                  <th className={styles.rightCol} style={{ width: '15%' }}>
                    Name{' '}
                    <FontIcon iconName="SortDown" className={styles.sortIcon} />
                  </th>

                  <th className={styles.rightCol} style={{ width: '16%' }}>
                    Registration Period
                  </th>
                  {Array.from(Array(yearCount)).map((a, key) => (
                    <th className={styles.rightCol} style={{ width: '11%' }}>
                      <div className={styles.tblHeader}>
                        <Checkbox
                          defaultChecked={false}
                          onChange={onCheckBoxTick}
                        />
                        <span className={styles.headerCheckbox}>2k en</span>
                      </div>
                    </th>
                  ))}
                  <th className={styles.rightCol} style={{ width: '16%' }}>
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.groupTitle} colSpan={7}>
                    <div
                      className={
                        'ms-Grid-col ms-lg12 ' + styles.uploadSectionContainer
                      }>
                      <div className={styles.info}>
                        <FontIcon
                          iconName="IDBadge"
                          className={styles.emptyIcon}
                        />
                        <div className={styles.emptyMessageTitle}>
                          Add student by searching their home class or name
                        </div>
                        <div className={styles.emptyMessage}>
                          We will display the student's information here.
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ms-Grid-col ms-lg12">
            <SelectedDetailsList
              listItems={selectedData}
              shimmer={shimmer}
              deleteStudentHandler={deleteStudentHandler}
              yearCount={yearCount}
            />
          </div>
        )}
        <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
          <div className={styles.container}>
            <div className={styles.btnGroup}>
              <DefaultButton
                text={intl(LabelNames.previous)}
                className="btnDefault marginR15 "
                onClick={props.cancel}
              />
              <PrimaryButton
                onClick={handleSubmit}
                text={intl(LabelNames.next)}
                disabled={!selectedData}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentEnrollmentList;
