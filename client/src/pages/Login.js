import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../Component/UserContext';
import { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../style/loginAndRegister.css'
import { useTranslation } from 'react-i18next';
export default function Login() {
  const {t} = useTranslation();
  const navigate=useNavigate();
  const {user}=useContext(userContext)
  const [data,setData]=useState({email:'',password:''})
  const handleSubmit=async(e)=>{
    e.preventDefault();
const {email,password}=data;
try {
  const {data}=await axios.post('/login',{email,password})
//To get data from the database
  const {usertype,fname} =data;
// localStorage.setItem('usertype', usertype);
// localStorage.setItem('fname', fname);


  if(data.error){
    toast.error(data.error)
  }else{
    setData({});
   
    toast.success('Successfully logged in')
    switch (usertype){
      case 'Admin':
      navigate('/admin');
      break;
      case 'buyer':
       navigate('/buyer');
       break;
       case 'seller':
      navigate('/seller');
      break;
      case 'adder':
      navigate('/adder');
      break;
      default:
     }
     window.location.reload()
   // navigate('/')
  }
} catch (error) {
  console.log(error)
}
    }
    const handleInput=(e)=>{
      const {name,value}=e.target;
      setData(prevData=>{
        return {
          ...prevData
          ,[name]:value
        }
      })
    }
  return (
    <div className='whole-login'>
       <form onSubmit={handleSubmit} className='register-form'>
        <div className='login'>
        <div><h2>Sign In</h2></div>
          <div>
          <div><label className='form-label'>{t('email')}</label></div>
          <div><input type='email' placeholder='Enter your email here...' name='email' value={data.email} onChange={handleInput} className='form-input'/></div>
          </div>
   
   <div>
   <div><label className='form-label'>{t('password')}</label></div>
   <div><input type='password' placeholder='Enter your password here...' name='password' value={data.password} onChange={handleInput} className='form-input'/></div>
   </div>
          
          <div className='login-lower-part'>
<div><button type='submit' className='loginbtn'>{t('login')}</button></div>
    <div className='forget-creat'><Link to='/forgot-password' className='forgot-password'>{t('forgotPassword')}?</Link>
  <Link to='/register' className='create-account'>{t('createNewAccount')}</Link>
  </div>
          </div>
    </div>
      </form>
      </div>
  )
};

