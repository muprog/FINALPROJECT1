import React, { useState } from 'react'
import search from '../image/search-icon.png';
import logo from '../image/logo.jpg';
import '../style/header.css';
import { Link,useNavigate } from 'react-router-dom'
import { userContext } from './UserContext';
import { useContext } from 'react';
import HandleLogout from './HandleLogout';
import toast from 'react-hot-toast';
import HandleCountAndCart from './HandleCountAndCart';
export default function Header() {
  const {count,setCount,user,setSearchController}=useContext(userContext);
  const [searchByName,setSearchByName]=useState('')
  const navigate=useNavigate();
  function handleSearchInput(e){
      setSearchController(e.target.value)
   
  }
  function handleSearchByName(e){
    setSearchByName(e.target.value)
  }
  return (
    <div className='header'>
      <div className='logo-div'><Link to="/"><img src={logo} alt="search icons" className='logo'/> </Link></div>
       <div className='header-input-div'>
        <div >
          <select className='category' onChange={handleSearchByName}>
          <option>Search ALL</option>
          </select>
          </div>
      <div className='input-div'><input type='text' placeholder='Search' className='search-input' onChange={handleSearchInput} /></div>
      <div className='search-div'><img src={search} alt="search icons" className='search-icon'/></div>
       </div>
     {user.email?<HandleLogout/>:<div><Link to='/login'><div>Sign in</div></Link></div>}
     <HandleCountAndCart/>
    </div>
  )
}
