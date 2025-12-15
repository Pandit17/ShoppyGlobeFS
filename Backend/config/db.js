import mongoose from "mongoose";

// Connect to MongoDB
const connectDB =REMOVED_SECRET
  try {
    await mongoose.connect(uri); // connect using URI
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1); // exit if connection fails
  }
};

export default connectDB;