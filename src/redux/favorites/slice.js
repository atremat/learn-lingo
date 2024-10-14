import { createSlice } from '@reduxjs/toolkit';
import { fetchFavorites, toggleFavorite } from './operations';

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
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //fetchFavorites
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, handleRejected)
      //toggleFavorite
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(toggleFavorite.rejected, handleRejected);
  },
});

export const favoritesReducer = favoritesSlice.reducer;

export const { setFavorites } = favoritesSlice.actions;
