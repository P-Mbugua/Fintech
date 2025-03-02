import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, Heart, ChevronDown, UserCheck, UserRoundPlus, Menu, X, Search
} from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo / Title */}
          <div className="flex-1 text-center md:text-left">
            <a href="#" className="text-gray-800 font-bold text-2xl md:text-4xl">Fintech</a>
          </div>

          {/* Search Icon */}
          <button className="md:hidden text-gray-700">
            <Search size={24} />
          </button>

          {/* Cart Icon */}
          <a href="/cart" className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full md:hidden">
            <ShoppingCart size={20} />
            <span className="ml-1">0</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
            <UserCheck size={18} /> Login
          </Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <Link to="/register" className="flex items-center gap-1 hover:text-blue-600">
            <UserRoundPlus size={18} /> Register
          </Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          <div className="w-px h-6 bg-gray-200"></div>

          {/* My Account Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600">
              My Account <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-all">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/returns" className="block px-4 py-2 hover:bg-gray-100">Returns</Link>
              <Link to="/track-orders" className="block px-4 py-2 hover:bg-gray-100">Track Orders</Link>
              <Link to="/invoices" className="block px-4 py-2 hover:bg-gray-100">Invoices</Link>
            </div>
          </div>

          {/* Wishlist & Cart */}
          <a href="/wishlist" className="relative hover:text-red-500">
            <Heart size={20} className="text-red-500" />
          </a>
          <a href="/cart" className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full">
            <ShoppingCart size={20} />
            <span className="ml-1">0</span>
          </a>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4 space-y-4 font-sans">
          <Link to="/login" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
            <UserCheck size={18} /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
            <UserRoundPlus size={18} /> Register
          </Link>
          <Link to="/orders" className="block text-gray-700 pb-2 border-b border-gray-200">Orders</Link>
          <Link to="/profile" className="block text-gray-700 pb-2 border-b border-gray-200">My Account</Link>
          <Link to="/logout" className="block text-gray-700 pb-2 border-b border-gray-200">Logout</Link>
        
          {/* Wishlist & Cart */}
          <div className="flex items-center justify-between pt-2">
            <button className="hover:text-red-500">
              <Heart size={20} className="text-red-500" />
            </button>
            <button className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full">
              <ShoppingCart size={20} />
              <span className="ml-1">0</span>
            </button>
          </div>
        </div>
        )}
      </header>

      {/* Add padding to avoid content getting hidden behind the fixed header */}
      <div className="pt-15"></div>
    </>
  );
}

export default Header;
