import './ProjectItem.css';
import './Modal.css';

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
          <img className="modalCloseButton" src='../images/circle-close-multiple-svgrepo-com.svg' />
        </button>
      </div>
    </div>
  );
};

export default Modal;
