import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { teachersReducer } from './teachers/slice';
import { favoritesReducer } from './favorites/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
  },
});
