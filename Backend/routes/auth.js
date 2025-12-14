import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register new user (POST /api/auth/register)
router.post("/register", async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Login user (POST /api/auth/login)
router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Logout user (POST /api/auth/logout)
// Blacklists the token so it cannot be reused
router.post("/logout", authMiddleware, async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    // Set token expiration for blacklist
    const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 3600000);

    await TokenBlacklist.create({ token, expiresAt });
    res.status(200).json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
