import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true
    },
    roomid: {
      type: String,
      required: true
    },
    userid: {
      type: String,
      required: true
    },
    fromDate: {
      type: String,
      required: true
    },
    toDate: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    totalDays: {
      type: Number,
      required: true
    },
    // transactionId: {
    //   type: String,
    //   required: false
    // },
    status: {
      type: String,
      
    }
  },
  {
    timestamps: true,
    collection: 'hotelBooking' // Set default collection name
  }
);

export default mongoose.model("Booking", bookingSchema);
