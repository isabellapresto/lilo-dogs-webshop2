import React from 'react';
import { useCart } from '../../../Context/CartContext';
import { ListGroup, Image } from 'react-bootstrap';

const CartItems: React.FC = () => {
  const { cart, updateQuantity, removeProduct } = useCart();

  const handleRemove = (productId: string) => {
    console.log("Removing product with ID:", productId); 
    removeProduct(productId);
  };
  
  

  const increaseQuantity = (productId: string) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  const decreaseQuantity = (productId: string) => {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };



  return (
    <div>
      <ListGroup>
        {cart.map((item, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex align-items-center">
              <Image src={item.image} alt={item.productName} thumbnail className="mr-3" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div>
                <h5>{item.productName}</h5>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button className="quantity">{item.quantity}</button>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => handleRemove(item.id)}>Remove</button> 
                <h6>€ {item.price * item.quantity}</h6>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CartItems;
