// import React, {  useState,useContext, useEffect } from 'react'
// import '../style/buyerProductStructure.css'
// import { useNavigate } from 'react-router-dom'
// import { userContext } from './UserContext';
// import { buyerProductContext } from './Cart';
// import toast from 'react-hot-toast';
// export default function BuyerProductStructure(props) {
//   const navigate=useNavigate();
//   const {cartData,setCartData,count,setCount,processedArray,setProcessedArray}=useContext(userContext)
//   const [newValue,setNewValue]=useState()

 
//   const countObjectOccurrencesById = (arr, id) => {
//     return arr.filter(item => item._id === id).length;
//   };
  
//   const handleAddToCart=(e,element)=>{
//     const match=cartData.find(element=>element._id===e.target.id)
//     if(!match){
// if(e.target.id===element._id){
// setCartData(prevData=>{
//       return[
//         ...prevData,{...element,index:cartData.length}
//       ]
//      })
// }
// } else if(match){
//   const occurrenceCount = countObjectOccurrencesById(cartData, element._id);
//   if(occurrenceCount<element.quantity){
//     setCartData(prevData=>{
//       return[
//         ...prevData,{...element,index:cartData.length}
//       ]
//      })
//   }else if(occurrenceCount>=element.quantity){
//     toast.error(`We have only ${element.quantity} number of ${element.name}.`)
//   }
// }
// }
// if(cartData.length>0){
//   setCount(cartData.length)
// }else if(cartData.length===0){
//   setCount()
// }

// const processArray = (arr) => {
//   // Use reduce to create a frequency map based on 'id'
//   const frequencyMap = arr.reduce((acc, item) => {
//     acc[item._id] = (acc[item._id] || 0) + 1;
//     return acc;
//   }, {});

// const resultArray = Object.keys(frequencyMap).map((key) => ({
//   product: key,  // No need to parse, since it's a string
//   quantity: frequencyMap[key],
// }));

// return resultArray;
// };

// useEffect(()=>{
// setProcessedArray(processArray(cartData));
// },[count])
// // console.log(processedArray)
//   return (
//     <div className='buyerProductStructure'>
//      <div className='image-container'> <div className='buyerProductStructure-img-div'><div className='buyerProductStructure-img-inner-div'><img src={require(`../images/${props.photo}`)} className='buyerProductStructure-img'/></div></div></div>
//       <div className='buyerProductStructure-lower-div'>
//         <div className='buyerProductStructure-lower-div-except-desc'>
//           <table>
//         <tr><td><strong>Name</strong></td><td className='td1'> {props.name}</td></tr>
//         <tr><td><strong>Brand</strong></td><td className='td1'> {props.brand}</td></tr>
//         <tr><td><strong>Size</strong></td><td className='td1'> {props.size}</td></tr>
//         <tr><td><strong>Price</strong></td><td className='td1'> <span>ETB</span> {new Intl.NumberFormat('en-US', {
//   style: 'decimal', 
//   minimumFractionDigits: 2, 
//   maximumFractionDigits: 2,
// }).format(props.price)}</td></tr>
//      {/* <tr><td><strong>Quantity</strong></td><td className='td1'> {props.element.quantity}</td></tr> */}
// </table>
// </div>
//         <div className='description'>{props.description}</div>
//         <div className='buyerProductStructure-btn-div'><button onClick={(e)=>handleAddToCart(e,props.element)} id={props.id} className='add-to-cart'>Add to cart</button></div>
//       </div>
//     </div>
   
//   )
// }

import React, { useState, useContext, useEffect } from 'react';
import '../style/buyerProductStructure.css';
import { useNavigate } from 'react-router-dom';
import { userContext } from './UserContext';
import { buyerProductContext } from './Cart';
import toast from 'react-hot-toast';
import axios from 'axios';  // Import axios for the POST request

export default function BuyerProductStructure(props) {
  const navigate = useNavigate();
  const { cartData, setCartData, count, setCount, processedArray, setProcessedArray ,user} = useContext(userContext);
  const [newValue, setNewValue] = useState();

  const countObjectOccurrencesById = (arr, id) => {
    return arr.filter(item => item._id === id).length;
  };

  const handleAddToCart = (e, element) => {
    const match = cartData.find(element => element._id === e.target.id);
    if (!match) {
      if (e.target.id === element._id) {
        setCartData(prevData => {
          return [
            ...prevData, { ...element, index: cartData.length }
          ];
        });
      }
    } else if (match) {
      const occurrenceCount = countObjectOccurrencesById(cartData, element._id);
      if (occurrenceCount < element.quantity) {
        setCartData(prevData => {
          return [
            ...prevData, { ...element, index: cartData.length }
          ];
        });
      } else if (occurrenceCount >= element.quantity) {
        toast.error(`We have only ${element.quantity} number of ${element.name}.`);
      }
    }
  };

  const handleAddToFavorites = async (element) => {
    try {
      const response = await axios.post('/favorite', {
        productId: element._id,
        userEmail: user.email,  // Replace with the logged-in user's email
        name: element.name,
        brand: element.brand,
        size: element.size,
        price: element.price,
        quantity: element.quantity,
        photo:element.photo  // You may not need this if it's always 1
      });
      if (response.data.success) {
        toast.success(`${element.name} added to your favorites!`);
      }
      if (response.data.exist) {
        toast.error(`${element.name} is already exist in favorites!`);
      }
    } catch (error) {
      toast.error('Failed to add to favorites. Please try again.');
    }
  };

  if (cartData.length > 0) {
    setCount(cartData.length);
  } else if (cartData.length === 0) {
    setCount();
  }

  const processArray = (arr) => {
    const frequencyMap = arr.reduce((acc, item) => {
      acc[item._id] = (acc[item._id] || 0) + 1;
      return acc;
    }, {});

    const resultArray = Object.keys(frequencyMap).map((key) => ({
      product: key,
      quantity: frequencyMap[key],
    }));

    return resultArray;
  };

  useEffect(() => {
    setProcessedArray(processArray(cartData));
  }, [count]);

  return (
    <div className='buyerProductStructure'>
      <div className='image-container'>
        <div className='buyerProductStructure-img-div'>
          <div className='buyerProductStructure-img-inner-div'>
            <img src={require(`../images/${props.photo}`)} className='buyerProductStructure-img' />
          </div>
        </div>
      </div>
      <div className='buyerProductStructure-lower-div'>
        <div className='buyerProductStructure-lower-div-except-desc'>
          <table>
            <tr><td><strong>Name</strong></td><td className='td1'> {props.name}</td></tr>
            <tr><td><strong>Brand</strong></td><td className='td1'> {props.brand}</td></tr>
            <tr><td><strong>Size</strong></td><td className='td1'> {props.size}</td></tr>
            <tr><td><strong>Price</strong></td><td className='td1'> <span>ETB</span> {new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.price)}</td></tr>
            <tr>
  <td className="label">Manufactured Date</td>
  <td className="value">
    {new Date(props.element.manufacturedDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}
  </td>
</tr>
          </table>
        </div>
        <div className='description'>{props.description}</div>
        <div className='buyerProductStructure-btn-div'>
          <button onClick={(e) => handleAddToCart(e, props.element)} id={props.id} className='add-to-cart'>Add to cart</button>
          <button onClick={() => handleAddToFavorites(props.element)} className='favorite-btn'>❤️</button>
        </div>
      </div>
    </div>
  );
}
