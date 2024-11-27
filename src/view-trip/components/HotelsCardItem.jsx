import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HotelsCardItem = ({ hotel }) => {
    const [photo,setPhoto]=useState()
    useEffect(() => {
      if (hotel) {
        GetPlacePhoto();
      }
    }, [hotel]);
  
    const GetPlacePhoto = async () => {
      try {
        const data = {
          textQuery: hotel?.name,
        };
        const result = await GetPlaceDetails(data).then(
          resp=>{
            console.log(resp);
            console.log(resp.data.places[0].photos[5].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            console.log(PhotoUrl);
            setPhoto(PhotoUrl);
          }
          )
        console.log(response);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name + ' ' + hotel?.address)}`}
      target="_blank"
    >
      <div className='hover:scale-105 transition-all cursor-pointer'>
        <img src={photo} alt={hotel.name} className='rounded-xl h-[180px] w-full object-cover' />
        <div className='my-2'>
          <h2 className='font-medium'>{hotel.name}</h2>
          <h2 className='text-xs font-bold text-blue-600'>🗨️ {hotel.description}</h2>
          <h2 className='text-xs text-blue-600'>📍 {hotel.address}</h2>
          <h2 className='text-xs text-blue-600'>💲 {hotel.price}</h2>
          <h2 className='text-xs text-blue-600'>⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelsCardItem;
