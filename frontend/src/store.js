// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './features/apiSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    [apiSlice.reducerPath]: apiSlice.reducer, // If using RTK Query API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add middleware for RTK Query
});

export default store;
