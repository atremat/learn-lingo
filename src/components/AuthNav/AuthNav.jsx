import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './AuthNav.module.css';
import logoutIcon from '/logout.svg';
import ModalWindow from '../ModalWindow/ModalWindow';
import SignUp from '../SignUp/SignUp';
import SingIn from '../SignIn/SignIn';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const AuthNav = () => {
  //
  const [userDetails, setUserDetails] = useState(null);
  //
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleSignInOpen = () => setIsSignInOpen(true);

  const handleSignUpClose = () => setIsSignUpOpen(false);
  const handleSignInClose = () => setIsSignInOpen(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async user => {
      console.log(user);
      const docRef = doc(db, 'Users', user.uid);
      console.log('docRef: ', docRef);
      const docSnap = await getDoc(docRef);
      console.log('docSnap: ', docSnap);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log('docSnap.data(): ', docSnap.data());
      } else {
        console.log('User is not logged!');
      }
    });
  };

  useEffect(() => fetchUserData, []);

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
          <SignUp modalClose={handleSignUpClose} />
        </ModalWindow>
      )}

      {isSignInOpen && (
        <ModalWindow
          onCloseModal={handleSignInClose}
          modalIsOpen={isSignInOpen}
        >
          <SingIn modalClose={handleSignInClose} />
        </ModalWindow>
      )}
    </div>
  );
};
