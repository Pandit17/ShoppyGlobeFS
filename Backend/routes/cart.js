import express from "express";
import auth from "../middleware/auth.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add product to cart (POST /api/cart/add)
router.post("/add", auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) return res.status(400).json({ status: "error", message: "productId is required" });

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) cart.items[itemIndex].quantity += quantity; // increase if exists
    else cart.items.push({ product: productId, quantity }); // add new item

    await cart.save();
    await cart.populate("items.product");
    res.json({ status: "success", message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Get all cart items for user (GET /api/cart)
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Update quantity of a cart item (PUT /api/cart/:itemId)
router.put("/:itemId", auth, async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  if (!quantity || quantity < 1) return res.status(400).json({ status: "error", message: "Quantity >= 1 required" });

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ status: "error", message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json({ status: "success", message: "Cart item updated", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Remove a cart item (DELETE /api/cart/:itemId)
router.delete("/:itemId", auth, async (req, res) => {
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ status: "error", message: "Item not found" });

    cart.items.pull(itemId); // remove item safely
    await cart.save();
    res.json({ status: "success", message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Clear all items for user (DELETE /api/cart)
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ status: "success", message: "Cart cleared", cart: cart || { items: [] } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
