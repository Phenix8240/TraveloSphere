import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

const InfoSection = ({ trip }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.destination,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
        console.log(resp);
        console.log(resp.data.places[0].photos[2].name);
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        console.log(PhotoUrl);
        setPhoto(PhotoUrl);
      });
      console.log(result);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div>
      {/* <video 
        src='/bgvideo.mp4' 
        className='h-[400px] w-full object-cover rounded-xl' 
        autoPlay 
        muted 
        loop 
      /> */}
      <img src={photo} alt="Destination" className='h-[340] w-full object-cover rounded-xl' />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-3xl'>
            {trip?.userSelection?.destination || 'Destination not available'}
          </h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📆Day: {trip?.userSelection?.days || 'Not specified'}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰Budget: {trip?.userSelection?.budget || 'Not specified'}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              😎Traveller: {trip?.userSelection?.travelOption || 'Not specified'}
            </h2>
          </div>
        </div>
        <button className='p-3 w-full md:w-1/4 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out'>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
