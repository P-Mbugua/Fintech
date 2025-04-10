import React, { useState } from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

const mockWatches = [
  {
    id: 1,
    name: "Classic Men's Watch",
    category: "Men",
    price: 4500,
    discount: 10,
    stock: 12,
    rating: 4.5,
    image: "/images/mens-watch.jpg",
    gifts: [
      { name: "Free Gift Box", type: "box", isFree: true },
      { name: "Silver Chain", type: "chain", price: 500, discount: 15 },
    ],
  },
  {
    id: 2,
    name: "Elegant Ladies Watch",
    category: "Ladies",
    price: 3500,
    discount: 20,
    stock: 5,
    rating: 4.8,
    image: "/images/ladies-watch.jpg",
    gifts: [
      { name: "Free Gift Box", type: "box", isFree: true },
      { name: "Gold Chain", type: "chain", price: 700, discount: 10 },
    ],
  },
  {
    id: 3,
    name: "Kids Digital Watch",
    category: "Children",
    price: 1500,
    discount: 5,
    stock: 20,
    rating: 4.2,
    image: "/images/kids-watch.jpg",
    gifts: [
      { name: "Free Gift Box", type: "box", isFree: true },
    ],
  },
];

const categories = ['All', 'Men', 'Ladies', 'Children'];

const Watches = () => {
  const [filter, setFilter] = useState('All');

  const filteredWatches =
    filter === 'All'
      ? mockWatches
      : mockWatches.filter((watch) => watch.category === filter);

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
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">⌚ Our Watch Collection</h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-5 py-2 rounded-full transition-all duration-300 font-medium shadow-sm ${
              filter === category
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white text-gray-800 border hover:bg-yellow-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Watches Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWatches.map((watch) => {
          const discountedPrice = watch.price - (watch.discount / 100) * watch.price;

          return (
            <div
              key={watch.id}
              className="bg-white rounded-2xl shadow-xl p-4 hover:scale-105 transition-transform duration-300 relative"
            >
              {watch.discount > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  -{watch.discount}%
                </span>
              )}
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-bold text-gray-800">{watch.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{watch.category}</p>

              <div className="flex items-center gap-2 mb-1">
                <p className="text-green-600 text-lg font-semibold">
                  KES {discountedPrice.toLocaleString()}
                </p>
                {watch.discount > 0 && (
                  <p className="line-through text-sm text-gray-400">
                    KES {watch.price.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-600">In stock: {watch.stock}</span>
                <span>{renderStars(watch.rating)}</span>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">
                  Order
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition duration-200">
                  Buy Now
                </button>
              </div>

              {/* Gifts Section */}
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-lg text-gray-700 mb-3">Included Gifts</h3>
                {watch.gifts.map((gift, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-3"
                    >
                      <span className="text-gray-600">{gift.name}</span>
                      <span className={`text-green-600 ${gift.isFree ? 'font-bold' : ''}`}>
                        {gift.isFree ? 'Free' : `KES ${gift.price.toLocaleString()}`}
                        {gift.discount > 0 && (
                          <span className="line-through text-sm text-gray-400">
                            KES {gift.price.toLocaleString()}
                          </span>
                        )}
                      </span>
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

export default Watches;
