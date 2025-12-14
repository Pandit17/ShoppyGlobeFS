// ================================
// Payment Routes: PayPal
// ================================

import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createOrder } from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/payment/create-order
// Protected route: user must be authenticated
router.post("/create-order", authMiddleware, createOrder);

export default router;
