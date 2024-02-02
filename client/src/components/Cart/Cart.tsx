import { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import CheckOutBtn from './CheckOutBtn';
import { useCart } from '../../../Context/CartContext';
import '../Cart/Cart.css';

const Cart = ({ show, onHide }) => {
  const { cartItems } = useCart();

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // Totalpris
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          // Visas om varukorgen är tom
          <div style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</div>
        ) : (
          <>
            <CartItems cartItems={cartItems} />
            <div>Total Price: €{calculateTotalPrice()}</div>
            <div style={{ marginBottom: '10px' }}>
              <Link to="/products" className="continue-shopping-link" onClick={handleContinueShopping}>
                Continue Shopping
              </Link>
            </div>
            <div className="checkout-btn-container">
              <CheckOutBtn />
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
