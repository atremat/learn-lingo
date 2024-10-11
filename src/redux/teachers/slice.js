import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers } from './operations';

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    data: [],
    favorites: [],
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
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
