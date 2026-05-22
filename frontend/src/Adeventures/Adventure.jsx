// src/components/Adventure.jsx
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import adventureData from './AdventureInfo'; // Directly import adventure data
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import './Adventure.css'; // Create a CSS file for additional styles

const Adventure = () => {
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopIndex, setLoopIndex] = useState(0);
    const [speed, setSpeed] = useState(150); // Speed of typing/deleting
    const quote = "“Life is either a daring adventure or nothing at all.” – Helen Keller";

    useEffect(() => {
        const handleType = () => {
            const fullText = quote;

            if (!isDeleting && loopIndex < fullText.length) {
                // Typing forward
                setTypedText(fullText.substring(0, loopIndex + 1));
                setLoopIndex(loopIndex + 1);
            } else if (isDeleting && loopIndex > 0) {
                // Deleting
                setTypedText(fullText.substring(0, loopIndex - 1));
                setLoopIndex(loopIndex - 1);
            } else if (loopIndex === fullText.length && !isDeleting) {
                // Pause before deleting
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (loopIndex === 0 && isDeleting) {
                // Pause before starting over
                setIsDeleting(false);
            }
        };

        const typingInterval = setTimeout(handleType, speed);

        return () => clearTimeout(typingInterval);
    }, [loopIndex, isDeleting]);

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
        <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 overflow-hidden">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Adventure Awaits</h1>
            
            {/* Typewriter Effect Quote */}
            <div className='flex justify-center items-center'>
                <h2 className="text-2xl types font-bold text-center text-blue-600 mb-2 typewriter">
                    {typedText}
                </h2>
            </div>
            {/* Informational Message */}
            <p className="text-lg text-center text-gray-700 mb-4">
                All of our adventures include expert guides, safety gear, and unforgettable experiences tailored just for you! Dive into the thrill, knowing every detail is taken care of in your adventure package.
            </p>

            <Slider {...settings}>
                {adventureData.map((adventure) => (
                    <div key={adventure.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105 duration-300 ease-in-out border gap-3 border-gray-300 mx-2">
                        <img src={adventure.imagePath} alt={adventure.name} className="w-full h-40 object-cover rounded-t-lg mb-2"/>
                        <h3 className="text-lg font-semibold text-green-600">{adventure.name}</h3>
                        <span className="text-gray-500">{adventure.location}</span>
                        <div className="flex mt-1">
                            {[...Array(adventure.difficulty === "Easy" ? 1 : adventure.difficulty === "Medium" ? 2 : 3)].map((_, i) => (
                                <span key={i} className="text-yellow-500">⭐</span>
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4 text-lg italic">"{adventure.description}"</p>
                        <p className="text-lg font-bold text-gray-800">Price: ₹{adventure.price}</p>
                    </div>
                ))}
            </Slider>
            <div className="text-center mt-8">
                <Link to="/explore-adventures" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 shadow-md transition duration-300 ease-in-out transform hover:scale-110">
                    Explore More Adventures
                </Link>
            </div>
        </div>
    );
};

export default Adventure;
