import React, { Fragment, useEffect, useState } from 'react';
import styles from './ActivitiesInformation.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
import { useForm } from 'react-hook-form';
import { Dropdown, Toggle } from 'office-ui-fabric-react';
import Calendar from '../../../fluentui/Calendar/Calendar';
import moment from 'moment';

import classes from './ActivitiesInformation.module.scss';

const typeOptions = [
  { key: 'Other activity', text: 'Other activity' },
  { key: 'Laboratory activity', text: 'Laboratory activity' },
];
const timeOptions = [
  { key: '1', text: '7:00 AM' },
  { key: '2', text: '8:00 AM' },
  { key: '3', text: '9:00 AM' },
  { key: '4', text: '10:00 AM' },
  { key: '5', text: '11:00 AM' },
  { key: '6', text: '12:00 PM' },
  { key: '7', text: '1:00 PM' },
  { key: '8', text: '2:00 PM' },
  { key: '9', text: '3:00 PM' },
  { key: '10', text: '4:00 PM' },
  { key: '11', text: '5:00 PM' },
  { key: '12', text: '6:00 PM' },
  { key: '13', text: '7:00 PM' },
  { key: '14', text: '8:00 PM' },
  { key: '15', text: '9:00 PM' },
  { key: '16', text: '10:00 PM' },
  { key: '17', text: '11:00 PM' },
];

const dropdownStylesType = {
  dropdown: { maxWidth: '380px' },
};
const dropdownStylesTime = {
  dropdown: { width: '135px' },
};

const dpStyles = {
  root: {
    width: '235px',
  },
};

type ActivitiesInformationProps = {
  formValues: any;
  formErrors: any;
  handleChange: any;
};

