import React, { useEffect, useState } from 'react'
import '../style/cartDataStructure.css'
import { useContext } from 'react';
import { userContext } from './UserContext';
import toast from 'react-hot-toast';
export default function CartDataStructure(props) {
const {cartData,setCartData,count,setCount,some,setSome,processedArray, setProcessedArray}=useContext(userContext);
const [filteredData,setFilteredData]=useState();
const [someOther,setSomeOther]=useState([]);
// const [quantity,setQuantity]=useState(1)

const removeById = (arr, id) => {
  return arr.filter(item => item._id !== id);
};


  const handleRemove=(e)=>{
  const newArray = removeById(cartData, props.id);
  setCartData(newArray);
    setCount(cartData.length-1);
    }
    
    const processArray = (arr) => {
      // Use reduce to create a frequency map based on 'id'
      const frequencyMap = arr.reduce((acc, item) => {
        acc[item._id] = (acc[item._id] || 0) + 1;
        return acc;
      }, {});
       
      const resultArray = Object.keys(frequencyMap).map((key) => ({
        product: key,  // No need to parse, since it's a string
        quantity: frequencyMap[key],
      }));
  
      return resultArray;
    };
    
    useEffect(()=>{
    setProcessedArray(processArray(cartData));
    },[count])


    const countObjectOccurrencesById = (arr, id) => {
      return arr.filter(item => item._id === id).length;
    };


    

    const handlePlus=()=>{
      const occurrenceCount = countObjectOccurrencesById(cartData, props.element._id);
      console.log(occurrenceCount);
      if(occurrenceCount<props.element.quantity){
        setCartData(prevCartData=>{
          return[
            ...prevCartData,
            props.element
          ]
         })
      }else if(occurrenceCount>=props.element.quantity){
        toast.error(`We have only ${props.element.quantity} number of ${props.element.name}.`)
      }

    }


const handleMinus = () => {
  // Filter out the first occurrence of the item with the given id
  setCartData(prevCart => {
    const index = prevCart.findIndex(item => item._id === props.id);
    if (index !==-1) {
      // Create a new array excluding the first occurrence of the item with the given id
      return [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1)
      ];
    }
    return prevCart; // Return the original array if the id is not found
  });
};

  return (
    <div className='outer'>
      <div className='cart-img-div'><div><img src={require(`../images/${props.photo}`)} className='cart-img' /></div></div>
      <div className='cart-div-except-img'>
        <table>
        <tr><td><strong>Name</strong></td><td>{props.name}</td></tr>
        <tr><td><strong>Brand</strong></td><td>{props.brand}</td></tr>
        <tr><td><strong>Size</strong></td><td>{props.size}</td></tr>
        <tr><td><strong>Price</strong></td><td>{props.price}</td></tr>
        <tr><td><div className='quantity-ajustment-button'><button onClick={handlePlus} className='plus'>+</button></div></td><td><div className='quantity-ajustment-button'><button onClick={handleMinus} className='minus'>-</button></div></td></tr>
        <tr><td>quantity</td><td>{
          processedArray.map(elements=>{
            if(props.id===elements.product){
              return elements.quantity
            }
          })
          }</td></tr>
        </table>
        <div><button className='remove-btn' id={props.index} onClick={handleRemove}>remove from basket</button></div>
      </div>
    </div>
  )
}