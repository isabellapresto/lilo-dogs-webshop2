import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "../src/App.css"
import {  CartProvider } from "../Context/CartContext.tsx"
import { UserProvider } from "../Context/UserContext.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </UserProvider>
  </React.StrictMode>,
)
