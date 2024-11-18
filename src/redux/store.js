import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import portfolioReducer from "./slices/portfolioSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
  },
});

export default store;
