import React, { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// Create CartProvider to wrap your app and provide the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const productIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (productIndex === -1) {
        // Product not found in cart, add it
        return [...prevCart, { ...product, quantity: 1 }];
      } else {
        // Product already in cart, increment quantity
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
