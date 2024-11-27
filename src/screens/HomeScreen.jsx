import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room'; // Adjust path as necessary
import { FiSearch } from 'react-icons/fi';
import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Place search term
  const [roomType, setRoomType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fromDate, setfromdate] = useState();
  const [toDate, settodate] = useState();
  const { RangePicker } = DatePicker;
  const [duplicaterooms, setduplicaterooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, [searchTerm, roomType]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms/getAll', {
        params: {
          place: searchTerm, // Pass place as searchTerm
          type: roomType,
        },
      });
      setRooms(response.data);
      setduplicaterooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
    settodate(moment(dates[1]).format('DD-MM-YYYY'));
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Available Hotels</h1>

      <div className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-8 p-4 bg-gradient-to-r from-indigo-400 via-purple-300 to-red-200 rounded-lg shadow-lg transition duration-300 hover:scale-105 max-w-7xl mx-auto gap-3 sm:gap-5 ">

        {/* Date Range Picker */}
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-white font-semibold text-sm mb-1">Date Range:</label>
          <RangePicker
            format="DD-MM-YYYY"
            onChange={filterByDate}
            className="w-full sm:w-48 md:w-56 lg:w-64 border bg-white border-gray-300 rounded-lg p-2 text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Place Search */}
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-white font-semibold text-sm mb-1">Search by Place:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter place..."
            className="w-full sm:w-48 md:w-56 lg:w-64 border bg-white border-gray-300 rounded-lg p-2 text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Room Type Selection */}
        <div className="relative flex flex-col w-full sm:w-auto">
          <label className="text-white font-semibold text-sm mb-1">Room Type:</label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full sm:w-48 md:w-56 lg:w-64 border bg-white border-gray-300 rounded-lg p-2 text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-between"
          >
            {roomType || 'Select Room Type'}
            <span className="ml-2">▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full sm:w-48 md:w-56 lg:w-64 bg-white border rounded-md shadow-lg">
              <div
                onClick={() => { setRoomType('Luxury'); setDropdownOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Luxury
              </div>
              <div
                onClick={() => { setRoomType('Moderate'); setDropdownOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Moderate
              </div>
              <div
                onClick={() => { setRoomType('Budget-Friendly'); setDropdownOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Budget-Friendly
              </div>
              <div
                onClick={() => { setRoomType(''); setDropdownOpen(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                All
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          className="bg-pink-600 text-white rounded-lg px-4 py-2 shadow-lg flex items-center justify-center hover:bg-pink-700 transition duration-200 hover:shadow-2xl w-full sm:w-auto mt-3 sm:mt-0"
          onClick={fetchRooms}
        >
          <FiSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Display Filtered Rooms */}
      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room) => (
            <Room key={room._id} room={room} fromDate={fromDate} toDate={toDate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
