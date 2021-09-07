import React, { Fragment, useEffect, useState } from 'react';
import styles from './Guardian.module.scss';
import {
  PrimaryButton,
  DefaultButton,
  ActionButton,
} from 'office-ui-fabric-react';
import GuardianForm from '../../../../../components/adminANDteacher/GuardianForm/GuardianForm';
import { useStore } from '../../../../../store/store';
import emptyItems from '../../../../../assets/empty.png';
import _ from 'lodash';

let initialGuardian: any[] = [];

type MainGuardianProps = {
  guardian: any[];
  guardianList: any[];
  isEdit: boolean;
  profile: any;
  cancel: () => void;
  next: (prev: string, next: string, data: any) => void;
};

const Guardian: React.FC<MainGuardianProps> = props => {
  const [guardianFormView, setGuardianFormView] = useState<any[]>([]);
  const [formErrors, setFormErrors] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [guardianDataHasChange, setGuardianDataHasChange] =
    useState<boolean>(false);
  const [random, setRandom] = useState<any | null>(null);
  const data = useStore()[0];

  const initialData = props.guardian;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(initialGuardian));
    setIsSubmitting(true);
  };

  const validate = (values: any) => {
    var errorlist: any[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const contactRegex = /^[0-9]+$/;

    values.forEach((item: any) => {
      if (item.status !== true) {
        let errors: any = {};
        var berrors = false;

        if (!item.firstName) {
          errors.firstName = 'Please input required field';
          berrors = true;
        }
        if (!item.lastName) {
          errors.lastName = 'Please input required field';
          berrors = true;
        }
        if (item.contactNo) {
          if (!contactRegex.test(item.contactNo)) {
            errors.contactNo = 'Contact No. should only contain numbers';
            berrors = true;
          }
        }
        if (!item.email) {
          if (!emailRegex.test(item.email)) {
            errors.email = 'Invalid email format';
            berrors = true;
          }
        }
        if (berrors) {
          errors.id = item.id;
          errorlist.push(errors);
        }
      }
    });
    return errorlist;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      onNextHandler();
    } else {
      containerGuardian(initialGuardian);
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDeleteItem = (key: any, index: any) => {
    let guardianData = [...initialGuardian];
    if (key === null) {
      guardianData.splice(index, 1);
      initialGuardian = guardianData;
    } else {
      guardianData[index].status = true;
      guardianData[index].guardianStat = 'deleted';
      initialGuardian = guardianData;
    }
    containerGuardian(guardianData);
  };

  const onAddItem = () => {
    var updateData = [...initialGuardian];
    updateData.push({
      id: null,
      firstName: null,
      lastName: null,
      fullName: [],
      fullName1: '',
      relationship: '',
      contactNo: null,
      email: '',
      activateAtedu: true,
      useStudentAddress: true,
      status: false,
      conavn: null,
      address1: null,
      address2: null,
      zipcode: null,
      active: false,
      municipality: null,
      country: null,
      guardianStat: 'new',
    });
    initialGuardian = updateData;
    containerGuardian(updateData);
  };

  const onSelectName = (idx: any, id: any) => {
    let guardianData = [...initialGuardian];
    let details = data.guardianBySchool.filter(a => a.guardianId === id)[0];
    if (details) {
      guardianData[idx].firstName = details.firstName;
      guardianData[idx].lastName = details.lastName;
      guardianData[idx].activateAtedu = false;
      guardianData[idx].active = true;
      guardianData[idx].contactNo = details.phone;
      guardianData[idx].email = details.email;
      guardianData[idx].conavn = details.conavn;
      guardianData[idx].address1 = details.address1;
      guardianData[idx].address2 = details.address2;
      guardianData[idx].zipcode = details.zipcode;
      guardianData[idx].municipality = details.municipality;
      guardianData[idx].country = details.country;
      initialGuardian = guardianData;
    }
    containerGuardian(guardianData);
  };

  useEffect(() => {
    var data = initialGuardian;
    if (props.guardian != null) {
      data = props.guardian;
      initialGuardian = props.guardian;
    }
    containerGuardian(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.isEdit) {
      if (!_.isEqual(initialData, initialGuardian)) {
        setGuardianDataHasChange(true);
      }
    }
  }, [random]);

  const containerGuardian = (data: any[]) => {
    let guardian: any[] = [];
    let filterData = data.filter(r => r.status !== true);

    filterData.forEach((row: any, i: any) => {
      let itemError = formErrors.find(r => r.id === row.id);
      guardian.push(
        <div key={i}>
          <GuardianForm
            item={row}
            count={i}
            onDeleteItem={onDeleteItem}
            onChange={onChange}
            guardianList={props.guardianList}
            formErrors={itemError}
            onSelectName={onSelectName}
          />
        </div>,
      );
    });
    setGuardianFormView(guardian);
  };

  const onNextHandler = () => {
    var data = initialGuardian;
    if (props.isEdit) {
      props.next('3', '10', data);
    } else {
      props.next('3', '1', data);
    }
  };

  const prevHandler = () => {
    var data = initialGuardian;
    props.next('3', '2', data);
  };

  const onChange = (value: any, id: any, fieldName: string) => {
    let items = [...initialGuardian];
    items.forEach((i, index) => {
      if (index === id) {
        i[fieldName] = value;
      }
    });
    initialGuardian = items;
    setRandom(Math.random().toString(10).substring(7));
  };

  return (
    <Fragment>
      <div className={styles.pad}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
            Guardian
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.customMargin}>
            Add an existing guardian or a new guardian for this student
          </div>
        </div>
        <div className={'ms-Grid-col ' + styles.headertitleButton}>
          <ActionButton
            className="btnPlain btnInfo"
            onClick={onAddItem}
            iconProps={{ iconName: 'Add' }}>
            Add Guardian
          </ActionButton>
        </div>

        {initialGuardian.length === 0 && (
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.emptyGuardian}>
              <div className={styles.info}>
                <img
                  alt={emptyItems}
                  src={emptyItems}
                  style={{ height: '150px' }}
                />
                <div className={styles.noGuardianMessageTitle}>
                  No items to show here
                </div>
                <div className={styles.noGuardianMessage}>
                  You can add a Guardian by clicking the add button.
                </div>
              </div>
            </div>
          </div>
        )}

        {guardianFormView}
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
                <div className={styles.col2}>
                  <div className={styles.btnGroup}>
                    <DefaultButton
                      text="Previous"
                      className="btnDefault marginR15 "
                      onClick={prevHandler}
                    />
                    <PrimaryButton onClick={handleSubmit} text="Next" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Guardian;
