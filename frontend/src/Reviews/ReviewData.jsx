import { useState, useEffect } from 'react';
import g13 from "../assets/pics/g13.jpg"; // Import the image

export const useReviewsData = () => {
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        fetch('/src/constants/reviewsinfo.json') // Adjust the path if needed
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Map over the data to adjust the imageurl
                const adjustedData = data.map(review => ({
                    ...review,
                    imageurl: g13 // Or set a default image path
                }));
                setReviewsData(adjustedData);
            })
            .catch((error) => {
                console.error("Error fetching reviews data:", error);
            });
    }, []);

    return reviewsData; // Return the reviewsData
};

// For adding a review (if needed)
let nextId = 1; // Initialize nextId

export const addReview = (review) => {
    review.id = nextId++;
    console.log(review); // Log the new review data
}; 