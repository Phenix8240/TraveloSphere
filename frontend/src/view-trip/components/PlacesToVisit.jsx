import React from 'react'
import PlaceCard from './PlaceCard'
import Footer from './Footer'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>

      <div>
        {trip.tripData?.itinerary.map((item,index)=>(
            <div key={index}>
                <h2 className='font-medium text-lg'>{item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((place,index)=>(
                        
                        <div key={index}>
                            <h2 className='font-bold text-red-700'>{place.time}</h2>
                            <PlaceCard place={place}/>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export default PlacesToVisit
