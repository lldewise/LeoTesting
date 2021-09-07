import React, { useEffect } from 'react';
import {
  Dialog,
  DialogFooter,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import classes from './DeleteDialogConfirmation.module.scss';

const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
  styles: dialogStyles,
};

type DeleteDialogConfirmationProps = {
  spinner: boolean;
  dialogContentProps: any;
  hideDialog: boolean;
  toggleHideDialog: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteDialogConfirmation: React.FC<DeleteDialogConfirmationProps> =
  props => {
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
    }, []);

    return (
      <>
        <Dialog
          minWidth={340}
          maxWidth={600}
          styles={dialogStyles}
          hidden={props.hideDialog}
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
            <DefaultButton onClick={props.onCancel} text="Cancel" />
            <DefaultButton
              onClick={dialogConfirmHandler}
              disabled={spinner}
              text="Delete"
              className="btnDanger  marginR15"
            />
          </DialogFooter>
        </Dialog>
      </>
    );
  };

export default DeleteDialogConfirmation;
