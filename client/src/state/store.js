import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
});
