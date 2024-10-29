import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../Component/UserContext';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../style/loginAndRegister.css'
export default function ResetPassword() {
  const navigate = useNavigate();
  const {id,token}=useParams()
  const { user } = useContext(userContext)
  const [data, setData] = useState({ password: '' })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password } = data;
   axios.post(`/reset-password/${id}/${token}`,{password})
        .then(res=>{
          if(res.data.Status==="Success"){
            navigate('/login');
            console.log(res.data)
          }
        })
        .catch(err=>console.log(err))

  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prevData => {
      return {
        ...prevData
        , [name]: value
      }
    })
  }
  return (
    <div className='whole-login'>
      <form onSubmit={handleSubmit}>
        <div className='login'>
          <div><h2>Reset password</h2></div>
          <div>
            <div><label>New Password</label></div>
            <div><input type='password' placeholder='Enter your password here...' name='password' value={data.password} onChange={handleInput} /></div>
          </div>
          <div className='login-lower-part'>
            <div><button type='submit' className='loginbtn'>update</button></div>
            <div className='create-acount'><Link to='/register'>Create new account</Link></div>
          </div>
        </div>
      </form>
    </div>
  )
};

