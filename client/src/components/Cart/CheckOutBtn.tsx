import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from '../../../Context/CartContext';

const CheckOutBtn: React.FC = () => {
  const { handlePayment } = useCart();

  return (
    <Button variant="dark" onClick={handlePayment}>
      Checkout
    </Button>
  );
};

export default CheckOutBtn;
