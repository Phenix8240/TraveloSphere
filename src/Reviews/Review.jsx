// src/components/Review.jsx
import React from 'react';
import Slider from "react-slick";
import { useReviewsData } from './ReviewData'; // Import the hook
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Review = () => {
    const reviewsData = useReviewsData(); // Use the custom hook

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
            <h1 className="text-3xl font-bold text-center mb-6">Client's Review</h1>
            <Slider {...settings}>
                {reviewsData.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105 duration-300 ease-in-out border gap-3 border-gray-300 mx-2">
                        <img src={review.imageurl} alt={review.name} className="w-20 h-20 rounded-full mb-2"/>
                        <div className="flex items-center mt-4">
                            <div className="info">
                                <h3 className="text-lg font-semibold text-green-600">{review.name}</h3>
                                <span className="text-gray-500">{review.package}</span>
                                <div className="flex mt-1">
                                    {[...Array(review.stars)].map((_, i) => (
                                        <span key={i} className="text-yellow-500">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 text-lg italic">"{review.feedback}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="text-center mt-8">
                <Link to="/submit-review" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Submit Your Review
                </Link>
            </div>
        </div>
    );
};

export default Review;
