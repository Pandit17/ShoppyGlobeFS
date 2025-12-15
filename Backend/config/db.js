import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load variables from .env

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // get the URI from .env
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1); // exit if connection fails
  }
};

export default connectDB;
