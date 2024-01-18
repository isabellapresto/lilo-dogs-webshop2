import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from '../../../Context/CartContext';

const CheckOutBtn: React.FC = () => {
  const { createOrder } = useCart();

  const handleCheckout = async () => {
    try {
      // Skapa en order och få Stripe Checkout-sessionen
      await createOrder();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Button variant="dark" onClick={handleCheckout}>
      Checkout
    </Button>
  );
};

export default CheckOutBtn;
