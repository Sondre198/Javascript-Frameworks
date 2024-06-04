import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div>
      <h1>Checkout Complete!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/">Go back to store</Link>
    </div>
  );
};

export default CheckoutSuccess;
