import express from "express";
import Booking from "../models/Booking.js"; // Ensure this path is correct
import Room from "../models/Room.js"; // Import Room model

const router = express.Router();

// CREATE a new booking
router.post('/create', async (req, res) => {
  const { roomid, fromDate, toDate, userid, totalAmount, totalDays, roomName } = req.body;

  try {
    // Create and save the booking
    const booking = new Booking({
      roomName,
      roomid,
      userid,
      fromDate,
      toDate,
      totalAmount,
      status:"confrimed",
      totalDays,
    });

    await booking.save();

    // Update the room's bookings array
    const updatedRoom = await Room.findByIdAndUpdate(
      roomid,
      {
        $push: {
          bookings: {
            bookingid: booking._id,
            fromDate,
            toDate,
            userid,
            status: booking.status, // Assuming you want to set the booking status here
          },
        },
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Room not found to update bookings',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      booking,
      updatedRoom,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ 
      success: false,
      message: 'Error creating booking', 
      error: error.message 
    });
  }
});

// GET all bookings
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
});

// GET booking by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve booking",
      error: error.message,
    });
  }
});

// UPDATE booking by ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { fromDate, toDate, totalAmount, totalDays } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { fromDate, toDate, totalAmount, totalDays },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message,
    });
  }
});

// DELETE booking by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Remove booking reference from the room
    await Room.findByIdAndUpdate(
      booking.roomid,
      {
        $pull: { bookings: { bookingid: booking._id } },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message,
    });
  }
});

export default router;

// GET bookings by userid
router.get('/user/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    // Find bookings for the specified user ID
    const bookings = await Booking.find({ userid });
    
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No bookings found for this user',
      });
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings for the user',
      error: error.message,
    });
  }
});
