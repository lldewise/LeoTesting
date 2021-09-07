import React, { Fragment, useState, useEffect } from 'react';
import styles from './EmploymentInfo.module.scss';
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import moment from 'moment';
import Calendar from '../../../../../components/fluentui/Calendar/Calendar';
import { LabelNames } from '../../../../../util/constant';
import { intl } from '../../../../../util/commonFunction';

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '130px',
  },
});

type MainEmploymentInfoProps = {
  employee: any;
  isEdit: boolean;
  next: (prev: string, next: string, data: any) => void;
  cancel: () => void;
};

const EmploymentInfo: React.FC<MainEmploymentInfoProps> = props => {
  const intialValues = {
    bankNo: props.employee?.bankNo,
    bankAccountNo: props.employee?.bankAccountNo,
    withdrawalPercentage: props.employee?.withdrawalPercentage,
    employmentRate: props.employee?.employmentRate,
    dateEmployment: props.employee?.dateEmployment,
    dateResignation: props.employee?.dateResignation,
    homeInstitutionNo: props.employee?.homeInstitutionNo,
  };
  const [formValues, setFormValues] = useState<any>(intialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = () => {
    console.log(formValues);
    var data = {
      bankNo: formValues.bankNo,
      bankAccountNo: formValues.bankAccountNo,
      withdrawalPercentage: formValues.withdrawalPercentage,
      employmentRate: formValues.employmentRate,
      dateEmployment: formValues.dateEmployment,
      dateResignation: formValues.dateResignation,
      homeInstitutionNo: formValues.homeInstitutionNo,
      id: props.employee?.id,
    };
    if (props.isEdit) {
      props.next('4', '10', data);
    } else {
      props.next('4', '5', data);
    }
  };

  const validate = (values: any) => {
    let errors = {};
    const regexnumner = /^[0-9]+$/;
    var eblank = intl(LabelNames.pleaseInputRequiredField);
    var enumber = intl(LabelNames.shouldOnlyContainNumber);
    // if (!values.bankNo) {
    //   errors.bankNo = eblank;
    // }
    // if (values.bankNo && !regexnumner.test(values.bankNo)) {
    //   errors.bankNo = enumber;
    // }
    // if (!values.bankAccountNo) {
    //   errors.bankAccountNo = eblank;
    // }
    // if (values.bankAccountNo && !regexnumner.test(values.bankAccountNo)) {
    //   errors.bankAccountNo = enumber;
    // }
    // if (!values.withdrawalPercentage) {
    //   errors.withdrawalPercentage = eblank;
    // }
    // if (
    //   values.withdrawalPercentage &&
    //   !regexnumner.test(values.withdrawalPercentage)
    // ) {
    //   errors.withdrawalPercentage = enumber;
    // }
    // if (!values.employmentRate) {
    //   errors.employmentRate = eblank;
    // }
    // if (values.employmentRate && !regexnumner.test(values.employmentRate)) {
    //   errors.employmentRate = enumber;
    // }
    // if (!values.dateEmployment) {
    //   errors.dateEmployment = eblank;
    // }
    // if (!values.dateResignation) {
    //   errors.dateResignation = eblank;
    // }
    // if (!values.homeInstitutionNo) {
    //   errors.homeInstitutionNo = eblank;
    // }
    // if (
    //   values.homeInstitutionNo &&
    //   !regexnumner.test(values.homeInstitutionNo)
    // ) {
    //   errors.homeInstitutionNo = enumber;
    // }
    return errors;
  };
  const handleChange = (e: any, item: any, fields: string) => {
    if (e != null) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [fields]: item });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const prevHandler = () => {
    var data = {
      bankNo: formValues.bankNo,
      bankAccountNo: formValues.bankAccountNo,
      withdrawalPercentage: formValues.withdrawalPercentage,
      employmentRate: formValues.employmentRate,
      dateEmployment: formValues.dateEmployment,
      dateResignation: formValues.dateResignation,
      homeInstitutionNo: formValues.homeInstitutionNo,
      id: props.employee?.id,
    };
    props.next('4', '2', data);
  };

  const formatSelectedDate = (data: Date) => {
    const dateSelected = moment(data).format('MM/DD/YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  return (
    <Fragment>
      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              {intl(LabelNames.employementInformation)}
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 ">
              {intl(LabelNames.employeedesc)}
            </div>
          </div>
          <br />
          <br />
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.bankNo)} </span>
                </div>
                <div className={styles.col3}>
                  <TextField
                    placeholder={
                      intl(LabelNames.enter) +
                      ' ' +
                      intl(LabelNames.bankNo).toLocaleLowerCase()
                    }
                    defaultValue={intialValues.bankNo}
                    errorMessage={formErrors.bankNo}
                    name="bankNo"
                    onChange={(e, value) => handleChange(null, value, 'bankNo')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.bankAccountNo)} </span>
                </div>
                <div className={styles.col3}>
                  <TextField
                    placeholder={
                      intl(LabelNames.enter) +
                      ' ' +
                      intl(LabelNames.bankAccountNo).toLocaleLowerCase()
                    }
                    defaultValue={intialValues.bankAccountNo}
                    errorMessage={formErrors.bankAccountNo}
                    name="bankAccountNo"
                    onChange={(e, value) =>
                      handleChange(null, value, 'bankAccountNo')
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.withdrawalPercentage)}</span>
                </div>
                <div className={styles.col2}>
                  <TextField
                    placeholder={
                      intl(LabelNames.enter) +
                      ' ' +
                      intl(LabelNames.withdrawalPercentage).toLocaleLowerCase()
                    }
                    defaultValue={intialValues.withdrawalPercentage}
                    name="withdrawalPercentage"
                    errorMessage={formErrors.withdrawalPercentage}
                    onChange={(e, value) =>
                      handleChange(null, value, 'withdrawalPercentage')
                    }
                  />
                  <div className={styles.percent}>%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span>{intl(LabelNames.employmentRate)}</span>
                </div>
                <div className={styles.col2}>
                  <TextField
                    placeholder={
                      intl(LabelNames.enter) +
                      ' ' +
                      intl(LabelNames.employmentRate).toLocaleLowerCase()
                    }
                    defaultValue={intialValues.employmentRate}
                    errorMessage={formErrors.employmentRate}
                    name="employmentRate"
                    onChange={(e, value) =>
                      handleChange(null, value, 'employmentRate')
                    }
                  />
                  <div className={styles.percent}>%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.dateEmployment)}</span>
                </div>
                <div className={styles.col2}>
                  <Calendar
                    value={formValues.dateEmployment}
                    formatSelectedDate={formatSelectedDate}
                    onSelectDate={(data: Date) => {
                      handleChange(null, data, 'dateEmployment');
                    }}
                    styles={controlClass.control}
                    placeholder={intl(LabelNames.selectadate)}
                    errorMessage={formErrors.dateEmployment}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.dateResignation)}</span>
                </div>
                <div className={styles.col2}>
                  <Calendar
                    value={formValues.dateResignation}
                    formatSelectedDate={formatSelectedDate}
                    onSelectDate={(data: Date) => {
                      handleChange(null, data, 'dateResignation');
                    }}
                    styles={controlClass.control}
                    placeholder={intl(LabelNames.selectadate)}
                    errorMessage={formErrors.dateResignation}
                  />
                  {/* <TextField defaultValue={dateResignation} onChange={dateResignationHandler} /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span>{intl(LabelNames.homeInstitutionNo)}</span>
                </div>
                <div className={styles.col2}>
                  <TextField
                    placeholder={
                      intl(LabelNames.enter) +
                      ' ' +
                      intl(LabelNames.homeInstitutionNo).toLocaleLowerCase()
                    }
                    defaultValue={intialValues.homeInstitutionNo}
                    errorMessage={formErrors.homeInstitutionNo}
                    name="homeInstitutionNo"
                    onChange={(e, value) =>
                      handleChange(null, value, 'homeInstitutionNo')
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {props.isEdit ? (
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}></div>
                  <div className={styles.col2}>
                    <span className={styles.btnGroup}>
                      <DefaultButton
                        text="Cancel"
                        className="btnDefault marginR15 "
                        onClick={props.cancel}
                      />
                      <PrimaryButton onClick={handleSubmit} text="Save" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}></div>
                  <div className={'text-right ' + styles.col3}>
                    <span className={styles.btnGroup}>
                      <DefaultButton
                        text={intl(LabelNames.previous)}
                        className="btnDefault marginR15 "
                        onClick={prevHandler}
                      />
                      <PrimaryButton
                        onClick={handleSubmit}
                        text={intl(LabelNames.next)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default EmploymentInfo;
