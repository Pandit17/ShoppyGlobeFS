// ================================
// Order Routes: Checkout
// ================================

import express from "express";
import { checkout } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// POST /api/orders/checkout
// Protected route: place order, update stock, clear user's cart
router.post("/checkout", authMiddleware, checkout);

export default router;
