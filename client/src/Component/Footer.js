// import React from 'react'
// import '../style/footer.css';
// import { Link } from 'react-router-dom';
// import Facebook from '../image/facebook.png'
// import Twitter from '../image/twitter.png'
// import Gmail from '../image/gmail.jpg';
// export default function Footer() {
//   return (
//     <div className='Footer'>
//    <div>
//     <div><Link to='/about'>About</Link></div>
//     <div className='contacts'>
//       Contacts
//       <div className='contacts-container'>
//     <a href="https://www.facebook.com/yourPageName" target="_blank" rel="noopener noreferrer">
//     <img src={Facebook} width='30px'/>
//     </a>
//     <a href="https://www.twitter.com/yourPageName" target="_blank" rel="noopener noreferrer">
//     <img src={Twitter} width='30px'/>
//     </a>
//     <a href="https://www.mail.com/yourPageName" target="_blank" rel="noopener noreferrer">
//     <img src={Gmail} width='20px'/>
//     </a>
//     </div>
//     </div>
//     <div className='copy-right'>© 2024-2024, ATAKY.com</div>
//    </div>
//     </div>
//   )
// }

import React from 'react';
import '../style/footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About ATAKY</h4>
          <Link to='/about'>About Us</Link>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: amarenibret292@gmail.com</p>
          <p>Phone: +251942865826</p>
          <p>Address: Maraki, Gondar, Ethiopia</p>
        </div>

        <div className="footer-section">
          <h4>Developers</h4>
          <ul>
            <li><a href="/developer">view developer</a></li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ATAKY. All rights reserved.</p>
      </div>
    </footer>
    );
}

