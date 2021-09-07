import React from 'react';
import ModalBasicExample from './defaultmodal/defaultmodal';
import ModalModelessExample from './modelessmodal/modelessmodal';

const Modal = () => {
  return (
    <div className="ms-Grid-row">
      <ModalBasicExample />
      <ModalModelessExample />
    </div>
  );
};

export default Modal;
