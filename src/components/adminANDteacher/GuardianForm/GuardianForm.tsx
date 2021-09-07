import React, { useState, useEffect, Fragment, ReactElement } from 'react';
import styles from './GuardianForm.module.scss';
import {
  TextField,
  ActionButton,
  TagPicker,
  Toggle,
  ITag,
  IBasePicker,
} from 'office-ui-fabric-react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';

type GuardianFormProps = {
  item: any;
  count: any;
  guardianList: any[];
  formErrors: any | undefined;
  onSelectName: (count: number, key: any) => void;
  onChange: (text: any, count: number, fieldName: string) => void;
  onDeleteItem: (key: any, count: number) => void;
};

const GuardianForm: React.FC<GuardianFormProps> = props => {
  const [dividerCount, setDividerCount] = useState();
  const [fullNamePicker, setFullNamePicker] =
    useState<ReactElement<any, any>>();
  const [useStudentAddress, setUseStudentAddress] = useState<boolean>(
    props.item.useStudentAddress,
  );
  const [alreadyExist, setAlreadyExist] = useState(false);
  const picker = React.useRef<IBasePicker<ITag>>(null);

  useEffect(() => {
    setDividerCount(props.count);
  }, [props.count]); //eslint-disable-line react-hooks/exhaustive-deps

  const textfieldStyles = {
    textfield: { width: '100%' },
  };

  const options = [
    { key: 'mother', text: 'Mother' },
    { key: 'father', text: 'Father' },
    { key: 'legal', text: 'Legal' },
  ];

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
    if (item) {
      let details = props.guardianList.filter(a => a.key === item.key);
      if (details.length > 0) {
        setAlreadyExist(true);
        props.onSelectName(props.count, item.key);
      }
    }
    return item;
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const filterSelectedTags = (
    filterText: string,
    tagList: ITag[] | undefined,
  ): ITag[] => {
    return filterText
      ? props.guardianList.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  const getTextFromItem = (item: any) => item.name;

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested name',
    noResultsFoundText: 'No guardian found',
  };

  const handleDeleteClick = (key: any, count: number) => {
    props.onDeleteItem(key, count);
  };

  const getDetails = (e: any, idx: number) => {
    let details = props.guardianList.filter(a => a.name === e.target.value);
    if (details.length > 0) {
      setAlreadyExist(true);
      props.onSelectName(idx, details[0].key);
    }
  };

  useEffect(() => {
    setFullNamePicker(
      <TagPicker
        onChange={e => props.onChange(e, props.count, 'fullName')}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        defaultSelectedItems={props.item.fullName}
        inputProps={{
          id: 'picker2',
          placeholder: 'Search existing guardian or input new one below',
        }}
        itemLimit={1}
        onBlur={e => getDetails(e, props.count + 1)}
      />,
    );
  }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleAddress = (e: any, data: any) => {
    setUseStudentAddress(!useStudentAddress);
    props.onChange(data, props.count, 'address');
  };

  return (
    <div key={props.count + 1}>
      <div>{dividerCount !== 0 ? <hr className={styles.divider} /> : ''}</div>
      <div className="ms-Grid-row ">
        <div className={'ms-Grid-col ms-lg12 ' + styles.formHeader}>
          <div className={styles.container}>
            <div className={styles.col1}>
              <span className={styles.label}> Guardian {props.count + 1} </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <span className={'padR5 ' + styles.description}>
                  Existing Guardian
                </span>
              </div>
              <div className={styles.col2}>
                <div>
                  {props.formErrors !== undefined ? (
                    props.formErrors?.fullName ? (
                      <div className="PickerWarning">{fullNamePicker}</div>
                    ) : (
                      <div>{fullNamePicker}</div>
                    )
                  ) : (
                    <div>{fullNamePicker}</div>
                  )}
                  <div className="warning">
                    {props.formErrors !== undefined
                      ? props.formErrors?.fullName
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <span> First Name </span>{' '}
                <span className={styles.required}>Required</span>
              </div>
              <div className={styles.col2}>
                <TextField
                  placeholder="Enter First Name"
                  key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                  defaultValue={props.item.firstName}
                  style={textfieldStyles.textfield}
                  onChange={(e, value) =>
                    props.onChange(value, props.count, 'firstName')
                  }
                  errorMessage={
                    props.formErrors !== undefined
                      ? props.formErrors?.firstName
                      : ''
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
                <span> Last Name </span>{' '}
                <span className={styles.required}>Required</span>
              </div>
              <div className={styles.col2}>
                <TextField
                  placeholder="Enter Last Name"
                  key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                  defaultValue={props.item.lastName}
                  style={textfieldStyles.textfield}
                  onChange={(e, value) =>
                    props.onChange(value, props.count, 'lastName')
                  }
                  errorMessage={
                    props.formErrors !== undefined
                      ? props.formErrors?.lastName
                      : ''
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
                <span> Relationship </span>
              </div>
              <div className={styles.col2}>
                <div className={styles.customWidth}>
                  <Dropdown
                    placeholder="Choose an option"
                    options={options}
                    defaultSelectedKey={props.item.relationship}
                    onChange={(e, data) =>
                      props.onChange(data?.key, props.count, 'relationship')
                    }
                    errorMessage={
                      props.formErrors !== undefined
                        ? props.formErrors?.relationship
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <span> Contact No. </span>
              </div>
              <div className={styles.col2}>
                <div className={styles.customWidth}>
                  <TextField
                    placeholder="Enter contact no."
                    key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                    defaultValue={props.item.contactNo}
                    style={textfieldStyles.textfield}
                    onChange={(e, value) =>
                      props.onChange(value, props.count, 'contactNo')
                    }
                    errorMessage={
                      props.formErrors !== undefined
                        ? props.formErrors?.contactNo
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <span> Email </span>{' '}
                <span className={styles.required}>Required</span>
              </div>
              <div className={styles.col2}>
                <div>
                  <TextField
                    placeholder="Enter email address"
                    key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                    defaultValue={props.item.email}
                    style={textfieldStyles.textfield}
                    onChange={(e, value) =>
                      props.onChange(value, props.count, 'email')
                    }
                    errorMessage={
                      props.formErrors !== undefined
                        ? props.formErrors?.email
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {!alreadyExist && (
          <Fragment>
            {props.item.id && (
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                  <div className={styles.container}>
                    <div className={styles.col1}>
                      <span> Account Status </span>
                    </div>
                    <div className={styles.col2}>
                      <Toggle
                        onText="Active"
                        offText="Inactive"
                        onChange={(e, data) =>
                          props.onChange(data, props.count, 'active')
                        }
                        defaultChecked={props.item.active}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> Address </span>
                  </div>
                  <div className={styles.col2}>
                    <Toggle
                      onText="Same as student's address"
                      offText="Register different address"
                      onChange={(e, data) => handleToggleAddress(e, data)}
                      defaultChecked={props.item.useStudentAddress}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        {!useStudentAddress && (
          <Fragment>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.formHeader}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span className={styles.label}> Address </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> C/O navn </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter c/o navn"
                      key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                      name="conavn"
                      defaultValue={props.item.conavn}
                      onChange={(e, value) =>
                        props.onChange(value, props.count, 'conavn')
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
                    <span> Address 1 </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter address 1"
                      key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                      defaultValue={props.item.address1}
                      name="address1"
                      onChange={(e, value) =>
                        props.onChange(value, props.count, 'address1')
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
                    <span> Address 2 </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter address 2"
                      key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                      defaultValue={props.item.address2}
                      name="address2"
                      onChange={(e, value) =>
                        props.onChange(value, props.count, 'address2')
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
                    <span> Zip Code </span>
                  </div>
                  <div className={styles.col2}>
                    <div className={styles.customWidth}>
                      <TextField
                        placeholder="Enter zip code"
                        key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                        defaultValue={props.item.zipcode}
                        name="zipcode"
                        onChange={(e, value) =>
                          props.onChange(value, props.count, 'zipcode')
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> Municipality </span>
                  </div>
                  <div className={styles.col2}>
                    <div>
                      <TextField
                        placeholder="Enter municipality"
                        key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                        defaultValue={props.item.municipality}
                        name="municipality"
                        onChange={(e, value) =>
                          props.onChange(value, props.count, 'municipality')
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> Country </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter country"
                      key={!alreadyExist ? 'notLoadedYet' : 'loaded'}
                      defaultValue={props.item.country}
                      name="country"
                      onChange={(e, value) =>
                        props.onChange(value, props.count, 'country')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <ActionButton
                  className="btnPlain btnInfo"
                  iconProps={{ iconName: 'Delete' }}
                  onClick={() => handleDeleteClick(props.item.id, props.count)}>
                  Remove Guardian
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianForm;
