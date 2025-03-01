import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, Heart, ChevronDown, UserCheck, UserRoundPlus, Menu, X 
} from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // Mobile dropdown state

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-4xl font-bold">
          <a href="#" className="flex items-center gap-1 text-gray-800">
            <span className="font-bold text-base text-4xl">Fintech</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-extrabold flex items-center justify-center leading-none">com</span>
          </a>
          <div className="hidden md:flex ml-20 text-gray-700 text-sm items-center space-x-4 font-normal">
            <Link to="/help" className="hover:text-blue-600">Help Centre</Link>
            <div className="w-px h-6 bg-gray-200"></div>
            <Link to="/sell" className="hover:text-blue-600">Sell on Fintech</Link>
          </div>
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
          <Link to="/wishlist" className="relative hover:text-red-500">
            <Heart size={20} className="text-red-500" />
          </Link>
          <Link to="/cart" className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full">
            <ShoppingCart size={20} />
            <span className="ml-1">0</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 transition-all duration-300 ${mobileMenuOpen ? "block" : "hidden"}`}
      >
        <Link to="/login" className="block text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>
          <UserCheck size={18} className="inline-block mr-2" /> Login
        </Link>
        <Link to="/register" className="block text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>
          <UserRoundPlus size={18} className="inline-block mr-2" /> Register
        </Link>
        <Link to="/orders" className="block text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>Orders</Link>

        {/* My Account Dropdown in Mobile */}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <button 
            className="flex justify-between w-full text-gray-700 py-2" 
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            My Account <ChevronDown size={16} className={`${accountMenuOpen ? "rotate-180" : ""}`} />
          </button>
          {accountMenuOpen && (
            <div className="ml-4 border-l border-gray-300 pl-4">
              <Link to="/profile" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <Link to="/returns" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>Returns</Link>
              <Link to="/track-orders" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>Track Orders</Link>
              <Link to="/invoices" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>Invoices</Link>
            </div>
          )}
        </div>

        <Link to="/logout" className="block text-gray-700 py-2" onClick={() => setMobileMenuOpen(false)}>Logout</Link>

        {/* Wishlist & Cart */}
        <div className="flex items-center justify-between mt-4">
          <Link to="/wishlist" className="hover:text-red-500">
            <Heart size={20} className="text-red-500" />
          </Link>
          <Link to="/cart" className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full">
            <ShoppingCart size={20} />
            <span className="ml-1">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
