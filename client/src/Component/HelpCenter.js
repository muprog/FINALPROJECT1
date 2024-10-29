import React, { useState } from 'react';
import '../style/HelpCenter.css';

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-center">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <div className="faq">
        <div className={`faq-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleToggle(0)}>
          <h3>1. How do I create an account?</h3>
          <p>To create your account, click on the "Sign In" button on the top right corner of the page and select "Create Account." Fill in your details and follow the instructions to set up your account. Wait a minute until a system administrator activate your username to login</p>
        </div>
        <div className={`faq-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleToggle(1)}>
          <h3>2. How do I reset my password?</h3>
          <p>Click on "Forgot Password" on the Sign In page, enter your registered email address, and follow the instructions sent to your email to reset your password.</p>
        </div>
        <div className={`faq-item ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleToggle(2)}>
          <h3>3. How can I track my order?</h3>
          <p>Once your order has been completed, our company starts to ship your product to your address</p>
        </div>
        <div className={`faq-item ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleToggle(3)}>
          <h3>4. What payment methods do you accept?</h3>
          <p>We accept various payment methods including cash method, and online payment </p>
        </div>
        <div className={`faq-item ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleToggle(4)}>
          <h3>5. How do I return an item?</h3>
          <p>To return an item, visit our "Returns and Exchanges" page for detailed instructions on our return policy and how to initiate a return.</p>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;