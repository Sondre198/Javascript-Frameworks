import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import App from './App.js';
import { CartProvider } from './CartContext';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <CartProvider>
      <App />
    </CartProvider>
  );
} else {
  console.error('Root container missing in HTML.');
}
