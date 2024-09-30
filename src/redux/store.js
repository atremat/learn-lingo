import { configureStore } from '@reduxjs/toolkit';
// import { authReducer } from './auth/slice';
import { teachersReducer } from './teachers/slice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    teachers: teachersReducer,
  },
});
