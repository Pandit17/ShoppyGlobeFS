import React from "react";

/**
 * LoadingFallback component.
 *
 * Responsibilities:
 * - Displays a centered spinner with a loading message
 * - Can be used as a fallback for Suspense or other async operations
 */
export default function LoadingFallback() {
  return (
    <div className="centered-loading">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}
