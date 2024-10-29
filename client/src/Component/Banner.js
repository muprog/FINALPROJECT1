// import React, { useState, useEffect } from 'react';
// import '../style/banner.css';
// import image1 from '../image/slider1.jpg';
// import image2 from '../image/slider2.jpg';
// import image3 from '../image/slider3.jpg';
// import image4 from '../image/slider4.jpg';
// const images = [image1, image2, image3, image4];

// const ImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };
//   return (
//     <div className="slider-container">
//       <div className="slider">
//         {images.map((image, index) => (
//           <div
//             className={`slide ${index === currentIndex ? 'active' : ''}`}
//             key={index}
//           >
//             <img src={image} alt={`Slide ${index + 1}`} />
//           </div>
//         ))}
//       </div>
//       <button className="prev-button" onClick={prevSlide}>
//         &#10094;
//       </button>
//       <button className="next-button" onClick={nextSlide}>
//         &#10095;
//       </button>
//     </div>

//   )
// }

// export default ImageSlider; 

import React, { useState, useEffect } from 'react';
import '../style/banner.css';
import image1 from '../image/slider1.jpg';
import image2 from '../image/slider2.jpg';
import image3 from '../image/slider3.jpg';
import image4 from '../image/slider4.jpg';
const images = [image1, image2, image3, image4];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            key={index}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        {/* Add moving text here */}
        <div className="moving-text">
          Welcome to ATAKY
        </div>
      </div>
      <button className="prev-button" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next-button" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
