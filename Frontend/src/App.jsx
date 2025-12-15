import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import { loginSuccess } from "./store/authSlice";

/**
 * Root application layout component.
 *
 * Responsibilities:
 * - Defines the global layout structure (header, main content, footer)
 * - Restores authenticated user state from persistent storage on initial load
 * - Hosts global UI providers such as toast notifications
 */
export default function App() {
  const dispatch = useDispatch();

  /**
   * Hydrates authentication state from localStorage.
   * Ensures user sessions persist across page refreshes.
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    }
  }, [dispatch]);

  return (
    <div className="app-root">
      {/* Persistent site header */}
      <Header />

      {/* Route-specific content */}
      <main className="container">
        <Outlet />
      </main>

      {/* Global footer */}
      <footer className="footer">
        <p>ShoppyGlobe • Demo E-commerce</p>
      </footer>

      {/* Global toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}