// src/components/UnifiedImageGallery.js

import React, { useState } from 'react';
import { ColumnsPhotoAlbum } from 'react-photo-album';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-photo-album/columns.css"; // Import CSS for column layout
import g1 from '../assets/pics/g1.jpg';
import g2 from '../assets/pics/g2.jpg';
import g3 from '../assets/pics/g3.jpeg';
import g4 from '../assets/pics/g4.webp';
import g5 from '../assets/pics/g5.jpg';
import g6 from '../assets/pics/g6.jpg';
import g7 from '../assets/pics/g7.webp';
import g8 from '../assets/pics/g8.webp';
import g9 from '../assets/pics/g9.webp';
import g10 from '../assets/pics/g10.webp';
import g11 from '../assets/pics/g11.webp';
import g12 from '../assets/pics/g12.jpg';
import g13 from '../assets/pics/g13.jpg';

// Add styles for shadow effect
const columnImageStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
  borderRadius: '8px', // Optional: rounded corners
  transition: 'transform 0.3s ease', // Smooth hover effect
};

const ImageGalleryComponent = () => {
  const [openGallery, setOpenGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { src: g1, width: 600, height: 400, title: "Person wearing shoes", description: "Gift Habeshaw" },
    { src: g2, width: 600, height: 400, title: "Blonde woman wearing sunglasses", description: "Dmitriy Frantsev" },
    { src: g3, width: 600, height: 400, title: "Beautiful landscape", description: "Verne Ho" },
    { src: g4, width: 600, height: 400, title: "Jaipur, Rajasthan India", description: "Liam Baldock" },
    { src: g5, width: 600, height: 400, title: "Rann of Kutch, India", description: "Hari Nandakumar" },
    { src: g6, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g7, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g8, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g9, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g10, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g11, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g12, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
    { src: g13, width: 600, height: 400, title: "Nature photography", description: "Harry Cunningham" },
  ];

  const galleryItems = photos.map(photo => ({
    original: photo.src,
    thumbnail: photo.src,
    description: photo.description,
  }));

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpenGallery(true);
  };

  return (
    <div>
        <h1 className='mt-8 text-3xl font-bold text-blue-600 '>Photo Gallery</h1>
      {!openGallery ? (
        <div style={{ padding: '20px' }}>
          
          <ColumnsPhotoAlbum
            photos={photos}
            onClick={({ index }) => handleImageClick(index)}
            styles={{ img: columnImageStyle }} // Apply shadow effect
          />
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'black' }}>
          <ImageGallery
            items={galleryItems}
            startIndex={currentIndex}
            showFullscreenButton={true}
            showPlayButton={true}
            showThumbnails={true}
            showBullets={true}
            showNav={true}
            showIndex={true}
            rtl={false} // Set to true for right-to-left sliding
            slideOnThumbnailHover={true}
            useWindowKeyDown={true}
            slideInterval={2000}
            slideDuration={450}
            thumbnailPosition="bottom"
            onClose={() => setOpenGallery(false)}
            additionalClass="full-page-gallery"
          />
          <button
            onClick={() => setOpenGallery(false)}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            &#8592; Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryComponent;
