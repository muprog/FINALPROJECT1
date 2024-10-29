import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search);
  const reference = query.get('tx_ref');



  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(`/verify/${reference}`);
        setStatus(response.data.status === 'completed' ? 'Payment Successful' : 'Payment Failed');
      } catch (error) {
        setStatus('Payment Verification Failed');
        setError('Failed to verify payment');
        console.error('Error verifying payment', error);
    }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  return (
    <div>
      <h1>{status}</h1>
      {status === 'Payment Successful' && (
        <p>Thank you for your payment. Your transaction reference is {reference}.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PaymentResult;