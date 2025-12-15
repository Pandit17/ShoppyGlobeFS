import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

// Get all cart items for a user
export const getCartItems = async (userId) => {
  const cartItems = await CartItem.find({ user: userId }).populate("product");
  return { success: true, data: cartItems };
};

// Add product to cart
export const addToCart = async (userId, { productId, quantity = 1 }) => {
  const qty = parseInt(quantity);

  if (!productId || isNaN(qty) || qty < 1)
    throw { status: 400, message: "Invalid input" };

  const product = await Product.findById(productId);
  if (!product) throw { status: 404, message: "Product not found" };
  if (product.stock < qty) throw { status: 400, message: "Insufficient stock" };

  let cartItem = await CartItem.findOne({ user: userId, product: productId });

  if (cartItem) {
    cartItem.quantity += qty; // increment if already exists
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ user: userId, product: productId, quantity: qty });
  }

  await cartItem.populate("product");
  return { success: true, message: "Item added to cart", data: cartItem };
};

// Update cart item quantity
export const updateCartItem = async (userId, cartItemId, { quantity }) => {
  const qty = parseInt(quantity);

  const item = await CartItem.findById(cartItemId);
  if (!item) throw { status: 404, message: "Cart item not found" };
  if (item.user.toString() !== userId) throw { status: 403, message: "Access denied" };

  const product = await Product.findById(item.product);
  if (product.stock < qty) throw { status: 400, message: "Insufficient stock" };

  if (qty <= 0) {
    await CartItem.findByIdAndDelete(cartItemId); // delete if qty <= 0
    return { success: true, message: "Cart item removed" };
  }

  item.quantity = qty;
  await item.save();
  await item.populate("product");

  return { success: true, message: "Cart item updated", data: item };
};

// Delete a single cart item
export const deleteCartItem = async (userId, cartItemId) => {
  const item = await CartItem.findById(cartItemId);
  if (!item) throw { status: 404, message: "Cart item not found" };
  if (item.user.toString() !== userId) throw { status: 403, message: "Access denied" };

  await CartItem.findByIdAndDelete(cartItemId);
  return { success: true, message: "Cart item removed" };
};

// Clear all cart items for a user
export const clearCart = async (userId) => {
  await CartItem.deleteMany({ user: userId });
  return { success: true, message: "Cart cleared successfully" };
};