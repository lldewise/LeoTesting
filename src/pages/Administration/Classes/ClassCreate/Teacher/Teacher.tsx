import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './Teacher.module.scss';
import {
  PrimaryButton,
  DefaultButton,
  Checkbox,
  SearchBox,
  DetailsHeader,
  Callout,
  DirectionalHint,
  FocusZone,
  FocusZoneDirection,
  List,
  IconButton,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../../util/constant';
import { intl } from '../../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import i18n from '../../../../../i18n/i18n';
import { TeacherTabList } from '../../../../../components/adminANDteacher/Classes/TeacherTabList/TeacherTabList';
import { Persona, PersonaSize } from '@fluentui/react';

const SampleYear = [
  {
    name: '1k en',
    year: '2021/22',
  },
  {
    name: '2k en',
    year: '2022/22',
  },
  {
    name: '2k en',
    year: '2022/22',
  },
];

const dpPerson = {
  root: {
    fontSize: '18px !important',
    display: 'inline-block',
  },
  primaryText: {
    fontSize: '14px !important',
  },
  secondaryText: {
    fontSize: '14px !important',
  },
};

type TeacherProps = {
  xprsSubject: any;
  teacherList: any;
  cancel: any;
};

const Teacher: React.FC<TeacherProps> = props => {
  const picker = useRef(null);
  const [selecetedLang, setSelecetedLang] = useState();
  const intialValues = {
    email: '',
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delayResults] = useState(false);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const teacherListRef = useRef<any[]>([]);
  const [classYear, setClassYear] = useState(SampleYear);
  const [column, setColumn] = useState<any[]>([]);
  const _teacherColumn = useRef<any[]>([]);
  let history = useHistory();
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);

  const _onColumnClickDrafts = (ev: any, column: any, value: any[]) => {
    const newColumns: any[] = _teacherColumn.current.slice();
    const currColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];

    let newItems: any[] = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending,
    );

    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev: any, column: any) => {
          _onColumnClickDrafts(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    setTeacherList(newItems);
    setColumn(newColumns);
  };

  useEffect(() => {
    loadNewCol();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedTeacher = useRef<any>();
  const manageCalloutHandler = (item: any) => {
    selectedTeacher.current = item;
  };

  const loadNewCol = () => {
    const columns = [];
    columns.push({
      key: '100',
      name: 'Name',
      year: null,
      minWidth: 260,
      maxWidth: 700,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, teacherListRef.current);
      },
      onRender: (item: any) => {
        return (
          <div className={styles.container}>
            <div>
              <Persona
                text={item.name}
                imageUrl={item.imageUrl}
                size={PersonaSize.size32}
              />
            </div>
            <div className={styles.pullRight}>
              <IconButton
                id={'moreLink' + item.id}
                iconProps={{
                  iconName: 'moreVertical',
                  onClick: () => manageCalloutHandler(item),
                }}
                className="btnIcon btnIconDark btnIconNormal hideMenuIcon "
                menuProps={menuProps}
              />
            </div>
          </div>
        );
      },
    });
    classYear.forEach((element: any, index: any) => {
      var item = {
        key: index,
        name: '',
        minWidth: 70,
        maxWidth: 120,
        year: element.year,
        title: element.name,
        onRender: (item: any, index: any) => {
          return (
            <div className="teacherCheckbox">
              <Checkbox />
            </div>
          );
        },
      };
      columns.push(item);
    });
    _teacherColumn.current = columns;
    setColumn(columns);
  };

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
    //   externalId: formValues.externalId,
    //   grades: formValues.grades,
    // };
    // props.next("0", "1", data);
  };

  const handleChange = (e: any, item: any, fields: any) => {
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

  const validate = (values: any) => {
    let errors: any = {};
    const regexnumner = /^[0-9]+$/;
    var errorMessage = 'Please select required field';
    var errorMessage1 = 'Please input required field';
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

  const renderDetailsHeader = (detailsHeaderProps: any) => {
    return (
      <DetailsHeader
        {...detailsHeaderProps}
        onRenderColumnHeaderTooltip={renderCustomHeaderTooltip}
      />
    );
  };

  const renderCustomHeaderTooltip = (tooltipHostProps: any) => {
    return (
      <>
        <div>{tooltipHostProps.children}</div>
        <div className={styles.yearHeader}>
          <div className="fontSemiBold">{tooltipHostProps.column.title}</div>
          <div className={styles.yearTitle}>{tooltipHostProps.column.year}</div>
        </div>
      </>
    );
  };

  const onChangeValue = (value: any) => {
    //setSelectedData(value);
  };

  const onFocusResult = () => {
    setCalloutVisible(true);
  };

  const onDismissCalloutTask = () => {
    setCalloutVisible(false);
  };

  const onRenderSearchOption = (option: any) => {
    let wrapper: any = '';

    wrapper = (
      <>
        <div className={styles.studentPersona}>
          <Persona
            text={option.name}
            imageUrl={option.imageUrl}
            size={PersonaSize.size32}
          />
        </div>
      </>
    );

    return (
      <div
        className={styles.listItems}
        onClick={() => onSelectListItems(option)}>
        <span>{wrapper}</span>
      </div>
    );
  };

  const onSelectListItems = (item: any) => {
    setCalloutVisible(false);
    var array: any[] = [...teacherListRef.current];
    array.push(item);
    teacherListRef.current = array;
    setTeacherList(array);
    loadNewCol();
  };

  useEffect(() => {
    setSearchOptions(props.teacherList);
  }, []);

  const menuProps = {
    items: [
      {
        id: '1',
        key: 'remove',
        text: 'Remove',
        iconProps: { iconName: 'ChromeClose' },
      },
    ],
    onItemClick: (data: any, value: any) => {
      clickMenuHandler();
    },
  };

  const clickMenuHandler = () => {
    const updateData = teacherListRef.current.slice();
    var index = updateData.findIndex(
      (i: any) => i.id === selectedTeacher.current.id,
    );
    updateData.splice(index, 1);
    teacherListRef.current = updateData;
    setTeacherList(updateData);
  };

  return (
    <>
      {calloutVisible && (
        <Callout
          className={'calloutTeacherTab'}
          role="alertdialog"
          gapSpace={0}
          beakWidth={0}
          target={'#searchBoxTeacher'}
          setInitialFocus
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={onDismissCalloutTask}>
          <div className={'ms-Grid-row ' + styles.calloutContainer}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              <div data-is-scrollable>
                <span className={styles.title}>Suggested Teacher</span>
                <List
                  items={searchOptions}
                  onRenderCell={onRenderSearchOption}
                />
              </div>
            </FocusZone>
          </div>
        </Callout>
      )}

      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              Teachers
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerDesc}>
              Add teacher to this class and check the classes they will teach
            </div>
          </div>
          <br />
          <br />
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1} id="searchBoxTeacher">
                  {/* <NormalPeoplePicker
                    removeButtonAriaLabel="Remove"
                    selectionAriaLabel="Search name you want to add"
                    onResolveSuggestions={filterSelectedTags}
                    onItemSelected={onItemSelected}
                    getTextFromItem={getTextFromItem}
                    onEmptyInputFocus={returnMostRecentlyUsed}
                    pickerSuggestionsProps={pickerSuggestionsProps}
                    onChange={(item) => {
                      handleChange(null, item, "teacher");
                    }}
                    itemLimit={1}
                    inputProps={{
                      placeholder: "Search name you want to add",
                    }}
                    
                  /> */}
                  <SearchBox
                    placeholder="Search name you want to add"
                    onChanged={ev => {
                      onChangeValue(ev);
                    }}
                    onFocus={onFocusResult}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <TeacherTabList
              itemlist={teacherList}
              _columns={column}
              renderDetailsHeader={renderDetailsHeader}
            />
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}></div>
                <div className={styles.col2}>
                  <div className={styles.btnGroup}>
                    <DefaultButton
                      text={intl(LabelNames.previous)}
                      className="btnDefault marginR15 "
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
        </div>
      </form>
    </>
  );
};

function _copyAndSort(items: any[], columnKey: any, isSortedDescending: any) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

export default Teacher;
