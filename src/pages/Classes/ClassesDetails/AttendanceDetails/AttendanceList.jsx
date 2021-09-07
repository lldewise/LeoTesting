import React, { Fragment } from 'react';
import { useState } from 'react';
import {
  DetailsListLayoutMode,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
//import DialogConfirmation from '../../../../components/ui/DialogConfirmation'
import { useBoolean } from '@uifabric/react-hooks';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Text } from 'office-ui-fabric-react/lib/Text';
import classes from './AttendanceDetails.module.scss';

function AttendanceList(props) {
  // eslint-disable-next-line
  const [AttendancePercentage, setAttendancePercentage] = useState(100);
  //const [shimmer, setShimmer] = useState(props.shimmer);
  const { filter, students, shimmer, newstudentlist, studentsListOld } = props;
  const [showToggle, { toggle: toggleSort }] = useBoolean(false);
  // eslint-disable-next-line
  const [remarks, setRemarks] = useState("");
  let filteredStudents = [];
  let totalStudent = 0;
  let totalPresent = 0;
  let tableBg = 'studentBg';
  if (students != null) {
    totalStudent = students.length;
    totalPresent = students.filter(a => a.percentage === 100).length;
    switch (filter) {
      case 'studentTab':
        filteredStudents = students;
        break;
      case 'presentTab':
        filteredStudents = students.filter(a => a.percentage === 100);
        tableBg = 'presentBg';
        break;
      case 'latecomerTab':
        filteredStudents = students.filter(a => a.percentage === 50);
        tableBg = 'latecomerBg';
        break;
      case 'absentTab':
        filteredStudents = students.filter(a => a.percentage === 0);
        tableBg = 'absentBg';
        break;
      default:
    }
  }
  // eslint-disable-next-line
  const [remarksValue, setRemarksValue] = useState("filteredStudents");
  //const enableShimmer = filteredStudents.length >0 ? false : true;

  if (props.searchFilter.length > 0) {
    filteredStudents = props.searchFilter
      ? filteredStudents.filter(
          i => i.students.toLowerCase().indexOf(props.searchFilter) > -1,
        )
      : filteredStudents;
  }

  const options = [
    { key: '1', text: 'Approved' },
    { key: '0', text: 'Not Approved' },
  ];
  const _onColumnClick = (ev, column) => {
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    toggleSort();
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = showToggle;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      studentsListOld,
      currColumn.fieldName,
      currColumn.isSortedDescending,
    );
    newstudentlist(newItems);
  };
  const columns = [
    {
      key: 'column1',
      name: 'Present',
      fieldName: 'present',
      minWidth: 50,
      maxWidth: 50,
      data: 'string',
    },
    {
      key: 'column2',
      name: 'Students',
      fieldName: 'students',
      minWidth: 100,
      maxWidth: 130,
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: _onColumnClick,
      data: 'string',
    },
    {
      key: 'column3',
      name: 'Absence %',
      fieldName: 'percentage',
      minWidth: 150,
      maxWidth: 150,
      data: 'string',
    },
    {
      key: 'column4',
      name: 'Absent Type',
      fieldName: 'absenceType',
      minWidth: 80,
      maxWidth: 100,
      data: 'string',
    },
    {
      key: 'column5',
      name: 'Remarks',
      fieldName: 'remarks',
      minWidth: 150,
      maxWidth: 200,
      data: 'string',
    },
    {
      key: 'column6',
      name: 'Last Modified by',
      fieldName: 'lastModifiedBy',
      minWidth: 130,
      maxWidth: 130,
      data: 'string',
    },
  ];
  const columnFiltered = [
    {
      key: 'column1',
      name: 'Present',
      fieldName: 'present',
      minWidth: 50,
      maxWidth: 50,
      data: 'string',
    },
    {
      key: 'column2',
      name: 'Students',
      fieldName: 'students',
      minWidth: 100,
      maxWidth: 130,
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
      minWidth: 150,
      maxWidth: 200,
      data: 'string',
    },
    {
      key: 'column6',
      name: 'Last Modified by',
      fieldName: 'lastModifiedBy',
      minWidth: 130,
      maxWidth: 130,
      data: 'string',
    },
  ];
  // const _setAttendancePercentage = (value) => {
  //   switch (value) {
  //     case 50:
  //       setAttendancePercentage(50);
  //       break;
  //     case 0:
  //       setAttendancePercentage(100);
  //       break;
  //     default:
  //       setAttendancePercentage(0);
  //       break;
  //   }
  // };
  const onRenderCell = (item, index, column) => {
    let result;
    /*  const fieldContent = item[column.fieldName];
    let value = "-";
    if (fieldContent?.toString().length > 0) {
      if (fieldContent?.toString() !== "0") {
        value = fieldContent;
      }
    } else {
      value = "-";
    }
    let result = (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col-lg12">
          <span>{value}</span>
        </div>
      </div>
    );
 */
    let percentage = 0;
    switch (item.percentage) {
      case 50:
        percentage = 50;
        break;
      case 0:
        percentage = 100;
        break;
      default:
        percentage = 0;
        break;
    }

    const percentageSlider = (
      <div>
        <Slider
          min={0}
          max={100}
          step={50}
          // defaultValue={percentage}
          value={percentage}
          showValue
          snapToStep
          onChanged={(ev, value, key) => sliderOnChange(value, item.id)}
          // valueFormat={sliderValueFormat}
          className={
            item.percentage === 0 ? 'sliderBackground100' : 'sliderBackground50'
          }
        />
      </div>
    );

    if (column.fieldName === 'present') {
      return (
        <div className={'ms-Grid-row ' + classes.toggleMargin}>
          <Toggle
            role="checkbox"
            checked={item.present}
            onChange={(ev, checked) => toggleOnChange(checked, item.id)}
            className="attendanceToggle"
          />
        </div>
      );
    }
    if (column.fieldName === 'percentage') {
      // return percentageSlider;
      return item.percentage === 100 ? '' : percentageSlider;
    }
    if (column.fieldName === 'absenceType') {
      const id = item.id;

      result = (
        <div className={'ms-Grid-row '}>
          <div>
            <Dropdown
              placeholder="Select an option"
              options={options}
              //  styles={dropdownStyles}
              //  defaultSelectedKey={item.absenceType}
              //value = {item.absenceType}
              selectedKey={item.absenceType}
              // onChange = { (ev, selectedOption) => onAbsenceTypeChange(selectedOption, item.id)}
              //  onChange = {onAbsenceTypeChange}
              key={item.id}
              onChange={(ev, item) => onAbsenceTypeChange(item, id)}
              // onRenderCell ={}
            />
          </div>
        </div>
      );
      return item.percentage === 100 ? '' : result;
    }

    if (column.fieldName === 'remarks') {
      //setRemarks(item.remarks);
      const itemId = item.id;
      result = (
        <div className={'ms-Grid-row '}>
          <div key={item.id}>
            <TextField
              key={itemId}
              id={itemId}
              // itemRef = { 'input Ref.current.disabled = false'}
              //data={item.remarks}
              placeholder="Type here.."
              defaultValue={item.remarks}
              onChange={onRemarksChange}
              //onFocus = {onFocus}
              // onFocus={(ev, value) => onFocus( ev, value)}
              //readOnly = {false}
            />
          </div>
        </div>
      );
      return result;
    }
    if (column.fieldName === 'students') {
      result = (
        <div className={'ms-Grid-row '}>
          <div>
            <Persona
              text={item.students}
              onRenderPrimaryText={_onRenderText}
              size={PersonaSize.size32}
            />
          </div>
        </div>
      );
      return result;
    }
    if (column.fieldName === 'lastModifiedBy') {
      result = (
        <div className={'ms-Grid-row '}>
          <div>
            <Label>{item.lastModifiedBy}</Label>
          </div>
        </div>
      );
    }
    return result;
  };
  const sliderOnChange = (value, id) => {
    props.editPercentage(value, id);
  };

  const onAbsenceTypeChange = (value, id) => {
    props.editAbsenceType(value.key, id);
  };
  function _onRenderText(props) {
    return (
      <div>
        <Text variant="medium" nowrap block>
          {props.text}
        </Text>
      </div>
    );
  }
  //*********************Handle TextField Change***************************
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleChange = event => {
    event.persist();
    setRemarks(event.target.value);
    props.editRemarks(event.target.value, event.target.id);

    // console.log("Something is changed in the textarea")
    // console.log(event.target.value + ' - ' + event.target.id)
  };
  let onRemarksChange = debounce(handleChange, 500);
  const toggleOnChange = (checked, id) => {
    props.editStatus(checked, id);
  };

  // const onFocus = (e, value) => {};
  // const shimmeredDetailsListProps = {
  //   renderedWindowsAhead: 0,
  //   renderedWindowsBehind: 1,
  // };

  return (
    <>
      {/* <TextField label="Filter by name:" onChange={_onChangeText}  /> */}
      <div className={tableBg + ' AbsenceDetailListHeader'}>
        {/*       <DetailsList
          items={filteredStudents}
          columns={
            totalStudent === totalPresent &&
            totalStudent !== 0 &&
            filter === "studentTab"
              ? columnFiltered
              : columns
          }
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
 
          onRenderItemColumn={onRenderCell}
        /> */}
        <ShimmeredDetailsList
          items={filteredStudents || []}
          columns={
            totalStudent === totalPresent &&
            totalStudent !== 0 &&
            filter === 'studentTab'
              ? columnFiltered
              : columns
          }
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          //  listProps= {shimmeredDetailsListProps}
          onRenderItemColumn={onRenderCell}
          enableShimmer={shimmer}
          //isHeaderVisible={true}
          //onItemInvoked={_onItemInvoked}
          //getKey={_getKey}
        />
      </div>
    </>
  );
}
function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

export default AttendanceList;
