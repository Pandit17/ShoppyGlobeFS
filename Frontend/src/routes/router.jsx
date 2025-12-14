import React, { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";

import App from "../App";
import NotFound from "../components/NotFound";
import LoadingFallback from "../components/LoadingFallback";

/**
 * Lazy-loaded pages for route-based code splitting.
 * Suspense fallback ensures smooth loading UI.
 */
const ProductList = lazy(() => import("../components/ProductList"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const Cart = lazy(() => import("../components/Cart"));
const Checkout = lazy(() => import("../components/Checkout"));
const Auth = lazy(() => import("../components/Auth"));

/**
 * Application router configuration using hash-based routing.
 *
 * Responsibilities:
 * - Defines parent-child route hierarchy
 * - Handles 404 / unmatched routes via errorElement
 * - Integrates Suspense fallback for lazy-loaded components
 */
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Auth />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
