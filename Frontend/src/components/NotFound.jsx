import React from "react";
import { useLocation, Link } from "react-router-dom";

/**
 * NotFound component: displays a stylish 404 page
 * - Shows the invalid path
 * - Provides a link to return home
 */
export default function NotFound() {
  const loc = useLocation(); // Hook to get the current URL/path

  return (
    <div className="error-page">
      {/* Main heading with glow animation to highlight 404 */}
      <h1>404</h1>

      {/* Description showing the invalid path */}
      <p>
        The requested path <code>{loc.pathname}</code> could not be found on this site.
      </p>

      {/* Button to navigate back home, styled consistently with primary buttons */}
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
