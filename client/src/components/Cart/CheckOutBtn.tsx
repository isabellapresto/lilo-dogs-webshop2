import React from 'react';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51NmtUiLnIY6rREyZe0PIrHAqcV7ZhxYlZoQwRjrTaFiCxtrtXhGgB4VjjOFCjRAA7ploZF2cEPm2ULLFqPvzHYx7000DMe3ouP');

const CheckOutBtn = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Skapa en betalning med tokenen från kreditkortet
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      // Skicka tokenen till din server för att hantera betalningen
      handlePayment(token);
    }
  };

  const handlePayment = async (token) => {
    // Skicka tokenen till din server för att hantera betalningen
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount: 2000 }), // justera beloppet efter ditt behov
      });

      if (response.ok) {
        console.log('Betalningen lyckades!');
      } else {
        console.error('Misslyckades med att göra betalningen.');
      }
    } catch (error) {
      console.error('Ett fel uppstod:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" variant="dark">To Checkout </Button>
    </form>
  );
};

export default CheckOutBtn;
