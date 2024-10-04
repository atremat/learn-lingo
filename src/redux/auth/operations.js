import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

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
          errMessage = 'Error while register user.';
          break;
      }
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);
