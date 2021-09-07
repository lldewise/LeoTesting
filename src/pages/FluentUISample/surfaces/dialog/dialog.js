import React from 'react';
import DialogBasicExample from './defaultdialog/defaultdialog';
import DialogLargeHeaderExample from './dialogwithlargeheader/dialogwithlargeheader';
import DialogBlockingExample from './blockingdialog/blockingdialog';
import DialogTopOffsetFixedExample from './dialogwithtopoffsetfixed/dialogwithtopoffsetfixed';
import DialogModelessExample from './modelessdialog/modelessdialog';

const Dialog = () => {
  return (
    <div className="ms-Grid-row">
      <DialogBasicExample />
      <DialogLargeHeaderExample />
      <DialogBlockingExample />
      <DialogTopOffsetFixedExample />
      <DialogModelessExample />
    </div>
  );
};

export default Dialog;
