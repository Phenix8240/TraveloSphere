// Room.js
import React from 'react';
import { Link } from 'react-router-dom';

const Room = ({ room,fromDate,toDate}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <img src={room.imageurls[0]} alt={room.name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
      <p className="text-gray-600">Max Count: {room.maxcount}</p>
      <p className="text-gray-600">Rent per Day: ${room.rentperday}</p>
      <p className="text-gray-600">{room.description}</p>

      {/* {fromDate && toDate && (
        <div className="mt-3">
          <p><strong>From:</strong> {fromDate.toLocaleDateString()}</p>
          <p><strong>To:</strong> {toDate.toLocaleDateString()}</p>
          <p><strong>Total Days:</strong> {totalDates}</p>
        </div>
      )} */}

     {(fromDate && toDate)&&(<Link to={`/booking/${room._id}/${fromDate}/${toDate}`} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4 block text-center">
        Book Now
      </Link>)}
      
    </div>
  );
};

export default Room;
