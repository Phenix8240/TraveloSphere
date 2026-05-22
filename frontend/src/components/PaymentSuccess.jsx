import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon Replacement */}
        <div className="flex justify-center items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7 12a5 5 0 0110 0c0 5-5 10-5 10S7 17 7 12z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your booking has been confirmed, and a confirmation email has been sent to your inbox.
        </p>

        {/* Booking ID Section */}
        <div className="flex justify-center items-center space-x-2 text-gray-500 mb-8">
          <p className="text-sm">Booking ID:</p>
          <p className="text-sm font-semibold text-gray-800">12345ABC</p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
