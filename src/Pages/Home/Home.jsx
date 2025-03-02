import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom"; // Import Link from React Router
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // For loading spinner

function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    { name: "Electronics", subLinks: ["Phones", "Laptops", "Accessories"], icon: "📱", description: "Find the latest gadgets and accessories" },
    { name: "Clothing", subLinks: ["Men", "Women", "Kids"], icon: "👕", description: "Fashion for all ages and styles" },
    { name: "Home & Kitchen", subLinks: ["Furniture", "Appliances", "Decor"], icon: "🏡", description: "Everything to make your home stylish" },
  ];

  // Debouncing the search input for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust delay for optimal user experience

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredDepartments([]);
    } else {
      setIsLoading(true); // Start loading state

      const filtered = departments
        .map((dept) => ({
          ...dept,
          subLinks: dept.subLinks.filter((sub) =>
            sub.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          ),
        }))
        .filter(
          (dept) =>
            dept.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            dept.subLinks.length > 0
        );

      setTimeout(() => {
        setFilteredDepartments(filtered);
        setIsLoading(false); // Stop loading state after fetching
      }, 1000); // Simulate fetching delay for better UX
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="flex justify-center items-center p-4 bg-blue-600 relative">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-4 relative z-20">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center border-b border-gray-300 p-2 gap-4">
          {/* Dropdown for Departments */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 text-white w-full sm:w-auto px-4 py-2 flex items-center justify-between rounded-lg transition-all hover:bg-gray-700 focus:outline-none"
            >
              Shop by Department
              <IoMdArrowDropdown className="ml-2" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50 transition-transform duration-300 ease-in-out transform">
                {departments.map((dept, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => setOpenSubMenu(openSubMenu === index ? null : index)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center transition-colors"
                    >
                      {dept.name}
                      <IoMdArrowDropdown className="text-gray-500" />
                    </button>

                    {/* Submenu */}
                    {openSubMenu === index && (
                      <div className="absolute top-0 left-full ml-2 bg-gray-200 rounded-md mt-1 p-2 shadow-md w-40 z-50">
                        {dept.subLinks.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/category/${subLink.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded-md"
                          >
                            {subLink}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search for products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
            
            {/* Show a loading spinner if search is in progress */}
            {isLoading && (
              <AiOutlineLoading3Quarters className="absolute right-3 top-3 animate-spin text-gray-500" />
            )}

            {/* Search Results */}
            {debouncedSearchQuery && !isLoading && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-50">
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept, index) => (
                    <div key={index} className="px-4 py-2 border-b last:border-b-0">
                      <p className="font-semibold">{dept.name}</p>
                      {dept.subLinks.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/category/${subLink.toLowerCase()}`}
                          className="block text-sm text-gray-700 hover:text-blue-500"
                        >
                          {subLink}
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Featured Categories - Mobile View */}
        <div className="sm:hidden p-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800">Featured Categories</h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {departments.map((dept, index) => (
              <div key={index} className="flex-none w-24 text-center transition-all duration-500 hover:scale-105">
                <button className="flex flex-col items-center p-2 bg-gray-100 rounded-lg shadow-md hover:bg-gray-300 transition-all">
                  <span className="text-3xl">{dept.icon}</span>
                  <span className="text-sm mt-1">{dept.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="overflow-x-auto flex bg-gray-200 whitespace-nowrap mt-4 rounded-lg">
          {["ALOT For Less", "New Arrivals", "Summer", "Fire Sale", "Small Local Sellers", "Brands Store", "Clearance"].map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-center text-sm font-medium ${
                item === "Fire Sale" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              } transition-all`}
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
