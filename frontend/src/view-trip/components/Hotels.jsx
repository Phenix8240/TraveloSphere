import React from 'react';
import HotelsCardItem from './HotelsCardItem';

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>🏨 Hotel Information</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-4'>
        {trip?.tripData?.hotels.map((hotel, index) => (
          <HotelsCardItem 
            key={index}  // Adding key here
            hotel={hotel} 
          />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
