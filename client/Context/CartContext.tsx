import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { Product } from '../src/Interfaces/ProductInterfaces';

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartContextProps {
  // cart: Product[];             // produkter i varukorgen.
  addToCart: (product: Product, quantity: number) => void;   
  cartItems: CartItem[];       // Varukorgsobjekt med id och kvantitet
  updateQuantity: (productId: string, quantity: number) => void;  
  removeProduct: (productId: string) => void;   
  createOrder: () => Promise<void>;   
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  handlePayment:() => void;
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

export type CartItem = {
  // _id: string;
  quantity: number;
  // productName: string;
  // price: number;
  // image: string
  product: Product

};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State för att hålla produkterna i varukorgen
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Funktion för att lägga till en produkt i varukorgen
  const addToCart = (product: Product, quantity: number) => {
    const cartItem: CartItem= {   quantity: quantity,   product: product };
    const updatedCart = [...cartItems, { ...cartItem, quantity }];
    setCartItems(updatedCart);
    console.log(updatedCart)
  };

  // Funktion för att uppdatera kvantiteten av en produkt i varukorgen
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  // Funktion för att ta bort en produkt från varukorgen
  const removeProduct = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.product._id !== productId);
    setCartItems(updatedCart);
  };

  // Funktion för att öka kvantiteten av en produkt i varukorgen
  const increaseQuantity = (productId: string) => {
    const product = cartItems.find(item => item.product._id === productId);
    if (product) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  // Funktion för att minska kvantiteten av en produkt i varukorgen
  const decreaseQuantity = (productId: string) => {
    const product = cartItems.find(item => item.product._id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  //Handle payment- redirect to Stripe
  async function handlePayment() {
    // const cartToStripe = cartItems.map((item) => ({
    
    //   quantity: item.quantity,
  
    // }));

    // console.log('Cart items to Stripe:', cartToStripe);
 

 
    const response = await fetch("http://localhost:3001/api/orders/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });
 
    // if (!response.ok) {
    //   return;
    // }
 
    //Save session id to localStorage
    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId);
    window.location = url;
  }





  
// Funktion skapa beställning och omdirigea till Stripe Checkout 
const createOrder = async () => {
  try {
    // Skapa en beställning
    const response = await fetch('http://localhost:3001/api/orders/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
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
    } else {
      console.error('Failed to create order.');
      
    }
  } catch (error) {
    console.error('An error occurred:', error);
   
  }
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
