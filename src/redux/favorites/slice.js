import { createSlice } from '@reduxjs/toolkit';
import { fetchFavorites } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // toggle state of favorite
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
      //sign up
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, handleRejected);
  },
});

export const favoritesReducer = favoritesSlice.reducer;

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
