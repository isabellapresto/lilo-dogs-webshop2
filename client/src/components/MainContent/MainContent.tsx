import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../Hero/Hero';
import Bestsellers from '../BestSellers/BestSellers';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import ProductDetails from '../ProductDetails/ProductDetails';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
// import CheckOutBtn from '../Cart/CheckOutBtn';
import CheckOutSuccess from '../CheckOutSuccess/CheckOutSuccess';
import MyOrders from '../MyOrders/MyOrders';

const MainContent: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <Bestsellers />
              <Categories />
            </div>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        {/* Include CheckOutBtn directly without Elements wrapper */}
        {/* <Route path="/pay" element={<CheckOutBtn />} /> */}
        <Route path="/success" element={<CheckOutSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
};

export default MainContent;
