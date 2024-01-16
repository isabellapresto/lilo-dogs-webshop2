import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import CheckOutBtn from './CheckOutBtn';
import { useCart } from '../../../Context/CartContext';


const Cart = ({ show, onHide }) => {


  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CartItems />
        <CheckOutBtn/>
        {/* //syns inte */}
        <Link to={`/products`} style={{ color: 'red' }}>Continue Shopping</Link> 
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
