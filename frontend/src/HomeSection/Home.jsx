import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Review from '../Reviews/Review'
import vd1 from '../assets/videos/vd1.mp4';
import vd2 from '../assets/videos/vd2.mp4';
import vd3 from '../assets/videos/vd3.mp4';
import vd4 from '../assets/videos/vd4.mp4';
import vd5 from '../assets/videos/vd5.mp4';
import HomeScreen from '../screens/HomeScreen';
import  Footer from '../footerSection/footer';
import ImageGallery from '../imgGal/ImageGalleryComponent';
import Adventure from '../Adeventures/Adventure'
import Hero from '../components/custom/Hero'
const Home = () => {
  const [activeVideo, setActiveVideo] = useState(vd2);

  const videos = [
    { id: 1, src: vd1 },
    { id: 2, src: vd2 },
    { id: 3, src: vd3 },
    { id: 4, src: vd4 },
    { id: 5, src: vd5 },
  ];

  // Set active video on click
  const handleVideoChange = (src) => {
    setActiveVideo(src);
  };

  useEffect(() => {
    // Autoplay the video with new source whenever activeVideo changes
    const videoElement = document.querySelector('#video-slider');
    videoElement.src = activeVideo;
    videoElement.play();
  }, [activeVideo]);

  return (
    <>
    <section className="home min-h-screen flex flex-col items-center justify-center relative z-0" id="home">
      {/* Content */}
      <div className="content text-center z-10">
      <h3 className="gradient-text lg:text-6xl drop-shadow-lg p-4 rounded-lg">
  <TypeAnimation
    sequence={[
      'Adventure is worthwhile',
      2000, // wait 2 seconds
      'Discover the unknown',
      2000, // wait 2 seconds
      'Embark on a new journey',
      2000, // wait 2 seconds
    ]}
    wrapper="span"
    speed={50}
    style={{ display: 'inline-block' }}
    repeat={Infinity}
  />
</h3>

        <p className="text-2xl lg:text-3xl text-white mt-4 mb-6 p-3 rounded-lg *:">
         The right destination for You and Your partner, start your journey
        </p>
        <a href="/homescreen" className="btn bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
          discover more
        </a>
      </div>

      {/* Controls */}
      <div className="controls bg-black p-4 rounded-full flex space-x-4 z-10 mt-10 relative top-24">
        {videos.map((video, index) => (
          <span
            key={video.id}
            className={`vid-btn w-8 h-8 rounded-full cursor-pointer ${activeVideo === video.src ? 'bg-orange-500' : 'bg-white'}`}
            onClick={() => handleVideoChange(video.src)}
          ></span>
        ))}
      </div>

      {/* Video Background */}
      <div className="video-container absolute top-0 left-0 w-full h-full z-0">
        <video id="video-slider" loop autoPlay muted className="w-full h-full object-cover"></video>
      </div>
    </section>
    <Hero/>
    <HomeScreen/>
    <Adventure/>
    <ImageGallery/>
    <Review/>
    <Footer/>
    </>
  );
};

export default Home;
