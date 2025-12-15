// ================================
// Entry Point: main.jsx
// ================================

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router"; // Application router configuration
import store from "./store/store";    // Redux store for global state management

import "./styles/global.css";          // Global CSS styles
import "react-toastify/dist/ReactToastify.css"; // Toast notifications CSS

// ================================
// Initialize React 18 root
// ================================
const root = createRoot(document.getElementById("root"));

// ================================
// Render Application
// ----------------
// Responsibilities:
// 1. Wrap the app with Redux Provider for state management.
// 2. Use RouterProvider for declarative route rendering.
// 3. Apply StrictMode for highlighting potential issues in development.
// ================================
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
