import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function HomeAccessories() {
  const accessories = [
    {
      id: 1,
      name: "Lamp",
      price: "KES 2,000",
      image: "lamp.jpg",
      rating: 4.5,
      reviews: 32,
      description:
        "Elegant table lamp that brightens your space with a warm, cozy glow and a touch of sophistication.",
    },
    {
      id: 2,
      name: "Vase",
      price: "KES 1,500",
      image: "vase.jpg",
      rating: 4.2,
      reviews: 21,
      description:
        "Beautiful ceramic vase with a sleek finish — perfect for fresh flowers or as a centerpiece.",
    },
    {
      id: 3,
      name: "Cushion",
      price: "KES 1,200",
      image: "cushion.jpg",
      rating: 4.8,
      reviews: 47,
      description:
        "Soft and luxurious cushion made from premium fabric — comfort and style combined.",
    },
    {
      id: 4,
      name: "Clock",
      price: "KES 3,000",
      image: "clock.jpg",
      rating: 4.6,
      reviews: 38,
      description:
        "Modern wall clock that blends elegance with precision to suit any decor style.",
    },
    {
      id: 5,
      name: "Table",
      price: "KES 5,000",
      image: "table.jpg",
      rating: 4.3,
      reviews: 19,
      description:
        "Minimalist wooden table with a smooth finish — perfect for your dining or workspace.",
    },
    {
      id: 6,
      name: "Curtain",
      price: "KES 1,800",
      image: "curtain.jpg",
      rating: 4.9,
      reviews: 54,
      description:
        "Elegant curtain that blocks sunlight, ensures privacy, and adds a touch of class.",
    },
  ];

  return (
    <div className="home-accessories py-16 px-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 tracking-tight">
        ✨ Stylish Home Accessories ✨
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {accessories.map((item) => (
          <div
            key={item.id}
            className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col justify-between"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Wishlist Icon */}
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:text-red-500 transition-all duration-200">
                <FaHeart size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-2 font-medium">{item.price}</p>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>

                {/* Reviews Section */}
                <div className="flex items-center mb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < Math.round(item.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      size={16}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({item.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg">
                  <FaShoppingCart /> Add to Cart
                </button>

                <button className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg">
                  🛍️ Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeAccessories;
