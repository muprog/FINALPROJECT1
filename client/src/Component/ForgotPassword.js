// import React, { useState } from 'react'
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { userContext } from '../Component/UserContext';
// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../style/loginAndRegister.css'
// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const { user } = useContext(userContext)
//   const [data, setData] = useState({ email: '' })
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email } = data;
//    axios.post('/forgot-password',{email})
//         .then(res=>{
//           if(res.data.Status==="Success"){
//             navigate('/login');
//             console.log(res.data)
//           }
//         })
//         .catch(err=>console.log(err))

//   }
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setData(prevData => {
//       return {
//         ...prevData
//         , [name]: value
//       }
//     })
//   }
//   return (
//     <div className='whole-login'>
//       <form onSubmit={handleSubmit} className='register-form'>
//         <div className='login'>
//           <div><h2>Forgot password</h2></div>
//           <div>
//             <div><label className='form-label'>Email</label></div>
//             <div><input type='email' placeholder='Enter your email here...' name='email' value={data.email} onChange={handleInput} className='form-input'/></div>
//           </div>
//           {/* <div className='login-lower-part'> */}
//             <div className='forget-creat'><button type='submit' className='send'>Send</button>
//             <Link to='/register' className='create-account'>Create new account</Link></div>
//           {/* </div> */}
//         </div>
//       </form>
//     </div>
//   )
// };

// ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../style/loginAndRegister.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/send-otp', { email });
      if (response.data.Status === 'Success') {
        navigate(`/verify-otp1/${email}`);
      } else {
        toast.error(response.data.Status);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending OTP');
    }
  };

  return (
    <div className='whole-login'>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='login'>
          <div><h2>Forgot Password</h2></div>
          <div>
            <label className='form-label'>Email</label>
            <input
              type='email'
              placeholder='Enter your email here...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
            />
          </div>
          <div className='forget-creat'>
            <button type='submit' className='send'>Send OTP</button>
          </div>
        </div>
      </form>
    </div>
  );
}
