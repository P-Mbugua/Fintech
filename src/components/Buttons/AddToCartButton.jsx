import React from 'react';
import { useCart } from './CartContext'; // Import useCart hook

function AddToCartButton({ product }) {
  const { addToCart } = useCart(); // Get addToCart function from context

  const handleAddToCart = () => {
    addToCart(product); // Call the addToCart function from context
    console.log('Product added to cart:', product); // For debugging
  };

  return (
    <button
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-300"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
