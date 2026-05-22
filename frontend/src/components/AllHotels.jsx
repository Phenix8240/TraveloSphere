import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating to the update page

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/api/rooms/getAll'); // Fetch hotels
        console.log(response.data); // Log to check API response

        // Check if the response structure is correct
        if (Array.isArray(response.data)) {
          setHotels(response.data);
        } else {
          setError('Unexpected response structure.');
        }
      } catch (err) {
        setError('Failed to load hotels.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`/api/rooms/delete/${id}`);
        setHotels(hotels.filter((hotel) => hotel._id !== id)); // Remove deleted hotel from the state
        alert("Hotel deleted successfully");
      } catch (error) {
        console.error("Failed to delete hotel:", error);
        alert("Error deleting hotel");
      }
    }
  };

  if (loading) return <p className="text-gray-600 text-center">Loading hotels...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">All Hotels</h2>

        {hotels.length === 0 ? (
          <p className="text-gray-600 text-center">No hotels found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Hotel Name</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Place</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Max Count</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Phone Number</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Rent per Day</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Type</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Description</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel._id} className="text-gray-700 text-sm">
                    <td className="py-3 px-6 border-b">{hotel.name}</td>
                    <td className="py-3 px-6 border-b">{hotel.place}</td>
                    <td className="py-3 px-6 border-b">{hotel.maxcount}</td>
                    <td className="py-3 px-6 border-b">{hotel.phonenumber}</td>
                    <td className="py-3 px-6 border-b text-green-600 font-semibold">₹{hotel.rentperday}</td>
                    <td className="py-3 px-6 border-b">{hotel.type}</td>
                    <td className="py-3 px-6 border-b">{hotel.description}</td>
                    <td className="py-3 px-6 border-b">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 "
                        onClick={() => navigate(`/admin/hotels/update/${hotel._id}`)} // Navigate to the update page
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-4"
                        onClick={() => handleDelete(hotel._id)} // Handle delete action
                      >
                        Delete
                      </button>
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

export default AllHotels;
