import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingScreen = () => {
  const { id, fromDate, toDate } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/rooms/${id}`);
        setRoom(response.data);
        
        const totalDays = moment(toDate, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') + 1;
        const totalAmount = totalDays * response.data.rentperday;
        setPayment(totalAmount);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError(error.response ? `Server Error: ${error.response.data.message}` : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id, fromDate, toDate]);

  if (loading) return <p><Loader /></p>;
  if (error) return <p>{error}</p>;

  const totalDays = moment(toDate, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') + 1;

  async function bookRoom() {
    if (!room) return;

    const bookingDetails = {
      roomName: room.name,
      roomid: room._id,
      userid: JSON.parse(localStorage.getItem('currentUser')).id,
      fromDate,
      toDate,
      totalAmount: payment,
      totalDays,
      status: "confirmed",  // Ensure status is set to "confirmed" here
    };

    console.log("Booking details before POST:", bookingDetails); // Log booking details to verify

    try {
      const result = await axios.post('/api/booking/create', bookingDetails, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.data && result.data.success) {
        toast.success('Payment successful! Booking confirmed.', {
          position: "top-center",
          autoClose: 2000,
        });
        
        setTimeout(() => navigate('/payment-success'), 2000); // Redirect to success page
      } else {
        toast.error(`Booking failed: ${result.data.message || 'Unknown error'}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error booking room:", error);
      toast.error(`Error: ${error.response?.data.message || error.message}`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <ToastContainer />
      {room ? (
        <div className="bg-white rounded-lg shadow-lg p-5 max-w-md mx-auto">
          <img src={room.imageurls[0]} alt={room.name} className="w-full h-64 object-cover rounded-md mb-5" />
          <h1 className="text-2xl font-bold mb-3">Name: {JSON.parse(localStorage.getItem('currentUser')).username}</h1>
          <h1 className="text-2xl font-bold mb-3">{room.name}</h1>
          <p className="text-gray-700 mb-2">Max Count: {room.maxcount}</p>
          <p className="text-gray-700 mb-2">Phone: {room.phonenumber}</p>
          <p className="text-gray-700 mb-2">Rent per Day: ${room.rentperday}</p>
          <p className="text-gray-700 mb-4">{room.description}</p>
          
          <p className="text-gray-700 mb-4"><strong>From:</strong> {fromDate}</p>
          <p className="text-gray-700 mb-4"><strong>To:</strong> {toDate}</p>

          <p className="text-gray-700 mb-4"><strong>Total Days:</strong> {totalDays}</p>
          <p className="text-gray-700 mb-4"><strong>Total Amount:</strong> ${payment}</p>

          <button onClick={bookRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition ease-in-out duration-200 transform hover:scale-105"
          >
            Pay Now
          </button>

          {payment && <p className="text-green-600 mt-4 text-center">Total Payment: ${payment}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-500">Room details not available.</p>
      )}
    </div>
  );
};

export default BookingScreen;
