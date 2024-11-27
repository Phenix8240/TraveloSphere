import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#368cbe]">Discover Your Next Adventure with AI:</span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">Lorem ipsum dolor sit amet consectetur adipisicing.</p>

      {/* Get Started Button */}
      <Link to="/create-trip">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Get Started
        </button>
      </Link>

      {/* Get Weather Based Suggestion Button */}
      <Link to="/weather-trip">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Get Weather Based Suggestion
        </button>
      </Link>
    </div>
  );
};

export default Hero;
