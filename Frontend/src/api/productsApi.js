// ================================
// Products API: ShoppyGlobe Backend
// ================================

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

/**
 * Fetch a list of products from the backend.
 * Supports optional query parameters like search, pagination, and limit.
 *
 * @param {Object} params - Optional query parameters: { search, page, limit }
 * @returns {Promise<Object>} - Returns an object containing:
 *   { success, page, limit, total, totalPages, products }
 * @throws {Error} Throws if the fetch fails or response is not ok
 */
export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}?${query}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch products");

  return data; // { success, page, limit, total, totalPages, products }
}

/**
 * Fetch a single product by its ID from the backend.
 *
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Returns a single product object
 * @throws {Error} Throws if the fetch fails or response is not ok
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Failed to fetch product ${id}`);

  return data.product; // Product object
}
