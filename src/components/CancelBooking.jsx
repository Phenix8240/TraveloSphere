import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CancelBookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirmCancel = async () => {
    try {
      await axios.delete(`/api/booking/delete/${id}`);
      toast.success("Booking cancelled successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate('/home')  // Automatically redirects to home after toast
      });
    } catch (error) {
      toast.error("Failed to delete booking. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Failed to delete booking:", error);
    }
  };

  const handleCancel = () => {
    navigate('/my-bookings');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Cancellation</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your booking? This action cannot be undone.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirmCancel}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingConfirmation;
