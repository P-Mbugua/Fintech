import React, { useState } from 'react';
import { FaShoppingCart, FaTag, FaCheckCircle } from 'react-icons/fa'; // Import icons
import AddToCartButton from '../../components/Buttons/AddToCartButton';

function Health() {
  const [cart, setCart] = useState([]); // State to track cart items
  const [fetchedProductDetails, setFetchedProductDetails] = useState(null);

  const healthProducts = [
    { id: 1, name: 'Vitamin C Supplements', price: 'KES 1,500', discountPrice: 'KES 1,200', image: 'vitamin-c.jpg', available: 10 },
    { id: 2, name: 'Yoga Mat', price: 'KES 2,000', discountPrice: 'KES 1,800', image: 'yoga-mat.jpg', available: 5 },
    { id: 3, name: 'Protein Powder', price: 'KES 4,000', discountPrice: 'KES 3,600', image: 'protein-powder.jpg', available: 2 },
    { id: 4, name: 'Fitness Tracker', price: 'KES 7,000', discountPrice: 'KES 6,500', image: 'fitness-tracker.jpg', available: 7 },
    { id: 5, name: 'Massage Gun', price: 'KES 12,000', discountPrice: 'KES 10,500', image: 'massage-gun.jpg', available: 3 },
    { id: 6, name: 'Healthy Snack Box', price: 'KES 1,200', discountPrice: 'KES 1,000', image: 'healthy-snack-box.jpg', available: 20 }
  ];

  // Simulate fetching product details
  const fetchProductDetails = (productId) => {
    const product = healthProducts.find(p => p.id === productId);
    setFetchedProductDetails(product);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productExists = updatedCart.find((item) => item.id === product.id);

      if (!productExists) {
        updatedCart.push(product);
        fetchProductDetails(product.id); // Fetch and display product details after adding to cart
        alert(`${product.name} added to cart!`);
      } else {
        alert(`${product.name} is already in your cart.`);
      }
      return updatedCart;
    });
  };

  // Calculate total price of items in the cart
  const total01 = cart.reduce((total, item) => {
    const price = parseFloat(item.discountPrice.replace('KES ', '').replace(',', ''));
    return total + price;
  }, 0);

  return (
    <div className="health py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Health & Wellness Products</h1>
      <div className="health-products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {healthProducts.map((product) => (
          <div
            key={product.id}
            className="health-product-card bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h3>

              {/* Price and Discount */}
              <div className="flex items-center mb-4">
                <p className="text-gray-500 line-through mr-2">{product.price}</p>
                <p className="text-red-500 font-semibold">{product.discountPrice}</p>
              </div>

              {/* Product Availability */}
              <div className="flex items-center mb-4 text-gray-600">
                <FaCheckCircle className="mr-2 text-green-500" />
                <span>{product.available} items available</span>
              </div>

              {/* Discount Tag */}
              <div className="flex items-center mb-4 text-gray-500">
                <FaTag className="mr-2" />
                <span>Special Discount</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4">
                {/* Add to Cart Button */}
                <AddToCartButton 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                  total01={total01} // Pass total01 as a prop
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-lg">
        {cart.length > 0 ? (
          <p>You have {cart.length} item(s) in your cart.</p>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Health;
