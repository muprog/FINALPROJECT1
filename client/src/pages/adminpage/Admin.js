import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../Component/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/adminpage.css';
import customer from '../../image/customer.jpg';
import createAdder from '../../image/create-adder.jpg';
import feedback from '../../image/feedback.png';

import category from '../../image/category-icon-png-2.jpg'
import update from '../../image/update.jpeg'
const Admin = () => {
  const { user, setStatus } = useContext(userContext);
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);

  // Handle user status update
  const handleStatus = (id) => {
    axios.post(`/update-status`, { id })
      .then(res => setStatus(res.data))
      .catch(err => console.log(err));
  };

  // Fetch users and check user profile on component mount
  useEffect(() => {
    axios.get('/user')
      .then(res => setAllUser(res.data))
      .catch(err => console.log(err));

    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate, setStatus]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      {user && (
        <h2 className="admin-welcome">
          Welcome, {user.email} <span className="emoji-wave">👋</span>
        </h2>
      )}
      <div className="admin-dashboard">
        <div className="admin-dashboard-box">
          <Link to="/user-status" className="admin-link">
          View Customers
          <div><img src={customer}/></div>
          </Link>
        </div>
        <div className="admin-dashboard-box">
          <Link to="/create-product-adder" className="admin-link">
          Create User
          <div><img src={createAdder}/></div>
          </Link>
        </div>
        <div className="admin-dashboard-box">
          <Link to="/get-feedback" className="admin-link">
          View Feedback
          <div><img src={feedback}/></div>
          </Link>
        </div>
        {/* <div className="admin-dashboard-box">
          <Link to="/delivery-status" className="admin-link">
          Delivery Status
          <div><img src={delivery}/></div>
          </Link>
        </div> */}
        <div className="admin-dashboard-box">
          <Link to="/create-product-type" className="admin-link">
          Create Product Type
          <div><img src={category}/></div>
          </Link>
        </div>
        <div className="admin-dashboard-box">
          <Link to="/update-product-type" className="admin-link">
          update Product Category
          <div><img src={update}/></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
