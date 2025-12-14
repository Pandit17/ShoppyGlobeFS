// ================================
// API Endpoints: Centralized URL references
// ================================

const BASE_URL = 'http://localhost:5000'; // Backend base URL

export const API_URLS = {
  PRODUCTS: `${BASE_URL}/api/products`, // Products API
  AUTH: `${BASE_URL}/api/auth`,         // Authentication API
  CART: `${BASE_URL}/api/cart`,         // Cart CRUD API
  ORDER: `${BASE_URL}/api/checkout`,    // Checkout API
};
