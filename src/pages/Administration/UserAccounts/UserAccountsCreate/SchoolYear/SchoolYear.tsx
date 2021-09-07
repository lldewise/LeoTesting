import React, { useState } from 'react';
import styles from './SchoolYear.module.scss';
import SchoolYearLists from '../../../../../components/adminANDteacher/UserAccounts/SchoolYearLists/SchoolYearLists';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Fragment } from 'react';

type MainSchoolYearProps = {
  schoolYear: any[];
  isEdit: boolean;
  next: (prev: string, next: string, data: any) => void;
  cancel: () => void;
};

const SchoolYear: React.FC<MainSchoolYearProps> = props => {
  const [schoolYear, setSchoolYear] = useState<any[]>(props.schoolYear);

  const onInputFieldHandler = (item: any, id: any, col: any) => {
    let items = [...schoolYear];
    items.forEach(a => {
      if (a.id === id) {
        a[col] = item;
      }
    });
    setSchoolYear(items);
  };

  const checkBoxChangeHandler = (checked: boolean, item: any) => {
    let items = [...schoolYear];
    items.forEach(a => {
      if (a.id === item.id) {
        if (checked) {
          a.active = 0;
        } else {
          a.active = 1;
        }
      }
    });
    setSchoolYear(items);
  };

  const onSaveHandler = () => {
    if (props.isEdit) {
      props.next('5', '10', schoolYear);
    } else {
      props.next('5', '1', schoolYear);
    }
  };

  const onPrevious = () => {
    props.next('5', '4', schoolYear);
  };

  return (
    <Fragment>
      <div className={styles.pads}>
        <div className="ms-Grid-row">
          <div className={'ms-Grid-col ' + styles.container}>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
                School Year
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                This is the school year that this staff is employed and other
                information about it.
              </div>
            </div>
            <br />
            <br />
            <div className="ms-Grid-row">
              <SchoolYearLists
                listItem={schoolYear}
                onInputFieldHandler={onInputFieldHandler}
                checkBoxChangeHandler={checkBoxChangeHandler}
              />
            </div>
            <br />

            {props.isEdit ? (
              <div className="ms-Grid-row">
                <div className="divpadt10" style={{ textAlign: 'right' }}>
                  <span>
                    <DefaultButton
                      text="Cancel"
                      className="btnDefault marginR15"
                      onClick={props.cancel}
                    />
                  </span>
                  <span className="padR10"></span>
                  <span>
                    <PrimaryButton
                      text="Save"
                      className="btnPrimary marginR15"
                      onClick={onSaveHandler}
                    />
                  </span>
                </div>
              </div>
            ) : (
              <div className="ms-Grid-row">
                <div className="divpadt10" style={{ textAlign: 'right' }}>
                  <span>
                    <DefaultButton
                      text="Previous"
                      className="btnDefault marginR15"
                      onClick={onPrevious}
                    />
                  </span>
                  <span className="padR10"></span>
                  <span>
                    <PrimaryButton
                      text="Next"
                      className="btnPrimary marginR15"
                      onClick={onSaveHandler}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SchoolYear;
