import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial authentication state.
 * - token: JWT or session token
 * - user: Authenticated user object
 *
 * Persists state from localStorage to maintain sessions across page reloads.
 */
const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

/**
 * Authentication slice.
 *
 * Manages user login, logout, and local persistence.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Handles successful login.
     * Updates Redux state and persists token/user in localStorage.
     */
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    /**
     * Handles logout.
     * Clears authentication state and removes persisted data from localStorage.
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
