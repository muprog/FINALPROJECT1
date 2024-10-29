import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from './UserContext';
import SellerProductStructure from './SellerProductStructure';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/SellerProducts.css';
export default function SellerProducts() {
  const {user,filteredData,setFilteredData}=useContext(userContext)
  const [userData,setUserData]=useState([]);
 const navigate=useNavigate();
 
 useEffect(()=>{
axios.get('/seller-products')
    .then(res=>setUserData(res.data))
    .catch(err=>console.log(err));
    axios.get('/profile')
     .then(res=>{
      // console.log(res.data)
    if(res.data==='null'){
      navigate('/login')
    }
    })
     .catch(err=>console.log(err));
   
 },[userData])

 
//  console.log(user)
 
//  console.log(userData)
//  console.log(filteredData)
// console.log(user);
useEffect(()=>{
setFilteredData(userData.filter(data=>data.owner===user.email))
},[userData])


  return (
    <div className="SellerProducts">
     {/* <Link to='/seller'>Back</Link> */}
     <Link to='/adder'>Back</Link>
      <table>
        <tr><th>photo</th><th className='id-th'>id</th><th>P.Name</th><th>Brand</th><th>Price</th><th>Category</th><th className='qty'>Qty</th><th>Description</th><th>Action</th></tr>
        {filteredData && filteredData.map(Element=>{
          return <SellerProductStructure key={Element._id} photo={Element.photo} id={Element._id} name={Element.name} brand={Element.brand}  price={Element.price} category={Element.category} quantity={Element.quantity} description={Element.description} status={Element.status} />})}
      </table> 
    </div>
  )
}