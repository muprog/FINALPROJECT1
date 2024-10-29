import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function HandleLogout() {
const navigate=useNavigate();
       const handleLogOut=async()=>{
await axios.post('/logout')
           .then(()=>console.log("logged out successfully"))
           .catch(err=>console.log(err));
     navigate('/')
     window.location.reload();
  }
  return (
    <div>
      <Link onClick={handleLogOut}>Log out</Link>
    </div>
  )
}
