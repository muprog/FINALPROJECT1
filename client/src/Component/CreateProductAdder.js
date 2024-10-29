import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import '../style/loginAndRegister.css'
import { useTranslation } from 'react-i18next';
export default function CreateProductAdder() {
  const {t} = useTranslation();
  const navigate=useNavigate();
  const [data,setData]=useState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    confirmpassword:'',
    phone:'',
    usertype:'adder',
    status:'on'
})

const  registerUser =async(e)=>{
    e.preventDefault();

  const {fname,lname,email,password,phone,usertype,confirmpassword,status}=data;
  {
const {data}=await axios.post('/create-adder',{
  fname,lname, email,password,phone,usertype,confirmpassword,status
})
if(data.error){
  toast.error(data.error)
}else{
  setData({
    fname:'',
    lname:'',
    email:'',
    password:'',
    confirmpassword:'',
    phone:'',
    usertype:'adder',
    status:'on'
  });
  toast.success('Successfully registered');
  // navigate('/login')
}
  }
}
function handleInput(e){
  const {name,value}=e.target;
  setData(
      prevData=>{
          return{
              ...prevData,
              [name]:value
          }
      }
  )
}

  return (
    <div className='whole-login'>
    <form onSubmit={registerUser} className='register-form'>

      <div className='login'>
      <h2>{t('createAccount')}</h2>
      <div className='form-row'>
        <div>
        <label className='form-label'>{t('firstName')}</label>
    <input type='text' placeholder='Enter your first name here...' name='fname' value={data.fname} onChange={handleInput} className='form-input'/>
        </div>
        <div>
        <label className='form-label'>{t('lastName')}</label>
    <input type='text' placeholder='Enter your last name here...' name='lname' value={data.lname} onChange={handleInput} className='form-input'/>
        </div>
        </div>
        <div className='form-row'>
 <div>
 <label className='form-label'>{t('email')}</label>
  <input type='email' placeholder='Enter your email here...' name='email' value={data.email} onChange={handleInput} className='form-input'/>
 </div>

 <div>
   <label className='form-label'>{t('phone')}</label>
  <input type='text' placeholder='Enter your phone number here...' name='phone' value={data.phone} onChange={handleInput} className='form-input'/>
   </div>
   </div>
   <div className='form-row'>
<div>
<label className='form-label'>{t('password')}</label>
<input type='password' placeholder='********' name='password' value={data.password} onChange={handleInput} className='form-input'/>
</div>
   
<div>
<label className='form-label'>{t('confirmPassword')}</label>
<input type='password' placeholder='********' name='confirmpassword' value={data.confirmpassword} onChange={handleInput} className='form-input'/>
</div>
</div>
   {/* <span className='form-label'>{t('role')}<select name='usertype' value={data.usertype} onChange={handleInput}>
    <option></option>
    {/* <option value="seller"> {t('seller')}</option> */}
    {/* <option value="buyer">{t('buyer')}</option> *
    <option value="adder">{t('adder')}</option>
    </select></span> */}
   <div><button type='submit' className='loginbtn'>{t('Create')}</button>
    {/* <p>{t('doyouhaveaccount')}?<Link to="/login" className='signinbtn'>{t('login')}</Link></p> */}
   </div>
        </div>
      </form>
      </div>
  )
}
