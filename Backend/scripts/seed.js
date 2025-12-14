// ================================
// Seed Script: Populate DB with sample products & demo user
// ================================

import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import CartItem from "../models/CartItem.js";
import { sampleProducts, testUser } from "../utils/seedData.js";

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Connect to MongoDB

    // Clear old data
    await Product.deleteMany({});
    await CartItem.deleteMany({});
    await User.deleteMany({});

    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Create demo user
    const hash = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({ ...testUser, password: hash });
    console.log(`✅ Demo user created: ${user.email}`);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

run();
