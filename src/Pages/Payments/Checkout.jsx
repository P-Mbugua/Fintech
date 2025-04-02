import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { product } = location.state || {}; // Retrieve the product passed from the OrderDetails page

  if (!product) {
    return <div className="text-center py-10 text-xl font-semibold">No product data available.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full md:w-80 h-80 object-contain border rounded-lg shadow-md" 
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-700">Price: <span className="font-bold text-red-600">KSh {product.price.toLocaleString()}</span></p>
            <p className="text-sm text-gray-500 line-through">Old Price: KSh {product.oldPrice.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{product.stock} items left in stock</p>
            <p className="text-red-600 text-sm">Discount: {product.discount}% off</p>

            {/* Checkout Form (Placeholder) */}
            <button 
              className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
