// src/pages/ReviewFormPage.jsx
import React, { useState } from 'react';
import { useReviewsData } from '../Reviews/ReviewData'; // Adjust the import path
import { useNavigate } from 'react-router-dom';

const ReviewFormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [travelerId, setTravelerId] = useState('');
  const [packageName, setPackageName] = useState('');
  const [stars, setStars] = useState(1);
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();
  const { addReview } = useReviewsData(); // Get addReview from the hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      name,
      email,
      travelerId,
      package: packageName,
      stars: parseInt(stars, 10), // Ensure stars is a number
      feedback,
    };

    addReview(newReview); // Add the review to the data

    // Clear the form fields after submission
    setName('');
    setEmail('');
    setTravelerId('');
    setPackageName('');
    setStars(1);
    setFeedback('');

    // Redirect to Review Page after submission
    navigate('/reviews');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border bg-white text-black border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border bg-white text-black  border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Traveler ID"
          value={travelerId}
          onChange={(e) => setTravelerId(e.target.value)}
          required
          className="w-full p-2 border bg-white text-black border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Package Name"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          required
          className="w-full p-2 border bg-white text-black border-gray-300 rounded"
        />
        <select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="w-full p-2 border bg-white text-black border-gray-300 rounded"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          className="w-full p-2 border bg-white text-black border-gray-300 rounded"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewFormPage; // Ensure you export the component
