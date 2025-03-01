import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronDown, User, LogIn, UserPlus } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-gray-800">takealot</span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">com</span>
        </div>

        {/* Left Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 text-sm">
          <Link to="#" className="hover:text-blue-600">Help Centre</Link>
          <Link to="#" className="hover:text-blue-600">Sell on Takealot</Link>
        </nav>

        {/* Right Links */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
            <LogIn size={18} /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-1 hover:text-blue-600">
            <UserPlus size={18} /> Register
          </Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          
          {/* My Account Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600">
              My Account <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-all">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
          </div>

          {/* Wishlist & Cart */}
          <button className="relative hover:text-red-500">
            <Heart size={20} className="text-red-500" />
          </button>
          <button className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full">
            <ShoppingCart size={20} />
            <span className="ml-1">0</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
