import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'; // Fixed URL

const config = {
    headers: {
        'Content-Type': 'application/json', // Fixed typo here
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id' // FieldMask should be a string
    }
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
