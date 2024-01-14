import React, { createContext, useContext, useState } from 'react';
import { Product } from '../../client/src/Interfaces/ProductInterfaces';

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product, quantity: number) => void;
  cartItems: CartItem[];
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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
