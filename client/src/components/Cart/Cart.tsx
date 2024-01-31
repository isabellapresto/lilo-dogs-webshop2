import {  Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import CheckOutBtn from './CheckOutBtn';
import { useCart } from '../../../Context/CartContext';
import "../Cart/Cart.css";
import { useEffect } from 'react';
// import { CartItem } from '../../Interfaces/CartItemsInterface';

// Visa varukorgen i Offcanvas
const Cart = ({ show, onHide }) => {
  // useCart-hook för att hämta varukorgsdata
  const { cartItems } = useCart();

  useEffect(() => { console.log(cartItems); }, [cartItems]);


  // Totalpris
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    // Anropa onHide för att stänga Offcanvas
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
          // Visa produkter, totalpris, länk för att fortsätta shoppa och knapp för att checka ut
          <>
            <CartItems  cartItems = {cartItems}/>
            <div>Total Price: €{calculateTotalPrice()}</div>
          
            <div style={{ marginBottom: '10px' }}>
              {/* Länk för att fortsätta shoppa */}
              <Link to={`/products`} className="continue-shopping-link" onClick={handleContinueShopping}>
                Continue Shopping
              </Link>
            </div>
            <div className="checkout-btn-container">
              <CheckOutBtn/>
    {/* <Link to={`/delivery-details`} className="btn btn-dark " onClick={handleContinueShopping}>
        Checkout
    </Link> */}
</div>

          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
