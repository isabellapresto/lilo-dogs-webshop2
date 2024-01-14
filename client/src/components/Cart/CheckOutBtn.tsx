
import { Button } from 'react-bootstrap';

export default function CheckOutBtn({ cartItems }) {
  const handleCheckout = () => {
    console.log(cartItems);
    // Perform the checkout action, e.g., redirect to a checkout page
  };

  return (
    <Button variant="dark" onClick={handleCheckout}>
      To Checkout
    </Button>
  );
}


