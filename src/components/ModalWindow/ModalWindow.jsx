import Modal from 'react-modal';
import Icon from '../Icon/Icon';
import style from './ModalWindow.module.css';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const ModalWindow = ({ modalIsOpen, onCloseModal, children }) => {
  useEffect(() => {
    document.body.classList.add(style.modalOpen);

    return () => {
      document.body.classList.remove(style.modalOpen);
    };
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={style.modalWindow}
      style={{
        overlay: {
          backgroundColor: 'rgba(17, 18, 19, 0.4)',
        },
      }}
    >
      <div className={style.modalContainer}>
        <button type="button" onClick={onCloseModal} className={style.btnClose}>
          <Icon id="close" width="32" height="32" />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWindow;
