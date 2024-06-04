import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact Page</Link></li>
            <li><CartIcon /></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2023 Ecom Store</p>
      </footer>
    </div>
  );
};

export default Layout;
