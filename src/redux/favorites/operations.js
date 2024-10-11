import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../config/firebase';
import { get, ref } from 'firebase/database';

export const fetchFavorites = createAsyncThunk(
  'user/fetchFavorites',
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
          favorites: userData.favorites ? userData.favorites : [],
        };
      } else {
        throw new Error('Something went wrong! Try login again.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
