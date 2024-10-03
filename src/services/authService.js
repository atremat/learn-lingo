import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { store } from '../redux/store';
import { clearUser, setUser } from '../redux/auth/slice';

// Register a new user
export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  store.dispatch(setUser(result.user));
  return result.user;
};

// Login an existing user
export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  store.dispatch(setUser(result.user));
  return result.user;
};

// Logout the current user
export const logoutUser = async () => {
  await signOut(auth);
  store.dispatch(clearUser());
};
