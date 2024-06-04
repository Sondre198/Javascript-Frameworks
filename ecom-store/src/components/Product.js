import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../CartContext';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    axios.get(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then(response => {
        setProduct(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
        setError(error.message);
      });
  }, [id]);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  const { title, description, image, price, discountedPrice, reviews } = product;
  const discount = price && discountedPrice && price > discountedPrice ? ((price - discountedPrice) / price) * 100 : 0;

  return (
    <div className="product">
      <h1>{title}</h1>
      <img 
        src={image && image.url ? image.url : 'https://via.placeholder.com/300'} 
        alt={title || "Product image"} 
        className="product-image" 
      />
      <p>{description}</p>
      <p>Price: ${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)} 
        {discount > 0 && <span> ({discount.toFixed(0)}% off)</span>}
      </p>
      <button onClick={addToCart}>Add to Cart</button>
      {reviews && reviews.length > 0 && (
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p><strong>{review.username}:</strong> {review.description} (Rating: {review.rating})</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Product;
