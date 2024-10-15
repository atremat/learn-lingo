import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '../../config/firebase';

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

export const bookTeacher = createAsyncThunk(
  'teachers/bookTeacher',
  async ({ fullname, email, phoneNumber, question, teacherID }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      const uid = user.uid;

      const contactRef = ref(database, `booking/${teacherID}/${uid}`);

      await set(contactRef, {
        fullname,
        email,
        phoneNumber,
        question,
        teacherID,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
