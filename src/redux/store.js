import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { teachersReducer } from './teachers/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persisting token field from auth slice to localstorage
const teachersPersistConfig = {
  key: 'teachers',
  storage,
  whitelist: ['favorites'],
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: persistReducer(teachersPersistConfig, teachersReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
