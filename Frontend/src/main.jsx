// ================================
// Entry Point: main.jsx
// ================================

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, HashRouter } from "react-router-dom";

import router from "./routes/router"; 
import store from "./store/store";    
import "./styles/global.css";          
import "react-toastify/dist/ReactToastify.css"; 

// ================================
// Initialize React 18 root
// ================================
const root = createRoot(document.getElementById("root"));

// ================================
// Render application
// ----------------
// Responsibilities:
// 1. Wrap app with Redux Provider for global state management
// 2. Use HashRouter for GitHub Pages deployment routing
// 3. Use RouterProvider for declarative route rendering
// 4. Apply StrictMode for highlighting potential issues
// ================================
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <RouterProvider router={router} />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
