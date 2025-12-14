import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addToCartBackend, fetchCartItemsBackend } from "../store/cartSlice";
import { fetchProductById } from "../utils/api";
import formatCurrency from "../utils/formatCurrency";

/**
 * ProductDetail component.
 *
 * Responsibilities:
 * - Fetches product details by ID from backend
 * - Displays product image, price, description, and metadata
 * - Handles adding product to cart with authentication checks
 * - Updates global cart state upon successful addition
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch product details when component mounts or ID changes.
   */
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  /**
   * Handles adding the current product to the cart.
   * Requires user authentication.
   * Updates global cart state and shows toast notifications.
   */
  const handleAddToCart = async () => {
    if (!token) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCartBackend({ productId: product._id, quantity: 1 })
      ).unwrap();

      dispatch(fetchCartItemsBackend());

      toast.success(`${product.name || product.title} added to cart`);
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    }
  };

  // Loading, error, and empty states
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  // Render product details
  return (
    <div className="product-detail">
      <div className="product-image-wrapper">
        <img
          src={
            product.image ||
            product.thumbnail ||
            "https://via.placeholder.com/300"
          }
          alt={product.name || product.title}
        />
      </div>

      <div className="product-info">
        <h2>{product.name || product.title}</h2>
        <p className="price">{formatCurrency(product.price)}</p>
        <p className="description">{product.description}</p>

        <div className="details">
          <span className="stock">
            <strong>Stock:</strong> {product.stock}
          </span>
          <span className="brand">
            <strong>Brand:</strong> {product.brand}
          </span>
          <span className="category">
            <strong>Category:</strong> {product.category}
          </span>
        </div>

        <button className="btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
