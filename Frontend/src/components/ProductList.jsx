import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";

/**
 * ProductList component.
 *
 * Responsibilities:
 * - Fetches all products using `useFetchProducts` hook
 * - Filters products based on global search query from Redux
 * - Displays loading, error, empty state, and product grid
 * - Optimizes filtering via useMemo for performance
 */
export default function ProductList() {
  const { products, loading, error } = useFetchProducts();
  const searchQuery = useSelector((state) => state.cart.searchQuery || "");

  /**
   * Filters products by search query across title, description, and name fields.
   * useMemo ensures recomputation only when `products` or `searchQuery` change.
   */
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();

    return products.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.name && p.name.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  // Loading state
  if (loading)
    return (
      <div className="centered-loading">
        <div className="spinner" />
        <p>Loading products...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="centered-empty error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );

  // Empty state
  if (!filteredProducts.length)
    return (
      <div className="centered-empty">
        <h2>No products found</h2>
        <p>Try a different search keyword</p>
      </div>
    );

  // Render product grid
  return (
    <section className="container">
      <div className="products-header">
        <h2>Products</h2>
        <small>{filteredProducts.length} results</small>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          paddingBottom: "60px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductItem
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
