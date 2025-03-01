import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ChevronDown,
  UserCheck,
  UserRoundPlus,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(2); // Example count

  return (
    <header className="bg-white shadow-md border-b fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-gray-800">takealot</span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">com</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
            <UserCheck size={18} /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-1 hover:text-blue-600">
            <UserRoundPlus size={18} /> Register
          </Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>

          {/* My Account Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 focus:outline-none">
              My Account <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
          </div>

          {/* Wishlist & Cart */}
          <div className="flex items-center space-x-4">
            <button className="relative hover:text-red-500">
              <Heart size={20} className="text-red-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative flex items-center bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600">
              <ShoppingCart size={20} />
              <span className="ml-1">{cartCount}</span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-white shadow-md p-4 space-y-4 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link to="/login" className="flex items-center gap-2 text-gray-700">
          <UserCheck size={18} /> Login
        </Link>
        <Link to="/register" className="flex items-center gap-2 text-gray-700">
          <UserRoundPlus size={18} /> Register
        </Link>
        <Link to="/orders" className="block text-gray-700">Orders</Link>
        <Link to="/profile" className="block text-gray-700">My Account</Link>
        <Link to="/logout" className="block text-gray-700">Logout</Link>

        {/* Wishlist & Cart */}
        <div className="flex items-center justify-between">
          <button className="relative hover:text-red-500">
            <Heart size={20} className="text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>
          <button className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600">
            <ShoppingCart size={20} />
            <span className="ml-1">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
