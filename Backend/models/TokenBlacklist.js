import mongoose from "mongoose";

// TokenBlacklist schema: stores JWTs that are revoked/invalid
const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, // JWT string
  blacklistedAt: { type: Date, default: Date.now }, // Timestamp of blacklisting
});

// Model
const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

// Add a token to blacklist (if not already present)
export async function addTokenToBlacklist(token) {
  try {
    const exists = await TokenBlacklist.findOne({ token });
    if (!exists) await TokenBlacklist.create({ token });
  } catch (error) {
    console.error("Error blacklisting token:", error.message);
  }
}

// Check if a token is blacklisted
export async function isTokenBlacklisted(token) {
  const found = await TokenBlacklist.findOne({ token });
  return !!found;
}

export default TokenBlacklist;
