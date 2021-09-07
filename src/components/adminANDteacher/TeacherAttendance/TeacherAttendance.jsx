import React, { Fragment, useState, useEffect } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import classes from './TeacherAttendance.module.scss';
import { useStore } from '../../../store/store';
//import { LabelNames } from "../../../util/constant";
//import { intl } from "../../../util/commonFunction";
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
} from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import DialogConfimation from '../../userInterface/DialogConfirmation/DialogConfirmation';
import { useBoolean } from '@uifabric/react-hooks';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

const _onColumnClick = (ev, column) => {
  const { columns, items } = this.state;
  const newColumns = columns.slice();
  const currColumn = newColumns.filter(
    currCol => column.key === currCol.key,
  )[0];
  newColumns.forEach(newCol => {
    if (newCol === currColumn) {
      currColumn.isSortedDescending = !currColumn.isSortedDescending;
      currColumn.isSorted = true;
      this.setState({
        announcedMessage: `${currColumn.name} is sorted ${
          currColumn.isSortedDescending ? 'descending' : 'ascending'
        }`,
      });
    } else {
      newCol.isSorted = false;
      newCol.isSortedDescending = true;
    }
  });
  const newItems = _copyAndSort(
    items,
    currColumn.fieldName,
    currColumn.isSortedDescending,
  );
  this.setState({
    columns: newColumns,
    items: newItems,
  });
};

function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

const item = [
  {
    id: 1,
    present: 'True',
    students: 'Clarrise Washington',
    absencePercentage: 100,
    absenceType: 'Approved',
    Remarks: '',
    lastModifiedBy: 'Clarrise Washington',
    isHidden: true,
  },
  {
    id: 2,
    present: 'True',
    students: 'Danielle Paulsen',
    absencePercentage: 100,
    absenceType: 'Approved',
    Remarks: '',
    lastModifiedBy: 'Danielle Paulsen',
    isHidden: true,
  },
  {
    id: 3,
    present: 'True',
    students: 'Jimmy Ebbessen',
    absencePercentage: 100,
    absenceType: 'Approved',
    Remarks: '',
    lastModifiedBy: 'Jimmy Ebbessen',
    isHidden: true,
  },
  {
    id: 4,
    present: 'True',
    students: 'Nanna Ibsen',
    absencePercentage: 100,
    absenceType: 'Approved',
    Remarks: '',
    lastModifiedBy: 'Nanna Ibsen',
    isHidden: true,
  },
];

