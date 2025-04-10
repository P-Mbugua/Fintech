import React, { useState } from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

const mockTVs = [
  {
    id: 1,
    name: "Samsung 55-inch 4K Smart TV",
    brand: "Samsung",
    price: 50000,
    discount: 15,
    stock: 8,
    rating: 4.6,
    image: "/images/samsung-tv.jpg", // Add image path or URL here
    accessories: [
      { name: "Samsung TV Stand", price: 5000, discount: 10, stock: 5 },
      { name: "Samsung Antenna", price: 1500, discount: 5, stock: 10 },
    ],
  },
  {
    id: 2,
    name: "Vitron 40-inch HD LED TV",
    brand: "Vitron",
    price: 18000,
    discount: 10,
    stock: 15,
    rating: 4.3,
    image: "/images/vitron-tv.jpg", // Add image path or URL here
    accessories: [
      { name: "Vitron TV Stand", price: 2500, discount: 0, stock: 12 },
      { name: "Vitron Antenna", price: 1000, discount: 5, stock: 8 },
    ],
  },
  {
    id: 3,
    name: "LG 65-inch OLED TV",
    brand: "LG",
    price: 120000,
    discount: 20,
    stock: 5,
    rating: 4.8,
    image: "/images/lg-tv.jpg", // Add image path or URL here
    accessories: [
      { name: "LG TV Stand", price: 10000, discount: 15, stock: 2 },
      { name: "LG Antenna", price: 2000, discount: 10, stock: 5 },
    ],
  },
];

const brands = ['All', 'Samsung', 'Vitron', 'LG'];

const TVs = () => {
  const [filter, setFilter] = useState('All');

  const filteredTVs =
    filter === 'All'
      ? mockTVs
      : mockTVs.filter((tv) => tv.brand === filter);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
        {halfStar && <StarHalf size={16} fill="currentColor" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <StarOff key={i} size={16} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">📺 TV Collection</h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setFilter(brand)}
            className={`px-5 py-2 rounded-full transition-all duration-300 font-medium shadow-sm ${
              filter === brand
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white text-gray-800 border hover:bg-yellow-100'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* TVs Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTVs.map((tv) => {
          const discountedPrice = tv.price - (tv.discount / 100) * tv.price;

          return (
            <div
              key={tv.id}
              className="bg-white rounded-2xl shadow-xl p-4 hover:scale-105 transition-transform duration-300 relative"
            >
              {tv.discount > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  -{tv.discount}%
                </span>
              )}
              <img
                src={tv.image}
                alt={tv.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-bold text-gray-800">{tv.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{tv.brand}</p>

              <div className="flex items-center gap-2 mb-1">
                <p className="text-green-600 text-lg font-semibold">
                  KES {discountedPrice.toLocaleString()}
                </p>
                {tv.discount > 0 && (
                  <p className="line-through text-sm text-gray-400">
                    KES {tv.price.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-600">In stock: {tv.stock}</span>
                <span>{renderStars(tv.rating)}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                  Order
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition duration-200">
                  Buy Now
                </button>
              </div>

              {/* Accessories Section */}
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-lg text-gray-700 mb-3">Related Accessories</h3>
                {tv.accessories.map((item) => {
                  const discountedAccessoryPrice =
                    item.price - (item.discount / 100) * item.price;

                  return (
                    <div key={item.name} className="flex justify-between items-center mb-3">
                      <div className="text-gray-600">{item.name}</div>
                      <div className="flex items-center gap-2">
                        <p className="text-green-600 font-semibold">
                          KES {discountedAccessoryPrice.toLocaleString()}
                        </p>
                        {item.discount > 0 && (
                          <p className="line-through text-sm text-gray-400">
                            KES {item.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TVs;
