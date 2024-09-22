import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './AuthNav.module.css';
import logoutIcon from '/logout.svg';
import ModalWindow from '../ModalWindow/ModalWindow';
import SignUp from '../SignUp/SignUp';
import SingIn from '../SignIn/SignIn';

export const AuthNav = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleSignInOpen = () => setIsSignInOpen(true);

  const handleSignUpClose = () => setIsSignUpOpen(false);
  const handleSignInClose = () => setIsSignInOpen(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={handleSignInOpen}
        className={styles.loginButton}
      >
        <img src={logoutIcon} alt="Logout icon" className={styles.logoutIcon} />
        <span className={styles.loginText}>Log in</span>
      </button>

      <button
        type="button"
        onClick={handleSignUpOpen}
        className={styles.registerButton}
      >
        Registration
      </button>

      {isSignUpOpen && (
        <ModalWindow
          onCloseModal={handleSignUpClose}
          modalIsOpen={isSignUpOpen}
        >
          <SignUp />
        </ModalWindow>
      )}

      {isSignInOpen && (
        <ModalWindow
          onCloseModal={handleSignInClose}
          modalIsOpen={isSignInOpen}
        >
          <SingIn />
        </ModalWindow>
      )}
    </div>
  );
};
