import React, { useEffect } from 'react';
import { useCart } from '../../../Context/CartContext';
import { ListGroup, Image } from 'react-bootstrap';
import { CartItem } from '../../../src/Interfaces/CartItemInterface';

const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const handleRemove = (productId: string) => {
    console.log("Removing product with ID:", productId);
    removeProduct(productId);
  };

  return (
    <div>
      <ListGroup>
        {cartItems.map((item, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex align-items-center">
              <Image src={item.image} alt={item.productName} thumbnail className="mr-3" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div>
                <h5>{item.productName}</h5>
                <button onClick={() => decreaseQuantity(item.productId.toString())}>-</button>
                <button className="quantity">{item.quantity}</button>
                <button onClick={() => increaseQuantity(item.productId.toString())}>+</button>
                <button onClick={() => handleRemove(item.productId.toString())}>Remove</button>
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
