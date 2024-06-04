import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigate('/checkout-success');
  };
  

  const totalPrice = cart.reduce((acc, item) => acc + (item.discountedPrice || item.price) * (item.quantity || 1), 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image.url} alt={item.title} style={{ width: '100px', height: '100px' }} />
              <p>{item.title}</p>
              <p>${item.discountedPrice ? item.discountedPrice.toFixed(2) : item.price.toFixed(2)}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