const ActivitiesInformation: React.FC<ActivitiesInformationProps> = props => {
  console.log(props)
  // const { control } = useForm();
  const [nullType, setNullType] = useState<any | null>();
  const [type, setType] = useState<any | null>();
  const formatSelectedDate = (data: any) => {
    const dateSelected = moment(data).format('MMMM DD, YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  const onRenderTypeOption = (option: any) => {
    return (
      <div style={{ display: 'flex' }}>
        <>
          <div id={option.key}>{option.text}</div>
        </>
      </div>
    );
  };

  useEffect(() => {
    if (props.formValues.type === null) {
      setNullType(
        <Dropdown
          // control={control}
          options={typeOptions}
          styles={dropdownStylesType}
          onRenderOption={onRenderTypeOption}
          defaultSelectedKey={props.formValues.type}
          // autoComplete="type"
          // name="type"
          placeholder="Choose type..."
          onChange={(e: any, data: any) =>
            props.handleChange(null, data.text, 'type')
          }
          errorMessage={props.formErrors.type}
        />,
      );
    }
    if (props.formValues.type !== null) {
      setType(
        <Dropdown
          // control={control}
          options={typeOptions}
          styles={dropdownStylesType}
          onRenderOption={onRenderTypeOption}
          defaultSelectedKey={props.formValues.type}
          // autoComplete="type"
          // name="type"
          placeholder="Choose type..."
          onChange={(e: any, data: any) =>
            props.handleChange(null, data.text, 'type')
          }
          errorMessage={props.formErrors.type}
        />,
      );
    }
  }, [props.formValues.type]);

  return (
    <div className={'ms-Grid-col ms-sm12  ms-lg9 ' + styles.activityForm}>
      <div className="ms-Grid-row ">
        <div className={styles.formTitle}>Activity Information</div>
      </div>
      <div className="ms-Grid-row ">
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="type">Type</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' + classes.activityInfoItem
            }>
            {/* <Dropdown
              // control={control}
              options={typeOptions}
              styles={dropdownStylesType}
              onRenderOption={onRenderTypeOption}
              defaultSelectedKey={props.formValues.type}
              // autoComplete="type"
              // name="type"
              placeholder="Choose type..."
              onChange={(e: any, data: any) =>
                props.handleChange(null, data.text, 'type')
              }
              errorMessage={props.formErrors.type}
            /> */}
            {props.formValues.type ? type : nullType}
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="title">Title</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' + classes.activityInfoItem
            }>
            <TextField
              // control={control}
              autoComplete="title"
              value={props.formValues.title}
              className={classes.activityTextField}
              name="title"
              onChange={props.handleChange}
              placeholder="Enter title of activity..."
              errorMessage={props.formErrors.title}
            />
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="start">Start</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' +
              classes.activityInfoItem +
              ' ' +
              classes.activityStartRow
            }>
            <Calendar
              className={classes.activityStartEnd}
              value={props.formValues.startDate}
              formatSelectedDate={formatSelectedDate}
              onSelectDate={(e: any) =>
                props.handleChange(null, e, 'startDate')
              }
              placeholder="Choose date..."
              styles={dpStyles}
            />
            <div className="padR10"></div>
            <Dropdown
              className={classes.activityStartEnd}
              defaultValue={props.formValues.startTime}
              // control={control}
              options={timeOptions}
              styles={dropdownStylesTime}
              label=""
              defaultSelectedKey="1"
              // autoComplete="timeStart"
              // name="timeStart"
              placeholder="Choose time..."
              onChange={(e: any, data: any) =>
                props.handleChange(null, data.text, 'startTime')
              }
              errorMessage={props.formErrors.startTime}
            />
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="end">End</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' +
              classes.activityInfoItem +
              ' ' +
              classes.activityStartRow
            }>
            <Calendar
              className={classes.activityStartEnd}
              value={props.formValues.endDate}
              formatSelectedDate={formatSelectedDate}
              onSelectDate={(e: any) => props.handleChange(null, e, 'endDate')}
              placeholder="Choose date..."
              styles={dpStyles}
            />
            <div className="padR10"></div>
            <Dropdown
              className={classes.activityStartEnd}
              defaultValue={props.formValues.endTime}
              // control={control}
              options={timeOptions}
              styles={dropdownStylesTime}
              placeholder="Choose time..."
              label=""
              defaultSelectedKey="1"
              // autoComplete="timeEnd"
              // name="timeEnd"
              // onChanged={e => props.handleChange(null, e.text, 'endTime')}
              onChange={(e: any, data: any) =>
                props.handleChange(null, data.text, 'endTime')
              }
              errorMessage={props.formErrors.endTime}
            />
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="account">Account</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' + classes.activityInfoItem
            }>
            <TextField
              // control={control}
              autoComplete="account"
              className={classes.activityTextField}
              name="account"
              value={props.formValues.account}
              placeholder="Input account..."
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="isShowInSchedule">Show in schedule</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' + classes.activityInfoItem
            }>
            <Toggle
              label=""
              onText="Yes"
              offText="No"
              defaultChecked={true}
              onChange={(e, checked) =>
                props.handleChange(null, checked, 'isShowInSchedule')
              }
            />
          </div>
        </div>
        <div
          className={'ms-Grid-col ms-sm12 ms-lg12 ' + classes.activityInfoForm}>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg3  ms-xl2 ' + classes.activityInfoItem
            }>
            <Label htmlFor="status">Status</Label>
          </div>
          <div
            className={
              'ms-Grid-col ms-sm12  ms-lg9 ' + classes.activityInfoItem
            }>
            {props.formValues.status === true && (
              <>
                <Toggle
                  // name="confirm"
                  label=""
                  className={'attendanceToggle ' + classes.activitySched}
                  defaultChecked={true}
                  onChange={(e, checkedStatus) =>
                    props.handleChange(null, checkedStatus, 'status')
                  }
                />
                <div className={styles.statusToggleDiv}>
                  <>
                    <span>
                      <i
                        //  name="confirm"
                        className={
                          'ms-Icon ms-Icon--Completed ' +
                          styles.statusToggleIcon
                        }
                        aria-hidden="true"></i>
                    </span>
                    <span>
                      <label className={styles.statusToggleLabel}>
                        Confirm
                      </label>
                    </span>
                  </>
                </div>
              </>
            )}
            {props.formValues.status === false && (
              <>
                <Toggle
                  // name="cancel"
                  label=""
                  className={'attendanceToggle ' + classes.activitySched}
                  defaultChecked={false}
                  onChange={(e, checkedStatus) =>
                    props.handleChange(null, checkedStatus, 'status')
                  }
                />
                <div className={styles.statusToggleDiv}>
                  <>
                    <span>
                      <i
                        // name="cancel"
                        className={
                          'ms-Icon ms-Icon--ErrorBadge ' +
                          styles.statusToggleIcon
                        }
                        aria-hidden="true"></i>
                    </span>
                    <span>
                      <label className={styles.statusToggleLabel}>Cancel</label>
                    </span>
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesInformation;
