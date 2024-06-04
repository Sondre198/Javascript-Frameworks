import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart">
      <div className="cart-icon">
        🛒
        {cart.length > 0 && <span>{cart.length}</span>}
      </div>
    </Link>
  );
};

export default CartIcon;
