import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const departments = [
    { name: "Electronics", subLinks: ["Phones", "Laptops", "Accessories"] },
    { name: "Clothing", subLinks: ["Men", "Women", "Kids"] },
    { name: "Home & Kitchen", subLinks: ["Furniture", "Appliances", "Decor"] },
  ];

  return (
    <div className="flex justify-center items-center p-4 bg-blue-600 min-h-screen">
      {/* Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Top Section */}
        <div className="flex items-center border-b border-gray-300 p-3">
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 text-white px-4 py-2 flex items-center rounded-md focus:outline-none"
            >
              Shop by Department
              <IoMdArrowDropdown className="ml-2" />
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {departments.map((dept, index) => (
                  <div key={index} className="relative group">
                    <button
                      onMouseEnter={() => setOpenSubMenu(index)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                    >
                      {dept.name}
                      <IoMdArrowDropdown className="text-gray-500" />
                    </button>

                    {/* Submenu */}
                    {openSubMenu === index && (
                      <div
                        className="absolute left-full top-0 mt-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20"
                        onMouseLeave={() => setOpenSubMenu(null)}
                      >
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
          <div className="flex-grow mx-4 relative">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-200 overflow-x-auto">
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
              className={`flex-1 px-4 py-2 text-center text-sm font-medium transition ${
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
