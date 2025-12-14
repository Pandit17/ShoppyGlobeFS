import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

/**
 * Central Redux store configuration.
 *
 * Combines domain-specific reducers and provides
 * a single source of truth for application state.
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
