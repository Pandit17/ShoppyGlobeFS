import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItemsBackend } from "../store/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { toast } from "react-toastify";

/**
 * Cart component
 *
 * Responsibilities:
 * - Fetches and displays all items in the user's cart
 * - Calculates the total order amount
 * - Provides controls for navigating to checkout or shopping pages
 * - Handles authentication-based redirection
 * - Displays loading, error, or empty-cart states
 */
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.token);
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  /**
   * Effect: fetch cart items on mount if user is logged in
   * If not logged in, redirect to login page with a toast notification
   */
  useEffect(() => {
    if (!token) {
      toast.info("Login required to view cart");
      navigate("/login");
    } else {
      dispatch(fetchCartItemsBackend())
        .unwrap()
        .catch((err) => {
          toast.error(err?.message || "Failed to load cart");
        });
    }
  }, [dispatch, token, navigate]);

  // Ensure cartItems is always an array
  const cartArray = useMemo(
    () => (Array.isArray(cartItems) ? cartItems : []),
    [cartItems]
  );

  // Compute total amount for all items
  const total = useMemo(
    () =>
      cartArray.reduce(
        (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
        0
      ),
    [cartArray]
  );

  // Loading state
  if (loading)
    return (
      <div className="centered-loading">
        <div className="spinner" />
        <p>Loading cart...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="centered-empty error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );

  // Empty cart state
  if (!cartArray.length)
    return (
      <div className="centered-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to see them here.</p>
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );

  return (
    <div className="cart-page">
      {/* List of cart items */}
      <div className="cart-list">
        {cartArray.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      {/* Cart summary with total amount and checkout link */}
      <div className="cart-summary">
        <h3>Summary</h3>
        <p>Total: {formatCurrency(total)}</p>
        <Link to="/checkout" className="btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
