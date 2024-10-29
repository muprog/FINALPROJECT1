import React from 'react'
import { userContext } from './UserContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function HandleCountAndCart() {
  
const {count,user}=useContext(userContext);
function handleCart(){
toast.error('Please log in first.')
}
  return (
      <div>
       {user.email? <center><Link to='/cart'>Cart<div>{count}</div></Link></center>:<center><Link onClick={handleCart}>Cart</Link></center>}
        </div>
  )
}
