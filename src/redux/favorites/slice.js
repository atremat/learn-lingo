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
      const index = state.items.indexOf(id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(id);
      }
    },
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
      .addCase(fetchFavorites.rejected, handleRejected);
  },
});

export const favoritesReducer = favoritesSlice.reducer;

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
