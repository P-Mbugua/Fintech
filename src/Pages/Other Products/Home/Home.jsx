import React from 'react';
import { FaShoppingCart, FaTruck } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: "Non-Stick Cooking Pot",
    price: 3500,
    discount: 10,
    stock: 12,
    image: "https://via.placeholder.com/300x300", // replace with real image
  },
  {
    id: 2,
    name: "Electric Blender",
    price: 4500,
    discount: 15,
    stock: 8,
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "Cutlery Set (24pcs)",
    price: 2000,
    discount: 5,
    stock: 20,
    image: "https://via.placeholder.com/300x300",
  },
];

function Home() {
  return (
    <div className="px-4 py-8 md:px-12 lg:px-20 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Shop Kitchen Essentials</h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>

              <div className="flex items-center space-x-3 mb-2">
                <span className="text-lg font-bold text-blue-600">Ksh {product.price.toLocaleString()}</span>
                {product.discount > 0 && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-gray-500 mb-6">{product.stock} item{product.stock !== 1 && 's'} in stock</p>

              <div className="mt-auto flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  <FaTruck size={16} /> Order Now
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition">
                  <FaShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
