import express from "express";
import Payment from "../models/Payment.js";
const router = express.Router();

// Create a new payment record
router.post('/make', async (req, res) => {
  const { bookingId, userId, amount } = req.body;

  try {
    const newPayment = new Payment({
      bookingId,
      userId,
      amount,
      status: 'pending' // Set initial status to pending
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({ success: true, payment: savedPayment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment details by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingId').populate('userId');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.json({ success: true, payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
