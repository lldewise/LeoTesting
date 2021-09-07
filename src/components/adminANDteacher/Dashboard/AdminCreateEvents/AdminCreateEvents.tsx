import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactElement,
} from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  getTheme,
  mergeStyleSets,
  Modal,
  IconButton,
  ValidationState,
  NormalPeoplePicker,
  TagPicker,
  Icon,
  ITag,
  IBasePicker,
} from 'office-ui-fabric-react';
import {
  PrimaryButton,
  DefaultButton,
  Dropdown,
  Toggle,
  FontIcon,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import styles from './AdminCreateEvents.module.scss';
import moment from 'moment';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { TabModal } from '../../../userInterface/TabModal';
import Calendar from '../../../fluentui/Calendar/Calendar';

const type = require('../../../../assets/ui-kit/_variables.scss');
const iconStyles: React.CSSProperties = { marginRight: '8px' };

const userList = [
  {
    imageUrl: null,
    imageInitials: 'AD',
    text: 'Dennis Migrino',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'LL',
    text: 'Leo Lopez',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'EC',
    text: 'Eric Cantorna',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'JC',
    text: 'Jay Celeste',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
];

const cancelIcon = { iconName: 'Cancel' };

const taskOptions = [
  { key: '1', text: 'Atedu Task', groupId: 'ateduTask' },
  { key: '2', text: 'Personal Task', groupId: 'personalTask' },
  { key: '3', text: 'School Task', groupId: 'schoolTask' },
];

const eventCategoryOptions = [
  {
    key: '1',
    text: 'Class Schedule',
    groupId: 'classSchedule',
    data: { icon: 'CheckboxComposite' },
  },
  {
    key: '2',
    text: 'Exam',
    groupId: 'exam',
    data: { icon: 'CheckboxComposite' },
  },
  {
    key: '3',
    text: 'School Event',
    groupId: 'schoolEvent',
    data: { icon: 'CheckboxComposite' },
  },
  {
    key: '4',
    text: 'Private',
    groupId: 'private',
    data: { icon: 'CheckboxComposite' },
  },
];

const options = [
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
const repeatOptions = [
  { key: '1', text: 'Repeat: Never' },
  { key: '2', text: 'Repeat: Always' },
];

const remindmeOptions = [
  { key: '1', text: 'Remind me: 15 minutes before' },
  { key: '2', text: 'Remind me: 20 mins before' },
];

const controlClass = mergeStyleSets({
  root: {
    width: '150px',
  },
});
const dropdownStyles = {
  dropdown: { width: '130px' },
};
const dropdownStylesRepeat = {
  dropdown: { width: '150px' },
};
const dropdownStylesRemindme = {
  dropdown: { width: '300px' },
};

const dropdownStylesEvent = {
  dropdown: { width: '300px' },
};
const dropdownStylesTask = { dropdown: { width: '150px' } };

const getTextFromItem = (item: any) => item.name;

const testTags = [
  "Principal's Office",
  'Admin Office',
  'Accounting Office',
  'Marketing Office',
].map(item => ({ key: item, name: item }));

const linkItem = [
  {
    id: 1,
    name: intl(LabelNames.events),
    classname: styles.aLinkactive,
  },
  {
    id: 2,
    name: intl(LabelNames.task),
    classname: styles.aLink,
  },
];

type InitialValues = {
  eventTitle: string | undefined;
  eventStartDate: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  eventIsAllDay: boolean | null;
  repeated: string | null;
  peoplesInvited: any[];
  locations: any[];
  remindMe: string | null;
  category: string | null;
  todoTitle: string | undefined;
  todoStartDate: string | null;
  todoStartTime: string | null;
  todoEndTime: string | null;
  todoIsAllDay: boolean | null;
  description: string | undefined;
  type: string | null;
};

type InitialErrors = {
  eventTitle: string | undefined;
  eventStartDate: string | undefined;
  eventStartTime: string | undefined;
  eventEndTime: string | undefined;
  repeated: string | undefined;
  locations: string | undefined;
  peoplesInvited: string | undefined;
  remindMe: string | undefined;
  category: string | undefined;
  todoTitle: string | undefined;
  todoStartDate: string | undefined;
  todoStartTime: string | undefined;
  todoEndTime: string | undefined;
  description: string | undefined;
  type: string | undefined;
};

type TeacherCreateEventsProps = {
  initialValues: InitialValues;
  onSubmit: (itemToSave: any, activeTab: number) => void;
  user: string | null;
  showModal: () => void;
  isModalOpen: boolean;
  hideModal: () => void;
  isUpdated: boolean;
  isSpinner: boolean;
  pivotActive: number;
};

export const AdminCreateEvents: React.FC<TeacherCreateEventsProps> = props => {
  //eslint-disable-next-line
  const [mostRecentlyUsed, setMostRecentlyUsed] = useState(userList);
  const [peopleList, setPeopleList] = useState(userList);
  const [delayResults] = useState(false);
  const [isPickerDisabled] = useState(false);
  const [liList, setliList] = useState(linkItem);
  //eslint-disable-next-line
  const [tabView, setTabView] = useState<ReactElement<any, any> | null>();
  const [activeTab, setActiveTab] = useState(props.pivotActive);
  const [selectedTabView, setSelectedTabView] = useState<ReactElement<
    any,
    any
  > | null>(null);
  const [formValues, setFormValues] = useState(props.initialValues);
  const [formErrors, setFormErrors] = useState<InitialErrors>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const picker = React.useRef<IBasePicker<ITag>>(null);
  const peoplpicker = useRef(null);

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some(compareTag => compareTag.key === tag.key);
  };

  const onRenderOption = (option: any) => {
    let color = type.standardFontColor;
    if (option.groupId === 'private') {
      color = type.privateEventBorder;
    } else if (option.groupId === 'classSchedule') {
      color = type.classScheduleBorder;
    } else if (option.groupId === 'schoolEvent') {
      color = type.schoolEventBorder;
    } else if (option.groupId === 'exam') {
      color = type.examEventBorder;
    }

    const updatedStyle = { ...iconStyles, color: color };
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={updatedStyle}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  const onRenderTaskOption = (option: any) => {
    let wrapper: any = '';
    let color = type.standardFontColor;
    if (option.groupId === 'personalTask') {
      color = type.privateEventBorder;
    } else if (option.groupId === 'ateduTask') {
      color = type.classScheduleBorder;
    } else if (option.groupId === 'schoolTask') {
      color = type.schoolEventBorder;
    }
    const updatedStyle = { color: color };

    if (option.key !== 'allTask') {
      wrapper = <i className="custom-icon-event-check" style={updatedStyle} />;
    }

    return (
      <div style={{ display: 'flex' }}>
        <>
          <div style={{ width: '20px' }} id={option.key}>
            {wrapper}
          </div>
          <div id={option.key}>{option.text}</div>
        </>
      </div>
    );
  };

  const onRenderTitle = (options: any) => {
    let color = null;
    if (options[0].groupId === 'private') {
      color = type.privateEventBorder;
    } else if (options[0].groupId === 'classSchedule') {
      color = type.classScheduleBorder;
    } else if (options[0].groupId === 'event') {
      color = type.schoolEventBorder;
    } else if (options[0].groupId === 'exam') {
      color = type.examEventBorder;
    }
    const updatedStyle = { ...iconStyles, color: color };
    const option = options[0];
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={updatedStyle}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  const onRenderTaskTitle = (options: any) => {
    let color = null;
    if (options[0].groupId === 'ateduTask') {
      color = type.classScheduleBorder;
    } else if (options[0].groupId === 'personalTask') {
      color = type.privateEventBorder;
    } else if (options[0].groupId === 'schoolTask') {
      color = type.schoolEventBorder;
    }
    const updatedStyle = { ...iconStyles, color: color };
    const wrapper = (
      <i className="custom-icon-event-check" style={updatedStyle} />
    );
    const option = options[0];
    return (
      <div>
        <span>{wrapper}</span>
        <span>{option.text}</span>
      </div>
    );
  };

  const formatEventSelectedDate = (data: Date | null) => {
    if (data) {
      const dateSelected = moment(data).format('MMMM DD, YYYY');
      return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
    } else {
      return null;
    }
  };

  const formatTodoSelectedDate = (data: Date | null) => {
    if (data) {
      const dateSelected = moment(data).format('MMMM DD, YYYY');
      return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
    } else {
      return null;
    }
  };

  const handleChange = (item: any, fields: string) => {
    const values = formValues;
    //values[fields] = item;
    setFormValues(values);
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors(validate(formValues));
  };

  useEffect(() => {
    if (formErrors && Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm(formValues);
    }
  }, [formErrors]); //eslint-disable-line react-hooks/exhaustive-deps

  const validate = (values: any) => {
    const errors: any = {};
    //events field
    if (activeTab === 1) {
      if (!values.eventTitle) {
        errors.eventTitle = 'Please input required field';
      }
      if (!values.eventStartDate) {
        errors.eventStartDate = 'Please input required field';
      }
      if (!values.eventStartTime) {
        errors.eventStartTime = 'Please input required field';
      }
      if (!values.eventEndTime) {
        errors.eventEndTime = 'Please input required field';
      }
      if (!values.repeated) {
        errors.repeated = 'Please input required field';
      }
      if (values.locations?.length === 0) {
        errors.locations = 'Please input required field';
      }
      if (values.peoplesInvited?.length === 0) {
        errors.peoplesInvited = 'Please input required field';
      }
      if (!values.remindMe) {
        errors.remindMe = 'Please input required field';
      }
      if (!values.category) {
        errors.category = 'Please input required field';
      }
    } else if (activeTab === 2) {
      //todos field
      if (!values.todoTitle) {
        errors.todoTitle = 'Please input required field';
      }
      if (!values.todoStartDate) {
        errors.todoStartDate = 'Please input required field';
      }
      if (!values.todoStartTime) {
        errors.todoStartTime = 'Please input required field';
      }
      if (!values.todoEndTime) {
        errors.todoEndTime = 'Please input required field';
      }
      if (!values.description) {
        errors.description = 'Please input required field';
      }
      if (!values.type) {
        errors.type = 'Please input required field';
      }
    }
    return errors;
  };

  const submitForm = (data: any) => {
    if (activeTab === 1) {
      const itemToSave = {
        eventTitle: data.eventTitle,
        eventStartDate: data.eventStartDate,
        eventStartTime: data.eventStartTime,
        eventEndTime: data.eventEndTime,
        eventIsAllDay: data.eventIsAllDay,
        repeated: data.repeated,
        peoplesInvited: [...data.peoplesInvited],
        locations: [...data.locations],
        remindMe: data.remindMe,
        category: data.category,
      };
      props.onSubmit(itemToSave, activeTab);
    } else {
      const itemToSave = {
        todoTitle: data.todoTitle,
        todoStartDate: data.todoStartDate,
        todoStartTime: data.todoStartTime,
        todoEndTime: data.todoEndTime,
        todoIsAllDay: data.todoIsAllDay,
        description: data.description,
        type: data.type,
      };
      props.onSubmit(itemToSave, activeTab);
    }
  };

  const onFilterChanged = (
    filterText: string,
    currentPersonas?: IPersonaProps[],
    limitResults?: number,
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const returnMostRecentlyUsed = (currentPersonas: any) => {
    return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
  };

  function removeDuplicates(personas: any[], possibleDupes: any) {
    return personas.filter(
      persona => !listContainsPersona(persona, possibleDupes),
    );
  }

  const filterPromise = (personasToReturn: any[]) => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  function convertResultsToPromise(
    results: IPersonaProps[],
  ): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) =>
      setTimeout(() => resolve(results), 2000),
    );
  }

  const filterPersonasByText = (filterText: string) => {
    return peopleList.filter(item => doesTextStartWith(item.text, filterText));
  };

  const onRemoveSuggestion = (item: any) => {
    const indexPeopleList = peopleList.indexOf(item);
    const indexMostRecentlyUsed = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  function validateInput(input: any) {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  const filterSelectedTags = (
    filterText: string,
    tagList: ITag[] | undefined,
  ): ITag[] => {
    return filterText
      ? testTags.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  function onInputChange(input: any) {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }
    return input;
  }

  function doesTextStartWith(text: string, filterText: string) {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  function listContainsPersona(persona: any, personas: any) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return (
      personas.filter((item: any) => item.text === persona.text).length > 0
    );
  }

  const onItemSelected = useCallback(item => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    formValues.locations.push(item);
    return item;
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const linkHandler = (id: any) => {
    const updatedList = [...liList];
    id = Number(id);
    updatedList.forEach(item => {
      item.classname = styles.aLink;
      if (item.id === id) {
        item.classname = styles.aLinkactive;
      }
    });
    setliList(updatedList);
    UpdateContainer(id);
  };

  const UpdateContainer = (value: any) => {
    setIsSubmitting(false);
    setActiveTab(value);
    setTabView(selectedTabView);
    setFormValues(props.initialValues);
    setFormErrors(undefined);
  };

  const handleCancelForm = () => {
    setIsSubmitting(false);
    formatEventSelectedDate(null);
    formatTodoSelectedDate(null);
    props.hideModal();
    setTimeout(() => {
      setFormValues(props.initialValues);
      setFormErrors(undefined);
    }, 300);
  };

  useEffect(() => {
    linkHandler(props.pivotActive);
  }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

  const peopleHandler = (data: any) => {
    formValues.peoplesInvited.push(data);
    return data;
  };

  useEffect(() => {
    if (activeTab === 1) {
      const tab1 = (
        <div>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="DateTime" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                <Calendar
                  value={formValues.eventStartDate}
                  placeholder="Choose date..."
                  formatSelectedDate={(e: any) => formatEventSelectedDate(e)}
                  onSelectDate={(e: any) => handleChange(e, 'eventStartDate')}
                  styles={controlClass}
                  errorMessage={formErrors?.eventStartDate}
                />
                <div className="padR10" />
                <Dropdown
                  options={options}
                  styles={dropdownStyles}
                  defaultSelectedKey={formValues.eventStartTime}
                  placeholder="Choose time..."
                  onChanged={e => handleChange(e.text, 'eventStartTime')}
                  errorMessage={formErrors?.eventStartTime}
                />
                <div className={'padl10 padR10 ' + styles.center}>
                  {intl(LabelNames.to)}{' '}
                </div>
                <Dropdown
                  options={options}
                  styles={dropdownStyles}
                  placeholder="Choose time..."
                  defaultSelectedKey={formValues.eventEndTime}
                  onChanged={e => handleChange(e.text, 'eventEndTime')}
                  errorMessage={formErrors?.eventEndTime}
                />
                <div className="padR10 " />
                <div className={styles.center}>
                  {' '}
                  <Toggle
                    label=""
                    onText={intl(LabelNames.allday)}
                    offText={intl(LabelNames.allday)}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="RepeatAll" className={styles.FontIcon} />
                </div>
                <div className="padR20" />

                <Dropdown
                  options={repeatOptions}
                  defaultSelectedKey={formValues.repeated}
                  styles={dropdownStylesRepeat}
                  placeholder="Choose item..."
                  onChanged={e => handleChange(e.text, 'repeated')}
                  errorMessage={formErrors?.repeated}
                />
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="People" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                {formErrors?.peoplesInvited ? (
                  <>
                    <div className="PickerWarning" style={{ width: '100%' }}>
                      <NormalPeoplePicker
                        onResolveSuggestions={onFilterChanged}
                        onEmptyInputFocus={returnMostRecentlyUsed}
                        getTextFromItem={getTextFromItem}
                        className={styles.peoplePicker}
                        key={'normal'}
                        onRemoveSuggestion={onRemoveSuggestion}
                        onValidateInput={validateInput}
                        removeButtonAriaLabel={'Remove'}
                        inputProps={{
                          placeholder: intl(LabelNames.invitepeople),
                        }}
                        componentRef={peoplpicker}
                        onInputChange={onInputChange}
                        resolveDelay={300}
                        disabled={isPickerDisabled}
                        onItemSelected={peopleHandler}
                        selectedItems={formValues.peoplesInvited}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{ width: '100%' }}>
                    <NormalPeoplePicker
                      onResolveSuggestions={onFilterChanged}
                      onEmptyInputFocus={returnMostRecentlyUsed}
                      getTextFromItem={getTextFromItem}
                      className={styles.peoplePicker}
                      key={'normal'}
                      onRemoveSuggestion={onRemoveSuggestion}
                      onValidateInput={validateInput}
                      removeButtonAriaLabel={'Remove'}
                      inputProps={{
                        placeholder: intl(LabelNames.invitepeople),
                      }}
                      componentRef={peoplpicker}
                      onInputChange={onInputChange}
                      resolveDelay={300}
                      disabled={isPickerDisabled}
                      onItemSelected={peopleHandler}
                      selectedItems={formValues.peoplesInvited}
                    />
                  </div>
                )}
              </div>
              <div className={styles.warning}>
                {formErrors?.peoplesInvited !== undefined &&
                  formErrors.peoplesInvited}
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="POI" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                {formErrors?.locations ? (
                  <>
                    <div className="PickerWarning" style={{ width: '100%' }}>
                      <TagPicker
                        className={styles.peoplePicker}
                        removeButtonAriaLabel="Remove"
                        componentRef={picker}
                        onResolveSuggestions={filterSelectedTags}
                        onItemSelected={onItemSelected}
                        getTextFromItem={getTextFromItem}
                        itemLimit={2}
                        inputProps={{
                          placeholder: intl(LabelNames.searchforroomorlocation),
                        }}
                        selectedItems={formValues.locations}
                      />
                    </div>
                  </>
                ) : (
                  <div style={{ width: '100%' }}>
                    <TagPicker
                      className={styles.peoplePicker}
                      removeButtonAriaLabel="Remove"
                      componentRef={picker}
                      onResolveSuggestions={filterSelectedTags}
                      onItemSelected={onItemSelected}
                      getTextFromItem={getTextFromItem}
                      itemLimit={2}
                      inputProps={{
                        placeholder: intl(LabelNames.searchforroomorlocation),
                      }}
                      selectedItems={formValues.locations}
                    />
                  </div>
                )}
              </div>
              <div className={styles.warning}>
                {formErrors?.locations !== undefined && formErrors.locations}
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="AlarmClock" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                <Dropdown
                  options={remindmeOptions}
                  styles={dropdownStylesRemindme}
                  defaultSelectedKey={formValues.remindMe}
                  onChanged={e => handleChange(e.text, 'remindMe')}
                  placeholder="Choose item..."
                  errorMessage={formErrors?.remindMe}
                />
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div className={styles.container}>
                    <div className={styles.center}>
                      {' '}
                      <FontIcon
                        iconName="BulletedList2"
                        className={styles.FontIcon}
                      />
                    </div>
                    <div className="padR20" />
                    <Dropdown
                      options={eventCategoryOptions}
                      styles={dropdownStylesEvent}
                      onRenderOption={onRenderOption}
                      onRenderTitle={onRenderTitle}
                      defaultSelectedKey={formValues.category}
                      placeholder="Choose category"
                      onChanged={e => handleChange(e, 'category')}
                      errorMessage={formErrors?.category}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      setSelectedTabView(tab1);
    } else {
      const tab2 = (
        <div>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="DateTime" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                <Calendar
                  value={formValues.todoStartDate}
                  placeholder="Choose date..."
                  formatSelectedDate={(e: any) => formatTodoSelectedDate(e)}
                  onSelectDate={(e: any) => handleChange(e, 'todoStartDate')}
                  errorMessage={formErrors?.todoStartDate}
                  styles={controlClass}
                />
                <div className="padR10" />
                <Dropdown
                  options={options}
                  styles={dropdownStyles}
                  defaultSelectedKey={formValues.todoStartTime}
                  placeholder="Choose time..."
                  onChanged={e => handleChange(e.text, 'todoStartTime')}
                  errorMessage={formErrors?.todoStartTime}
                />
                <div className={'padl10 padR10 ' + styles.center}>
                  {intl(LabelNames.to)}{' '}
                </div>
                <Dropdown
                  options={options}
                  styles={dropdownStyles}
                  placeholder="Choose time..."
                  defaultSelectedKey={formValues.todoEndTime}
                  onChanged={e => handleChange(e.text, 'todoEndTime')}
                  errorMessage={formErrors?.todoEndTime}
                />
                <div className="padR10 " />
                <div className={styles.center}>
                  {' '}
                  <Toggle
                    label=""
                    onText={intl(LabelNames.allday)}
                    offText={intl(LabelNames.allday)}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon iconName="List" className={styles.FontIcon} />
                </div>
                <div className="padR20" />
                <TextField
                  multiline={true}
                  rows={5}
                  resizable={false}
                  className={styles.textfield}
                  name="description"
                  defaultValue="A quick brown fox jumped....."
                  onChange={e => handleChange(e, 'description')}
                  errorMessage={formErrors?.description}
                  placeholder={intl(LabelNames.adddescription)}
                />
              </div>
            </div>
            <br />
            <div className="ms-Grid-col ms-lg12">
              <div className={styles.container}>
                <div className={styles.center}>
                  {' '}
                  <FontIcon
                    iconName="BulletedList2"
                    className={styles.FontIcon}
                  />
                </div>
                <div className="padR20" />
                <Dropdown
                  options={taskOptions}
                  styles={dropdownStylesTask}
                  onRenderTitle={onRenderTaskTitle}
                  onRenderOption={onRenderTaskOption}
                  defaultSelectedKey={formValues.type}
                  placeholder="Choose type..."
                  onChanged={e => handleChange(e, 'type')}
                  errorMessage={formErrors?.type}
                />
              </div>
            </div>
          </div>
        </div>
      );
      setSelectedTabView(tab2);
    }
  }, [formErrors, activeTab]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={handleCancelForm}
        isBlocking={false}
        isModeless={true}
        containerClassName={contentStyles.container}>
        <div className={contentStyles.header}>
          <span>{intl(LabelNames.create)}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={handleCancelForm}
          />
        </div>
        <div className={contentStyles.body}>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 ">
              <div className="ms-Grid-row ">
                {activeTab === 1 && (
                  <div className="ms-Grid-col ms-lg12">
                    <TextField
                      label="Title"
                      autoComplete="eventTitle"
                      value={formValues.eventTitle}
                      name="eventTitle"
                      onChange={e => handleChange(e, 'eventTitle')}
                      placeholder={intl(LabelNames.addtitle)}
                      errorMessage={formErrors?.eventTitle}
                    />
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="ms-Grid-col ms-lg12">
                    <TextField
                      label="Title"
                      autoComplete="todoTitle"
                      value={formValues.todoTitle}
                      name="todoTitle"
                      onChange={e => handleChange(e, 'todoTitle')}
                      placeholder={intl(LabelNames.addtitle)}
                      errorMessage={formErrors?.todoTitle}
                    />
                  </div>
                )}
              </div>
              <br />
              <TabModal
                linkClick={linkHandler}
                liList={liList}
                tabView={selectedTabView}
              />
              <br />
              <div className="ms-Grid-row" dir="ltr">
                <div className="ms-Grid-col ms-lg12">
                  <div className="ms-Grid-col ms-lg12 text-right">
                    <span>
                      {' '}
                      <DefaultButton
                        text="Cancel"
                        onClick={handleCancelForm}
                        type="button"
                      />{' '}
                    </span>
                    <span>
                      {' '}
                      <PrimaryButton
                        text={intl(LabelNames.save)}
                        type="submit"
                        onClick={e => handleSaveClick(e)}
                      />{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '680px',
  },
  header: [
    {
      flex: '1 1 auto',
      fontSize: '20px',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: '600',
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export default AdminCreateEvents;
