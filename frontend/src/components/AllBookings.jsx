import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/booking/all');
        console.log(response.data); // Log to check API response

        // Check if the response structure is correct
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else if (response.data.bookings) {
          setBookings(response.data.bookings); // Adjust based on your actual API response structure
        } else {
          setError('Unexpected response structure.');
        }

      } catch (err) {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-gray-600 text-center">Loading bookings...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">All Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Room Name</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">User ID</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">From Date</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">To Date</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Total Amount</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Total Days</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="text-gray-700 text-sm">
                    <td className="py-3 px-6 border-b">{booking.roomName}</td>
                    <td className="py-3 px-6 border-b">{booking.userid}</td>
                    <td className="py-3 px-6 border-b">{booking.fromDate}</td>
                    <td className="py-3 px-6 border-b">{booking.toDate}</td>
                    <td className="py-3 px-6 border-b text-green-600 font-semibold">₹{booking.totalAmount}</td>
                    <td className="py-3 px-6 border-b">{booking.totalDays} days</td>
                    <td className="py-3 px-6 border-b">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-semibold ${
                          booking.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
