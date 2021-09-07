import React, { Fragment, useState, useEffect } from 'react';
import styles from './ClassInformation.module.scss';
import {
  PrimaryButton,
  DefaultButton,
  Dropdown,
  TextField,
  Checkbox,
  TagPicker,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../../util/constant';
import { intl } from '../../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import i18n from '../../../../../i18n/i18n';

const SubjectOptions = [
  { key: 'English 1', text: 'English 1' },
  { key: 'Math 1', text: 'Match 1' },
];
const LevelOptions = [
  { key: 'Level 1', text: 'Level 1' },
  { key: 'Level 2', text: 'Level 2' },
];

const CategoryOptions = [
  { key: 'Category 1', text: 'Category 1' },
  { key: 'Category 2', text: 'Category 2' },
];

type ClassInformationProps = {
  xprsSubject: any;
  cancel: any;
};

const ClassInformation: React.FC<ClassInformationProps> = props => {
  const picker = React.useRef(null);
  const [selecetedLang, setSelecetedLang] = useState();
  const intialValues = {
    email: '',
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const submitForm = () => {
    console.log(formValues);
    // var data = {
    //   xprsSubject: formValues.xprsSubject,
    //   subject: formValues.subject,
    //   subjectLevel: formValues.subjectLevel,
    //   subjectCategory: formValues.subjectCategory,
    //   classAlias: formValues.classAlias,
    //   capacity: formValues.capacity,
    //   price: formValues.price,
    //   grades: formValues.grades,
    // };
    // props.next("0", "1", data);
  };

  const handleChange = (e: any, item: any, fields: any) => {
    if (e !== null) {
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

  const validate = (values: any) => {
    let errors: any = {};
    const regexnumner = /^[0-9]+$/;
    const errorMessage = 'Please select required field';
    const errorMessage1 = 'Please input required field';
    if (!values.xprsSubject) {
      errors.xprsSubject = errorMessage;
    }
    if (!values.subject) {
      errors.subject = errorMessage;
    }
    if (!values.subjectCategory) {
      errors.subjectCategory = errorMessage;
    }
    if (!values.classAlias) {
      errors.classAlias = errorMessage1;
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterSelectedTags = (filterText: any, tagList: any) => {
    return filterText
      ? props.xprsSubject.filter(
          (tag: any) =>
            tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  const onItemSelected = React.useCallback((item: any) => {
    if (picker.current && listContainsTagList(item, picker.current)) {
      return null;
    }
    return item;
  }, []);

  const listContainsTagList = (tag: any, tagList: any) => {
    if (!tagList.items || !tagList.items.length || tagList.items.length === 0) {
      return false;
    }
    return tagList.some((compareTag: any) => compareTag.key === tag.key);
  };

  const getTextFromItem = (item: any) => item.name;
  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested XPRS Subject',
    noResultsFoundText: 'No XPRS Subject found',
  };

  const returnMostRecentlyUsed = () => {
    return props.xprsSubject;
  };

  return (
    <>
      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              Class Information
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerDesc}>
              Input class information to start creating class.
            </div>
          </div>
          <br />
          <br />
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Class Title{' '}
                  </span>{' '}
                  <span className={styles.description1}></span>
                </div>
                <div className={styles.col2}>2021 EN/k</div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    XPRS Subject{' '}
                  </span>{' '}
                  <span className="required">Required</span>
                </div>
                <div className={styles.col2}>
                  <TagPicker
                    removeButtonAriaLabel="Remove"
                    // selectionAriaLabel="Selected XPRS Subject"
                    onResolveSuggestions={filterSelectedTags}
                    onItemSelected={onItemSelected}
                    getTextFromItem={getTextFromItem}
                    onEmptyInputFocus={returnMostRecentlyUsed}
                    pickerSuggestionsProps={pickerSuggestionsProps}
                    onChange={item => {
                      handleChange(null, item, 'xprsSubject');
                    }}
                    itemLimit={1}
                    inputProps={{
                      placeholder: 'Select XPRS subject',
                    }}
                    // defaultSelectedItems={intialValues.roles}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Subject{' '}
                  </span>{' '}
                  <span className="required">Required</span>
                </div>
                <div className={styles.col2}>
                  <Dropdown
                    placeholder="Select subject"
                    options={SubjectOptions}
                    // defaultSelectedKey={intialValues.subject}
                    onChange={(e, data) => handleChange(null, data, 'subject')}
                    // errorMessage={formErrors.subject}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Subject Level{' '}
                  </span>{' '}
                </div>
                <div className={styles.col3}>
                  <Dropdown
                    placeholder="Select level"
                    options={LevelOptions}
                    // defaultSelectedKey={intialValues.subjectLevel}
                    onChange={(e, data) =>
                      handleChange(null, data, 'subjectLevel')
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
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Subject Category{' '}
                  </span>{' '}
                  <span className="required">Required</span>
                </div>
                <div className={styles.col2}>
                  <Dropdown
                    placeholder="Select Category"
                    options={CategoryOptions}
                    // defaultSelectedKey={intialValues.subjectCategory}
                    onChange={(e, data) =>
                      handleChange(null, data, 'subjectCategory')
                    }
                    // errorMessage={formErrors.subjectCategory}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Class Alias{' '}
                  </span>{' '}
                  <span className="required">Required</span>
                </div>
                <div className={styles.col3}>
                  <TextField
                    placeholder="Type alias"
                    // errorMessage={formErrors.classAlias}
                    // defaultValue={intialValues.classAlias}
                    name="classAlias"
                    onChange={e => {
                      handleChange(e, null, null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Capacity{' '}
                  </span>{' '}
                </div>
                <div className={styles.col3}>
                  <TextField
                    placeholder="Type Capacity"
                    //defaultValue={intialValues.capacity}
                    name="capacity"
                    onChange={e => {
                      handleChange(e, null, null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}> Price </span>{' '}
                </div>
                <div className={styles.col3}>
                  <TextField
                    placeholder="Type price"
                    // defaultValue={intialValues.price}
                    name="price"
                    onChange={e => {
                      handleChange(e, null, null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={'padR5 ' + styles.description}>
                    {' '}
                    Grades{' '}
                  </span>{' '}
                </div>
                <div className={styles.col3}>
                  <Checkbox
                    label="Assign grading"
                    defaultChecked={true}
                    onChange={(e, data) => {
                      handleChange(null, data, 'grades');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.btnGroup}>
                  <DefaultButton
                    text={intl(LabelNames.cancel)}
                    className={'btnDefault ' + styles.marginRight}
                    onClick={props.cancel}
                  />
                  <PrimaryButton
                    onClick={handleSubmit}
                    text={intl(LabelNames.next)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ClassInformation;
