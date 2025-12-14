import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

/**
 * Auth component
 *
 * Handles both Login and Registration functionality.
 * - Toggles between login and register modes
 * - Validates input fields before submission
 * - Performs API calls to backend endpoints
 * - Updates Redux store with authentication token and user info
 * - Displays toast notifications for success or error
 */
export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  /**
   * Handles input field changes and updates local state
   */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /**
   * Toggles between login and registration modes
   * Resets form fields when switching mode
   */
  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  /**
   * Handles form submission
   * - Validates required fields
   * - Checks password match for registration
   * - Sends API request to login/register endpoint
   * - Updates Redux store with token and user
   * - Displays toast notifications for success or error
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim() || (isRegister && !form.name.trim())) {
      return toast.error("Please fill all required fields!");
    }
    if (isRegister && form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);

    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (data.token) {
        dispatch(loginSuccess({ token: data.token, user: data.user }));
      }

      toast.success(isRegister ? "Registered successfully!" : "Logged in successfully!");
      navigate("/"); 
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>{isRegister ? "Register" : "Log In"}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>

        {isRegister && (
          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </label>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Processing..." : isRegister ? "Sign In" : "Log In"}
        </button>
      </form>

      <p className="toggle-text">
        {isRegister ? "Already have an account?" : "New here?"}{" "}
        <span onClick={toggleMode} className="toggle-link">
          {isRegister ? "Log In" : "Register"}
        </span>
      </p>
    </div>
  );
}
