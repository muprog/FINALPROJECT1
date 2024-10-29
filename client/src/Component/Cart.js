import React, { createContext, useEffect } from 'react'
import { useState,useContext } from 'react';
import { userContext } from './UserContext';
import CartDataStructure from './CartDataStructure';
import { Link } from 'react-router-dom';
import '../style/cartDataStructure.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/cart.css';
export default function Cart() {
  const navigate=useNavigate();
const {user,cartData,setCartData,preUserBalance,setPreUserBalance,setCount,processedArray, setProcessedArray,uniqueArray,setUniqueArray}=useContext(userContext);
let sum=0;
const totalPrice=cartData.length!==0?cartData.map(Element=>sum+=Element.price):0
// console.log(sum)
function handleProceed(e){
navigate('/proceed');
}

useEffect(()=>{
  axios.get('/get-balance')
  .then(res=>setPreUserBalance(res.data.find(Element=>Element.email===user.email)))
  .catch(err=>console.log(err))
  axios.get('/profile')
  .then(res => {
    if (res.data === 'null') {
      navigate('/login');
    }else if(res.data.usertype==='adder'){
      navigate('/adder')
    }else if(res.data.usertype==='Admin'){
      navigate('/admin')
    }
    // console.log(res.data);
  })
  .catch(err => console.log(err));
  axios.post('/restrict-cart',user)
       .then(res=>{
        if(res.data.usertype==="Admin"){
          // navigate(-1);
          navigate('/admin')
        }else if(res.data.usertype==="adder"){
          // navigate(-1);
          navigate('/adder')
        }
      })
       .catch(err=>console.log(err));
},[])
const getUniqueArray = (arr) => {
  return arr.reduce((acc, current) => {
    const exists = acc.find(item => item._id === current._id); // Check if the object with the same 'id' exists
    if (!exists) {
      acc.push(current); // Add it to the accumulator if it doesn't exist
    }
    return acc;
  }, []);
};

// const [uniqueArray,setUniqueArray] = useState([]);

useEffect(()=>{
  setUniqueArray(getUniqueArray(cartData))
},[cartData])
  if(cartData.length>0){
    setCount(cartData.length)
  }else if(cartData.length===0){
    setCount()
  }
  return (
    <div className='cart'>
      <Link to='/buyer'>back</Link>
      <div className='cart-whole-div'>
    <div className='whole-cart-products'>
    {cartData.length===0?(<div>Your cart is empty</div>):uniqueArray.map(Element=><CartDataStructure key={Element._id} photo={Element.photo} description={Element.description} price={Element.price} id={Element._id} index={Element.index} size={Element.size} name={Element.name} brand={Element.brand} element={Element} />)}
    </div>
    {cartData.length===0?'':
      <div className='payment'>
      <div><b>Price</b></div>
      <div>Total Price <span className='span'>ETB {sum}</span></div>
      <div><button onClick={handleProceed}>Proceed</button></div>
    </div>}
    </div>
    </div>
  )
}
