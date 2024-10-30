import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers, fetchTeachersPaginated } from './operations';

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    data: [],
    lastKey: null,
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTeachers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //
      .addCase(fetchTeachersPaginated.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersPaginated.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload.teachers];
        state.lastKey = action.payload.lastKey;
        state.loading = false;
      })
      .addCase(fetchTeachersPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
