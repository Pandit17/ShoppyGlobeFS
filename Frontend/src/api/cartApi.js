// ================================
// Cart API: CRUD operations for shopping cart
// ================================

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Returns authorization headers for authenticated requests
 * @param {string} token - JWT token
 * @returns {Object} - Headers including Content-Type and Authorization
 */
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

/**
 * Fetch all cart items for the logged-in user
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - Cart data including items
 * @throws {Error} Throws if fetching fails
 */
export const getCartItems = async (token) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: authHeaders(token),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch cart items");
  return data;
};

/**
 * Add a product to the cart
 * @param {string} token - JWT token
 * @param {Object} cartItem - { productId, quantity }
 * @returns {Promise<Object>} - Updated cart data
 * @throws {Error} Throws if adding fails
 */
export const addToCart = async (token, cartItem) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(cartItem),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add item to cart");
  return data;
};

/**
 * Update the quantity of a cart item
 * @param {string} token - JWT token
 * @param {string} cartItemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} - Updated cart data
 * @throws {Error} Throws if updating fails
 */
export const updateCartItem = async (token, cartItemId, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update cart item");
  return data;
};

/**
 * Remove an item from the cart
 * @param {string} token - JWT token
 * @param {string} cartItemId - Cart item ID
 * @returns {Promise<Object>} - Updated cart data
 * @throws {Error} Throws if deletion fails
 */
export const deleteCartItem = async (token, cartItemId) => {
  const res = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete cart item");
  return data;
};
