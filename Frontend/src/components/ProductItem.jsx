import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartBackend } from "../store/cartSlice";
import { toast } from "react-toastify";
import formatCurrency from "../utils/formatCurrency";

/**
 * ProductItem component.
 *
 * Responsibilities:
 * - Displays individual product details including image, name/title, and price
 * - Handles user interactions for "Add to Cart" and navigation to product details
 * - Integrates authentication check for cart actions
 *
 * @param {Object} product - Product data object
 */
export default function ProductItem({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);

  /**
   * Handles adding the product to the cart.
   * Requires user to be authenticated.
   * Shows success or error toast notifications based on API response.
   */
  const handleAddToCart = async () => {
    if (!token) {
      toast.info("You must login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCartBackend({ productId: product._id || product.id, quantity: 1 })
      ).unwrap();

      toast.success(`${product.name || product.title} added to cart`);
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image || product.thumbnail}
        alt={product.name || product.title}
        loading="lazy"
      />
      <h3>{product.name || product.title}</h3>
      <p className="price">{formatCurrency(product.price)}</p>

      <div className="actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button
          className="detail-link"
          onClick={() =>
            navigate(`/product/${product._id || product.id}`)
          }
        >
          Details
        </button>
      </div>
    </div>
  );
}
