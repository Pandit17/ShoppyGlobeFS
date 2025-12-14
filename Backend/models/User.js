import mongoose from "mongoose";

// User schema: stores credentials and basic info
const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" }, // Optional display name
    email: { type: String, unique: true, required: true, trim: true }, // Unique login email
    password: {
      type: String,
      required: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, // Strong password regex
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Unique index on email
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
