import React, { useEffect } from 'react';
import {
  Dialog,
  DialogFooter,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';
import {
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';
import classes from './DialogConfirmationAttendance.module.scss';

const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
  styles: dialogStyles,
};

type DialogConfirmationAttendanceProps = {
  dialogContentProps: any;
  hideDialog: boolean;
  toggleHideDialog: () => void;
  onConfirm: () => void;
};

const DialogConfirmationAttendance: React.FC<DialogConfirmationAttendanceProps> =
  props => {
    const [spinner, setSpinner] = React.useState(false);
    const dialogConfirmHandler = () => {
      setSpinner(true);
      setTimeout(() => {
        props.onConfirm();
      }, 8000);
    };
    useEffect(() => {
      setSpinner(false);
    }, [props]);

    return (
      <>
        <Dialog
          minWidth={340}
          maxWidth={600}
          styles={dialogStyles}
          hidden={props.hideDialog}
          onDismiss={props.toggleHideDialog}
          title={props.dialogContentProps.title}
          modalProps={modelProps}>
          <div className={classes.flexcontainer}>
            <div className={classes.padR20}>
              {props.dialogContentProps.subText}
            </div>
            {spinner ? (
              <div>
                <Spinner size={SpinnerSize.small} />
              </div>
            ) : (
              ''
            )}
          </div>
          <DialogFooter>
            <DefaultButton onClick={props.toggleHideDialog} text="Cancel" />
            <PrimaryButton
              onClick={dialogConfirmHandler}
              disabled={spinner}
              text="Save"
            />
          </DialogFooter>
        </Dialog>
      </>
    );
  };

export default DialogConfirmationAttendance;
