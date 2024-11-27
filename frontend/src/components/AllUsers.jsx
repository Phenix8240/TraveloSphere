import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/users'); // Fetch all users
        console.log(response.data); // Log to check API response

        // Check if the response structure is correct
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Unexpected response structure.');
        }
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-gray-600 text-center">Loading users...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">All Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Username</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Email</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Is Admin</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Created At</th>
                  <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider border-b">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-gray-700 text-sm">
                    <td className="py-3 px-6 border-b">{user.username}</td>
                    <td className="py-3 px-6 border-b">{user.email}</td>
                    <td className="py-3 px-6 border-b">{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-6 border-b">{new Date(user.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-6 border-b">{new Date(user.updatedAt).toLocaleString()}</td>
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

export default AllUsers;
