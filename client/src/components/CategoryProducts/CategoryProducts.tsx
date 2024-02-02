import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterfaces';
import ProductList from '../ProductList/ProductList';

const CategoryProducts: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/category/${category}`);
  
        if (!response.ok) {
          console.error(`Fetch failed with status ${response.status}`);
          return;
        }
  
        const data = await response.json();

        setProducts(data);  
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };
  
    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="container mt-4">
      <ProductList products={products} />
    </div>
  );
};

export default CategoryProducts;
