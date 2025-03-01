import React from "react";
import { FaSearch } from "react-icons/fa";

function Home() {
  return (
    <div className="bg-blue-700 p-2 flex justify-center">
      <div className="w-[600px] bg-white rounded shadow-md">
        <div className="flex items-center gap-2 p-2 border-b">
          {/* Shop by Department Dropdown */}
          <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Shop</button>
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 text-sm rounded border"
            />
            <button className="absolute right-2 top-2 text-gray-600 text-xs">
              <FaSearch />
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex text-xs">
          {["ALOT", "New", "Summer", "Fire Sale", "Local", "Brands", "Clearance"].map((tab, index) => (
            <button
              key={index}
              className={`flex-1 px-2 py-1 ${tab === "Fire Sale" ? "bg-red-600 text-white" : "hover:bg-gray-200"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
