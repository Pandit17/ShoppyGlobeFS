import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Checkout: Validate cart, create order, update stock, clear cart
export const checkout = async (userId) => {
  // Fetch user's cart items with product details
  const cartItems = await CartItem.find({ user: userId }).populate("product");
  if (!cartItems.length) throw { status: 400, message: "Cart is empty" };

  let total = 0;

  // Calculate total & validate stock
  for (const item of cartItems) {
    if (item.quantity > item.product.stock)
      throw { status: 400, message: `Insufficient stock for ${item.product.name}` };
    total += item.quantity * item.product.price;
  }

  // Prepare order items
  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // Create order
  const order = await Order.create({ user: userId, items: orderItems, total });

  // Deduct stock for each product
  for (const item of cartItems) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  // Clear user's cart
  await CartItem.deleteMany({ user: userId });

  return {
    success: true,
    message: "Order placed successfully",
    data: order,
  };
};
