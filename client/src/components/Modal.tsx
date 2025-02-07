import './ProjectItem.css';
import './Modal.css';

type ModalProps = { 
  // accepts a JSX component as a prop and displays the component content
  currentModal: JSX.Element | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

// handles displaying a modal popup when the user intacts with main page elements 

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
