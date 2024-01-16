import React, { createContext, useContext, useState } from 'react';
import { Product } from '../../client/src/Interfaces/ProductInterfaces';

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product, quantity: number) => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void; 
  removeProduct: (productId: string) => void; 
}

export type CartItem = {
  id: string;
  quantity: number;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const updatedCart = [...cart, { ...product, quantity }];
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    // Skapar en uppdaterad kundvagn genom att mappa igenom den befintliga kundvagnen och uppdatera kvantiteten för den specifika produkten.
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
  
    // Uppdaterar kundvagnens tillstånd.
    setCart(updatedCart);
  };

  const removeProduct = (productId: string) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };
  
  

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity,removeProduct }}>
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
