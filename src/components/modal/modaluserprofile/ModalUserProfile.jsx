import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Controller, useForm } from 'react-hook-form';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IconButton,
} from 'office-ui-fabric-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { PrimaryButton } from 'office-ui-fabric-react';
import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import classes from './ModalUserProfile.module.scss';

const cancelIcon = { iconName: 'Cancel' };
export const ModalUserProfile = props => {
  const { handleSubmit, control, errors } = useForm();
  function getErrorMessage(name) {
    return errors[name]?.message;
  }
  return (
    <div>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.hideModal}
        isBlocking={false}
        isModeless={true}
        containerClassName={contentStyles.container}>
        <div className={contentStyles.header}>
          <span>{intl(LabelNames.userProfile)}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={props.hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 container">
              <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="ms-Grid-row ">
                  <div className="ms-Grid-col ms-lg11">
                    <Controller
                      as={TextField}
                      control={control}
                      label={intl(LabelNames.firstname)}
                      autoComplete="firstname"
                      errorMessage={getErrorMessage('firstname')}
                      autoFocus
                      minLength={3}
                      maxLength={32}
                      defaultValue={
                        props.user != null ? props.user.firstname : ''
                      }
                      name="firstname"
                      rules={{
                        required: 'Please enter your first name',
                        minLength: {
                          value: 3,
                          message: 'Please enter your first name',
                        },
                        maxLength: {
                          value: 32,
                          message: 'First name is too long',
                        },
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="ms-Grid-row ">
                  <div className="ms-Grid-col ms-lg11">
                    <Controller
                      as={TextField}
                      control={control}
                      label={intl(LabelNames.lastname)}
                      autoComplete="lastname"
                      errorMessage={getErrorMessage('lastname')}
                      autoFocus
                      minLength={3}
                      maxLength={32}
                      defaultValue={
                        props.user != null ? props.user.lastname : ''
                      }
                      name="lastname"
                      rules={{
                        required: 'Please enter your last name',
                        minLength: {
                          value: 3,
                          message: 'Please enter your last name',
                        },
                        maxLength: {
                          value: 32,
                          message: 'Last Name is too long',
                        },
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="ms-Grid-row ">
                  <div className="ms-Grid-col ms-lg11">
                    <Controller
                      as={TextField}
                      control={control}
                      label={intl(LabelNames.email)}
                      autoComplete="email"
                      errorMessage={getErrorMessage('email')}
                      autoFocus
                      minLength={3}
                      maxLength={100}
                      defaultValue={props.user != null ? props.user.email : ''}
                      name="email"
                      rules={{
                        required: 'Please enter your email',
                        minLength: {
                          value: 3,
                          message: 'Please enter your email',
                        },
                        maxLength: { value: 100, message: 'email is too long' },
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="ms-Grid-row" dir="ltr">
                  <div className="ms-Grid-col ms-lg12">
                    <div className="ms-Grid-col ms-lg2">
                      <PrimaryButton
                        text={intl(LabelNames.save)}
                        type="submit"
                      />{' '}
                      &nbsp;
                    </div>
                    <div className="ms-Grid-col ms-lg6">
                      {props.isSpinner && <Spinner size={SpinnerSize.medium} />}{' '}
                      {props.isUpdated && (
                        <div className={classes.save}>
                          {intl(LabelNames.recordsaved)}
                        </div>
                      )}{' '}
                    </div>
                  </div>
                </div>
              </form>
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
    width: '600px',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',

      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
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

export default ModalUserProfile;
