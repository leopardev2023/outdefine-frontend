import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }: ModalType) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className='modal'>
      <div
        className='fixed top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-hidden bg-[rgba(0,0,0,0.4)] backdrop-blur-[2px] z-10'
        onClick={() => onClose && onClose()}
      ></div>
      {children}
    </div>,
    document.body
  );
};

interface ModalType {
  isOpen: boolean;
  onClose?: Function;
  children?: any;
}

export default Modal;
