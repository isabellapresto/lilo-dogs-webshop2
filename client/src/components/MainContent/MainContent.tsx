import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../Hero/Hero';
import Bestsellers from '../BestSellers/BestSellers';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import ProductDetails from '../ProductDetails/ProductDetails';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
import CheckOutSuccess from '../CheckOutSuccess/CheckOutSuccess';
import MyOrders from '../MyOrders/MyOrders';

const MainContent: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Bestsellers />
              <Categories />
            </>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/success" element={<CheckOutSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
};

export default MainContent;
