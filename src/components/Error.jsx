import React from 'react';
import { FiAlertCircle } from 'react-icons/fi'; // Importing an error icon

const Error = ({ message }) => {
  return (
    <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <FiAlertCircle className="mr-2 text-red-700" size={24} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Error;
