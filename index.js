import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import roomRoutes from './routes/roomRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Use the room routes for any routes starting with /api/rooms
app.use("/api/rooms", roomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);

// Set the port your app will listen on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // No need for useNewUrlParser and useUnifiedTopology
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();  // Call connectDB after the server starts
});
