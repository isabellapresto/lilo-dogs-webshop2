import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { Product } from '../src/Interfaces/ProductInterfaces';
import { CartItem } from '../src/Interfaces/CartItemInterface';

// Hook för att använda localStorage
const useLocalStorage = (key: string, initialValue: never[]) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue = (newValue: unknown) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartContextProps {
  addToCart: (product: Product, quantity: number) => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  createOrder: () => Promise<void>;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  handlePayment: () => void;
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

// export type CartItem = {
//   quantity: number;
//   product: Product;
// };

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //useLocalStorage-hook för att spara varukorgen
  const [cartItems, setCartItems] = useLocalStorage('shopping-cart', []);

  // Funktion för att lägga till en produkt i varukorgen
// Funktion för att lägga till en produkt i varukorgen
const addToCart = (product: Product, quantity: number) => {
  const cartItem: CartItem = {
    ...product, quantity,
    userEmail: ''
  }; // Uppdaterad här för att inkludera hela produktobjektet
  const updatedCart = [...cartItems, cartItem];
  setCartItems(updatedCart);
  console.log("updated cart!!!!", updatedCart);
};


  // Funktion för att uppdatera kvantiteten av en produkt i varukorgen
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item: { product: { _id: string; }; }) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  // Funktion för att ta bort en produkt från varukorgen
  const removeProduct = (productId: string) => {
    const updatedCart = cartItems.filter((item: { product: { _id: string; }; }) => item.product._id !== productId);
    setCartItems(updatedCart);
  };

  // Funktion för att öka kvantiteten av en produkt i varukorgen
  const increaseQuantity = (productId: string) => {
    const product = cartItems.find((item: { product: { _id: string; }; }) => item.product._id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  // Funktion för att minska kvantiteten av en produkt i varukorgen
  const decreaseQuantity = (productId: string) => {
    const product = cartItems.find((item: { product: { _id: string; }; }) => item.product._id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  //Handle payment- redirect to Stripe
//Handle payment- redirect to Stripe
async function handlePayment() {
  try {
    const response = await fetch("http://localhost:3001/api/orders/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: cartItems.map((item: CartItem) => ({ quantity: item.quantity, product: item })) }),
    });

    if (response.ok) {
      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId);
      window.location = url;
    } else {
      console.error('Failed to create checkout session.');
    }
  } catch (error) {
    console.error('An error occurred in handlePayment:', error);
  }
}




  
// Funktion skapa beställning och omdirigea till Stripe Checkout 
const createOrder = async () => {
  try {
    // Skapa en beställning
    console.log('Sending cartItems:', cartItems);
    const response = await fetch('http://localhost:3001/api/orders/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems })
    
    });

    if (response.ok) {
 
      const orderData = await response.json();

      // Hämta sessionId från orderData för omdirigering till Stripe Checkout
      const { sessionId } = orderData || {};

      // Kontrollera att sessionId är definierad
      if (!sessionId) {
        console.error('sessionId is undefined in orderData:', orderData);
    
        return;
      }

      // Omdirigering till Stripe Checkout med hjälp av sessionId
      window.location.href = `https://checkout.stripe.com/checkout/session/${sessionId}`;
     
      clearCart();
   
    } else {
      console.error('Failed to create order.');
      
    }
  } catch (error) {
    console.error('An error occurred:', error);
   
  }
};
const clearCart = () => {
  setCartItems([]); // Tömmer kundvagnen genom att sätta cartItems till en tom array
};



  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, removeProduct, createOrder, increaseQuantity, decreaseQuantity, handlePayment }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
