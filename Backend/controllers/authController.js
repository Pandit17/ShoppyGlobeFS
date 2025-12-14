import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT for user
const generateToken = (user) => {
  const payload = { id: user._id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register new user
export const register = async ({ name = "", email, password }) => {
  if (!email || !password)
    throw { status: 400, message: "Email and password required" };

  const exists = await User.findOne({ email });
  if (exists) throw { status: 409, message: "Email already used" };

  const hash = await bcrypt.hash(password, 10); // hash password
  const user = await User.create({ name, email, password: hash });

  return {
    success: true,
    message: "User registered successfully",
    data: { id: user._id, name: user.name, email: user.email },
  };
};

// Login user and return JWT
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: "Invalid credentials" };

  return {
    success: true,
    message: "Login Successful",
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email },
  };
};
