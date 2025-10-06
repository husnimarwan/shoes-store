import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  total: 0
};

// Cart reducer to handle different actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        const newTotal = state.total + action.payload.price;
        return { items: updatedItems, total: newTotal };
      } else {
        // If item doesn't exist, add it with quantity 1
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        const newTotal = state.total + action.payload.price;
        return { items: newItems, total: newTotal };
      }

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      const updatedItemsAfterRemoval = state.items.filter(item => item.id !== action.payload.id);
      const newTotalAfterRemoval = state.total - (itemToRemove.price * itemToRemove.quantity);
      return { items: updatedItemsAfterRemoval, total: newTotalAfterRemoval };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const quantityDiff = action.payload.quantity - item.quantity;
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      
      const priceDiff = state.items.reduce((diff, item) => {
        if (item.id === action.payload.id) {
          return diff + (item.price * (action.payload.quantity - item.quantity));
        }
        return diff;
      }, 0);
      
      return { 
        items: updatedItems, 
        total: state.total + priceDiff 
      };

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add to cart function
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Remove from cart function
  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart({ id: productId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  // Clear cart function
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext };