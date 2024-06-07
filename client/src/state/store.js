import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { jobApi } from "./api/jobApiSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(jobApi.middleware),
});
