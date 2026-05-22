import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login'); // Redirect to login if user not found
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
        
        <div className="text-gray-700">
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
          <p className="mb-2"><strong>Member Since:</strong> {moment(user.createdAt).format('MMMM Do, YYYY')}</p>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
