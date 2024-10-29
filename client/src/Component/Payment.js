import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/create', { amount });
      // Redirect to Chapa payment gateway
      if (response.data.chapaUrl) {
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

  return (
    <div>
      <h1>Chapa Payment Integration</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Payment;