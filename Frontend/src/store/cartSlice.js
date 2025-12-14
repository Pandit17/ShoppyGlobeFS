import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Retrieves the authenticated user's cart items from the backend.
 */
export const fetchCartItemsBackend = createAsyncThunk(
  "cart/fetchCartItemsBackend",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth?.token;

    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.cart?.items || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

/**
 * Adds a product to the authenticated user's cart.
 */
export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    const token = getState().auth?.token;

    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "Item added to cart");
      return response.data.cart?.items || [];
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add item to cart";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Updates the quantity of an existing cart item.
 */
export const updateCartQuantityBackend = createAsyncThunk(
  "cart/updateCartQuantityBackend",
  async ({ id, qty }, { getState, rejectWithValue }) => {
    const token = getState().auth?.token;

    try {
      const response = await axios.put(
        `${API_URL}/cart/${id}`,
        { quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.info(response.data.message || "Cart updated");
      return response.data.cart?.items || [];
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update cart";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Removes an item from the authenticated user's cart.
 */
export const removeFromCartBackend = createAsyncThunk(
  "cart/removeFromCartBackend",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth?.token;

    try {
      const response = await axios.delete(`${API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.warn(response.data.message || "Item removed from cart");
      return response.data.cart?.items || [];
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to remove item";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Cart state slice.
 *
 * Manages cart items, loading states, and backend synchronization
 * for authenticated users.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    /**
     * Clears all cart items from local state.
     * Typically invoked on logout or order completion.
     */
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItemsBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCartBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartQuantityBackend.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(removeFromCartBackend.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
