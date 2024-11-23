// src/sjy_profile/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import portfolioReducer from './slices/portfolioSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    portfolio: portfolioReducer,
  },
});

export { store };
