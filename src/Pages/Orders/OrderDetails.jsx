import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToCartButton from '../../components/Buttons/AddToCartButton';

function OrderDetails() {
  const location = useLocation();
  const { product } = location.state || {}; // Get the product details from the passed state
  const navigate = useNavigate(); // To navigate to the checkout page

  if (!product) {
    return <div className="text-center py-10 text-xl font-semibold">No product data available.</div>;
  }

  // Navigate to checkout page
  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="bg-gray-50  p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Order Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Product Image */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full md:w-80 h-80 object-contain border rounded-lg shadow-md" 
            />
          </div>

          {/* Right Column: Product Information */}
          <div className="flex flex-col justify-between space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-700">Price: <span className="font-bold text-red-600">KSh {product.price.toLocaleString()}</span></p>
            <p className="text-sm text-gray-500 line-through">Old Price: KSh {product.oldPrice.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{product.stock} items left in stock</p>
            <p className="text-red-600 text-sm">Discount: {product.discount}% off</p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {/* Buy Now Button */}
              <button 
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition duration-300"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              {/* Add to Cart Button - Use the AddToCartButton component here */}
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
