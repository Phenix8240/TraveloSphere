import express from "express";
import Room from "../models/Room.js"; // Adjust the path as needed

const router = express.Router();

// Route to create a new room
router.post("/create", async (req, res) => {
  const { name, place, maxcount, phonenumber, rentperday, imageurls, bookings, type, description } = req.body;
  
  try {
    const newRoom = new Room({
      name,
      place,
      maxcount,
      phonenumber,
      rentperday,
      imageurls,
      bookings,
      type,
      description
    });

    await newRoom.save();
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room", error });
  }
});

// Route to get all rooms
// Route to get all rooms with filtering by place and type
router.get("/getAll", async (req, res) => {
  const { place, type } = req.query;
  try {
    // Initialize the filter object
    const filter = {};
    
    if (place) filter.place = place; // Filter by place if provided
    if (type) filter.type = type; // Filter by type if provided

    const rooms = await Room.find(filter);
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms", error });
  }
});


// Route to get a room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Failed to fetch room", error });
  }
});

// Route to update a room by ID
router.put("/update/:id", async (req, res) => {
  const { name, place, maxcount, phonenumber, rentperday, imageurls, bookings, type, description } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { name, place, maxcount, phonenumber, rentperday, imageurls, bookings, type, description },
      { new: true } // Return the updated document
    );

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Failed to update room", error });
  }
});

// Route to delete a room by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Failed to delete room", error });
  }
});

export default router;
