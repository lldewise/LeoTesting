import React, { useState, useEffect, Fragment } from 'react';
import styles from './SelectedDetailsList.module.scss';
import './SelectedDetailsList.scss';
import {
  IconButton,
  Persona,
  PersonaSize,
  MarqueeSelection,
  ShimmeredDetailsList,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react';
import { Checkbox, TextField, FontIcon, Label, Stack } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import _ from 'lodash';

const dpPerson = {
  root: {
    fontSize: '18px',
  },
  primaryText: {
    fontSize: '14px !important',
  },
  secondaryText: {
    fontSize: '12px !important',
    display: 'block !important',
    color: '#595959',
  },
};

type SelectedDetailsListProps = {
  listItems: any[];
  yearCount: number;
  shimmer: boolean;
  deleteStudentHandler: (item: any) => void;
};

const SelectedDetailsList: React.FC<SelectedDetailsListProps> = props => {
  const [studentList, setStudentList] = useState<any[]>(props.listItems);
  const [dataColumn, setDataColumn] = useState<any[]>([]);
  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);

  const onCheckBoxTick = (items: any) => {};

  const onRenderChange = (ev: any, newText: any) => {
    const newMultiline = newText.length > 25;
    if (newMultiline !== multiline) {
      toggleMultiline();
    }
  };

  const menuPropsActive = {
    items: [
      {
        id: '1',
        key: 'remove',
        text: 'Remove Student',
        iconProps: { iconName: 'ChromeClose' },
      },
    ],
    onItemClick: (e: any, props: any) => {
      clickMenuHandler(props);
    },
  };

  const clickMenuHandler = (item: any) => {
    if (item.key === 'remove') {
      props.deleteStudentHandler(item);
    }
  };

  const handleCAlloutClick = (item: any) => {};

  let _columns: any[] = [
    {
      key: 'column0',
      name: 'Name',
      fieldName: 'NameWithSort',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 250,
      maxWidth: 250,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        let batch = item.id.split('/')[1] + ' 01';
        return (
          <Fragment>
            <div className={styles.studentSection}>
              <Persona
                imageUrl={item.imgUrl}
                text={item.fullName}
                size={PersonaSize.size32}
                secondaryText={batch}
                styles={dpPerson}
              />
              <IconButton
                id={'moreLink' + item.id}
                iconProps={{
                  iconName: 'moreVertical',
                  onClick: () => handleCAlloutClick(item),
                }}
                className="btnIcon btnIconDark btnIcon hideMenuIcon"
                menuProps={menuPropsActive}
              />
            </div>
          </Fragment>
        );
      },
    },
    {
      key: 'column1',
      name: 'Home Class',
      fieldName: 'HomeClass',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 80,
      maxWidth: 100,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.tableMargin}>{item.batchId}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column2',
      name: 'Registration Period',
      fieldName: 'RegistrationPeriod',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 140,
      maxWidth: 150,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.tableMargin}>{'1/8/2019 - 30/6/2024'}</div>
          </Fragment>
        );
      },
    },
  ];

  if (props.yearCount > 0) {
    Array.from(Array(props.yearCount)).map((a, key) => {
      let colKey = _columns.length;
      let colName = key + 1 + 'k en';
      let year1 = '202' + (key + 1);
      let year2 = '2' + (key + 2);
      let tblCol = {
        key: 'column' + colKey,
        name: (
          <div className={styles.headerCheckboxSection}>
            <div className={styles.leftColHeader}>
              <Checkbox
                defaultChecked={true}
                className={styles.headerCheckbox}
              />
              <div style={{ width: '100%' }}>
                <div className={styles.headerColName}>{colName}</div>
                <div className={styles.headerColYear}>
                  {year1 + '/' + year2}
                </div>
              </div>
            </div>
            <div className={styles.rightColHeader}>
              <FontIcon iconName="IDBadge" className="iconRight" />
              <span className={styles.studCount}>3</span>
            </div>
          </div>
        ),
        fieldName: colName,
        isSorted: false,
        isSortedDescending: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        minWidth: 150,
        maxWidth: 150,
        onRender: (item: any) => {
          return (
            <Fragment>
              <div className={styles.subjectDateSelection}>
                <Checkbox
                  defaultChecked={true}
                  className={styles.checkContent}
                  onChange={() => onCheckBoxTick(item)}
                />
                <div className={styles.lblNames}>{'Enrolled'}</div>
              </div>
            </Fragment>
          );
        },
      };
      _columns.push(tblCol);
    });
  }

  let colKey = _columns.length;
  let remarks = {
    key: 'column3' + colKey,
    name: 'Remarks',
    fieldName: 'Remarks',
    isSorted: false,
    isSortedDescending: true,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    minWidth: 180,
    maxWidth: 180,
    onRender: (item: any) => {
      return (
        <Fragment>
          <div className={styles.txtRemarks}>
            <TextField
              className={styles.remarkField}
              multiline={multiline}
              placeholder="Type remarks.."
              defaultValue={''}
              name="remarks"
              onChange={onRenderChange}
            />
          </div>
        </Fragment>
      );
    },
  };
  _columns.push(remarks);

  function _onColumnClick(ev: any, column: any, data: any) {
    const userColumns: any[] = _columns.slice();
    const currColumn = userColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    userColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = false;
      }
    });
    const newList = _copyAndSort(
      data,
      currColumn.fieldName,
      currColumn.isSortedDescending,
    );
    setStudentList(newList);
    setDataColumn(userColumns);
  }

  function _copyAndSort<T>(
    items: T[],
    columnKey: string,
    isSortedDescending?: boolean,
  ): T[] {
    const key = columnKey as keyof T;
    return items
      .slice(0)
      .sort((a: T, b: T) =>
        (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
      );
  }

  useEffect(() => {
    setDataColumn(_columns);
  }, [multiline]);

  const handleChange = () => {};

  return (
    <div className="studentEnrolleeList">
      <ShimmeredDetailsList
        items={studentList || []}
        layoutMode={DetailsListLayoutMode.justified}
        columns={dataColumn}
        checkboxVisibility={2}
        enableShimmer={props.shimmer}
      />{' '}
    </div>
  );
};

export default SelectedDetailsList;
