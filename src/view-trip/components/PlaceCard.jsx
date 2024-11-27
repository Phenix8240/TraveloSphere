import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({ place }) => {
    const [photo,setPhoto]=useState()
    useEffect(() => {
      if (place) {
        GetPlacePhoto();
      }
    }, [place]);
  
    const GetPlacePhoto = async () => {
      try {
        const data = {
          textQuery: place?.placeName,
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
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName + ' ' + place.geoCoordinates)}`}>

<div className='border rounded-xl p-3 mt-2 flex gap-4 cursor-pointer hover:scale-105 transition-all'>
            <img
                src={photo} 
                alt={place.placeName || "Place Image"}
                className='w-40 h-40 rounded-xl '
            />

            {/* Place Details */}
            <div>
                <h2 className='font-bold text-lg text-blue-500 '>
                    {place.placeName || "Unknown Place"}
                </h2>
                <p className='text-sm text-gray-400'>{place.placeDetails || "Details not available"}</p>
                <h2 className='text-gray-400'>
                    {place.rating ? `Rating: ${place.rating}` : "Rating not available"}
                </h2>
                <h2 className='text-sm text-gray-400'>
                    {place.ticketPricing ? `Ticket Price: ${place.ticketPricing}` : "Pricing not available"}
                </h2>
                <h2 className='text-sm text-gray-400'>
                    {place.travelTime ? `Travel Time: ${place.travelTime}` : "Travel time not available"}
                </h2>
            </div>
        </div>
        </Link>
    )
}

export default PlaceCard
