import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="cart">
        <h2>Your Shopping Cart</h2>
        <div className="cart-empty-container">
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total: ${cart.total.toFixed(2)}</h3>
          <button 
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <button 
            className="clear-cart-btn" 
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;