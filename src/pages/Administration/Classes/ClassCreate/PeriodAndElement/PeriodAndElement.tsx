import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles from './PeriodAndElement.module.scss';
import {
  PrimaryButton,
  DefaultButton,
  TextField,
  TagPicker,
  FontIcon,
  Toggle,
  ActionButton,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../../util/constant';
import { intl } from '../../../../../util/commonFunction';
import { useHistory } from 'react-router-dom';
import i18n from '../../../../../i18n/i18n';
import Calendar from '../../../../../components/fluentui/Calendar/Calendar';
import moment from 'moment';

let schoolYearSample = [
  { id: 1, attendance: true },
  { id: 2, attendance: true },
];

type PeriodAndElementProps = {
  finalYearList: any;
};

const PeriodAndElement: React.FC<PeriodAndElementProps> = props => {
  const picker = useRef(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [finalYear, setFinalYear] = useState<number>(0);
  const [delayResults] = useState(false);
  const intialValues = {
    email: '',
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [elementList, setElementList] = useState<any[]>();
  const schoolYear = useRef(schoolYearSample);

  const formatSelectedDate = (data: any) => {
    const dateSelected = moment(data).format('YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  const dateStartHandler = (data: any) => {
    setStartDate(data);
  };

  const handleChange = (e: any, item: any, fields: any) => {
    if (e != null) {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [fields]: item });
    }
  };

  const onItemSelected = React.useCallback(item => {
    if (startDate) {
      let sYear = moment(startDate).format('YYYY');
      let fYear = item;
      debugger;
    }
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

  const returnMostRecentlyUsed = () => {
    return props.finalYearList;
  };

  const filterSelectedTags = (filterText: any, tagList: any) => {
    return filterText
      ? props.finalYearList.filter((tag: any) =>
          tag.name.toLowerCase().includes(filterText.toLowerCase()),
        )
      : [];
  };

  const getTextFromItem = (item: any) => item.name;
  const pickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested Final year',
    noResultsFoundText: 'No Final year found',
  };

  const formatSelectedDateElement = (data: any) => {
    const dateSelected = moment(data).format('DD-MM-YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  useEffect(() => {
    createElementList();
  }, []);

  const OnChange = (value: any, id: any, fieldName: any) => {
    let items: any[] = [...schoolYear.current];
    items.forEach((i: any, index: number) => {
      if (index === id) {
        i[fieldName] = value;
      }
    });
    schoolYear.current = items;
  };

  const createElementList = () => {
    var div: any[] = [];
    schoolYear.current.forEach((element, index) => {
      div.push(
        <div key={index} className={styles.elementContainer}>
          <div className={styles.rowLabel}>School Year</div>
          <div className={styles.elementFlexContainer}>
            <div className="semiBold">2021/22</div>
            <div className={'actionIconBlack ' + styles.alignRight}>
              <ActionButton
                className="btnPlain"
                onClick={() => {
                  deleteElementHandler(element, index);
                }}
                iconProps={{ iconName: 'Delete' }}
                text="Delete"
              />
            </div>
          </div>
          <br />

          <div className={styles.elementFlexContainer}>
            <div className="padR20">
              <div className={styles.row1}>
                <div className={styles.rowLabel}>Student Count</div>
                <div>0</div>
              </div>

              <div className={styles.padTitle}>Class Year Name</div>
              <div>
                <TextField className={styles.textSize1} />
              </div>
              <div className="requiredTable">Required</div>
            </div>
            <div className="padR20">
              <div className={styles.row1}>
                <div className={styles.rowLabel}>Subject Code</div>
                <div>53</div>
              </div>

              <div className={styles.padTitle}>Start Date</div>
              <div className={styles.textSize1}>
                <Calendar
                  value={startDate}
                  formatSelectedDate={formatSelectedDateElement}
                  onSelectDate={dateStartHandler}
                  placeholder={'dd-mm-yyyy'}
                />
              </div>
              <div className="requiredTable">Required</div>
            </div>
            <div className="padR20">
              <div className={styles.row1}>
                <div className={styles.rowLabel}>Attendance</div>
                <div>
                  <Toggle
                    onText="Enable"
                    onChange={() => {
                      OnChange(null, null, 'attendance');
                    }}
                    offText="Disabled"
                    defaultChecked={element.attendance}
                  />
                </div>
              </div>

              <div className={styles.padTitle}>End Date</div>
              <div className={styles.textSize1}>
                <Calendar
                  value={startDate}
                  formatSelectedDate={formatSelectedDateElement}
                  onSelectDate={dateStartHandler}
                  placeholder={'dd-mm-yyyy'}
                />
              </div>
              <div className="requiredTable">Required</div>
            </div>
            <div className="padR20">
              <div className={styles.row1}></div>
              <div>
                <div>Student Time</div>
                <div className={styles.font10}>Hours/year/student</div>
              </div>
              <div>
                <TextField className={styles.textSize2} />
              </div>
              <div className="requiredTable">Required</div>
            </div>
            <div className="padR20">
              <div className={styles.row1}></div>
              <div className={styles.padTitle}>Class Norm</div>
              <div>
                <TextField className={styles.textSize2} />
              </div>
              <div className="requiredTable">Required</div>
            </div>
            <div className="padR20">
              <div className={styles.row1}></div>
              <div className={styles.padTitle}>Week Norm</div>
              <div>
                <TextField className={styles.textSize2} />
              </div>
            </div>
          </div>
        </div>,
      );
    });
    setElementList(div);
  };

  const addElementHandler = () => {
    var updateData: any[] = [...schoolYear.current];
    updateData.push({ id: updateData.length + 1 });
    schoolYear.current = updateData;
    createElementList();
  };
  const deleteElementHandler = (element: any, index: any) => {
    var updateData: any[] = [...schoolYear.current];
    updateData.splice(index, 1);
    schoolYear.current = updateData;
    createElementList();
  };

  return (
    <>
      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row  ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              Class Period and Element
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerDesc}>
              Input class's period and elements' details for each year
            </div>
          </div>
          <br />
          <br />
          <div className={'ms-Grid-row padB20'}>
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <div className={styles.rowLabel}>Start Year</div>
                  <div>
                    <Calendar
                      value={startDate}
                      formatSelectedDate={formatSelectedDate}
                      onSelectDate={dateStartHandler}
                      placeholder={'yyyy'}
                    />
                  </div>
                  <div className={styles.dateValue}>01-01-2021</div>
                </div>
                <div>
                  <div className={styles.rowLabel}>Final Year</div>
                  <div className="periodElementPicker">
                    <TagPicker
                      removeButtonAriaLabel="Remove"
                      // selectionAriaLabel="Selected XPRS Subject"
                      onResolveSuggestions={filterSelectedTags}
                      onItemSelected={onItemSelected}
                      getTextFromItem={getTextFromItem}
                      onEmptyInputFocus={returnMostRecentlyUsed}
                      pickerSuggestionsProps={pickerSuggestionsProps}
                      onChange={item => {
                        handleChange(null, item, 'finalYear');
                      }}
                      itemLimit={1}
                      inputProps={{
                        placeholder: 'Select Final year',
                      }}
                      // defaultSelectedItems={intialValues.finalYear}
                    />
                  </div>
                  <div className={styles.dateValue}>01-01-2022</div>
                </div>

                <div className={styles.alignRight1}>
                  <ActionButton
                    className="btnPlain btnPrimary"
                    onClick={addElementHandler}
                    iconProps={{ iconName: 'Add' }}
                    text="Add Element"
                  />
                </div>
              </div>
            </div>
          </div>

          {elementList}

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
              <div className={styles.buttom}>
                <div className={styles.btnGroup}>
                  <DefaultButton
                    text={intl(LabelNames.previous)}
                    className="btnDefault marginR15 "
                  />
                  <PrimaryButton text={intl(LabelNames.next)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PeriodAndElement;
