import mongoose from "mongoose";

// Create a Room schema
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  maxcount: {
    type: Number,
    required: true 
  },
  phonenumber: {
    type: Number,
    required: true
  },
  rentperday: {
    type: Number,
    required: true
  },
  imageurls: {
    type: [String],
    required: true
  },
  bookings: {
    type: [mongoose.Schema.Types.Mixed], // Adjust based on what bookings structure looks like
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  collection: "hotelRooms" // Custom collection name
});

// Create a model based on the schema
const Room = mongoose.model("Room", roomSchema);

export default Room;
