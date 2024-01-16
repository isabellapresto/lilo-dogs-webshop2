import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../Hero/Hero';
import Bestsellers from '../BestSellers/BestSellers';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import ProductDetails from '../ProductDetails/ProductDetails';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
import CheckOutBtn from '../Cart/CheckOutBtn';

import CheckOutSuccess from '../CheckOutSuccess';
// import Carousel from "../Carousel/Carousel"

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
              {/* <Carousel /> */}
            </div>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/category/:category" element={<CategoryProducts />} /> 
        <Route path="/pay" element={<CheckOutBtn/>} /> 
        <Route path="/success" element={<CheckOutSuccess />} /> 
      </Routes>
    </div>
  );
};

export default MainContent;
