import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { database } from '../../config/firebase';
import { createContext } from 'react';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, thunkAPI) => {
    try {
      const teachersRef = ref(database, 'teachers');

      const snapshot = await get(teachersRef);

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return thunkAPI.rejectWithValue('No data available');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchFavorites = createContext
