import React from 'react';
import Banner from '../Component/Banner';
// import './Home.css'; // Import the CSS file for the home page

const BannerPage = () => {
  return (
    <div className="home">
      <Banner/> {/* Include the Banner component */}
      {/* Other homepage content */}
    </div>
  );
};

export default BannerPage;