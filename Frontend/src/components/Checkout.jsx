import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import formatCurrency from "../utils/formatCurrency";

/**
 * Checkout component.
 *
 * Responsibilities:
 * - Displays checkout form and order summary
 * - Integrates PayPal payment flow
 * - Validates shipping and contact information before payment
 * - Handles successful or failed payments and updates cart state
 */
export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.cartItems || []);
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.product?.price || 0) * it.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const paypalRef = useRef(null);
  const paypalButtonsRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /**
   * Setup PayPal Buttons when items exist.
   * Handles order creation, approval, and errors.
   */
  useEffect(() => {
    if (!items.length) return;

    if (window.paypal && paypalRef.current) {
      const container = paypalRef.current;
      container.innerHTML = "";

      paypalButtonsRef.current = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        },
        fundingSource: window.paypal.FUNDING.PAYPAL,

        createOrder: (data, actions) => {
          const { name, email, street, city, state, postalCode } = form;
          if (!name || !email || !street || !city || !state || !postalCode) {
            toast.error("Please fill all required details!");
            return;
          }

          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalAmount.toFixed(2), currency_code: "USD" },
                shipping: {
                  name: { full_name: name },
                  address: {
                    address_line_1: street,
                    admin_area_2: city,
                    admin_area_1: state,
                    postal_code: postalCode,
                    country_code: "US",
                  },
                },
              },
            ],
          });
        },

        onApprove: async (data, actions) => {
          try {
            await actions.order.capture();
            const token = localStorage.getItem("token");

            const res = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/payment/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderID: data.orderID, payerID: data.payerID }),
              }
            );

            const result = await res.json();

            if (res.ok) {
              toast.success("Payment successful! Order placed.");
              dispatch(clearCart());
              navigate("/", { replace: true });
            } else {
              toast.error(result.message || "Payment failed on server");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment could not be processed");
          }
        },

        onError: (err) => {
          console.error(err);
          toast.error("Payment could not be processed");
        },
      });

      paypalButtonsRef.current.render(container);

      return () => {
        if (paypalButtonsRef.current) {
          try {
            paypalButtonsRef.current.close();
          } catch (err) {
            console.error("Failed to close PayPal Buttons:", err);
          }
          paypalButtonsRef.current = null;
        }
      };
    }
  }, [items, totalAmount, form, dispatch, navigate]);

  if (!items.length)
    return (
      <div className="centered-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn-primary">
          Go Shopping
        </Link>
      </div>
    );

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form">
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Street
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="123 Main St"
            />
          </label>
          <label>
            City
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />
          </label>
          <label>
            State
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
            />
          </label>
          <label>
            Postal Code
            <input
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="12345"
            />
          </label>
        </form>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((it) => (
              <li key={it._id}>
                {it.product?.title || "Unknown Product"} × {it.quantity} —{" "}
                {formatCurrency((it.product?.price || 0) * it.quantity)}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: {formatCurrency(totalAmount)}</strong>
          </p>
          <div ref={paypalRef}></div>
        </aside>
      </div>
    </div>
  );
}
