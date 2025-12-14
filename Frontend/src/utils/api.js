const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Retrieves a list of products from the backend API.
 *
 * @param {Object} params - Optional query parameters for filtering, sorting, or pagination
 * @returns {Promise<Array>} Array of product objects
 * @throws {Error} When the request fails or the API returns an error response
 */
export async function fetchProducts(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}/products?${queryString}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to fetch products");
  }

  return payload.data.data;
}

/**
 * Retrieves a single product by its unique identifier.
 *
 * @param {string} id - Product identifier
 * @returns {Promise<Object>} Product object
 * @throws {Error} When the request fails or the API returns an error response
 */
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to fetch product");
  }

  return payload.data.data;
}
