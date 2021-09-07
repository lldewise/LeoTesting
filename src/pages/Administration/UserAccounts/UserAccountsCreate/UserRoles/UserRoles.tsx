import React, { Fragment, useState, useEffect } from 'react';
import styles from './UserRoles.module.scss';
import {
  TagPicker,
  TextField,
  Toggle,
  PrimaryButton,
  DefaultButton,
  ActionButton,
  ITag,
  IBasePicker,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../../util/constant';
import { intl } from '../../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import i18n from '../../../../../i18n/i18n';
import _ from 'lodash';

type MainUserRoleProps = {
  ateduAccount: any;
  rolesList: any[];
  userType: string;
  isEdit: boolean;
  showPassword: boolean;
  showEnrollment: boolean;
  next: (prev: string, next: string, data: any) => void;
  resetPassword: (temp: string) => void;
};

const UserRoles: React.FC<MainUserRoleProps> = props => {
  const [selecetedLang, setSelecetedLang] = useState<string | undefined>();
  const [ateduDataHasChange, setAteduDataHasChange] = useState(false);
  const initialValues = {
    email: props.ateduAccount?.email,
    ssid: props.ateduAccount?.ssid,
    activateAtedu:
      props.ateduAccount?.activeAccount === 'Active' ? true : false,
    roles: props.ateduAccount?.roles,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const picker = React.useRef<IBasePicker<ITag>>(null);
  let rolesList = props.rolesList;
  let history = useHistory();

  const submitForm = () => {
    console.log(formValues);
    var data = {
      roles: formValues.roles,
      ssid: formValues.ssid,
      email: formValues.email,
      activeAccount: formValues.activateAtedu,
      id: props.ateduAccount?.id,
    };
    props.next('1', '10', data);
  };
  const onPreviousHandler = () => {
    var data = {
      roles: formValues.roles,
      ssid: formValues.ssid,
      email: formValues.email,
      activeAccount: formValues.activateAtedu,
      id: props.ateduAccount?.id,
    };

    switch (props.userType.toString().toUpperCase()) {
      case 'STUDENT':
        props.next('1', '3', data);
        break;
      case 'STAFF':
        props.next('1', '5', data);
        break;
      case 'GUARDIAN':
        props.next('1', '6', data);
        break;
      default:
        props.next('1', '3', data);
    }
  };

  const handleChange = (e: any | null, item: any, fields: string) => {
    if (e != null) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [fields]: item });
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      if (!_.isEqual(initialValues, formValues)) {
        setAteduDataHasChange(true);
      }
    }
  }, [formValues]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: any) => {
    let errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexnumner = /^[0-9]+$/;
    if (!values.email) {
      errors.email = 'Please input required field';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    if (values.ssid) {
      if (!regexnumner.test(values.ssid)) {
        errors.ssid = 'Social Security No. should only contain numbers';
      }
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some(compareTag => compareTag.key === tag.key);
  };

  const onItemSelected = React.useCallback(item => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  }, []);

  const filterSelectedTags = (
    filterText: string,
    tagList: ITag[] | undefined,
  ): ITag[] => {
    return filterText
      ? rolesList.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };
  const getTextFromItem = (item: any) => item.name;

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested tags',
    noResultsFoundText: 'No role tags found',
  };

  useEffect(() => {
    switch (props.userType.toString().toUpperCase()) {
      case 'STUDENT':
        setSelecetedLang(intl(LabelNames.student));
        break;
      case 'STAFF':
        setSelecetedLang(intl(LabelNames.staff));
        break;
      case 'GUARDIAN':
        setSelecetedLang(intl(LabelNames.guardian));
        break;
      default:
        break;
    }

    document.getElementById('activeAtedu')!.hidden = true;
    if (props.isEdit) {
      document.getElementById('activeAtedu')!.hidden = false;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnrollStudent = () => {
    history.push('/' + i18n.language + '/student-enrollment');
  };

  return (
    <Fragment>
      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              {intl(LabelNames.ateduAccount)}
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerDesc}>
              {intl(LabelNames.profiledesc)}
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
                    {selecetedLang} {intl(LabelNames.roles)}{' '}
                  </span>{' '}
                  <span className={styles.description1}></span>
                </div>
                <div className={styles.col2}>
                  <TagPicker
                    removeButtonAriaLabel="Remove"
                    onResolveSuggestions={filterSelectedTags}
                    onItemSelected={onItemSelected}
                    getTextFromItem={getTextFromItem}
                    pickerSuggestionsProps={pickerSuggestionsProps}
                    onChange={item => {
                      handleChange(null, item, 'roles');
                    }}
                    itemLimit={2}
                    inputProps={{
                      id: 'picker2',
                    }}
                    defaultSelectedItems={initialValues.roles}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.schoolEmail)} </span>{' '}
                  <span className={styles.required}>Required</span>
                </div>
                <div className={styles.col2}>
                  <TextField
                    placeholder="Enter email address"
                    name="email"
                    errorMessage={formErrors.email}
                    defaultValue={initialValues.email}
                    onChange={(e, value) => handleChange(null, value, 'email')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row" hidden={true} id="activeAtedu">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span> {intl(LabelNames.accountStatus)} </span>
                </div>
                <div className={styles.col2}>
                  <div className={styles.container}>
                    <div className="padR10">
                      <Toggle
                        defaultChecked={initialValues.activateAtedu}
                        onChange={(e, value) =>
                          handleChange(null, value, 'activateAtedu')
                        }
                        onText="Active"
                        offText="Inactive"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {props.showPassword && (
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> {intl(LabelNames.temporaryPassword)}</span>
                  </div>
                  <div className={styles.col3}>
                    <div className={styles.container4}>
                      <TextField
                        placeholder="Generate New Password"
                        value={props.ateduAccount.tmpPassword}
                        disabled={true}
                        onChange={(e, value) =>
                          handleChange(null, value, 'tmpPassword')
                        }
                      />
                      <div className={'btnInput ' + styles.container3}>
                        <ActionButton
                          iconProps={{ iconName: 'Copy' }}
                          className="btnPlain btnInfo"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              props.ateduAccount.tmpPassword,
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {props.isEdit && (
                    <div className={styles.col4}>
                      <DefaultButton
                        text="Generate"
                        className="btnDissabled marginR15"
                        onClick={() => {
                          props.resetPassword(formValues.email);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}></div>
                <div className={styles.col2}>
                  <div className={styles.btnGroup}>
                    <DefaultButton
                      text={intl(LabelNames.previous)}
                      className="btnDefault marginR15 "
                      onClick={onPreviousHandler}
                    />

                    <PrimaryButton
                      onClick={handleSubmit}
                      text={intl(LabelNames.save)}
                    />

                    {props.showPassword &&
                      props.userType.toString().toUpperCase() === 'STUDENT' && (
                        <PrimaryButton
                          onClick={handleEnrollStudent}
                          text="Continue and enroll"
                          style={{ width: '100%' }}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default UserRoles;
