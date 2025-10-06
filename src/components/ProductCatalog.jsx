import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: "Running Shoes Pro",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400",
    description: "High-performance running shoes with extra cushioning and support",
    category: "Running"
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400",
    description: "Comfortable everyday sneakers for casual wear",
    category: "Casual"
  },
  {
    id: 3,
    name: "Formal Oxford",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400",
    description: "Elegant formal shoes for business and special occasions",
    category: "Formal"
  },
  {
    id: 4,
    name: "Basketball High-top",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400",
    description: "Ankle support basketball shoes with superior grip",
    category: "Sports"
  },
  {
    id: 5,
    name: "Hiking Boots",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400",
    description: "Durable waterproof hiking boots for outdoor adventures",
    category: "Outdoor"
  },
  {
    id: 6,
    name: "Sandals Summer",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1677922336195-53d4e9020f69?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lightweight and comfortable summer sandals",
    category: "Casual"
  }
];

const ProductCatalog = () => {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className="product-catalog">
      <h2>Featured Snickers</h2>
      <p className="catalog-description">
        Explore our handpicked selection of premium snickers, crafted for style, comfort, and durability.
      </p>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;