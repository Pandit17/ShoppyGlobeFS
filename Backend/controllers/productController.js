import Product from "../models/Product.js";

// List products with optional search & pagination
export const getProducts = async ({ search, page = 1, limit = 20 }) => {
  const pageNum = Math.max(1, parseInt(page)); // ensure page >=1
  const limitNum = Math.max(1, parseInt(limit)); // ensure limit >=1
  const skip = (pageNum - 1) * limitNum;

  // Search by name (case-insensitive) if query provided
  const searchQuery = search ? { name: { $regex: search, $options: "i" } } : {};

  const total = await Product.countDocuments(searchQuery);
  const products = await Product.find(searchQuery).skip(skip).limit(limitNum).lean();

  return {
    success: true,
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
    data: products,
  };
};

// Retrieve a single product by ID
export const getProductById = async (id) => {
  const product = await Product.findById(id).lean();
  if (!product) return null;

  return { success: true, data: product };
};
