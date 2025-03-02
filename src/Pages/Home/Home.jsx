import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlinePhoneIphone, MdLaptop, MdKitchen } from "react-icons/md";

function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const departments = [
    { name: "Electronics", icon: <MdOutlinePhoneIphone size={40} />, subLinks: ["Phones", "Laptops", "Accessories"] },
    { name: "Clothing", icon: <MdLaptop size={40} />, subLinks: ["Men", "Women", "Kids"] },
    { name: "Home & Kitchen", icon: <MdKitchen size={40} />, subLinks: ["Furniture", "Appliances", "Decor"] },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % departments.length);
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [departments.length]);

  return (
    <div className="flex justify-center items-center p-4 bg-blue-600">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md">
        {/* Desktop View: Full UI */}
        <div className="hidden sm:block">
          <div className="flex flex-col sm:flex-row items-center border-b border-gray-300 p-2 gap-2 sm:gap-4">
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
        </div>

        {/* Mobile View: Featured Categories Only */}
        <div className="sm:hidden p-4">
          <h2 className="text-lg font-bold mb-3">Featured Categories</h2>
          <div className="flex overflow-x-auto scrollbar-hide gap-4">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`flex flex-col items-center min-w-[100px] p-2 rounded-md shadow-md cursor-pointer transition-transform duration-300 ease-in-out ${
                  currentIndex === index ? "scale-110 bg-gray-100" : "bg-white"
                }`}
              >
                {dept.icon}
                <span className="text-sm mt-2">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
