import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors"; // catch async errors

import connectDB from "./config/db.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";
import logoutRouter from "./routes/logout.js"; 
import paymentRouter from "./routes/payment.js"; 
import { errorHandler } from "./middleware/errorHandler.js"; 
import { API_URLS } from "./utils/apiUrls.js"; 

const app = express();

app.use(helmet()); // security headers
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*", 
    credentials: true, 
  })
);
app.use(express.json()); // parse JSON

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shoppyglobe";
connectDB(MONGO_URI); // connect to MongoDB

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/logout", logoutRouter); 
app.use("/api/payment", paymentRouter); 

console.log("Backend API Endpoints (Dev):", API_URLS); // optional debug

app.use(errorHandler); // global error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Shoppy__Globe backend running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
  );
});
