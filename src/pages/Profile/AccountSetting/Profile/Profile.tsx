import React, { Fragment, useEffect, useState } from 'react';
import {
  DefaultButton,
  TextField,
  Pivot,
  PivotItem,
  ActionButton,
  PrimaryButton,
} from 'office-ui-fabric-react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import classes from './Profile.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import apiUser from '../../../../services/apiUser';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean } from '@uifabric/react-hooks';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

const dialogContent = {
  type: DialogType.normal,
  title: 'Do you want to save your changes?',
  closeButtonAriaLabel: 'Close',
  subText: 'This will replace all current details!',
};

type ProfileProps = {
  user: any;
  userExternalId: any;
};

const Profile: React.FC<ProfileProps> = props => {
  const { principal } = useAuthentication();
  const [imgProfile, setimgProfile] = useState<any | null>();
  const [imgView, setimgView] = useState(props.user?.imageUrl);
  const [initial, setinitial] = useState('');
  const [contactNo, setContactNo] = useState(props.user?.contactNo);
  const [secondContactNo, setSecondContactNo] = useState(
    props.user?.secondaryContactNo,
  );
  const [email, setEmail] = useState(props.user?.email);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const upload = () => {
    document.getElementById('selectImage')!.click();
  };
  const onFileChange = (event: any) => {
    setimgProfile(event.target.files[0]);
    var img = URL.createObjectURL(event.target.files[0]);
    setimgView(img);
  };
  useEffect(() => {
    if (props.user !== undefined) {
      setimgProfile(null);
      setinitial(props.user.imageInitials);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveData = () => {
    var imageName = props.user?.imageUrl;
    if (imgProfile !== undefined) imageName = imgProfile.name;

    var postData = {
      userId: props.user.id,
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      email: email,
      externalId: props.userExternalId,
      contantNo: contactNo,
      secondaryContantNo: secondContactNo !== undefined ? secondContactNo : '',
      imgUrl: imageName,
    };

    apiUser
      .post('/api/school/' + props.user.school + '/user', postData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(function (response) {
        if (imgProfile !== undefined) {
          let formData = new FormData();
          formData.append('image', imgProfile, imgProfile.name);
          uploadImage(formData, response.data);
        } else {
          toggleHideDialog();
        }
      });
  };

  const uploadImage = (formData: any, id: any) => {
    apiUser
      .post(
        '/api/school/' +
          props.user.school +
          '/profile/blob/' +
          id +
          '?userId=' +
          props.user.id,
        formData,
        {
          headers: {
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(function () {
        toggleHideDialog();
      });
  };

  const ConfirmHandler = () => {
    saveData();
  };

  const contactChangeHandler = (ev: any) => {
    var value = ev.target.value;
    setContactNo(value);
  };
  const secondContactNoChangeHandler = (ev: any) => {
    var value = ev.target.value;
    setSecondContactNo(value);
  };

  const emailChangeHandler = (ev: any) => {
    var value = ev.target.value;
    setEmail(value);
  };

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContent}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        text={null}
        spinner={false}
      />

      <div className={'ms-Grid-row ' + classes.container}>
        <div className="ms-Grid-col ms-lg12 ">
          <div className={'ms-Grid-row ' + classes.containerSub}>
            <div className={'ms-Grid-col ms-lg12 '}>
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div className={classes.header}>
                    {intl(LabelNames.updateprofile)}
                  </div>
                  <div className={classes.headerdesc}>
                    {intl(LabelNames.updateprofiledesc)}{' '}
                    <span className={classes.headerprofile}>
                      {' '}
                      {intl(LabelNames.profile.toLowerCase())}.
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div className="ms-Grid-col ms-lg1">
                    <Persona
                      imageUrl={imgView}
                      imageInitials={initial}
                      size={PersonaSize.size40}
                      presence={PersonaPresence.online}
                    />
                  </div>
                  <div className={'ms-Grid-col ms-lg11 ' + classes.imgUpload}>
                    <DefaultButton text="Upload New Photo" onClick={upload} />

                    <div className="ms-Grid-row">
                      <input
                        type="file"
                        id="selectImage"
                        onChange={onFileChange}
                        className={classes.customBtnupload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg11">
                  <div className="ms-Grid-col ms-lg6">
                    <TextField
                      label={intl(LabelNames.contactno)}
                      placeholder={intl(LabelNames.typehere)}
                      className={classes.inputhalf}
                      defaultValue={contactNo}
                      onChange={ev => {
                        contactChangeHandler(ev);
                      }}
                    />
                  </div>
                  <div className="ms-Grid-col ms-lg6">
                    <TextField
                      label={intl(LabelNames.secondarycontactno)}
                      placeholder={intl(LabelNames.typehere)}
                      className={classes.inputhalf}
                      defaultValue={secondContactNo}
                      onChange={ev => {
                        secondContactNoChangeHandler(ev);
                      }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg11">
                  <div className="ms-Grid-col ms-lg6">
                    <TextField
                      label={intl(LabelNames.emailaddress)}
                      placeholder={intl(LabelNames.typehere)}
                      className={classes.inputhalf}
                      defaultValue={email}
                      onChange={ev => {
                        emailChangeHandler(ev);
                      }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col ms-lg12">
                  <div className={classes.guardian}>
                    {intl(LabelNames.guardiandetails)}
                  </div>
                </div>
              </div>
              <br />
              <div className="ms-Grid-row ">
                <div className="ms-Grid-col  ms-lg6"></div>
                <div
                  className={
                    'ms-Grid-col  ms-lg6 actionButtonBlue ' + classes.index2
                  }>
                  <ActionButton iconProps={{ iconName: 'Add' }}>
                    <span className={classes.blue}>
                      {' '}
                      {intl(LabelNames.addaguardian)}
                    </span>
                  </ActionButton>
                </div>
              </div>
              <div className={'ms-Grid-row ' + classes.index0}>
                <div className="ms-Grid-col ms-lg12 AccountSettingPivot">
                  <Pivot aria-label="Basic Pivot Example">
                    <PivotItem headerText="Ana">
                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg11">
                          <TextField
                            label={intl(LabelNames.fullname)}
                            value="Ana Lopez"
                            placeholder={intl(LabelNames.typehere)}
                            className={classes.inputwhole}
                          />
                        </div>
                      </div>

                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg11">
                          <div className="ms-Grid-col ms-lg6">
                            <TextField
                              label={intl(LabelNames.contactno)}
                              placeholder={intl(LabelNames.typehere)}
                              className={classes.inputhalf}
                            />
                          </div>
                          <div className="ms-Grid-col ms-lg6">
                            <TextField
                              label={intl(LabelNames.relationship)}
                              placeholder={intl(LabelNames.typehere)}
                              className={classes.inputhalf}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg12 actionButtonBlue">
                          <ActionButton iconProps={{ iconName: 'Delete' }}>
                            <span className={classes.blue}>
                              {' '}
                              {intl(LabelNames.removeasaguardian)}
                            </span>
                          </ActionButton>
                        </div>
                      </div>
                    </PivotItem>
                    <PivotItem headerText="Kristoff">
                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg11">
                          <TextField
                            label={intl(LabelNames.fullname)}
                            placeholder={intl(LabelNames.typehere)}
                            value="KrisOff David"
                            className={classes.inputwhole}
                          />
                        </div>
                      </div>

                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg11">
                          <div className="ms-Grid-col ms-lg6">
                            <TextField
                              label={intl(LabelNames.contactno)}
                              placeholder={intl(LabelNames.typehere)}
                              className={classes.inputhalf}
                            />
                          </div>
                          <div className="ms-Grid-col ms-lg6">
                            <TextField
                              label={intl(LabelNames.relationship)}
                              placeholder={intl(LabelNames.typehere)}
                              className={classes.inputhalf}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="ms-Grid-row ">
                        <div className="ms-Grid-col ms-lg12 actionButtonBlue ">
                          <ActionButton iconProps={{ iconName: 'Delete' }}>
                            <span className={classes.blue}>
                              {' '}
                              {intl(LabelNames.removeasaguardian)}
                            </span>
                          </ActionButton>
                        </div>
                      </div>
                    </PivotItem>
                  </Pivot>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + classes.publish}>
              <div className={classes.floatR}>
                <PrimaryButton
                  className="btnPrimary"
                  onClick={toggleHideDialog}
                  text={intl(LabelNames.update)}
                />
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default Profile;
