import React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import classes from './GradeList.module.scss';

const columns = [
  {
    key: 'column1',
    name: 'English',
    fieldName: 'subject',
    minWidth: 150,
    maxWidth: 150,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    data: 'string',
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Oral Grade',
    fieldName: 'oralGrade',
    minWidth: 100,
    maxWidth: 100,
    data: 'number',
    isResizable: true,
  },
  {
    key: 'column3',
    name: 'Written Grade',
    fieldName: 'writtenGrade',
    minWidth: 100,
    maxWidth: 100,
    data: 'number',
    isResizable: true,
  },
  {
    key: 'column4',
    name: "Teacher's Remarks",
    fieldName: 'remarks',
    minWidth: 300,
    maxWidth: 300,
    data: 'string',
    isResizable: true,
  },
];

export const GradeList = props => {
  const _getKey = (item, index) => {
    return index;
  };
  const _onItemInvoked = item => {
    alert(`Item invoked: ${item.subject}`);
  };
  const onRenderCell = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    let value = '-';
    if (fieldContent?.toString().length > 0) {
      if (fieldContent?.toString() !== '0') {
        value = fieldContent;
      }
    } else {
      value = '-';
    }
    let result = (
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col-lg12 ' + classes.detailslist}>{value}</div>
      </div>
    );
    if (column.data === 'number') {
      result = (
        <div className="ms-Grid-row">
          <div
            className={
              'ms-Grid-col-lg12 ' +
              classes.detailslist +
              ' ' +
              classes.textcenter
            }>
            {value}
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12  ms-lg12">
        <DetailsList
          items={props.items}
          columns={columns}
          selectionMode={SelectionMode.none}
          getKey={_getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          onItemInvoked={_onItemInvoked}
          onRenderItemColumn={onRenderCell}
        />
      </div>
    </div>
  );
};
