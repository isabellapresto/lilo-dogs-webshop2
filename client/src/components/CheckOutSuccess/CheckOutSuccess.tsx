import './CheckOutSuccess.css';
import { useEffect } from 'react';

export default function CheckOutSuccess() {
  useEffect(() => { 

    fetch("http://localhost:3001/api/orders/verify-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sessionId:localStorage.getItem("session-id"),cart: localStorage.getItem("shopping-cart") }),
    });

   }, []);

  return (
    <div>
      <div className='centered-text'>Thank you for your purchase! <br/>
      <p>An order confirmation has been sent to your email</p> ♡</div>
    </div>
  );
}
