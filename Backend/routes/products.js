// ================================
// Product Routes: List & Detail
// ================================

import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// GET /api/products
// Optional query: search, page, limit
router.get("/", async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const products = await getProducts({ search, page, limit });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
// Returns product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

export default router;
