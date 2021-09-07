import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import styles from './CreateGuardian.module.scss';
import {
  PrimaryButton,
  DefaultButton,
  ActionButton,
} from 'office-ui-fabric-react';
import CreateGuardianForm from '../../../../../components/adminANDteacher/CreateGuardianForm/CreateGuardianForm';

let initialGuardian: any[] = [
  {
    id: 1,
    fullName: '',
    relationship: '',
  },
];

type CreateMainGuardianProps = {
  students: any[];
  isEdit: boolean;
  //lastName: string;
  //fullName: string;
  next: (prev: string, next: string, data: any) => void;
  cancel: () => void;
};

const CreateGuardian: React.FC<CreateMainGuardianProps> = props => {
  const [guardianFormView, setGuardianFormView] = useState<any[]>();
  const [formErrors, setFormErrors] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(initialGuardian));
    setIsSubmitting(true);
  };

  const validate = (values: any) => {
    var errorlist: any[] = [];
    var errormessage = 'Please input required field';
    values.forEach((item: any) => {
      let errors: any = {};
      var berrors = false;

      if (berrors) {
        errors.id = item.id;
        errorlist.push(errors);
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

  const onDeleteItem = (key: any) => {
    let guardianData = [...initialGuardian];
    let idxGuardian = guardianData.findIndex(a => a.id === key);
    if (idxGuardian !== -1) {
      guardianData.splice(idxGuardian, 1);

      initialGuardian = guardianData;
    }
    containerGuardian(guardianData);
  };

  const onAddItem = () => {
    var updateData = [...initialGuardian];
    updateData.push({
      id: initialGuardian.length + 1,
      fullName: '',
      relationship: '',
    });
    initialGuardian = updateData;

    containerGuardian(updateData);
  };

  useEffect(() => {
    if (props.students.length > 0) {
      initialGuardian = props.students;
    }
    containerGuardian(initialGuardian);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const containerGuardian = (data: any[]) => {
    let guardian: any[] = [];
    data.forEach((row: any, i: number) => {
      let itemError = formErrors?.find(r => r.id === row.id);
      guardian.push(
        <div key={i}>
          <CreateGuardianForm
            item={row}
            count={i}
            onDeleteItem={onDeleteItem}
            onChange={onChange}
            formErrors={itemError}
          />
        </div>,
      );
    });
    setGuardianFormView(guardian);
  };

  const onNextHandler = () => {
    if (props.isEdit) {
      props.next('6', '10', initialGuardian);
    } else {
      props.next('6', '1', initialGuardian);
    }
  };

  const prevHandler = () => {
    var data = {
      //fullName: props.fullName,
      //relationship: props.lastName,
    };
    props.next('6', '2', data);
  };

  const onChange = (value: any, id: any, fieldName: string) => {
    let items = [...initialGuardian];
    items.forEach((i, index) => {
      if (index === id) {
        i[fieldName] = value;
      }
    });
    initialGuardian = items;
  };

  return (
    <Fragment>
      <div className={styles.pad}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg16 ' + styles.headerTitle}>
            Students
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.customMargin}>
            You can add an existing student under this guardian
          </div>
        </div>
        <div className={'ms-Grid-col ms-lg16 ' + styles.headertitleButton}>
          <ActionButton
            className="btnPlain btnInfo"
            onClick={onAddItem}
            iconProps={{ iconName: 'Add' }}>
            Add Student
          </ActionButton>
        </div>
        <br />

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
                      className="btnDefault "
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

export default CreateGuardian;
