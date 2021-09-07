import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
} from 'office-ui-fabric-react/lib/Dialog';
import {
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';
import {
  hiddenContentStyle,
  mergeStyles,
} from 'office-ui-fabric-react/lib/Styling';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useId, useBoolean } from '@uifabric/react-hooks';

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
};

const DialogBasicExample = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId = useId('dialogLabel');
  const subTextId = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Message Dialog</h5>
          </span>
        </div>
      </div>
      <Toggle
        label="Is draggable"
        onChange={toggleIsDraggable}
        checked={isDraggable}
      />
      <DefaultButton
        secondaryText="Opens the Sample Dialog"
        onClick={toggleHideDialog}
        text="Open Dialog"
      />
      <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        className="dialogTop">
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Send" />
          <DefaultButton onClick={toggleHideDialog} text="Don't send" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogBasicExample;