const columns = [
  {
    key: 'column1',
    name: 'Present',
    fieldName: 'present',
    minWidth: 50,
    maxWidth: 50,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column2',
    name: 'Students',
    fieldName: 'students',
    minWidth: 150,
    maxWidth: 150,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column3',
    name: '',
    fieldName: 'absencePercentage',
    minWidth: 1,
    maxWidth: 1,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column4',
    name: '',
    fieldName: 'absenceType',
    minWidth: 1,
    maxWidth: 1,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column5',
    name: 'Remarks',
    fieldName: 'remarks',
    minWidth: 250,
    maxWidth: 250,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column6',
    name: 'Last Modified by',
    fieldName: 'lastModifiedBy',
    minWidth: 150,
    maxWidth: 150,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
];

const columnsFiltered = [
  {
    key: 'column2',
    name: 'Students',
    fieldName: 'students',
    minWidth: 150,
    maxWidth: 150,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column5',
    name: 'Remarks',
    fieldName: 'remarks',
    minWidth: 250,
    maxWidth: 250,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column6',
    name: 'Last Modified by',
    fieldName: 'lastModifiedBy',
    minWidth: 150,
    maxWidth: 150,
    onColumnClick: _onColumnClick,
    data: 'string',
  },
];

const options = [
  { key: 'approved', text: 'Approved' },
  { key: 'notApproved', text: 'Not Approved' },
];

const dropdownStyles = {
  dropdown: { width: 150 },
};

const sliderValueFormat = value => `${value}%`;

function TeacherAttendance(props) {
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
        <div className="ms-Grid-col-lg12">
          <span className={classes.detailslist}>{value}</span>
        </div>
      </div>
    );

    const present = (
      <div>
        {item.isHidden === false ? (
          <Toggle
            onChange={(ev, checked) => toggleOnChange(checked, item.id)}
          />
        ) : (
          <Toggle
            defaultChecked
            onChange={(ev, checked) => toggleOnChange(checked, item.id)}
          />
        )}
      </div>
    );

    if (column.fieldName === 'absencePercentage') {
      result = (
        <div className={'ms-Grid-row '}>
          {item.isHidden === false && item.absencePercentage !== 0 ? (
            <div>
              <Slider
                min={0}
                max={100}
                step={50}
                defaultValue={item.absencePercentage}
                showValue
                snapToStep
                onChanged={(ev, value, key) => sliderOnChange(value, item.id)}
                valueFormat={sliderValueFormat}
                className={
                  item.absencePercentage == 100
                    ? 'sliderBackground100'
                    : 'sliderBackground50'
                }
              />
            </div>
          ) : (
            <div
              style={{
                width: '0px !important',
                visibility: 'hidden !important',
                display: 'none !important',
              }}
            />
          )}
        </div>
      );
    }

    if (column.fieldName === 'absenceType') {
      result = (
        <div className={'ms-Grid-row '}>
          {item.isHidden === false && item.absencePercentage !== 0 ? (
            <div>
              <Dropdown
                placeholder="Select an option"
                options={options}
                styles={dropdownStyles}
                defaultSelectedKey="approved"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      );
    }

    if (column.fieldName === 'present') {
      result = (
        <div className={'ms-Grid-row '}>
          <div>{present}</div>
        </div>
      );
    }

    if (column.fieldName === 'remarks') {
      result = (
        <div className={'ms-Grid-row '}>
          <div>
            <TextField placeholder="Type here.." />
          </div>
        </div>
      );
    }

    const examplePersona = {
      imageInitials: 'AL',
      text: item.students,
    };

    if (column.fieldName === 'students') {
      result = (
        <div className={'ms-Grid-row '}>
          <div>
            <Persona {...examplePersona} size={PersonaSize.size32} />
          </div>
        </div>
      );
    }

    return result;
  };

  const [dispatch] = useStore(); //eslint-disable-line react-hooks/exhaustive-deps
  const [selectedKey, setSelectedKey] = useState('studentTab');
  const [presentToggle, setPresentToggle] = useState(true); //eslint-disable-line react-hooks/exhaustive-deps
  const [presentList, setPresentList] = useState(props.studentsList);
  const [studentpresentList, setStudentPresentList] = useState(
    props.studentsList,
  ); //eslint-disable-line react-hooks/exhaustive-deps

  const [lateList, setLateList] = useState(''); //eslint-disable-line react-hooks/exhaustive-deps
  const [absentList, setAbsentList] = useState(''); //eslint-disable-line react-hooks/exhaustive-deps

  const [columnList, setColumnList] = useState(columns);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  useEffect(() => {
    const updatedData = [...presentList];
    const updatedColumnData = [...columnList];
    updatedData.forEach(a => {
      if (a.isHidden == true) {
        updatedColumnData[2].minWidth = 150;
        updatedColumnData[2].maxWidth = 150;
        updatedColumnData[3].minWidth = 200;
        updatedColumnData[3].maxWidth = 200;
        updatedColumnData[2].name = 'Absence Percentage';
        updatedColumnData[3].name = 'Absence Type';
        a.isHidden = false;
      }
    });
  }, [props.studentsList]); //eslint-disable-line react-hooks/exhaustive-deps

  const sliderOnChange = (value, id) => {
    const updatedData = [...presentList];

    const index = updatedData.findIndex(r => r.id === id);

    updatedData[index].absencePercentage = value;

    setPresentList(updatedData);
  };

  const toggleOnChange = (checked, id) => {
    const updatedData = [...presentList];
    const updatedColumnData = [...columnList];

    const index = updatedData.findIndex(r => r.id === id);
    updatedData[index].isHidden = checked;

    const checker = updatedData.find(r => r.isHidden === false);

    if (checker) {
      updatedColumnData[2].minWidth = 150;
      updatedColumnData[2].maxWidth = 150;
      updatedColumnData[3].minWidth = 200;
      updatedColumnData[3].maxWidth = 200;
      updatedColumnData[2].name = 'Absence Percentage';
      updatedColumnData[3].name = 'Absence Type';
    } else {
      updatedColumnData[2].minWidth = 1;
      updatedColumnData[2].maxWidth = 1;
      updatedColumnData[3].minWidth = 1;
      updatedColumnData[3].maxWidth = 1;
      updatedColumnData[2].name = '';
      updatedColumnData[3].name = '';
    }

    setPresentList(updatedData);
    setColumnList(updatedColumnData);
  };

  const handleLinkClick = item => {
    setSelectedKey(item.props.itemKey);
  };

  const dialogContentPublish = {
    type: DialogType.normal,
    title: 'Do you want to confirm this attendance?',
    closeButtonAriaLabel: 'Close',
    subText: 'You can always return here and make some changes',
  };

  const ConfirmDraftHandler = () => {
    const updatedData = [...presentList];
    const studentLate = updatedData.filter(
      a => a.absencePercentage === 50 && a.absenceType === 'Approved',
    );

    const studentAbsent = updatedData.filter(
      a => a.absencePercentage === 100 && a.absenceType === 'Approved',
    );

    const studentPresent = updatedData.filter(
      a => a.absencePercentage === 0 && a.absenceType === 'Approved',
    );
    toggleHideDialog();
  };

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContentPublish}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmDraftHandler}
      />
      <br />

      <div className={classes.divBg}>
        <div className={'ms-Grid-col ms-lg9 ' + classes.searchbox}>
          <TextField borderless placeholder="Search student name..." />
        </div>
        <div className={'ms-Grid-col ms-lg3 ' + classes.searchbox}>
          <DefaultButton
            text="Confirm Attendance"
            className="confirmAttendance"
            onClick={toggleHideDialog}
          />
        </div>
        <div className={'ms-Grid-row '}>
          <div className="ms-Grid-col ms-sm12  ms-lg12">
            <Pivot
              aria-label="Links of Large Tabs Pivot Example"
              linkFormat={PivotLinkFormat.tabs}
              linkSize={PivotLinkSize.large}
              onLinkClick={handleLinkClick}
              className={selectedKey}>
              <PivotItem
                itemIcon="ContactCard"
                headerText="4 students"
                itemKey="studentTab"
                headerButtonProps={{
                  style: { color: '#6c35d4', fontSize: '14px' },
                }}>
                <div className="studentBg AbsenceDetailListHeader">
                  <DetailsList
                    items={item}
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
              </PivotItem>
              <PivotItem
                itemIcon="SkypeCircleCheck"
                headerText="0 present"
                itemKey="presentTab"
                headerButtonProps={{
                  style: { color: '#6bb700', fontSize: '14px' },
                }}>
                <div className="presentBg AbsenceDetailListHeader">
                  <DetailsList
                    items={studentpresentList}
                    columns={columnsFiltered}
                    selectionMode={SelectionMode.none}
                    getKey={_getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={_onItemInvoked}
                    onRenderItemColumn={onRenderCell}
                  />
                </div>
              </PivotItem>
              <PivotItem
                itemIcon="SkypeCircleMinus"
                headerText="0 absent"
                itemKey="absentTab"
                headerButtonProps={{
                  style: { color: '#d43b35', fontSize: '14px' },
                }}>
                <div className="absentBg AbsenceDetailListHeader">
                  <DetailsList
                    items={absentList}
                    columns={columnsFiltered}
                    selectionMode={SelectionMode.none}
                    getKey={_getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={_onItemInvoked}
                    onRenderItemColumn={onRenderCell}
                  />
                </div>
              </PivotItem>
              <PivotItem
                itemIcon="AlertSolid"
                headerText="0 latecomer"
                itemKey="latecomerTab"
                headerButtonProps={{
                  style: { color: '#f7a93b', fontSize: '14px' },
                }}>
                <div className="latecomerBg AbsenceDetailListHeader">
                  <DetailsList
                    items={lateList}
                    columns={columnsFiltered}
                    selectionMode={SelectionMode.none}
                    getKey={_getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={_onItemInvoked}
                    onRenderItemColumn={onRenderCell}
                  />
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherAttendance;
