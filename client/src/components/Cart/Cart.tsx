import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import CheckOutBtn from './CheckOutBtn';
import { useCart } from '../../../Context/CartContext';
import "../Cart/Cart.css"

const Cart = ({ show, onHide }) => {
  const { cart } = useCart();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    // Call onHide to close the Offcanvas
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</div>
        ) : (
          <>
            <CartItems />
            <div>Total Price: €{calculateTotalPrice()}</div>
            <div style={{ marginBottom: '10px' }}>
              <Link to={`/products`} className="continue-shopping-link" onClick={handleContinueShopping}>
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
