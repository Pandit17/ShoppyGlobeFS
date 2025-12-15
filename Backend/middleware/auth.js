import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/TokenBlacklist.js";

// Auth middleware: Protect routes by verifying JWT
const auth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ status: "error", message: "Authorization token required" });

  try {
    // Check if token is blacklisted
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ status: "error", message: "Token invalidated. Please login again." });
    }

    // Verify token and attach user info to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ status: "error", message: "Invalid or expired token" });
  }
};

export default auth;