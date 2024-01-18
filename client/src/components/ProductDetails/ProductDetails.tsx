import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../Interfaces/ProductInterfaces';
import { useCart } from '../../../Context/CartContext'; 
import "./ProductDetails.css"


const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    console.log (product)
    if (product) {
      addToCart(product, quantity);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiUrl = `http://localhost:3001/api/products/${id}`;
        console.log('Fetching data from:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(`Fetch failed with status ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log('Received data:', data);

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-details-container'>
      <div className="container mt-4">
        <div className="row">
          <div className="product-image-container col-md-6">
            <img
              src={product.image}
              className="product-image img-fluid 100w- product-image"
              alt={product.productName}
            />
          </div>
          <div className="product-text col-md-6">
            <h2>{product.productName}</h2>
            <p className="price">€ {product.price} </p>
            <div className="rating">{product.rating}</div>
            <p>{product.description}</p>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <button className="quantity">{quantity}</button>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="btn btn-dark mt-2" onClick={addToCartHandler}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;