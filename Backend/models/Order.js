import mongoose from "mongoose";

// Order schema: stores placed orders
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who placed order

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Ordered product
        quantity: { type: Number, required: true, min: 1 }, // Quantity ordered
        price: { type: Number, required: true }, // Product price at order time
      },
    ],

    total: { type: Number, required: true }, // Total order amount
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }, // Order status
  },
  { timestamps: true } // Auto createdAt, updatedAt
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
