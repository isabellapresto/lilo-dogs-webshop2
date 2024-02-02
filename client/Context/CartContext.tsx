import React, { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Product } from '../src/Interfaces/ProductInterfaces';
import { CartItem } from '../src/Interfaces/CartItemsInterface';

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

// Context för varukorgen
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
  cartItemCount: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('shopping-cart', []);
  const [cartItemCount, setCartItemCount] = useState(0);

  //Beräkna antalet produkter i varukorgen
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Uppdatera cartItemCount när cartItems ändras
  useEffect(() => {
    setCartItemCount(getCartItemCount());
  }, [cartItems]);

  // Funktion för att lägga till en produkt i varukorgen
  const addToCart = (product: Product, quantity: number) => {
    const cartItem: CartItem= {
      quantity: quantity,
      product: product,
      _id: '',
      price: 0
    };

    const updatedCart = [...cartItems, { ...cartItem, quantity }];

    setCartItems(updatedCart);
    setCartItemCount(getCartItemCount() + quantity);
  };

  // Funktion för att uppdatera kvantiteten av en produkt i varukorgen
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item: { product: { _id: string; }; }) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length); 
  };

  // Funktion för att ta bort en produkt från varukorgen
  const removeProduct = (productId: string) => {
    const updatedCart = cartItems.filter((item: { product: { _id: string; }; }) => item.product._id !== productId);
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length); 
  };

  // Funktion för att öka kvantiteten av en produkt i varukorgen
  const increaseQuantity = (productId: string) => {
    const product = cartItems.find((item: { product: { _Id: string; }; }) => item.product._Id === productId);
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

  // Funktion för att hantera betalning och omdirigera till Stripe
  async function handlePayment() {
    const response = await fetch("http://localhost:3001/api/orders/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });
 
    // Hämta session-id från svaret och spara det i localStorage
    const { url, id } = await response.json();
    localStorage.setItem("session-id", id);

    // Omdirigera till Stripe Checkout efter en fördröjning på 2 sekunder
    // setTimeout(() => {
      window.location.replace(url);
    // }, 2000);
  }

  // Funktion för att skapa en beställning och omdirigera till Stripe Checkout
  const createOrder = async () => {
    try {
      // Skapa en beställning genom att skicka varukorgen till servern
      const response = await fetch('http://localhost:3001/api/orders/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems })
      });

      if (response.ok) {
        // Hämta orderdata från svaret
        const orderData = await response.json();
        // Hämta sessionId från orderData för omdirigering till Stripe Checkout
        const { sessionId } = orderData || {};

        // Kontrollera att sessionId är definierad
        if (!sessionId) {
          console.error('sessionId is undefined in orderData:', orderData);
          return;
        }

        // Omdirigera till Stripe Checkout med sessionId
        window.location.href = `https://checkout.stripe.com/checkout/session/${sessionId}`;
     
        // Rensa varukorgen 
        clearCart();
      } else {
        console.error('Failed to create order.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Funktion för att rensa varukorgen
  const clearCart = () => {
    setCartItems([]); 
    setCartItemCount(0); 
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, removeProduct, createOrder, increaseQuantity, decreaseQuantity, handlePayment, cartItemCount }}>
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
