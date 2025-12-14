// In-memory token blacklist (resets on server restart)
const tokenBlacklist = new Set();

// Add token to blacklist
export const addTokenToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

// Check if token is blacklisted
export const isTokenBlacklisted = (token) => tokenBlacklist.has(token);
