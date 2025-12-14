import mongoose from "mongoose";

// Subdocument for items in a cart
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Product reference
  quantity: { type: Number, default: 1 }, // Quantity of this product
});

// Main Cart schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the cart
  items: [cartItemSchema], // Array of cart items
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
