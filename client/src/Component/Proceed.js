

//chapa email and password
//amarenibret292@gmail.com
//12@re3#$A


import React, { useState, useEffect, useContext } from 'react';
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../style/proceed.css';

export default function Proceed() {
  const [deliveryData, setDeleveryData] = useState({ address: '', phone: '' });
  const navigate = useNavigate();
  const { user, cartData, setCartData, setCount } = useContext(userContext);
  const [buyerBuysProduct, setBuyerBuysProduct] = useState();
  const { userBalance, setUserBalance, preUserBalance, processedArray, setProcessedArray } = useContext(userContext);

  let sum = 0;
  const totalPrice = cartData.length !== 0 ? cartData.map(Element => sum += Element.price) : 0;
  const [hasError, setHasError] = useState(false);
  const [noError, setNoError] = useState(false);
  const [receipt, setReceipt] = useState();

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   const { address, phone } = deliveryData;
  //   const confirm = window.confirm('Are you sure?');
  //   let email = user.email;

  //   axios.post('/balances', { email, sum, processedArray })
  //     .then(res => {
  //       if (res.data.error) {
  //         setHasError(true);
  //         return toast.error(res.data.error);
  //       } else {
  //         setNoError(true);
  //       }
  //     })
  //     .catch(err => console.log(err));

  //   if (confirm) {
  //     setUserBalance(preUserBalance);
      // const currentDate = new Date().toLocaleDateString();
  //     setBuyerBuysProduct({
        // buyer: user.email,
        // buys: processedArray,
        // address: address,
        // phone: phone,
        // totalPrice: sum,
        // paymentDate: currentDate, // Add payment date
        // status:'unChecked'
  //     });
  //     setReceipt(cartData);
  //     if (!address || !phone) {
  //       toast.error("All inputs are required.");
  //     } else if (!/^(?:\+251|251|0)?(9|7)\d{8}$/.test(phone)) {
  //       toast.error("Phone number is not valid.");
  //     }
  //   }
  // };

  useEffect(() => {
    axios.post('/buyer-buys-product', { ...buyerBuysProduct, sum })
      .then(res => {
        if (res.data.error) {
          setHasError(true);
        } else {
          setNoError(true);
        }
      })
      .catch(err => console.log(err));

    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [buyerBuysProduct]);

  useEffect(() => {
    if (noError) {
      setCartData([]);
      setCount();
    }
  }, [noError]);

  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setDeleveryData(prevDeliveryData => {
  //     return {
  //       ...prevDeliveryData,
  //       [name]: value
  //     }
  //   });
  // };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDeleveryData(prevDeliveryData => (
      {
      ...prevDeliveryData,
      [name]: value
    }));

    // Ethiopian phone number validation
   

    // if (name === 'phone') {
    //   if (!ethiopianPhoneRegex.test(value)) {
    //     toast.error('Phone number must be valid Ethiopian phone number starting with 09, +251, 251, or 07.');
    //   } else {
    //     toast.success('Valid phone number.');
    //   }
    // }
  };

  const handlePrint = () => {
    window.print(); // Trigger print
  };

  
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handlePayment = async () => {
    const currentDate = new Date().toLocaleDateString();
    try {
      const ethiopianPhoneRegex = /^(09\d{8}|^\+251\d{9}|^251\d{9}|^07\d{8})$/;
      if (!ethiopianPhoneRegex.test(deliveryData.phone)) {
       return toast.error('Phone number must be valid Ethiopian phone number starting with 09, +251, 251, or 07.');
      }
      if(deliveryData.phone==="" || deliveryData.address===""){
        return toast.error('Address and phone number is required.')
      }
      const response = await axios.post('/create',
        {
        buyer: user.email,
        buys: processedArray,
        address:deliveryData.address,
        phone: deliveryData.phone,
        totalPrice: sum,
        paymentDate: currentDate, // Add payment date
        status:'unChecked',
        fname:user.fname,
        lname:user.lname
      });
      // Redirect to Chapa payment gateway
      if(response.data.error){
        toast.error(response.data.error);
      }
      if (response.data.chapaUrl) {
        setCartData([])
        window.location.href = response.data.chapaUrl;
      } else {
        throw new Error('Failed to get Chapa URL');
      }
    } catch (error) {
      setError('Payment initialization failed');
      console.error('Payment initialization error:', error);
    }
    setLoading(false);
  };
// console.log(user);
  return (
    <div>
      {cartData.length === 0 && receipt && noError ? (
        <div className='receipt-whole-div' id="print-receipt">
          <strong>Buyer</strong> : <span className='receipt-username'>{user.email}</span>
          <table>
            <thead>
              <tr><th>Product name</th><th>Price</th></tr>
            </thead>
            <tbody>
              {receipt.map(element =>
                <tr key={element._id}>
                  <td className='receipt-td'>{element.name}</td>
                  <td className='receipt-td'>{new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(element.price)}</td>
                </tr>
              )}
              <tr><td className='receipt-td total-price'>Total paid: {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(buyerBuysProduct.totalPrice)} ETB</td></tr>
              <tr><td className='receipt-td'>Payment Date: {buyerBuysProduct.paymentDate}</td></tr> {/* Add payment date */}
              <tr><td className='receipt-td'>Payed to: ATAKY.com</td></tr> {/* Add payment date */}

            </tbody>
          </table>
          <div className='receipt-btn'>
            <button onClick={handlePrint} className='pay'>Print Receipt</button>
            <button onClick={() => navigate('/buyer')} className='pay'>Finish</button>
          </div>
        </div>
      ) : (
        // <form onSubmit={handlePayment}>
        <form >
          <table>
            <tbody>
              <tr>
                <td><label>Address</label></td>
                <td><input type='text' placeholder='address' name='address' value={deliveryData.address} onChange={handleInput} className='input' /></td>
              </tr>
              <tr>
                <td><label>Phone Number</label></td>
                <td><input type='text' placeholder='phone number' name='phone' value={deliveryData.phone} onChange={handleInput} className='input' /></td>
              </tr>
            </tbody>
          </table>
          {/* <div><button type='submit' className='pay'>Pay</button></div> */}
          <div><button type='button' className='pay' onClick={handlePayment}>Pay</button></div>
        </form>
      )}
    </div>
  );
}
