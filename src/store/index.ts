import { configureStore } from '@reduxjs/toolkit';
import runawaySlice from './runawaySlice';

export const store = configureStore({
  reducer: {
    runaway: runawaySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});