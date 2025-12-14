// ================================
// Auth API: Handles login & register requests using Axios
// ================================

import axios from "../utils/axios";

// ================================
// Register a new user
// POST /api/auth/register
// payload: { name, email, password }
// ================================
export const registerUser = async (userData) => {
  try {
    const res = await axios.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

// ================================
// Login user
// POST /api/auth/login
// payload: { email, password }
// returns: { token, user }
// ================================
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post("/auth/login", credentials);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
