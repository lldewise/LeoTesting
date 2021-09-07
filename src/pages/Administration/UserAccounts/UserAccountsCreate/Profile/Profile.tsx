import React, { Fragment, useEffect, useRef } from 'react';
import styles from './Profile.module.scss';
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  ButtonType,
} from 'office-ui-fabric-react';
import { PersonaSize, Persona } from 'office-ui-fabric-react/lib/Persona';
import { useState } from 'react';
import moment from 'moment';
import Calendar from '../../../../../components/fluentui/Calendar/Calendar';
import _ from 'lodash';

type MainProfileProps = {
  profile: any;
  isEdit: boolean;
  userType: string;
  next: (prev: string, next: string, data: any) => void;
  cancel: () => void;
};

const Profile: React.FC<MainProfileProps> = props => {
  // eslint-disable-next-line
  const [imgProfile, setimgProfile] = useState(null);
  const [imgView, setimgView] = useState(props.profile?.imgProfile);
  const [profileDataHasChange, setProfileDataHasChange] = useState(false);
  const ssid = useState(props.profile?.ssid);
  let bday =
    props.profile?.birthday !== null && props.profile?.birthday !== undefined
      ? new Date(props.profile.birthday)
      : undefined;

  let cpr =
    props.profile?.cprNumber === '' && props.profile?.birthday !== undefined
      ? moment(props.profile.birthday).format('MMDDYYYY') + '-XXX'
      : undefined;

  const intialValues = {
    firstName: props.profile?.firstName,
    lastName: props.profile?.lastName,
    birthday: bday,
    cprNumber: cpr,
    email: props.profile?.email,
    phone: props.profile?.phone,
    phone1: props.profile?.phone1,
    conavn: props.profile?.conavn,
    address1: props.profile?.address1,
    address2: props.profile?.address2,
    zipCode: props.profile?.zipcode,
    municipality: props.profile?.municipality,
    country: props.profile?.country,
    personalemail: props.profile?.personalemail,
    status: props.profile?.status,
  };

  const [formValues, setFormValues] = useState<any>(intialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitForm = () => {
    const data = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthday: formValues.birthday,
      cprNumber: formValues.cprNumber,
      email: formValues.email,
      imgProfile: imgProfile,
      phone: formValues.phone,
      phone1: formValues.phone1,
      address1: formValues.address1,
      address2: formValues.address2,
      zipCode: formValues.zipCode,
      conavn: formValues.conavn,
      ssid: ssid,
      municipality: formValues.municipality,
      country: formValues.country,
      id: props.profile.id,
      guardianId: props.profile.guardianId,
      status: props.profile.status,
    };

    if (props.isEdit) {
      props.next('2', '10', data);
    } else {
      switch (props.userType.toString().toUpperCase()) {
        case 'STUDENT':
          props.next('2', '3', data);
          break;
        case 'STAFF':
          props.next('2', '4', data);
          break;
        case 'GUARDIAN':
          props.next('2', '6', data);
          break;
        default:
          props.next('2', '3', data);
      }
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      if (!_.isEqual(intialValues, formValues)) {
        setProfileDataHasChange(true);
      }
    }
  }, [formValues]);

  useEffect(() => {
    if (formValues.birthday) {
      var month = moment(formValues.birthday).format('MM');
      var day = moment(formValues.birthday).format('DD');
      var year = moment(formValues.birthday).format('YYYY');
      let init = month + day + year + '-XXX';
      let ext = formValues.cprNumber?.split('-')[1];
      if (ext === undefined || ext === 'XXX') {
        setFormValues({
          ...formValues,
          ['cprNumber']: init,
        });
      }
    }
  }, [formValues.birthday]);

  const handleChange = (e: any, item: any, fields: string) => {
    if (e) {
      if (e.target) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      } else {
        setFormValues({ ...formValues, [fields]: e });
      }
    } else {
      setFormValues({ ...formValues, [fields]: item });
    }
  };

  const formatSelectedDate = (date: Date) => {
    const dateSelected = moment(date).format('MM/DD/YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: any) => {
    let errors: any = {};
    // eslint-disable-next-line
    const regexnumber = /^[0-9]+$/;

    if (!values.firstName) {
      errors.firstName = 'Please input required field';
    }

    if (!values.lastName) {
      errors.lastName = 'Please input required field';
    }

    if (props.userType.toString().toUpperCase() !== 'GUARDIAN') {
      if (!values.birthday) {
        errors.birthday = 'Please input required field';
      }
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFileChange = (event: any) => {
    setimgProfile(event.target.files[0]);
    var img = URL.createObjectURL(event.target.files[0]);
    setimgView(img);
  };

  const upload = () => {
    document.getElementById('selectImage')!.click();
  };

  return (
    <>
      <form>
        <div className={styles.pad}>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
              Profile
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 ">
              This is the user's profile information and it will reflect to
              their public profile.
            </div>
          </div>

          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + styles.formHeader}>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <span className={styles.label}> Basic Info </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            {props.userType.toString().toUpperCase() !== 'GUARDIAN' ? (
              <div className={'ms-Grid-row ' + styles.profileMargin}>
                <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                  <div className={styles.container}>
                    <div className={styles.col1}>
                      <span className={'padR5 ' + styles.description}>
                        {' '}
                        Profile Picture{' '}
                      </span>
                    </div>
                    <div className={styles.col2}>
                      <div className={styles.col2profilepic}>
                        <Persona imageUrl={imgView} size={PersonaSize.size40} />
                        <DefaultButton
                          className={styles.customBtn}
                          onClick={upload}
                          buttonType={ButtonType.default}>
                          <span>Upload </span>
                        </DefaultButton>
                        <input
                          type="file"
                          id="selectImage"
                          className={styles.customBtnupload}
                          onChange={onFileChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className={'ms-Grid-row ' + styles.guardianMargin}>
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> ID </span>
                  </div>
                  <div className={styles.col2}>
                    <span> 987654321 </span>
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
                      placeholder="Enter first name"
                      errorMessage={formErrors.firstName}
                      defaultValue={formValues.firstName}
                      name="firstName"
                      onChange={(e, value) =>
                        handleChange(null, value, 'firstName')
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
                      placeholder="Enter last name"
                      errorMessage={formErrors.lastName}
                      defaultValue={formValues.lastName}
                      name="lastName"
                      onChange={(e, value) =>
                        handleChange(null, value, 'lastName')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {props.userType.toString().toUpperCase() !== 'GUARDIAN' && (
              <>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                    <div className={styles.container}>
                      <div className={styles.col1}>
                        <span> Birthday </span>{' '}
                        <span className={styles.required}>Required</span>
                      </div>
                      <div className={styles.col2}>
                        <Calendar
                          value={formValues.birthday}
                          formatSelectedDate={formatSelectedDate}
                          onSelectDate={(e: any) =>
                            handleChange(e, null, 'birthday')
                          }
                          placeholder="Select a date..."
                          errorMessage={formErrors.birthday}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                    <div className={styles.container}>
                      <div className={styles.col1}>
                        <span> Social Security No. </span>
                      </div>
                      <div className={styles.col2}>
                        <TextField
                          placeholder="Enter Social Security No."
                          errorMessage={formErrors.cprNumber}
                          value={formValues.cprNumber}
                          name="cprNumber"
                          onChange={(e, value) =>
                            handleChange(null, value, 'cprNumber')
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + styles.form}>
                <div className={styles.container}>
                  <div className={styles.col1}>
                    <span> Email </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter email address"
                      name="email"
                      errorMessage={formErrors.email}
                      defaultValue={formValues.email}
                      onChange={(e, value) =>
                        handleChange(null, value, 'email')
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
                    <span> Contact No. </span>
                  </div>
                  <div className={styles.col2}>
                    <div className={styles.customWidth}>
                      <TextField
                        placeholder="Enter contact no."
                        errorMessage={formErrors.phone}
                        defaultValue={formValues.phone}
                        name="phone"
                        onChange={(e, value) =>
                          handleChange(null, value, 'phone')
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
                    <span> Secondary Contact No. </span>
                  </div>
                  <div className={styles.col2}>
                    <div className={styles.customWidth}>
                      <TextField
                        placeholder="Enter secondary contact no."
                        errorMessage={formErrors.phone1}
                        defaultValue={formValues.phone1}
                        name="phone1"
                        onChange={(e, value) =>
                          handleChange(null, value, 'phone1')
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      errorMessage={formErrors.conavn}
                      defaultValue={formValues.conavn}
                      name="conavn"
                      onChange={(e, value) =>
                        handleChange(null, value, 'conavn')
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
                      errorMessage={formErrors.address1}
                      defaultValue={formValues.address1}
                      name="address1"
                      onChange={(e, value) =>
                        handleChange(null, value, 'address1')
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
                      errorMessage={formErrors.address2}
                      defaultValue={formValues.address2}
                      name="address2"
                      onChange={(e, value) =>
                        handleChange(null, value, 'address2')
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
                        errorMessage={formErrors.zipcode}
                        defaultValue={formValues.zipcode}
                        name="zipCode"
                        onChange={(e, value) =>
                          handleChange(null, value, 'zipCode')
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
                    <TextField
                      placeholder="Enter municipality"
                      errorMessage={formErrors.municipality}
                      defaultValue={formValues.municipality}
                      name="municipality"
                      onChange={(e, value) =>
                        handleChange(null, value, 'municipality')
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
                    <span> Country </span>
                  </div>
                  <div className={styles.col2}>
                    <TextField
                      placeholder="Enter country"
                      errorMessage={formErrors.country}
                      defaultValue={formValues.country}
                      name="country"
                      onChange={(e, value) =>
                        handleChange(null, value, 'country')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <span className={styles.btnGroup}>
                      <DefaultButton
                        text="Cancel"
                        className="btnDefault marginR15 "
                        onClick={props.cancel}
                      />
                      <PrimaryButton onClick={handleSubmit} text="Next" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Profile;
