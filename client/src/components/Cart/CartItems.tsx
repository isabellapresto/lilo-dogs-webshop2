import React, { useEffect } from 'react';
import { useCart, CartItem } from '../../../Context/CartContext';
import { ListGroup, Image } from 'react-bootstrap';

interface CartItemsProps {
  cartItems: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems }) => {
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
      {cartItems.map(({ product, quantity }, index) => (
  <ListGroup.Item key={index}>
    <div className="d-flex align-items-center">
      <Image
        src={product?.image}
        alt={product?.productName}
        thumbnail
        className="mr-3"
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      />
      <div>
        <h5>{product?.productName}</h5>
        <button onClick={() => decreaseQuantity(product?._id)}>-</button>
        <span className="quantity">{quantity}</span>
        <button onClick={() => increaseQuantity(product?._id)}>+</button>
        <button onClick={() => handleRemove(product?._id)}>Remove</button>
        <h6>€ {product?.price * quantity}</h6>
      </div>
    </div>
  </ListGroup.Item>
))}

      </ListGroup>
    </div>
  );
};

export default CartItems;
