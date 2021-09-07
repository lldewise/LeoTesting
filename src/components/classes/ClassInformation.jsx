import React, { Fragment, useState } from 'react';
import styles from './ClassInformation.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
import { Dropdown } from 'office-ui-fabric-react';
import Calendar from '../fluentui/Calendar/Calendar';
import { PrimaryButton, DefaultButton, Checkbox } from 'office-ui-fabric-react';
import classes from './ClassInformation.module.scss';

const dropdownStylesType = {
  dropdown: {
    maxWidth: '295px',
    minWidth: '100%',
  },
};

const dpStyles = {
  root: {
    width: '152px',
    paddingRight: '10px',
    display: 'inline-block',
  },
};

const ClassInformation = props => {
  //eslint-disable-next-line
  const [title, setTitle] = useState("Title will display hereXXX");
  //eslint-disable-next-line
  const [isDisabled, setDisabled] = useState(true);
  const onRenderTypeOption = option => {
    return (
      <div style={{ display: 'flex' }}>
        <>
          <div id={option.key}>{option.text}</div>
        </>
      </div>
    );
  };

  return (
    <>
      <div className="ms-Grid-row ">
        <div className={styles.formTitle}>Class Information</div>
      </div>
      <div className="ms-Grid-row ">
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="type">
              Class Title
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <TextField
              className={styles.classTitle}
              readOnly={true}
              disabled={isDisabled}
              borderless
              placeholder="Title will display here"
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="type">
              XPRS Subject
            </Label>
          </div>
          <div className={'ms-Grid-col  ms-lg8 ' + classes.classInfoItem}>
            <Dropdown
              styles={dropdownStylesType}
              onRenderOption={onRenderTypeOption}
              defaultSelectedKey="-1"
              autoComplete="type"
              name="type"
              placeholder="Select XPRS subject"
              onChanged={props.typeHandler}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="title">
              Subject
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Dropdown
              styles={dropdownStylesType}
              onRenderOption={onRenderTypeOption}
              defaultSelectedKey="-1"
              autoComplete="type"
              name="title"
              placeholder="Select subject "
              onChanged={props.typeHandler}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="alias">
              Class Alias
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <TextField
              autoComplete="alias"
              defaultValue=""
              className={styles.textFieldSmall}
              name="alias"
              placeholder="Input class alias"
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="startYear">
              Start Year
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Calendar
              views={['year']}
              value={props.selectedEndDate}
              onSelectDate={props.handleSelectedEndDate}
              styles={dpStyles}
              placeholder={'Start year'}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="term">
              Final Term
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Dropdown
              styles={dropdownStylesType}
              onRenderOption={onRenderTypeOption}
              defaultSelectedKey="-1"
              autoComplete="type"
              name="term"
              placeholder="Final term"
              onChanged={props.typeHandler}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="cprNo">
              Period{' '}
              <span className={styles.description2}>
                {' '}
                For short term classes{' '}
              </span>
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Calendar
              value={props.selectedEndDate}
              onSelectDate={props.handleSelectedEndDate}
              styles={dpStyles}
              placeholder={'From'}
            />
            <Calendar
              value={props.selectedEndDate}
              onSelectDate={props.handleSelectedEndDate}
              styles={dpStyles}
              placeholder={'To'}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="title">
              Subject Type
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Dropdown
              //   options={typeOptions}
              styles={dropdownStylesType}
              onRenderOption={onRenderTypeOption}
              defaultSelectedKey="-1"
              autoComplete="type"
              name="title"
              placeholder="Select subject type"
              onChanged={props.typeHandler}
            />
          </div>
        </div>
        <div className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.classInfoForm}>
          <div className={'ms-Grid-col ms-lg4 ' + classes.classInfoItem}>
            <Label style={{ width: '200px' }} htmlFor="enrollmentDate">
              Grades
            </Label>
          </div>
          <div className={'ms-Grid-col ms-lg8 ' + classes.classInfoItem}>
            <Checkbox label="Assign grading" defaultChecked={true} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <div style={{ textAlign: 'right' }}>
        <span>
          <DefaultButton text="Cancel" className="btnDefault marginR15" />
        </span>
        <span className="padR10" />
        <span>
          <PrimaryButton text="Save" className="btnPrimary marginR15" />
        </span>
      </div>
    </>
  );
};

export default ClassInformation;
