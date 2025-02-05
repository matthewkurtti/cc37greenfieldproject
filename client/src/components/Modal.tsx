import { useState, useEffect } from 'react';
import './ProjectItem.css';

type ModalProps = {
  currentModal: JSX.Element | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const Modal = ({ currentModal, setCurrentModal }: ModalProps) => {
  return (
    <div className="modal">
      <div className="content">
        {currentModal}
        <button
          className="close-btn"
          onClick={() => {
            setCurrentModal(null);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
