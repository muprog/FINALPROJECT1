// VerifyOtp.js

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/loginAndRegister.css';

export default function VerifyOtp() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/verify-otp1', { email, otp, newPassword });
      if (response.data.Status === 'Success') {
        toast.success('Password reset successfully!');
        navigate('/login');
      } else {
        toast.error(response.data.Status);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error verifying OTP');
    }
  };

  return (
    <div className='whole-login'>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='login'>
          <div><h2>Verify OTP</h2></div>
          <div>
            <label className='form-label'>OTP</label>
            <input
              type='text'
              placeholder='Enter OTP here...'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='form-input'
            />
          </div>
          <div>
            <label className='form-label'>New Password</label>
            <input
              type='password'
              placeholder='Enter new password here...'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='form-input'
            />
          </div>
          <div className='forget-creat'>
            <button type='submit' className='send'>Reset Password</button>
          </div>
        </div>
      </form>
    </div>
  );
}
