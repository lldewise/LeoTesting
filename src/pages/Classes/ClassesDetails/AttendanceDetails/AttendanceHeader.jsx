import React, { Fragment } from 'react';
import classes from './AttendanceDetails.module.scss';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean, useId } from '@uifabric/react-hooks';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Callout, mergeStyleSets, Text, FontWeights } from '@fluentui/react';
import {
  DefaultButton,
  ActionButton,
  PrimaryButton,
  Panel,
} from 'office-ui-fabric-react';

import AttendancePanel from './AttendancePanel';

function AttendanceHeader(props) {
  //const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(props.isCalloutVisible);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  function _onChangeText(item) {
    props._setSearchFilter(item.target.value);
  }

  const cssButton = props.toggleButton
    ? 'btnDisabled confirmAttendanceDisabled'
    : 'btnPrimary confirmAttendance';
  /* 
     
  const cssButton = props.confirmed
  ? "btnDissabled confirmAttendanceDisabled"
  : "btnPrimary confirmAttendance"; */
  const dialogStyles = { main: { maxWidth: 500, minWidth: 500 } };
  const dialogContentConfirm = {
    type: DialogType.normal,
    styles: dialogStyles,
    title: 'Do you want to confirm this attendance?',
    closeButtonAriaLabel: 'Cancel',
    subText: 'You can always return here and make changes.',
  };

  const handleconfirmAttendance = () => {
    toggleHideDialogConfirm();
  };
  const [hideDialogConfirm, { toggle: toggleHideDialogConfirm }] =
    useBoolean(true);

  const _onConfirm = () => {
    props.SaveDataHandler();
    toggleHideDialogConfirm();
  };

  const getDoubleBooking = () => {
    /*     apiGet
          .get(
            "api/school/" +
              data.userProfile.school +
              "/admin/activity/conflict?datefrom=" +
              moment(new Date()).format("YYYY-MM-DD") +
              "&dateTo=" +
              moment(new Date()).format("YYYY-MM-DD") +
              "&clientId=" +
              data.userExternalUnique
          )
          .then(function (response) {
            var data = JSON.parse(response.data);
            dispatch("ADDACTIVITYDATA", data);
          }); */
    openPanel();
  };
  const styles = mergeStyleSets({
    button: {
      width: 130,
    },
    callout: {
      width: 320,
      padding: '20px 24px',
    },
    title: {
      marginBottom: 12,
      fontWeight: FontWeights.semilight,
    },
    link: {
      display: 'block',
      marginTop: 20,
    },
  });
  return (
    <>
      <Panel
        headerText="Double Booking"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        isBlocking={false}
        closeButtonAriaLabel="Close"
        className={classes.doubleBookingPanel}>
        <AttendancePanel />
      </Panel>
      <DialogConfimation
        dialogContentProps={dialogContentConfirm}
        hideDialog={hideDialogConfirm}
        toggleHideDialog={toggleHideDialogConfirm}
        onConfirm={_onConfirm}
      />
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12">
          {/*         <div className={"ms-Grid-row " + classes.divBg}>
            <div className={"ms-Grid-col ms-md9 ms-lg9 searchboxAttendance"}>
              <SearchBox
                placeholder="Search student name..."
                onChange={_onChangeText}
                underlined={true}
              />
            </div>
          </div> */}

          <div className="ms-Grid-row ">
            <div
              className={
                'ms-Grid-col ms-md12 ms-lg12  searchBoxAttendance ' +
                classes.divBg +
                ' ' +
                classes.divSearch
              }>
              <SearchBox
                placeholder="Search student name..."
                onChange={_onChangeText}
                underlined={true}
              />
            </div>
          </div>
          {/*         <div className={"ms-Grid-col ms-md3 ms-lg3  " + classes.confirmButton}>
          <PrimaryButton
            id={buttonId}
            ariaDescription="Detailed description used for screen reader."
            className={cssButton}
            disabled=  {props.toggleButton}//{props.toggleButton}
            onClick={handleconfirmAttendance}
            // onClick={props.SaveDataHandler}
          >
            {" "}
            Confirm Attendance{" "}
          </PrimaryButton>
          {props.isCalloutVisible && (
            <Callout
              className={styles.callout}
              ariaLabelledBy={labelId}
              ariaDescribedBy={descriptionId}
              role="alertdialog"
              gapSpace={0}
              target={`#${buttonId}`}
              onDismiss={props.toggleIsCalloutVisible}
              setInitialFocus>
              <Text
                block
                variant="xLarge"
                className={styles.title}
                id={labelId}>
                Don't forget!
              </Text>
              <Text block variant="small" id={descriptionId}>
                Please Click 'Confirm attendance' again once you finished
                updating your registration so we can save all your changes :)
              </Text>
              <div className={styles.link}>
                <DefaultButton
                  onClick={props.toggleIsCalloutVisible}
                  text="Got it"
                />
              </div>
            </Callout>
          )}
        </div> */}
          <div className={classes.divBg + ' ' + classes.index1}>
            <div className={classes.headerFlex}>
              <div className="padR5">
                <ActionButton
                  iconProps={{ iconName: 'EditCreate' }}
                  text="Double Bookings"
                  onClick={getDoubleBooking}
                  className={'btnPlain btnPrimary ' + classes.btnDoubleBooking}
                />
              </div>
              <div>
                <PrimaryButton
                  text="Confirm Attendance"
                  className="btnPrimary marginR15"
                  onClick={handleconfirmAttendance}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AttendanceHeader;
