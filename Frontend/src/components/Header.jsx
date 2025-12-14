import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCartItemsBackend } from "../store/cartSlice";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";

/**
 * Header component.
 *
 * Responsibilities:
 * - Displays site branding and navigation links
 * - Shows search input (read-only here, managed globally)
 * - Displays cart item count
 * - Handles responsive mobile menu toggle
 * - Provides authentication actions (login/logout)
 */
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const cartArray = Array.isArray(cartItems) ? cartItems : [];
  const totalCount = cartArray.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const searchQuery = useSelector((state) => state.cart.searchQuery || "");
  const token = useSelector((state) => state.auth?.token);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  /**
   * Fetch cart items when authenticated
   * Update isMobile state on window resize
   */
  useEffect(() => {
    if (token) {
      dispatch(fetchCartItemsBackend());
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, token]);

  /**
   * Logout handler
   * Clears authentication state and navigates home
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully!");
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      <div className="brand" onClick={() => navigate("/")}>
        <Link to="/" className="brand-link" aria-label="ShoppyGlobe home">
          Shoppy<span className="glow">Globe</span>
        </Link>
      </div>

      {isMobile && (
        <button
          className="mobile-menu-button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      <div className="header-right">
        <div className="search">
          <input
            value={searchQuery}
            placeholder="Search products..."
            aria-label="Search products"
            readOnly
          />
        </div>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({totalCount})
          </Link>
          <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>

          {!token ? (
            <Link
              to="/login"
              className="auth-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="btn-logout"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
