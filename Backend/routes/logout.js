// ================================
// Logout Route: Blacklist JWT token
// ================================

import express from "express";
import auth from "../middleware/auth.js";
import TokenBlacklist from "../models/TokenBlacklist.js";

const router = express.Router();

// POST /api/logout
// Protected route: invalidates current JWT by adding it to blacklist
router.post("/", auth, async (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(400).json({ status: "error", message: "No token provided" });
  }

  try {
    await TokenBlacklist.create({ token });
    res.json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error during logout" });
  }
});

export default router;
