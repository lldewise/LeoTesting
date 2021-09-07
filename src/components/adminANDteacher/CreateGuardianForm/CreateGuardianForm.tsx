import React, { useState, useEffect, ReactElement } from 'react';
import styles from './CreateGuardianForm.module.scss';
import logger from 'loglevel';
import {
  ActionButton,
  TagPicker,
  IBasePicker,
  ITag,
} from 'office-ui-fabric-react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { useStore } from '../../../store/store';

type CreateGuardianFormProps = {
  item: any;
  count: number;
  onDeleteItem: (key: any) => void;
  onChange: (text: any, count: number, fieldName: string) => void;
  formErrors: any | undefined;
};

const CreateGuardianForm: React.FC<CreateGuardianFormProps> = props => {
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [studentTagpicker, setStudentTagPicker] =
    useState<ReactElement<any, any>>();

  const picker = React.useRef<IBasePicker<ITag>>(null);

  const studentList = data.studentAccountList.map(a => ({
    key: a.userId,
    name: a.name,
  }));

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
    return item;
  }, []);

  const filterSelectedTags = (
    filterText: string,
    tagList: ITag[] | undefined,
  ): ITag[] => {
    return filterText
      ? studentList.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  const getTextFromItem = (item: any) => item.name;

  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested tags',
    noResultsFoundText: 'No student found',
  };

  const handleDeleteClick = (key: any) => {
    props.onDeleteItem(key);
  };

  useEffect(() => {
    setStudentTagPicker(
      <TagPicker
        onChange={e => props.onChange(e, props.count, 'fullName')}
        removeButtonAriaLabel="Remove"
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        defaultSelectedItems={props.item.fullName}
        inputProps={{
          id: 'picker2',
          placeholder: 'Search existing student...',
        }}
        itemLimit={1}
      />,
    );
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div key={props.count}>
      <div>{props.count !== 0 ? <hr className={styles.divider} /> : ''}</div>
      <div className={styles.content}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
            <div className={styles.container}>
              <div className={styles.col1}>
                <span className={'padR5 ' + styles.description}>
                  {' '}
                  Existing Student{' '}
                </span>
              </div>
              <div className={styles.col2}>
                <div>
                  {props.formErrors !== undefined ? (
                    props.formErrors?.fullName ? (
                      <div className="PickerWarning">{studentTagpicker}</div>
                    ) : (
                      <div>{studentTagpicker}</div>
                    )
                  ) : (
                    <div>{studentTagpicker}</div>
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
                <span> Relationship </span>{' '}
              </div>
              <div className={styles.col2}>
                <div className={styles.customWidth}>
                  <Dropdown
                    placeholder="Select relationship"
                    options={options}
                    errorMessage={
                      props.formErrors !== undefined
                        ? props.formErrors?.relationship
                        : ''
                    }
                    onChange={(e, data) =>
                      props.onChange(data?.text, props.count, 'relationship')
                    }
                    defaultSelectedKey={props.item.relationship}
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
                {props.item.id !== 1 ? (
                  <ActionButton
                    className="btnPlain btnInfo"
                    iconProps={{ iconName: 'Delete' }}
                    onClick={() => handleDeleteClick(props.item.id)}>
                    Remove Student
                  </ActionButton>
                ) : (
                  <ActionButton
                    className="btnDissabled"
                    disabled={true}
                    iconProps={{ iconName: 'Delete' }}
                    onClick={() => handleDeleteClick(props.item.id)}>
                    Remove Student
                  </ActionButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuardianForm;
