import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataslice';

const store = configureStore({
  reducer: {
    data: dataReducer, // Add your slices here
  },
});

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
