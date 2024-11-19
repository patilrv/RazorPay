import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
  return (
    <div className="checkout-page">
      <h1 style={{'textAlign' : "center"}}>Welcome to Payment Gateway</h1>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
