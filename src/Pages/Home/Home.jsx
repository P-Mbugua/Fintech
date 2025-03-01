import React from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import { IoMdArrowDropdown } from "react-icons/io"; // Dropdown icon

function Home() {
  return (
    <div className="bg-blue-600  flex justify-center items-center p-4">
      {/* Container */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md">
        {/* Top Section */}
        <div className="flex items-center border-b border-gray-300 p-2">
          {/* Dropdown Menu */}
          <div className="relative">
            <button className="bg-gray-800 text-white px-4 py-2 flex items-center rounded-md">
              Shop by Department
              <IoMdArrowDropdown className="ml-2" />
            </button>
            {/* Dropdown Content */}
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg border rounded-md hidden">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Virtual Shopping Assistants
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Appliances
                </li>
              </ul>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-200">
          {[
            "ALOT For Less",
            "New Arrivals",
            "Summer",
            "Fire Sale",
            "Small Local Sellers",
            "Brands Store",
            "Clearance",
          ].map((item, index) => (
            <button
              key={index}
              className={`flex-1 px-4 py-2 text-center text-sm font-medium ${
                item === "Fire Sale"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
