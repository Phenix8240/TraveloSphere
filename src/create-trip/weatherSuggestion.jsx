import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { chatSession } from '../service/AIModal'; // Assuming chatSession is used to interact with Gemini AI
import toast from 'react-hot-toast';

const WeatherSuggestion = () => {
  const [locationData, setLocationData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [travelSuggestions, setTravelSuggestions] = useState('');

  // Fetch location (using the Geolocation API)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
          const data = await response.json();

          if (data.results.length > 0) {
            const { city, state, country } = data.results[0].components;
            setLocationData({
              city: city || 'Unknown',
              state: state || 'Unknown',
              country: country || 'Unknown',
            });

            fetchWeatherData(latitude, longitude); // Call weather API after location is determined
          } else {
            toast.error('Failed to retrieve location data.');
          }
        } catch (error) {
          toast.error('Failed to retrieve location data.');
        }
      }, (error) => {
        toast.error('Failed to retrieve your location.');
      });
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  // Fetch weather data based on the location
  const fetchWeatherData = async (lat, lon) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your weather API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        weather: data.weather[0].description,
      });
    } catch (error) {
      toast.error('Failed to retrieve weather data.');
    }
  };

  // Generate travel suggestions based on weather and location
  const handleGenerateSuggestion = async () => {
    if (!locationData.city || !weatherData.weather) {
      toast.error('Location and weather data are required to generate suggestions.');
      return;
    }

    setLoading(true);

    const prompt = `Generate a travel plan suggestion that starts by determining the current weather conditions in the user's ${locationData.city}, ${locationData.state}, or ${locationData.country}. Based on the season and weather, provide personalized tour package suggestions for 4 days for couples with a normal budget.
    Try to generate 5-6 tour packages of 3 or 4 days.
    The following are examples of places based on the season
    
    Winter (November to February)
    Manali, Himachal Pradesh: Perfect for snow activities like skiing and snowboarding, with stunning views of snow-clad mountains.
    Gulmarg, Jammu & Kashmir: Known for its winter sports, including skiing and snowshoeing.
    Auli, Uttarakhand: A skiing paradise offering breathtaking views of the Himalayan peaks.
    Jaisalmer, Rajasthan: Experience camel safaris and cultural events in pleasant winter temperatures.
    Rann of Kutch, Gujarat: Explore the magical white salt desert during the Rann Utsav.
    
    Summer (March to June)
    Ladakh, Jammu & Kashmir: Ideal for adventure enthusiasts with its rugged landscapes and high-altitude passes.
    Shimla, Himachal Pradesh: A classic hill station with pleasant weather and colonial charm.
    Ooty, Tamil Nadu: Cool retreat famous for tea gardens and botanical landscapes.
    Munnar, Kerala: Sprawling tea plantations and mist-covered mountains for a cool summer escape.
    Darjeeling, West Bengal: Renowned for its tea estates and stunning views of Kanchenjunga.
    
    Monsoon (July to September)
    Munnar, Kerala: Lush greenery, flowing waterfalls, and misty landscapes during monsoon.
    Coorg, Karnataka: Coffee plantations and waterfalls in full glory during the rains.
    Valley of Flowers, Uttarakhand: A colorful carpet of blooming flowers perfect for nature lovers.
    Mahabaleshwar, Maharashtra: Romantic charm during the rains with strawberry farms and cool weather.
    Goa: Fewer crowds and lush landscapes, perfect for scenic monsoon exploration.
    
    Autumn (October to November)
    Rajasthan (Jaipur, Udaipur, Jodhpur): Ideal time to explore palaces, forts, and cultural festivals.
    Agra, Uttar Pradesh: Perfect weather to visit the Taj Mahal and other Mughal sites.
    Hampi, Karnataka: Explore historical ruins in the cooler post-monsoon climate.
    Sundarbans, West Bengal: Best time to explore the mangrove forests and spot the Royal Bengal Tiger.
    Andaman and Nicobar Islands: Perfect for beach activities and scuba diving after the monsoon.
    
    Spring (March to April)
    Kashmir (Srinagar, Pahalgam, Gulmarg): Blooming tulip gardens and houseboat stays make Kashmir picturesque.
    Rishikesh, Uttarakhand: Ideal for river rafting and exploring temples and yoga retreats.
    Khajuraho, Madhya Pradesh: The weather is perfect for exploring intricate temple carvings.
    Wayanad, Kerala: A tranquil retreat with wildlife sanctuaries and spice plantations.
    
    
    For each suggestion, include:
    Hotel Options: Hotel name, address, image URL, geo coordinates, rating, and description.
    Itinerary Details: Place name, details, image URL, local events (with geo coordinates, ticket pricing, rating), and travel time between locations. Provide a detailed daily plan for 4 days, including the best times to visit each place.
    Output the information in JSON format.`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result?.response?.text();
      setTravelSuggestions(responseText);
      console.log(responseText);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to generate travel suggestions.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🌦️ Weather-Based Travel Suggestions</h2>

      {loading ? (
        <p className="text-lg">Generating travel suggestions...</p>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-lg font-medium">Your current location:</p>
            <p className="text-gray-700">City: {locationData.city || 'Fetching...'}</p>
            <p className="text-gray-700">State: {locationData.state || 'Fetching...'}</p>
            <p className="text-gray-700">Country: {locationData.country || 'Fetching...'}</p>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">Current Weather:</p>
            <p className="text-gray-700">Weather: {weatherData.weather || 'Fetching...'}</p>
            <p className="text-gray-700">Temperature: {weatherData.temperature || 'Fetching...'}°C</p>
          </div>

          <Button onClick={handleGenerateSuggestion} className="bg-blue-500 text-white hover:bg-blue-600 mt-4">
            Generate Travel Suggestions
          </Button>

          {travelSuggestions && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Recommended Travel Packages:</h3>
              <pre className="bg-gray-100 p-4 rounded-md text-gray-800 overflow-x-auto">
                {JSON.stringify(travelSuggestions, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherSuggestion;
