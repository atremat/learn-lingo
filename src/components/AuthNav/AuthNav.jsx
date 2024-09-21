import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './AuthNav.module.css';
import logoutIcon from '/logout.svg';
import ModalWindow from '../ModalWindow/ModalWindow';

export const AuthNav = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => {}} className={styles.loginButton}>
        <img src={logoutIcon} alt="Logout icon" className={styles.logoutIcon} />
        <span className={styles.loginText}>Log in</span>
      </button>

      <button
        type="button"
        onClick={handleOpenModal}
        className={styles.registerButton}
      >
        Registration
      </button>

      {modalIsOpen && (
        <ModalWindow
          onCloseModal={handleCloseModal}
          modalIsOpen={handleOpenModal}
        >
          <p>Hello</p>
        </ModalWindow>
      )}
    </div>
  );
};
