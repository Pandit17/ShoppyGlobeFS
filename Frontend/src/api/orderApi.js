// ================================
// Order API: Checkout & Order Management
// ================================

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Returns authorization headers for authenticated requests
 * 
 * @param {string} token - JWT token
 * @returns {Object} - Headers including Content-Type and Authorization
 */
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

/**
 * Checkout all cart items and create an order
 *
 * @param {string} token - JWT token of the logged-in user
 * @returns {Promise<Object>} - Server response with order confirmation
 * @throws {Error} Throws if checkout fails or server responds with error
 */
export const checkoutCart = async (token) => {
  const res = await fetch(`${BASE_URL}/orders/checkout`, {
    method: "POST",
    headers: authHeaders(token),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Checkout failed");

  return data; // { success, orderId, message, ... }
};
