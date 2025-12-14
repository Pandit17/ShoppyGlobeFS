import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartQuantityBackend,
  removeFromCartBackend,
} from "../store/cartSlice";
import { toast } from "react-toastify";
import formatCurrency from "../utils/formatCurrency";

/**
 * CartItem component
 *
 * Responsibilities:
 * - Displays a single cart item with thumbnail, title, price, and quantity
 * - Allows user to increment, decrement, or remove the item
 * - Updates cart state in Redux and backend asynchronously
 * - Shows toast notifications for success or error actions
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);

  const { product, quantity, _id } = item;

  /**
   * Remove the item from cart
   */
  const handleRemove = async () => {
    if (!token) return toast.error("Login required");
    try {
      await dispatch(removeFromCartBackend(_id)).unwrap();
      toast.info(`${product.name || product.title} removed from cart`);
    } catch (err) {
      toast.error(err || "Failed to remove item");
    }
  };

  /**
   * Increment item quantity by 1
   */
  const handleIncrement = async () => {
    if (!token) return toast.error("Login required");
    try {
      await dispatch(
        updateCartQuantityBackend({ id: _id, qty: quantity + 1 })
      ).unwrap();
      toast.success(
        `Increased quantity of ${product.name || product.title} to ${quantity + 1}`
      );
    } catch (err) {
      toast.error(err || "Failed to update quantity");
    }
  };

  /**
   * Decrement item quantity by 1
   * If quantity is 1, remove the item instead
   */
  const handleDecrement = async () => {
    if (!token) return toast.error("Login required");
    if (quantity === 1) {
      handleRemove();
      return;
    }
    try {
      await dispatch(
        updateCartQuantityBackend({ id: _id, qty: quantity - 1 })
      ).unwrap();
      toast.warn(
        `Decreased quantity of ${product.name || product.title} to ${quantity - 1}`
      );
    } catch (err) {
      toast.error(err || "Failed to update quantity");
    }
  };

  return (
    <div className="cart-item">
      <img
        src={product.thumbnail || product.image || ""}
        alt={product.name || product.title}
        loading="lazy"
      />

      <div className="meta">
        <h4>{product.name || product.title}</h4>
        <p>{formatCurrency(product.price)}</p>
      </div>

      <div className="controls">
        <button onClick={handleDecrement}>−</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
