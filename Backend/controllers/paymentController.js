import Order from "../models/Order.js";
import CartItem from "../models/CartItem.js";

// Create order from user's cart (PayPal flow)
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderID, payerID } = req.body; // PayPal identifiers (if needed)

    // Fetch user's cart items with product details
    const cartItems = await CartItem.find({ user: userId }).populate("product");
    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    let total = 0;

    // Prepare order items & calculate total
    const orderItems = cartItems.map((item) => {
      if (item.quantity > item.product.stock) {
        throw { status: 400, message: `Insufficient stock for ${item.product.name}` };
      }
      total += item.quantity * item.product.price;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Save new order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      status: "completed",
    });

    // Deduct stock from products
    for (const item of cartItems) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Clear user's cart
    await CartItem.deleteMany({ user: userId });

    return res.json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};
