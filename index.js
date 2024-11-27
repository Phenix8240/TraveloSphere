import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS

import roomRoutes from './routes/roomRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(cors()); // This will allow all domains by default. You can restrict it to specific domains if needed.

app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, World! Backend is working!');
});

// API Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);

// Set the port your app will listen on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
