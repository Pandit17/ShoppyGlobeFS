import mongoose from "mongoose";

// CartItem schema: represents items in a user's shopping cart
const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the cart item
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Product reference
    quantity: { type: Number, required: true, min: 1 }, // Quantity of product
  },
  { timestamps: true } // Auto createdAt, updatedAt
);

// Prevent duplicate product entries for same user
cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
