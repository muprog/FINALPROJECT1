// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast'
// import { Link, useNavigate } from 'react-router-dom';
// import '../style/loginAndRegister.css'
// import { useTranslation } from 'react-i18next';
// export default function Register() {
//   const {t} = useTranslation();
//   const [isAgreed, setIsAgreed] = useState(false);
//   const navigate=useNavigate();
//   const [data,setData]=useState({
//     fname:'',
//     lname:'',
//     email:'',
//     password:'',
//     confirmpassword:'',
//     phone:'',
//     usertype:'',
//     status:'off'
// })

// const  registerUser =async(e)=>{
//     e.preventDefault();

//   const {fname,lname,email,password,phone,usertype,confirmpassword,status}=data;
//   {
// const {data}=await axios.post('/register',{
//   fname,lname, email,password,phone,usertype,confirmpassword,status
// })
// if(data.error){
//   toast.error(data.error)
// }else{
//   setData({});
//   toast.success('Successfully registered');
//   navigate('/login')
// }
//   }
// }
// const handleCheckboxChange = () => {
//   setIsAgreed(!isAgreed);
// };
// function handleInput(e){
//   const {name,value}=e.target;
//   setData(
//       prevData=>{
//           return{
//               ...prevData,
//               [name]:value
//           }
//       }
//   )
// }

//   return (
//     <div className='whole-login'>
//     <form onSubmit={registerUser} className='register-form'>

//       <div className='login'>
//       <h2>{t('createAccount')}</h2>
//       <div className='form-row'>
//         <div>
       
//         <label className='form-label'>{t('firstName')}</label>
//     <input type='text' placeholder='Enter your first name here...' name='fname' value={data.fname} onChange={handleInput} className='form-input'/>
//         </div>
//         <div>
//         <label className='form-label'>{t('lastName')}</label>
//     <input type='text' placeholder='Enter your last name here...' name='lname' value={data.lname} onChange={handleInput} className='form-input'/>
//         </div>
//         </div>
//         <div className='form-row'>  
//  <div>
//  <label className='form-label'>{t('email')}</label>
//   <input type='email' placeholder='Enter your email here...' name='email' value={data.email} onChange={handleInput} className='form-input'/>
//  </div>
//  <div>
//    <label className='form-label'>{t('phone')}</label>
//   <input type='text' placeholder='Enter your phone number here...' name='phone' value={data.phone} onChange={handleInput} className='form-input'/>
//    </div>
//    </div>
//    <div className='form-row'>  
// <div>
// <label className='form-label'>{t('password')}</label>
// <input type='password' placeholder='********' name='password' value={data.password} onChange={handleInput} className='form-input'/>
// </div>
  
// <div>
// <label className='form-label'>{t('confirmPassword')}</label>
// <input type='password' placeholder='********' name='confirmpassword' value={data.confirmpassword} onChange={handleInput} className='form-input'/>
// </div>
// </div>


//    <span className='form-label'>{t('role')}<select name='usertype' value={data.usertype} onChange={handleInput}>
//     <option></option>
//     {/* <option value="seller"> {t('seller')}</option> */}
//     <option value="buyer">{t('buyer')}</option>
//     {/* <option value="adder">{t('adder')}</option> */}
//     </select></span>
//     {/* Terms and Privacy Checkbox */}
//     <div className="terms">
//         <input
//           type="checkbox"
//           id="agreement"
//           checked={isAgreed}
//           onChange={handleCheckboxChange}
//         />
//         <label htmlFor="agreement">
//           I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
//         </label>
//       </div>
//    <div><button type='submit' className='loginbtn' disabled ={!isAgreed}>{t('signUp')}</button>
//     <p>{t('doyouhaveaccount')}?<Link to="/login" className='signinbtn'>{t('login')}</Link></p>
//    </div>
//         </div>
//       </form>
//       </div>
//   )
// }



import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../style/loginAndRegister.css';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    usertype: 'buyer',
    status: 'on',
    otp: '' // Add this for OTP input
  });

  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status

  // Function to handle OTP verification after it's sent
  const verifyOtp = async (e) => {
    e.preventDefault();
    const { otp, fname, lname, email, password, phone, usertype, status } = data;

    const { data: response } = await axios.post('/verify-otp', {
      otp, email, fname, lname, password, phone, usertype, status
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Registration successful');
      navigate('/login');
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, phone, usertype, confirmpassword, status } = data;

    const { data: response } = await axios.post('/register', {
      fname, lname, email, password, phone, usertype, confirmpassword, status
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      setIsOtpSent(true);
      toast.success('OTP sent to your email. Please verify.');
    }
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <div className='whole-login'>
      <form onSubmit={isOtpSent ? verifyOtp : registerUser} className='register-form'>
        <div className='login'>
          <h2>{t('createAccount')}</h2>
          {!isOtpSent && (
            <>
              <div className='form-row'>
                <div>
                  <label className='form-label'>{t('firstName')}</label>
                  <input
                    type='text'
                    placeholder='Enter your first name here...'
                    name='fname'
                    value={data.fname}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
                <div>
                  <label className='form-label'>{t('lastName')}</label>
                  <input
                    type='text'
                    placeholder='Enter your last name here...'
                    name='lname'
                    value={data.lname}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
              </div>
              <div className='form-row'>
                <div>
                  <label className='form-label'>{t('email')}</label>
                  <input
                    type='email'
                    placeholder='Enter your email here...'
                    name='email'
                    value={data.email}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
                <div>
                  <label className='form-label'>{t('phone')}</label>
                  <input
                    type='text'
                    placeholder='Enter your phone number here...'
                    name='phone'
                    value={data.phone}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
              </div>
              <div className='form-row'>
                <div>
                  <label className='form-label'>{t('password')}</label>
                  <input
                    type='password'
                    placeholder='********'
                    name='password'
                    value={data.password}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
                <div>
                  <label className='form-label'>{t('confirmPassword')}</label>
                  <input
                    type='password'
                    placeholder='********'
                    name='confirmpassword'
                    value={data.confirmpassword}
                    onChange={handleInput}
                    className='form-input'
                  />
                </div>
              </div>
              {/* <span className='form-label'>
                {t('role')}
                <select name='usertype' value={data.usertype} onChange={handleInput}>
                  <option></option>
                  <option value='buyer'>{t('buyer')}</option>
                  {/* <option value='seller'>{t('seller')}</option> *
                </select>
              </span> */}
              <div className='terms'>
                <input
                  type='checkbox'
                  id='agreement'
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor='agreement'>
                  I agree to the <a href='/terms'>Terms of Service</a> and{' '}
                  <a href='/privacy'>Privacy Policy</a>
                </label>
              </div>
            </>
          )}

          {/* OTP input form */}
          {isOtpSent && (
            <div className='form-row'>
              <label className='form-label'>Enter OTP</label>
              <input
                type='text'
                placeholder='Enter OTP here...'
                name='otp'
                value={data.otp}
                onChange={handleInput}
                className='form-input'
              />
            </div>
          )}

          <button
            className={`form-input ${isOtpSent ? 'otp-submit' : 'submit'}`}
            disabled={!isAgreed}
          >
            {isOtpSent ? 'Verify email' : t('register')}
          </button>
        </div>
      </form>
    </div>
  );
}
