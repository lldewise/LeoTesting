import React, { Fragment, useState, useEffect } from 'react';
import styles from './EducationalInformation.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
import { Dropdown } from 'office-ui-fabric-react';
import Calendar from '../fluentui/Calendar/Calendar';
import { Controller, useForm } from 'react-hook-form';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from '@fluentui/react/lib/Shimmer';
import { mergeStyles } from '@fluentui/react/lib/Styling';

import {
  Persona,
  PersonaSize,
  PersonaPresence,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import moment from 'moment';

import { SearchBox } from '@fluentui/react/lib/SearchBox';

import { useStore } from '../../store/store';
import SearchStudent from './SearchStudent';
const wrapperStyles = { display: 'flex' };

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0',
    },
  },
});
const dropdownStylesType = {
  dropdown: { width: '295px' },
};

const dpStyles = {
  root: {
    width: '220px',
  },
};

type EducationalInformationProps = {
  isFromUserAccount: boolean;
  submitFormHandler: (item: any) => void;
};

const EducationalInformation: React.FC<EducationalInformationProps> = props => {
  const [data] = useStore();
  const [student, setStudent] = useState<any>(data.studentInfo);
  const intialValues = {
    id: null,
    studentId: null,
    education: null,
    studyProgram: null,
    lineOfStudy: null,
    batchId: null,
    temporaryBatch: null,
    enrollmentDate: null,
  };
  const [formValues, setFormValues] = useState<any>(intialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const educationOptions = [{ key: 1, text: 'International Baccalaureate' }];
  const studyProgramOptions = [{ key: 1, text: '2020 IBv2' }];
  const lineOfStudyOptions = [{ key: 1, text: '2020/21 IB - Creative' }];
  const batchOptions = [{ key: 1, text: '2020u' }];

  const handleChange = (e: any, item: any, fields: any) => {
    if (e != null) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [fields]: item });
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.education) {
      errors.education = 'Please input required field';
    }
    if (!values.studyProgram) {
      errors.studyProgram = 'Please input required field';
    }
    if (!values.lineOfStudy) {
      errors.lineOfStudy = 'Please input required field';
    }
    if (!values.batchId) {
      errors.batchId = 'Please input required field';
    }
    return errors;
  };

  useEffect(() => {
    setStudent(data.studentInfo);
  }, [data.studentInfo]);

  const { control } = useForm();
  const onRenderTypeOption = (option: any) => {
    return (
      <div style={{ display: 'flex' }}>
        <>
          <div id={option.key}>{option.text}</div>
        </>
      </div>
    );
  };
  const wrapperStyle = { display: 'flex' };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      props.submitFormHandler(formValues);
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatSelectedDate = (data: any) => {
    const dateSelected = moment(data).format('MM/DD/YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  const getCustomElement = () => {
    return (
      <div style={wrapperStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          <ShimmerElementsGroup
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 40 },
              { type: ShimmerElementType.gap, width: 10, height: 40 },
            ]}
          />
          <ShimmerElementsGroup
            flexWrap
            width={'calc(100% - 50px)'}
            shimmerElements={[
              {
                type: ShimmerElementType.line,
                width: '100%',
                height: 10,
                verticalAlign: 'bottom',
              },
              { type: ShimmerElementType.line, width: '90%', height: 8 },
              { type: ShimmerElementType.gap, width: '10%', height: 20 },
            ]}
          />
        </div>
      </div>
    );
  };

  const _onRenderName = (props: any) => {
    return <div className={styles.name}>{props.text}</div>;
  };

  return (
    <>
      <div className={'ms-Grid-row ' + styles.studentInfo}>
        <div className={'ms-Grid-row ' + styles.searchBox}>
          {!props.isFromUserAccount && (
            <div className={'ms-Grid-col ms-lg12 '}>
              {/*   <SearchBox placeholder="Search the Student account you want to enroll" iconProps={ {iconName: 'ProfileSearch' }} />
               */}
              <SearchStudent />
            </div>
          )}
        </div>
        <div className={'ms-Grid-row ' + styles.persona}>
          <div className={'ms-Grid-col ms-lg9 '}>
            <Shimmer
              customElementsGroup={getCustomElement()}
              width="90%"
              isDataLoaded={
                student === undefined || student === null ? false : true
              }>
              <Persona
                onRenderPrimaryText={_onRenderName}
                {...student}
                size={PersonaSize.size40}
                initialsColor={PersonaInitialsColor.blue}
              />
            </Shimmer>
          </div>
          <div className={'ms-Grid-col ms-lg3 ' + styles.backButton}>
            {!props.isFromUserAccount
              ? 'View profile'
              : student.length > 0
              ? 'View profile'
              : null}
          </div>
        </div>
      </div>
      <hr className="graydiv" />
      <div className="ms-Grid-row ">
        <div className={styles.formTitle}>Education Information</div>
      </div>
      <div className="ms-Grid-row ">
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="type">
            Education <span className={styles.description2}> Required </span>
          </Label>
          <Dropdown
            options={educationOptions}
            styles={dropdownStylesType}
            onRenderOption={onRenderTypeOption}
            defaultValue={formValues.education}
            placeholder="Choose an education..."
            onChanged={e => handleChange(null, e.text, 'education')}
            errorMessage={formErrors.education}
          />
        </div>
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="type">
            Study Program{' '}
            <span className={styles.description2}> Required </span>
          </Label>
          <Dropdown
            options={studyProgramOptions}
            styles={dropdownStylesType}
            onRenderOption={onRenderTypeOption}
            defaultValue={formValues.studyProgram}
            placeholder="Choose study program..."
            onChanged={e => handleChange(null, e.text, 'studyProgram')}
            errorMessage={formErrors.studyProgram}
          />
        </div>
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="title">
            Line of Study{' '}
            <span className={styles.description2}> Required </span>
          </Label>
          <Dropdown
            options={lineOfStudyOptions}
            styles={dropdownStylesType}
            onRenderOption={onRenderTypeOption}
            defaultValue={formValues.lineOfStudy}
            placeholder="Choose line of study..."
            onChanged={e => handleChange(null, e.text, 'lineOfStudy')}
            errorMessage={formErrors.lineOfStudy}
          />
        </div>
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="type">
            Batch <span className={styles.description2}> Required </span>
          </Label>
          <Dropdown
            options={batchOptions}
            styles={dropdownStylesType}
            onRenderOption={onRenderTypeOption}
            defaultValue={formValues.batchId}
            placeholder="Choose a batch..."
            onChanged={e => handleChange(null, e.text, 'batchId')}
            errorMessage={formErrors.batchId}
          />
        </div>
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="tempbatch">
            Temporary Batch
          </Label>
          <TextField
            autoComplete="temporaryBatch"
            defaultValue=""
            className={styles.textField}
            name="temporaryBatch"
            placeholder="Enter temporary batch"
          />
        </div>
        <div className="horizontal-textfield">
          <Label style={{ width: '200px' }} htmlFor="enrollmentDate">
            Enrollment date{' '}
          </Label>
          <Calendar
            value={formValues.enrollmentDate}
            formatSelectedDate={formatSelectedDate}
            onSelectDate={(e: any) => handleChange(null, e, 'enrollmentDate')}
            placeholder="Choose date..."
            styles={dpStyles}
          />
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
          <PrimaryButton
            text="Enroll"
            className="btnPrimary marginR15"
            onClick={handleSaveClick}
          />
        </span>
      </div>
    </>
  );
};

export default EducationalInformation;
