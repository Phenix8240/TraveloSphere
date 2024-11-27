import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const MyBookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      fetchBookingDetails(storedUser.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBookingDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/booking/user/${userId}`);
      const data = response.data;
      if (data && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setError('No booking details found.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = (bookingId) => {
    navigate(`/cancel-booking/${bookingId}`);
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">My Booking Details</h2>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <img
                  className="rounded-t-lg w-full h-32 object-cover"
                  src="/path/to/your/image.jpg"
                  alt={booking.roomName}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{booking.roomName}</h5>
                  <p className="text-gray-700 mb-2">
                    <strong>Booking Dates:</strong> From {moment(booking.fromDate, 'DD-MM-YYYY').format('MMMM Do, YYYY')} To {moment(booking.toDate, 'DD-MM-YYYY').format('MMMM Do, YYYY')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Total Amount:</strong> <span className="text-green-600 font-semibold">${booking.totalAmount}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Total Days:</strong> <span className="font-medium">{booking.totalDays}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Booking Status:</strong>
                    <span className={`font-medium ${booking.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {booking.status}
                    </span>
                  </p>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 mt-4"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No bookings found.</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
