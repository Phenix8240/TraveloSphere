import React from 'react';
import { FiCheckCircle } from 'react-icons/fi'; // Importing a success icon

const Success = ({ message }) => {
  return (
    <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <FiCheckCircle className="mr-2 text-green-700" size={24} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Success