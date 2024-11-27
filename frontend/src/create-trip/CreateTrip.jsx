import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { travelOptions, budgetOptions, AI_PROMPT } from '../constants/options';
import toast, { Toaster } from 'react-hot-toast';
import { chatSession } from '../service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [destination, setDestination] = useState('');
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePlaceSelected = (place) => {
    console.log("Place selected:", place); // Logging the selected place object
    if (place?.formatted_address) {
      setDestination(place.formatted_address);
      setFormData(prevState => ({
        ...prevState,
        destination: place.formatted_address
      }));
    } else {
      console.error("Failed to retrieve place's address."); // Error if no address found
      toast.error("Could not retrieve the selected place's address. Please try again.");
    }
  };

  const handleInputChange = (name, value) => {
    console.log(`Input change: ${name} = ${value}`); // Log each input change
    if (name === 'days') {
      const days = parseInt(value);
      if (days <= 0) {
        console.error("Invalid number of days (<=0)"); // Log error for invalid day input
        toast.error("Please enter a valid number of days greater than 0.");
        return;
      } else if (days > 5) {
        console.error("Days exceed maximum allowed (5)"); // Log error for exceeding max days
        toast.error("The trip duration cannot exceed 5 days!");
        return;
      }
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log('Login successful:', response);
      const { access_token } = response;
      if (access_token) {
        await GetuserProfile(access_token);
      }
    },
    onFailure: (error) => console.error('Login failed:', error),
  });

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      console.warn("No user found in localStorage, opening login dialog."); // Warn if no user data
      setOpenDialog(true);
      return;
    }
    if (!formData.destination || !formData.days || !formData.travelOption || !formData.budget) {
      console.warn("Form data incomplete:", formData); // Warn if form fields are missing
      toast.error('Please fill out all fields before generating the trip!');
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.destination)
      .replace('{totalDays}', formData?.days)
      .replace('{traveller}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log("AI response text:", responseText); // Log the AI response
      setLoading(false);
      toast.success('Trip successfully generated! 🏖️');
      SaveTrip(responseText);
    } catch (error) {
      console.error('Error generating the trip:', error); // Error log for trip generation failure
      toast.error('Failed to generate the trip, please try again.');
      setLoading(false);
    }
  };

  const SaveTrip = async (TripData) => {
    console.log("Saving trip with data:", TripData); // Log raw trip data
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    try {
      const parsedTripData = JSON.parse(TripData); // Attempt JSON parsing
      console.log("Parsed TripData:", parsedTripData); // Log parsed data for verification

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId
      });
      toast.success('Trip saved successfully!');
    } catch (error) {
      console.error('Error parsing or saving TripData:', error); // Error for JSON parse or save failure
      toast.error('Error saving trip, please check the response format.');
    } finally {
      setLoading(false);
      navigate('/view-trip/' + docId);
    }
  }

  const GetuserProfile = async (accessToken) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        params: {
          access_token: accessToken
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      });
      console.log('User profile fetched:', response.data); // Log fetched user profile
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      handleGenerateTrip();
    } catch (error) {
      console.error('Error fetching user profile:', error); // Error if profile fetching fails
      toast.error('Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    console.log("Form data updated:", formData); // Log form data updates
  }, [formData]);


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <Toaster />
      <h2 className="font-bold text-3xl text-gray-900 mb-5">🗺️ Discover Your Perfect Trip 🏕️</h2>
      <p className="mt-3 text-gray-700 text-xl">
        ✈️ Whether you're embarking on a solo adventure, planning a romantic getaway, or organizing a fun family vacation, we have something for everyone!
        Explore options that best fit your travel style and budget.
      </p>

      <div className="mt-12">
        <div>
          <h2 className="text-2xl my-4 font-semibold text-gray-900">📍 What’s Your Dream Destination?</h2>
          <div className="relative">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              onPlaceSelected={handlePlaceSelected}
              defaultValue={destination}
              placeholder="Enter your destination..."
              className="bg-white text-gray-900 p-2 rounded-md border border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl my-4 font-semibold text-gray-900">📅 How Many Days Are You Planning?</h2>
          <input
            type="number"
            placeholder="e.g., 3"
            onChange={(e) => handleInputChange('days', e.target.value)}
            className="p-3 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl my-4 font-semibold text-gray-900">🎉 Explore Our Top Travel Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleInputChange('travelOption', option.title)}
                className={`bg-white text-gray-900 p-4 rounded-md border border-gray-300 shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-gray-400 hover:shadow-xl
                ${formData?.travelOption === option.title ? 'shadow-xl border-blue-900 scale-105' : ''}`}
              >
                <div className="text-3xl mb-2 text-blue-500">{option.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                <p className="text-gray-600 mt-2">{option.description}</p>
                <p className="text-gray-500 mt-1">
                  Ideal for: <span className="font-medium text-gray-700">{option.people}</span> people
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl my-4 font-semibold text-gray-900">💰 Choose Your Budget Range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleInputChange('budget', option.budgetRange)}
                className={`p-4 bg-white rounded-md border border-gray-300 shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-gray-400 hover:shadow-xl
                ${formData?.budget === option.budgetRange ? 'shadow-xl border-blue-900 scale-105' : ''}`}
              >
                <div className="text-3xl mb-2 text-green-500">{option.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                <p className="text-gray-600 mt-2">{option.description}</p>
                <p className="text-gray-500 mt-1">{option.range}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={handleGenerateTrip}
            disabled={loading}
            className="p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2 inline-block" />
            ) : (
              "Generate My Trip"
            )}
          </button>
        </div>
      </div>
      Hii User
    </div>
  );
};

export default CreateTrip;
