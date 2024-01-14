import React from 'react';
import { useCart } from '../../../Context/CartContext';
import { ListGroup, Image } from 'react-bootstrap';


const CartItems: React.FC = () => {
  const { cart } = useCart();

  return (
    <div>
      <ListGroup>
        {cart.map((item, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex align-items-center">
              <Image src={item.image} alt={item.productName} thumbnail className="mr-3" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div>
                <h5>{item.productName}</h5>
                <p>€ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CartItems;
