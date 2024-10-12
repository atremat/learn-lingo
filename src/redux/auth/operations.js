import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';

// Register a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }, thunkAPI) => {
    try {
      //create new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //get user info
      const user = userCredential.user;

      //if success, save userinfo to realtime database
      if (user) {
        await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          name: name,
          createdAt: new Date().toISOString(),
          favorites: JSON.stringify([]),
        });
      }

      //save userinfo to redux
      return { uid: user.uid, email: user.email, name };
    } catch (err) {
      let errMessage;

      const errorCode = err.code;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          errMessage = 'This email is already in use!';
          break;

        default:
          errMessage = 'Error while registering user.';
          break;
      }
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      //create new user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //get user info
      const user = userCredential.user;

      if (user) {
        const userRef = ref(database, 'users/' + user.uid);

        // get data from Realtime Database
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          //save userinfo to redux
          return {
            uid: user.uid,
            email: user.email,
            name: userData.name,
          };
        } else {
          throw new Error('User data not found in the database');
        }
      }
    } catch (err) {
      let errMessage;

      const errorCode = err.code;

      switch (errorCode) {
        case 'auth/invalid-credential':
          errMessage = 'Wrong email or password!';
          break;

        default:
          errMessage = 'Error while login user.';
          break;
      }
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//refresh user
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue('User is not authenticated');
      }

      const userRef = ref(database, 'users/' + user.uid);

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        return {
          uid: user.uid,
          email: user.email,
          name: userData.name,
        };
      } else {
        throw new Error('Something went wrong! Try login again.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
