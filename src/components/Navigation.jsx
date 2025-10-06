import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h1>Snickers</h1>
        </Link>
        <div className="search-container">
          <input type="search" placeholder="Search for products..." />
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              🛒
              {cart.items.length > 0 && (
                <span className="cart-count">{cart.items.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;