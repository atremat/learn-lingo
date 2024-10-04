import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './AuthNav.module.css';
import logoutIcon from '/logout.svg';
import ModalWindow from '../ModalWindow/ModalWindow';
import SignUp from '../SignUp/SignUp';
import SingIn from '../SignIn/SignIn';
import { auth, database } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logoutUser } from '../../redux/auth/operations';

export const AuthNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleSignInOpen = () => setIsSignInOpen(true);

  const handleSignUpClose = () => setIsSignUpOpen(false);
  const handleSignInClose = () => setIsSignInOpen(false);

  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async user => {
  //     console.log(user);
  //     const docRef = doc(db, 'Users', user.uid);
  //     console.log('docRef: ', docRef);
  //     const docSnap = await getDoc(docRef);
  //     console.log('docSnap: ', docSnap);
  //     if (docSnap.exists()) {
  //       setUserDetails(docSnap.data());
  //       console.log('docSnap.data(): ', docSnap.data());
  //     } else {
  //       console.log('User is not logged!');
  //     }
  //   });
  // };

  // useEffect(() => fetchUserData, []);

  return (
    <div className={styles.container}>
      {!user && (
        <div className={styles.unsignedWrapper}>
          <button
            type="button"
            onClick={handleSignInOpen}
            className={styles.loginButton}
          >
            <img
              src={logoutIcon}
              alt="Logout icon"
              className={styles.logoutIcon}
            />
            <span className={styles.loginText}>Log in</span>
          </button>

          <button
            type="button"
            onClick={handleSignUpOpen}
            className={styles.registerButton}
          >
            Registration
          </button>
        </div>
      )}

      {user && (
        <div className={styles.signedWrapper}>
          <button
            type="button"
            onClick={() => dispatch(logoutUser())}
            className={styles.loginButton}
          >
            <img
              src={logoutIcon}
              alt="Logout icon"
              className={styles.logoutIcon}
            />
            <span className={styles.loginText}>Log out</span>
          </button>

          <div className={styles.registerButton}>{user?.name || 'User'}</div>
        </div>
      )}

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
