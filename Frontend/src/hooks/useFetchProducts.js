import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Custom React hook to fetch the list of products from the backend API.
 *
 * Responsibilities:
 * - Manages loading, error, and products state
 * - Handles API response normalization
 * - Provides a simple interface for components to consume product data
 *
 * @returns {Object} { products: Array, loading: boolean, error: string | null }
 */
export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        // Safely extract products array from API response
        const productsArray =
          result?.data?.data && Array.isArray(result.data.data)
            ? result.data.data
            : [];

        setProducts(productsArray);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
