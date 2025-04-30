import React from 'react';
import { FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'; 

function Kids_Shoe() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Kids Shoes Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Shoe Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-transform">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Kids Shoe" 
            className="w-40 h-40 object-cover mb-5 rounded-xl"
          />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Cool Kids Sneakers</h2>

          <div className="text-gray-600 text-sm mb-4">
            <p>Quantity: 50 pieces</p>
            <p>Discount: 10% off</p>
          </div>

          <div className="flex gap-4 mt-auto">
            {/* Order Button */}
            <button className="bg-green-500 p-3 rounded-full text-white hover:bg-green-600">
              <FaMoneyBillWave size={20} />
            </button>

       
            <button className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600">
              <FaShoppingCart size={20} />
            </button>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Kids_Shoe;
