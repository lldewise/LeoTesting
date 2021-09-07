import React, { useState, useEffect } from 'react';
import styles from './ActivityAttendance.module.scss';
import {
  FontIcon,
  DetailsList,
  Checkbox,
  // CheckboxVisibility,
  SelectionMode,
} from 'office-ui-fabric-react';
import { useStore } from '../../../../../store/store';

const ActivityAttendancePanel: React.FC = () => {
  // eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [column, setColumn] = useState<any[]>();
  const [itemList, setItemList] = useState(data.adminActivityDoubleList);
  // eslint-disable-next-line
  const [snumber, setsNumber] = useState(0);

  const onRenderCheckbox = (item: any) => {
    return (
      <div style={{ pointerEvents: 'none' }}>
        <Checkbox checked={item.checked} />
      </div>
    );
  };

  const _onColumnClick = (ev: any, col: any, value: any[]) => {
    const newColumns: any[] = _column.slice();
    const currColumn: any = newColumns.filter(
      currCol => col.key === currCol.key,
    )[0];

    let newItems: any[] = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending,
    );

    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev: any, column: any) => {
          _onColumnClick(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    setItemList(newItems);
    setColumn(newColumns);
    setsNumber(1);
  };

  const _column = [
    {
      key: '0',
      name: 'Activity',
      minWidth: 100,
      maxWidth: 420,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, data.adminActivityDoubleList);
      },
      onRender: (item: any) => {
        return (
          <div className={'padT10 ' + styles.itemContainer}>
            <div className="padR10">
              <FontIcon className={styles.icon1} iconName={item.group} />
            </div>
            <div> {item.name}</div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (data.adminActivityDoubleList.length > 0) {
      setColumn(_column);
      setItemList(data.adminActivityDoubleList);
    }
  }, [data.adminActivityDoubleList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ms-Grid-col ms-lg12">
      <div className={styles.container}>
        <div className={styles.fistCol}>
          <div className={styles.desc}>List of double booked activities</div>
        </div>
      </div>
      <br />
      <div className="ms-Grid-col ms-lg12 ActivityDetailList">
        {itemList.length > 0 && (
          <DetailsList
            items={itemList}
            columns={column}
            //selection={_selection}
            selectionMode={SelectionMode.none}
            selectionPreservedOnEmptyClick={true}
            isHeaderVisible={true}
            // checkboxVisibility={CheckboxVisibility.always}
            // onRenderCheckbox={onRenderCheckbox}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityAttendancePanel;

function _copyAndSort(items: any[], columnKey: any, isSortedDescending: any) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}
