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
import classes from './DialogConfirmation.module.scss';

const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
  styles: dialogStyles,
};

type DialogConfirmationProps = {
  spinner: boolean;
  onConfirm: any;
  hideDialog: any;
  toggleHideDialog: any;
  dialogContentProps: any;
  text: string | null;
};
const DialogConfirmation: React.FC<DialogConfirmationProps> = props => {
  const [spinner, setSpinner] = React.useState(props.spinner);
  const dialogConfirmHandler = () => {
    setSpinner(true);
    props.onConfirm();
  };
  useEffect(() => {
    setSpinner(props.spinner);
  }, [props]);

  useEffect(() => {
    setSpinner(props.spinner);
  }, [props.spinner]);

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
            text={props.text !== null ? props.text : 'Save'}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogConfirmation;
