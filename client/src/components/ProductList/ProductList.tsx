import React, { useState, useEffect } from 'react';
import { Product } from '../../Interfaces/ProductInterfaces';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');

        if (!response.ok) {
          console.error(`Fetch failed with status ${response.status}`);
          return;
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container container mt-4">
      {/* <h2 className="text-center">Product List</h2> */}
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
              <div className="card border-0">
                <div className="square-image-container">
                  <img
                    src={product.image}
                    alt={product.productName}
                  />
                </div>
                <div className="card-body text-center">
                  <p className="card-title">{product.productName}</p>
                  <p className="card-text">€ {product.price}</p>
                  <p className="card-text small">{product.rating}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
