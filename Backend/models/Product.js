import mongoose from "mongoose";

// Product schema: stores catalog info
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // Product title
    description: { type: String, default: "" },    // Optional description
    price: { type: Number, required: true, min: 0 }, // Price in smallest currency unit
    stock: { type: Number, required: true, min: 0 }, // Available quantity
    brand: { type: String, default: "" },          // Brand name
    category: { type: String, default: "" },       // Category for filtering
    image: { type: String, required: true },       // URL to product image
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
