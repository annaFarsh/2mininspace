import { configureStore } from '@reduxjs/toolkit';
import spaceshipSlice from './spaceshipSlice';

export const store = configureStore({
  reducer: {
    spaceship: spaceshipSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;