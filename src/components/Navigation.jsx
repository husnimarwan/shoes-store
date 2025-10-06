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
          <label htmlFor="search-input" className="search-icon-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </label>
          <input id="search-input" type="search" placeholder="Search for products..." />
          <button className="close-search-btn" onClick={() => document.activeElement.blur()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
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