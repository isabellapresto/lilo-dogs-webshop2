import React, { useEffect } from 'react';
import { useCart, CartItem } from '../../../Context/CartContext';
import { ListGroup, Image } from 'react-bootstrap';

interface CartItemsProps  {
  cartItems: CartItem []
}


const CartItems = ({ cartItems } : CartItemsProps) => {
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  useEffect(() => { console.log(cartItems); }, [cartItems]);

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
              <Image src={item.product.image} alt={item.product.productName} thumbnail className="mr-3" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div>
                <h5>{item.product.productName}</h5>
                <button onClick={() => decreaseQuantity(item.product._id)}>-</button>
                <button className="quantity">{item.quantity}</button>
                <button onClick={() => increaseQuantity(item.product._id)}>+</button>
                <button onClick={() => handleRemove(item.product._id)}>Remove</button> 
                <h6>€ {item.product.price * item.quantity}</h6>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CartItems;
