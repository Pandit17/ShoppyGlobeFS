// Centralized error middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err); // Log for debugging

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error", // Error message to client
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Dev-only stack trace
  });
};
