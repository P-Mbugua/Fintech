import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { name: "Back To Varsity", img: "/path-to-varsity-icon.png" },
  { name: "New Arrivals", img: "/path-to-new-arrivals-icon.png" },
  { name: "Electronics", img: "/path-to-electronics-icon.png" },
  { name: "Fashion", img: "/path-to-fashion-icon.png" },
  { name: "Home & Kitchen", img: "/path-to-home-kitchen-icon.png" },
];

function FeaturedCategories() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Featured Categories</h2>

      {/* Desktop View (Grid Layout - Visible on larger screens) */}
      <div className="hidden md:flex justify-center space-x-8">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={category.img} alt={category.name} className="w-16 h-16 object-cover" />
            <p className="text-sm mt-2">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile View (Horizontal Scroll + Arrows) */}
      <div className="relative md:hidden">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>

        {/* Scrollable Categories */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-6 px-6"
        >
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0 w-24">
              <img src={category.img} alt={category.name} className="w-16 h-16 object-cover" />
              <p className="text-sm mt-2 text-center">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default FeaturedCategories;
