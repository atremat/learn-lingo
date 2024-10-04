import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { store } from '../redux/store';

import { ref, set } from 'firebase/database';

// export const registerUser = async ({ email, password, name }) => {
//   //create new user
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );

//   //get user info
//   const user = userCredential.user;

//   //save user info to redux
//   store.dispatch(setUser({ uid: user.uid, email: user.email, name }));

//   if (user) {
//     await set(ref(database, 'users/' + user.uid), {
//       email: user.email,
//       name: name,
//       createdAt: new Date().toISOString(), // Зберігаємо час створення
//     });
//   }

//   return userCredential.user;
// };

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
