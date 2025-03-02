import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoShirtOutline, IoPhonePortraitOutline, IoHomeOutline } from "react-icons/io5";

function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const departments = [
    { name: "Electronics", subLinks: ["Phones", "Laptops", "Accessories"], icon: <IoPhonePortraitOutline size={24} /> },
    { name: "Clothing", subLinks: ["Men", "Women", "Kids"], icon: <IoShirtOutline size={24} /> },
    { name: "Home & Kitchen", subLinks: ["Furniture", "Appliances", "Decor"], icon: <IoHomeOutline size={24} /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % departments.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [departments.length]);

  return (
    <div className="flex justify-center items-center p-4 bg-blue-600">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md">
        {/* Top Section - Visible only on desktop */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center border-b border-gray-300 p-2 gap-2 sm:gap-4">
          {/* Dropdown Menu */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 text-white w-full sm:w-auto px-4 py-2 flex items-center justify-between rounded-md"
            >
              Shop by Department
              <IoMdArrowDropdown className="ml-2" />
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {departments.map((dept, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => setOpenSubMenu(openSubMenu === index ? null : index)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                    >
                      {dept.name}
                      <IoMdArrowDropdown className="text-gray-500" />
                    </button>

                    {/* Submenu */}
                    {openSubMenu === index && (
                      <div className="bg-gray-100 rounded-md mt-1">
                        {dept.subLinks.map((subLink, subIndex) => (
                          <a
                            key={subIndex}
                            href={`#${subLink.toLowerCase()}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            {subLink}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="w-full">
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

        {/* Navigation Tabs (Scrollable on Mobile) */}
        <div className="overflow-x-auto flex bg-gray-200 whitespace-nowrap">
          {["ALOT For Less", "New Arrivals", "Summer", "Fire Sale", "Small Local Sellers", "Brands Store", "Clearance"].map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-center text-sm font-medium ${
                item === "Fire Sale" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile View - Featured Categories */}
        <div className="sm:hidden p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Featured Categories</h2>
          <div className="flex items-center overflow-x-auto space-x-4 py-2">
            {departments.map((dept, index) => (
              <div key={index} className={`flex flex-col items-center cursor-pointer transition-transform ${index === currentIndex ? "scale-110" : "scale-100"}`}>
                <div className="bg-gray-100 p-4 rounded-full shadow-md">{dept.icon}</div>
                <p className="text-sm font-medium mt-1">{dept.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
