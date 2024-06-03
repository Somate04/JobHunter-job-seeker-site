import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, role: null },
  reducers: {
    login: (state, { payload: { user, accessToken: token } }) => {
      state.user = user;
      state.token = token;
      state.role = user.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUserRole = (state) => state.auth.role;
export const selectToken = (state) => state.auth.token;
