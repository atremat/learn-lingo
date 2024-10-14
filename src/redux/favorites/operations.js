import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../config/firebase';
import { get, ref, set } from 'firebase/database';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
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

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (teacher, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue('User is not authenticated');
      }

      const favoritesRef = ref(database, `users/${user.uid}/favorites`);

      const snapshot = await get(favoritesRef);

      if (snapshot.exists()) {
        //get favorites
        const favorites = JSON.parse(snapshot.val());

        const id = teacher.id;

        const index = favorites.findIndex(teacher => teacher.id == id);

        if (index !== -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(teacher);
        }

        //set to firebase
        await set(
          ref(database, `users/${user.uid}/favorites`),
          JSON.stringify(favorites)
        );

        return favorites;
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
