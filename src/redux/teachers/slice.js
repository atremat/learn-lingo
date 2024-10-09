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
  reducers: {
    //toggle state of favorite
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
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

export const { toggleFavorite, setFavorites } = teachersSlice.actions;
